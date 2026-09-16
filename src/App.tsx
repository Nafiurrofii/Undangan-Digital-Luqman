import { useState, useEffect, useRef } from 'react';
import { CoverModal } from './components/CoverModal';
import { HeroSection } from './components/HeroSection';
import { GreetingSection } from './components/GreetingSection';
import { CoupleSection } from './components/CoupleSection';
import { EventsSection } from './components/EventsSection';
import { GiftSection } from './components/GiftSection';
import { RsvpSection } from './components/RsvpSection';
import { ClosingSection } from './components/ClosingSection';
import { BottomNav } from './components/BottomNav';
import { AudioPlayer, AudioPlayerRef } from './components/AudioPlayer';
import { toTitleCase } from './utils/textFormat';

export function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [guestName, setGuestName] = useState('Bapak/Ibu/Saudara/i');
  const audioPlayerRef = useRef<AudioPlayerRef>(null);

  // Read guest name from URL query parameter (?to=..., ?nama=..., etc.) and enforce Title Case
  useEffect(() => {
    const parseGuestNameFromUrl = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const raw =
          urlParams.get('to') ||
          urlParams.get('nama') ||
          urlParams.get('name') ||
          urlParams.get('u') ||
          urlParams.get('guest');

        if (raw && raw.trim()) {
          const decoded = decodeURIComponent(raw.replace(/\+/g, ' ')).trim();
          if (decoded) {
            setGuestName(toTitleCase(decoded));
            return;
          }
        }
        setGuestName('Bapak/Ibu/Saudara/i');
      } catch {
        setGuestName('Bapak/Ibu/Saudara/i');
      }
    };

    parseGuestNameFromUrl();

    window.addEventListener('popstate', parseGuestNameFromUrl);
    return () => {
      window.removeEventListener('popstate', parseGuestNameFromUrl);
    };
  }, []);

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
    // Start playing romantic wedding background music
    if (audioPlayerRef.current) {
      audioPlayerRef.current.play();
    }
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Lock background scroll while the cover envelope is active
  useEffect(() => {
    if (isCoverOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCoverOpen]);

  return (
    <div className="min-h-screen bg-[#f4f9fd] text-slate-800 font-sans-wedding relative selection:bg-sky-200 selection:text-[#1b4965]">
      {/* Main Wedding Invitation Content Container */}
      <main className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-x-hidden pb-28 sm:pb-32">
        {/* Cover / Envelope Landing Modal */}
        <CoverModal
          isOpen={isCoverOpen}
          guestName={guestName}
          onOpen={handleOpenInvitation}
        />

        {/* Hero Section with Couple Arch Photo, Script Title, & Countdown */}
        <HeroSection />

        {/* Greeting Section with Arabic Salam, Bismillah & Ar-Rum Quote */}
        <GreetingSection />

        {/* Profile Mempelai (Justin & Sisca) */}
        <CoupleSection />

        {/* Rangkaian Acara (Resepsi, Akad, Makan Malam, Google Maps) */}
        <EventsSection />

        {/* Titip Hadiah (Amplop Digital BCA, Mandiri, BRI, Danamon & Kado Fisik) */}
        <GiftSection />

        {/* Konfirmasi Kehadiran & Ucapan (RSVP + Live Feed) */}
        <RsvpSection defaultGuestName={guestName === 'Bapak/Ibu/Saudara/i' ? '' : guestName} />

        {/* Penutup & Ucapan Terima Kasih */}
        <ClosingSection />
      </main>

      {/* Floating Audio Controller */}
      <AudioPlayer ref={audioPlayerRef} />

      {/* Floating Bottom Navigation Bar with Auto-Scroll */}
      <BottomNav onReopenCover={() => setIsCoverOpen(true)} />
    </div>
  );
}

export default App;
