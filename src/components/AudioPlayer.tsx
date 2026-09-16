import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'motion/react';
import { VolumeX, Disc, Music } from 'lucide-react';

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
}

export const AudioPlayer = forwardRef<AudioPlayerRef>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);

  // Romantic Canon in D / Wedding progression arpeggios
  const chordNotes = [
    // D major
    [293.66, 369.99, 440.0, 587.33],
    // A major
    [220.0, 277.18, 329.63, 440.0],
    // B minor
    [246.94, 293.66, 369.99, 493.88],
    // F# minor
    [185.0, 220.0, 277.18, 369.99],
    // G major
    [196.0, 246.94, 293.66, 392.0],
    // D major
    [146.83, 220.0, 293.66, 369.99],
    // G major
    [196.0, 246.94, 293.66, 392.0],
    // A7 major
    [220.0, 277.18, 329.63, 440.0],
  ];

  const playChime = (freq: number, duration = 1.4, timeOffset = 0) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const startTime = ctx.currentTime + timeOffset;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Soft warm bell/piano timbre
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm envelope
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const startSynthesis = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    let chordIdx = 0;
    const intervalTime = 1600; // ms per chord bar

    const playNextBar = () => {
      if (!isPlayingRef.current) return;
      const notes = chordNotes[chordIdx % chordNotes.length];

      // Arpeggiate chord notes smoothly
      notes.forEach((freq, idx) => {
        playChime(freq, 1.8, idx * 0.35);
      });

      // Add high gentle sparkle tone
      playChime(notes[notes.length - 1] * 1.5, 1.2, 0.7);

      chordIdx++;
      noteIndexRef.current = chordIdx;
      timerRef.current = window.setTimeout(playNextBar, intervalTime);
    };

    playNextBar();
  };

  const stopSynthesis = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const toggle = () => {
    if (isPlayingRef.current) {
      stopSynthesis();
    } else {
      startSynthesis();
    }
  };

  useImperativeHandle(ref, () => ({
    play: startSynthesis,
    pause: stopSynthesis,
    toggle,
    isPlaying,
  }));

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

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
