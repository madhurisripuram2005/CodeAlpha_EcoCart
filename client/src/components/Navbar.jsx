import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, ShoppingBag, User, LogOut, Menu, X, Shield, Package, HeartHandshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
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

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Products
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link admin-nav-link ${isActive ? 'active' : ''}`}>
              <Shield size={15} />
              <span>Admin Portal</span>
            </NavLink>
          )}
        </nav>

        {/* Navbar Actions (Cart + Auth) */}
        <div className="navbar-actions">
          {/* Shopping Cart Button */}
          <Link to="/cart" className="cart-btn" aria-label={`View cart with ${totalItems} items`} onClick={closeMenus}>
            <ShoppingBag size={20} />
            <span className="cart-label">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge animate-pop">{totalItems}</span>
            )}
          </Link>

          {/* User Account Controls */}
          {isAuthenticated ? (
            <div className="user-menu-wrap">
              <button
                type="button"
                className="user-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-expanded={userDropdownOpen}
              >
                <div className="user-avatar-circle">
                  <User size={16} />
                </div>
                <span className="user-name-text">{user.name.split(' ')[0]}</span>
                {isAdmin && <span className="admin-chip">Admin</span>}
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown card">
                  <div className="dropdown-user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <hr className="dropdown-divider" />
                  <Link to="/profile" className="dropdown-item" onClick={closeMenus}>
                    <User size={16} />
                    <span>My Profile & Impact</span>
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={closeMenus}>
                    <Package size={16} />
                    <span>My Order History</span>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="dropdown-item admin-item" onClick={closeMenus}>
                      <Shield size={16} />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <hr className="dropdown-divider" />
                  <button type="button" className="dropdown-item text-danger" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons-desktop">
              <Link to="/login" className="btn btn-sm btn-secondary" onClick={closeMenus}>
                Log In
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary" onClick={closeMenus}>
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-links">
            <NavLink to="/" className="mobile-nav-link" onClick={closeMenus}>
              Home
            </NavLink>
            <NavLink to="/products" className="mobile-nav-link" onClick={closeMenus}>
              Product Catalog
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/profile" className="mobile-nav-link" onClick={closeMenus}>
                  My Account & Impact
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin" className="mobile-nav-link admin-link" onClick={closeMenus}>
                    Admin Dashboard
                  </NavLink>
                )}
                <button type="button" className="mobile-nav-link text-danger" onClick={handleLogout}>
                  Log Out ({user.name.split(' ')[0]})
                </button>
              </>
            ) : (
              <div className="mobile-auth-actions">
                <Link to="/login" className="btn btn-secondary w-full" onClick={closeMenus}>
                  Log In
                </Link>
                <Link to="/register" className="btn btn-primary w-full" onClick={closeMenus}>
                  Create Free Account
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
