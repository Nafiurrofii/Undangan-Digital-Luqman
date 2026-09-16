import { motion } from 'motion/react';

export const FLORAL_BORDER_IMAGE = 'https://res.cloudinary.com/powtyiwc/image/upload/v1789141519/download_2_vijhie.jpg';
export const PHOTO_FRAME_IMAGE = 'https://res.cloudinary.com/powtyiwc/image/upload/v1789142804/ChatGPT_Image_Sep_11__2026__10_52_21_PM-removebg-preview_tlsazh.png';

export function FloralEdgeFrame({
  className = "",
  opacity = "opacity-90",
}: {
  className?: string;
  opacity?: string;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-10 overflow-hidden ${className}`}>
      <motion.img
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.012, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        src={FLORAL_BORDER_IMAGE}
        alt="Bingkai Tepi Bunga Mawar Biru & Kupu-kupu"
        className={`w-full h-full object-cover sm:object-fill ${opacity} mix-blend-multiply`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export function FloralCorner({
  className = "",
  position = "top-left",
}: {
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const isRight = position === 'top-right';
  const isBottomLeft = position === 'bottom-left';
  const isBottomRight = position === 'bottom-right';

  const isBottom = isBottomLeft || isBottomRight;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none overflow-hidden select-none z-10 ${className}`}
      style={{
        transform: isRight || isBottomLeft ? 'scaleX(-1)' : undefined,
      }}
    >
      <motion.div
        animate={{
          y: [0, -3, 0],
          rotate: isRight || isBottomLeft ? [0, -0.6, 0] : [0, 0.6, 0],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-full h-full min-w-[110px] min-h-[110px] overflow-hidden"
      >
        <img
          src={FLORAL_BORDER_IMAGE}
          alt="Hiasan Sudut Bunga Mawar Biru"
          className={`absolute ${
            isBottom ? 'bottom-0 right-0' : 'top-0 left-0'
          } w-[220%] h-auto max-w-none mix-blend-multiply ${
            isBottom ? 'object-bottom object-right' : 'object-top object-left'
          }`}
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </motion.div>
  );
}

export function FloralWreath({ className = "w-full h-full" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full h-full pointer-events-none select-none flex items-center justify-center ${className}`}
    >
      <motion.img
        animate={{
          scale: [1, 1.018, 1],
          rotate: [0, 0.5, -0.5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        src={PHOTO_FRAME_IMAGE}
        alt="Bingkai Foto Pengantin"
        className="w-full h-full object-contain drop-shadow-md select-none"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}

export const FLORAL_ORNAMENT_IMAGE = 'https://res.cloudinary.com/powtyiwc/image/upload/v1789314715/ornamen_bunga_biru_transparan_cltgbf.png';

export function FloralHeader({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center my-4 relative"
    >
      {/* Decorative transparent blue floral ornament */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-48 sm:w-56 h-12 sm:h-14 flex items-center justify-center relative mb-1"
      >
        <motion.img
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          src={FLORAL_ORNAMENT_IMAGE}
          alt="Ornamen Bunga Biru"
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xs"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-script text-4xl sm:text-5xl text-[#1c4d75] tracking-wide text-center drop-shadow-sm -mt-1"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}
