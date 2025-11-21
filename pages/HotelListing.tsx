import React from 'react';
import { MOCK_HOTELS } from '../constants';
import { MapPin, Star, Coffee, Wifi } from 'lucide-react';

export const HotelListing: React.FC = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Top Hotels for You</h1>
                 
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {/* Hotel Filters Sidebar (Simplified) */}
                     <div className="md:col-span-1">
                         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                             <h3 className="font-bold mb-4 dark:text-white">Filters</h3>
                             <div className="space-y-4">
                                 <div>
                                     <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Price Range</h4>
                                     <input type="range" className="w-full" />
                                 </div>
                                 <div>
                                     <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Amenities</h4>
                                     {['Pool', 'WiFi', 'Breakfast', 'Gym'].map(a => (
                                         <label key={a} className="flex items-center mt-2 text-sm dark:text-gray-400">
                                             <input type="checkbox" className="mr-2" /> {a}
                                         </label>
                                     ))}
                                 </div>
                             </div>
                         </div>
                     </div>

                     {/* Hotel List */}
                     <div className="md:col-span-3 space-y-6">
                         {MOCK_HOTELS.map(hotel => (
                             <div key={hotel.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row h-auto md:h-64">
                                 <img src={hotel.image} className="w-full md:w-1/3 h-48 md:h-full object-cover" />
                                 <div className="p-6 flex flex-col justify-between flex-1">
                                     <div>
                                         <div className="flex justify-between">
                                             <h3 className="text-xl font-bold dark:text-white">{hotel.name}</h3>
                                             <div className="flex items-center bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">
                                                 {hotel.rating}
                                             </div>
                                         </div>
                                         <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-1">
                                             <MapPin size={14} className="mr-1" /> {hotel.location}
                                         </p>
                                         <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 line-clamp-2">{hotel.description}</p>
                                         <div className="flex gap-4 mt-4 text-gray-500 dark:text-gray-400 text-sm">
                                             {hotel.amenities.slice(0,3).map(am => (
                                                 <span key={am} className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                     {am === 'WiFi' ? <Wifi size={14} className="mr-1"/> : <Coffee size={14} className="mr-1"/>} {am}
                                                 </span>
                                             ))}
                                         </div>
                                     </div>
                                     <div className="flex justify-between items-end mt-4 md:mt-0">
                                         <div>
                                             <span className="text-2xl font-bold text-gray-900 dark:text-white">${hotel.pricePerNight}</span>
                                             <span className="text-gray-500 text-sm"> / night</span>
                                         </div>
                                         <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">View Room</button>
                                     </div>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
        </div>
    );
};