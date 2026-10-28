import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowLeft, Home, ShoppingBag } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="not-found-page container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div className="empty-state" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="empty-state-icon" style={{ backgroundColor: 'var(--color-forest-100)', color: 'var(--color-forest-800)' }}>
          <Leaf size={40} />
        </div>
        <span className="section-eyebrow" style={{ color: 'var(--status-warning)' }}>404 Error</span>
        <h1 style={{ margin: '0.5rem 0 1rem' }}>This Page Hasn't Sprouted Yet</h1>
        <p style={{ color: 'var(--color-charcoal-600)', marginBottom: '2rem', lineHeight: 1.6 }}>
          The path or sustainable product you are searching for might have been relocated, replanted, or doesn't exist.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/products" className="btn btn-secondary">
            <ShoppingBag size={16} />
            <span>Explore Sustainable Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
