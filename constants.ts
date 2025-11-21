import { Package, Hotel, TaxiOption, Booking, BlogPost, FAQ, SupportTicket, Notification } from './types';

export const MOCK_PACKAGES: Package[] = [
  {
    id: '1',
    title: 'Majestic Himalayan Trek',
    location: 'Nepal',
    price: 1200,
    rating: 4.8,
    reviewsCount: 124,
    days: 10,
    image: 'https://picsum.photos/800/600?random=1',
    images: ['https://picsum.photos/800/600?random=101', 'https://picsum.photos/800/600?random=102', 'https://picsum.photos/800/600?random=103'],
    description: 'Experience the breathtaking views of the Himalayas on this 10-day guided trek. Perfect for adventure seekers.',
    itinerary: [
      'Day 1: Arrival in Kathmandu',
      'Day 2: Flight to Lukla',
      'Day 3-8: Trekking through various villages',
      'Day 9: Return to Kathmandu',
      'Day 10: Departure'
    ],
    highlights: ['Mount Everest View', 'Sherpa Culture', 'High Altitude Passes'],
    included: ['Guide', 'Permits', 'Accommodation', 'Meals'],
    excluded: ['International Flights', 'Personal Equipment'],
    policies: ['Cancellation allowed up to 30 days', 'Travel insurance required'],
    category: 'Trekking'
  },
  {
    id: '2',
    title: 'Tropical Paradise Escape',
    location: 'Bali, Indonesia',
    price: 850,
    rating: 4.9,
    reviewsCount: 89,
    days: 7,
    image: 'https://picsum.photos/800/600?random=2',
    images: ['https://picsum.photos/800/600?random=201', 'https://picsum.photos/800/600?random=202'],
    description: 'Relax on pristine beaches and explore ancient temples in Bali. A perfect mix of relaxation and culture.',
    itinerary: [
      'Day 1: Airport Pickup',
      'Day 2: Ubud Tour',
      'Day 3: Beach Day',
      'Day 4: Temple Visits',
      'Day 5: Free Time',
      'Day 6: Sunset Dinner',
      'Day 7: Departure'
    ],
    highlights: ['Ubud Monkey Forest', 'Tanah Lot Temple', 'Seminyak Beach'],
    included: ['Hotel', 'Breakfast', 'Transfers'],
    excluded: ['Lunch & Dinner', 'Tips'],
    policies: ['Free cancellation 7 days prior', 'No pets allowed'],
    category: 'Relaxation'
  },
  {
    id: '3',
    title: 'Kyoto Cultural Immersion',
    location: 'Kyoto, Japan',
    price: 1500,
    rating: 4.7,
    reviewsCount: 56,
    days: 5,
    image: 'https://picsum.photos/800/600?random=3',
    images: ['https://picsum.photos/800/600?random=301', 'https://picsum.photos/800/600?random=302'],
    description: 'Step back in time and explore the traditional heart of Japan with tea ceremonies and temple visits.',
    itinerary: [
      'Day 1: Arrival',
      'Day 2: Kinkaku-ji',
      'Day 3: Fushimi Inari',
      'Day 4: Tea Ceremony',
      'Day 5: Departure'
    ],
    highlights: ['Golden Pavilion', 'Bamboo Forest', 'Gion District'],
    included: ['Ryokan Stay', 'Rail Pass', 'Guide'],
    excluded: ['Flights', 'Shopping'],
    policies: ['Strict cancellation policy', 'Moderate walking required'],
    category: 'Temple Tour'
  }
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Grand Horizon Hotel',
    location: 'Mumbai, India',
    pricePerNight: 150,
    rating: 4.5,
    reviews: 320,
    image: 'https://picsum.photos/800/600?random=20',
    images: ['https://picsum.photos/800/600?random=21', 'https://picsum.photos/800/600?random=22'],
    amenities: ['Pool', 'Spa', 'WiFi', 'Gym'],
    description: 'Luxury stay in the heart of Mumbai with ocean views.'
  },
  {
    id: 'h2',
    name: 'Mountain View Resort',
    location: 'Manali, India',
    pricePerNight: 80,
    rating: 4.8,
    reviews: 150,
    image: 'https://picsum.photos/800/600?random=23',
    images: ['https://picsum.photos/800/600?random=24'],
    amenities: ['Bonfire', 'Trekking', 'Restaurant', 'WiFi'],
    description: 'Cozy resort nestled in the Himalayas.'
  }
];

export const MOCK_TAXIS: TaxiOption[] = [
  {
    id: 't1',
    name: 'Comfort Sedan',
    type: 'Sedan',
    image: 'https://picsum.photos/400/250?random=50',
    pricePerKm: 12,
    baseFare: 500,
    capacity: 4,
    features: ['AC', 'Music System', 'Boot Space']
  },
  {
    id: 't2',
    name: 'Luxury SUV',
    type: 'SUV',
    image: 'https://picsum.photos/400/250?random=51',
    pricePerKm: 18,
    baseFare: 800,
    capacity: 6,
    features: ['AC', 'Leather Seats', 'GPS', 'USB Charging']
  },
  {
    id: 't3',
    name: 'Group Traveler',
    type: 'Traveler',
    image: 'https://picsum.photos/400/250?random=52',
    pricePerKm: 25,
    baseFare: 1500,
    capacity: 12,
    features: ['AC', 'Pushback Seats', 'First Aid']
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Top 10 Hidden Gems in Bali',
    excerpt: 'Discover the secret spots that tourists often miss, from secluded waterfalls to ancient temples hidden in the jungle.',
    content: 'Full article content goes here. Bali is known for its popular beaches, but the real magic lies in the north...',
    author: 'Sarah Jenkins',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/800/600?random=60',
    category: 'Travel Guide'
  },
  {
    id: 'b2',
    title: 'Packing Guide for Himalayan Treks',
    excerpt: 'Everything you need to know about gear and clothing for a successful and safe trek in the high mountains.',
    content: 'Full article content goes here. Layering is key when trekking in the Himalayas...',
    author: 'Mike Summit',
    date: 'Nov 05, 2023',
    image: 'https://picsum.photos/800/600?random=61',
    category: 'Tips'
  },
  {
    id: 'b3',
    title: 'Culinary Journey Through Rajasthan',
    excerpt: 'Experience the royal flavors of Rajasthan. From Dal Baati Churma to Laal Maas, here is what you must eat.',
    content: 'Full article content goes here. Rajasthan offers a distinct flavor profile dominated by dried spices...',
    author: 'Raj Singh',
    date: 'Dec 01, 2023',
    image: 'https://picsum.photos/800/600?random=62',
    category: 'Food & Drink'
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'B001', customerName: 'Alice Johnson', serviceType: 'Package', details: 'Majestic Himalayan Trek', date: '2023-10-15', status: 'Confirmed', amount: 1200, paymentStatus: 'Paid' },
  { id: 'B002', customerName: 'Bob Smith', serviceType: 'Hotel', details: 'Grand Horizon Hotel (2 Nights)', date: '2023-11-01', status: 'Pending', amount: 300, paymentStatus: 'Unpaid' },
  { id: 'B003', customerName: 'Charlie Brown', serviceType: 'Taxi', details: 'Airport to City Center (SUV)', date: '2023-12-10', status: 'Confirmed', amount: 45, paymentStatus: 'Paid' },
  { id: 'B004', customerName: 'Diana Prince', serviceType: 'Package', details: 'Kyoto Cultural Immersion', date: '2024-01-05', status: 'Cancelled', amount: 1500, paymentStatus: 'Unpaid' },
];

export const MOCK_FAQS: FAQ[] = [
  { question: 'How do I cancel my booking?', answer: 'You can cancel your booking from the "My Bookings" section in your dashboard. Cancellation fees may apply depending on the policy.', category: 'Booking' },
  { question: 'Is travel insurance included?', answer: 'Basic travel insurance is included in some packages. Please check the "Inclusions" tab on the package details page.', category: 'Insurance' },
  { question: 'Can I customize a tour package?', answer: 'Yes! You can contact our support team to request a customized itinerary based on your preferences.', category: 'Packages' },
  { question: 'What payment methods do you accept?', answer: 'We accept Credit/Debit cards, Net Banking, UPI, and major international wallets.', category: 'Payment' }
];

export const MOCK_TICKETS: SupportTicket[] = [
  { id: 'TICK-2839', subject: 'Refund request for Booking #B004', status: 'In Progress', date: '2024-01-06', lastUpdate: '2 hours ago' },
  { id: 'TICK-1122', subject: 'Issue with hotel check-in', status: 'Closed', date: '2023-11-01', lastUpdate: 'Nov 02, 2023' }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Booking Confirmed', message: 'Your booking for Majestic Himalayan Trek has been confirmed.', date: '2 hours ago', read: false },
  { id: 'n2', title: 'Payment Received', message: 'We received your payment of $1200.', date: '2 hours ago', read: false },
  { id: 'n3', title: 'New Offer Alert', message: 'Get 20% off on Bali packages this weekend!', date: '1 day ago', read: true }
];