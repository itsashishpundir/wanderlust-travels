import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, CreditCard, Shield, CheckCircle, ArrowRight } from 'lucide-react';

export const BookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          alert('Payment Successful! Booking Confirmed.');
          navigate('/dashboard');
      }, 2000);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Confirm Your Booking</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Traveller Details & Payment */}
            <div className="w-full lg:w-2/3 space-y-8">
                
                {/* Traveller Details Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                        Traveller Information
                    </h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                            <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                            <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input type="email" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                            <input type="tel" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+1 234 567 890" />
                        </div>
                    </form>
                </div>

                {/* Payment Method */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                     <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                        Payment Method
                    </h2>
                    
                    <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                        {['card', 'upi', 'netbanking'].map((method) => (
                             <button 
                                key={method}
                                onClick={() => setPaymentMethod(method)}
                                className={`flex-1 py-3 rounded-lg border font-medium transition-all ${
                                    paymentMethod === method 
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
                                    <CreditCard className="absolute top-3.5 left-3 text-gray-400" size={20}/>
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
                         <img src="https://picsum.photos/100/100?random=1" className="w-20 h-20 object-cover rounded-lg" alt="Thumb" />
                         <div>
                             <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2">Majestic Himalayan Trek</h4>
                             <p className="text-sm text-gray-500 dark:text-gray-400">10 Days / 9 Nights</p>
                         </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-6">
                         <div className="flex justify-between">
                             <span>Date</span>
                             <span className="font-medium">Oct 15, 2023</span>
                         </div>
                         <div className="flex justify-between">
                             <span>Guests</span>
                             <span className="font-medium">2 Adults</span>
                         </div>
                    </div>
                    
                    <div className="space-y-3 text-sm border-t border-gray-100 dark:border-gray-700 pt-4 mb-6">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Base Price</span>
                            <span>$2400</span>
                        </div>
                         <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Taxes & Fees</span>
                            <span>$120</span>
                        </div>
                         <div className="flex justify-between text-green-600 font-medium">
                            <span>Discount (Early Bird)</span>
                            <span>-$50</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <span>Total</span>
                        <span>$2470</span>
                    </div>
                    
                    <div className="flex items-start text-xs text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <Shield size={16} className="mr-2 flex-shrink-0 text-green-500" />
                        Secure SSL encryption. Your personal data is safe.
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full py-4 rounded-lg font-bold text-white shadow-lg flex items-center justify-center ${isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isProcessing ? 'Processing...' : (
                            <>
                                Pay $2470 <ArrowRight size={20} className="ml-2" />
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