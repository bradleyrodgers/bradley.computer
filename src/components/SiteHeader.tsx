import { design } from "@/lib/design";

export function SiteHeader() {
  return (
    <header className={design.spacing.header.pb}>
      <h1 style={{ color: design.colors.foreground, ...design.typography.header }}>
        Bradley Rodgers
      </h1>
      <h2 style={{ color: design.colors.muted, ...design.typography.subheader }}>
        Inspiration Journal
      </h2>

    </header>
  );
}
