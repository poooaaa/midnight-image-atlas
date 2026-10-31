import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Image Generator" },
      { name: "description", content: "Tulis prompt dan lihat galeri gambar." },
    ],
  }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState<"generate" | "gallery">("generate");

  const go = (t: "generate" | "gallery") => {
    setTab(t);
    document.getElementById(t)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      {/* Minimal tabs */}
      <div className="flex gap-5">
        {(["generate", "gallery"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => go(t)}
            className={`pb-1.5 text-sm capitalize transition-colors ${
              tab === t
                ? "border-b border-border text-heading"
                : "text-placeholder hover:text-foreground"
            }`}
          >
            {t === "generate" ? "Generate" : "Gallery"}
          </button>
        ))}
      </div>

      {/* Generate */}
      <section id="generate" className="scroll-mt-8 pt-10">
        <div className="flex aspect-square items-center justify-center rounded-xl border border-card-border bg-preview">
          <div className="flex flex-col items-center gap-2 text-placeholder">
            <ImageIcon className="size-6" strokeWidth={1.5} />
            <span className="text-xs">Preview gambar</span>
          </div>
        </div>

        <textarea
          rows={3}
          placeholder="Deskripsikan gambar..."
          className="mt-3 w-full resize-none rounded-lg border border-control-border bg-card px-3.5 py-3 text-sm text-foreground outline-none transition-colors focus:border-ring"
        />

        <button
          type="button"
          className="mt-3 h-10 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Generate
        </button>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-8 pt-12">
        <h2 className="text-sm font-medium text-heading">Gallery</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((shape) => (
            <div
              key={shape}
              className="relative aspect-square overflow-hidden rounded-lg border border-card-border bg-bubble"
            >
              <Placeholder shape={shape} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Neutral abstract placeholder shapes — not real generated output.
function Placeholder({ shape }: { shape: number }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-control-border" preserveAspectRatio="xMidYMid slice">
      {shape === 0 && (
        <>
          <circle cx="70" cy="32" r="10" fill="currentColor" opacity="0.6" />
          <path d="M0 82 L32 52 L55 72 L74 56 L100 84 L100 100 L0 100Z" fill="currentColor" opacity="0.5" />
        </>
      )}
      {shape === 1 && (
        <>
          <circle cx="50" cy="40" r="16" fill="currentColor" opacity="0.55" />
          <path d="M18 100 Q50 58 82 100Z" fill="currentColor" opacity="0.45" />
        </>
      )}
      {shape === 2 && (
        <>
          <rect x="24" y="38" width="20" height="62" fill="currentColor" opacity="0.45" />
          <rect x="50" y="24" width="16" height="76" fill="currentColor" opacity="0.6" />
          <rect x="72" y="48" width="12" height="52" fill="currentColor" opacity="0.4" />
        </>
      )}
      {shape === 3 && (
        <>
          <circle cx="38" cy="44" r="22" fill="currentColor" opacity="0.4" />
          <circle cx="62" cy="58" r="18" fill="currentColor" opacity="0.55" />
        </>
      )}
    </svg>
  );
}
