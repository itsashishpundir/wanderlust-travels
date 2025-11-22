import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Package } from '../../types';
import api from '../../services/api';

export const TrendingPackages: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await api.get('/packages');
                const data = response.data.packages || response.data;
                if (Array.isArray(data)) {
                    setPackages(data.slice(0, 3));
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

    if (loading) {
        return <div className="py-20 text-center">Loading packages...</div>;
    }

    return (
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
                                        to={`/package/${pkg.slug || pkg.id}`}
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
    );
};
