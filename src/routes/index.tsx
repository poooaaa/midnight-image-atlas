import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Generate — Image Studio" },
      { name: "description", content: "Tulis prompt, pilih rasio dan gaya, lalu buat gambar di Image Studio." },
      { property: "og:title", content: "Generate — Image Studio" },
      { property: "og:description", content: "Tulis prompt, pilih rasio dan gaya, lalu buat gambar di Image Studio." },
    ],
  }),
  component: GeneratePage,
});

const ratios = [
  { id: "1:1", w: 14, h: 14 },
  { id: "4:3", w: 16, h: 12 },
  { id: "3:4", w: 12, h: 16 },
  { id: "16:9", w: 18, h: 10 },
  { id: "9:16", w: 10, h: 18 },
];
const styles = ["Natural", "Cinematic", "Illustration", "3D Render", "Minimal", "Analog Film"];
const suggestions = ["Pegunungan berkabut saat fajar", "Interior kafe minimalis", "Potret studio cahaya lembut"];

function GeneratePage() {
  const [ratio, setRatio] = useState("1:1");
  const [style, setStyle] = useState("Natural");
  const r = ratios.find((x) => x.id === ratio)!;
  const aspect = `${r.w} / ${r.h}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <header className="mb-6 md:mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-heading md:text-3xl">Generate Image</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Jelaskan gambar yang Anda bayangkan, lalu atur rasio dan gayanya.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-6">
        {/* Preview */}
        <section className="flex items-center justify-center rounded-2xl border border-preview-border bg-preview p-4 shadow-soft md:p-8 lg:min-h-[560px]">
          <div
            className="flex w-full max-h-[480px] max-w-[480px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-preview-border bg-preview-input/40 transition-[aspect-ratio] duration-300"
            style={{ aspectRatio: aspect }}
          >
            <div className="flex size-12 items-center justify-center rounded-xl border border-control-border bg-control">
              <ImageIcon className="size-5 text-icon" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="text-sm text-foreground">Preview gambar akan muncul di sini</p>
              <p className="mt-1 text-xs text-placeholder">{ratio} · {style}</p>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="flex flex-col gap-5 rounded-2xl border border-card-border bg-card p-4 shadow-soft md:p-5">
          <div>
            <Label>Prompt</Label>
            <textarea
              rows={5}
              placeholder="Contoh: rumah kayu kecil di tepi danau, kabut tipis, cahaya pagi yang hangat…"
              className="w-full resize-none rounded-xl border border-control-border bg-preview-input px-3.5 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors focus:border-ring"
            />
            <div className="mt-2.5 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <span key={s} className="cursor-default rounded-full border border-chip-border bg-chip px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-icon-hover">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label>Aspect ratio</Label>
            <div className="grid grid-cols-5 gap-2">
              {ratios.map((x) => {
                const active = x.id === ratio;
                return (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setRatio(x.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border py-2.5 text-xs transition-colors ${
                      active
                        ? "border-ring bg-selected text-heading"
                        : "border-control-border bg-control text-muted-foreground hover:bg-control-hover hover:text-icon-hover"
                    }`}
                  >
                    <span className="rounded-[3px] border-[1.5px] border-current" style={{ width: x.w, height: x.h }} />
                    {x.id}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Style</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {styles.map((s) => {
                const active = s === style;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStyle(s)}
                    className={`rounded-lg border px-3 py-2 text-xs transition-colors ${
                      active
                        ? "border-ring bg-selected text-heading"
                        : "border-control-border bg-control text-muted-foreground hover:bg-control-hover-2 hover:text-icon-hover"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className="mt-auto flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            <Wand2 className="size-4" />
            Generate Image
          </button>
          <p className="-mt-2 flex items-center justify-center gap-1.5 text-xs text-placeholder">
            <Sparkles className="size-3" /> Fitur generate belum aktif pada tahap ini
          </p>
        </section>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-xs font-medium uppercase tracking-wider text-icon">{children}</p>;
}
