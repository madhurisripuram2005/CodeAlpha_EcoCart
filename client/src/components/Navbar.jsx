import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Leaf, ShoppingBag, User, LogOut, Menu, X, Shield, Package, Heart,
  Search, ChevronDown, Compass, ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on page route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCategoryDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const categories = [
    { name: 'Reusable Bottles & Drinkware', slug: 'Reusable Bottles & Drinkware' },
    { name: 'Sustainable Bags & Accessories', slug: 'Sustainable Bags & Accessories' },
    { name: 'Eco-Friendly Stationery', slug: 'Eco-Friendly Stationery' },
    { name: 'Home & Kitchen Essentials', slug: 'Home & Kitchen Essentials' },
    { name: 'Personal Care & Reusable Products', slug: 'Personal Care & Reusable Products' },
    { name: 'Sustainable Fashion', slug: 'Sustainable Fashion' },
    { name: 'Gardening & Outdoor Products', slug: 'Gardening & Outdoor Products' },
    { name: 'Travel & Lifestyle', slug: 'Travel & Lifestyle' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCategoryDropdownOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenus} aria-label="EcoCart Home">
          <div className="brand-icon-wrap">
            <Leaf className="brand-leaf-icon" size={22} />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">EcoCart</span>
            <span className="brand-tagline">Sustainable Shopping</span>
          </div>
        </Link>

        {/* Global Desktop Search Bar */}
        <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search 140+ eco products, materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>

          {/* Categories Dropdown */}
          <div className="nav-dropdown-wrap" onMouseLeave={() => setCategoryDropdownOpen(false)}>
            <button
              type="button"
              className={`nav-link dropdown-trigger ${categoryDropdownOpen ? 'open' : ''}`}
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              aria-expanded={categoryDropdownOpen}
            >
              <Compass size={15} />
              <span>Categories</span>
              <ChevronDown size={13} className="chevron-icon" />
            </button>

            {categoryDropdownOpen && (
              <div className="dropdown-panel category-dropdown-panel animate-fade-in">
                <div className="category-dropdown-grid">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products?category=${encodeURIComponent(cat.slug)}`}
                      className="category-dropdown-item"
                      onClick={closeMenus}
                    >
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            All Products
          </NavLink>

          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link admin-nav-link ${isActive ? 'active' : ''}`}>
              <Shield size={15} />
              <span>Admin Portal</span>
            </NavLink>
          )}
        </nav>

        {/* Navbar Actions (Wishlist + Cart + Auth + Hamburger) */}
        <div className="navbar-actions">
          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="action-icon-btn wishlist-btn"
            aria-label={`View wishlist with ${totalWishlist} items`}
            onClick={closeMenus}
            title="Wishlist"
          >
            <Heart size={20} />
            <span className="action-label desktop-only">Wishlist</span>
            {totalWishlist > 0 && (
              <span className="action-badge wishlist-badge animate-pop">{totalWishlist}</span>
            )}
          </Link>

          {/* Shopping Cart Button */}
          <Link
            to="/cart"
            className="action-icon-btn cart-btn"
            aria-label={`View cart with ${totalItems} items`}
            onClick={closeMenus}
            title="Shopping Cart"
          >
            <ShoppingBag size={20} />
            <span className="action-label desktop-only">Cart</span>
            {totalItems > 0 && (
              <span className="action-badge cart-badge animate-pop">{totalItems}</span>
            )}
          </Link>

          {/* Desktop User Account Controls */}
          {isAuthenticated ? (
            <div className="user-menu-wrap desktop-only">
              <button
                type="button"
                className="user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-expanded={userDropdownOpen}
                aria-label="User account menu"
              >
                <div className="user-avatar-circle">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="user-display-name">{user?.name?.split(' ')[0]}</span>
              </button>

              {userDropdownOpen && (
                <div className="dropdown-menu animate-fade-in" onMouseLeave={() => setUserDropdownOpen(false)}>
                  <div className="dropdown-header">
                    <p className="dropdown-user-name">{user?.name}</p>
                    <p className="dropdown-user-email">{user?.email}</p>
                    <span className={`role-badge ${isAdmin ? 'role-admin' : 'role-customer'}`}>
                      {user?.role === 'admin' ? 'Administrator' : 'Conscious Shopper'}
                    </span>
                  </div>

                  <hr className="dropdown-divider" />

                  <Link to="/profile" className="dropdown-item" onClick={closeMenus}>
                    <User size={16} />
                    <span>My Profile & Eco Impact</span>
                  </Link>

                  <Link to="/profile" className="dropdown-item" onClick={closeMenus}>
                    <Package size={16} />
                    <span>Order History</span>
                  </Link>

                  {isAdmin && (
                    <Link to="/admin" className="dropdown-item admin-item" onClick={closeMenus}>
                      <Shield size={16} />
                      <span>Admin Management</span>
                    </Link>
                  )}

                  <hr className="dropdown-divider" />

                  <button type="button" className="dropdown-item logout-item" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons desktop-only">
              <Link to="/login" className="btn btn-sm btn-ghost">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Join Free
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation with Backdrop */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay animate-fade-in" onClick={closeMenus}>
          <div className="mobile-drawer animate-slide-down" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Search Input */}
            <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="mobile-search-input"
                placeholder="Search 140+ eco products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="mobile-search-btn" aria-label="Search">
                <ArrowRight size={16} />
              </button>
            </form>

            <nav className="mobile-nav-links">
              <NavLink to="/" className="mobile-nav-link" onClick={closeMenus}>
                <span>Home</span>
              </NavLink>

              <NavLink to="/products" className="mobile-nav-link" onClick={closeMenus}>
                <span>Explore All 140 Products</span>
                <span className="mobile-count-pill">140</span>
              </NavLink>

              <NavLink to="/wishlist" className="mobile-nav-link" onClick={closeMenus}>
                <span className="flex-align-center gap-2">
                  <Heart size={18} className="text-accent" />
                  <span>Wishlist</span>
                </span>
                {totalWishlist > 0 && <span className="mobile-count-pill pill-accent">{totalWishlist}</span>}
              </NavLink>

              <NavLink to="/cart" className="mobile-nav-link" onClick={closeMenus}>
                <span className="flex-align-center gap-2">
                  <ShoppingBag size={18} className="text-forest" />
                  <span>Shopping Cart</span>
                </span>
                {totalItems > 0 && <span className="mobile-count-pill pill-forest">{totalItems}</span>}
              </NavLink>

              {/* Mobile Departments Accordion */}
              <div className="mobile-categories-section">
                <span className="mobile-category-heading">Departments</span>
                <div className="mobile-categories-grid">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products?category=${encodeURIComponent(cat.slug)}`}
                      className="mobile-category-link"
                      onClick={closeMenus}
                    >
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {isAdmin && (
                <NavLink to="/admin" className="mobile-nav-link admin-link" onClick={closeMenus}>
                  <Shield size={18} />
                  <span>Admin Operations Portal</span>
                </NavLink>
              )}

              <hr className="mobile-divider" />

              {/* Mobile Auth Actions */}
              {isAuthenticated ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-card">
                    <div className="user-avatar-circle">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <strong>{user?.name}</strong>
                      <span className="mobile-user-email">{user?.email}</span>
                    </div>
                  </div>

                  <Link to="/profile" className="mobile-nav-link" onClick={closeMenus}>
                    <User size={18} />
                    <span>My Profile & Eco Impact</span>
                  </Link>

                  <button type="button" className="mobile-logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-actions">
                  <Link to="/login" className="btn btn-outline btn-block" onClick={closeMenus}>
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-block" onClick={closeMenus}>
                    Join EcoCart Free
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
