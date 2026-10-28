/**
 * Live Integration & Verification Script for EcoCart
 * Tests the entire platform through the live running Vite proxy (http://localhost:5173/api)
 * exactly as the browser frontend behaves.
 */

const BASE_URL = 'http://localhost:5173/api';

class CookieJar {
  constructor() {
    this.cookies = new Map();
  }

  saveFromResponse(res) {
    const raw = res.headers.get('set-cookie');
    if (!raw) return;
    // Split cookies if multiple
    const cookieStrings = raw.split(/,(?=\s*[^;=]+=[^;=]+)/);
    for (const c of cookieStrings) {
      const parts = c.trim().split(';')[0];
      const [name, ...val] = parts.split('=');
      if (name) {
        this.cookies.set(name.trim(), val.join('='));
      }
    }
  }

  getCookieHeader() {
    const pairs = [];
    for (const [name, val] of this.cookies.entries()) {
      pairs.push(`${name}=${val}`);
    }
    return pairs.join('; ');
  }

  clear() {
    this.cookies.clear();
  }
}

async function api(path, options = {}, jar = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (jar) {
    const cookieHeader = jar.getCookieHeader();
    if (cookieHeader) {
      headers['Cookie'] = cookieHeader;
    }
  }

  const config = {
    ...options,
    headers
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, config);
  if (jar) {
    jar.saveFromResponse(res);
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  return { status: res.status, headers: res.headers, body };
}

let passedCount = 0;
let failedCount = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passedCount++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
    failedCount++;
  }
}

async function runLiveVerification() {
  console.log('================================================================');
  console.log('🧪 EcoCart Phase 5: Live Integration & Verification Suite');
  console.log(`📡 Testing against: ${BASE_URL} (Vite Proxy -> Express Backend)`);
  console.log('================================================================\n');

  // ==================================================================
  // 1. Health & Server Proxy Check
  // ==================================================================
  console.log('🔹 1. Health & Server Connectivity:');
  const health = await api('/health');
  assert(health.status === 200, 'GET /health responds with 200 OK');
  assert(health.body && health.body.database === 'healthy', 'Database engine reports healthy connection');

  // ==================================================================
  // 2. Product Catalog, Search, Filter & Sustainable Alternatives
  // ==================================================================
  console.log('\n🔹 2. Product Catalog, Search, Filtering & EcoScore Alternatives:');
  const catalog = await api('/products?page=1&limit=6');
  assert(catalog.status === 200 && catalog.body.products.length === 6, 'GET /products returns 6 paginated items');
  assert(catalog.body.pagination.total >= 20, `Total catalog size verified (found ${catalog.body.pagination.total} items)`);

  const categoryFilter = await api('/products?category=Reusable Bottles');
  assert(
    categoryFilter.status === 200 &&
    categoryFilter.body.products.length > 0 &&
    categoryFilter.body.products.every(p => p.category === 'Reusable Bottles'),
    'Category filter correctly restricts products to "Reusable Bottles"'
  );

  const searchRes = await api('/products?search=titanium');
  assert(searchRes.status === 200 && searchRes.body.products.length > 0, 'Keyword search for "titanium" returns matching items');

  const sortPrice = await api('/products?sort=price_asc');
  const prices = sortPrice.body.products.map(p => p.price);
  const isSorted = prices.slice(1).every((p, i) => p >= prices[i]);
  assert(sortPrice.status === 200 && isSorted, 'Sorting by "price_asc" correctly orders items by ascending price');

  const sampleProduct = catalog.body.products[0];
  const detailRes = await api(`/products/${sampleProduct.slug}`);
  assert(detailRes.status === 200 && detailRes.body.product.id === sampleProduct.id, 'Product detail by slug loads complete product data');
  assert(detailRes.body.product.eco_factors && typeof detailRes.body.product.eco_factors === 'object', 'Product detail contains EcoScore factor breakdown');
  assert(Array.isArray(detailRes.body.product.alternatives), 'Product detail returns sustainable alternative recommendations');

  const notFoundProduct = await api('/products/non-existent-product-slug-xyz');
  assert(notFoundProduct.status === 404, 'Invalid product slug correctly returns 404 Not Found');

  // ==================================================================
  // 3. Unauthenticated Security Boundary
  // ==================================================================
  console.log('\n🔹 3. Unauthenticated Security Boundaries (401 Unauthorized):');
  const unauthCart = await api('/cart');
  assert(unauthCart.status === 401, 'Anonymous request to GET /cart rejected with 401');

  const unauthAddCart = await api('/cart', { method: 'POST', body: { productId: 1, quantity: 1 } });
  assert(unauthAddCart.status === 401, 'Anonymous request to POST /cart rejected with 401');

  const unauthOrders = await api('/orders');
  assert(unauthOrders.status === 401, 'Anonymous request to GET /orders rejected with 401');

  const unauthProfile = await api('/user/profile');
  assert(unauthProfile.status === 401, 'Anonymous request to GET /user/profile rejected with 401');

  const unauthAdmin = await api('/admin/analytics');
  assert(unauthAdmin.status === 401, 'Anonymous request to GET /admin/analytics rejected with 401');

  // ==================================================================
  // 4. Customer Authentication & Lifecycle
  // ==================================================================
  console.log('\n🔹 4. Customer Registration, Session & Validation:');
  const customerJar = new CookieJar();
  const testEmail = `live.tester.${Date.now()}@ecocart.local`;

  // Validation: Short password rejected
  const shortPassRes = await api('/auth/register', {
    method: 'POST',
    body: { name: 'Live Tester', email: testEmail, password: '123' }
  });
  assert(shortPassRes.status === 400, 'Registration rejects password shorter than 6 characters (400 Bad Request)');

  // Successful Registration
  const regRes = await api('/auth/register', {
    method: 'POST',
    body: { name: 'Live Tester', email: testEmail, password: 'StrongPassword#2026' }
  }, customerJar);
  assert(regRes.status === 201 && regRes.body.user.email === testEmail, 'POST /auth/register creates new customer account');
  assert(regRes.body.user.role === 'customer', 'New account assigned role "customer"');

  // Duplicate email registration rejected
  const dupRegRes = await api('/auth/register', {
    method: 'POST',
    body: { name: 'Live Tester Duplicate', email: testEmail, password: 'StrongPassword#2026' }
  });
  assert(dupRegRes.status === 409, 'Registration rejects duplicate email address with 409 Conflict');

  // Verify /auth/me with session cookie
  const meRes = await api('/auth/me', {}, customerJar);
  assert(meRes.status === 200 && meRes.body.user.email === testEmail, 'GET /auth/me returns authenticated customer details');

  // ==================================================================
  // 5. Cart Operations, Stock Checks & Server-Calculated Totals
  // ==================================================================
  console.log('\n🔹 5. Cart Operations, Stock Checks & Environmental Impact:');

  // Add in-stock product to cart
  const targetProduct = catalog.body.products[0];
  const addCartRes = await api('/cart', {
    method: 'POST',
    body: { productId: targetProduct.id, quantity: 2 }
  }, customerJar);
  assert(addCartRes.status === 201 || addCartRes.status === 200, 'POST /cart adds 2 items to customer cart');

  // Test stock limit check: attempt to add more than stock
  const excessQtyRes = await api('/cart', {
    method: 'POST',
    body: { productId: targetProduct.id, quantity: targetProduct.stock + 999 }
  }, customerJar);
  assert(excessQtyRes.status === 400, 'POST /cart rejects quantity exceeding available stock (400 Bad Request)');

  // View cart and verify server totals
  const getCartRes = await api('/cart', {}, customerJar);
  assert(getCartRes.status === 200 && getCartRes.body.cart.items.length === 1, 'GET /cart returns customer cart items');
  const expectedSubtotal = Math.round(targetProduct.price * 2 * 100) / 100;
  assert(getCartRes.body.cart.summary.subtotal === expectedSubtotal, `Cart subtotal calculated correctly ($${expectedSubtotal})`);
  assert(getCartRes.body.cart.summary.impact.estimatedPlasticContainersAvoided > 0, 'Cart displays illustrative plastic container diversion impact');

  // Update quantity stepper
  const cartItem = getCartRes.body.cart.items[0];
  const updateQtyRes = await api(`/cart/${cartItem.cart_item_id}`, {
    method: 'PUT',
    body: { quantity: 3 }
  }, customerJar);
  const updatedItem = updateQtyRes.body.cart.items.find(i => i.cart_item_id === cartItem.cart_item_id);
  assert(updateQtyRes.status === 200 && updatedItem.quantity === 3, 'PUT /cart/:id updates item quantity to 3');

  // ==================================================================
  // 6. Checkout Flow, Atomic Stock Deduction & Order History
  // ==================================================================
  console.log('\n🔹 6. Checkout Flow, Atomic Stock Deduction & Order History:');

  // Attempt checkout with missing address fields
  const invalidCheckout = await api('/orders/checkout', {
    method: 'POST',
    body: { shipping_name: 'Live Tester' } // missing address, city, etc.
  }, customerJar);
  assert(invalidCheckout.status === 400, 'POST /orders/checkout rejects incomplete shipping address (400)');

  // Successful checkout with valid details
  const initialStock = targetProduct.stock;
  const validCheckout = await api('/orders/checkout', {
    method: 'POST',
    body: {
      shipping_name: 'Live Tester',
      shipping_address: '456 Sustainable Blvd',
      shipping_city: 'Seattle',
      shipping_postal_code: '98101',
      shipping_country: 'USA',
      payment_method: 'simulated_card'
    }
  }, customerJar);
  assert(validCheckout.status === 201 && validCheckout.body.order.status === 'processing', 'Checkout creates order with "processing" status');
  assert(validCheckout.body.order.payment_status === 'paid', 'Order payment marked as "paid" (simulated transaction)');
  assert(validCheckout.body.order.order_number.startsWith('ORD-'), `Order assigned unique tracking code: ${validCheckout.body.order.order_number}`);

  // Verify product stock was atomically deducted by 3
  const productAfterCheckout = await api(`/products/${targetProduct.id}`);
  assert(productAfterCheckout.body.product.stock === initialStock - 3, `Product stock deducted atomically from ${initialStock} to ${initialStock - 3}`);

  // Verify cart is cleared after checkout
  const cartAfterCheckout = await api('/cart', {}, customerJar);
  assert(cartAfterCheckout.body.cart.items.length === 0, 'Cart is automatically cleared after order placement');

  // Verify order appears in order history
  const orderHistory = await api('/orders', {}, customerJar);
  assert(orderHistory.status === 200 && orderHistory.body.orders.length === 1, 'Customer order history lists newly placed order');

  // Verify customer personal impact profile updated
  const profileRes = await api('/user/profile', {}, customerJar);
  assert(profileRes.status === 200 && profileRes.body.ordersSummary.totalOrders === 1, 'Profile summary reports 1 placed order');
  assert(profileRes.body.impact.totalEcoItemsPurchased === 3, 'Profile records 3 total eco items purchased');

  // Verify customer cannot access admin routes (403 Forbidden)
  const forbiddenAdmin = await api('/admin/analytics', {}, customerJar);
  assert(forbiddenAdmin.status === 403, 'Customer blocked from admin analytics with 403 Forbidden');

  // Customer Logout
  const customerLogout = await api('/auth/logout', { method: 'POST' }, customerJar);
  assert(customerLogout.status === 200, 'Customer logout clears session');

  // Verify session invalidated
  const postLogoutMe = await api('/auth/me', {}, customerJar);
  assert(postLogoutMe.status === 401, 'Subsequent request after logout returns 401 Unauthorized');

  // ==================================================================
  // 7. Administrator Management & Order Status
  // ==================================================================
  console.log('\n🔹 7. Administrator Management & Order Fulfillment:');
  const adminJar = new CookieJar();

  // Admin login
  const adminLogin = await api('/auth/login', {
    method: 'POST',
    body: { email: 'admin@ecocart.local', password: 'EcoAdmin#2026!' }
  }, adminJar);
  assert(adminLogin.status === 200 && adminLogin.body.user.role === 'admin', 'Administrator login successful with role "admin"');

  // Admin Analytics
  const analyticsRes = await api('/admin/analytics', {}, adminJar);
  assert(analyticsRes.status === 200 && analyticsRes.body.analytics.kpis.totalSimulatedRevenue > 0, 'Admin analytics returns revenue KPIs');
  assert(Array.isArray(analyticsRes.body.analytics.lowStockProducts), 'Admin analytics returns low-stock alerts array');

  // Admin Order List
  const adminOrders = await api('/admin/orders', {}, adminJar);
  assert(adminOrders.status === 200 && adminOrders.body.orders.length > 0, 'Admin can view all platform orders');

  // Admin Order Status Update
  const placedOrderId = validCheckout.body.order.id;
  const updateStatusRes = await api(`/admin/orders/${placedOrderId}/status`, {
    method: 'PUT',
    body: { status: 'shipped' }
  }, adminJar);
  assert(updateStatusRes.status === 200 && updateStatusRes.body.order.status === 'shipped', 'Admin updates order status from "processing" to "shipped"');

  // Admin Product Creation
  const newProductRes = await api('/admin/products', {
    method: 'POST',
    body: {
      name: 'Solar Powered Bamboo Desk Lamp',
      description: 'Zero emission natural bamboo task lamp with integrated solar collector and USB-C reserve.',
      price: 49.99,
      category: 'Home Essentials',
      stock: 45,
      eco_score: 95,
      image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
      is_featured: 1
    }
  }, adminJar);
  assert(newProductRes.status === 201 && newProductRes.body.product.name.includes('Solar'), 'Admin successfully creates new eco-friendly product');

  // Admin Product Update
  const createdProductId = newProductRes.body.product.id;
  const updateProductRes = await api(`/admin/products/${createdProductId}`, {
    method: 'PUT',
    body: { price: 44.99, stock: 50 }
  }, adminJar);
  assert(updateProductRes.status === 200 && updateProductRes.body.product.price === 44.99, 'Admin successfully updates product price and stock');

  // Admin attempts to delete product associated with orders (protection check)
  const deleteOrderedRes = await api(`/admin/products/${targetProduct.id}`, { method: 'DELETE' }, adminJar);
  assert(deleteOrderedRes.status === 400, 'Security: Cannot delete product with existing customer order records (400)');

  // Admin deletes the newly created unordered test product
  const deleteUnorderedRes = await api(`/admin/products/${createdProductId}`, { method: 'DELETE' }, adminJar);
  assert(deleteUnorderedRes.status === 200, 'Admin can safely delete unordered draft product');

  // Admin Logout
  const adminLogout = await api('/auth/logout', { method: 'POST' }, adminJar);
  assert(adminLogout.status === 200, 'Admin logout clears session');

  console.log('\n================================================================');
  console.log(`🏁 Live Verification Results: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log('================================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runLiveVerification().catch(err => {
  console.error('Fatal live verification error:', err);
  process.exit(1);
});
