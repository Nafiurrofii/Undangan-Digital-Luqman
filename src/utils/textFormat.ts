/**
 * Formats a string to Title Case (Capital Case):
 * Huruf pertama di setiap kata menggunakan huruf besar, huruf lainnya kecil.
 * Contoh: "ini adalah contoh penulisan title case" -> "Ini Adalah Contoh Penulisan Title Case"
 * Contoh: "JOHN DOE" -> "John Doe"
 * Contoh: "bapak/ibu/saudara/i" -> "Bapak/Ibu/Saudara/i"
 */
export function toTitleCase(input?: string | null): string {
  if (!input || !input.trim()) return '';

  return input
    .trim()
    .toLowerCase()
    .replace(/(?:^|[\s/_\-–—([{'".])[a-z\u00C0-\u024F]/g, (match) => match.toUpperCase());
}
