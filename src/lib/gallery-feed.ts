export type GalleryImage = { id: string; src: string; width?: number; height?: number; alt: string };
export const MAX_SEED = 9999999;

export function nextSeed(used: Set<number>, random = Math.random): number {
  if (used.size >= MAX_SEED) throw new Error("Seed range exhausted");
  let seed = Math.floor(Math.max(0, Math.min(random(), 1 - Number.EPSILON)) * MAX_SEED) + 1;
  // Linear probing guarantees progress even if randomness repeatedly collides.
  while (used.has(seed)) seed = seed === MAX_SEED ? 1 : seed + 1;
  used.add(seed);
  return seed;
}

export function feedUrl(seed: number, offset: number) {
  return `https://www.bing.com/images/create/async/categoryfeedpage?category=all&seed=${seed}&pageOffset=${offset}&language=en`;
}

function imageUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return;
  try {
    const url = new URL(value, "https://www.bing.com");
    if (url.protocol === "https:") return url.href;
  } catch { /* Ignore malformed URLs. */ }
}

export function parseFeed(body: string, offset: number): { images: GalleryImage[]; nextOffset: number } {
  const images: GalleryImage[] = [];
  const seen = new Set<string>();
  const add = (item: Record<string, unknown>) => {
    const src = imageUrl(item.src ?? item.imageUrl ?? item.url ?? item.srcLq);
    if (!src || seen.has(src)) return;
    seen.add(src);
    images.push({ id: src, src, alt: "Gambar galeri", width: typeof item.width === "number" && item.width > 0 ? item.width : undefined, height: typeof item.height === "number" && item.height > 0 ? item.height : undefined });
  };
  const walk = (value: unknown, depth = 0) => {
    if (depth > 12 || !value || typeof value !== "object") return;
    if (Array.isArray(value)) { value.forEach(item => walk(item, depth + 1)); return; }
    const record = value as Record<string, unknown>;
    add(record);
    Object.values(record).forEach(item => walk(item, depth + 1));
  };
  let nextOffset = offset + 1;
  try { walk(JSON.parse(body)); } catch { /* Bing normally returns an HTML fragment. */ }
  const doc = new DOMParser().parseFromString(body, "text/html");
  doc.querySelectorAll("[data-records]").forEach(node => {
    try { walk(JSON.parse(node.getAttribute("data-records") ?? "[]")); } catch { /* Keep parsing other containers. */ }
  });
  const next = doc.querySelector("[data-next-page-url]")?.getAttribute("data-next-page-url");
  if (next) {
    try {
      const raw = new URL(next, "https://www.bing.com").searchParams.get("pageOffset");
      const parsed = raw === null ? NaN : Number(raw);
      if (Number.isSafeInteger(parsed) && parsed > offset) nextOffset = parsed;
    } catch { /* Fall back to the next page. */ }
  }
  if (!images.length) doc.querySelectorAll("img").forEach(node => add({ src: node.getAttribute("data-src") ?? node.getAttribute("src") }));
  return { images, nextOffset };
}

export async function fetchFeed(seed: number, offset: number, signal: AbortSignal) {
  const response = await fetch(feedUrl(seed, offset), { mode: "cors", credentials: "omit", signal, referrerPolicy: "no-referrer" });
  if (!response.ok) throw new Error(`Feed unavailable (${response.status})`);
  const parsed = parseFeed(await response.text(), offset);
  if (!parsed.images.length) throw new Error("Feed has no usable images");
  return parsed;
}