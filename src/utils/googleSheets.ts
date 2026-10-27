/**
 * Utility untuk mengirim data RSVP ke Google Spreadsheet
 * melalui Google Apps Script Web App.
 */

import { WishItem } from '../types';

// URL Google Apps Script — langsung di-hardcode karena bukan data sensitif
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJETBUlhQfh-Sp_5d6_3gPjIu7WExinEgE5RIqDTAwJKTyhOiNvj2gj2LQpCxshQGp/exec';

export interface SheetResponse {
  success: boolean;
  message: string;
}

/**
 * Kirim data RSVP ke Google Spreadsheet.
 *
 * Catatan teknis:
 * - Google Apps Script tidak support CORS preflight (OPTIONS).
 * - Mengirim JSON dengan Content-Type 'application/json' memicu preflight → gagal.
 * - Solusi: kirim sebagai 'text/plain' → tidak ada preflight → berhasil.
 * - Karena mode 'no-cors', response tidak bisa dibaca browser (opaque),
 *   tapi data TETAP tersimpan di spreadsheet.
 */
export async function submitRsvpToSheet(wish: WishItem): Promise<SheetResponse> {
  if (!SCRIPT_URL) {
    console.warn('[googleSheets] VITE_GOOGLE_SCRIPT_URL belum diisi di .env');
    return { success: false, message: 'URL script belum dikonfigurasi.' };
  }

  try {
    const payload = {
      type:       'rsvp',
      name:       wish.name,
      attendance: wish.attendance,
      message:    wish.message,
      timestamp:  wish.timestamp,
    };

    // KUNCI: gunakan text/plain agar tidak ada preflight CORS
    await fetch(SCRIPT_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body:    JSON.stringify(payload),
    });

    // Dengan no-cors, response selalu 'opaque' — anggap sukses jika tidak throw
    console.log('[googleSheets] Data RSVP terkirim ke spreadsheet ✓');
    return { success: true, message: 'Data berhasil dikirim.' };

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[googleSheets] Gagal mengirim:', msg);
    return { success: false, message: msg };
  }
}
