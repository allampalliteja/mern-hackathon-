import React from 'react';
import DealForm from '../components/DealForm';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function AddDealPage() {
  const { role } = useAuth();

  if (role !== 'owner') {
    return <Navigate to="/deals" replace />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Add New Deal</h2>
      <DealForm />
    </div>
  );
}

export default AddDealPage;
