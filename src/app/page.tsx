import { Feed } from "@/components/Feed";
import { SiteHeader } from "@/components/SiteHeader";
import { design } from "@/lib/design";
import { entries } from "@/lib/entries";

export default function Home() {
  const { page, main } = design.spacing;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: design.colors.background }}
    >
      <div
        className={`mx-auto flex min-h-screen w-full flex-col ${page.pt} ${page.pb} ${page.px}`}
      >
        <main
          className={`mx-auto w-full flex-1 ${main.pt}`}
          style={{ maxWidth: design.layout.contentWidth }}
        >
          <SiteHeader />
          <Feed entries={entries} />
        </main>
      </div>
    </div>
  );
}
