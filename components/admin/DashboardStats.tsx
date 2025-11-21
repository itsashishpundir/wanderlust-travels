import React, { useState, useEffect } from 'react';
import { DollarSign, FileText, Users, Bell } from 'lucide-react';
import api from '../../services/api';

export const DashboardStats = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const bookingsRes = await api.get('/bookings');
                setBookings(bookingsRes.data.bookings || bookingsRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculate stats
    const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
    const totalBookings = bookings.length;
    const pendingRequests = bookings.filter(b => b.status === 'Pending').length;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, trend: '+12.5%', color: 'bg-green-500', icon: DollarSign },
                    { title: 'Total Bookings', value: totalBookings.toString(), trend: '+5.2%', color: 'bg-blue-500', icon: FileText },
                    { title: 'Active Users', value: '2,342', trend: '+18.0%', color: 'bg-purple-500', icon: Users }, // Still hardcoded as we don't fetch all users here
                    { title: 'Pending Requests', value: pendingRequests.toString(), trend: '-2.4%', color: 'bg-orange-500', icon: Bell }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.title}</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</h3>
                            <span className={`inline-block mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {stat.trend} from last month
                            </span>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                            <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity Chart Placeholder */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Revenue Overview</h3>
                        <select className="bg-gray-50 dark:bg-gray-700 border-none text-sm rounded-lg p-2 outline-none text-gray-700 dark:text-gray-200">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between space-x-2">
                        {[35, 45, 30, 60, 75, 50, 65, 80, 70, 90, 100, 85].map((h, i) => (
                            <div key={i} className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-sm relative group hover:bg-blue-200 transition-all">
                                <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                </div>
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ${h * 1000}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Bookings List */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Recent Bookings</h3>
                    <div className="space-y-4">
                        {bookings.slice(0, 4).map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold mr-3">
                                        {booking.customerName ? booking.customerName.charAt(0) : 'U'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{booking.customerName || 'Unknown'}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{booking.serviceType}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">${booking.amount}</p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {bookings.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No recent bookings</p>}
                        <button className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition">
                            View All Bookings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
