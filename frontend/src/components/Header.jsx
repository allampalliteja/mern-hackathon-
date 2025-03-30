import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Deals App</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/deals">Deals</Link></li>

            {token ? (
              <>
                {role === 'owner' && <li><Link to="/add-deal">Add Deal</Link></li>}
                <li><Link to="/my-deals">My Deals</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>
                  <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
