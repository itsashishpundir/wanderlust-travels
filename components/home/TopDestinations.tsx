import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const TopDestinations: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Top Destinations</h2>
                        <p className="text-gray-600 dark:text-gray-400">Explore the most popular places loved by travelers.</p>
                    </div>
                    <div className="flex space-x-2">
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
    );
};
