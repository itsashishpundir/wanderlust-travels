import React, { useState } from 'react';
import { Calendar, MapPin, Users, Briefcase } from 'lucide-react';
import { TravelType } from '../types';
import api from '../services/api';

export const Booking: React.FC = () => {
  const [bookingType, setBookingType] = useState<TravelType>(TravelType.TAXI);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Note: In a real app, serviceId and amount would come from the selected service context
      await api.post('/bookings', {
        serviceType: bookingType,
        date,
        details: `Pickup: ${pickup}, Destination: ${destination}, Travelers: ${travelers}`,
        amount: 0, // Placeholder as this is a general inquiry/booking form
        serviceId: 'general-inquiry' // Placeholder
      });
      alert('Booking Request Sent Successfully!');
    } catch (error: any) {
      console.error('Booking failed:', error);
      alert('Booking failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 py-6 px-8">
          <h1 className="text-2xl font-bold text-white">Book Your Trip</h1>
          <p className="text-blue-100 mt-1">Fill in the details below to reserve your spot.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Travel Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Service Type</label>
            <div className="relative">
              <Briefcase className="absolute top-3 left-3 text-gray-400" size={20} />
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value as TravelType)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                {Object.values(TravelType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="City, Hotel, or Airport"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
              <div className="relative">
                <Calendar className="absolute top-3 left-3 text-gray-400" size={20} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
              <div className="relative">
                <Users className="absolute top-3 left-3 text-gray-400" size={20} />
                <input
                  type="number"
                  min="1"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value))}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg"
            >
              Book Now
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              By booking you agree to our terms and conditions.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
