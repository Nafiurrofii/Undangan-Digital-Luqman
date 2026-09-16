import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';
import { FloralHeader, FloralCorner } from './FloralDecorations';
import { weddingEvents, weddingInfo } from '../data/invitationData';
import { CountdownTime } from '../types';
import { AnimatedDigit } from './AnimatedDigit';

export function EventsSection() {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingInfo.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const createGoogleCalendarLink = (title: string, details: string, location: string) => {
    const startDate = '20261127T010000Z'; // 08:00 WIB
    const endDate = '20261127T060000Z';   // 13:00 WIB
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;
  };

  return (
    <section id="event" className="py-12 px-4 bg-gradient-to-b from-[#f8fbfe] via-[#edf5fc] to-[#f4f9fd] relative overflow-hidden">
      <FloralCorner position="top-left" className="absolute top-0 left-0 w-28 h-28 opacity-65" />
      <FloralCorner position="bottom-right" className="absolute bottom-0 right-0 w-28 h-28 opacity-65" />

      <div className="relative z-20 max-w-md mx-auto flex flex-col items-center">
        {/* Floral Header */}
        <FloralHeader title="Wedding Event" />

        <p className="text-xs text-slate-500 font-sans-wedding text-center mb-6 max-w-xs">
          Rangkaian acara pernikahan kami yang akan diselenggarakan dengan penuh kehangatan dan rasa syukur.
        </p>

        {/* EVENT CARDS */}
        <div className="w-full space-y-6">
          {weddingEvents.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.82, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
              className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 shadow-md border border-sky-100 flex flex-col items-center text-center relative overflow-hidden transition-shadow hover:shadow-lg"
            >
              {/* Subtle blue corner flourish */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-sky-100 to-transparent rounded-bl-full pointer-events-none" />

              <h3 className="font-script text-3xl sm:text-4xl text-[#1b4965] mb-3">
                {evt.title}
              </h3>

              {/* Date */}
              <div className="flex items-center justify-center gap-2 text-slate-700 text-xs sm:text-sm font-semibold mb-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>{evt.dateStr}</span>
              </div>

              {/* Time */}
              <div className="flex items-center justify-center gap-2 text-slate-600 text-xs mb-3">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>{evt.timeStr}</span>
              </div>

              {/* Place */}
              <div className="my-2 p-3 w-full rounded-2xl bg-[#f5f9fc] border border-sky-50">
                <p className="text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  {evt.locationName}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {evt.address}
                </p>
              </div>

              {/* Buttons with micro-interactions */}
              <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 w-full justify-center">
                <motion.a
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  href={evt.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-[#1b4965] text-white text-xs font-medium hover:bg-[#153a52] transition-colors shadow-xs group"
                >
                  <MapPin className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  <span>Maps Lokasi Acara</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  href={createGoogleCalendarLink(evt.calendarTitle, evt.address, evt.locationName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-full bg-white border border-sky-200 text-[#1b4965] text-xs font-medium hover:bg-sky-50 transition-colors shadow-xs group"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-sky-600 transition-transform group-hover:scale-110" />
                  <span>Ingatkan Kalender</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Countdown matching screenshot with smooth AnimatedDigit */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 w-full flex flex-col items-center"
        >
          <p className="text-xs uppercase tracking-widest text-[#2a6f97] font-semibold mb-3">
            Menghitung Hari Menuju Acara
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-xs">
            {[
              { label: 'HARI', value: timeLeft.days },
              { label: 'JAM', value: timeLeft.hours },
              { label: 'MENIT', value: timeLeft.minutes },
              { label: 'DETIK', value: timeLeft.seconds },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -2, scale: 1.02 }}
                className="bg-[#1b4965] text-white rounded-xl py-2.5 px-2 flex flex-col items-center justify-center shadow-md border border-sky-800/40"
              >
                <span className="text-xl font-bold font-sans-wedding min-h-[1.75rem] flex items-center justify-center">
                  <AnimatedDigit value={item.value} />
                </span>
                <span className="text-[9px] tracking-wider uppercase opacity-85 mt-0.5">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-slate-600 italic text-center mt-5 max-w-xs px-2 leading-relaxed">
            "Besar harapan kami jika Bapak/Ibu/Sahabat/Saudara/i berkenan hadir pada acara ini. Atas perhatiannya Terima kasih."
          </p>
        </motion.div>

        {/* Google Map Embedded Section */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-full bg-white rounded-3xl p-4 shadow-md border border-sky-100 flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1b4965] mb-3">
            <MapPin className="w-4 h-4 text-sky-600" />
            <span>Denpasar, Bali — Lokasi Acara</span>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-sky-100 shadow-inner">
            <iframe
              title="Peta Lokasi Acara"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126215.17646738927!2d115.14329241640624!3d-8.6726833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2409b0e5e80db%3A0xe27334e811e03102!2sDenpasar%2C%20Bali!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://maps.google.com/?q=Denpasar+Bali"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1b4965] hover:underline"
          >
            <span>Petunjuk Arah Lewat Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
