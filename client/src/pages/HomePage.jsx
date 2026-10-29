import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, ArrowRight, ShieldCheck, RefreshCw, Sparkles, Droplets,
  ShoppingBag, Award, Heart, Package, Sun, Compass, CheckCircle2, ChevronRight,
  Truck, Recycle, Globe, Star, Mail, Check, TrendingUp
} from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import ImpactSummaryCard from '../components/ImpactSummaryCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topEcoProducts, setTopEcoProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'top-eco' | 'newest'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        setError(null);
        const [featRes, ecoRes, newRes, catRes] = await Promise.all([
          productAPI.getProducts({ limit: 8, sort: 'featured' }),
          productAPI.getProducts({ limit: 8, sort: 'eco_desc' }),
          productAPI.getProducts({ limit: 8, sort: 'newest' }),
          productAPI.getCategories()
        ]);

        if (featRes.success) setFeaturedProducts(featRes.products || []);
        if (ecoRes.success) setTopEcoProducts(ecoRes.products || []);
        if (newRes.success) setNewArrivals(newRes.products || []);
        if (catRes.success) setCategories(catRes.categories || []);
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
    averageEcoScore: 95.2,
    disclaimer: 'Illustrative community benchmark calculated from combined purchases of reusable canteens and organic fiber totes.'
  };

  const displayedProducts = activeTab === 'featured'
    ? featuredProducts
    : activeTab === 'top-eco'
      ? topEcoProducts
      : newArrivals;

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const testimonials = [
    {
      name: 'Ananya Deshmukh',
      role: 'Environmental Consultant',
      city: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'EcoCart transforms how I shop. The transparent EcoScore breakdown helps me evaluate actual lifecycle impacts rather than falling for greenwashed buzzwords.'
    },
    {
      name: 'Vikram Sengupta',
      role: 'Zero-Waste Advocate',
      city: 'Kolkata',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'The copper canteens and plantable seed pencils arrived in 100% plastic-free packaging. Even the packaging tape was water-activated paper. Genuinely impressive.'
    },
    {
      name: 'Dr. Meera Nambiar',
      role: 'Professor of Botany',
      city: 'Bengaluru',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      quote: 'The sustainable alternative recommendations are a standout feature. Seeing a greener option with higher recycled content before checking out changed my habits permanently.'
    }
  ];

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

      {/* 2. Four Core Eco Benefits Bar */}
      <section className="eco-benefits-bar">
        <div className="container benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon-box">
              <Package size={22} className="text-forest" />
            </div>
            <div>
              <h4 className="benefit-title">100% Plastic-Free</h4>
              <p className="benefit-desc">Compostable unbleached kraft cartons and paper tape.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box">
              <Truck size={22} className="text-forest" />
            </div>
            <div>
              <h4 className="benefit-title">Carbon-Neutral Logistics</h4>
              <p className="benefit-desc">Calculated shipping offsets invested in agroforestry.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box">
              <Recycle size={22} className="text-forest" />
            </div>
            <div>
              <h4 className="benefit-title">Circular Lifecycle</h4>
              <p className="benefit-desc">Priority for organic, heirloom, and recyclable goods.</p>
            </div>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon-box">
              <Globe size={22} className="text-forest" />
            </div>
            <div>
              <h4 className="benefit-title">Direct Artisan Sourcing</h4>
              <p className="benefit-desc">Supporting fair-trade rural weavers and potters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Departments / 8 Category Tiles */}
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

      {/* 4. Featured Showcase Tabs (Featured / Highest EcoScore / New Arrivals) */}
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
              <button
                type="button"
                className={`tab-btn ${activeTab === 'newest' ? 'active' : ''}`}
                onClick={() => setActiveTab('newest')}
              >
                New Arrivals
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

      {/* 5. Business Value & Sustainable Consumption Section */}
      <section className="business-value-section">
        <div className="container">
          <div className="business-value-card card">
            <div className="business-value-header flex-align-center gap-2">
              <TrendingUp className="text-forest" size={24} />
              <span className="section-eyebrow">Business Value & Purpose</span>
            </div>
            <h2 className="business-value-title">How EcoCart Promotes Sustainable Consumption</h2>
            <p className="business-value-lead">
              EcoCart is engineered not merely as an online store, but as a behavioral catalyst for conscious purchasing habits.
            </p>

            <div className="business-value-grid">
              <div className="value-pillar">
                <div className="value-pillar-number">01</div>
                <h4>Lifecycle Transparency Over Greenwashing</h4>
                <p>Every product is scored from 0–100 across material circularity, carbon footprint, and end-of-life biodegradability, giving shoppers objective comparison criteria.</p>
              </div>

              <div className="value-pillar">
                <div className="value-pillar-number">02</div>
                <h4>Algorithmic Alternative Suggestions</h4>
                <p>When consumers explore standard essentials, our recommendation engine surfaces greener alternatives with equal or superior EcoScores right on the product page.</p>
              </div>

              <div className="value-pillar">
                <div className="value-pillar-number">03</div>
                <h4>Quantified Personal Environmental Impact</h4>
                <p>Shoppers track their cumulative single-use plastic bottles avoided and plastic bags eliminated in their customer profile, reinforcing sustainable lifestyle retention.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Sustainability Education Section */}
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

      {/* 7. Customer Reviews / Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">Voices of the Movement</span>
            <h2 className="section-title">Trusted by Conscious Shoppers</h2>
            <p className="section-description">
              Read how everyday households and sustainability leaders make a difference with EcoCart.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card card">
                <div className="stars-group" style={{ marginBottom: '0.75rem' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#eab308" color="#eab308" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author-row flex-align-center gap-3">
                  <img src={t.image} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <h4 className="testimonial-name">{t.name}</h4>
                    <span className="testimonial-meta">{t.role} • {t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive Newsletter Signup Section */}
      <section className="newsletter-banner-section">
        <div className="container">
          <div className="newsletter-card card">
            <div className="newsletter-content">
              <span className="section-eyebrow" style={{ color: 'var(--color-ivory-300)' }}>Stay Conscious</span>
              <h2>Get the Free Zero-Waste Living Handbook</h2>
              <p>
                Subscribe to our monthly digest. Receive practical zero-waste habit guides, seasonal organic tips, and exclusive access to new artisan arrivals.
              </p>

              {newsletterSubscribed ? (
                <div className="newsletter-confirm-box">
                  <CheckCircle2 size={24} className="text-success" />
                  <div>
                    <strong>Welcome to the EcoCart Community!</strong>
                    <p>Check your inbox for your complimentary Zero-Waste Living Handbook.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="home-newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    className="newsletter-home-input"
                  />
                  <button type="submit" className="btn btn-primary btn-lg">
                    <span>Subscribe Free</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Brand Mission & Values */}
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
                  <span className="stat-number">95.2</span>
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
