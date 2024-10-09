// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-800 text-gray-200 py-6">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Link to="/" className="hover:text-white">
          Privacy Policy
        </Link>
        <Link to="/" className="hover:text-white">
          Terms of Service
        </Link>
        <Link to="/" className="hover:text-white">
          Contact Us
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
