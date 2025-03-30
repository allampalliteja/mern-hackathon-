import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { motion } from 'framer-motion';

function DealForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { token } = useAuth();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Track selected file for upload

  const handleFormSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await axios.post('/api/deals', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('✅ Deal added successfully!');
      setPreviewImage(null);
      setSelectedFile(null);
      reset();
      onSubmit && onSubmit(); // Call onSubmit function if provided
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to add deal');
      console.error("Error adding deal:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-4">
        {error && <div className="text-red-500 p-3 bg-red-100 border border-red-300 rounded-lg">{error}</div>}
        {successMessage && <div className="text-green-500 p-3 bg-green-100 border border-green-300 rounded-lg">{successMessage}</div>}

        {/* Title */}
        <input 
          type="text" 
          placeholder="Title" 
          {...register("title", { required: "Title is required" })} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Description */}
        <textarea 
          placeholder="Description" 
          {...register("description", { required: "Description is required" })} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Discount */}
        <input 
          type="number" 
          placeholder="Discount (%)" 
          {...register("discount", { required: "Discount is required" })} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Location */}
        <input 
          type="text" 
          placeholder="Location" 
          {...register("location", { required: "Location is required" })} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Start Date */}
        <input 
          type="date" 
          {...register("startDate", { required: "Start date is required" })} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* End Date */}
        <input 
          type="date" 
          {...register("endDate", { required: "End date is required" })} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Image Upload with Preview */}
        <label className="block text-gray-700 font-medium">Upload Image:</label>
        <input 
          type="file" 
          accept="image/*" 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleImagePreview}
        />
        {previewImage && (
          <img src={previewImage} alt="Preview" className="w-full h-40 object-cover mt-3 rounded-lg shadow-md border border-gray-300" />
        )}

        {/* Submit Button */}
        <motion.button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-transform transform hover:scale-105" 
          type="submit" 
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Create Deal'}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default DealForm;
