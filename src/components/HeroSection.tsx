import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FloralWreath, FloralEdgeFrame } from './FloralDecorations';
import { weddingInfo } from '../data/invitationData';
import { CountdownTime } from '../types';
import { AnimatedDigit } from './AnimatedDigit';

export function HeroSection({ targetDate = weddingInfo.targetDate }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-8 pb-14 px-4 overflow-hidden bg-gradient-to-b from-[#e3effa] via-[#eef6fc] to-[#f4f9fd]">
      {/* Edge border with user's blue roses and butterflies */}
      <FloralEdgeFrame opacity="opacity-80" />

      {/* Couple Portrait with Floral Frame & Slow Subtle Zoom */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 my-4 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center"
      >
        {/* Circular photo exactly sized to the wreath opening */}
        <div className="w-[62%] h-[62%] rounded-full overflow-hidden relative z-10 bg-sky-50/80 flex items-center justify-center shadow-inner">
          <motion.img
            animate={{ scale: [1, 1.045, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            src={weddingInfo.couplePhotos.hero}
            alt="Justin & Sisca"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <FloralWreath className="w-full h-full" />
        </div>
      </motion.div>

      {/* Script Title: Justin & Sisca */}
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 text-center mt-2 mb-6"
      >
        <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#1b4965] tracking-wide drop-shadow-sm">
          {weddingInfo.groom.nickname} & {weddingInfo.bride.nickname}
        </h1>
      </motion.div>

      {/* Countdown Timer with smooth animated number flip/fade & hover micro-interactions */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm"
      >
        {[
          { label: 'HARI', value: timeLeft.days },
          { label: 'JAM', value: timeLeft.hours },
          { label: 'MENIT', value: timeLeft.minutes },
          { label: 'DETIK', value: timeLeft.seconds },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.38 + idx * 0.09 }}
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-[#1b4965] text-white rounded-xl py-2.5 px-2 flex flex-col items-center justify-center shadow-md border border-sky-800/40 transition-shadow hover:shadow-lg"
          >
            <span className="text-xl sm:text-2xl font-bold font-sans-wedding tracking-tight min-h-[1.75rem] flex items-center justify-center">
              <AnimatedDigit value={item.value} />
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-wider uppercase opacity-85 font-medium mt-0.5">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-20 mt-8 flex flex-col items-center pointer-events-none select-none text-slate-500"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll Ke Bawah</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-sky-600 mt-0.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
