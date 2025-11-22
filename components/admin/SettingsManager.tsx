import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Save } from 'lucide-react';
import api from '../../services/api';
import ImageWithFallback from '../ImageWithFallback';

export const SettingsManager = () => {
    const [settings, setSettings] = useState({
        logo: '',
        favicon: '',
        siteName: 'Wanderlust'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await api.get('/settings');
            if (response.data && response.data.id) {
                setSettings(response.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const handleUpload = async (file: File, field: 'logo' | 'favicon') => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSettings(prev => ({ ...prev, [field]: res.data.imageUrl }));
        } catch (err) {
            console.error('Upload failed', err);
            alert('Image upload failed');
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.put('/settings', settings);
            alert('Settings updated successfully!');
            // Optionally reload page to reflect changes in Navbar/Favicon
            // window.location.reload(); 
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Website Settings</h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <div className="space-y-8">

                    {/* Site Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website Name</label>
                        <input
                            type="text"
                            value={settings.siteName || ''}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website Logo</label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition relative h-48 flex flex-col justify-center items-center">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={(e) => e.target.files && e.target.files[0] && handleUpload(e.target.files[0], 'logo')}
                                />
                                {settings.logo ? (
                                    <ImageWithFallback src={settings.logo} alt="Logo" className="max-h-32 object-contain" />
                                ) : (
                                    <>
                                        <ImageIcon size={32} className="text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500">Upload Logo</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Favicon Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website Favicon</label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition relative h-48 flex flex-col justify-center items-center">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={(e) => e.target.files && e.target.files[0] && handleUpload(e.target.files[0], 'favicon')}
                                />
                                {settings.favicon ? (
                                    <ImageWithFallback src={settings.favicon} alt="Favicon" className="h-16 w-16 object-contain" />
                                ) : (
                                    <>
                                        <ImageIcon size={32} className="text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500">Upload Favicon</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center shadow-lg disabled:opacity-50"
                        >
                            <Save size={18} className="mr-2" /> {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
