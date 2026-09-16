import { motion } from 'motion/react';
import { Instagram, Heart } from 'lucide-react';
import { FloralCorner } from './FloralDecorations';
import { weddingInfo } from '../data/invitationData';

export function CoupleSection() {
  const { groom, bride } = weddingInfo;

  return (
    <section id="couple" className="py-12 px-4 bg-[#f8fbfe] flex flex-col items-center relative overflow-hidden">
      {/* Corner floral decorations with user's blue roses and butterflies */}
      <FloralCorner position="top-left" className="absolute top-0 left-0 w-28 h-28 opacity-60" />
      <FloralCorner position="bottom-right" className="absolute bottom-0 right-0 w-28 h-28 opacity-60" />

      <div className="relative z-20 max-w-md w-full flex flex-col items-center">
        {/* Section title/intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <span className="text-xs uppercase tracking-widest text-[#2a6f97] font-semibold font-sans-wedding">
            Kedua Mempelai
          </span>
          <h2 className="font-script text-4xl sm:text-5xl text-[#1b4965] mt-1">
            Mempelai Bahagia
          </h2>
        </motion.div>

        {/* GROOM CARD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          className="w-full max-w-sm bg-white/90 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-xs flex flex-col items-center text-center transition-shadow hover:shadow-md"
        >
          <h3 className="font-script text-4xl sm:text-5xl text-[#1b4965] mb-1">
            {groom.nickname}
          </h3>
          <p className="text-base sm:text-lg font-bold text-slate-800 font-sans-wedding">
            {groom.fullName}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xs leading-relaxed">
            Putra dari: <br />
            <span className="font-semibold text-slate-700">{groom.fatherName} & {groom.motherName}</span>
          </p>
          {groom.city && (
            <p className="text-xs text-slate-500 mt-1">
              Beralamat di {groom.city}
            </p>
          )}

          {groom.instagram && (
            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={groom.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-[#1b4965] text-xs font-semibold shadow-xs hover:bg-sky-50 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-500" />
              <span>@{groom.instagram}</span>
            </motion.a>
          )}
        </motion.div>

        {/* Ampersand Divider with Beating Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-5 flex items-center gap-2"
        >
          <div className="w-10 h-px bg-sky-200" />
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-4 h-4 text-sky-400 fill-sky-400/40" />
          </motion.div>
          <span className="font-script text-4xl sm:text-5xl text-[#2a6f97] px-1">
            &
          </span>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <Heart className="w-4 h-4 text-sky-400 fill-sky-400/40" />
          </motion.div>
          <div className="w-10 h-px bg-sky-200" />
        </motion.div>

        {/* BRIDE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          className="w-full max-w-sm bg-white/90 backdrop-blur-xs rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-xs flex flex-col items-center text-center transition-shadow hover:shadow-md"
        >
          <h3 className="font-script text-4xl sm:text-5xl text-[#1b4965] mb-1">
            {bride.nickname}
          </h3>
          <p className="text-base sm:text-lg font-bold text-slate-800 font-sans-wedding">
            {bride.fullName}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xs leading-relaxed">
            Putri dari: <br />
            <span className="font-semibold text-slate-700">{bride.fatherName} & {bride.motherName}</span>
          </p>
          {bride.city && (
            <p className="text-xs text-slate-500 mt-1">
              Beralamat di {bride.city}
            </p>
          )}

          {bride.instagram && (
            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={bride.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-[#1b4965] text-xs font-semibold shadow-xs hover:bg-sky-50 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-500" />
              <span>@{bride.instagram}</span>
            </motion.a>
          )}
        </motion.div>

        {/* Middle Couple Photo Banner with gentle zoom */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 w-full flex flex-col items-center"
        >
          <div className="w-full h-64 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-lg relative bg-sky-100 group">
            <motion.img
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              src={weddingInfo.couplePhotos.hero}
              alt="Justin & Sisca"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-4">
              <h2 className="font-script text-4xl text-white drop-shadow-md">
                {groom.nickname} & {bride.nickname}
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
