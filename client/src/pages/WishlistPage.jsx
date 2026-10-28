import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import EcoScoreBadge from '../components/EcoScoreBadge';
import { formatINR } from '../utils/formatters';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleMoveToCart = async (product) => {
    if (product.stock > 0) {
      await addToCart(product.id, 1);
      await removeFromWishlist(product.id);
    }
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="wishlist-page">
      <div className="container wishlist-container">
        <div className="page-header">
          <div className="page-header-badge">
            <Heart size={14} className="text-accent" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="page-title">My Eco Wishlist</h1>
          <p className="page-subtitle">
            Keep track of sustainable essentials you love, check their illustrative EcoScores, and move items to your cart when you are ready.
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-state card">
            <div className="empty-state-icon">
              <Heart size={48} className="text-muted" />
            </div>
            <h2>Your wishlist is empty</h2>
            <p>You haven't saved any conscious lifestyle products yet.</p>
            <Link to="/products" className="btn btn-primary">
              <ShoppingBag size={18} />
              <span>Explore 140+ Eco Products</span>
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((product) => {
              const isOutOfStock = product.stock <= 0;
              return (
                <div key={product.id} className="wishlist-card card card-hover">
                  <div className="wishlist-image-wrap">
                    <img
                      src={product.image_url || fallbackImage}
                      alt={product.name}
                      className="wishlist-img"
                      onError={(e) => { e.currentTarget.src = fallbackImage; }}
                    />
                    <div className="wishlist-badge-wrap">
                      <EcoScoreBadge score={product.eco_score} size="sm" />
                    </div>
                    <button
                      type="button"
                      className="wishlist-remove-btn"
                      onClick={() => removeFromWishlist(product.id)}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="wishlist-info">
                    <span className="product-category">{product.category}</span>
                    <Link to={`/product/${product.slug || product.id}`}>
                      <h3 className="wishlist-title">{product.name}</h3>
                    </Link>

                    <div className="wishlist-pricing">
                      <span className="product-price">{formatINR(product.price)}</span>
                      {isOutOfStock ? (
                        <span className="stock-pill stock-out">Out of Stock</span>
                      ) : (
                        <span className="stock-pill stock-in">In Stock</span>
                      )}
                    </div>

                    <div className="wishlist-actions">
                      <button
                        type="button"
                        onClick={() => handleMoveToCart(product)}
                        disabled={isOutOfStock}
                        className="btn btn-primary btn-sm btn-block"
                      >
                        <ShoppingBag size={15} />
                        <span>{isOutOfStock ? 'Sold Out' : 'Move to Cart'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
