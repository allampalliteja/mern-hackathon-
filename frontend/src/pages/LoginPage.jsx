import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const location = useLocation();
  const [message, setMessage] = React.useState(location.state?.message || '');

  useEffect(() => {
    // Clear message after 5 seconds
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to access your account</p>
      </div>
      
      {message && (
        <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {message}
        </div>
      )}
      
      <LoginForm />
      
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Don't have an account yet?{' '}
          <a href="/register" className="text-indigo-600 font-medium hover:text-indigo-800">
            Create an account
          </a>
        </p>
      </div>
      
      <div className="mt-6 text-center">
        <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

export default LoginPage;