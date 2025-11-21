import React, { useState, useEffect } from 'react';
import { Search, Plus, MapPin, Edit, Trash2, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { Package } from '../../types';
import api from '../../services/api';
import ImageWithFallback from '../ImageWithFallback';

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

export const PackagesManager = () => {
    const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
    const [packages, setPackages] = useState<Package[]>([]);
    const [currentPackage, setCurrentPackage] = useState<Partial<Package>>({});
    const [itinerary, setItinerary] = useState<string[]>(['', '', '']);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await api.get('/packages');
            setPackages(response.data.packages || response.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleAddDay = () => setItinerary([...itinerary, '']);
    const handleRemoveDay = (index: number) => setItinerary(itinerary.filter((_, i) => i !== index));

    const handleEdit = (pkg: Package) => {
        setCurrentPackage(pkg);
        setItinerary(pkg.itinerary || ['', '', '']);
        setMode('edit');
    };

    const handleCreate = () => {
        setCurrentPackage({});
        setItinerary(['', '', '']);
        setSelectedImage(null);
        setMode('create');
    };

    const handleSave = async () => {
        try {
            const packageData = {
                ...currentPackage,
                itinerary,
                // Ensure required fields are present or have defaults
                image: currentPackage.image || 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 100),
                rating: currentPackage.rating || 0,
                reviewsCount: currentPackage.reviewsCount || 0,
                days: currentPackage.days || 1,
                price: currentPackage.price || 0,
                title: currentPackage.title || 'New Package',
                location: currentPackage.location || 'Unknown',
                category: currentPackage.category || 'Adventure',
                description: currentPackage.description || '',
                highlights: currentPackage.highlights || [],
                included: currentPackage.included || [],
                excluded: currentPackage.excluded || [],
                policies: currentPackage.policies || [],
                images: currentPackage.images || []
            };

            if (mode === 'create') {
                const formData = new FormData();
                formData.append('title', currentPackage.title || 'New Package');
                formData.append('location', currentPackage.location || 'Unknown');
                formData.append('price', (currentPackage.price || 0).toString());
                formData.append('days', (currentPackage.days || 1).toString());
                formData.append('description', currentPackage.description || '');
                formData.append('category', currentPackage.category || 'Adventure');
                formData.append('rating', (currentPackage.rating || 0).toString());
                formData.append('reviewsCount', (currentPackage.reviewsCount || 0).toString());
                formData.append('itinerary', JSON.stringify(itinerary));

                if (selectedImage) {
                    formData.append('image', selectedImage);
                } else if (currentPackage.image) {
                    formData.append('image', currentPackage.image);
                }

                await api.post('/packages', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                const packageData = {
                    ...currentPackage,
                    itinerary,
                    days: currentPackage.days || 1, // Ensure days is sent
                };
                await api.put(`/packages/${currentPackage.id}`, packageData);
            }
            fetchPackages();
            setMode('list');
        } catch (error: any) {
            console.error('Error saving package:', error);
            alert(`Failed to save package: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await api.delete(`/packages/${id}`);
                fetchPackages();
            } catch (error: any) {
                console.error('Error deleting package:', error);
                alert(`Failed to delete package: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    if (mode === 'create' || mode === 'edit') {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{mode === 'create' ? 'Add New Package' : 'Edit Package'}</h3>
                    <button onClick={() => setMode('list')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center">
                        <ChevronLeft size={18} className="mr-1" /> Back to List
                    </button>
                </div>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    {/* General Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Package Title</label>
                            <input
                                type="text"
                                value={currentPackage.title || ''}
                                onChange={e => setCurrentPackage({ ...currentPackage, title: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="e.g. Majestic Himalayan Trek"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                            <select
                                value={currentPackage.category || 'Adventure'}
                                onChange={e => setCurrentPackage({ ...currentPackage, category: e.target.value as any })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                            >
                                <option>Trekking</option>
                                <option>Temple Tour</option>
                                <option>Adventure</option>
                                <option>Relaxation</option>
                                <option>Honeymoon</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
                            <input
                                type="number"
                                value={currentPackage.price || ''}
                                onChange={e => setCurrentPackage({ ...currentPackage, price: Number(e.target.value) })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="1200"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (Days)</label>
                            <input
                                type="number"
                                value={currentPackage.days || ''}
                                onChange={e => setCurrentPackage({ ...currentPackage, days: Number(e.target.value) })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="7"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                            <div className="relative">
                                <MapPin size={18} className="absolute top-3 left-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={currentPackage.location || ''}
                                    onChange={e => setCurrentPackage({ ...currentPackage, location: e.target.value })}
                                    className="w-full pl-10 p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                    placeholder="City, Country"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            rows={4}
                            value={currentPackage.description || ''}
                            onChange={e => setCurrentPackage({ ...currentPackage, description: e.target.value })}
                            className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                            placeholder="Detailed description of the package..."
                        ></textarea>
                    </div>

                    {/* Itinerary Builder */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Itinerary Builder</label>
                        <div className="space-y-3">
                            {itinerary.map((day, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-500 w-16">Day {idx + 1}</span>
                                    <input
                                        type="text"
                                        value={day}
                                        onChange={(e) => {
                                            const newItinerary = [...itinerary];
                                            newItinerary[idx] = e.target.value;
                                            setItinerary(newItinerary);
                                        }}
                                        className="flex-1 p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg outline-none dark:text-white"
                                        placeholder={`Activity for Day ${idx + 1}`}
                                    />
                                    <button type="button" onClick={() => handleRemoveDay(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddDay} className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                                <Plus size={16} className="mr-1" /> Add Day
                            </button>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Package Image</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setSelectedImage(e.target.files[0]);
                                    }
                                }}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                                {selectedImage ? selectedImage.name : "Drag and drop image here, or click to upload"}
                            </p>
                        </div>
                        {currentPackage.image && !selectedImage && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                                <img src={currentPackage.image} alt="Current" className="h-20 w-20 object-cover rounded-lg" />
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" onClick={() => setMode('list')} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg">Save Package</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Manage Packages</h2>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input type="text" placeholder="Search packages..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center font-medium hover:bg-blue-700 whitespace-nowrap">
                        <Plus size={18} className="mr-2" /> Add Package
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {packages.map((pkg) => (
                                <tr key={pkg.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <ImageWithFallback src={pkg.image} alt={pkg.title} className="h-12 w-16 object-cover rounded-md" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{pkg.title}</div>
                                        <div className="text-xs text-gray-500">{pkg.days} Days</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center"><MapPin size={14} className="mr-1" /> {pkg.location}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${pkg.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge color="green">Active</Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button onClick={() => handleEdit(pkg)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full dark:hover:bg-blue-900/30"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(pkg.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full dark:hover:bg-red-900/30"><Trash2 size={16} /></button>
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
