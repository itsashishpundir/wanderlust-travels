import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, MapPin, Star, Clock } from 'lucide-react';
import { Package } from '../types';
import api from '../services/api';

export const PackageListing: React.FC = () => {
  const [priceRange, setPriceRange] = useState(2000);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get('/packages');
        // Handle both array directly or { packages: [] } format
        const data = response.data.packages || response.data;
        if (Array.isArray(data)) {
          setPackages(data);
        } else {
          setPackages([]);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
                <Filter size={18} className="text-gray-500" />
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Price Range</h4>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span>$500</span>
                  <span>${priceRange}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Categories</h4>
                <div className="space-y-2">
                  {['Trekking', 'Temple Tour', 'Adventure', 'Relaxation', 'Honeymoon'].map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                      <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Duration</h4>
                <div className="space-y-2">
                  {['1-3 Days', '4-7 Days', '8-14 Days', '15+ Days'].map((d) => (
                    <label key={d} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                      <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">{d}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Available Packages</h2>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Sort by:</span>
                <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-sm py-1 px-2 focus:outline-none text-gray-700 dark:text-gray-200">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Duration</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition border border-gray-100 dark:border-gray-700">
                  <div className="md:w-1/3 h-64 md:h-auto relative">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                      {pkg.category}
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pkg.title}</h3>
                        <div className="flex items-center bg-green-100 dark:bg-green-900 px-2 py-1 rounded text-xs font-bold text-green-700 dark:text-green-300">
                          {pkg.rating} ★
                        </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{pkg.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex items-center"><Clock size={16} className="mr-1 text-blue-500" /> {pkg.durationDays || pkg.days} Days</div>
                        <div className="flex items-center"><MapPin size={16} className="mr-1 text-blue-500" /> {pkg.location}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pkg.highlights?.slice(0, 3).map((h, i) => (
                          <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{h}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-end mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div>
                        <span className="text-gray-400 text-xs line-through mr-2">${pkg.price + 200}</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${pkg.price}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">/ person</span>
                      </div>
                      <Link to={`/package/${pkg.id}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};