import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, Image as ImageIcon, Star } from 'lucide-react';
import { Hotel } from '../../types';
import api from '../../services/api';
import ImageWithFallback from '../ImageWithFallback';
import Editor from 'react-simple-wysiwyg';



export const HotelsManager = () => {
    const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [currentHotel, setCurrentHotel] = useState<Partial<Hotel>>({});
    const [amenities, setAmenities] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchHotels = async () => {
        setLoading(true);
        try {
            const response = await api.get('/hotels');
            setHotels(response.data.hotels || response.data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

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

    const handleSave = async () => {
        try {
            const hotelData = {
                ...currentHotel,
                amenities,
                // Ensure required fields
                image: currentHotel.image || 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 100),
                rating: currentHotel.rating || 0,
                reviews: currentHotel.reviews || 0,
                name: currentHotel.name || 'New Hotel',
                location: currentHotel.location || 'Unknown',
                pricePerNight: currentHotel.pricePerNight || 0,
                description: currentHotel.description || '',
                slug: currentHotel.slug
            };

            if (mode === 'create') {
                await api.post('/hotels', hotelData);
            } else {
                await api.put(`/hotels/${currentHotel.id}`, hotelData);
            }
            fetchHotels();
            setMode('list');
        } catch (error: any) {
            console.error('Error saving hotel:', error);
            alert(`Failed to save hotel: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            try {
                await api.delete(`/hotels/${id}`);
                fetchHotels();
            } catch (error: any) {
                console.error('Error deleting hotel:', error);
                alert(`Failed to delete hotel: ${error.response?.data?.message || error.message}`);
            }
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                value={currentHotel.slug || ''}
                                onChange={e => setCurrentHotel({ ...currentHotel, slug: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="e.g. grand-horizon"
                            />
                            <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name.</p>
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
                        <div className="md:col-span-2">
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
                        <div className="bg-white dark:bg-gray-700 rounded-lg text-black overflow-hidden border border-gray-300 dark:border-gray-600">
                            <Editor
                                value={currentHotel.description || ''}
                                onChange={(e) => setCurrentHotel({ ...currentHotel, description: e.target.value })}
                                containerProps={{ style: { height: '200px' } }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hotel Image</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        const formData = new FormData();
                                        formData.append('image', file);
                                        try {
                                            const res = await api.post('/upload', formData, {
                                                headers: { 'Content-Type': 'multipart/form-data' },
                                            });
                                            const imageUrl = res.data.imageUrl;
                                            setCurrentHotel({ ...currentHotel, image: imageUrl });
                                        } catch (err) {
                                            console.error('Image upload failed', err);
                                            alert('Failed to upload image');
                                        }
                                    }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center pointer-events-none">
                                {currentHotel.image ? (
                                    <img src={currentHotel.image} alt="Preview" className="h-40 object-cover rounded-lg mb-2 shadow-md" />
                                ) : (
                                    <>
                                        <ImageIcon size={48} className="text-gray-400 mb-2" />
                                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Click to upload hotel image</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
                        <button type="button" onClick={() => setMode('list')} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 mr-4">Cancel</button>
                        <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg transform transition hover:-translate-y-0.5">
                            {mode === 'create' ? 'Create Hotel' : 'Save Changes'}
                        </button>
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
                                        <ImageWithFallback src={hotel.image} alt={hotel.name} className="h-12 w-16 object-cover rounded-md" />
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
