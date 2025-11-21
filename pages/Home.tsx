import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, ArrowRight, Star, Users, DollarSign, ArrowLeft } from 'lucide-react';
import { MOCK_BLOGS } from '../constants';
import { Package } from '../types';
import api from '../services/api';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        const data = response.data.packages || response.data;
        if (Array.isArray(data)) {
          setPackages(data.slice(0, 3)); // Take top 3 for trending
        } else {
          setPackages([]);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const slides = [
    { image: 'https://picsum.photos/1920/1080?random=1', title: 'Explore the Unseen World', subtitle: 'Adventure awaits in every corner.' },
    { image: 'https://picsum.photos/1920/1080?random=2', title: 'Luxury Stays & Getaways', subtitle: 'Experience comfort like never before.' },
    { image: 'https://picsum.photos/1920/1080?random=3', title: 'Your Journey Begins Here', subtitle: 'Create memories that last a lifetime.' },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Hero Slider */}
      <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.image} alt="Hero" className="w-full h-full object-cover filter brightness-50" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl md:text-7xl font-bold mb-4 drop-shadow-lg animate-fade-in-up">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 drop-shadow-md animate-fade-in-up delay-100">{slide.subtitle}</p>
              <Link to="/packages" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition transform hover:-translate-y-1 animate-fade-in-up delay-200">
                Plan Your Trip
              </Link>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white z-10"><ArrowLeft size={32} /></button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white z-10"><ArrowRight size={32} /></button>
      </div>

      {/* Advanced Search Bar - Floating Overlap */}
      <div className="relative -mt-16 z-20 px-4">
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Destination</label>
              <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
                <MapPin className="text-blue-500 mr-2" size={20} />
                <input type="text" placeholder="Where to?" className="w-full bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400" />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Date</label>
              <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
                <Calendar className="text-blue-500 mr-2" size={20} />
                <input type="date" className="w-full bg-transparent outline-none text-gray-800 dark:text-white" />
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Budget</label>
              <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
                <DollarSign className="text-blue-500 mr-2" size={20} />
                <select className="w-full bg-transparent outline-none text-gray-800 dark:text-white">
                  <option value="">Any</option>
                  <option value="low">$500 - $1000</option>
                  <option value="med">$1000 - $2000</option>
                  <option value="high">$2000+</option>
                </select>
              </div>
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Guests</label>
              <div className="flex items-center border-b border-gray-300 dark:border-gray-600 py-2">
                <Users className="text-blue-500 mr-2" size={20} />
                <input type="number" min="1" defaultValue="2" className="w-full bg-transparent outline-none text-gray-800 dark:text-white" />
              </div>
            </div>
            <div className="md:col-span-1">
              <button onClick={() => navigate('/packages')} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Top Destinations</h2>
              <p className="text-gray-600 dark:text-gray-400">Explore the most popular places loved by travelers.</p>
            </div>
            <div className="flex space-x-2">
              {/* Dummy nav buttons for carousel */}
              <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"><ArrowLeft size={20} /></button>
              <button className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"><ArrowRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {['Bali', 'Paris', 'Switzerland', 'Dubai', 'Thailand', 'Goa', 'Ladakh', 'Maldives'].map((city, idx) => (
              <div key={city} className="group relative overflow-hidden rounded-xl h-80 cursor-pointer shadow-lg">
                <img
                  src={`https://picsum.photos/400/600?random=${idx + 50}`}
                  alt={city}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-white font-bold text-2xl mb-1">{city}</span>
                  <span className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">20+ Packages Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Packages */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Trending Tour Packages</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-600">
                <div className="h-56 overflow-hidden relative">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                  <span className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-white">
                    {pkg.durationDays || pkg.days} Days
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{pkg.title}</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-300 text-sm mb-4 flex items-center">
                    <MapPin size={14} className="mr-1 text-blue-500" /> {pkg.location}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(pkg.rating) ? "currentColor" : "none"} className={i < Math.floor(pkg.rating) ? "" : "text-gray-300"} />)}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">({pkg.reviewsCount} Reviews)</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-600">
                    <div>
                      <span className="text-xs text-gray-400 block">From</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${pkg.price}</span>
                    </div>
                    <Link
                      to={`/package/${pkg.id}`}
                      className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900 px-4 py-2 rounded-lg font-semibold transition flex items-center"
                    >
                      View Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Taxi CTA */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/1920/600?grayscale&blur=2" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">Need a Ride? Book a Taxi Instantly.</h2>
            <p className="text-blue-100 text-lg max-w-xl">Reliable intercity and local taxi services at the best rates. Choose from Sedans, SUVs, and Travelers.</p>
          </div>
          <Link to="/taxi" className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:bg-gray-100 transition transform hover:scale-105">
            Book Now
          </Link>
        </div>
      </section>

      {/* Latest from Blog */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Travel Tips & Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {MOCK_BLOGS.map((blog) => (
              <div key={blog.id} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3 flex flex-col justify-center">
                  <span className="text-xs font-bold text-blue-500 uppercase mb-2">{blog.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{blog.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <span>{blog.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/blog" className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Read more articles <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a href="#" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition z-50 flex items-center justify-center">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>

    </div>
  );
};