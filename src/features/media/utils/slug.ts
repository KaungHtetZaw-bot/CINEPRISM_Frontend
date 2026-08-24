/**
 * Convert a display name into a URL-safe slug.
 * "Sci-Fi & Fantasy" -> "sci-fi-fantasy"
 */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
