import { BankAccount, StoryItem, TimelineItem, WishItem, WeddingEvent } from '../types';

export const weddingInfo = {
  groom: {
    nickname: 'Luqman',
    fullName: 'Muhamad Luqman Hakim',
    fatherName: 'Bapak Wiji Rochman',
    motherName: 'Ibu Nur Lailin',
    city: '',
    instagram: '',
    instagramUrl: '',
    photo: 'https://res.cloudinary.com/powtyiwc/image/upload/v1789316761/WhatsApp_Image_2026-09-11_at_23.10.12_i1qgwt.jpg',
  },
  bride: {
    nickname: 'Naila',
    fullName: 'Nailatus Sa\'adah',
    address: 'TPQ Al Hikmatul Hidayah, rt.02 rw.01 dsn. Pesantren Jambangan, Candi, Kab. Sidoarjo, Jawa Timur, Indonesia.',
    fatherName: 'Bapak Shibro Malisi',
    motherName: 'Ibu Muamalah',
    city: '',
    instagram: '',
    instagramUrl: '',
    photo: 'https://res.cloudinary.com/powtyiwc/image/upload/v1789316761/WhatsApp_Image_2026-09-11_at_23.10.12_i1qgwt.jpg',
  },
  couplePhotos: {
    hero: 'https://res.cloudinary.com/powtyiwc/image/upload/v1789316761/WhatsApp_Image_2026-09-11_at_23.10.12_i1qgwt.jpg',
    middle: 'https://res.cloudinary.com/powtyiwc/image/upload/v1789316761/WhatsApp_Image_2026-09-11_at_23.10.12_i1qgwt.jpg',
    closing: 'https://res.cloudinary.com/powtyiwc/image/upload/v1789316761/WhatsApp_Image_2026-09-11_at_23.10.12_i1qgwt.jpg',
  },
  targetDate: new Date('2026-11-27T08:00:00+07:00').toISOString(),
};

export const weddingEvents: WeddingEvent[] = [
  {
    id: 'akad',
    title: 'Akad Nikah',
    dateStr: 'Jumat, 27 November 2026',
    timeStr: 'Rilex',
    locationName: 'Kediaman Mempelai Perempuan',
    address: 'di Rumah Mempelai Perempuan',
    mapUrl: 'https://maps.app.goo.gl/jbZCACY9MmbBjcxB6?g_st=ac',
    calendarTitle: 'Akad Nikah Luqman & Naila',
  },
  {
    id: 'resepsi',
    title: 'Resepsi',
    dateStr: 'Jumat, 27 November 2026',
    timeStr: 'Rilex',
    locationName: 'Kediaman Mempelai Perempuan',
    address: 'Jl. Ki Hajar Dewantara Dsn. Pesantren Ds. Jambangan Kec. Candi Kab. Sidoarjo',
    mapUrl: 'https://maps.app.goo.gl/jbZCACY9MmbBjcxB6?g_st=ac',
    calendarTitle: 'Resepsi Pernikahan Luqman & Naila',
  },
  {
    id: 'ngunduh',
    title: 'Ngunduh Mantu',
    dateStr: 'Minggu, 29 November 2026',
    timeStr: 'Rilex',
    locationName: 'Kediaman Mempelai Laki-laki',
    address: 'Dsn. Gebangsiwil Ds. Bukur Kec. Patianrowo Kab. Nganjuk',
    mapUrl: 'https://maps.app.goo.gl/T9EX7efRiP1344fG8',
    calendarTitle: 'Ngunduh Mantu Luqman & Naila',
  },
];

export const storyItems: StoryItem[] = [
  {
    id: 'story-1',
    title: 'Pertemuan Di Kereta Api',
    description:
      'Pertemuan tak terduga di sebuah kereta api membawa Aria dan Ryan dalam sebuah cerita cinta perjalanan yang tak terlupakan. Dari obrolan ringan tentang buku yang dibaca hingga pemandangan indah yang berlalu di jendela, membawa mereka pada sebuah cerita cinta perjalanan bisnis ke kota lain.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&auto=format&fit=crop&q=80',
  },
  {
    id: 'story-2',
    title: 'Lanjut Ke Pelaminan',
    description:
      'Setelah itu, Ryan dan Aria terus berhubungan dan memulai sebuah hubungan yang manis. Mereka mengunjungi tempat-tempat yang indah dan menikmati setiap momen bersama. Perjalanan tak terduga di kereta api telah membawa mereka pada sebuah cerita cinta membawa mereka pada sebuah cerita cinta perjalanan yang tak terlupakan.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&auto=format&fit=crop&q=80',
  },
];

export const timelineItems: TimelineItem[] = [
  {
    time: '08 WIB',
    title: 'Persiapan dan Kedatangan Tamu',
    description: 'Pengantin dan keluarga bersiap-siap menyambut tamu undangan yang mulai tiba di lokasi.',
    iconType: 'prep',
  },
  {
    time: '10 WIB',
    title: 'Akad Nikah',
    description: 'Pembacaan ayat suci Al-Qur\'an, khutbah nikah atau tokoh agama, ijab kabul, dan doa restu.',
    iconType: 'akad',
  },
  {
    time: '11 WIB',
    title: 'Resepsi Pernikahan',
    description: 'Sambutan dari kedua mempelai & keluarga, ramah tamah, iringan musik, dan tarian tradisional.',
    iconType: 'resepsi',
  },
  {
    time: '14.00 WIB s/d Selesai',
    title: 'Acara Puncak Kami',
    description: 'Hiburan musik akustik, santap siang bersama para tamu terhormat, dan sesi foto kenangan.',
    iconType: 'puncak',
  },
];

export const bankAccounts: BankAccount[] = [
  {
    id: 'dana-bride',
    bankName: 'Dana',
    accountNumber: '085748261931',
    accountHolder: 'Nailatus Sa\'adah',
    logoType: 'dana',
  },
  {
    id: 'dana-groom',
    bankName: 'Dana / Shopeepay',
    accountNumber: '085748151295',
    accountHolder: 'Muhamad Luqman Hakim',
    logoType: 'dana',
  },
];

export const initialWishes: WishItem[] = [
  {
    id: 'w-1',
    name: 'ARIS & NADIA',
    attendance: 'hadir',
    companion: '2 Orang',
    menu: 'Menu Tradisional Nusantara',
    message:
      'Selamat menempuh hidup baru untuk Luqman & Naila. Semoga menjadi keluarga sakinah, mawaddah, warahmah, berkah dan bahagia selalu sampai akhir hayat.',
    timestamp: '2026-09-03 02:15:08',
  },
  {
    id: 'w-2',
    name: 'Ahmad Fauzi',
    attendance: 'hadir',
    companion: '1 Orang',
    menu: 'Menu Tradisional Nusantara',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khoir untuk Luqman & Naila.',
    timestamp: '2026-09-01 12:55:08',
  },
  {
    id: 'w-3',
    name: 'Siti Rahmawati',
    attendance: 'hadir',
    companion: '2 Orang',
    menu: 'Special Vegetarian',
    message: 'Selamat berbahagia untuk kedua mempelai tercinta, semoga senantiasa dilimpahi keberkahan dan keharmonisan.',
    timestamp: '2026-08-31 11:24:36',
  },
  {
    id: 'w-4',
    name: 'Budi Santoso & Keluarga',
    attendance: 'hadir',
    companion: '3 Orang',
    menu: 'Menu Tradisional Nusantara',
    message: 'Selamat berbahagia Muhamad Luqman Hakim & Nailatus Sa\'adah! Semoga menjadi keluarga yang senantiasa dipenuhi cinta dan keberkahan Allah SWT.',
    timestamp: '2026-08-30 19:40:12',
  },
];

export const galleryPhotos = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&auto=format&fit=crop&q=85',
    caption: 'Momen Bahagia Bersama',
  },
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&auto=format&fit=crop&q=85',
    caption: 'Janji Suci di Hari Bahagia',
  },
  {
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&auto=format&fit=crop&q=85',
    caption: 'Langkah Awal Menuju Masa Depan',
  },
  {
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&auto=format&fit=crop&q=85',
    caption: 'Senyuman Penuh Cinta',
  },
  {
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&auto=format&fit=crop&q=85',
    caption: 'Kebersamaan yang Hangat',
  },
  {
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=900&auto=format&fit=crop&q=85',
    caption: 'Mawar Biru dan Keabadian',
  },
];
