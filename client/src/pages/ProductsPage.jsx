import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, Filter, SlidersHorizontal, RotateCcw, ChevronLeft, ChevronRight,
  AlertCircle, Leaf, Sparkles, Check, X
} from 'lucide-react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { formatINR } from '../utils/formatters';

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

  // 8 Canonical Categories
  const defaultCategories = [
    'Reusable Bottles & Drinkware',
    'Sustainable Bags & Accessories',
    'Eco-Friendly Stationery',
    'Home & Kitchen Essentials',
    'Personal Care & Reusable Products',
    'Sustainable Fashion',
    'Gardening & Outdoor Products',
    'Travel & Lifestyle'
  ];

  // Fetch categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await productAPI.getCategories();
        if (res.success && res.categories) {
          setCategories(res.categories);
        }
      } catch (e) {
        // Fallback
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

  // Fetch products from backend whenever filters or page change
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const queryParams = {
          page,
          limit: 12,
          sort
        };

        if (search.trim()) queryParams.search = search.trim();
        if (category && category !== 'All') queryParams.category = category;
        if (minPrice) queryParams.min_price = minPrice;
        if (maxPrice) queryParams.max_price = maxPrice;
        if (minEcoScore) queryParams.min_eco_score = minEcoScore;

        const res = await productAPI.getProducts(queryParams);

        if (res.success) {
          setProducts(res.products || []);
          if (res.pagination) {
            setPagination(res.pagination);
          }
        } else {
          setError(res.message || 'Failed to retrieve products');
        }
      } catch (err) {
        setError(err.message || 'Unable to connect to EcoCart product server');
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="catalog-page">
      <div className="container catalog-container">
        {/* Page Title & Breadcrumb */}
        <div className="catalog-header">
          <div>
            <div className="page-header-badge">
              <Leaf size={14} className="text-success" />
              <span>Conscious Catalogue</span>
            </div>
            <h1 className="catalog-title">
              {category === 'All' ? 'All Sustainable Products' : category}
            </h1>
            <p className="catalog-subtitle">
              {pagination.total > 0
                ? `Showing ${products.length} of ${pagination.total} verified sustainable products with illustrative EcoScores.`
                : 'Browse our complete library of planetary-friendly essentials.'}
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            type="button"
            className="mobile-filter-trigger-btn btn btn-outline btn-sm"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          >
            <SlidersHorizontal size={16} />
            <span>Filters {category !== 'All' ? '(Active)' : ''}</span>
          </button>
        </div>

        {/* Catalog Main Layout (Sidebar + Grid) */}
        <div className="catalog-layout">
          {/* Filter Sidebar */}
          <aside className={`catalog-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <Filter size={18} />
                <span>Refine Catalogue</span>
              </h3>
              <div className="sidebar-header-actions">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="reset-filters-btn"
                  title="Reset all filters"
                >
                  <RotateCcw size={14} />
                  <span>Reset</span>
                </button>
                {mobileFilterOpen && (
                  <button
                    type="button"
                    className="close-mobile-filters"
                    onClick={() => setMobileFilterOpen(false)}
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">Departments</h4>
              <div className="category-filter-list">
                <button
                  type="button"
                  className={`category-filter-btn ${category === 'All' ? 'active' : ''}`}
                  onClick={() => { setCategory('All'); setPage(1); }}
                >
                  <span>All Products</span>
                  <span className="cat-count">140</span>
                </button>

                {defaultCategories.map((catName) => (
                  <button
                    key={catName}
                    type="button"
                    className={`category-filter-btn ${category === catName ? 'active' : ''}`}
                    onClick={() => { setCategory(catName); setPage(1); }}
                  >
                    <span className="cat-name">{catName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter (INR) */}
            <div className="filter-group">
              <h4 className="filter-group-title">Price Range (₹)</h4>
              <div className="price-inputs-row">
                <div className="price-input-wrap">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                    min="0"
                  />
                </div>
                <span className="price-separator">–</span>
                <div className="price-input-wrap">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                    min="0"
                  />
                </div>
              </div>

              {/* Quick Price Presets */}
              <div className="price-presets">
                <button
                  type="button"
                  className="price-preset-pill"
                  onClick={() => { setMinPrice('0'); setMaxPrice('500'); setPage(1); }}
                >
                  Under ₹500
                </button>
                <button
                  type="button"
                  className="price-preset-pill"
                  onClick={() => { setMinPrice('500'); setMaxPrice('1500'); setPage(1); }}
                >
                  ₹500 – ₹1,500
                </button>
                <button
                  type="button"
                  className="price-preset-pill"
                  onClick={() => { setMinPrice('1500'); setMaxPrice('5000'); setPage(1); }}
                >
                  ₹1,500+
                </button>
              </div>
            </div>

            {/* EcoScore Filter */}
            <div className="filter-group">
              <h4 className="filter-group-title">
                <span>Minimum EcoScore</span>
                {minEcoScore && <span className="filter-val-badge">{minEcoScore}+</span>}
              </h4>
              <input
                type="range"
                min="0"
                max="98"
                step="2"
                value={minEcoScore || 0}
                onChange={(e) => {
                  setMinEcoScore(e.target.value === '0' ? '' : e.target.value);
                  setPage(1);
                }}
                className="range-slider"
              />
              <div className="range-labels">
                <span>Any</span>
                <span>Good (80+)</span>
                <span>Top (95+)</span>
              </div>
            </div>

            {/* Apply Button for Mobile */}
            {mobileFilterOpen && (
              <button
                type="button"
                className="btn btn-primary btn-block mobile-apply-btn"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters ({pagination.total} Products)
              </button>
            )}
          </aside>

          {/* Catalog Content Area */}
          <main className="catalog-main">
            {/* Toolbar (Search Bar + Sort Dropdown) */}
            <div className="catalog-toolbar">
              <div className="search-bar-wrap">
                <Search size={18} className="search-input-icon" />
                <input
                  type="text"
                  placeholder="Search products by title, material, bamboo, titanium..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="catalog-search-input"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => { setSearch(''); setPage(1); }}
                    className="clear-search-btn"
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="sort-select-wrap">
                <span className="sort-label">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1); }}
                  className="sort-dropdown"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="eco_desc">Highest EcoScore</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
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

            {/* Loading Skeletons */}
            {loading ? (
              <div className="products-grid-skeleton">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="skeleton-card" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="empty-state card">
                <div className="empty-state-icon">
                  <Leaf size={48} className="text-muted" />
                </div>
                <h2>No eco products found</h2>
                <p>
                  No sustainable goods match your active search criteria. Try relaxing your filters or resetting your search.
                </p>
                <button type="button" onClick={handleResetFilters} className="btn btn-primary">
                  <RotateCcw size={16} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <>
                {/* Product Grid */}
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                  <div className="pagination-bar">
                    <button
                      type="button"
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page <= 1}
                      className="pagination-btn pagination-prev"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>

                    <div className="pagination-numbers">
                      {[...Array(pagination.totalPages)].map((_, idx) => {
                        const pageNum = idx + 1;
                        // Show first, last, and window around active page
                        if (
                          pageNum === 1 ||
                          pageNum === pagination.totalPages ||
                          (pageNum >= page - 2 && pageNum <= page + 2)
                        ) {
                          return (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => handlePageChange(pageNum)}
                              className={`pagination-num-btn ${page === pageNum ? 'active' : ''}`}
                            >
                              {pageNum}
                            </button>
                          );
                        } else if (
                          pageNum === page - 3 ||
                          pageNum === page + 3
                        ) {
                          return <span key={pageNum} className="pagination-ellipsis">…</span>;
                        }
                        return null;
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= pagination.totalPages}
                      className="pagination-btn pagination-next"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
