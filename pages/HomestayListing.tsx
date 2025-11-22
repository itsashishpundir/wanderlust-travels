import React, { useState, useEffect } from 'react';
import { MapPin, Star, Home as HomeIcon, Wifi, Coffee, Car } from 'lucide-react';
import { Homestay } from '../types';
import api from '../services/api';
import ImageWithFallback from '../components/ImageWithFallback';
import { Link, useNavigate } from 'react-router-dom';

const HomestayListing = () => {
    const navigate = useNavigate();
    const [homestays, setHomestays] = useState<Homestay[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomestays = async () => {
            try {
                const response = await api.get('/homestays');
                setHomestays(response.data.homestays || response.data);
            } catch (error) {
                console.error('Error fetching homestays:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomestays();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">

            {/* Hero Section */}
            <div className="bg-blue-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Homestays Hero"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Cozy Homestays</h1>
                    <p className="text-blue-200 max-w-2xl mx-auto text-lg">Experience local hospitality and comfort in our handpicked homestays.</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {homestays.map((homestay) => (
                            <div key={homestay.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                                <div className="relative h-64 overflow-hidden">
                                    <ImageWithFallback
                                        src={homestay.image}
                                        alt={homestay.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-2 py-1 rounded-lg shadow-md flex items-center text-sm font-bold text-yellow-500">
                                        <Star size={14} fill="currentColor" className="mr-1" />
                                        {homestay.rating}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{homestay.name}</h3>
                                        <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">${homestay.pricePerNight}<span className="text-xs text-gray-500 font-normal">/night</span></span>
                                    </div>

                                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4 text-sm">
                                        <MapPin size={14} className="mr-1" />
                                        {homestay.location}
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                        {homestay.description}
                                    </p>

                                    {/* Amenities Preview */}
                                    <div className="flex gap-3 mb-6 text-gray-400">
                                        {homestay.amenities?.slice(0, 3).map((amenity, idx) => (
                                            <span key={idx} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-300">
                                                {amenity}
                                            </span>
                                        ))}
                                        {homestay.amenities?.length > 3 && (
                                            <span className="text-xs flex items-center">+{homestay.amenities.length - 3} more</span>
                                        )}
                                    </div>

                                    <Link
                                        to={`/homestay/${homestay.slug || homestay.id}`}
                                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && homestays.length === 0 && (
                    <div className="text-center py-20">
                        <HomeIcon size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-500">No homestays found</h3>
                        <p className="text-gray-400">Check back later for new listings!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomestayListing;
