/**
 * Serialize an object to a JSON-LD string safe for injection into a <script> tag.
 * JSON.stringify alone does not escape '<', '>', or '&', which allows values like
 * '</script>' to break out of the script element and become an XSS vector.
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}
