import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';
import api from '../services/api';

export const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${id}`);
                setBlog(response.data.blogPost || response.data.blog || response.data);
            } catch (error) {
                console.error('Error fetching blog post:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Blog Post Not Found</h2>
                <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="h-[400px] w-full relative">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">{blog.category}</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">{blog.title}</h1>
                    <div className="flex items-center text-gray-200 space-x-6">
                        <span className="flex items-center"><User size={18} className="mr-2" /> {blog.author}</span>
                        <span className="flex items-center"><Calendar size={18} className="mr-2" /> {new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">

                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-loose">
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>

                    {blog.tags && blog.tags.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-2">
                            {blog.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Share this article</p>
                            <div className="flex space-x-4">
                                <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"><Facebook size={18} /></button>
                                <button className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600"><Twitter size={18} /></button>
                                <button className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900"><Linkedin size={18} /></button>
                            </div>
                        </div>
                        <Link to="/blog" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
                            <ArrowLeft size={20} className="mr-2" /> Back to Blog
                        </Link>
                    </div>
                </div>
            </div>

            <div className="h-20"></div>
        </div>
    );
};