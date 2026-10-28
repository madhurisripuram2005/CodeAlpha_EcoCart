import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

const DEFAULT_SUMMARY = {
  totalItems: 0,
  subtotal: 0,
  averageEcoScore: 0,
  impact: {
    estimatedPlasticContainersAvoided: 0,
    estimatedSingleUseBagsSaved: 0,
    disclaimer: 'Illustrative impact calculation based on sustainable replacement cycle.'
  }
};

export function CartProvider({ children }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(DEFAULT_SUMMARY);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      setSummary(DEFAULT_SUMMARY);
      return;
    }
    try {
      setLoading(true);
      const res = await cartAPI.getCart();
      if (res.success && res.cart) {
        setItems(res.cart.items || []);
        setSummary(res.cart.summary || DEFAULT_SUMMARY);
      }
    } catch (err) {
      // If unauthorized, reset cart
      setItems([]);
      setSummary(DEFAULT_SUMMARY);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      fetchCart();
    }
  }, [authLoading, fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await cartAPI.addToCart(productId, quantity);
    if (res.success && res.cart) {
      setItems(res.cart.items);
      setSummary(res.cart.summary);
    }
    return res;
  };

  const updateQuantity = async (cartItemId, quantity) => {
    const res = await cartAPI.updateQuantity(cartItemId, quantity);
    if (res.success && res.cart) {
      setItems(res.cart.items);
      setSummary(res.cart.summary);
    }
    return res;
  };

  const removeItem = async (cartItemId) => {
    const res = await cartAPI.removeItem(cartItemId);
    if (res.success && res.cart) {
      setItems(res.cart.items);
      setSummary(res.cart.summary);
    }
    return res;
  };

  const clearCart = async () => {
    const res = await cartAPI.clearCart();
    if (res.success) {
      setItems([]);
      setSummary(DEFAULT_SUMMARY);
    }
    return res;
  };

  const value = {
    items,
    summary,
    totalItems: summary.totalItems,
    subtotal: summary.subtotal,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
