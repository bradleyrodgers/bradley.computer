# Add journal posts from the iOS Share Sheet

The `POST /api/journal-share` endpoint turns a shared URL or image into a Cursor
Cloud Agent run. The agent uses the repository's `add-journal-post` skill,
verifies the change, and opens a draft pull request.

## 1. Configure the deployment

Create a Cursor API key in **Cursor Dashboard → API Keys**. In the Vercel project,
add these server-side environment variables:

| Variable | Value |
| --- | --- |
| `CURSOR_API_KEY` | Cursor API key; keep this only on the server |
| `JOURNAL_SHARE_SECRET` | A separate random bearer token used by the Shortcut |

Generate the share secret with `openssl rand -hex 32`. Redeploy after adding the
variables.

The endpoint defaults to this repository and `main`. These optional variables
override those values:

| Variable | Default |
| --- | --- |
| `CURSOR_REPOSITORY_URL` | `https://github.com/bradleyrodgers/bradley.computer` |
| `CURSOR_STARTING_REF` | `main` |

## 2. Create the Shortcut

Create a shortcut named **Add to journal**:

1. Open its details, enable **Show in Share Sheet**, and accept **URLs** and
   **Images**.
2. Add **Ask for Input** with the prompt `Optional note or caption`.
3. Add an **If** action that checks whether `Shortcut Input` is an image.
4. In the image branch:
   - Resize the image to 1600 px wide.
   - Convert it to JPEG at medium or high quality. The final file must be under
     3 MB.
   - Add **Get Contents of URL** for
     `https://bradley.computer/api/journal-share`.
   - Set method to `POST`, request body to `Form`, and add `image` containing
     the converted image plus `note` containing the optional input.
5. In the URL branch:
   - Add **Get URLs from Input**.
   - POST the same form with `url` containing the shared URL and `note`
     containing the optional input.
6. On both requests, add the header:
   `Authorization: Bearer <JOURNAL_SHARE_SECRET>`.
7. Read `agentUrl` from the returned dictionary and use **Open URLs** to open
   the run in Cursor. Omit this final action if the Shortcut should finish
   silently.

The bearer token on the phone can only invoke this endpoint; it is not the
Cursor API key. Rotate `JOURNAL_SHARE_SECRET` in Vercel and the Shortcut if the
phone or shortcut is shared.

## Request formats

The endpoint accepts `multipart/form-data` (recommended for Shortcuts) or JSON.

URL example:

```bash
curl https://bradley.computer/api/journal-share \
  -H "Authorization: Bearer $JOURNAL_SHARE_SECRET" \
  -H "Content-Type: application/json" \
  --data '{"url":"https://example.com/item","note":"Use the hero image"}'
```

JSON images use `{ "image": { "data": "<base64>", "mimeType": "image/jpeg" } }`.
Supported formats are JPEG, PNG, GIF, and WebP. Requests are limited to one
image under 3 MB.

A successful request returns HTTP `202` with `agentId`, `runId`, and `agentUrl`.
The shared page and image are explicitly treated as untrusted reference
material to reduce prompt-injection risk.
