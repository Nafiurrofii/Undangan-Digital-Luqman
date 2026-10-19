import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'motion/react';
import { VolumeX, Disc, Music } from 'lucide-react';
import weddingSong from '../data/wedding.mp3';

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
}

export const AudioPlayer = forwardRef<AudioPlayerRef>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(weddingSong);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useImperativeHandle(ref, () => ({
    play,
    pause,
    toggle,
    isPlaying,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="fixed bottom-24 right-4 z-40"
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white/80 transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#1b4965] text-white ring-4 ring-sky-300/40 shadow-sky-400/20'
            : 'bg-white/95 text-[#1b4965] hover:bg-white'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <Disc className="w-6 h-6 text-amber-200" />
            </motion.div>
            <motion.div
              animate={{ y: [-2, -8, -2], opacity: [0, 0.9, 0], x: [0, 4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-2 pointer-events-none"
            >
              <Music className="w-3.5 h-3.5 text-sky-200" />
            </motion.div>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-slate-500" />
        )}
      </motion.button>
    </motion.div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';
