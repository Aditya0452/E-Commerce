// src/components/Header.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import LoginSignupModal from './LoginSignupModal';

const Header = () => {
  const { state } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyStore
        </Link>
        <nav className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Products
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
            <FaShoppingCart className="text-xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsModalOpen(true)} className="text-gray-700 hover:text-blue-600">
            <FaUser className="text-xl" />
          </button>
        </nav>
      </div>
      <LoginSignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
