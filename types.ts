export interface Package {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewsCount: number;
  days: number; // Kept for backward compatibility
  durationDays?: number; // Added for backend compatibility
  image: string;
  images: string[];
  description: string;
  itinerary: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  policies: string[];
  category: 'Trekking' | 'Temple Tour' | 'Adventure' | 'Relaxation' | 'Honeymoon' | string;
}

export interface Booking {
  id: string;
  customerName: string;
  serviceType: 'Package' | 'Taxi' | 'Hotel';
  details: string;
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  amount: number;
  paymentStatus: 'Paid' | 'Unpaid';
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
}

export interface Homestay {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
}

export interface TaxiOption {
  id: string;
  name: string;
  type: 'Sedan' | 'SUV' | 'Traveler';
  image: string;
  pricePerKm: number;
  baseFare: number;
  capacity: number;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags?: string[];
}

export enum TravelType {
  TAXI = 'Taxi',
  HOTEL = 'Hotel',
  TREKKING = 'Trekking',
  TEMPLE_TOUR = 'Temple Tour',
  ADVENTURE = 'Adventure'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  status: 'Open' | 'Closed' | 'In Progress';
  date: string;
  lastUpdate: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}