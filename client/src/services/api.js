const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Universal JSON fetch helper with credentials and error handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers,
    credentials: 'include' // Transmit HTTP-only auth cookies
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const networkError = new Error('Cannot connect to server. Please ensure the backend is running.');
      networkError.status = 503;
      throw networkError;
    }
    throw err;
  }
}

// 1. Authentication API
export const authAPI = {
  register: (userData) => request('/auth/register', { method: 'POST', body: userData }),
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getMe: () => request('/auth/me')
};

// 2. Products API
export const productAPI = {
  getProducts: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, value);
      }
    });
    return request(`/products?${query.toString()}`);
  },
  getCategories: () => request('/products/categories'),
  getProduct: (idOrSlug) => request(`/products/${encodeURIComponent(idOrSlug)}`)
};

// 3. Cart API
export const cartAPI = {
  getCart: () => request('/cart'),
  addToCart: (productId, quantity = 1) => request('/cart', { method: 'POST', body: { productId, quantity } }),
  updateQuantity: (cartItemId, quantity) => request(`/cart/${cartItemId}`, { method: 'PUT', body: { quantity } }),
  removeItem: (cartItemId) => request(`/cart/${cartItemId}`, { method: 'DELETE' }),
  clearCart: () => request('/cart', { method: 'DELETE' })
};

// 4. Orders & Checkout API
export const orderAPI = {
  checkout: (shippingDetails) => request('/orders/checkout', { method: 'POST', body: shippingDetails }),
  getOrders: () => request('/orders'),
  getOrder: (id) => request(`/orders/${id}`)
};

// 5. User Profile API
export const userAPI = {
  getProfile: () => request('/user/profile'),
  updateProfile: (profileData) => request('/user/profile', { method: 'PUT', body: profileData })
};

// 6. Admin API
export const adminAPI = {
  getAnalytics: () => request('/admin/analytics'),
  getProducts: () => request('/admin/products'),
  createProduct: (productData) => request('/admin/products', { method: 'POST', body: productData }),
  updateProduct: (id, productData) => request(`/admin/products/${id}`, { method: 'PUT', body: productData }),
  deleteProduct: (id) => request(`/admin/products/${id}`, { method: 'DELETE' }),
  getOrders: (status = 'all') => request(`/admin/orders?status=${status}`),
  updateOrderStatus: (id, status) => request(`/admin/orders/${id}/status`, { method: 'PUT', body: { status } })
};
