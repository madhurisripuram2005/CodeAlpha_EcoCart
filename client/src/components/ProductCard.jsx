import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Check, AlertCircle, Heart, Star } from 'lucide-react';
import EcoScoreBadge from './EcoScoreBadge';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/formatters';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [imgError, setImgError] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 20;
  const inWishlist = isInWishlist(product.id);

  // Realistic MRP calculation and discount percentage for e-commerce realism
  const discountMultiplier = 1.22;
  const originalPrice = Math.round((product.price * discountMultiplier) / 10) * 10 - 1;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  // Illustrative review metrics derived from product attributes for visual richness
  const ratingScore = ((product.eco_score || 90) >= 95 ? 4.9 : 4.8);
  const reviewCount = 24 + ((product.id * 7) % 85);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    if (isOutOfStock) return;

    try {
      setAdding(true);
      setErrorMsg('');
      await addToCart(product.id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      setErrorMsg(err.message || 'Could not add to cart');
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setAdding(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="product-card card card-hover">
      <Link to={`/product/${product.slug || product.id}`} className="product-card-link">
        <div className="product-image-wrap">
          <img
            src={imgError ? fallbackImage : (product.image_url || fallbackImage)}
            alt={product.name}
            className="product-img"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          
          {/* Top Overlays */}
          <div className="product-badge-overlay">
            <EcoScoreBadge score={product.eco_score} size="sm" />
          </div>

          <button
            type="button"
            className={`wishlist-heart-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
            title={inWishlist ? 'Saved in wishlist' : 'Save to wishlist'}
          >
            <Heart size={16} fill={inWishlist ? '#C57B57' : 'none'} color={inWishlist ? '#C57B57' : 'currentColor'} />
          </button>

          {discountPercent > 0 && (
            <span className="discount-pill">-{discountPercent}%</span>
          )}

          {product.is_featured === 1 && (
            <span className="featured-pill">Featured</span>
          )}
        </div>

        <div className="product-info">
          <div className="product-card-header-row">
            <span className="product-category">{product.category}</span>
            <div className="product-rating-pill" title={`${ratingScore} out of 5 stars (${reviewCount} ratings)`}>
              <Star size={12} fill="#eab308" color="#eab308" />
              <span>{ratingScore}</span>
              <span className="rating-count">({reviewCount})</span>
            </div>
          </div>

          <h3 className="product-title" title={product.name}>{product.name}</h3>
          
          <div className="product-pricing-stock">
            <div className="price-stack">
              <span className="product-price">{formatINR(product.price)}</span>
              {originalPrice > product.price && (
                <span className="product-mrp-price">{formatINR(originalPrice)}</span>
              )}
            </div>

            {isOutOfStock ? (
              <span className="stock-pill stock-out">Out of Stock</span>
            ) : isLowStock ? (
              <span className="stock-pill stock-low">Only {product.stock} left</span>
            ) : (
              <span className="stock-pill stock-in">In Stock</span>
            )}
          </div>
        </div>
      </Link>

      <div className="product-card-actions">
        {errorMsg && (
          <div className="product-card-error">
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock || adding}
          className={`btn btn-sm product-add-btn ${added ? 'btn-success' : 'btn-primary'}`}
          title={isOutOfStock ? 'Item is out of stock' : 'Add to shopping cart'}
        >
          {adding ? (
            <>
              <span className="spinner spinner-sm" />
              <span>Adding...</span>
            </>
          ) : added ? (
            <>
              <Check size={16} />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>{isOutOfStock ? 'Sold Out' : 'Add to Cart'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
