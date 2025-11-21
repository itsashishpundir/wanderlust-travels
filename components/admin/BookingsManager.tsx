import React, { useState, useEffect } from 'react';
import { Filter, MoreVertical, ChevronLeft, Search } from 'lucide-react';
import { Booking } from '../../types';
import api from '../../services/api';

const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => {
    const colorClasses: { [key: string]: string } = {
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[color] || colorClasses.gray}`}>
            {children}
        </span>
    );
};

export const BookingsManager = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await api.get('/bookings');
            setBookings(response.data.bookings || response.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = async (id: string, newStatus: Booking['status']) => {
        try {
            const booking = bookings.find(b => b.id === id);
            if (booking) {
                await api.put(`/bookings/${id}`, { ...booking, status: newStatus });
                setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
            }
        } catch (error: any) {
            console.error('Error updating booking status:', error);
            alert(`Failed to update status: ${error.response?.data?.message || error.message}`);
        }
    };

    const handlePaymentStatusChange = async (id: string, newStatus: Booking['paymentStatus']) => {
        try {
            const booking = bookings.find(b => b.id === id);
            if (booking) {
                await api.put(`/bookings/${id}`, { ...booking, paymentStatus: newStatus });
                setBookings(bookings.map(b => b.id === id ? { ...b, paymentStatus: newStatus } : b));
            }
        } catch (error: any) {
            console.error('Error updating payment status:', error);
            alert(`Failed to update payment status: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleView = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsEditing(true);
    }

    if (isEditing && selectedBooking) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Booking Details #{selectedBooking.id}</h3>
                    <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center">
                        <ChevronLeft size={18} className="mr-1" /> Back to List
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Customer Info</h4>
                        <p className="text-lg font-medium dark:text-white">{selectedBooking.customerName}</p>
                        <p className="text-sm text-gray-500">user@example.com</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Booking Info</h4>
                        <p className="text-sm dark:text-gray-300"><span className="font-bold">Service:</span> {selectedBooking.serviceType}</p>
                        <p className="text-sm dark:text-gray-300"><span className="font-bold">Date:</span> {selectedBooking.date}</p>
                        <p className="text-sm dark:text-gray-300"><span className="font-bold">Details:</span> {selectedBooking.details}</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Status</h4>
                        <div className="flex items-center space-x-4">
                            <select
                                value={selectedBooking.status}
                                onChange={(e) => {
                                    const newStatus = e.target.value as Booking['status'];
                                    handleStatusChange(selectedBooking.id, newStatus);
                                    setSelectedBooking({ ...selectedBooking, status: newStatus });
                                }}
                                className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Pending">Pending</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">Payment</h4>
                        <div className="flex items-center space-x-4">
                            <select
                                value={selectedBooking.paymentStatus}
                                onChange={(e) => {
                                    const newStatus = e.target.value as Booking['paymentStatus'];
                                    handlePaymentStatusChange(selectedBooking.id, newStatus);
                                    setSelectedBooking({ ...selectedBooking, paymentStatus: newStatus });
                                }}
                                className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            >
                                <option value="Paid">Paid</option>
                                <option value="Unpaid">Unpaid</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">All Bookings</h2>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 text-sm font-medium flex items-center hover:bg-gray-50 dark:hover:bg-gray-600">
                        <Filter size={16} className="mr-2" /> Filter
                    </button>
                    <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600">
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Booking ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service Detail</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#{booking.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.customerName}</div>
                                        <div className="text-xs text-gray-500">user@example.com</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-white font-medium">{booking.serviceType}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-xs">{booking.details}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{booking.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge color={booking.status === 'Confirmed' ? 'green' : booking.status === 'Pending' ? 'yellow' : 'red'}>
                                            {booking.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">${booking.amount}</div>
                                        <span className={`text-xs ${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                                            {booking.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleView(booking)} className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400 mr-4">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
