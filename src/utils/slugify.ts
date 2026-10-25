/**
 * Generates an SEO-friendly URL slug from a title string.
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // separate accents from base characters
    .replace(/[\u0300-\u036f]/g, '') // remove accent diacritics
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric chars
    .replace(/[\s_]+/g, '-') // replace spaces & underscores with -
    .replace(/-+/g, '-') // collapse consecutive dashes
    .replace(/^-+|-+$/g, ''); // trim leading/trailing dashes
}
