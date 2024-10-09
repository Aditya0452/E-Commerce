// src/components/Checkout.js
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { state, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    payment: '',
  });
  const [error, setError] = useState('');

  const totalPrice = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!form.name || !form.email || !form.address || !form.payment) {
      setError('Please fill in all fields.');
      return;
    }
    // Process order (this is a placeholder)
    console.log('Order submitted:', form, state.cart);
    dispatch({ type: 'CLEAR_CART' });
    navigate('/');
    alert('Thank you for your purchase!');
  };

  if (state.cart.length === 0) {
    return <div className="text-center mt-10">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            rows="3"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Payment Method</label>
          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          >
            <option value="">Select a payment method</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>
        <div className="text-right">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Submit Order (${totalPrice.toFixed(2)})
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
