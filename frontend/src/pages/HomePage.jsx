import React from 'react';
import DealsPage from './DealsPage';
import { motion } from 'framer-motion';

function HomePage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section with background */}
      <section className="relative py-20 px-4 mb-16">
        <div className="absolute inset-0 bg-blue-600 opacity-5 rounded-b-3xl"></div>
        
        <div className="relative container mx-auto max-w-5xl">
          <motion.div 
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Discover <span className="text-blue-600">Amazing</span> Deals
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Find exclusive discounts and offers tailored just for you.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for deals..."
                  className="w-full px-6 py-4 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-2">
              {['Restaurants', 'Shopping', 'Travel', 'Electronics', 'Fitness'].map((category) => (
                <motion.button
                  key={category}
                  className="px-6 py-2 rounded-full bg-white shadow-sm text-gray-800 hover:bg-blue-600 hover:text-white transition-colors border border-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="container mx-auto px-4 mb-16 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Latest Deals
          </h2>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
            <option value="ending">Ending Soon</option>
          </select>
        </div>
        
        {/* Deals Component */}
        <DealsPage />
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <motion.button
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View More Deals
          </motion.button>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Never Miss a Deal
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and get the best deals delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;