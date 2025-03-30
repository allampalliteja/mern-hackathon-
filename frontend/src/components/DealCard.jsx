import React from 'react';
import { motion } from 'framer-motion';

function DealCard({ deal = {} }) {
  const {
    title = "No Title",
    description = "No description available",
    discount = 0,
    location = "Unknown",
    startDate,
    endDate,
    image,
    category,
  } = deal || {};

  // Ensure the image path is correctly prefixed with the backend server URL
  const imageUrl = image ? `http://localhost:5000${image}` : "/placeholder-deal.jpg";

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <motion.div className="rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Image with fallback */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.target.src = "/placeholder-deal.jpg"; // Set fallback image
            e.target.onerror = null;
          }}
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
          {discount}% OFF
        </div>
        {category && (
          <div className="absolute top-4 left-4 bg-white text-gray-800 text-sm py-1 px-3 rounded-full shadow-md">
            {category}
          </div>
        )}
      </div>

      {/* Deal Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{description}</p>

        {/* Date Range */}
        <div className="text-sm text-gray-500 mb-3">
          <span>Valid: {formatDate(startDate)} - {formatDate(endDate)}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>

        <motion.button
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Get This Deal
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DealCard;
