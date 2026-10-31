import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MasonryGallery } from "@/components/MasonryGallery";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Image Generator" },
      { name: "description", content: "Tulis prompt dan lihat galeri gambar." },
      { property: "og:title", content: "Image Generator — Gallery" },
      { property: "og:description", content: "Antarmuka generator gambar minimal dengan galeri masonry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <section aria-label="Generate gambar">
        <textarea
          rows={3}
          aria-label="Deskripsikan gambar"
          placeholder="Deskripsikan gambar..."
          className="block w-full resize-none rounded-lg border border-control-border bg-card px-3.5 py-3 text-sm text-foreground outline-none transition-colors focus:border-ring"
        />
        <Button
          variant="generate"
          type="button"
          className="mt-3 h-10 w-full rounded-lg"
        >
          Generate
        </Button>
      </section>
      <MasonryGallery />
    </main>
  );
}
