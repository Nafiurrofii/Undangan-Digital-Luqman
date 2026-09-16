import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Home, Users, Calendar, Gift, MessageSquare, ArrowDownCircle } from 'lucide-react';

interface BottomNavProps {
  onReopenCover?: () => void;
}

export function BottomNav({ onReopenCover }: BottomNavProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const isManualScrollRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { id: 'hero', label: 'Sampul', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Users },
    { id: 'event', label: 'Acara', icon: Calendar },
    { id: 'gift', label: 'Hadiah', icon: Gift },
    { id: 'rsvp', label: 'Ucapan', icon: MessageSquare },
  ];

  // Robust scroll-spy function to synchronize active section with viewport
  const updateActiveSectionOnScroll = useCallback(() => {
    if (isManualScrollRef.current) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // 1. If at or very close to the bottom of the page, activate 'rsvp'
    if (windowHeight + scrollY >= docHeight - 90) {
      setActiveSection('rsvp');
      return;
    }

    // 2. If at or near the very top, activate 'hero'
    if (scrollY < 180) {
      setActiveSection('hero');
      return;
    }

    // 3. Scan sections against a trigger line at ~38% of viewport height
    const triggerPoint = windowHeight * 0.38;
    const sectionIds = ['hero', 'couple', 'event', 'gift', 'rsvp'];

    let currentSection = 'hero';

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      // Section is active if it spans or is closest to the focus trigger line
      if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
        currentSection = id;
        break;
      } else if (rect.top <= triggerPoint) {
        currentSection = id;
      }
    }

    setActiveSection(currentSection);
  }, []);

  // Synchronize with scroll events
  useEffect(() => {
    let animationFrameId: number;

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateActiveSectionOnScroll);
    };

    // Initial check
    updateActiveSectionOnScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, [updateActiveSectionOnScroll]);

  // Click-to-scroll handler with smooth animation & temporary lock
  const scrollToSection = (id: string) => {
    isManualScrollRef.current = true;
    setActiveSection(id);

    if (id === 'hero') {
      const scrollY = window.scrollY || window.pageYOffset;
      // If already at top and onReopenCover is available, allow reopening cover
      if (scrollY < 80 && onReopenCover) {
        onReopenCover();
        isManualScrollRef.current = false;
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        // Offset so section header and cards are framed nicely
        const yOffset = -24;
        const targetY = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }

    // Release lock after smooth scroll settles
    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
      updateActiveSectionOnScroll();
    }, 850);
  };

  // Auto scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;

    const scrollStep = 1.4;
    const interval = setInterval(() => {
      window.scrollBy(0, scrollStep);
      // If reached bottom, stop
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
        setIsAutoScrolling(false);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  return (
    <>
      {/* Auto Scroll Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-24 left-4 z-40"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shadow-md border border-white/80 transition-colors cursor-pointer ${
            isAutoScrolling
              ? 'bg-amber-500 text-white'
              : 'bg-white/95 text-[#1b4965] hover:bg-white'
          }`}
          title="Otomatis Gulir Halaman"
        >
          <ArrowDownCircle className={`w-4 h-4 ${isAutoScrolling ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline">{isAutoScrolling ? 'Hentikan' : 'Auto Scroll'}</span>
        </motion.button>
      </motion.div>

      {/* Floating Bottom Navigation Bar (Synchronized) */}
      <motion.nav
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        aria-label="Navigasi Undangan"
        className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full px-1.5 sm:px-2 py-1.5 shadow-xl border border-sky-200/80 flex items-center justify-around"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => scrollToSection(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center min-w-[54px] py-1.5 px-2 rounded-xl sm:rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#1b4965] font-bold'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Active Background Pill Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-sky-100/80 rounded-xl sm:rounded-full -z-10 shadow-xs border border-sky-200/60"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}

              <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'stroke-[2.5] scale-110' : 'stroke-[1.8]'}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight select-none transition-colors duration-200 ${isActive ? 'font-bold text-[#1b4965]' : 'font-medium text-slate-400'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.nav>
    </>
  );
}

