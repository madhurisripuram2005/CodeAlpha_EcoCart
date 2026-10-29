import React, { useEffect, useState } from 'react';
import {
  Shield, DollarSign, Package, Users, AlertTriangle,
  Plus, Edit, Trash2, CheckCircle2, AlertCircle, RefreshCw, X, TrendingUp
} from 'lucide-react';
import { adminAPI } from '../services/api';
import EcoScoreBadge from '../components/EcoScoreBadge';
import { formatINR } from '../utils/formatters';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'products' | 'orders'

  // Data states
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderFilter, setOrderFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form states
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Reusable Bottles & Drinkware',
    stock: '',
    eco_score: 90,
    image_url: '',
    is_featured: 0
  });

  const loadAllAdminData = async () => {
    try {
      setLoading(true);
      setError('');
      const [analyticsRes, productsRes, ordersRes] = await Promise.all([
        adminAPI.getAnalytics(),
        adminAPI.getProducts(),
        adminAPI.getOrders(orderFilter)
      ]);

      if (analyticsRes.success) setAnalytics(analyticsRes.analytics);
      if (productsRes.success) setProducts(productsRes.products || []);
      if (ordersRes.success) setOrders(ordersRes.orders || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, [orderFilter]);

  const showSuccess = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const showError = (msg) => {
    setActionError(msg);
    setTimeout(() => setActionError(''), 5000);
  };

  // Status Change Handler
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await adminAPI.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        showSuccess(`Order status updated to "${newStatus}".`);
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      showError(err.message || 'Failed to update order status.');
    }
  };

  // Delete Product Handler
  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      const res = await adminAPI.deleteProduct(product.id);
      if (res.success) {
        showSuccess(`Deleted "${product.name}".`);
        setProducts(prev => prev.filter(p => p.id !== product.id));
      }
    } catch (err) {
      showError(err.message || 'Failed to delete product.');
    }
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category,
      stock: product.stock,
      eco_score: product.eco_score,
      image_url: product.image_url || '',
      is_featured: product.is_featured || 0
    });
    setIsEditModalOpen(true);
  };

  // Submit Create Product
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAPI.createProduct(productForm);
      if (res.success) {
        showSuccess(`Product "${res.product.name}" created!`);
        setIsCreateModalOpen(false);
        setProductForm({
          name: '',
          description: '',
          price: '',
          category: 'Reusable Bottles',
          stock: '',
          eco_score: 90,
          image_url: '',
          is_featured: 0
        });
        loadAllAdminData();
      }
    } catch (err) {
      showError(err.message || 'Failed to create product.');
    }
  };

  // Submit Edit Product
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const res = await adminAPI.updateProduct(selectedProduct.id, productForm);
      if (res.success) {
        showSuccess(`Product "${res.product.name}" updated!`);
        setIsEditModalOpen(false);
        loadAllAdminData();
      }
    } catch (err) {
      showError(err.message || 'Failed to update product.');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="spinner spinner-dark" style={{ width: '3rem', height: '3rem', margin: '0 auto 1.5rem' }} />
        <h2>Loading Store Analytics & Operations...</h2>
      </div>
    );
  }

  const kpis = analytics?.kpis || {};

  return (
    <div className="admin-page">
      <div className="page-header">
        <div className="container flex-between">
          <div>
            <div className="flex-align-center gap-2">
              <Shield className="text-forest" size={24} />
              <span className="section-eyebrow">Store Operations</span>
            </div>
            <h1 className="page-title">Admin Management Portal</h1>
          </div>

          <button type="button" onClick={() => setIsCreateModalOpen(true)} className="btn btn-primary">
            <Plus size={16} />
            <span>Add Eco Product</span>
          </button>
        </div>
      </div>

      <div className="container admin-container">
        {/* Navigation Tabs */}
        <div className="profile-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp size={18} />
            <span>Executive Analytics</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={18} />
            <span>Inventory Catalog ({products.length})</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <DollarSign size={18} />
            <span>All Orders ({orders.length})</span>
          </button>
        </div>

        {/* Global Notifications */}
        {actionSuccess && (
          <div className="alert alert-success" style={{ marginTop: '1.25rem' }}>
            <CheckCircle2 size={18} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {actionError && (
          <div className="alert alert-danger" style={{ marginTop: '1.25rem' }}>
            <AlertCircle size={18} />
            <span>{actionError}</span>
          </div>
        )}

        {/* TAB 1: Executive Analytics */}
        {activeTab === 'analytics' && (
          <div className="admin-tab-content">
            {/* Demo Notice Banner */}
            <div className="alert alert-info" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-forest-700)' }}>
              <Shield size={18} className="text-forest" />
              <div>
                <strong>Internship Prototype Demonstration Notice:</strong>
                <span style={{ display: 'block', fontSize: '0.8125rem', marginTop: '0.2rem' }}>
                  All orders, transactions, and revenue figures shown below are simulated for demonstration purposes within this CodeAlpha Full Stack Development portfolio. No real banking or card processing is involved.
                </span>
              </div>
            </div>

            {/* KPI Cards Row */}
            <div className="kpi-grid">
              <div className="kpi-card card">
                <div className="kpi-icon-wrap" style={{ backgroundColor: '#d8f3dc', color: '#173F35' }}>
                  <DollarSign size={24} />
                </div>
                <div className="kpi-value">{formatINR(kpis.totalSimulatedRevenue || 0)}</div>
                <div className="kpi-label">Simulated Revenue</div>
                <span className="kpi-sub">Total simulated order volume</span>
              </div>

              <div className="kpi-card card">
                <div className="kpi-icon-wrap" style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}>
                  <Package size={24} />
                </div>
                <div className="kpi-value">{kpis.totalOrders || 0}</div>
                <div className="kpi-label">Simulated Orders</div>
                <span className="kpi-sub">Avg Order Value: {formatINR(kpis.averageOrderValue || 0)}</span>
              </div>

              <div className="kpi-card card">
                <div className="kpi-icon-wrap" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
                  <AlertTriangle size={24} />
                </div>
                <div className="kpi-value">{kpis.lowStockCount || 0}</div>
                <div className="kpi-label">Low Stock Alerts</div>
                <span className="kpi-sub">Items with ≤ 20 stock remaining</span>
              </div>

              <div className="kpi-card card">
                <div className="kpi-icon-wrap" style={{ backgroundColor: '#ede9fe', color: '#6d28d9' }}>
                  <Users size={24} />
                </div>
                <div className="kpi-value">{kpis.totalCustomers || 0}</div>
                <div className="kpi-label">Active Customers</div>
                <span className="kpi-sub">Registered platform users</span>
              </div>
            </div>

            {/* Business Insights Box */}
            <div className="card" style={{ marginTop: '1.75rem', borderLeft: '4px solid var(--color-forest-700)' }}>
              <div className="flex-align-center gap-2" style={{ marginBottom: '0.75rem' }}>
                <TrendingUp className="text-forest" size={20} />
                <h3>Business Intelligence & Recommendations</h3>
              </div>
              <p style={{ color: 'var(--color-charcoal-700)', lineHeight: 1.6 }}>
                <strong>Customer Advantage:</strong> {analytics?.businessInsights?.sustainabilityAdvantage}
              </p>
              <p style={{ color: 'var(--color-charcoal-700)', lineHeight: 1.6, marginTop: '0.5rem' }}>
                <strong>Inventory Advisory:</strong> {analytics?.businessInsights?.inventoryRecommendation}
              </p>
            </div>

            {/* Top Products & Low Stock Grids */}
            <div className="admin-two-col" style={{ marginTop: '1.75rem' }}>
              {/* Top Selling Products */}
              <div className="card">
                <h3 style={{ marginBottom: '1rem' }}>Top Selling Eco Products</h3>
                {analytics?.topProducts?.length === 0 ? (
                  <p style={{ color: 'var(--color-charcoal-400)' }}>No orders placed yet.</p>
                ) : (
                  <div className="admin-mini-list">
                    {analytics?.topProducts?.map(tp => (
                      <div key={tp.product_id} className="admin-mini-item">
                        <div>
                          <strong>{tp.product_name}</strong>
                          <div className="flex-align-center gap-2" style={{ marginTop: '0.2rem' }}>
                            <EcoScoreBadge score={tp.eco_score} size="sm" />
                            <span style={{ fontSize: '0.8125rem', color: 'var(--color-charcoal-600)' }}>
                              {tp.total_quantity_sold} units sold
                            </span>
                          </div>
                        </div>
                        <span className="text-forest" style={{ fontWeight: 800 }}>
                          {formatINR(tp.total_revenue_generated)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Low Stock Items */}
              <div className="card">
                <h3 style={{ marginBottom: '1rem' }}>Low Stock Inventory Attention</h3>
                {analytics?.lowStockProducts?.length === 0 ? (
                  <p style={{ color: 'var(--color-forest-700)' }}>All items have healthy inventory.</p>
                ) : (
                  <div className="admin-mini-list">
                    {analytics?.lowStockProducts?.map(lp => (
                      <div key={lp.id} className="admin-mini-item">
                        <div>
                          <strong>{lp.name}</strong>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-charcoal-400)' }}>
                            {lp.category} • {formatINR(lp.price)}
                          </span>
                        </div>
                        <span className="badge badge-warning" style={{ fontSize: '0.8125rem' }}>
                          {lp.stock} in stock
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category Performance & Sales Breakdown */}
            {analytics?.categorySales && analytics.categorySales.length > 0 && (
              <div className="card" style={{ marginTop: '1.75rem' }}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                  <h3>Department & Category Sales Performance</h3>
                  <span className="badge badge-forest">{analytics.categorySales.length} Departments Active</span>
                </div>
                <div className="admin-table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Orders Generated</th>
                        <th>Units Sold</th>
                        <th style={{ textAlign: 'right' }}>Simulated Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.categorySales.map((cs, idx) => (
                        <tr key={idx}>
                          <td><strong>{cs.category}</strong></td>
                          <td>{cs.order_count}</td>
                          <td>{cs.items_sold} items</td>
                          <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--color-forest-800)' }}>
                            {formatINR(cs.total_revenue)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Business Value & Sustainability Mission Analysis */}
            <div className="card" style={{ marginTop: '1.75rem', backgroundColor: '#FAF7F2', border: '1px solid var(--color-border)' }}>
              <div className="flex-align-center gap-2" style={{ marginBottom: '0.75rem' }}>
                <Shield className="text-forest" size={20} />
                <h3 style={{ margin: 0 }}>Business Value: How EcoCart Promotes Sustainable Consumption</h3>
              </div>
              <p style={{ color: 'var(--color-charcoal-700)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Conventional e-commerce incentivizes impulse consumption with high plastic packaging waste. EcoCart alters customer purchasing dynamics through four core mechanisms:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <strong style={{ color: 'var(--color-forest-900)' }}>1. Objective Lifecycle Ratings</strong>
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.8125rem', color: 'var(--color-charcoal-600)', lineHeight: 1.5 }}>
                    Illustrative EcoScores (0–100) benchmark materials, recyclability, and plastic reduction, eliminating greenwashing confusion.
                  </p>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <strong style={{ color: 'var(--color-forest-900)' }}>2. Pre-Checkout Alternatives</strong>
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.8125rem', color: 'var(--color-charcoal-600)', lineHeight: 1.5 }}>
                    Recommendation algorithms proactively suggest greener substitutes in the same category before the order is finalized.
                  </p>
                </div>
                <div style={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <strong style={{ color: 'var(--color-forest-900)' }}>3. Quantified Impact Dashboard</strong>
                  <p style={{ margin: '0.35rem 0 0', fontSize: '0.8125rem', color: 'var(--color-charcoal-600)', lineHeight: 1.5 }}>
                    Customers monitor their cumulative single-use plastic bottles avoided and bags saved in their profile, fostering repeat conscious choices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Inventory Catalog */}
        {activeTab === 'products' && (
          <div className="admin-tab-content">
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Product Catalog & Stock Management</h3>
                <button type="button" onClick={() => setIsCreateModalOpen(true)} className="btn btn-primary btn-sm">
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="admin-table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>EcoScore</th>
                      <th>Featured</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="admin-prod-cell">
                            <img
                              src={p.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=80&q=80'}
                              alt={p.name}
                              className="admin-table-thumb"
                            />
                            <div>
                              <strong>{p.name}</strong>
                              <span className="admin-table-slug">{p.slug}</span>
                            </div>
                          </div>
                        </td>
                        <td>{p.category}</td>
                        <td><strong>{formatINR(p.price)}</strong></td>
                        <td>
                          <span className={`badge ${p.stock <= 0 ? 'badge-danger' : p.stock <= 20 ? 'badge-warning' : 'badge-forest'}`}>
                            {p.stock} units
                          </span>
                        </td>
                        <td><EcoScoreBadge score={p.eco_score} size="sm" /></td>
                        <td>{p.is_featured === 1 ? '⭐ Yes' : 'No'}</td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                            <button
                              type="button"
                              onClick={() => openEditModal(p)}
                              className="btn btn-secondary btn-sm"
                              title="Edit product"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p)}
                              className="btn btn-secondary btn-sm text-danger"
                              title="Delete product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="admin-tab-content">
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h3>Customer Orders Review</h3>
                <div className="flex-align-center gap-2">
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Filter by Status:</span>
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className="form-select form-select-sm"
                    style={{ width: 'auto' }}
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="admin-table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status & Transition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(ord => (
                      <tr key={ord.id}>
                        <td><strong>{ord.order_number}</strong></td>
                        <td>
                          <div>
                            <div>{ord.customer_name || ord.shipping_name}</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-400)' }}>
                              {ord.customer_email}
                            </span>
                          </div>
                        </td>
                        <td>{new Date(ord.created_at).toLocaleDateString()}</td>
                        <td><strong>{formatINR(ord.total_amount)}</strong></td>
                        <td><span className="badge badge-forest">{ord.payment_status}</span></td>
                        <td>
                          <select
                            value={ord.status}
                            onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                            className="form-select form-select-sm"
                            style={{
                              backgroundColor: ord.status === 'delivered' ? 'var(--status-success-bg)' :
                                               ord.status === 'shipped' ? 'var(--status-warning-bg)' : 'var(--color-surface)'
                            }}
                          >
                            <option value="pending">pending</option>
                            <option value="processing">processing</option>
                            <option value="shipped">shipped</option>
                            <option value="delivered">delivered</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE PRODUCT MODAL */}
      {isCreateModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
              <h3>Add New Eco Product</h3>
              <button type="button" onClick={() => setIsCreateModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. EcoBreeze Hemp Pillowcase"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  required
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Reusable Bottles & Drinkware">Reusable Bottles & Drinkware</option>
                    <option value="Sustainable Bags & Accessories">Sustainable Bags & Accessories</option>
                    <option value="Eco-Friendly Stationery">Eco-Friendly Stationery</option>
                    <option value="Home & Kitchen Essentials">Home & Kitchen Essentials</option>
                    <option value="Personal Care & Reusable Products">Personal Care & Reusable Products</option>
                    <option value="Sustainable Fashion">Sustainable Fashion</option>
                    <option value="Gardening & Outdoor Products">Gardening & Outdoor Products</option>
                    <option value="Travel & Lifestyle">Travel & Lifestyle</option>
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Illustrative EcoScore (0–100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={productForm.eco_score}
                    onChange={(e) => setProductForm({ ...productForm, eco_score: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="create-featured"
                  checked={productForm.is_featured === 1}
                  onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked ? 1 : 0 })}
                />
                <label htmlFor="create-featured" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Feature on Homepage</label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {isEditModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
              <h3>Edit Product: {selectedProduct.name}</h3>
              <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  required
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="Reusable Bottles & Drinkware">Reusable Bottles & Drinkware</option>
                    <option value="Sustainable Bags & Accessories">Sustainable Bags & Accessories</option>
                    <option value="Eco-Friendly Stationery">Eco-Friendly Stationery</option>
                    <option value="Home & Kitchen Essentials">Home & Kitchen Essentials</option>
                    <option value="Personal Care & Reusable Products">Personal Care & Reusable Products</option>
                    <option value="Sustainable Fashion">Sustainable Fashion</option>
                    <option value="Gardening & Outdoor Products">Gardening & Outdoor Products</option>
                    <option value="Travel & Lifestyle">Travel & Lifestyle</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">EcoScore (0–100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    required
                    value={productForm.eco_score}
                    onChange={(e) => setProductForm({ ...productForm, eco_score: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="edit-featured"
                  checked={productForm.is_featured === 1}
                  onChange={(e) => setProductForm({ ...productForm, is_featured: e.target.checked ? 1 : 0 })}
                />
                <label htmlFor="edit-featured" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Feature on Homepage</label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
