import { motion, AnimatePresence } from 'motion/react';

interface AnimatedDigitProps {
  value: number | string;
  className?: string;
}

export function AnimatedDigit({ value, className = '' }: AnimatedDigitProps) {
  const formatted = typeof value === 'number' ? (value < 10 ? `0${value}` : `${value}`) : value;

  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden tabular-nums ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={formatted}
          initial={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
