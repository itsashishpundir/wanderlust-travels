import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, ChevronLeft, Image as ImageIcon } from 'lucide-react';
import { MOCK_BLOGS } from '../../constants';
import { BlogPost } from '../../types';

export const BlogsManager = () => {
    const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
    const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
    const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost>>({});

    const handleEdit = (blog: BlogPost) => {
        setCurrentBlog(blog);
        setMode('edit');
    };

    const handleCreate = () => {
        setCurrentBlog({});
        setMode('create');
    };

    const handleSave = () => {
        if (mode === 'create') {
            const newBlog = {
                ...currentBlog,
                id: Math.random().toString(36).substr(2, 9),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                image: 'https://picsum.photos/800/600?random=' + Math.floor(Math.random() * 100),
            } as BlogPost;
            setBlogs([...blogs, newBlog]);
        } else {
            setBlogs(blogs.map(b => b.id === currentBlog.id ? currentBlog as BlogPost : b));
        }
        setMode('list');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setBlogs(blogs.filter(b => b.id !== id));
        }
    };

    if (mode === 'create' || mode === 'edit') {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{mode === 'create' ? 'Add New Post' : 'Edit Post'}</h3>
                    <button onClick={() => setMode('list')} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center">
                        <ChevronLeft size={18} className="mr-1" /> Back to List
                    </button>
                </div>

                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Post Title</label>
                            <input
                                type="text"
                                value={currentBlog.title || ''}
                                onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="e.g. Top 10 Hidden Gems"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                            <input
                                type="text"
                                value={currentBlog.category || ''}
                                onChange={e => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="Travel Guide"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
                            <input
                                type="text"
                                value={currentBlog.author || ''}
                                onChange={e => setCurrentBlog({ ...currentBlog, author: e.target.value })}
                                className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt</label>
                        <textarea
                            rows={2}
                            value={currentBlog.excerpt || ''}
                            onChange={e => setCurrentBlog({ ...currentBlog, excerpt: e.target.value })}
                            className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                            placeholder="Short summary..."
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                        <textarea
                            rows={8}
                            value={currentBlog.content || ''}
                            onChange={e => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                            className="w-full p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-mono text-sm"
                            placeholder="Write your article here..."
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                            <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Drag and drop image here</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button type="button" onClick={() => setMode('list')} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg">Save Post</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Manage Blog Posts</h2>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input type="text" placeholder="Search posts..." className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center font-medium hover:bg-blue-700 whitespace-nowrap">
                        <Plus size={18} className="mr-2" /> Add Post
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={blog.image} alt="" className="h-12 w-16 object-cover rounded-md" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{blog.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{blog.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{blog.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{blog.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button onClick={() => handleEdit(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full dark:hover:bg-blue-900/30"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full dark:hover:bg-red-900/30"><Trash2 size={16} /></button>
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
