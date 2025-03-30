import React, { useEffect, useState } from 'react';
import DealCard from '../components/DealCard';
import api from '../api';

function DealsPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await api.get('/deals');
        setDeals(response.data || []);
      } catch (err) {
        setError("Failed to load deals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading deals...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!deals.length) return <p className="text-center text-gray-500">No deals available.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {deals.map((deal) => deal ? <DealCard key={deal._id} deal={deal} /> : null)}
    </div>
  );
}

export default DealsPage;
