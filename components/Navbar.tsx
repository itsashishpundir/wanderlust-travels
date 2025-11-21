import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Plane, Moon, Sun, Bell, User, ChevronDown, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const MegaMenuContent = ({ type }: { type: string }) => {
    if (type === 'destinations') {
      return (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 py-8 px-4 z-50 animate-fade-in">
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-4">India</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="hover:text-blue-600 cursor-pointer">Himachal Pradesh</li>
                <li className="hover:text-blue-600 cursor-pointer">Uttarakhand</li>
                <li className="hover:text-blue-600 cursor-pointer">Rajasthan</li>
                <li className="hover:text-blue-600 cursor-pointer">Kerala</li>
                <li className="hover:text-blue-600 cursor-pointer">Goa</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-4">International</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="hover:text-blue-600 cursor-pointer">Thailand</li>
                <li className="hover:text-blue-600 cursor-pointer">Bali</li>
                <li className="hover:text-blue-600 cursor-pointer">Dubai</li>
                <li className="hover:text-blue-600 cursor-pointer">Europe</li>
                <li className="hover:text-blue-600 cursor-pointer">Maldives</li>
              </ul>
            </div>
             <div>
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-4">Themes</h3>
               <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="hover:text-blue-600 cursor-pointer">Honeymoon</li>
                <li className="hover:text-blue-600 cursor-pointer">Adventure</li>
                <li className="hover:text-blue-600 cursor-pointer">Religious</li>
                <li className="hover:text-blue-600 cursor-pointer">Family</li>
              </ul>
            </div>
            <div>
              <img src="https://picsum.photos/300/200?random=99" alt="Featured" className="rounded-lg shadow-md" />
              <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">Special Offer: 20% off on Bali</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Plane className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Wanderlust</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium">Home</Link>
            
            <div 
              className="relative group"
              onMouseEnter={() => setShowMegaMenu('destinations')}
              onMouseLeave={() => setShowMegaMenu(null)}
            >
              <button className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium focus:outline-none h-16">
                Destinations <ChevronDown size={16} className="ml-1" />
              </button>
              {showMegaMenu === 'destinations' && <MegaMenuContent type="destinations" />}
            </div>

            <Link to="/packages" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium">Packages</Link>
            <Link to="/hotels" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium">Hotels</Link>
            <Link to="/taxi" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium">Taxi</Link>
            <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium">Blog</Link>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4 ml-4 border-l border-gray-200 dark:border-gray-700 pl-4">
              <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="relative group">
                <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                 {/* Notification Dropdown */}
                <div className="hidden group-hover:block absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 border dark:border-gray-700">
                    <h4 className="text-sm font-bold mb-2 dark:text-white">Notifications</h4>
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
                        <p>New package added: Bali Special</p>
                        <p>Your booking #B002 is confirmed.</p>
                    </div>
                </div>
              </div>
              
              {/* User Dropdown */}
              <div className="relative group">
                  <button className="flex items-center text-gray-700 dark:text-gray-200 hover:text-blue-600">
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                        <User size={20} className="text-blue-600 dark:text-blue-400" />
                      </div>
                  </button>
                  <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 border dark:border-gray-700">
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Admin Panel</Link>
                      <Link to="/support" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Support</Link>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <Link to="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">Logout</Link>
                  </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
             <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/packages" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Packages</Link>
            <Link to="/hotels" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Hotels</Link>
             <Link to="/taxi" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Taxi</Link>
             <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>My Dashboard</Link>
            <Link to="/login" className="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setIsMenuOpen(false)}>Login / Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};