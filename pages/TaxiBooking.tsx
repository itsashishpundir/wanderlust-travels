import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Users, Briefcase, CheckCircle, Info } from 'lucide-react';
import { TaxiOption } from '../types';
import api from '../services/api';
import ImageWithFallback from '../components/ImageWithFallback';

export const TaxiBooking = () => {
    const navigate = useNavigate();
    const [taxis, setTaxis] = useState<TaxiOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaxis = async () => {
            try {
                const response = await api.get('/taxis');
                setTaxis(response.data.taxis || response.data);
            } catch (error) {
                console.error('Error fetching taxis:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTaxis();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Hero Section */}
            <div className="bg-blue-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Taxi Background" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Premium Taxi Services</h1>
                    <p className="text-blue-200 max-w-2xl mx-auto text-lg">Reliable, comfortable, and affordable rides for your journey. Choose from our wide range of vehicles.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {taxis.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <Car size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Taxis Available</h3>
                        <p className="text-gray-500 dark:text-gray-400">We are currently updating our fleet. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {taxis.map((car) => (
                            <div key={car.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                                <div className="h-56 overflow-hidden relative group">
                                    <ImageWithFallback src={car.image} alt={car.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                        {car.type}
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{car.name}</h3>
                                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                                <Users size={16} className="mr-1" /> {car.capacity} Passengers
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${car.pricePerKm}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">per km</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6 flex-grow">
                                        <div className="flex items-center justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2">
                                            <span className="text-gray-600 dark:text-gray-300">Base Fare</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">${car.baseFare}</span>
                                        </div>

                                        {car.features && car.features.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {car.features.map((feature, index) => (
                                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => navigate('/booking', { state: { type: 'TAXI', id: car.id, name: car.name, price: car.baseFare } })}
                                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
