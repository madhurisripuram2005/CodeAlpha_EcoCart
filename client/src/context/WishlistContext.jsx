import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Load from localStorage for guest visitors
  const loadGuestWishlist = useCallback(() => {
    try {
      const saved = localStorage.getItem('ecocart_guest_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        setWishlistItems(parsed);
        setWishlistIds(new Set(parsed.map(p => p.id)));
      } else {
        setWishlistItems([]);
        setWishlistIds(new Set());
      }
    } catch {
      setWishlistItems([]);
      setWishlistIds(new Set());
    }
  }, []);

  // Fetch from backend when authenticated
  const fetchServerWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const res = await wishlistAPI.getWishlist();
      if (res.success) {
        setWishlistItems(res.items || []);
        setWishlistIds(new Set((res.items || []).map(p => p.id)));
      }
    } catch (err) {
      console.error('Failed to load wishlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchServerWishlist();
    } else {
      loadGuestWishlist();
    }
  }, [isAuthenticated, fetchServerWishlist, loadGuestWishlist]);

  // Toggle item in wishlist
  const toggleWishlist = async (product) => {
    if (!product || !product.id) return;
    const exists = wishlistIds.has(product.id);

    if (exists) {
      // Remove
      setWishlistIds(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
      setWishlistItems(prev => prev.filter(p => p.id !== product.id));

      if (isAuthenticated) {
        try {
          await wishlistAPI.removeFromWishlist(product.id);
        } catch (e) {
          console.error('Error removing from wishlist:', e);
        }
      } else {
        const updated = wishlistItems.filter(p => p.id !== product.id);
        localStorage.setItem('ecocart_guest_wishlist', JSON.stringify(updated));
      }
    } else {
      // Add
      setWishlistIds(prev => new Set(prev).add(product.id));
      setWishlistItems(prev => [product, ...prev]);

      if (isAuthenticated) {
        try {
          await wishlistAPI.addToWishlist(product.id);
        } catch (e) {
          console.error('Error adding to wishlist:', e);
        }
      } else {
        const updated = [product, ...wishlistItems];
        localStorage.setItem('ecocart_guest_wishlist', JSON.stringify(updated));
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlistIds.has(Number(productId));
  };

  const removeFromWishlist = async (productId) => {
    const numId = Number(productId);
    setWishlistIds(prev => {
      const next = new Set(prev);
      next.delete(numId);
      return next;
    });
    setWishlistItems(prev => prev.filter(p => p.id !== numId));

    if (isAuthenticated) {
      try {
        await wishlistAPI.removeFromWishlist(numId);
      } catch (e) {
        console.error('Error removing from wishlist:', e);
      }
    } else {
      const updated = wishlistItems.filter(p => p.id !== numId);
      localStorage.setItem('ecocart_guest_wishlist', JSON.stringify(updated));
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        totalWishlist: wishlistItems.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
