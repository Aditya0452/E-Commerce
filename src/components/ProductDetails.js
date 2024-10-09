// src/components/ProductDetails.js
import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const { dispatch } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`) // Example API
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = useMemo(() => {
    return () => {
      dispatch({ type: 'ADD_ITEM', payload: product });
    };
  }, [dispatch, product]);

  if (loading) {
    return <div className="text-center mt-10">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 flex justify-center">
        <img src={product.image} alt={product.title} className="h-96 object-contain" />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
        <p className="text-xl text-blue-600 font-bold mb-4">${product.price}</p>
        <p className="mb-4">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
