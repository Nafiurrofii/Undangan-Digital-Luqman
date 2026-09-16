import { motion } from 'motion/react';
import { FloralWreath, FloralEdgeFrame } from './FloralDecorations';
import { weddingInfo } from '../data/invitationData';

export function ClosingSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#f8fbfe] via-[#edf5fc] to-[#d8eaf7] flex flex-col items-center text-center relative overflow-hidden">
      {/* Edge border with user's blue roses and butterflies */}
      <FloralEdgeFrame opacity="opacity-80" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 max-w-md w-full flex flex-col items-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-script text-5xl sm:text-6xl text-[#1b4965] mb-2"
        >
          {weddingInfo.groom.nickname} & {weddingInfo.bride.nickname}
        </motion.h2>

        {/* Couple Photo with Floral Frame and subtle zoom */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-6 w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center"
        >
          <div className="w-[62%] h-[62%] rounded-full overflow-hidden relative z-10 bg-sky-50/80 flex items-center justify-center shadow-inner">
            <motion.img
              animate={{ scale: [1.03, 1.09, 1.03] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              src={weddingInfo.couplePhotos.closing}
              alt="Justin & Sisca"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <FloralWreath className="w-full h-full" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans-wedding max-w-sm px-2"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kedua mempelai.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.4 }}
          className="mt-8 pt-4 border-t border-sky-200/80 w-full max-w-xs flex flex-col items-center"
        >
          <h4 className="font-script text-4xl text-[#1b4965] mb-1">
            Terima Kasih
          </h4>
          <p className="text-xs text-slate-500 font-sans-wedding uppercase tracking-wider">
            Kami yang berbahagia,
          </p>
          <p className="text-sm font-bold text-slate-800 font-sans-wedding mt-0.5">
            Keluarga Besar {weddingInfo.groom.nickname} & {weddingInfo.bride.nickname}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
