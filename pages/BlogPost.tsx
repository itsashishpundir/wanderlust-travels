import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BLOGS } from '../constants';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = MOCK_BLOGS.find(b => b.id === id) || MOCK_BLOGS[0]; // Fallback to first for demo

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
       <div className="h-[400px] w-full relative">
           <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/50"></div>
           <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
               <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-wide">{blog.category}</span>
               <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">{blog.title}</h1>
               <div className="flex items-center text-gray-200 space-x-6">
                   <span className="flex items-center"><User size={18} className="mr-2"/> {blog.author}</span>
                   <span className="flex items-center"><Calendar size={18} className="mr-2"/> {blog.date}</span>
               </div>
           </div>
       </div>

       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
               
               <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-loose">
                   <p className="text-xl font-medium text-gray-900 dark:text-white mb-8 leading-relaxed">{blog.excerpt}</p>
                   
                   <p className="mb-6">
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                   </p>
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Discovering the Unknown</h3>
                   <p className="mb-6">
                       Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>
                   <img src={`https://picsum.photos/800/400?random=88`} className="w-full rounded-xl my-8 shadow-lg" alt="Blog Content" />
                   <p className="mb-6">
                       Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                   </p>
               </div>

               <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                   <div className="mb-4 md:mb-0">
                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Share this article</p>
                       <div className="flex space-x-4">
                           <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"><Facebook size={18}/></button>
                           <button className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600"><Twitter size={18}/></button>
                           <button className="p-2 bg-blue-800 text-white rounded-full hover:bg-blue-900"><Linkedin size={18}/></button>
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