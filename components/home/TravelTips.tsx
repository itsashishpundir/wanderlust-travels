import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MOCK_BLOGS } from '../../constants';

export const TravelTips: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Travel Tips & Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {MOCK_BLOGS.map((blog) => (
                        <div key={blog.id} className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                            <div className="md:w-1/3 h-48 md:h-auto">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6 md:w-2/3 flex flex-col justify-center">
                                <span className="text-xs font-bold text-blue-500 uppercase mb-2">{blog.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{blog.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                                <div className="flex items-center text-xs text-gray-400">
                                    <span>{blog.date}</span>
                                    <span className="mx-2">•</span>
                                    <span>{blog.author}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link to="/blog" className="inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        Read more articles <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
