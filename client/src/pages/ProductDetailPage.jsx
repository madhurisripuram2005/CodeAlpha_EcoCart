import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Check, ShieldCheck, ArrowLeft, AlertCircle,
  Plus, Minus, Sparkles, RefreshCw, Box, Leaf, Info, Heart
} from 'lucide-react';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import EcoScoreBadge from '../components/EcoScoreBadge';
import AlternativeCard from '../components/AlternativeCard';
import { formatINR } from '../utils/formatters';

export default function ProductDetailPage() {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [actionError, setActionError] = useState('');
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        setImgError(false);
        setQuantity(1);
        const res = await productAPI.getProduct(idOrSlug);
        if (res.success && res.product) {
          setProduct(res.product);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError(err.message || 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [idOrSlug]);

  const handleQuantityChange = (delta) => {
    if (!product) return;
    setQuantity(prev => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) return product.stock;
      return next;
    });
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    if (!product || product.stock <= 0) return;

    try {
      setAdding(true);
      setActionError('');
      await addToCart(product.id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch (err) {
      setActionError(err.message || 'Could not add to cart.');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="spinner spinner-dark" style={{ width: '3rem', height: '3rem', margin: '0 auto 1.5rem' }} />
        <h2>Loading Product Intelligence...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="empty-state">
          <AlertCircle size={36} className="text-danger" style={{ margin: '0 auto 1rem' }} />
          <h2>Product Not Found</h2>
          <p style={{ margin: '1rem 0 1.5rem' }}>{error || "The product you're looking for doesn't exist or has been archived."}</p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 20;
  const inWishlist = isInWishlist(product.id);
  const factors = typeof product.eco_factors === 'object' ? product.eco_factors : {};
  const fallbackImg = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="detail-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span>/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Product Overview Layout */}
        <div className="detail-grid">
          {/* Product Media Column */}
          <div className="detail-media-col">
            <div className="detail-image-card card">
              <img
                src={imgError ? fallbackImg : (product.image_url || fallbackImg)}
                alt={product.name}
                className="detail-main-img"
                onError={() => setImgError(true)}
              />
              <div className="detail-score-overlay">
                <EcoScoreBadge score={product.eco_score} size="lg" />
              </div>
            </div>

            {/* Quick sustainability highlight pill row */}
            <div className="media-eco-perks">
              <div className="perk-pill">
                <Leaf size={16} className="text-forest" />
                <span>Zero Single-Use Plastic</span>
              </div>
              <div className="perk-pill">
                <Box size={16} className="text-forest" />
                <span>100% Recycled Kraft Box</span>
              </div>
            </div>
          </div>

          {/* Product Purchase & Details Column */}
          <div className="detail-info-col">
            <div className="flex-between">
              <span className="detail-category-badge">{product.category}</span>
              <button
                type="button"
                className={`detail-wishlist-toggle ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={18} fill={inWishlist ? '#C57B57' : 'none'} color={inWishlist ? '#C57B57' : 'currentColor'} />
                <span>{inWishlist ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-price-row">
              <span className="detail-price">{formatINR(product.price)}</span>
              {isOutOfStock ? (
                <span className="badge badge-danger">Out of Stock</span>
              ) : isLowStock ? (
                <span className="badge badge-warning">Low Stock: Only {product.stock} left</span>
              ) : (
                <span className="badge badge-forest">In Stock ({product.stock} available)</span>
              )}
            </div>

            <p className="detail-description">{product.description}</p>

            {/* Quantity and Add to Cart Section */}
            <div className="detail-purchase-box card">
              <div className="purchase-controls-row">
                <div className="quantity-selector">
                  <span className="quantity-label">Quantity:</span>
                  <div className="quantity-btn-group">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={isOutOfStock || quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-number">{quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => handleQuantityChange(1)}
                      disabled={isOutOfStock || quantity >= product.stock}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="purchase-subtotal">
                  <span>Subtotal:</span>
                  <strong>{formatINR(product.price * quantity)}</strong>
                </div>
              </div>

              {actionError && (
                <div className="alert alert-danger" style={{ marginTop: '1rem', marginBottom: 0 }}>
                  <AlertCircle size={16} />
                  <span>{actionError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || adding}
                className={`btn btn-lg w-full ${added ? 'btn-success' : 'btn-primary'}`}
                style={{ marginTop: '1.25rem' }}
              >
                {adding ? (
                  <>
                    <span className="spinner" />
                    <span>Adding to Cart...</span>
                  </>
                ) : added ? (
                  <>
                    <Check size={20} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    <span>{isOutOfStock ? 'Currently Out of Stock' : 'Add to Shopping Cart'}</span>
                  </>
                )}
              </button>
            </div>

            {/* EcoScore Breakdown Factors Box */}
            <div className="ecoscore-breakdown card">
              <div className="flex-between breakdown-header">
                <div>
                  <h3 className="breakdown-title">
                    <ShieldCheck size={18} className="text-forest" />
                    <span>Lifecycle Environmental Factors</span>
                  </h3>
                  <p className="breakdown-subtitle">Detailed breakdown contributing to the {product.eco_score}/100 rating</p>
                </div>
                <EcoScoreBadge score={product.eco_score} size="md" />
              </div>

              <div className="factors-list">
                {factors.recycled_content && (
                  <div className="factor-row">
                    <span className="factor-label">Recycled Content:</span>
                    <span className="factor-value">{factors.recycled_content}</span>
                  </div>
                )}
                {factors.organic_elements && (
                  <div className="factor-row">
                    <span className="factor-label">Organic & Natural:</span>
                    <span className="factor-value">{factors.organic_elements}</span>
                  </div>
                )}
                {factors.packaging && (
                  <div className="factor-row">
                    <span className="factor-label">Zero-Plastic Packaging:</span>
                    <span className="factor-value">{factors.packaging}</span>
                  </div>
                )}
                {factors.longevity && (
                  <div className="factor-row">
                    <span className="factor-label">Durability & Lifespan:</span>
                    <span className="factor-value">{factors.longevity}</span>
                  </div>
                )}
                {factors.single_use_elimination && (
                  <div className="factor-row">
                    <span className="factor-label">Plastic Elimination:</span>
                    <span className="factor-value text-forest font-semibold">{factors.single_use_elimination}</span>
                  </div>
                )}
              </div>

              <div className="disclaimer-callout">
                <Info size={14} />
                <span>
                  <strong>Illustrative Score Disclosure:</strong> EcoScores are computed based on standardized material lifecycle attributes for demonstration purposes. They do not constitute certified ISO environmental audits.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainable Alternatives Section */}
        {product.alternatives && product.alternatives.length > 0 && (
          <section className="alternatives-section">
            <div className="section-header">
              <div className="page-header-badge">
                <Sparkles size={14} className="text-accent" />
                <span>Intelligent Recommendations</span>
              </div>
              <h2 className="section-title">Greener Sustainable Alternatives</h2>
              <p className="section-description">
                Consider these comparable options in <strong>{product.category}</strong> with equal or higher EcoScores:
              </p>
            </div>

            <div className="alternatives-grid">
              {product.alternatives.map((alt) => (
                <AlternativeCard key={alt.id} alternative={alt} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
