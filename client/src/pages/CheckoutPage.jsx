import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard, ShieldCheck, CheckCircle2, AlertCircle,
  Truck, ArrowRight, PackageCheck, Leaf, Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import { formatINR } from '../utils/formatters';

export default function CheckoutPage() {
  const { items, summary, clearCart, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shipping_name: user ? user.name : '',
    shipping_address: '',
    shipping_city: 'Bengaluru',
    shipping_postal_code: '560001',
    shipping_country: 'India',
    payment_method: 'simulated_card'
  });

  const [cardMock] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expDate: '12/28',
    cvv: '999'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('Your cart is empty. Add products before checking out.');
      return;
    }

    try {
      setLoading(true);
      const res = await orderAPI.checkout(formData);

      if (res.success && res.order) {
        setPlacedOrder(res.order);
        await refreshCart();
      } else {
        setError(res.message || 'Checkout failed.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  // If order is placed, show success confirmation view
  if (placedOrder) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '720px', margin: '0 auto' }}>
        <div className="order-success-card card text-center">
          <div className="order-success-icon-wrap">
            <CheckCircle2 size={48} className="text-forest" />
          </div>

          <span className="badge badge-forest" style={{ margin: '0.5rem auto' }}>Simulated Payment Approved</span>
          <h1 className="success-heading">Order Placed Successfully!</h1>
          <p className="success-subtext">
            Thank you for choosing conscious, sustainable goods. A simulated order receipt has been created and logged in the database.
          </p>

          <div className="order-reference-box">
            <div className="order-ref-row">
              <span>Order Reference:</span>
              <strong className="order-ref-code">{placedOrder.order_number}</strong>
            </div>
            <div className="order-ref-row">
              <span>Order Total:</span>
              <strong>{formatINR(placedOrder.total_amount)}</strong>
            </div>
            <div className="order-ref-row">
              <span>Order Status:</span>
              <span className="badge badge-warning">{placedOrder.status}</span>
            </div>
            <div className="order-ref-row">
              <span>Delivery To:</span>
              <span>{placedOrder.shipping_name}, {placedOrder.shipping_city}, {placedOrder.shipping_country} ({placedOrder.shipping_postal_code})</span>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/profile" className="btn btn-primary btn-lg">
              <PackageCheck size={18} />
              <span>Track in Order History</span>
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg">
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-header">
        <div className="container">
          <span className="section-eyebrow">Secure Checkout</span>
          <h1 className="page-title">Delivery & Simulated Payment</h1>
        </div>
      </div>

      <div className="container checkout-layout">
        {/* Left Column: Form */}
        <div className="checkout-form-col">
          <form onSubmit={handleCheckout}>
            {error && (
              <div className="alert alert-danger">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* 1. Shipping Address */}
            <div className="checkout-card card">
              <div className="flex-align-center gap-2 form-section-title">
                <Truck className="text-forest" size={20} />
                <h3>1. Carbon-Neutral Delivery Address</h3>
              </div>

              <div className="form-group">
                <label className="form-label">Full Recipient Name</label>
                <input
                  type="text"
                  name="shipping_name"
                  value={formData.shipping_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Jane Doe"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address & Landmark</label>
                <input
                  type="text"
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 42 Green Orchard Road, Indiranagar"
                  className="form-input"
                />
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="shipping_city"
                    value={formData.shipping_city}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Bengaluru"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">PIN / Postal Code</label>
                  <input
                    type="text"
                    name="shipping_postal_code"
                    value={formData.shipping_postal_code}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 560001"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="shipping_country"
                    value={formData.shipping_country}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* 2. Simulated Payment */}
            <div className="checkout-card card" style={{ marginTop: '1.5rem' }}>
              <div className="flex-align-center gap-2 form-section-title">
                <CreditCard className="text-forest" size={20} />
                <h3>2. Simulated Payment Method</h3>
              </div>

              <div className="alert alert-info">
                <ShieldCheck size={18} />
                <div>
                  <strong>Academic Demonstration Prototype:</strong> This store uses a simulated test payment flow. No real credit/debit card numbers are collected, stored, or processed.
                </div>
              </div>

              <div className="simulated-card-box">
                <div className="form-group">
                  <label className="form-label">Simulated Test Card Number</label>
                  <input
                    type="text"
                    value={cardMock.cardNumber}
                    readOnly
                    className="form-input"
                    style={{ backgroundColor: 'var(--color-beige)' }}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Expires</label>
                    <input
                      type="text"
                      value={cardMock.expDate}
                      readOnly
                      className="form-input"
                      style={{ backgroundColor: 'var(--color-beige)' }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      value={cardMock.cvv}
                      readOnly
                      className="form-input"
                      style={{ backgroundColor: 'var(--color-beige)' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="btn btn-primary btn-lg w-full"
              style={{ marginTop: '1.5rem' }}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  <span>Verifying Stock & Completing Order...</span>
                </>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Place Simulated Order ({formatINR(summary.subtotal)})</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Review */}
        <aside className="checkout-sidebar-col">
          <div className="order-summary-card card">
            <h3 className="summary-title">Order Items ({summary.totalItems})</h3>

            <div className="checkout-items-preview">
              {items.map(item => (
                <div key={item.cart_item_id} className="checkout-preview-item">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=100&q=80'}
                    alt={item.name}
                    className="checkout-item-thumb"
                  />
                  <div className="checkout-item-details">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-sub">Qty: {item.quantity} × {formatINR(item.price)}</span>
                  </div>
                  <strong className="checkout-item-price">{formatINR(item.subtotal)}</strong>
                </div>
              ))}
            </div>

            <hr className="dropdown-divider" style={{ margin: '1rem 0' }} />

            <div className="summary-row">
              <span>Subtotal:</span>
              <strong>{formatINR(summary.subtotal)}</strong>
            </div>

            <div className="summary-row">
              <span>Carbon-Neutral Freight:</span>
              <span className="text-forest" style={{ fontWeight: 700 }}>FREE</span>
            </div>

            <div className="summary-total-row">
              <span>Total to Pay:</span>
              <span className="summary-total-amount">{formatINR(summary.subtotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
