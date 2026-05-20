import { design } from "@/lib/design";

export function SiteHeader() {
  return (
    <header className={design.spacing.header.pb}>
      <h1 style={{ color: design.colors.foreground, ...design.typography.header }}>
        Bradley Rodgers
      </h1>
    </header>
  );
}
