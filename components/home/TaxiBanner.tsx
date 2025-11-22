import React from 'react';
import { Link } from 'react-router-dom';

export const TaxiBanner: React.FC = () => {
    return (
        <section className="py-20 bg-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <img src="https://picsum.photos/1920/600?grayscale&blur=2" className="w-full h-full object-cover" alt="Taxi Background" />
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
    );
};
