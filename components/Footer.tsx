import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Wanderlust</h3>
            <p className="text-gray-400 text-sm">
              Making your travel dreams a reality. Discover the world with us, one adventure at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Destinations</a></li>
              <li><a href="#" className="hover:text-white">Tours</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Hotel Booking</a></li>
              <li><a href="#" className="hover:text-white">Car Rentals</a></li>
              <li><a href="#" className="hover:text-white">Flight Booking</a></li>
              <li><a href="#" className="hover:text-white">Travel Insurance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center"><MapPin size={16} className="mr-2" /> 123 Adventure Lane, Travel City</li>
              <li className="flex items-center"><Phone size={16} className="mr-2" /> +1 (555) 123-4567</li>
              <li className="flex items-center"><Mail size={16} className="mr-2" /> support@wanderlust.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Wanderlust Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
