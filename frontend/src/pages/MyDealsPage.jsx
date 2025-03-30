import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function MyDealsPage() {
  const { token } = useAuth(); // ✅ Get auth token
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Backend API URL (Ensure it matches your backend port)
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Fetch My Deals
  const fetchMyDeals = async () => {
    if (!token) {
      console.error("❌ No auth token found. User might be logged out.");
      return;
    }

    console.log("🔹 Fetching My Deals from:", `${API_URL}/api/deals/my-deals`);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/api/deals/my-deals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Fetched My Deals:", response.data);
      setDeals(response.data);
    } catch (err) {
      console.error("❌ Error fetching My Deals:", err.response?.data || err);
      setError(err.response?.data?.message || "Error fetching your deals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDeals();
  }, [token]);

  if (loading) return <p className="text-center text-gray-600">Loading your deals...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">My Deals</h2>
        <button
          onClick={fetchMyDeals}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
        >
          Refresh Deals 🔄
        </button>
      </div>

      {deals.length === 0 ? (
        <p className="text-gray-600 text-center">You haven't added any deals yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div key={deal._id} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="text-lg font-semibold">{deal.title}</h3>
              <p className="text-gray-600">{deal.description}</p>
              <p className="text-gray-700 font-bold">Discount: {deal.discount}%</p>
              <p className="text-gray-600">Location: {deal.location}</p>
              <p className="text-sm text-gray-500">
                {new Date(deal.startDate).toLocaleDateString()} - {new Date(deal.endDate).toLocaleDateString()}
              </p>
              {deal.image ? (
                <img
                  src={`${API_URL}${deal.image}`} // ✅ Ensure correct image path
                  alt={deal.title}
                  className="mt-2 w-full h-40 object-cover rounded"
                  onError={(e) => (e.target.src = "/uploads/default.png")} // Fallback image
                />
              ) : (
                <div className="mt-2 w-full h-40 flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDealsPage;
