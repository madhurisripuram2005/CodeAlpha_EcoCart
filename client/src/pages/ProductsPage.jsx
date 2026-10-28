import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter & Search states initialized from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');
  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '');
  const [minEcoScore, setMinEcoScore] = useState(searchParams.get('min_eco_score') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page'), 10) || 1);

  // Data states
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await productAPI.getCategories();
        if (res.success) {
          setCategories(res.categories || []);
        }
      } catch (e) {
        // Fallback categories
      }
    }
    loadCategories();
  }, []);

  // Sync URL search params
  useEffect(() => {
    const params = {};
    if (search.trim()) params.search = search.trim();
    if (category && category !== 'All') params.category = category;
    if (sort && sort !== 'featured') params.sort = sort;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (minEcoScore) params.min_eco_score = minEcoScore;
    if (page > 1) params.page = page;

    setSearchParams(params, { replace: true });
  }, [search, category, sort, minPrice, maxPrice, minEcoScore, page, setSearchParams]);

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const res = await productAPI.getProducts({
          search: search.trim(),
          category: category === 'All' ? '' : category,
          sort,
          min_price: minPrice,
          max_price: maxPrice,
          min_eco_score: minEcoScore,
          page,
          limit: 12
        });

        if (res.success) {
          setProducts(res.products || []);
          setPagination(res.pagination || { total: 0, page: 1, limit: 12, totalPages: 1 });
        }
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [search, category, sort, minPrice, maxPrice, minEcoScore, page]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setSort('featured');
    setMinPrice('');
    setMaxPrice('');
    setMinEcoScore('');
    setPage(1);
  };

  const hasActiveFilters = search || (category && category !== 'All') || minPrice || maxPrice || minEcoScore || (sort && sort !== 'featured');

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <span className="section-eyebrow">Conscious Catalog</span>
          <h1 className="page-title">Sustainable Products</h1>
          <p className="page-subtitle">
            Every product is assessed with an illustrative <strong>EcoScore</strong> measuring materials, lifecycle, and single-use plastic elimination.
          </p>
        </div>
      </div>

      <div className="container catalog-container">
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-bar">
          <button
            type="button"
            className="btn btn-secondary btn-sm mobile-filter-btn"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters {hasActiveFilters && '• Active'}</span>
          </button>

          <div className="catalog-sort-mobile">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="form-select form-select-sm"
            >
              <option value="featured">Featured Picks</option>
              <option value="eco_desc">Highest EcoScore</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="catalog-layout">
          {/* Sidebar Filters */}
          <aside className={`catalog-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-card card">
              <div className="flex-between sidebar-title-row">
                <h3 className="sidebar-heading">Filters</h3>
                {hasActiveFilters && (
                  <button type="button" onClick={handleResetFilters} className="btn-text-reset">
                    <RotateCcw size={12} />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div className="filter-group">
                <label className="form-label">Search Catalog</label>
                <div className="search-input-wrap">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search bamboo, tote, pens..."
                    className="form-input search-input"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="filter-group">
                <label className="form-label">Category</label>
                <div className="category-pill-list">
                  <button
                    type="button"
                    className={`category-pill ${category === 'All' ? 'active' : ''}`}
                    onClick={() => { setCategory('All'); setPage(1); }}
                  >
                    <span>All Products</span>
                  </button>
                  {categories.map(c => (
                    <button
                      key={c.category}
                      type="button"
                      className={`category-pill ${category === c.category ? 'active' : ''}`}
                      onClick={() => { setCategory(c.category); setPage(1); }}
                    >
                      <span>{c.category}</span>
                      <span className="cat-pill-count">{c.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* EcoScore Filter */}
              <div className="filter-group">
                <label className="form-label">Minimum EcoScore</label>
                <div className="ecoscore-filter-options">
                  <button
                    type="button"
                    className={`filter-score-chip ${minEcoScore === '90' ? 'active' : ''}`}
                    onClick={() => { setMinEcoScore(minEcoScore === '90' ? '' : '90'); setPage(1); }}
                  >
                    🌿 90+ (Exceptional)
                  </button>
                  <button
                    type="button"
                    className={`filter-score-chip ${minEcoScore === '85' ? 'active' : ''}`}
                    onClick={() => { setMinEcoScore(minEcoScore === '85' ? '' : '85'); setPage(1); }}
                  >
                    🌱 85+ (Very Good)
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <label className="form-label">Price Range ($)</label>
                <div className="price-inputs-row">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                    className="form-input price-input"
                    min="0"
                  />
                  <span className="price-dash">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                    className="form-input price-input"
                    min="0"
                  />
                </div>
              </div>

              {/* Close button for mobile drawer */}
              {mobileFilterOpen && (
                <button
                  type="button"
                  className="btn btn-primary w-full mobile-apply-btn"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Apply Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Product Grid */}
          <main className="catalog-main">
            {/* Top Toolbar */}
            <div className="catalog-toolbar">
              <span className="catalog-results-count">
                Showing <strong>{products.length}</strong> of <strong>{pagination.total}</strong> products
              </span>

              <div className="catalog-sort-desktop">
                <label className="sort-label">Sort by:</label>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1); }}
                  className="form-select form-select-sm sort-select"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="eco_desc">Highest EcoScore</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Loading Indicator */}
            {loading ? (
              <div className="catalog-loading card">
                <div className="spinner spinner-dark" style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 1rem' }} />
                <p>Loading sustainable products...</p>
              </div>
            ) : products.length === 0 ? (
              /* Empty State */
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Filter size={32} />
                </div>
                <h3>No Products Found</h3>
                <p>We couldn't find any eco-friendly products matching your current filters.</p>
                <button type="button" onClick={handleResetFilters} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                  <RotateCcw size={16} />
                  <span>Clear All Filters</span>
                </button>
              </div>
            ) : (
              /* Product Grid */
              <div className="grid-products">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="pagination-wrap">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  disabled={pagination.page <= 1}
                  onClick={() => { setPage(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="page-indicator">
                  Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => { setPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
