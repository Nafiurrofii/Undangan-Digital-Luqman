import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Video } from 'lucide-react';
import { FloralHeader } from './FloralDecorations';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-12 px-4 bg-[#f8fbfe] flex flex-col items-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <FloralHeader title="Video Momen" />

        <p className="text-xs text-slate-500 font-sans-wedding text-center mb-6">
          Kilas balik momen lamaran & janji suci perjalanan cinta kami
        </p>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="w-full aspect-video rounded-3xl overflow-hidden shadow-md border-2 border-white bg-slate-900 relative flex items-center justify-center group"
        >
          {isPlaying ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/g2g6Nq1B7eE?autoplay=1&rel=0"
              title="Sisca Kohl & Tobias Justin Moment"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80"
                alt="Video Thumbnail"
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40" />

              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Putar Video"
                className="relative z-10 w-14 h-14 rounded-full bg-white/90 text-[#1b4965] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
              >
                <Play className="w-6 h-6 fill-[#1b4965] ml-1" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-center">
                <p className="text-white text-xs font-semibold drop-shadow-md flex items-center justify-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-sky-300" />
                  <span>Sisca Kohl, Will You Marry Me?</span>
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
