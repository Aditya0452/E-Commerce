// src/components/LoginSignupModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

Modal.setAppElement('#root');

const LoginSignupModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log('Logging in with:', form);
    } else {
      // Handle signup logic
      console.log('Signing up with:', form);
    }
    onClose();
    alert(`${isLogin ? 'Logged in' : 'Signed up'} successfully!`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Authentication Modal"
      className="max-w-lg mx-auto mt-20 bg-white rounded-lg shadow-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
    >
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-800">
        <FaTimes />
      </button>
      <h2 className="text-2xl font-semibold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
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
        )}
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
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline">
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </Modal>
  );
};

export default LoginSignupModal;
