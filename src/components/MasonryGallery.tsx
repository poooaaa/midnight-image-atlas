import { useCallback, useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { fetchFeed, nextSeed, type GalleryImage } from "@/lib/gallery-feed";
import { sampleBatch } from "@/lib/gallery-samples";

export function MasonryGallery() {
  const [images, setImages] = useState<GalleryImage[]>(() => sampleBatch(0));
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const seeds = useRef(new Set<number>());
  const offset = useRef(0);
  const busy = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(false);
  const seen = useRef(new Set<string>());

  const loadMore = useCallback(async () => {
    if (busy.current || !mounted.current) return;
    busy.current = true;
    setLoading(true);
    const seed = nextSeed(seeds.current);
    const page = offset.current;
    const abort = new AbortController();
    controller.current = abort;
    const timeout = window.setTimeout(() => abort.abort(), 6000);
    let batch: GalleryImage[];
    try {
      const result = await fetchFeed(seed, page, abort.signal);
      offset.current = result.nextOffset;
      batch = result.images.filter(image => !seen.current.has(image.src));
      if (!batch.length) throw new Error("Duplicate feed page");
      batch.forEach(image => seen.current.add(image.src));
    } catch {
      offset.current = page + 1;
      batch = sampleBatch(seed);
      if (mounted.current) setFallback(true);
    } finally {
      window.clearTimeout(timeout);
    }
    // Prevent fast failures from producing a rapid load/append loop.
    await new Promise(resolve => window.setTimeout(resolve, 350));
    if (mounted.current) {
      setImages(previous => [...previous, ...batch]);
      setLoading(false);
    }
    busy.current = false;
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; controller.current?.abort(); };
  }, []);

  useEffect(() => {
    const node = sentinel.current;
    if (!node || loading) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) void loadMore();
    }, { rootMargin: "500px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [loadMore, loading, images.length]);

  return (
    <section className="pt-10" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="mb-4 text-sm font-medium text-heading">Gallery</h2>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4">
        {images.map((image, index) => <GalleryThumbnail key={image.id} image={image} index={index} />)}
      </div>
      <div ref={sentinel} className="flex min-h-16 items-center justify-center" role="status" aria-live="polite">
        {loading ? <LoaderCircle className="size-4 animate-spin text-muted-foreground motion-reduce:animate-none" aria-label="Memuat gambar" /> : fallback ? <span className="text-xs text-muted-foreground">Feed tidak tersedia · gambar contoh</span> : null}
      </div>
    </section>
  );
}

function GalleryThumbnail({ image, index }: { image: GalleryImage; index: number }) {
  const [failed, setFailed] = useState(false);
  const sample = sampleBatch(0)[index % 12];
  const displayed = failed ? sample : image;
  return <img src={displayed.src} alt={displayed.alt} width={displayed.width} height={displayed.height} loading={index < 4 ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} className="mb-3 block h-auto w-full break-inside-avoid rounded-md bg-preview md:mb-4" />;
}