// src/components/ProductListing.js
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products') // Example API
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = useMemo(() => {
    return (product) => {
      dispatch({ type: 'ADD_ITEM', payload: product });
    };
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} className="h-48 w-full object-contain p-4" />
              <div className="px-4 py-2">
                <h3 className="text-lg font-medium text-gray-800">{product.title}</h3>
              </div>
            </Link>
            <div className="px-4 py-2 mt-auto">
              <p className="text-blue-600 font-bold text-xl">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductListing);
