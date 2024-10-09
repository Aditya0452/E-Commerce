// src/components/ShoppingCart.js
import React, { useContext, useMemo, useCallback } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const ShoppingCart = () => {
  const { state, dispatch } = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [state.cart]);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, [dispatch]);

  const handleIncrease = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, [dispatch]);

  const handleDecrease = useCallback((item) => {
    if (item.quantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } });
    } else {
      handleRemove(item.id);
    }
  }, [dispatch, handleRemove]);

  if (state.cart.length === 0) {
    return <div className="text-center mt-10">Your cart is empty.</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Your Shopping Cart</h2>
      <div className="space-y-4">
        {state.cart.map(item => (
          <div key={item.id} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4">
            <Link to={`/products/${item.id}`} className="flex-shrink-0">
              <img src={item.image} alt={item.title} className="h-24 w-24 object-contain" />
            </Link>
            <div className="md:ml-6 flex-grow">
              <Link to={`/products/${item.id}`} className="text-lg font-medium text-blue-600 hover:underline">
                {item.title}
              </Link>
              <p className="text-gray-700">${item.price}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <button
                onClick={() => handleDecrease(item)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-l"
              >
                <FaMinus />
              </button>
              <span className="px-4 py-2 border-t border-b">{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-r"
              >
                <FaPlus />
              </button>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="mt-4 md:mt-0 ml-0 md:ml-4 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Continue Shopping
        </Link>
        <div className="text-2xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </div>
        <Link to="/checkout">
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default React.memo(ShoppingCart);
