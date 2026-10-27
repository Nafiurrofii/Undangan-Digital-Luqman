import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, MessageSquare, Clock, UserCheck, UserX, HelpCircle, Heart } from 'lucide-react';
import { FloralHeader } from './FloralDecorations';
import { initialWishes } from '../data/invitationData';
import { WishItem } from '../types';
import { submitRsvpToSheet } from '../utils/googleSheets';

export function RsvpSection({ defaultGuestName = '' }: { defaultGuestName?: string }) {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [name, setName] = useState(defaultGuestName);
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultGuestName) {
      setName(defaultGuestName);
    }
  }, [defaultGuestName]);

  // Load from localStorage or fallback to initialWishes
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_justin_sisca');
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(initialWishes);
      }
    } catch {
      setWishes(initialWishes);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: WishItem = {
      id: 'wish-' + Date.now(),
      name: name.trim(),
      attendance,
      message: message.trim(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    // Simpan ke state & localStorage (fallback offline)
    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('wedding_wishes_justin_sisca', JSON.stringify(updated));
    } catch {
      // ignore
    }

    // Kirim ke Google Spreadsheet (non-blocking)
    submitRsvpToSheet(newWish).catch((err) => {
      console.warn('[RSVP] Gagal kirim ke spreadsheet:', err);
    });

    setIsSubmitted(true);
    setMessage('');
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  const getAttendanceBadge = (status: 'hadir' | 'tidak_hadir' | 'ragu') => {
    switch (status) {
      case 'hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
            <UserCheck className="w-3 h-3" /> Hadir
          </span>
        );
      case 'tidak_hadir':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800">
            <UserX className="w-3 h-3" /> Tidak Hadir
          </span>
        );
      case 'ragu':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
            <HelpCircle className="w-3 h-3" /> Ragu-ragu
          </span>
        );
    }
  };

  return (
    <section id="rsvp" className="py-12 px-4 bg-gradient-to-b from-[#edf5fc] via-[#f8fbfe] to-[#edf5fc] flex flex-col items-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <FloralHeader title="Kehadiran" />

        <p className="text-xs text-slate-500 font-sans-wedding text-center mb-6 max-w-xs">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan memberikan konfirmasi kehadiran & doa restu.
        </p>

        {/* RSVP FORM */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white rounded-3xl p-6 shadow-sm border border-sky-100 transition-shadow hover:shadow-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-400 bg-sky-50/30 transition-all"
              />
            </div>

            {/* Ucapan & Doa */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ucapan & Doa Restu
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan selamat dan doa untuk kedua mempelai..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-sky-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-400 bg-sky-50/30 resize-none transition-all"
              />
            </div>

            {/* Konfirmasi Kehadiran */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'hadir', label: 'Hadir' },
                  { value: 'tidak_hadir', label: 'Tidak Hadir' },
                  { value: 'ragu', label: 'Ragu-ragu' },
                ].map((opt) => (
                  <motion.button
                    key={opt.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAttendance(opt.value as 'hadir' | 'tidak_hadir' | 'ragu')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      attendance === opt.value
                        ? 'bg-[#1b4965] text-white border-[#1b4965] shadow-xs'
                        : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50'
                    }`}
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            </div>



            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#1b4965] to-[#2a6f97] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-shadow cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Konfirmasi & Ucapan</span>
            </motion.button>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Terima kasih! Doa dan konfirmasi kehadiran Anda telah tersimpan.</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* FEED UCAPAN & DOA (matching screenshot) */}
        <div className="w-full mt-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1b4965]">
              <MessageSquare className="w-4 h-4 text-sky-600" />
              <span>Ucapan & Doa Restu ({wishes.length})</span>
            </div>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> Dari Tamu Terhormat
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 no-scrollbar">
            {wishes.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.06, 0.3) }}
                whileHover={{ y: -1.5 }}
                className="bg-white rounded-2xl p-4 shadow-xs border border-sky-100 flex flex-col transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-xs sm:text-sm text-slate-800 font-sans-wedding">
                    {item.name}
                  </h5>
                  {getAttendanceBadge(item.attendance)}
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.message}
                </p>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-300" />
                    {item.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
