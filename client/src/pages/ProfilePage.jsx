import React, { useEffect, useState } from 'react';
import {
  User, Package, Award, Settings, CheckCircle2,
  AlertCircle, ChevronDown, ChevronUp, Lock, RefreshCw, ShoppingBag
} from 'lucide-react';
import { userAPI, orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ImpactSummaryCard from '../components/ImpactSummaryCard';
import EcoScoreBadge from '../components/EcoScoreBadge';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'impact' | 'settings'

  // Profile and Orders state
  const [profileData, setProfileData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Expanded order accordion state
  const [expandedOrders, setExpandedOrders] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const [loadingOrder, setLoadingOrder] = useState({});

  // Settings form state
  const [nameInput, setNameInput] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError('');
        const [profileRes, ordersRes] = await Promise.all([
          userAPI.getProfile(),
          orderAPI.getOrders()
        ]);

        if (profileRes.success) {
          setProfileData(profileRes);
          setNameInput(profileRes.user.name || '');
        }
        if (ordersRes.success) {
          setOrders(ordersRes.orders || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const toggleOrderAccordion = async (orderId) => {
    const isExpanded = !!expandedOrders[orderId];

    if (!isExpanded && !orderDetails[orderId]) {
      try {
        setLoadingOrder(prev => ({ ...prev, [orderId]: true }));
        const res = await orderAPI.getOrder(orderId);
        if (res.success && res.order) {
          setOrderDetails(prev => ({ ...prev, [orderId]: res.order }));
        }
      } catch (err) {
        // Fallback
      } finally {
        setLoadingOrder(prev => ({ ...prev, [orderId]: false }));
      }
    }

    setExpandedOrders(prev => ({ ...prev, [orderId]: !isExpanded }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSaveSuccess('');
    setSaveError('');
    setSaving(true);

    try {
      const payload = { name: nameInput };
      if (newPass) {
        payload.currentPassword = currentPass;
        payload.newPassword = newPass;
      }

      const res = await userAPI.updateProfile(payload);
      if (res.success) {
        setSaveSuccess('Profile updated successfully!');
        updateUser(res.user);
        setCurrentPass('');
        setNewPass('');
        setTimeout(() => setSaveSuccess(''), 3000);
      } else {
        setSaveError(res.message || 'Update failed.');
      }
    } catch (err) {
      setSaveError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="spinner spinner-dark" style={{ width: '3rem', height: '3rem', margin: '0 auto 1.5rem' }} />
        <h2>Loading Profile & Order History...</h2>
      </div>
    );
  }

  const impact = profileData?.impact || {};
  const ordersSummary = profileData?.ordersSummary || { totalOrders: orders.length, totalSpent: 0 };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div className="container">
          <div className="profile-hero-banner">
            <div className="profile-avatar-circle">
              <User size={32} />
            </div>
            <div>
              <span className="section-eyebrow">Customer Account</span>
              <h1 className="page-title">{user?.name}</h1>
              <span className="profile-email-tag">{user?.email} • Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container profile-container">
        {/* Profile Navigation Tabs */}
        <div className="profile-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={18} />
            <span>Order History ({orders.length})</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'impact' ? 'active' : ''}`}
            onClick={() => setActiveTab('impact')}
          >
            <Award size={18} />
            <span>My Eco Impact</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Account Settings</span>
          </button>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginTop: '1.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* TAB 1: Order History */}
        {activeTab === 'orders' && (
          <div className="profile-tab-content">
            {orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <ShoppingBag size={32} />
                </div>
                <h3>No Orders Placed Yet</h3>
                <p>When you complete a purchase, your simulated order tracking and eco savings will appear here.</p>
                <a href="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Explore Eco Catalog
                </a>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => {
                  const isExpanded = !!expandedOrders[order.id];
                  const details = orderDetails[order.id];

                  return (
                    <div key={order.id} className="order-history-card card">
                      <div className="order-history-header" onClick={() => toggleOrderAccordion(order.id)}>
                        <div className="order-meta-group">
                          <strong className="order-code">{order.order_number}</strong>
                          <span className="order-date">
                            Placed on {new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                        </div>

                        <div className="order-price-status">
                          <span className="order-amount">${Number(order.total_amount).toFixed(2)}</span>
                          <span className={`badge ${
                            order.status === 'delivered' ? 'badge-forest' :
                            order.status === 'processing' ? 'badge-info' :
                            order.status === 'shipped' ? 'badge-warning' : 'badge-danger'
                          }`}>
                            {order.status}
                          </span>
                          <button type="button" className="order-toggle-btn" aria-label="Toggle details">
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Order Line Items */}
                      {isExpanded && (
                        <div className="order-expanded-details">
                          <hr className="dropdown-divider" style={{ margin: '1rem 0' }} />
                          <div className="shipping-info-preview">
                            <strong>Shipped To:</strong> {order.shipping_name}, {order.shipping_address}, {order.shipping_city}, {order.shipping_postal_code}, {order.shipping_country}
                          </div>

                          <h4 style={{ margin: '1.25rem 0 0.75rem', fontSize: '0.9375rem' }}>Purchased Items</h4>

                          {loadingOrder[order.id] ? (
                            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
                              <span className="spinner spinner-dark" />
                            </div>
                          ) : details?.items ? (
                            <div className="order-items-table">
                              {details.items.map(item => (
                                <div key={item.id} className="order-item-table-row">
                                  <img
                                    src={item.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=120&q=80'}
                                    alt={item.product_name}
                                    className="order-item-table-thumb"
                                  />
                                  <div className="order-item-table-info">
                                    <span className="order-item-name">{item.product_name}</span>
                                    <div className="flex-align-center gap-2" style={{ marginTop: '0.25rem' }}>
                                      <EcoScoreBadge score={item.eco_score} size="sm" />
                                      <span className="order-item-qty-price">{item.quantity} × ${Number(item.unit_price).toFixed(2)}</span>
                                    </div>
                                  </div>
                                  <strong className="order-item-subtotal">${Number(item.subtotal).toFixed(2)}</strong>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Personal Eco Impact */}
        {activeTab === 'impact' && (
          <div className="profile-tab-content">
            <ImpactSummaryCard impact={impact} title="Your Personal Environmental Footprint Savings" />

            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Impact Calculation Methodology</h3>
              <p style={{ color: 'var(--color-charcoal-600)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Your personal impact indicators are computed by comparing every eco-friendly item purchased against conventional disposable alternatives.
              </p>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-charcoal-600)', lineHeight: 1.6 }}>
                <li><strong>Reusable Canteens & Bottles:</strong> Estimated to replace an average of 150 single-use plastic bottles over an active annual usage cycle.</li>
                <li><strong>Sustainable Cotton & Jute Bags:</strong> Estimated to replace 120 single-use thin film plastic grocery bags annually.</li>
                <li><strong>Average EcoScore:</strong> A weighted mathematical average of all items in your order history based on lifecycle materials, packaging, and recyclability.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: Account Settings */}
        {activeTab === 'settings' && (
          <div className="profile-tab-content">
            <div className="card" style={{ maxWidth: '640px' }}>
              <h3 style={{ marginBottom: '1.25rem' }}>Update Account Details</h3>

              {saveSuccess && (
                <div className="alert alert-success">
                  <CheckCircle2 size={18} />
                  <span>{saveSuccess}</span>
                </div>
              )}

              {saveError && (
                <div className="alert alert-danger">
                  <AlertCircle size={18} />
                  <span>{saveError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (Read-only)</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="form-input"
                    style={{ backgroundColor: 'var(--color-beige)', cursor: 'not-allowed' }}
                  />
                </div>

                <hr className="dropdown-divider" style={{ margin: '1.5rem 0' }} />
                <h4 style={{ marginBottom: '1rem' }}>Change Password (Optional)</h4>

                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Enter current password to verify"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password (Min. 6 chars)</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Enter new password"
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary"
                  style={{ marginTop: '0.75rem' }}
                >
                  {saving ? (
                    <>
                      <span className="spinner" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Account Changes</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
