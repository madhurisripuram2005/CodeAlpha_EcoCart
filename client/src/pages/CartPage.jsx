import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Plus, Minus, ShieldCheck, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import EcoScoreBadge from '../components/EcoScoreBadge';
import ImpactSummaryCard from '../components/ImpactSummaryCard';
import { formatINR } from '../utils/formatters';

export default function CartPage() {
  const { items, summary, loading, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0 && !loading) {
    return (
      <div className="container cart-empty-page" style={{ padding: '5rem 1.5rem' }}>
        <div className="empty-state">
          <div className="empty-state-icon">
            <ShoppingBag size={36} />
          </div>
          <h2>Your EcoCart is Empty</h2>
          <p style={{ margin: '1rem 0 1.5rem' }}>
            You haven't added any sustainable products to your shopping cart yet.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            <span>Explore 140+ Sustainable Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <div className="container flex-between">
          <div>
            <span className="section-eyebrow">Shopping Cart</span>
            <h1 className="page-title">Review Your Eco Basket</h1>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="btn btn-secondary btn-sm"
              title="Remove all items from cart"
            >
              <Trash2 size={14} />
              <span>Clear Cart</span>
            </button>
          )}
        </div>
      </div>

      <div className="container cart-layout">
        {/* Left Column: Cart Items List */}
        <div className="cart-items-col">
          <div className="cart-items-card card">
            <div className="cart-table-header">
              <span>Product</span>
              <span className="text-center">Quantity</span>
              <span className="text-right">Total</span>
            </div>

            <div className="cart-items-list">
              {items.map(item => (
                <div key={item.cart_item_id} className="cart-item-row">
                  {/* Thumbnail & Info */}
                  <div className="cart-item-main">
                    <img
                      src={item.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80'}
                      alt={item.name}
                      className="cart-thumb"
                    />
                    <div className="cart-item-info">
                      <span className="cart-item-cat">{item.category}</span>
                      <Link to={`/product/${item.slug || item.product_id}`} className="cart-item-title">
                        {item.name}
                      </Link>
                      <div className="cart-item-score">
                        <EcoScoreBadge score={item.eco_score} size="sm" />
                      </div>
                      <span className="cart-item-unit-price">{formatINR(item.price)} each</span>
                      {!item.hasSufficientStock && (
                        <span className="text-danger" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                          Only {item.stock} left in stock!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="cart-item-qty">
                    <div className="quantity-btn-group">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                        disabled={loading}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                        disabled={loading || item.quantity >= item.stock}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.cart_item_id)}
                      className="cart-remove-link"
                      title="Remove product"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Line Subtotal */}
                  <div className="cart-item-subtotal text-right">
                    <strong>{formatINR(item.subtotal)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Shopping button */}
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/products" className="btn btn-secondary">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Environmental Impact of current cart */}
          <div style={{ marginTop: '2rem' }}>
            <ImpactSummaryCard impact={summary.impact} title="Estimated Environmental Impact of this Order" />
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <aside className="cart-summary-col">
          <div className="order-summary-card card">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Items Total ({summary.totalItems}):</span>
              <strong>{formatINR(summary.subtotal)}</strong>
            </div>

            <div className="summary-row">
              <span>Carbon-Neutral Delivery:</span>
              <span className="text-forest" style={{ fontWeight: 700 }}>FREE</span>
            </div>

            <div className="summary-row">
              <span>Plastic-Free Packaging:</span>
              <span className="text-forest" style={{ fontWeight: 700 }}>Included</span>
            </div>

            <div className="summary-row summary-eco-stat">
              <span>Basket Average EcoScore:</span>
              <EcoScoreBadge score={summary.averageEcoScore} size="sm" />
            </div>

            <hr className="dropdown-divider" style={{ margin: '1rem 0' }} />

            <div className="summary-total-row">
              <span>Order Total:</span>
              <span className="summary-total-amount">{formatINR(summary.subtotal)}</span>
            </div>

            <p className="summary-note">
              Final totals and stock availability are strictly verified on the server upon checkout.
            </p>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              disabled={items.some(i => !i.hasSufficientStock)}
              className="btn btn-primary btn-lg w-full"
              style={{ marginTop: '1.25rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="summary-perks">
              <div className="summary-perk">
                <ShieldCheck size={16} className="text-forest" />
                <span>Simulated Secure Payment (Prototype)</span>
              </div>
              <div className="summary-perk">
                <Leaf size={16} className="text-forest" />
                <span>100% Tree-Free Packaging Guarantee</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
