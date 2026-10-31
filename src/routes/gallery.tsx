import { createFileRoute } from "@tanstack/react-router";
import { Heart, ImageIcon, MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Image Studio" },
      { name: "description", content: "Lihat dan telusuri koleksi gambar Anda di Image Studio." },
      { property: "og:title", content: "Gallery — Image Studio" },
      { property: "og:description", content: "Lihat dan telusuri koleksi gambar Anda di Image Studio." },
    ],
  }),
  component: GalleryPage,
});

const filters = ["All", "Recent", "Favorites"];

// Abstract placeholder tiles — subtle neutral shapes, not real generated output.
const items = [
  { label: "Contoh · Landscape", fav: true, shape: 0 },
  { label: "Contoh · Portrait", fav: false, shape: 1 },
  { label: "Contoh · Arsitektur", fav: false, shape: 2 },
  { label: "Contoh · Abstrak", fav: true, shape: 3 },
  { label: "Contoh · Produk", fav: false, shape: 1 },
  { label: "Contoh · Alam", fav: false, shape: 0 },
  { label: "Contoh · Interior", fav: true, shape: 2 },
  { label: "Contoh · Ilustrasi", fav: false, shape: 3 },
];

function GalleryPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-heading md:text-3xl">Gallery</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Koleksi gambar Anda akan tersimpan dan tampil di sini.</p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex h-10 w-full items-center gap-2.5 rounded-xl border border-search-border bg-search px-3.5 sm:max-w-xs">
          <Search className="size-4 text-icon" />
          <input placeholder="Cari gambar…" className="w-full bg-transparent text-sm text-foreground outline-none" />
        </label>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                f === filter
                  ? "border-control-border bg-selected text-heading"
                  : "border-chip-border bg-chip text-muted-foreground hover:text-icon-hover"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {items.map((it, i) => (
          <article
            key={i}
            className="group overflow-hidden rounded-xl border border-card-border bg-bubble shadow-soft transition-colors hover:bg-bubble-hover"
          >
            <div className="relative aspect-square border-b border-preview-border bg-preview">
              <Placeholder shape={it.shape} />
              <button
                type="button"
                aria-label="Favorit"
                className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-lg border border-control-border bg-control/80 text-icon backdrop-blur transition-colors hover:text-icon-hover"
              >
                <Heart className={`size-3.5 ${it.fav ? "fill-current text-icon-hover" : ""}`} />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <span className="truncate text-xs text-foreground">{it.label}</span>
              <MoreHorizontal className="size-4 shrink-0 text-icon transition-colors group-hover:text-icon-hover" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Placeholder({ shape }: { shape: number }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-control-border" preserveAspectRatio="xMidYMid slice">
      {shape === 0 && (
        <>
          <circle cx="72" cy="30" r="9" fill="currentColor" opacity="0.7" />
          <path d="M0 80 L30 50 L52 70 L70 55 L100 82 L100 100 L0 100Z" fill="currentColor" opacity="0.55" />
        </>
      )}
      {shape === 1 && (
        <>
          <circle cx="50" cy="40" r="15" fill="currentColor" opacity="0.6" />
          <path d="M20 100 Q50 55 80 100Z" fill="currentColor" opacity="0.5" />
        </>
      )}
      {shape === 2 && (
        <>
          <rect x="22" y="35" width="22" height="65" fill="currentColor" opacity="0.5" />
          <rect x="48" y="20" width="18" height="80" fill="currentColor" opacity="0.65" />
          <rect x="70" y="48" width="14" height="52" fill="currentColor" opacity="0.45" />
        </>
      )}
      {shape === 3 && (
        <>
          <circle cx="38" cy="45" r="22" fill="currentColor" opacity="0.45" />
          <circle cx="62" cy="58" r="18" fill="currentColor" opacity="0.6" />
        </>
      )}
      <foreignObject x="0" y="0" width="0" height="0">
        <ImageIcon />
      </foreignObject>
    </svg>
  );
}
