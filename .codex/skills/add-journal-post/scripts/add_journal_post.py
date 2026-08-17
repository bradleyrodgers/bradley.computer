#!/usr/bin/env python3
"""Add image, YouTube, or Bandcamp posts to bradley.computer's journal feed."""

from __future__ import annotations

import argparse
import json
import mimetypes
import re
import shutil
import sys
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path


ENTRY_MARKER = "export const entries: FeedEntry[] = ["


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "journal-post"


def ts_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def current_timestamp() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def read_url(url: str) -> tuple[bytes, str]:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; add-journal-post/1.0)",
        },
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read(), response.headers.get("Content-Type", "")


def extension_for(source: str, content_type: str) -> str:
    media_type = content_type.split(";", 1)[0].strip().lower()
    if media_type in {"image/jpeg", "image/jpg"}:
        return ".jpg"
    if media_type == "image/png":
        return ".png"
    if media_type == "image/webp":
        return ".webp"

    parsed = urllib.parse.urlparse(source)
    suffix = Path(urllib.parse.unquote(parsed.path)).suffix.lower()
    if suffix in {".jpg", ".jpeg", ".png", ".webp"}:
        return ".jpg" if suffix == ".jpeg" else suffix

    guessed = mimetypes.guess_extension(media_type)
    if guessed in {".jpg", ".jpeg", ".png", ".webp"}:
        return ".jpg" if guessed == ".jpeg" else guessed

    return ".jpg"


def write_entry(repo: Path, entry: str, post_id: str) -> None:
    entries_path = repo / "src/lib/entries.ts"
    text = entries_path.read_text()
    marker_index = text.find(ENTRY_MARKER)
    if marker_index == -1:
        raise SystemExit(f"Could not find entries marker in {entries_path}")
    if re.search(rf"\bid:\s*{re.escape(ts_string(post_id))}\s*,", text):
        raise SystemExit(f"Entry id already exists: {post_id}")

    insert_at = marker_index + len(ENTRY_MARKER)
    updated = text[:insert_at] + "\n" + entry + text[insert_at:]
    entries_path.write_text(updated)


def ensure_unique_asset(path: Path, force: bool) -> None:
    if path.exists() and not force:
        raise SystemExit(f"Asset already exists: {path}. Pass --force to overwrite.")


def add_image(args: argparse.Namespace) -> None:
    repo = Path(args.repo).expanduser().resolve()
    post_id = args.id or slugify(args.title)
    source = args.source

    if re.match(r"https?://", source):
        data, content_type = read_url(source)
        ext = extension_for(source, content_type)
        asset_path = repo / "public/entries" / f"{post_id}{ext}"
        ensure_unique_asset(asset_path, args.force)
        asset_path.write_bytes(data)
    else:
        source_path = Path(source).expanduser().resolve()
        if not source_path.exists():
            raise SystemExit(f"Source image does not exist: {source_path}")
        ext = extension_for(str(source_path), mimetypes.guess_type(source_path.name)[0] or "")
        asset_path = repo / "public/entries" / f"{post_id}{ext}"
        ensure_unique_asset(asset_path, args.force)
        shutil.copyfile(source_path, asset_path)

    lines = [
        "  {",
        '    type: "image",',
        f"    id: {ts_string(post_id)},",
        f"    imageSrc: {ts_string('/entries/' + asset_path.name)},",
        f"    imageAlt: {ts_string(args.alt)},",
        f"    title: {ts_string(args.title)},",
    ]
    if args.href:
        lines.append(f"    titleHref: {ts_string(args.href)},")
    lines.extend(
        [
            f"    publishedAt: {ts_string(args.published_at or current_timestamp())},",
            "  },",
        ]
    )
    write_entry(repo, "\n".join(lines), post_id)
    print(f"Added image entry {post_id}")
    print(f"Asset: {asset_path}")
    print(f"Entries: {repo / 'src/lib/entries.ts'}")


def extract_youtube_id(value: str) -> str:
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", value):
        return value

    parsed = urllib.parse.urlparse(value)
    host = parsed.netloc.lower()
    if host.endswith("youtu.be"):
        video_id = parsed.path.strip("/").split("/", 1)[0]
    elif "youtube.com" in host:
        if parsed.path == "/watch":
            video_id = urllib.parse.parse_qs(parsed.query).get("v", [""])[0]
        elif parsed.path.startswith(("/embed/", "/shorts/")):
            video_id = parsed.path.strip("/").split("/")[1]
        else:
            video_id = ""
    else:
        video_id = ""

    if not re.fullmatch(r"[A-Za-z0-9_-]{11}", video_id):
        raise SystemExit(f"Could not extract YouTube video ID from: {value}")
    return video_id


def fetch_youtube_title(url: str) -> str | None:
    endpoint = "https://www.youtube.com/oembed?" + urllib.parse.urlencode(
        {"url": url, "format": "json"}
    )
    try:
        data, _ = read_url(endpoint)
        payload = json.loads(data.decode("utf-8"))
        title = payload.get("title")
        return title if isinstance(title, str) and title else None
    except Exception:
        return None


def add_youtube(args: argparse.Namespace) -> None:
    repo = Path(args.repo).expanduser().resolve()
    source = args.url or args.video_id
    video_id = args.video_id or extract_youtube_id(source)
    url = args.url or f"https://www.youtube.com/watch?v={video_id}"
    title = args.title or fetch_youtube_title(url) or "YouTube video"
    post_id = args.id or video_id

    lines = [
        "  {",
        '    type: "youtube",',
        f"    id: {ts_string(post_id)},",
        f"    videoId: {ts_string(video_id)},",
        f"    title: {ts_string(title)},",
    ]
    if args.href:
        lines.append(f"    titleHref: {ts_string(args.href)},")
    lines.extend(
        [
            f"    publishedAt: {ts_string(args.published_at or current_timestamp())},",
            "  },",
        ]
    )
    entry = "\n".join(lines)
    write_entry(repo, entry, post_id)
    print(f"Added YouTube entry {post_id}")
    print(f"Title: {title}")
    print(f"Entries: {repo / 'src/lib/entries.ts'}")


def add_bandcamp(args: argparse.Namespace) -> None:
    repo = Path(args.repo).expanduser().resolve()
    post_id = args.id or slugify(args.title)
    entry = "\n".join(
        [
            "  {",
            '    type: "bandcamp",',
            f"    id: {ts_string(post_id)},",
            f"    trackId: {args.track_id},",
            f"    title: {ts_string(args.title)},",
            f"    publishedAt: {ts_string(args.published_at or current_timestamp())},",
            "  },",
        ]
    )
    write_entry(repo, entry, post_id)
    print(f"Added Bandcamp entry {post_id}")
    print(f"Title: {args.title}")
    print(f"Entries: {repo / 'src/lib/entries.ts'}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="kind", required=True)

    image = subparsers.add_parser("image", help="Add an image post")
    image.add_argument("--repo", default=".", help="Path to bradley.computer repo")
    image.add_argument("--source", required=True, help="Image URL or local file path")
    image.add_argument("--title", required=True, help="Caption/title")
    image.add_argument("--href", help="Optional caption link")
    image.add_argument("--alt", required=True, help="Accessible image description")
    image.add_argument("--id", help="Entry id and asset basename")
    image.add_argument("--published-at", help="ISO timestamp")
    image.add_argument("--force", action="store_true", help="Overwrite existing asset")
    image.set_defaults(func=add_image)

    youtube = subparsers.add_parser("youtube", help="Add a YouTube post")
    youtube.add_argument("--repo", default=".", help="Path to bradley.computer repo")
    youtube.add_argument("--url", help="YouTube URL")
    youtube.add_argument("--video-id", help="YouTube video ID")
    youtube.add_argument("--title", help="Optional title; fetched from oEmbed if omitted")
    youtube.add_argument("--href", help="Optional caption/attribution link")
    youtube.add_argument("--id", help="Entry id; defaults to video ID")
    youtube.add_argument("--published-at", help="ISO timestamp")
    youtube.set_defaults(func=add_youtube)

    bandcamp = subparsers.add_parser("bandcamp", help="Add a Bandcamp track post")
    bandcamp.add_argument("--repo", default=".", help="Path to bradley.computer repo")
    bandcamp.add_argument(
        "--track-id", required=True, type=int, help="Numeric ID from Bandcamp embed code"
    )
    bandcamp.add_argument("--title", required=True, help="Track and artist title")
    bandcamp.add_argument("--id", help="Entry id; defaults to a title slug")
    bandcamp.add_argument("--published-at", help="ISO timestamp")
    bandcamp.set_defaults(func=add_bandcamp)
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    if args.kind == "youtube" and not (args.url or args.video_id):
        parser.error("youtube requires --url or --video-id")
    args.func(args)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
