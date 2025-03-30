import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import { motion } from 'framer-motion';

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/users/register', data);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-red-500 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.div>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Full Name</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            type="text"
            id="name"
            {...register("name", { required: "Full name is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email Address</label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            type="email"
            id="email"
            {...register("email", { 
              required: "Email address is required", 
              pattern: { 
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                message: "Please enter a valid email address" 
              } 
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter your email address"
          />
          {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
          <div className="relative">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password", { 
                required: "Password is required", 
                minLength: { 
                  value: 6, 
                  message: "Password must be at least 6 characters" 
                } 
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Create a password"
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>}
          {watch("password") && watch("password").length > 0 && !errors.password && (
            <div className="mt-2">
              <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded-full ${watch("password").length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${watch("password").length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${watch("password").length >= 10 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Password strength: {watch("password").length < 6 ? 'Weak' : watch("password").length < 10 ? 'Medium' : 'Strong'}</p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="role">Account Type</label>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`cursor-pointer border rounded-lg p-3 flex items-center transition-all duration-200 ${
                watch("role") === "user" 
                  ? "border-indigo-500 bg-indigo-50" 
                  : "border-gray-300 hover:border-indigo-300"
              }`}
              onClick={() => {
                const { setValue } = register("role");
                setValue("user");
              }}
            >
              <input
                type="radio"
                id="roleUser"
                value="user"
                className="sr-only"
                {...register("role", { required: "Please select an account type" })}
              />
              <label 
                htmlFor="roleUser" 
                className="cursor-pointer flex items-center w-full"
              >
                <span className={`w-4 h-4 rounded-full border flex-shrink-0 mr-2 ${
                  watch("role") === "user" 
                    ? "border-indigo-500 bg-indigo-500" 
                    : "border-gray-400"
                }`}>
                  {watch("role") === "user" && (
                    <span className="block w-2 h-2 mx-auto mt-1 bg-white rounded-full"></span>
                  )}
                </span>
                <div>
                  <span className="block font-medium">User</span>
                  <span className="text-sm text-gray-500">Browse deals</span>
                </div>
              </label>
            </div>
            <div
              className={`cursor-pointer border rounded-lg p-3 flex items-center transition-all duration-200 ${
                watch("role") === "owner" 
                  ? "border-indigo-500 bg-indigo-50" 
                  : "border-gray-300 hover:border-indigo-300"
              }`}
              onClick={() => {
                const { setValue } = register("role");
                setValue("owner");
              }}
            >
              <input
                type="radio"
                id="roleOwner"
                value="owner"
                className="sr-only"
                {...register("role", { required: "Please select an account type" })}
              />
              <label 
                htmlFor="roleOwner" 
                className="cursor-pointer flex items-center w-full"
              >
                <span className={`w-4 h-4 rounded-full border flex-shrink-0 mr-2 ${
                  watch("role") === "owner" 
                    ? "border-indigo-500 bg-indigo-500" 
                    : "border-gray-400"
                }`}>
                  {watch("role") === "owner" && (
                    <span className="block w-2 h-2 mx-auto mt-1 bg-white rounded-full"></span>
                  )}
                </span>
                <div>
                  <span className="block font-medium">Owner</span>
                  <span className="text-sm text-gray-500">Post deals</span>
                </div>
              </label>
            </div>
          </div>
          {errors.role && <p className="mt-1 text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              {...register("termsAccepted", { required: "You must accept the terms and conditions" })}
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the <Link to="/terms" className="text-indigo-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
            </span>
          </label>
          {errors.termsAccepted && <p className="mt-1 text-red-500 text-sm">{errors.termsAccepted.message}</p>}
        </div>

        <div className="mt-6">
          <motion.button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default RegisterForm;