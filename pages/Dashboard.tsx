import React, { useState } from 'react';
import { User, Package, CreditCard, Settings, Bell, LogOut, MapPin, Calendar } from 'lucide-react';
import { MOCK_BOOKINGS, MOCK_PACKAGES } from '../constants';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        activeTab === id 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                  JD
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 dark:text-white">John Doe</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Traveler</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <SidebarItem id="bookings" icon={Package} label="My Bookings" />
                <SidebarItem id="trips" icon={MapPin} label="Upcoming Trips" />
                <SidebarItem id="payments" icon={CreditCard} label="Payments" />
                <SidebarItem id="profile" icon={User} label="Profile Settings" />
                <SidebarItem id="notifications" icon={Bell} label="Notifications" />
                <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 border border-gray-200 dark:border-gray-700 min-h-[600px]">
              
              {activeTab === 'bookings' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Bookings</h2>
                  <div className="space-y-4">
                    {MOCK_BOOKINGS.map((booking) => (
                      <div key={booking.id} className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
                          <div className={`p-3 rounded-full ${
                            booking.serviceType === 'Package' ? 'bg-purple-100 text-purple-600' : 
                            booking.serviceType === 'Hotel' ? 'bg-orange-100 text-orange-600' : 
                            'bg-green-100 text-green-600'
                          }`}>
                            {booking.serviceType === 'Package' ? <Package size={24}/> : booking.serviceType === 'Hotel' ? <MapPin size={24}/> : <CreditCard size={24}/>}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{booking.details}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">ID: #{booking.id} • {booking.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 w-full md:w-auto justify-between">
                          <span className="font-bold text-gray-900 dark:text-white">${booking.amount}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'trips' && (
                 <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Trips</h2>
                    {MOCK_PACKAGES.slice(0,1).map(pkg => (
                       <div key={pkg.id} className="relative rounded-2xl overflow-hidden h-64 shadow-lg group cursor-pointer">
                           <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.title}/>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                               <h3 className="text-2xl font-bold text-white">{pkg.title}</h3>
                               <div className="flex items-center text-gray-200 mt-2">
                                   <Calendar size={16} className="mr-2"/> Starts in 15 Days
                               </div>
                           </div>
                       </div>
                    ))}
                    <div className="mt-8 text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                        <p className="text-gray-500 dark:text-gray-400">No more upcoming trips.</p>
                        <button className="mt-4 text-blue-600 font-bold hover:underline">Plan a new trip</button>
                    </div>
                 </div>
              )}

              {activeTab === 'profile' && (
                <div className="animate-fade-in max-w-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input type="text" defaultValue="John Doe" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input type="email" defaultValue="john.doe@example.com" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                        <input type="tel" defaultValue="+1 555 123 4567" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
                        <input type="date" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                    <div className="pt-4">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">Save Changes</button>
                    </div>
                  </form>
                </div>
              )}
              
               {['payments', 'notifications'].includes(activeTab) && (
                   <div className="flex flex-col items-center justify-center h-full py-20 animate-fade-in">
                       <Settings size={48} className="text-gray-300 mb-4" />
                       <h3 className="text-xl font-bold text-gray-500">Under Construction</h3>
                       <p className="text-gray-400">This section is coming soon.</p>
                   </div>
               )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};