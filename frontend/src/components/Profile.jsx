import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

function Profile() {
  const { token, logout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
        if (err.response?.status === 401) {
          logout(); // Token might be invalid, logout user
        }
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, logout]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Could not load profile information.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="mb-4"><strong>Name:</strong> {userProfile.name}</p>
        <p className="mb-4"><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Role:</strong> {userProfile.role}</p>
      </div>
    </div>
  );
}

export default Profile;