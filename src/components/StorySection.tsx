import { motion } from 'motion/react';
import { FloralHeader } from './FloralDecorations';
import { storyItems } from '../data/invitationData';

export function StorySection() {
  return (
    <section id="story" className="py-12 px-4 bg-[#f8fbfe] flex flex-col items-center">
      <div className="max-w-md w-full flex flex-col items-center">
        <FloralHeader title="Our Story" />

        <div className="w-full mt-4 space-y-8">
          {storyItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.82, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-sky-100 flex flex-col items-center text-center transition-shadow hover:shadow-md"
            >
              {/* Story Photo */}
              <div className="w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-xs mb-4 bg-sky-50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Story Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#1b4965] font-sans-wedding mb-2">
                {item.title}
              </h3>

              {/* Story Content */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans-wedding text-justify">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
