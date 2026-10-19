export interface GuestInfo {
  name: string;
  category?: string;
  seatNumber?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoType: 'bca' | 'danamon' | 'bri' | 'dana' | 'shopeepay' | 'other';
  qrCodeUrl?: string;
}

export interface StoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
  iconType: 'prep' | 'akad' | 'resepsi' | 'puncak';
}

export interface WishItem {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  companion?: string;
  menu?: string;
  message: string;
  timestamp: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  dateStr: string;
  timeStr: string;
  locationName: string;
  address: string;
  mapUrl: string;
  calendarTitle: string;
}
