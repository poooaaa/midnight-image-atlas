import lake from "@/assets/gallery-1.jpg";
import lilac from "@/assets/gallery-2.jpg";
import forest from "@/assets/gallery-3.jpg";
import architecture from "@/assets/gallery-4.jpg";
import flowers from "@/assets/gallery-5.jpg";
import coast from "@/assets/gallery-6.jpg";
import chrome from "@/assets/gallery-7.jpg";
import mountain from "@/assets/gallery-8.jpg";
import lemons from "@/assets/gallery-9.jpg";
import glasshouse from "@/assets/gallery-10.jpg";
import vase from "@/assets/gallery-11.jpg";
import dunes from "@/assets/gallery-12.jpg";
import type { GalleryImage } from "./gallery-feed";

const samples = [
  { src: lake, width: 512, height: 384, alt: "Danau di pegunungan" },
  { src: lilac, width: 300, height: 384, alt: "Objek lilac" },
  { src: forest, width: 320, height: 384, alt: "Hutan berkabut" },
  { src: architecture, width: 512, height: 384, alt: "Arsitektur putih" },
  { src: flowers, width: 320, height: 384, alt: "Bunga merah muda" },
  { src: coast, width: 512, height: 280, alt: "Pantai biru" },
  { src: chrome, width: 384, height: 384, alt: "Objek krom" },
  { src: mountain, width: 280, height: 384, alt: "Puncak bersalju" },
  { src: lemons, width: 512, height: 384, alt: "Lemon" },
  { src: glasshouse, width: 320, height: 384, alt: "Bangunan kaca" },
  { src: vase, width: 300, height: 384, alt: "Vas kaca biru" },
  { src: dunes, width: 512, height: 280, alt: "Bukit pasir" },
];

export function sampleBatch(seed: number): GalleryImage[] {
  const start = seed % samples.length;
  return samples.map((_, index) => ({ ...samples[(start + index) % samples.length], id: `sample-${seed}-${index}` }));
}