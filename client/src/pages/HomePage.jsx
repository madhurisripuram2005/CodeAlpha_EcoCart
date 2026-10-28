import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, ArrowRight, ShieldCheck, RefreshCw, Sparkles, Droplets,
  ShoppingBag, Award, Heart, Package, Sun, Compass, CheckCircle2, ChevronRight
} from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import ImpactSummaryCard from '../components/ImpactSummaryCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        setError(null);
        const [featRes, bestRes, catRes] = await Promise.all([
          productAPI.getProducts({ limit: 8, sort: 'featured' }),
          productAPI.getProducts({ limit: 8, sort: 'eco_desc' }),
          productAPI.getCategories()
        ]);

        if (featRes.success) {
          setFeaturedProducts(featRes.products || []);
        }
        if (bestRes.success) {
          setBestsellers(bestRes.products || []);
        }
        if (catRes.success) {
          setCategories(catRes.categories || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load store catalog');
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const departmentMeta = [
    { name: 'Reusable Bottles & Drinkware', desc: 'Vacuum flasks, copper canteens & tumblers', count: 20, icon: Droplets, color: '#173F35' },
    { name: 'Sustainable Bags & Accessories', desc: 'Jute totes, cork satchels & denim packs', count: 20, icon: ShoppingBag, color: '#276356' },
    { name: 'Eco-Friendly Stationery', desc: 'Plantable seed pencils, stone & elephant journals', count: 20, icon: Leaf, color: '#337b6b' },
    { name: 'Home & Kitchen Essentials', desc: 'Cast iron, beeswax wraps & coconut scrubbers', count: 25, icon: RefreshCw, color: '#429582' },
    { name: 'Personal Care & Reusable Products', desc: 'Safety razors, bamboo brushes & shampoo bars', count: 15, icon: Award, color: '#173F35' },
    { name: 'Sustainable Fashion', desc: 'Organic khadi shirts, hemp denim & flax linen', count: 15, icon: Sparkles, color: '#276356' },
    { name: 'Gardening & Outdoor Products', desc: 'Coir seedling pots, solar lanterns & heirloom seeds', count: 15, icon: Sun, color: '#337b6b' },
    { name: 'Travel & Lifestyle', desc: 'Solar power banks, bamboo cutlery & cork wallets', count: 10, icon: Compass, color: '#429582' }
  ];

  const communityImpact = {
    estimatedPlasticContainersAvoided: 18450,
    estimatedSingleUseBagsSaved: 14200,
    averageEcoScore: 95,
    disclaimer: 'Illustrative community benchmark calculated from combined purchases of reusable canteens and organic fiber totes.'
  };

  const displayedProducts = activeTab === 'featured' ? featuredProducts : bestsellers;

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill">
              <Sparkles size={14} />
              <span>140+ Zero-Waste Essentials in Stock</span>
            </div>
            <h1 className="hero-heading">
              Conscious Living, <span className="text-forest-gradient">Measurable Impact.</span>
            </h1>
            <p className="hero-subtext">
              EcoCart helps conscious consumers discover premium everyday essentials, verify their environmental lifecycle with illustrative <strong>EcoScores (0–100)</strong>, and eliminate single-use plastic with every order.
            </p>

            <div className="hero-cta-group">
              <Link to="/products" className="btn btn-primary btn-lg">
                <span>Shop 140+ Eco Products</span>
                <ArrowRight size={18} />
              </Link>
              <a href="#how-it-works" className="btn btn-outline btn-lg">
                <span>How EcoScore Works</span>
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-success" />
                <span>Zero Plastic Packaging</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-success" />
                <span>Transparent EcoScores</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={16} className="text-success" />
                <span>Simulated INR Checkout</span>
              </div>
            </div>
          </div>

          <div className="hero-banner-visual">
            <div className="hero-card-stack">
              <div className="hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                  alt="Sustainable lifestyle showcase"
                  className="hero-main-img"
                />
                <div className="hero-floating-badge badge-top">
                  <Leaf size={16} />
                  <span>EcoScore: 98/100</span>
                </div>
                <div className="hero-floating-badge badge-bottom">
                  <ShieldCheck size={16} />
                  <span>100% Biodegradable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Departments / 8 Category Tiles */}
      <section className="departments-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Explore Sustainable Living</span>
            <h2 className="section-title">Shop by Eco Department</h2>
            <p className="section-description">
              Browse 140 curated products across 8 sustainable lifestyle categories.
            </p>
          </div>

          <div className="departments-grid">
            {departmentMeta.map((dept) => {
              const IconComp = dept.icon;
              return (
                <Link
                  key={dept.name}
                  to={`/products?category=${encodeURIComponent(dept.name)}`}
                  className="department-card card card-hover"
                >
                  <div className="department-icon-wrap" style={{ backgroundColor: `${dept.color}15`, color: dept.color }}>
                    <IconComp size={24} />
                  </div>
                  <div className="department-info">
                    <h3 className="department-title">{dept.name}</h3>
                    <p className="department-desc">{dept.desc}</p>
                    <span className="department-badge">{dept.count}+ items</span>
                  </div>
                  <ChevronRight size={18} className="department-arrow" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Showcase Tabs (Featured / Highest EcoScore) */}
      <section className="featured-section">
        <div className="container">
          <div className="showcase-header">
            <div>
              <span className="section-eyebrow">Handpicked Conscious Goods</span>
              <h2 className="section-title">Curated Eco Essentials</h2>
            </div>

            <div className="showcase-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
                onClick={() => setActiveTab('featured')}
              >
                Featured Highlights
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'top-eco' ? 'active' : ''}`}
                onClick={() => setActiveTab('top-eco')}
              >
                Highest EcoScore (95+)
              </button>
            </div>
          </div>

          {loading ? (
            <div className="products-grid-skeleton">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-card" />
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {displayedProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="section-footer-cta text-center">
            <Link to="/products" className="btn btn-outline btn-lg">
              <span>View All 140 Products in Catalog</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Sustainability Education Section */}
      <section id="how-it-works" className="education-section">
        <div className="container">
          <div className="education-grid">
            <div className="education-text">
              <span className="section-eyebrow">Planetary Transparency</span>
              <h2 className="section-title">How the EcoScore Model Works</h2>
              <p className="education-lead">
                Every product on EcoCart receives an illustrative 0–100 EcoScore evaluated across four lifecycle pillars.
              </p>

              <div className="pillars-list">
                <div className="pillar-item">
                  <div className="pillar-num">01</div>
                  <div>
                    <h4>Recycled & Renewable Materials</h4>
                    <p>Priority for FSC-certified bamboo, post-consumer stainless steel, organic unbleached cotton, and natural clay.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-num">02</div>
                  <div>
                    <h4>Carbon & Energy Footprint</h4>
                    <p>Low-emission artisanal manufacturing, rain-fed agriculture (Kala cotton), and localized supply chains.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-num">03</div>
                  <div>
                    <h4>Circularity & End-of-Life</h4>
                    <p>Multi-year product longevity, heirloom materials, and zero non-biodegradable synthetic microfibers.</p>
                  </div>
                </div>

                <div className="pillar-item">
                  <div className="pillar-num">04</div>
                  <div>
                    <h4>100% Plastic-Free Packaging</h4>
                    <p>Shipped exclusively in compostable kraft cartons, water-activated paper tape, and cotton rag cushions.</p>
                  </div>
                </div>
              </div>

              <div className="disclaimer-callout">
                <ShieldCheck size={16} />
                <span>
                  <strong>Illustrative Model Disclosure:</strong> EcoScores are computed algorithmically for educational and comparative demonstration in this internship prototype. They do not constitute certified ISO lifecycle audits.
                </span>
              </div>
            </div>

            <div className="education-visual">
              <ImpactSummaryCard impact={communityImpact} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brand Mission & Values */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-card">
            <div className="mission-content">
              <h2>Join the Zero-Waste Movement with EcoCart</h2>
              <p>
                Every choice counts. By choosing reusable alternatives, you actively reduce ocean plastics, save gallons of clean water, and support ethical artisan weavers and craftsmen across the country.
              </p>
              <div className="mission-stats">
                <div className="stat-box">
                  <span className="stat-number">140+</span>
                  <span className="stat-label">Sustainable Products</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">8</span>
                  <span className="stat-label">Conscious Departments</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">95.4</span>
                  <span className="stat-label">Average EcoScore</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Plastic-Free Shipping</span>
                </div>
              </div>
              <Link to="/register" className="btn btn-primary btn-lg">
                <span>Create Free Account</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
