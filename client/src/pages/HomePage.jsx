import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck, RefreshCw, Sparkles, Droplets, ShoppingBag, Award } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import ImpactSummaryCard from '../components/ImpactSummaryCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        setError(null);
        const [prodRes, catRes] = await Promise.all([
          productAPI.getProducts({ limit: 4, sort: 'featured' }),
          productAPI.getCategories()
        ]);

        if (prodRes.success) {
          setFeaturedProducts(prodRes.products || []);
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

  const sampleImpact = {
    estimatedPlasticContainersAvoided: 2450,
    estimatedSingleUseBagsSaved: 1890,
    averageEcoScore: 93,
    disclaimer: 'Illustrative community benchmark calculated from combined purchases of reusable canteens and organic fiber totes.'
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-pill">
              <Sparkles size={14} />
              <span>Smart Sustainable Shopping</span>
            </div>
            <h1 className="hero-heading">
              Shop with <span className="text-forest-gradient">Planetary Intelligence.</span>
            </h1>
            <p className="hero-subtext">
              EcoCart helps conscious consumers discover premium everyday essentials, verify their environmental lifecycle with illustrative <strong>EcoScores</strong>, and make intelligent zero-waste choices.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                <span>Explore Eco Catalog</span>
                <ArrowRight size={18} />
              </Link>
              <a href="#how-it-works" className="btn btn-secondary btn-lg">
                <span>How EcoScore Works</span>
              </a>
            </div>

            {/* Quick stats banner */}
            <div className="hero-trust-row">
              <div className="trust-stat">
                <strong>100%</strong>
                <span>Plastic-Free Packaged</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-stat">
                <strong>0–100</strong>
                <span>Lifecycle EcoScores</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-stat">
                <strong>Zero</strong>
                <span>Greenwashing</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card card">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
                alt="Eco-friendly bamboo and sustainable home products"
                className="hero-main-img"
              />
              <div className="hero-floating-badge">
                <Leaf size={18} className="text-forest" />
                <div>
                  <strong>Average 92+ EcoScore</strong>
                  <span>Sustainably sourced botanicals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className="section-categories">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Explore Collections</span>
            <h2 className="section-title">Shop by Sustainable Category</h2>
            <p className="section-desc">Carefully curated product families created from renewable, recycled, and biodegradable materials.</p>
          </div>

          <div className="categories-grid">
            <Link to="/products?category=Reusable+Bottles" className="category-card card card-hover">
              <div className="cat-icon-wrap cat-bottles">
                <Droplets size={28} />
              </div>
              <h3 className="cat-title">Reusable Bottles</h3>
              <p className="cat-count">Stainless steel, titanium & borosilicate</p>
              <span className="cat-link-text">Browse Bottles →</span>
            </Link>

            <Link to="/products?category=Sustainable+Bags" className="category-card card card-hover">
              <div className="cat-icon-wrap cat-bags">
                <ShoppingBag size={28} />
              </div>
              <h3 className="cat-title">Sustainable Bags</h3>
              <p className="cat-count">Organic cotton, recycled ocean PET & cork</p>
              <span className="cat-link-text">Browse Bags →</span>
            </Link>

            <Link to="/products?category=Eco+Stationery" className="category-card card card-hover">
              <div className="cat-icon-wrap cat-stationery">
                <Leaf size={28} />
              </div>
              <h3 className="cat-title">Eco Stationery</h3>
              <p className="cat-count">Plantable seed pencils & stone paper</p>
              <span className="cat-link-text">Browse Stationery →</span>
            </Link>

            <Link to="/products?category=Home+Essentials" className="category-card card card-hover">
              <div className="cat-icon-wrap cat-home">
                <Award size={28} />
              </div>
              <h3 className="cat-title">Home Essentials</h3>
              <p className="cat-count">Solid dish blocks, soy candles & bamboo sheets</p>
              <span className="cat-link-text">Browse Home →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Curated Featured Products */}
      <section className="section-featured">
        <div className="container">
          <div className="flex-between section-header-row">
            <div>
              <span className="section-eyebrow">Curated Picks</span>
              <h2 className="section-title">Highest-Rated Eco Products</h2>
            </div>
            <Link to="/products" className="btn btn-outline btn-sm">
              <span>View All 20 Products</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="catalog-loading">
              <div className="spinner spinner-dark" style={{ width: '2.5rem', height: '2.5rem' }} />
              <p>Fetching verified eco-friendly products...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger">
              <span>{error}</span>
            </div>
          ) : (
            <div className="grid-products">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. How EcoScore Works Section */}
      <section id="how-it-works" className="section-ecoscore">
        <div className="container">
          <div className="ecoscore-box card">
            <div className="ecoscore-text">
              <span className="section-eyebrow">Methodology & Transparency</span>
              <h2>How EcoCart Calculates Your EcoScore</h2>
              <p>
                Every product listed on EcoCart receives an illustrative sustainability score from 0 to 100 based on four transparent weighted criteria:
              </p>

              <div className="criteria-list">
                <div className="criteria-item">
                  <div className="criteria-num">01</div>
                  <div>
                    <h4>Renewable & Recycled Materials (35%)</h4>
                    <p>Post-consumer metals, GOTS organic cotton, and closed-loop bamboo viscose.</p>
                  </div>
                </div>

                <div className="criteria-item">
                  <div className="criteria-num">02</div>
                  <div>
                    <h4>Plastic-Free & Biodegradable Packaging (25%)</h4>
                    <p>Unbleached kraft card, water-based inks, and zero petroleum bubble wrap.</p>
                  </div>
                </div>

                <div className="criteria-item">
                  <div className="criteria-num">03</div>
                  <div>
                    <h4>Durability & Single-Use Elimination (25%)</h4>
                    <p>Multi-year lifecycle testing designed to replace thousands of single-use items.</p>
                  </div>
                </div>

                <div className="criteria-item">
                  <div className="criteria-num">04</div>
                  <div>
                    <h4>Low-Impact Freight & Supply Chain (15%)</h4>
                    <p>Efficient flat-pack geometries and verified carbon-neutral transport.</p>
                  </div>
                </div>
              </div>

              <div className="criteria-disclaimer">
                <ShieldCheck size={16} />
                <span>
                  <strong>Prototype Labeling:</strong> Scores are illustrative prototype models created for platform testing and demonstration, not certified ISO 14040 environmental certifications.
                </span>
              </div>
            </div>

            <div className="ecoscore-visual">
              <ImpactSummaryCard impact={sampleImpact} title="Community Eco Impact" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
