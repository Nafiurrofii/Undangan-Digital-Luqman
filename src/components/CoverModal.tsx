import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen, Heart, Sparkles } from 'lucide-react';
import { FloralWreath, FloralEdgeFrame } from './FloralDecorations';
import { weddingInfo } from '../data/invitationData';
import { toTitleCase } from '../utils/textFormat';

interface CoverModalProps {
  isOpen: boolean;
  guestName: string;
  onOpen: () => void;
}

export function CoverModal({ isOpen, guestName, onOpen }: CoverModalProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 280);
  };

  const displayName = toTitleCase(guestName) || 'Bapak/Ibu/Saudara/i';

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="cover-envelope"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-105%',
            opacity: 0.98,
            transition: { duration: 1.05, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-sky-950/30 backdrop-blur-xs overflow-hidden"
        >
          {/* Invitation Card - Full screen edge-to-edge on mobile */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full min-h-dvh max-w-md mx-auto bg-white p-5 sm:p-7 text-center relative overflow-hidden flex flex-col justify-between items-center shadow-2xl"
          >
            {/* The Floral Edge Frame covering entire screen */}
            <FloralEdgeFrame opacity="opacity-90" />

            {/* Top section: Header typography with staggered entrance */}
            <div className="relative z-20 w-full pt-4 sm:pt-6 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-1.5 text-xs tracking-widest text-[#2a6f97] uppercase font-sans-wedding font-semibold mb-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                The Wedding Of
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-script text-5xl sm:text-6xl text-[#1b4965] mt-1 mb-1 drop-shadow-sm"
              >
                {weddingInfo.groom.nickname} & {weddingInfo.bride.nickname}
              </motion.h1>
            </div>

            {/* Middle section: Couple Photo with Floral Frame & Slow Subtle Zoom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 my-auto py-2 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center"
            >
              <div className="w-[62%] h-[62%] rounded-full overflow-hidden relative z-10 bg-sky-50/80 flex items-center justify-center shadow-inner">
                <motion.img
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  src={weddingInfo.couplePhotos.hero}
                  alt="Luqman & Naila"
                  className="w-full h-full object-cover object-center scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <FloralWreath className="w-full h-full" />
              </div>
            </motion.div>

            {/* Bottom section: Guest greeting & Action button with generous bottom margin */}
            <div className="relative z-20 w-full pb-8 sm:pb-12 mb-4 sm:mb-6 flex flex-col items-center">
              {/* Header: Kepada Yth. Bapak/Ibu/Saudara/i */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-center font-serif-wedding text-slate-900 mb-2 select-none"
              >
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-950">
                  Kepada Yth.
                </h3>
                <p className="text-sm sm:text-base font-bold tracking-tight text-slate-900 -mt-0.5">
                  Bapak/Ibu/Saudara/i
                </p>
              </motion.div>

              {/* Rounded Box Label (black border with rounded corners) - Non-editable, read-only from URL */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[280px] sm:max-w-[320px] min-h-[64px] sm:min-h-[72px] border-[2.5px] border-slate-950 rounded-[22px] bg-white flex items-center justify-center px-4 py-2 shadow-xs relative"
              >
                <span
                  id="guest-name-display"
                  className="w-full text-center text-lg sm:text-xl font-bold text-[#1b4965] font-serif-wedding select-text break-words leading-tight"
                >
                  {displayName}
                </span>
              </motion.div>

              {/* Buka Undangan Button with subtle breathing glow pulse & smooth hover/tap */}
              <motion.button
                initial={{ opacity: 0, y: 14 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    '0 10px 22px -4px rgba(27, 73, 101, 0.25)',
                    '0 14px 28px -2px rgba(27, 73, 101, 0.38)',
                    '0 10px 22px -4px rgba(27, 73, 101, 0.25)',
                  ],
                }}
                transition={{
                  opacity: { duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] },
                  boxShadow: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenClick}
                disabled={isOpening}
                className="mt-4 w-full max-w-[280px] sm:max-w-[310px] py-3.5 px-6 rounded-full bg-gradient-to-r from-[#1b4965] to-[#2c7da0] text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-sky-800/40 transition-all cursor-pointer group"
              >
                <MailOpen className={`w-4 h-4 transition-transform group-hover:scale-110 ${isOpening ? 'animate-bounce' : ''}`} />
                <span>{isOpening ? 'Membuka Undangan...' : 'Buka Undangan'}</span>
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
