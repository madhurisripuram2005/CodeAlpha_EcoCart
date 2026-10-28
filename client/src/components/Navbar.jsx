import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, ShoppingBag, User, LogOut, Menu, X, Shield, Package, Heart, Search, ChevronDown, Compass } from 'lucide-react';
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
        <Link to="/" className="navbar-brand" onClick={closeMenus}>
          <div className="brand-icon-wrap">
            <Leaf className="brand-leaf-icon" size={22} />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">EcoCart</span>
            <span className="brand-tagline">Sustainable Shopping</span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search 140+ eco products, materials, bottles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
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

        {/* Navbar Actions (Wishlist + Cart + Auth) */}
        <div className="navbar-actions">
          {/* Wishlist Link */}
          <Link to="/wishlist" className="wishlist-btn" aria-label={`View wishlist with ${totalWishlist} items`} onClick={closeMenus}>
            <Heart size={20} />
            <span className="action-label">Wishlist</span>
            {totalWishlist > 0 && (
              <span className="wishlist-badge animate-pop">{totalWishlist}</span>
            )}
          </Link>

          {/* Shopping Cart Button */}
          <Link to="/cart" className="cart-btn" aria-label={`View cart with ${totalItems} items`} onClick={closeMenus}>
            <ShoppingBag size={20} />
            <span className="action-label">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge animate-pop">{totalItems}</span>
            )}
          </Link>

          {/* User Account Controls */}
          {isAuthenticated ? (
            <div className="user-menu-wrap">
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

                  <Link to="/profile#orders" className="dropdown-item" onClick={closeMenus}>
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
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-sm btn-ghost">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Join EcoCart
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-slide-down">
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search 140+ eco products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <nav className="mobile-nav-links">
            <NavLink to="/" className="mobile-nav-link" onClick={closeMenus}>
              Home
            </NavLink>
            <NavLink to="/products" className="mobile-nav-link" onClick={closeMenus}>
              Explore All 140 Products
            </NavLink>
            <NavLink to="/wishlist" className="mobile-nav-link" onClick={closeMenus}>
              Wishlist ({totalWishlist})
            </NavLink>
            <NavLink to="/cart" className="mobile-nav-link" onClick={closeMenus}>
              Shopping Cart ({totalItems})
            </NavLink>

            <div className="mobile-categories-section">
              <span className="mobile-category-heading">Departments</span>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products?category=${encodeURIComponent(cat.slug)}`}
                  className="mobile-category-link"
                  onClick={closeMenus}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {isAdmin && (
              <NavLink to="/admin" className="mobile-nav-link admin-link" onClick={closeMenus}>
                <Shield size={16} />
                <span>Admin Portal</span>
              </NavLink>
            )}

            <hr className="mobile-divider" />

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="mobile-nav-link" onClick={closeMenus}>
                  <User size={16} />
                  <span>{user?.name} (Profile)</span>
                </Link>
                <button type="button" className="mobile-logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </>
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
      )}
    </header>
  );
}
