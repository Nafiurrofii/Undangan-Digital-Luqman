import { motion } from 'motion/react';
import { FloralWreath, FloralCorner } from './FloralDecorations';
import { weddingInfo } from '../data/invitationData';

export function GreetingSection() {
  return (
    <section className="relative py-12 px-4 bg-gradient-to-b from-[#f4f9fd] via-[#eaf3fa] to-[#f4f9fd] flex flex-col items-center text-center overflow-hidden">
      {/* Corner floral decorations with user's blue roses and butterflies */}
      <FloralCorner position="top-left" className="absolute top-0 left-0 w-28 h-28 opacity-70" />
      <FloralCorner position="bottom-right" className="absolute bottom-0 right-0 w-28 h-28 opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 max-w-lg w-full flex flex-col items-center"
      >
        {/* Arabic Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-arabic text-xl sm:text-2xl text-[#1b4965] font-semibold tracking-wider mb-3 leading-relaxed"
        >
          السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
        </motion.p>

        {/* Welcoming Text */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-sm text-slate-600 font-sans-wedding leading-relaxed max-w-md px-2"
        >
          Atas Rahmat Tuhan Yang Maha Esa, kami bermaksud mengundang Anda di acara kami,
          merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga, apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada:
        </motion.p>

        {/* Couple Photo in Floral Frame with Slow Subtle Zoom */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.91 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-6 w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center"
        >
          <div className="w-[62%] h-[62%] rounded-full overflow-hidden relative z-10 bg-sky-50/80 flex items-center justify-center shadow-inner">
            <motion.img
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              src={weddingInfo.couplePhotos.middle}
              alt="Mempelai"
              className="w-full h-full object-cover object-center scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <FloralWreath className="w-full h-full" />
          </div>
        </motion.div>

        {/* Ar-Rum: 21 Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white/85 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border border-sky-100 shadow-sm mt-2 transition-shadow hover:shadow-md"
        >
          <p className="font-arabic text-base sm:text-lg text-[#1b4965] leading-loose mb-3" dir="rtl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>
          <p className="text-xs sm:text-[13px] text-slate-600 italic leading-relaxed">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
          </p>
          <div className="mt-3 inline-block font-sans-wedding text-xs font-semibold text-[#1b4965] tracking-widest uppercase border-t border-sky-200 pt-2 px-4">
            — Ar-Rum : Ayat 21 —
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
