import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, CreditCard } from 'lucide-react';
import { FloralHeader } from './FloralDecorations';
import { bankAccounts } from '../data/invitationData';

export function GiftSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2500);
    });
  };

  return (
    <section id="gift" className="py-12 px-4 bg-[#f8fbfe] flex flex-col items-center">
      <div className="max-w-md w-full flex flex-col items-center">
        {/* Arabic Header */}
        <p className="font-arabic text-base sm:text-lg text-[#1b4965] mb-1 text-center" dir="rtl">
          وَفِي ذَٰلِكَ فَلْيَتَنَافَسِ الْمُتَنَافِسُونَ
        </p>

        <FloralHeader title="Titip Hadiah" />

        <p className="text-xs sm:text-[13px] text-slate-600 text-center leading-relaxed mb-8 px-2 max-w-sm">
          Doa restu Bapak/Ibu sekalian merupakan karunia yang sangat berarti bagi kami. Dan jika memberi merupakan ungkapan tanda kasih, Bapak/Ibu dapat memberi kado secara cashless. Terima kasih.
        </p>

        {/* BANK ACCOUNT CARDS */}
        <div className="w-full space-y-4">
          {bankAccounts.map((bank, idx) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: idx * 0.16, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="bg-gradient-to-br from-white to-[#f0f6fb] rounded-3xl p-5 shadow-xs border border-sky-100 flex flex-col relative overflow-hidden transition-shadow hover:shadow-md"
            >
              {/* Chip graphic decoration */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-7 rounded-md bg-amber-200/80 border border-amber-300 flex items-center justify-center">
                    <div className="w-6 h-4 border border-amber-500/40 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
                      <div className="bg-amber-400/50" />
                      <div className="bg-amber-400/50" />
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 text-sky-600" />
                </div>
                <span className="font-bold text-sm text-[#1b4965] tracking-wider uppercase">
                  {bank.bankName}
                </span>
              </div>

              {/* Number and holder */}
              <div className="my-2">
                <p className="text-[11px] text-slate-400 font-sans-wedding uppercase tracking-wider">
                  Nomor Rekening
                </p>
                <p className="text-lg sm:text-xl font-bold font-mono text-slate-800 tracking-wider">
                  {bank.accountNumber}
                </p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  a.n. {bank.accountHolder}
                </p>
              </div>

              {/* Copy Button with micro-interactions */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => copyToClipboard(bank.accountNumber, bank.id)}
                className={`mt-3 py-2 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  copiedId === bank.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-[#1b4965] text-white hover:bg-[#153a52] shadow-xs'
                }`}
              >
                {copiedId === bank.id ? (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Nomor Rekening Berhasil Disalin!</span>
                  </motion.span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Nomor Rekening</span>
                  </span>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
