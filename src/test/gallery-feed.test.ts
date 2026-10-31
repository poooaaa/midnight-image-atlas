import { describe, expect, it } from "vitest";
import { feedUrl, nextSeed, parseFeed } from "@/lib/gallery-feed";

describe("Gallery feed rules", () => {
  it("uses integer seeds from 1 through 9999999", () => {
    expect(nextSeed(new Set(), () => 0)).toBe(1);
    expect(nextSeed(new Set(), () => 1)).toBe(9999999);
  });
  it("never repeats a seed in the same session", () => {
    const used = new Set<number>();
    expect(nextSeed(used, () => 0)).toBe(1);
    expect(nextSeed(used, () => 0)).toBe(2);
  });
  it("uses the requested feed URL", () => {
    expect(feedUrl(123, 2)).toBe("https://www.bing.com/images/create/async/categoryfeedpage?category=all&seed=123&pageOffset=2&language=en");
  });
  it("parses escaped Bing records and the next page offset", () => {
    const data = JSON.stringify([{ mediaItems: [{ src: "https://example.com/a.jpg", width: 300, height: 500 }] }]).replaceAll('"', "&quot;");
    const result = parseFeed(`<div data-records="${data}" data-next-page-url="?pageOffset=3"></div>`, 2);
    expect(result.images).toHaveLength(1);
    expect(result.images[0].height).toBe(500);
    expect(result.nextOffset).toBe(3);
  });
  it("advances one page on malformed/empty results", () => {
    expect(parseFeed("<html>denied</html>", 4)).toEqual({ images: [], nextOffset: 5 });
  });
  it("accepts JSON but rejects unsafe and duplicate image URLs", () => {
    const result = parseFeed(JSON.stringify([{src:"javascript:alert(1)"},{src:"https://example.com/a.jpg"},{src:"https://example.com/a.jpg"}]), 0);
    expect(result.images.map(image => image.src)).toEqual(["https://example.com/a.jpg"]);
  });
});