import type { Metadata } from "next";
import { VinylCollection } from "@/components/VinylCollection";
import { design } from "@/lib/design";
import { records } from "@/lib/vinyl";

export const metadata: Metadata = {
  title: "Record Collection — Bradley Rodgers",
  description: "A record collection by Bradley Rodgers.",
};

export default function VinylPage() {
  const { page, main, header } = design.spacing;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: design.colors.background }}
    >
      <div
        className={`mx-auto flex min-h-screen w-full flex-col ${page.pt} ${page.pb} ${page.px}`}
      >
        <main className={`mx-auto w-full flex-1 ${main.pt}`} style={{ maxWidth: 960 }}>
          <header className={header.pb}>
            <h1
              style={{
                color: design.colors.foreground,
                ...design.typography.header,
              }}
            >
              Bradley Rodgers
            </h1>
            <h2
              style={{
                color: design.colors.muted,
                ...design.typography.subheader,
              }}
            >
              Record Collection
            </h2>
          </header>
          <VinylCollection records={records} />
        </main>
      </div>
    </div>
  );
}
