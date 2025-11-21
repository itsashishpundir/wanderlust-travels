import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BLOGS } from '../constants';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const Blog: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        {/* Blog Header */}
        <div className="bg-blue-900 py-16 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Wanderlust Blog</h1>
            <p className="text-blue-200 max-w-2xl mx-auto px-4">Stories, tips, and guides to inspire your next adventure. Explore the world through our words.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-10">
                
                {/* Main Content */}
                <div className="w-full lg:w-2/3">
                    <div className="grid gap-10">
                        {MOCK_BLOGS.map((blog) => (
                            <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100 dark:border-gray-700">
                                <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
                                <div className="p-8">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                                        <span className="flex items-center"><Calendar size={16} className="mr-1"/> {blog.date}</span>
                                        <span className="flex items-center"><User size={16} className="mr-1"/> {blog.author}</span>
                                        <span className="flex items-center text-blue-600 dark:text-blue-400"><Tag size={16} className="mr-1"/> {blog.category}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 transition cursor-pointer">
                                        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{blog.excerpt}</p>
                                    <Link to={`/blog/${blog.id}`} className="inline-flex items-center font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                        Read Article <ArrowRight size={18} className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-1/3 space-y-8">
                    {/* Categories */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {['Travel Guides', 'Food & Drink', 'Adventure', 'Tips & Tricks', 'Culture'].map((cat, i) => (
                                <li key={i}>
                                    <a href="#" className="flex justify-between items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                                        <span>{cat}</span>
                                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{(i + 1) * 3}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-sm p-6 border border-blue-100 dark:border-blue-900">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Subscribe</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Get the latest travel stories and deals delivered to your inbox.</p>
                        <input type="email" placeholder="Enter your email" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-3 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">Subscribe</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};