import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, ArrowRight, DollarSign, Users, ArrowLeft } from 'lucide-react';
import { TopDestinations } from '../components/home/TopDestinations';
import { TrendingPackages } from '../components/home/TrendingPackages';
import { TaxiBanner } from '../components/home/TaxiBanner';
import { TravelTips } from '../components/home/TravelTips';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

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

      <TopDestinations />
      <TrendingPackages />
      <TaxiBanner />
      <TravelTips />

      {/* Floating WhatsApp Button */}
      <a href="#" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition z-50 flex items-center justify-center">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </a>

    </div>
  );
};