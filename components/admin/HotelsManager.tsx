import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, Image as ImageIcon, Star } from 'lucide-react';
import { MOCK_HOTELS } from '../../constants';
import { Hotel } from '../../types';

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

export const HotelsManager = () => {
    const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
    const [hotels, setHotels] = useState<Hotel[]>(MOCK_HOTELS);
    const [currentHotel, setCurrentHotel] = useState<Partial<Hotel>>({});
    const [amenities, setAmenities] = useState<string[]>([]);

    const handleEdit = (hotel: Hotel) => {
        setCurrentHotel(hotel);
        setAmenities(hotel.amenities || []);
        setMode('edit');
    };

    const handleCreate = () => {
        setCurrentHotel({});
        setAmenities([]);
        setMode('create');
    };

    const handleSave = () => {
        if (mode === 'create') {
            const newHotel = {
                ...currentHotel,
                id: Math.random().toString(36).substr(2, 9),
                amenities,
                image: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 100),
                rating: 0,
                reviews: 0
            } as Hotel;
            setHotels([...hotels, newHotel]);
        } else {
            setHotels(hotels.map(h => h.id === currentHotel.id ? { ...currentHotel, amenities } as Hotel : h));
        }
        setMode('list');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            setHotels(hotels.filter(h => h.id !== id));
        }
    };

    if (mode === 'create' || mode === 'edit') {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{mode === 'create' ? 'Add New Hotel' : 'Edit Hotel'}</h3>
                    <button onClick={() => setMode('list')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center">
                        <ChevronLeft size={18} className="mr-1" /> Back to List
                    </button>
                </div>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hotel Name</label>
                            <input
                                type="text"
                                value={currentHotel.name || ''}
                                onChange={e => setCurrentHotel({ ...currentHotel, name: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="e.g. Grand Horizon"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                            <input
                                type="text"
                                value={currentHotel.location || ''}
                                onChange={e => setCurrentHotel({ ...currentHotel, location: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="City, Country"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Per Night ($)</label>
                            <input
                                type="number"
                                value={currentHotel.pricePerNight || ''}
                                onChange={e => setCurrentHotel({ ...currentHotel, pricePerNight: Number(e.target.value) })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="150"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amenities (comma separated)</label>
                            <input
                                type="text"
                                value={amenities.join(', ')}
                                onChange={e => setAmenities(e.target.value.split(',').map(s => s.trim()))}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="Pool, WiFi, Gym"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            rows={4}
                            value={currentHotel.description || ''}
                            onChange={e => setCurrentHotel({ ...currentHotel, description: e.target.value })}
                            className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                            placeholder="Hotel description..."
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hotel Image</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                            <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Drag and drop image here</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" onClick={() => setMode('list')} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg">Save Hotel</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Manage Hotels</h2>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input type="text" placeholder="Search hotels..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center font-medium hover:bg-blue-700 whitespace-nowrap">
                        <Plus size={18} className="mr-2" /> Add Hotel
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price/Night</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {hotels.map((hotel) => (
                                <tr key={hotel.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={hotel.image} alt="" className="h-12 w-16 object-cover rounded-md" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{hotel.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{hotel.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${hotel.pricePerNight}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500 flex items-center">
                                        <Star size={14} fill="currentColor" className="mr-1" /> {hotel.rating}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button onClick={() => handleEdit(hotel)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full dark:hover:bg-blue-900/30"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(hotel.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full dark:hover:bg-red-900/30"><Trash2 size={16} /></button>
                                        </div>
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
