import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, Image as ImageIcon, Car } from 'lucide-react';
import { TaxiOption } from '../../types';
import api from '../../services/api';

export const TaxisManager = () => {
    const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
    const [taxis, setTaxis] = useState<TaxiOption[]>([]);
    const [currentTaxi, setCurrentTaxi] = useState<Partial<TaxiOption>>({});
    const [features, setFeatures] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTaxis = async () => {
        setLoading(true);
        try {
            const response = await api.get('/taxis');
            setTaxis(response.data.taxis || response.data);
        } catch (error) {
            console.error('Error fetching taxis:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaxis();
    }, []);

    const handleEdit = (taxi: TaxiOption) => {
        setCurrentTaxi(taxi);
        setFeatures(taxi.features || []);
        setMode('edit');
    };

    const handleCreate = () => {
        setCurrentTaxi({});
        setFeatures([]);
        setMode('create');
    };

    const handleSave = async () => {
        try {
            const taxiData = {
                ...currentTaxi,
                features,
                // Ensure required fields
                image: currentTaxi.image || 'https://picsum.photos/400/250?random=' + Math.floor(Math.random() * 100),
                name: currentTaxi.name || 'New Taxi',
                type: currentTaxi.type || 'Sedan',
                pricePerKm: currentTaxi.pricePerKm || 0,
                baseFare: currentTaxi.baseFare || 0,
                capacity: currentTaxi.capacity || 4
            };

            if (mode === 'create') {
                await api.post('/taxis', taxiData);
            } else {
                await api.put(`/taxis/${currentTaxi.id}`, taxiData);
            }
            fetchTaxis();
            setMode('list');
        } catch (error: any) {
            console.error('Error saving taxi:', error);
            alert(`Failed to save taxi: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                await api.delete(`/taxis/${id}`);
                fetchTaxis();
            } catch (error: any) {
                console.error('Error deleting taxi:', error);
                alert(`Failed to delete taxi: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    if (mode === 'create' || mode === 'edit') {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{mode === 'create' ? 'Add New Vehicle' : 'Edit Vehicle'}</h3>
                    <button onClick={() => setMode('list')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center">
                        <ChevronLeft size={18} className="mr-1" /> Back to List
                    </button>
                </div>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Name</label>
                            <input
                                type="text"
                                value={currentTaxi.name || ''}
                                onChange={e => setCurrentTaxi({ ...currentTaxi, name: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="e.g. Comfort Sedan"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                            <select
                                value={currentTaxi.type || 'Sedan'}
                                onChange={e => setCurrentTaxi({ ...currentTaxi, type: e.target.value as any })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                            >
                                <option>Sedan</option>
                                <option>SUV</option>
                                <option>Traveler</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Per Km ($)</label>
                            <input
                                type="number"
                                value={currentTaxi.pricePerKm || ''}
                                onChange={e => setCurrentTaxi({ ...currentTaxi, pricePerKm: Number(e.target.value) })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="12"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base Fare ($)</label>
                            <input
                                type="number"
                                value={currentTaxi.baseFare || ''}
                                onChange={e => setCurrentTaxi({ ...currentTaxi, baseFare: Number(e.target.value) })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity (Persons)</label>
                            <input
                                type="number"
                                value={currentTaxi.capacity || ''}
                                onChange={e => setCurrentTaxi({ ...currentTaxi, capacity: Number(e.target.value) })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="4"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Features (comma separated)</label>
                            <input
                                type="text"
                                value={features.join(', ')}
                                onChange={e => setFeatures(e.target.value.split(',').map(s => s.trim()))}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="AC, GPS, Music System"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vehicle Image</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                            <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Drag and drop image here</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" onClick={() => setMode('list')} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg">Save Vehicle</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Manage Taxi Fleet</h2>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input type="text" placeholder="Search vehicles..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center font-medium hover:bg-blue-700 whitespace-nowrap">
                        <Plus size={18} className="mr-2" /> Add Vehicle
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price/Km</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Capacity</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {taxis.map((taxi) => (
                                <tr key={taxi.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={taxi.image} alt="" className="h-12 w-16 object-cover rounded-md" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">{taxi.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{taxi.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">${taxi.pricePerKm}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{taxi.capacity} Persons</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button onClick={() => handleEdit(taxi)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full dark:hover:bg-blue-900/30"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(taxi.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full dark:hover:bg-red-900/30"><Trash2 size={16} /></button>
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
