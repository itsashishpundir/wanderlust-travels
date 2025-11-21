import React, { useState } from 'react';
import { Search, MessageSquare, Phone, Mail, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { MOCK_FAQS, MOCK_TICKETS } from '../constants';

export const Support: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('faq');

  const toggleFaq = (index: number) => {
      setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        
        {/* Hero Section */}
        <div className="bg-blue-900 py-16 text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">How can we help you?</h1>
            <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search for answers (e.g. 'cancellation policy')" 
                    className="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none shadow-lg"
                />
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
            
            {/* Support Options Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
                 {[
                     { icon: FileText, title: 'Browse FAQs', text: 'Find answers to common questions.', id: 'faq' },
                     { icon: MessageSquare, title: 'My Tickets', text: 'Track your support requests.', id: 'tickets' },
                     { icon: Mail, title: 'Contact Us', text: 'Send us a detailed message.', id: 'contact' }
                 ].map((item) => (
                     <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-left hover:shadow-xl transition border-b-4 ${activeTab === item.id ? 'border-blue-600' : 'border-transparent'}`}
                     >
                         <div className="bg-blue-100 dark:bg-blue-900/50 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                             <item.icon size={24} />
                         </div>
                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                         <p className="text-gray-500 dark:text-gray-400">{item.text}</p>
                     </button>
                 ))}
            </div>

            {/* Main Content Area */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-200 dark:border-gray-700 min-h-[400px]">
                
                {activeTab === 'faq' && (
                    <div className="animate-fade-in max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {MOCK_FAQS.map((faq, idx) => (
                                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <button 
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex justify-between items-center p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    >
                                        <span className="font-semibold text-gray-800 dark:text-white">{faq.question}</span>
                                        {openFaq === idx ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
                                    </button>
                                    {openFaq === idx && (
                                        <div className="p-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'tickets' && (
                    <div className="animate-fade-in">
                         <div className="flex justify-between items-center mb-6">
                             <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Support Tickets</h2>
                             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">Create New Ticket</button>
                         </div>
                         <div className="overflow-x-auto">
                             <table className="w-full">
                                 <thead>
                                     <tr className="border-b border-gray-200 dark:border-gray-700 text-left">
                                         <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Ticket ID</th>
                                         <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Subject</th>
                                         <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                         <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Last Update</th>
                                         <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Action</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {MOCK_TICKETS.map((ticket) => (
                                         <tr key={ticket.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                             <td className="py-4 px-4 text-gray-800 dark:text-white font-medium">{ticket.id}</td>
                                             <td className="py-4 px-4 text-gray-800 dark:text-white">{ticket.subject}</td>
                                             <td className="py-4 px-4">
                                                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                     ticket.status === 'Open' ? 'bg-green-100 text-green-800' : 
                                                     ticket.status === 'Closed' ? 'bg-gray-100 text-gray-800' : 
                                                     'bg-yellow-100 text-yellow-800'
                                                 }`}>
                                                     {ticket.status}
                                                 </span>
                                             </td>
                                             <td className="py-4 px-4 text-gray-500 dark:text-gray-400 text-sm">{ticket.lastUpdate}</td>
                                             <td className="py-4 px-4">
                                                 <button className="text-blue-600 hover:underline text-sm">View</button>
                                             </td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div className="animate-fade-in max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input type="email" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" placeholder="your@email.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                                    <option>General Inquiry</option>
                                    <option>Booking Issue</option>
                                    <option>Payment Issue</option>
                                    <option>Feedback</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea rows={5} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Describe your issue..."></textarea>
                            </div>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Send Message</button>
                        </form>
                        
                        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                            <div>
                                <Phone className="mx-auto text-blue-500 mb-2" />
                                <p className="font-bold dark:text-white">+1 (555) 123-4567</p>
                                <p className="text-sm text-gray-500">Mon-Fri, 9am - 6pm</p>
                            </div>
                            <div>
                                <Mail className="mx-auto text-blue-500 mb-2" />
                                <p className="font-bold dark:text-white">support@wanderlust.com</p>
                                <p className="text-sm text-gray-500">24/7 Email Support</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
};