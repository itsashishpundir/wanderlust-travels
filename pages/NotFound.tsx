import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
            <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-500">404</h1>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">Page Not Found</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-8">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="flex space-x-4">
                <Link to="/" className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg">
                    <Home size={20} className="mr-2" />
                    Go Home
                </Link>
                <Link to="/packages" className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-md">
                    <Search size={20} className="mr-2" />
                    Browse Packages
                </Link>
            </div>
        </div>
    );
};
