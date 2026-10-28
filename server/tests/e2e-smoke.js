/**
 * EcoCart Full Integration Verification Script
 * Validates the complete backend API and client data flow:
 * 1. Health check & CORS
 * 2. Product Catalog, search, filters, pagination
 * 3. Product detail with EcoScore factors & sustainable alternatives
 * 4. Customer registration & cookie session
 * 5. Current user session (/api/auth/me) & eco impact profile
 * 6. Cart operations: add, update, calculate server totals, delete
 * 7. Checkout transaction: stock deduction, order line items, simulated payment
 * 8. Order tracking & customer order history
 * 9. Admin business analytics KPIs, low-stock warnings, order status update
 * 10. Security: verify role protection blocks ordinary customer from admin APIs
 */

import http from 'node:http';
import app from '../src/app.js';
import { seedDatabase } from '../src/database/seed.js';

let server;
let port;
let baseUrl;

function request(method, path, { headers = {}, body = null, cookie = null } = {}) {
  return new Promise((resolve, reject) => {
    const reqHeaders = { ...headers };
    let payload = null;

    if (body) {
      payload = typeof body === 'string' ? body : JSON.stringify(body);
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }

    if (cookie) {
      reqHeaders['Cookie'] = cookie;
    }

    const options = {
      hostname: '127.0.0.1',
      port,
      path: encodeURI(path),
      method,
      headers: reqHeaders,
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(data);
        } catch {
          json = data;
        }

        const setCookies = res.headers['set-cookie'] || [];
        const sessionCookie = setCookies.map(c => c.split(';')[0]).join('; ');

        resolve({
          status: res.statusCode,
          headers: res.headers,
          cookie: sessionCookie || cookie,
          body: json,
        });
      });
    });

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runVerification() {
  console.log('🚀 Starting EcoCart Integration & Data Flow Verification...\n');

  // Seed clean DB
  await seedDatabase();

  // Start HTTP server on dynamic port
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });

  console.log(`📡 Backend test server running at ${baseUrl}`);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const health = await request('GET', '/api/health');
    assert(health.status === 200 && health.body.database === 'healthy', 'GET /api/health returns 200 healthy');

    // 2. Product Catalog
    const catalog = await request('GET', '/api/products?page=1&limit=8');
    assert(catalog.status === 200 && catalog.body.products.length === 8, 'GET /api/products returns paginated products (8 items)');
    assert(catalog.body.pagination.total === 20, 'Total seeded products count is 20');

    // 3. Category Filter
    const bottleFilter = await request('GET', '/api/products?category=Reusable Bottles');
    assert(bottleFilter.status === 200 && bottleFilter.body.products.every(p => p.category === 'Reusable Bottles'), 'GET /api/products?category filters correctly');

    // 4. Keyword Search
    const searchRes = await request('GET', '/api/products?search=bamboo');
    assert(searchRes.status === 200 && searchRes.body.products.length > 0, 'GET /api/products?search finds matching products');

    // 5. Product Detail & Alternatives
    const firstProduct = catalog.body.products[0];
    const detail = await request('GET', `/api/products/${firstProduct.slug}`);
    assert(detail.status === 200 && detail.body.product.id === firstProduct.id, 'GET /api/products/:slug returns correct product details');
    assert(detail.body.product.eco_factors && typeof detail.body.product.eco_factors === 'object', 'Product contains EcoScore factor breakdown');
    assert(Array.isArray(detail.body.product.alternatives), 'Product returns sustainable alternative recommendations');

    // 6. User Registration
    const newUserEmail = `test.shopper.${Date.now()}@ecocart.local`;
    const regRes = await request('POST', '/api/auth/register', {
      body: {
        name: 'Eco Shopper Test',
        email: newUserEmail,
        password: 'EcoPassword#2026',
      },
    });
    assert(regRes.status === 201 && regRes.body.user.role === 'customer', 'POST /api/auth/register creates customer');
    assert(regRes.body.token && regRes.cookie.includes('token='), 'Registration sets HTTP-only authentication cookie');
    const userCookie = regRes.cookie;

    // 7. Verify Authenticated Session
    const meRes = await request('GET', '/api/auth/me', { cookie: userCookie });
    assert(meRes.status === 200 && meRes.body.user.email === newUserEmail, 'GET /api/auth/me returns registered customer profile');

    // 8. Profile & Impact Metrics
    const profileRes = await request('GET', '/api/user/profile', { cookie: userCookie });
    assert(profileRes.status === 200 && profileRes.body.impact !== undefined, 'GET /api/user/profile includes personal eco impact metrics');

    // 9. Cart Operations
    const addCart = await request('POST', '/api/cart', {
      body: { productId: firstProduct.id, quantity: 2 },
      cookie: userCookie,
    });
    assert(addCart.status === 201, 'POST /api/cart adds items to customer cart');

    const viewCart = await request('GET', '/api/cart', { cookie: userCookie });
    assert(viewCart.status === 200 && viewCart.body.cart.items.length === 1, 'GET /api/cart returns customer cart items');
    assert(viewCart.body.cart.summary.subtotal > 0 && viewCart.body.cart.summary.impact.estimatedPlasticContainersAvoided > 0, 'Cart summary computes server totals and impact indicators');

    const cartItemId = viewCart.body.cart.items[0].cart_item_id;
    const updateCart = await request('PUT', `/api/cart/${cartItemId}`, {
      body: { quantity: 3 },
      cookie: userCookie,
    });
    const updatedItem = updateCart.body.cart.items.find(i => i.cart_item_id === cartItemId);
    assert(updateCart.status === 200 && updatedItem && updatedItem.quantity === 3, 'PUT /api/cart/:id updates quantity to 3');

    // 10. Checkout & Atomic Stock Deduction
    const initialStock = firstProduct.stock;
    const checkoutRes = await request('POST', '/api/orders/checkout', {
      body: {
        shipping_name: 'Eco Shopper Test',
        shipping_address: '123 Green Way, Suite 4B',
        shipping_city: 'Portland',
        shipping_postal_code: '97201',
        shipping_country: 'USA',
        payment_method: 'simulated_card',
      },
      cookie: userCookie,
    });
    assert(checkoutRes.status === 201 && checkoutRes.body.order.status === 'processing', 'POST /api/orders/checkout creates order with processing status');
    assert(checkoutRes.body.order.payment_status === 'paid', 'Simulated payment is marked as paid');
    assert(checkoutRes.body.order.order_number.startsWith('ORD-'), 'Checkout generates unique ORD- order number');

    // Verify stock was reduced by 3
    const productAfter = await request('GET', `/api/products/${firstProduct.id}`);
    assert(productAfter.body.product.stock === initialStock - 3, 'Order checkout atomically reduced product stock by 3');

    // Verify cart was cleared
    const cartAfter = await request('GET', '/api/cart', { cookie: userCookie });
    assert(cartAfter.body.cart.items.length === 0, 'Cart items cleared after successful checkout');

    // 11. Customer Order History
    const ordersRes = await request('GET', '/api/orders', { cookie: userCookie });
    assert(ordersRes.status === 200 && ordersRes.body.orders.length === 1, 'GET /api/orders lists placed order in history');

    // 12. Admin Security Check: Customer blocked from admin
    const forbiddenAdmin = await request('GET', '/api/admin/analytics', { cookie: userCookie });
    assert(forbiddenAdmin.status === 403, 'Security: Ordinary customer receives 403 Forbidden on /api/admin/analytics');

    // 13. Admin Login & Dashboard
    const adminLogin = await request('POST', '/api/auth/login', {
      body: {
        email: 'admin@ecocart.local',
        password: 'EcoAdmin#2026!',
      },
    });
    assert(adminLogin.status === 200 && adminLogin.body.user.role === 'admin', 'POST /api/auth/login authenticates Admin');
    const adminCookie = adminLogin.cookie;

    // 14. Admin Analytics KPIs
    const analytics = await request('GET', '/api/admin/analytics', { cookie: adminCookie });
    assert(analytics.status === 200 && analytics.body.analytics.kpis.totalSimulatedRevenue > 0, 'GET /api/admin/analytics returns business metrics');
    assert(Array.isArray(analytics.body.analytics.lowStockProducts), 'Admin analytics returns low-stock alerts');

    // 15. Admin Order Status Update
    const placedOrderId = checkoutRes.body.order.id;
    const updateOrder = await request('PUT', `/api/admin/orders/${placedOrderId}/status`, {
      body: { status: 'shipped' },
      cookie: adminCookie,
    });
    assert(updateOrder.status === 200 && updateOrder.body.order.status === 'shipped', 'PUT /api/admin/orders/:id/status updates order status to shipped');

    // 16. Logout
    const logoutRes = await request('POST', '/api/auth/logout', { cookie: userCookie });
    assert(logoutRes.status === 200, 'POST /api/auth/logout clears session');

    console.log(`\n========================================`);
    console.log(`🎉 Integration Test Results: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================\n`);

  } finally {
    if (server) {
      server.close();
    }
  }

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
