import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, CheckCircle, Share2, Heart, Info, Home } from 'lucide-react';
import { Homestay } from '../types';
import api from '../services/api';

export const HomestayDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [homestay, setHomestay] = useState<Homestay | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchHomestay = async () => {
            try {
                const response = await api.get(`/homestays/${id}`);
                setHomestay(response.data.homestay || response.data);
            } catch (error) {
                console.error('Error fetching homestay:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchHomestay();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!homestay) return <div className="min-h-screen flex justify-center items-center">Homestay not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 transition-colors duration-300">
            {/* Breadcrumbs */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/homestays" className="hover:text-blue-600">Homestays</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-white font-medium">{homestay.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{homestay.name}</h1>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <MapPin size={18} className="mr-1 text-blue-500" /> {homestay.location}
                            <span className="mx-3">|</span>
                            <div className="flex items-center text-yellow-500">
                                <span className="font-bold mr-1">{homestay.rating}</span> ★
                                <span className="text-gray-400 ml-1 text-sm">({homestay.reviews || 0} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                        <button className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-red-500"><Heart size={20} /></button>
                        <button className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-500"><Share2 size={20} /></button>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="h-[400px] mb-8 rounded-2xl overflow-hidden shadow-lg relative">
                    <img src={homestay.image} alt="Main" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm">
                        View All Photos
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                            {['overview', 'amenities', 'policies'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-3 px-6 font-medium text-sm capitalize whitespace-nowrap ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[300px]">
                            {activeTab === 'overview' && (
                                <div className="animate-fade-in">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About this Homestay</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{homestay.description || 'Experience authentic local living in this cozy homestay. Perfect for travelers seeking a personal touch and home-cooked meals.'}</p>
                                </div>
                            )}

                            {activeTab === 'amenities' && (
                                <div className="animate-fade-in">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Amenities</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {homestay.amenities?.map((amenity, idx) => (
                                            <div key={idx} className="flex items-center text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                                {amenity.toLowerCase().includes('wifi') ? <Wifi size={18} className="mr-2 text-blue-500" /> :
                                                    amenity.toLowerCase().includes('coffee') || amenity.toLowerCase().includes('breakfast') ? <Coffee size={18} className="mr-2 text-blue-500" /> :
                                                        <CheckCircle size={18} className="mr-2 text-blue-500" />}
                                                {amenity}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'policies' && (
                                <div className="animate-fade-in">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">House Rules</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start text-gray-600 dark:text-gray-300">
                                            <Info size={18} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                            Check-in: 12:00 PM
                                        </li>
                                        <li className="flex items-start text-gray-600 dark:text-gray-300">
                                            <Info size={18} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                            Check-out: 11:00 AM
                                        </li>
                                        <li className="flex items-start text-gray-600 dark:text-gray-300">
                                            <Info size={18} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                            Quiet hours: 10:00 PM - 7:00 AM
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Price per night</p>
                                <div className="flex items-end">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${homestay.pricePerNight}</span>
                                    <span className="text-gray-500 dark:text-gray-400 mb-1 ml-1">/ room</span>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check-in Date</label>
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guests</label>
                                    <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                        <option>1 Guest</option>
                                        <option>2 Guests</option>
                                        <option>3 Guests</option>
                                        <option>4+ Guests</option>
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <div className="flex justify-between text-sm mb-2 text-gray-600 dark:text-gray-400">
                                        <span>Base Price (1 Night)</span>
                                        <span>${homestay.pricePerNight}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-4 text-gray-600 dark:text-gray-400">
                                        <span>Service Fee</span>
                                        <span>${Math.round(homestay.pricePerNight * 0.10)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg mb-6 text-gray-900 dark:text-white border-t dark:border-gray-700 pt-2">
                                        <span>Total</span>
                                        <span>${homestay.pricePerNight + Math.round(homestay.pricePerNight * 0.10)}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate('/booking', { state: { type: 'HOMESTAY', id: homestay.id, name: homestay.name, price: homestay.pricePerNight, date: selectedDate } })}
                                    className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
                                >
                                    Book Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
