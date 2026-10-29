import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="site-footer">
      {/* Sustainability Trust Badges */}
      <div className="footer-highlights">
        <div className="container highlights-grid">
          <div className="highlight-item">
            <div className="highlight-icon-wrap">
              <Leaf size={20} />
            </div>
            <div>
              <h4 className="highlight-title">Illustrative EcoScores</h4>
              <p className="highlight-desc">Transparent lifecycle ratings on every product</p>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-wrap">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="highlight-title">Better Alternatives</h4>
              <p className="highlight-desc">Intelligent recommendations for lower impact items</p>
            </div>
          </div>

          <div className="highlight-item">
            <div className="highlight-icon-wrap">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="highlight-title">Conscious Materials</h4>
              <p className="highlight-desc">Recycled steel, bamboo, cork, and organic cotton</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <div className="brand-icon-wrap">
              <Leaf size={20} />
            </div>
            <span className="footer-brand-title">EcoCart</span>
          </div>
          <p className="footer-mission">
            Empowering conscious shoppers to discover verified eco-friendly goods, compare sustainable alternatives, and measure their personal reduction in single-use plastic.
          </p>
          <div className="footer-badge-pill">
            <span>🌿 CodeAlpha Full Stack Project</span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Eco Departments</h4>
          <ul className="footer-links">
            <li><Link to="/products?category=Reusable+Bottles+%26+Drinkware">Bottles & Drinkware</Link></li>
            <li><Link to="/products?category=Sustainable+Bags+%26+Accessories">Bags & Accessories</Link></li>
            <li><Link to="/products?category=Eco-Friendly+Stationery">Eco Stationery</Link></li>
            <li><Link to="/products?category=Home+%26+Kitchen+Essentials">Home & Kitchen</Link></li>
            <li><Link to="/products?category=Personal+Care+%26+Reusable+Products">Personal Care</Link></li>
            <li><Link to="/products?category=Sustainable+Fashion">Sustainable Fashion</Link></li>
            <li><Link to="/products?category=Gardening+%26+Outdoor+Products">Gardening & Outdoor</Link></li>
            <li><Link to="/products?category=Travel+%26+Lifestyle">Travel & Lifestyle</Link></li>
            <li><Link to="/products">All 140+ Products</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-links">
            <li><Link to="/profile">My Impact Dashboard</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/login">Account Login</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">Eco Newsletter</h4>
          <p className="newsletter-desc">
            Receive monthly sustainable living guides, zero-waste habits, and new product releases.
          </p>

          {subscribed ? (
            <div className="newsletter-success">
              <CheckCircle2 size={18} />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} EcoCart — Smart Sustainable Shopping Platform. All rights reserved.</p>
        <p className="footer-disclaimer-text">
          Prototype EcoScores and environmental impact indicators are illustrative demonstration calculations based on material and packaging assumptions, not certified third-party environmental audits.
        </p>
      </div>
    </footer>
  );
}
