// Average reading speed: ~200 words per minute
export function readingTime(text: string = ""): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}