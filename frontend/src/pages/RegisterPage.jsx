import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
        <p className="text-gray-600 mt-2">Join our community and start discovering amazing deals</p>
      </div>
      
      <RegisterForm />
      
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-800">
            Sign in
          </Link>
        </p>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="text-indigo-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-indigo-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;