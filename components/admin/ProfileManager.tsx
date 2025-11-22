import React, { useState, useEffect } from 'react';
import { User, Mail, Camera, Save, Lock } from 'lucide-react';
import api from '../../services/api';
import ImageWithFallback from '../ImageWithFallback';

export const ProfileManager = () => {
    const [user, setUser] = useState<any>({
        name: '',
        email: '',
        avatar: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch current user data
        const fetchProfile = async () => {
            try {
                // Assuming we have an endpoint to get the current user's profile
                // If not, we might need to use the ID from localStorage
                const localUser = JSON.parse(localStorage.getItem('user') || '{}');
                if (localUser.id) {
                    const response = await api.get(`/users/${localUser.id}`); // Or /auth/me
                    setUser(prev => ({ ...prev, ...response.data }));
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            try {
                const res = await api.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setUser(prev => ({ ...prev, avatar: res.data.imageUrl }));
            } catch (err) {
                console.error('Upload failed', err);
                alert('Image upload failed');
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (user.newPassword && user.newPassword !== user.confirmPassword) {
            alert("New passwords don't match!");
            setLoading(false);
            return;
        }

        try {
            const updateData: any = {
                name: user.name,
                email: user.email,
                avatar: user.avatar
            };

            if (user.newPassword) {
                updateData.password = user.newPassword;
                // Ideally, we should also send currentPassword for verification
            }

            const localUser = JSON.parse(localStorage.getItem('user') || '{}');
            await api.put(`/users/${localUser.id}`, updateData);

            // Update local storage
            const updatedUser = { ...localUser, ...updateData };
            delete updatedUser.password; // Don't store password in local storage
            localStorage.setItem('user', JSON.stringify(updatedUser));

            alert('Profile updated successfully!');
            setUser(prev => ({ ...prev, newPassword: '', confirmPassword: '', currentPassword: '' }));

            // Optional: Reload to update header avatar
            window.location.reload();
        } catch (error: any) {
            console.error('Error updating profile:', error);
            alert(`Failed to update profile: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Profile</h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <form onSubmit={handleSave} className="space-y-8">

                    {/* Avatar Section */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative group cursor-pointer">
                            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-700 shadow-lg">
                                <ImageWithFallback
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-full w-full object-cover"
                                    fallbackText={user.name?.charAt(0).toUpperCase()}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white" size={32} />
                            </div>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Click to upload new avatar</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">Personal Information</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={user.name || ''}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                        className="w-full pl-10 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        value={user.email || ''}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        className="w-full pl-10 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700">Change Password</h3>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        value={user.newPassword || ''}
                                        onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                                        className="w-full pl-10 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        value={user.confirmPassword || ''}
                                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                        className="w-full pl-10 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center shadow-lg disabled:opacity-50"
                        >
                            <Save size={18} className="mr-2" /> {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
