import { motion } from 'motion/react';
import { UserCheck, Heart, Sparkles, Utensils } from 'lucide-react';
import { FloralHeader } from './FloralDecorations';
import { timelineItems } from '../data/invitationData';

export function TimelineSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'prep':
        return <UserCheck className="w-4 h-4 text-sky-600" />;
      case 'akad':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />;
      case 'resepsi':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'puncak':
      default:
        return <Utensils className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-[#f8fbfe] via-[#edf5fc] to-[#f8fbfe] flex flex-col items-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <FloralHeader title="Susunan Acara" />

        <p className="text-xs text-slate-500 font-sans-wedding text-center mb-8">
          Jadwal dan susunan rangkaian prosesi pernikahan
        </p>

        {/* Vertical Timeline */}
        <div className="w-full relative pl-6 sm:pl-8 space-y-6 before:absolute before:top-3 before:bottom-3 before:left-3 sm:before:left-4 before:w-0.5 before:bg-gradient-to-b before:from-sky-300 before:via-sky-400 before:to-sky-200">
          {timelineItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -25, y: 15 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              className="relative flex flex-col bg-white rounded-2xl p-4 shadow-sm border border-sky-100 transition-shadow hover:shadow-md"
            >
              {/* Timeline Dot with Icon */}
              <div className="absolute -left-[30px] sm:-left-[35px] top-4 w-7 h-7 rounded-full bg-white border-2 border-sky-400 flex items-center justify-center shadow-xs">
                {getIcon(item.iconType)}
              </div>

              {/* Time Badge */}
              <div className="inline-block self-start px-2.5 py-0.5 rounded-md bg-sky-100/70 text-[#1b4965] font-bold text-xs mb-1">
                {item.time}
              </div>

              {/* Title */}
              <h4 className="text-sm sm:text-base font-bold text-slate-800 font-sans-wedding">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
