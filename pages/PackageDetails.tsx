import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, CheckCircle, XCircle, Calendar, ArrowLeft, Share2, Heart, Info } from 'lucide-react';
import { Package } from '../types';
import api from '../services/api';

export const PackageDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pkg, setPkg] = useState<Package | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await api.get(`/packages/${id}`);
                setPkg(response.data.package || response.data);
            } catch (error) {
                console.error('Error fetching package:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchPackage();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!pkg) return <div>Not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 transition-colors duration-300">
            {/* Breadcrumbs */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/packages" className="hover:text-blue-600">Packages</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 dark:text-white font-medium">{pkg.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{pkg.title}</h1>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <MapPin size={18} className="mr-1 text-blue-500" /> {pkg.location}
                            <span className="mx-3">|</span>
                            <div className="flex items-center text-yellow-500">
                                <span className="font-bold mr-1">{pkg.rating}</span> ★
                                <span className="text-gray-400 ml-1 text-sm">({pkg.reviewsCount} reviews)</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                        <button className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-red-500"><Heart size={20} /></button>
                        <button className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-500"><Share2 size={20} /></button>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px] mb-8 rounded-2xl overflow-hidden">
                    <div className="md:col-span-2 h-full">
                        <img src={pkg.image} alt="Main" className="w-full h-full object-cover hover:scale-105 transition duration-700 cursor-pointer" />
                    </div>
                    <div className="hidden md:flex flex-col gap-4 h-full">
                        {pkg.images && pkg.images.length > 0 ? (
                            <>
                                <img src={pkg.images[0] || pkg.image} alt="Sub 1" className="w-full h-1/2 object-cover hover:scale-105 transition duration-500 cursor-pointer" />
                                <div className="relative h-1/2">
                                    <img src={pkg.images[1] || pkg.image} alt="Sub 2" className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:bg-black/50 transition">
                                        + View All Photos
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                No additional images
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs Navigation */}
                        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                            {['overview', 'itinerary', 'inclusions', 'policies'].map((tab) => (
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
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Trip Overview</h3>
                                    <div
                                        className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 prose dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: pkg.description }}
                                    />
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Highlights</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {pkg.highlights?.map((h, i) => (
                                            <li key={i} className="flex items-start text-gray-600 dark:text-gray-300">
                                                <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'itinerary' && (
                                <div className="animate-fade-in space-y-6">
                                    {pkg.itinerary.map((day, idx) => (
                                        <div key={idx} className="flex">
                                            <div className="flex flex-col items-center mr-4">
                                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                                {idx !== pkg.itinerary.length - 1 && <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-2"></div>}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{day.split(':')[0]}</h4>
                                                <p className="text-gray-600 dark:text-gray-300 mt-1">{day.split(':')[1] || day}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'inclusions' && (
                                <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-green-600 mb-4 flex items-center"><CheckCircle className="mr-2" /> Included</h4>
                                        <ul className="space-y-3">
                                            {pkg.included?.map((item, i) => (
                                                <li key={i} className="text-gray-600 dark:text-gray-300 flex items-start">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2"></span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-red-600 mb-4 flex items-center"><XCircle className="mr-2" /> Excluded</h4>
                                        <ul className="space-y-3">
                                            {pkg.excluded?.map((item, i) => (
                                                <li key={i} className="text-gray-600 dark:text-gray-300 flex items-start">
                                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2"></span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'policies' && (
                                <div className="animate-fade-in">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Booking Policies</h3>
                                    <ul className="space-y-3">
                                        {pkg.policies?.map((policy, i) => (
                                            <li key={i} className="flex items-start text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                                <Info size={18} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                                                {policy}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
                            <div className="mb-6">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
                                <div className="flex items-end">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${pkg.price}</span>
                                    <span className="text-gray-500 dark:text-gray-400 mb-1 ml-1">/ per person</span>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Date</label>
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
                                        <option>1 Adult</option>
                                        <option>2 Adults</option>
                                        <option>2 Adults, 1 Child</option>
                                        <option>3 Adults</option>
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <div className="flex justify-between text-sm mb-2 text-gray-600 dark:text-gray-400">
                                        <span>Base Price (2 pax)</span>
                                        <span>${pkg.price * 2}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-4 text-gray-600 dark:text-gray-400">
                                        <span>Service Fee</span>
                                        <span>$50</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg mb-6 text-gray-900 dark:text-white border-t dark:border-gray-700 pt-2">
                                        <span>Total</span>
                                        <span>${pkg.price * 2 + 50}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate('/booking', {
                                        state: {
                                            type: 'Package',
                                            id: pkg.id,
                                            name: pkg.title,
                                            price: pkg.price,
                                            image: pkg.image,
                                            date: selectedDate
                                        }
                                    })}
                                    className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
                                >
                                    Proceed to Book
                                </button>
                                <button className="w-full border border-blue-600 text-blue-600 dark:text-blue-400 py-3.5 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                                    Send Enquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};