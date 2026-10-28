import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="spinner spinner-dark" style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 1rem' }} />
        <p>Verifying administrative credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <div className="empty-state">
          <div className="empty-state-icon" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>
            <ShieldAlert size={36} />
          </div>
          <h2>Administrator Access Restricted</h2>
          <p style={{ margin: '1rem 0 1.5rem' }}>
            You are logged in as a standard customer. This administration portal requires verified store management privileges.
          </p>
          <a href="/" className="btn btn-primary">Return to Storefront</a>
        </div>
      </div>
    );
  }

  return children;
}
