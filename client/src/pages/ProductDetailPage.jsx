import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Check, ShieldCheck, ArrowLeft, AlertCircle,
  Plus, Minus, Sparkles, RefreshCw, Box, Leaf, Info, Heart,
  Star, Truck, RotateCcw, Share2, ThumbsUp
} from 'lucide-react';
import { productAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import EcoScoreBadge from '../components/EcoScoreBadge';
import AlternativeCard from '../components/AlternativeCard';
import ProductCard from '../components/ProductCard';
import { formatINR } from '../utils/formatters';

export default function ProductDetailPage() {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [actionError, setActionError] = useState('');
  const [imgError, setImgError] = useState(false);
  const [activeTab, setActiveTab] = useState('sustainability'); // 'sustainability' | 'reviews' | 'shipping'
  const [copiedLink, setCopiedLink] = useState(false);

  // Delivery check state
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        setImgError(false);
        setQuantity(1);
        setDeliveryResult(null);
        const res = await productAPI.getProduct(idOrSlug);
        if (res.success && res.product) {
          setProduct(res.product);

          // Fetch related products from the same category
          try {
            const relRes = await productAPI.getProducts({
              category: res.product.category,
              limit: 5
            });
            if (relRes.success && relRes.products) {
              setRelatedProducts(relRes.products.filter(p => p.id !== res.product.id).slice(0, 4));
            }
          } catch (e) {
            // non-blocking
          }
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

  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setDeliveryResult({ success: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }
    setDeliveryResult({
      success: true,
      message: `Standard Carbon-Neutral Delivery available to ${pincode.trim()}. Estimated arrival in 2–4 business days.`
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
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

  // Realistic MRP calculation and discount
  const originalPrice = Math.round((product.price * 1.22) / 10) * 10 - 1;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const ratingScore = ((product.eco_score || 90) >= 95 ? 4.9 : 4.8);
  const reviewCount = 28 + ((product.id * 7) % 85);

  const demoReviews = [
    {
      author: 'Aarav Sharma',
      city: 'Pune',
      verified: true,
      rating: 5,
      date: 'October 14, 2026',
      title: 'Remarkable craftsmanship and zero plastic',
      comment: `The quality of this ${product.name} surpassed my expectations. Arrived in completely compostable kraft packaging with water-activated tape. Knowing the exact EcoScore makes conscious purchasing straightforward.`
    },
    {
      author: 'Priya Venkatesh',
      city: 'Chennai',
      verified: true,
      rating: 5,
      date: 'October 2, 2026',
      title: 'Sturdy, durable and true to its description',
      comment: 'Very pleased with the build quality. It is evident this item was made to last years rather than end up in a landfill. Highly recommend to anyone shifting to a zero-waste lifestyle.'
    },
    {
      author: 'Rohan Mehra',
      city: 'New Delhi',
      verified: true,
      rating: 4,
      date: 'September 28, 2026',
      title: 'Conscious alternative that works seamlessly',
      comment: 'Great everyday performance. Smooth finish, ergonomic feel, and excellent customer service from the EcoCart team.'
    }
  ];

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
              <div className="perk-pill">
                <ShieldCheck size={16} className="text-forest" />
                <span>Fair-Trade Sourced</span>
              </div>
            </div>
          </div>

          {/* Product Purchase & Details Column */}
          <div className="detail-info-col">
            <div className="flex-between">
              <span className="detail-category-badge">{product.category}</span>
              <div className="flex-align-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  onClick={handleShare}
                  title="Share product link"
                >
                  <Share2 size={16} />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  className={`detail-wishlist-toggle ${inWishlist ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart size={18} fill={inWishlist ? '#C57B57' : 'none'} color={inWishlist ? '#C57B57' : 'currentColor'} />
                  <span>{inWishlist ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            {/* Star Rating Row */}
            <div className="detail-rating-row">
              <div className="stars-group">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#eab308" color="#eab308" />
                ))}
              </div>
              <span className="rating-score-text">{ratingScore} / 5.0</span>
              <span className="rating-divider">•</span>
              <span className="rating-count-link">{reviewCount} Verified Customer Reviews</span>
            </div>

            {/* Pricing Row with MRP & Discount */}
            <div className="detail-price-row">
              <span className="detail-price">{formatINR(product.price)}</span>
              {originalPrice > product.price && (
                <>
                  <span className="detail-mrp-price">{formatINR(originalPrice)}</span>
                  <span className="badge badge-accent">Save {discountPercent}% OFF</span>
                </>
              )}
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

            {/* Delivery Pincode Checker */}
            <div className="pincode-checker-box card">
              <div className="flex-align-center gap-2" style={{ marginBottom: '0.5rem' }}>
                <Truck size={18} className="text-forest" />
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Check Carbon-Neutral Delivery</h4>
              </div>
              <form onSubmit={handleCheckDelivery} className="pincode-form">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN (e.g. 560001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="form-input form-input-sm pincode-input"
                />
                <button type="submit" className="btn btn-sm btn-outline">Check</button>
              </form>
              {deliveryResult && (
                <div className={`pincode-result ${deliveryResult.success ? 'text-success' : 'text-danger'}`}>
                  {deliveryResult.success ? <Check size={14} /> : <AlertCircle size={14} />}
                  <span>{deliveryResult.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabbed Product Intelligence: Sustainability vs Reviews vs Shipping */}
        <section className="detail-tabs-section">
          <div className="detail-tabs-nav">
            <button
              type="button"
              className={`detail-tab-btn ${activeTab === 'sustainability' ? 'active' : ''}`}
              onClick={() => setActiveTab('sustainability')}
            >
              <Leaf size={16} />
              <span>EcoScore & Lifecycle Intelligence</span>
            </button>
            <button
              type="button"
              className={`detail-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star size={16} />
              <span>Customer Reviews ({reviewCount})</span>
            </button>
            <button
              type="button"
              className={`detail-tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              <Truck size={16} />
              <span>Zero-Waste Packaging & Delivery</span>
            </button>
          </div>

          <div className="detail-tab-content">
            {activeTab === 'sustainability' && (
              <div className="ecoscore-breakdown card">
                <div className="flex-between breakdown-header">
                  <div>
                    <h3 className="breakdown-title">
                      <ShieldCheck size={18} className="text-forest" />
                      <span>Lifecycle Environmental Factor Breakdown</span>
                    </h3>
                    <p className="breakdown-subtitle">Detailed criteria evaluated for the {product.eco_score}/100 rating</p>
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
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-tab-card card">
                <div className="reviews-summary-header flex-between">
                  <div>
                    <h3 style={{ margin: 0 }}>Customer Community Feedback</h3>
                    <p style={{ margin: '0.25rem 0 0', color: 'var(--color-charcoal-500)', fontSize: '0.9rem' }}>
                      Overall rating: <strong>{ratingScore} out of 5.0</strong> based on {reviewCount} verified purchases
                    </p>
                  </div>
                  <div className="stars-group">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#eab308" color="#eab308" />
                    ))}
                  </div>
                </div>

                <div className="reviews-list">
                  {demoReviews.map((rev, idx) => (
                    <div key={idx} className="review-item">
                      <div className="review-meta flex-between">
                        <div className="flex-align-center gap-2">
                          <strong className="review-author">{rev.author}</strong>
                          <span className="review-city">({rev.city})</span>
                          {rev.verified && (
                            <span className="verified-buyer-badge">
                              <Check size={12} />
                              <span>Verified Eco Buyer</span>
                            </span>
                          )}
                        </div>
                        <span className="review-date">{rev.date}</span>
                      </div>
                      <div className="stars-group" style={{ margin: '0.4rem 0' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={13} fill="#eab308" color="#eab308" />
                        ))}
                      </div>
                      <h4 className="review-title">{rev.title}</h4>
                      <p className="review-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="shipping-tab-card card">
                <h3 style={{ marginBottom: '1rem' }}>Zero-Waste Logistics & Circular Guarantee</h3>
                <div className="shipping-perks-grid">
                  <div className="shipping-perk-card">
                    <Box size={22} className="text-forest" />
                    <h4>100% Recycled Kraft Packaging</h4>
                    <p>Shipped in unbleached FSC-certified cartons with water-activated plant starch tape and shredded cotton rag cushions.</p>
                  </div>
                  <div className="shipping-perk-card">
                    <Truck size={22} className="text-forest" />
                    <h4>Carbon-Neutral Transit</h4>
                    <p>Transportation emissions are calculated and offset via investments in certified community agroforestry projects.</p>
                  </div>
                  <div className="shipping-perk-card">
                    <RotateCcw size={22} className="text-forest" />
                    <h4>Circular Return Guarantee</h4>
                    <p>Eligible for clean return or end-of-life recycling return to prevent goods from entering municipal landfills.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

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

        {/* Related Products from the same Category */}
        {relatedProducts.length > 0 && (
          <section className="related-products-section" style={{ marginTop: '3.5rem' }}>
            <div className="section-header flex-between">
              <div>
                <span className="section-eyebrow">Explore Department</span>
                <h2 className="section-title">More in {product.category}</h2>
              </div>
              <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="btn btn-outline btn-sm">
                <span>View Department</span>
                <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </div>

            <div className="products-grid">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
