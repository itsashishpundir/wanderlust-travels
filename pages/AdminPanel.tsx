import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, Users, Package, Settings, Bell, Search, LogOut,
  Car, Hotel, MessageSquare, Tag, Home
} from 'lucide-react';
import { DashboardStats } from '../components/admin/DashboardStats';
import { PackagesManager } from '../components/admin/PackagesManager';
import { HotelsManager } from '../components/admin/HotelsManager';
import { HomestaysManager } from '../components/admin/HomestaysManager';
import { TaxisManager } from '../components/admin/TaxisManager';
import { BlogsManager } from '../components/admin/BlogsManager';
import { BookingsManager } from '../components/admin/BookingsManager';
import { UsersManager } from '../components/admin/UsersManager';
import { SettingsManager } from '../components/admin/SettingsManager';
import { ProfileManager } from '../components/admin/ProfileManager';

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all mb-1 ${active
      ? 'bg-blue-600 text-white shadow-lg'
      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
  >
    <Icon size={18} className="mr-3" />
    {label}
  </button>
);

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white fixed left-0 top-0 bottom-0 z-30 hidden md:flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex items-center">
          <div className="bg-blue-600 p-2 rounded-lg mr-3">
            <Settings size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Admin<span className="text-blue-400">Panel</span></span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-2">Overview</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={FileText} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />

          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-6">Management</p>
          <SidebarItem icon={Package} label="Packages" active={activeTab === 'packages'} onClick={() => setActiveTab('packages')} />

          <SidebarItem icon={Car} label="Taxi Fleet" active={activeTab === 'taxi'} onClick={() => setActiveTab('taxi')} />
          <SidebarItem icon={Hotel} label="Hotels" active={activeTab === 'hotels'} onClick={() => setActiveTab('hotels')} />
          <SidebarItem icon={Home} label="Homestays" active={activeTab === 'homestays'} onClick={() => setActiveTab('homestays')} />
          <SidebarItem icon={Users} label="Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />

          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-6">Content</p>
          <SidebarItem icon={MessageSquare} label="Blog Posts" active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} />
          <SidebarItem icon={Tag} label="Coupons" active={activeTab === 'coupons'} onClick={() => setActiveTab('coupons')} />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </div>

        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/admin-login';
            }}
            className="flex items-center text-gray-400 hover:text-white transition w-full px-2 py-2 rounded-lg hover:bg-gray-800"
          >
            <LogOut size={18} className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm h-16 sticky top-0 z-20 flex items-center justify-between px-6 lg:px-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white capitalize">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>

          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all" />
            </div>

            {/* Notifications */}
            <button className="relative text-gray-500 dark:text-gray-300 hover:text-blue-600 transition">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white dark:border-gray-800">3</span>
            </button>

            {/* Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700 cursor-pointer" onClick={() => setActiveTab('profile')}>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{JSON.parse(localStorage.getItem('user') || '{}').name || 'Admin User'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 shadow-md">
                <div className="h-full w-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  {JSON.parse(localStorage.getItem('user') || '{}').avatar ? (
                    <img src={JSON.parse(localStorage.getItem('user') || '{}').avatar} alt="Admin" className="h-full w-full object-cover" />
                  ) : (
                    <img src={`https://ui-avatars.com/api/?name=${JSON.parse(localStorage.getItem('user') || '{}').name || 'Admin'}&background=0D8ABC&color=fff`} alt="Admin" className="h-full w-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8 flex-1 overflow-y-auto scroll-smooth">
          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'bookings' && <BookingsManager />}
          {activeTab === 'packages' && <PackagesManager />}
          {activeTab === 'hotels' && <HotelsManager />}
          {activeTab === 'homestays' && <HomestaysManager />}

          {activeTab === 'taxi' && <TaxisManager />}
          {activeTab === 'blogs' && <BlogsManager />}
          {activeTab === 'users' && <UsersManager />}
          {activeTab === 'settings' && <SettingsManager />}
          {activeTab === 'profile' && <ProfileManager />}

          {['coupons', 'reports'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <Settings size={64} className="mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-gray-500 dark:text-gray-400">Coming Soon</h3>
              <p className="text-sm">The {activeTab} module is currently under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};