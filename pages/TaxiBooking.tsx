import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Check, Info } from 'lucide-react';
import { TaxiOption } from '../types';
import api from '../services/api';

export const TaxiBooking: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('one-way');
    const [selectedCar, setSelectedCar] = useState<string | null>(null);
    const [taxis, setTaxis] = useState<TaxiOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaxis = async () => {
            try {
                const response = await api.get('/taxis');
                const data = response.data.taxis || response.data;
                if (Array.isArray(data)) {
                    setTaxis(data);
                } else {
                    setTaxis([]);
                }
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
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Book Your Safe Ride</h1>
                    <p className="text-gray-600 dark:text-gray-400">Choose from our wide range of fleet for outstation or local travel.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Booking Form */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 sticky top-24">
                            <div className="flex text-sm font-medium text-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                                <button
                                    onClick={() => setActiveTab('one-way')}
                                    className={`w-1/2 py-4 ${activeTab === 'one-way' ? 'bg-white dark:bg-gray-800 text-blue-600 border-t-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                                >
                                    One Way
                                </button>
                                <button
                                    onClick={() => setActiveTab('round-trip')}
                                    className={`w-1/2 py-4 ${activeTab === 'round-trip' ? 'bg-white dark:bg-gray-800 text-blue-600 border-t-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                                >
                                    Round Trip
                                </button>
                            </div>

                            <div className="p-6 space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">From</label>
                                    <div className="relative">
                                        <MapPin className="absolute top-3 left-3 text-gray-400" size={18} />
                                        <input type="text" placeholder="Enter Pickup City" className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">To</label>
                                    <div className="relative">
                                        <MapPin className="absolute top-3 left-3 text-gray-400" size={18} />
                                        <input type="text" placeholder="Enter Destination" className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:text-white" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute top-3 left-3 text-gray-400" size={18} />
                                            <input type="date" className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Time</label>
                                        <div className="relative">
                                            <Clock className="absolute top-3 left-3 text-gray-400" size={18} />
                                            <input type="time" className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 dark:text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                                    <div className="flex justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
                                        <span>Est. Distance:</span>
                                        <span className="font-bold">250 km</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                                        <span>Est. Time:</span>
                                        <span className="font-bold">5 hrs 30 mins</span>
                                    </div>
                                </div>

                                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition">
                                    Search Cabs
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Car Selection */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Available Cars</h3>

                        {taxis.map((car) => (
                            <div
                                key={car.id}
                                onClick={() => setSelectedCar(car.id)}
                                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 border-2 cursor-pointer transition-all ${selectedCar === car.id ? 'border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'}`}
                            >
                                <div className="w-full md:w-1/3">
                                    <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-lg" />
                                </div>
                                <div className="w-full md:w-2/3 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{car.name}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{car.type} • {car.capacity} Seater</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">${car.baseFare}</span>
                                            <span className="text-xs text-gray-400">Base Fare</span>
                                        </div>
                                    </div>

                                    <div className="my-4 flex flex-wrap gap-2">
                                        {car.features.map((feature, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded">{feature}</span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4">
                                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                            <Info size={14} className="mr-1" /> ${car.pricePerKm}/km after 250km
                                        </div>
                                        <button className={`px-6 py-2 rounded-md font-semibold transition ${selectedCar === car.id ? 'bg-green-600 text-white' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                                            {selectedCar === car.id ? 'Selected' : 'Select'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {selectedCar && (
                            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-2xl z-40 animate-fade-in-up">
                                <div className="max-w-7xl mx-auto flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Total Estimate</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">$500.00</p>
                                    </div>
                                    <button
                                        onClick={() => navigate('/booking', { state: { type: 'Taxi', carId: selectedCar } })}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700"
                                    >
                                        Proceed to Book
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};