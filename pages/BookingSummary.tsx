import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Calendar, Users, CreditCard, Shield, CheckCircle, ArrowRight, Briefcase, Info } from 'lucide-react';
import api from '../services/api';
import { TravelType } from '../types';

export const BookingSummary: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Destructure state with defaults to avoid crashes if accessed directly
    const {
        type = TravelType.PACKAGE,
        id,
        name = 'General Booking',
        price = 0,
        date: initialDate = '',
        guests: initialGuests = 1,
        image
    } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pickup: '',
        dropoff: '',
        date: initialDate,
        guests: initialGuests,
        specialRequests: ''
    });

    // Pre-fill user data if logged in
    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            const [first, ...last] = user.name ? user.name.split(' ') : ['', ''];
            setFormData(prev => ({
                ...prev,
                firstName: first || '',
                lastName: last.join(' ') || '',
                email: user.email || '',
                phone: user.phone || ''
            }));
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateTotal = () => {
        const base = Number(price) * Number(formData.guests);
        const taxes = base * 0.05; // 5% tax
        return {
            base,
            taxes,
            total: base + taxes
        };
    };

    const { base, taxes, total } = calculateTotal();

    const handleBooking = async () => {
        if (!formData.date) {
            alert('Please select a date.');
            return;
        }

        setIsProcessing(true);
        try {
            // Construct details string based on service type
            let details = `Guests: ${formData.guests}, Date: ${formData.date}`;
            if (type === TravelType.TAXI) {
                details += `, Pickup: ${formData.pickup}, Dropoff: ${formData.dropoff || name}`;
            }
            if (formData.specialRequests) {
                details += `, Request: ${formData.specialRequests}`;
            }

            const bookingPayload = {
                serviceType: type.toUpperCase(), // Ensure matches backend enum (PACKAGE, HOTEL, TAXI, HOMESTAY)
                serviceId: id || 'custom-booking',
                serviceName: name,
                date: formData.date,
                amount: total,
                details: details,
                paymentStatus: 'UNPAID' // In a real app, this would depend on payment gateway response
            };

            await api.post('/bookings', bookingPayload);

            // Simulate Payment Delay
            setTimeout(() => {
                setIsProcessing(false);
                alert('Booking Confirmed Successfully!');
                navigate('/dashboard');
            }, 1500);

        } catch (error: any) {
            console.error('Booking failed:', error);
            setIsProcessing(false);
            alert(`Booking Failed: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Confirm Your Booking</h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Column: Details & Payment */}
                    <div className="w-full lg:w-2/3 space-y-8">

                        {/* Traveller / Booking Details Form */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                                Booking Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Common Fields */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>

                                {/* Dynamic Fields based on Service Type */}
                                <div className="md:col-span-2 border-t border-gray-100 dark:border-gray-700 pt-4 mt-2">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Service Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                {type === TravelType.TAXI ? 'Pickup Date & Time' : 'Check-in / Start Date'}
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute top-3.5 left-3 text-gray-400" size={18} />
                                                <input
                                                    type="date"
                                                    name="date"
                                                    value={formData.date}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                {type === TravelType.TAXI ? 'Passengers' : 'Guests / Travelers'}
                                            </label>
                                            <div className="relative">
                                                <Users className="absolute top-3.5 left-3 text-gray-400" size={18} />
                                                <input
                                                    type="number"
                                                    min="1"
                                                    name="guests"
                                                    value={formData.guests}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                />
                                            </div>
                                        </div>

                                        {type === TravelType.TAXI && (
                                            <>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pickup Location</label>
                                                    <div className="relative">
                                                        <MapPin className="absolute top-3.5 left-3 text-gray-400" size={18} />
                                                        <input
                                                            type="text"
                                                            name="pickup"
                                                            value={formData.pickup}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                            placeholder="Enter pickup address"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dropoff Location</label>
                                                    <div className="relative">
                                                        <MapPin className="absolute top-3.5 left-3 text-gray-400" size={18} />
                                                        <input
                                                            type="text"
                                                            name="dropoff"
                                                            value={formData.dropoff}
                                                            onChange={handleInputChange}
                                                            className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                                            placeholder={`Destination: ${name}`}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Requests (Optional)</label>
                                            <textarea
                                                name="specialRequests"
                                                value={formData.specialRequests}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"
                                                placeholder="Dietary restrictions, late check-in, etc."
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                                Payment Method
                            </h2>

                            <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                                {['card', 'upi', 'netbanking'].map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setPaymentMethod(method)}
                                        className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all whitespace-nowrap ${paymentMethod === method
                                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                                            }`}
                                    >
                                        {method === 'card' ? 'Credit/Debit Card' : method === 'upi' ? 'UPI / GPay' : 'Net Banking'}
                                    </button>
                                ))}
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-4 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Number</label>
                                        <div className="relative">
                                            <CreditCard className="absolute top-3.5 left-3 text-gray-400" size={20} />
                                            <input type="text" className="w-full pl-10 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0000 0000 0000 0000" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expiry Date</label>
                                            <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="MM/YY" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                                            <input type="password" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="123" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Card Holder Name</label>
                                        <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="text-center py-8 animate-fade-in">
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">Scan QR code or enter UPI ID to pay</p>
                                    <div className="h-48 w-48 bg-gray-200 dark:bg-gray-700 mx-auto rounded-lg flex items-center justify-center mb-4">
                                        <span className="text-gray-500">QR Code Placeholder</span>
                                    </div>
                                    <input type="text" className="max-w-xs mx-auto w-full p-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" placeholder="username@upi" />
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">Order Summary</h3>

                            <div className="flex gap-4 mb-6">
                                <img
                                    src={image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"}
                                    className="w-20 h-20 object-cover rounded-lg"
                                    alt="Service Thumbnail"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2">{name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{type.toLowerCase()}</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
                                <div className="flex justify-between">
                                    <span>Date</span>
                                    <span className="font-medium">{formData.date || 'Not selected'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{type === TravelType.TAXI ? 'Passengers' : 'Guests'}</span>
                                    <span className="font-medium">{formData.guests}</span>
                                </div>
                                {type === TravelType.TAXI && formData.pickup && (
                                    <div className="flex justify-between">
                                        <span>Pickup</span>
                                        <span className="font-medium truncate max-w-[150px]">{formData.pickup}</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 text-sm border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Base Price ({formData.guests} x ${price})</span>
                                    <span>${base.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Taxes & Fees (5%)</span>
                                    <span>${taxes.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <div className="flex items-start text-xs text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                <Shield size={16} className="mr-2 flex-shrink-0 text-green-500" />
                                Secure SSL encryption. Your personal data is safe.
                            </div>

                            <button
                                onClick={handleBooking}
                                disabled={isProcessing}
                                className={`w-full py-4 rounded-lg font-bold text-white shadow-lg flex items-center justify-center ${isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {isProcessing ? 'Processing...' : (
                                    <>
                                        Pay ${total.toFixed(2)} <ArrowRight size={20} className="ml-2" />
                                    </>
                                )}
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};