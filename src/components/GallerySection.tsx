import { useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { FloralHeader } from './FloralDecorations';
import { galleryPhotos } from '../data/invitationData';

export function GallerySection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx + 1) % galleryPhotos.length);
  };

  return (
    <section id="gallery" className="py-12 px-4 bg-gradient-to-b from-[#f8fbfe] via-[#edf5fc] to-[#f8fbfe] flex flex-col items-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <FloralHeader title="Galeri Foto" />

        <p className="text-xs text-slate-500 font-sans-wedding text-center mb-6">
          Potret kebahagiaan dan kehangatan cinta kami
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {galleryPhotos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.94, y: 28 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              onClick={() => setActivePhotoIdx(idx)}
              className={`group relative rounded-2xl overflow-hidden shadow-xs border-2 border-white cursor-pointer bg-sky-100 transition-shadow hover:shadow-lg ${
                idx % 3 === 0 ? 'col-span-2 h-56' : 'h-40'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-2.5 rounded-full bg-white/90 text-[#1b4965] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActivePhotoIdx(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-lg w-full flex flex-col items-center"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActivePhotoIdx(null)}
                aria-label="Tutup Galeri"
                className="absolute -top-10 right-0 p-2 text-white hover:text-sky-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div
                onClick={(e) => e.stopPropagation()}
                className="relative rounded-2xl overflow-hidden max-h-[75vh] w-full bg-black shadow-2xl flex items-center justify-center"
              >
                <img
                  src={galleryPhotos[activePhotoIdx].url}
                  alt={galleryPhotos[activePhotoIdx].caption}
                  className="w-full h-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />

                {/* Nav buttons */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              <p className="text-white/90 text-xs mt-3 text-center font-sans-wedding">
                {galleryPhotos[activePhotoIdx].caption} ({activePhotoIdx + 1} / {galleryPhotos.length})
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
