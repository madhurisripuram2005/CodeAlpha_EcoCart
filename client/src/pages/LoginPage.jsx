import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Leaf, LogIn, AlertCircle, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.success) {
        navigate(redirect, { replace: true });
      } else {
        setError(res.message || 'Login failed.');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  const fillCustomer = () => {
    setEmail('jane.eco@example.local');
    setPassword('GreenLiving#2026!');
  };

  const fillAdmin = () => {
    setEmail('admin@ecocart.local');
    setPassword('EcoAdmin#2026!');
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-header text-center">
          <div className="brand-icon-wrap" style={{ margin: '0 auto 0.75rem' }}>
            <Leaf size={24} />
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to your EcoCart sustainable shopping account</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg w-full"
            style={{ marginTop: '0.75rem' }}
          >
            {loading ? (
              <>
                <span className="spinner" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Fill Buttons for Testing */}
        <div className="demo-fill-box">
          <span className="demo-fill-label">Demo Quick-Fill:</span>
          <div className="demo-fill-buttons">
            <button type="button" onClick={fillCustomer} className="btn btn-secondary btn-sm">
              <User size={13} />
              <span>Customer Demo</span>
            </button>
            <button type="button" onClick={fillAdmin} className="btn btn-secondary btn-sm">
              <Shield size={13} />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        <div className="auth-footer text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">Create one for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
