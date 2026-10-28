/**
 * EcoCart Complete End-to-End System Verification
 * Tests all backend REST APIs, authentication, 140-product catalogue,
 * category distribution, search, filters, wishlist, cart, atomic checkout,
 * and admin security controls against the running server.
 */

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}${details ? ` -> ${details}` : ''}`);
    testsFailed++;
  }
}

async function runTests() {
  console.log('='.repeat(70));
  console.log('🌿 EcoCart Upgrade: Full End-to-End Live System Verification');
  console.log(`Target: ${BASE_URL}`);
  console.log('='.repeat(70));

  // --- 1. Health Check ---
  console.log('\n[1/7] Testing Server Health & Connectivity...');
  try {
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'Health check returns 200 OK');
    assert(healthData.status === 'online', 'Health status is "online"');
    assert(healthData.database === 'healthy', 'Database status is "healthy"');
  } catch (err) {
    assert(false, 'Server is reachable', err.message);
  }

  // --- 2. 140-Product Catalogue & Category Distribution ---
  console.log('\n[2/7] Testing 140-Product Catalogue & Category Distribution...');
  let sampleProductId = null;
  try {
    // Total products query
    const catRes = await fetch(`${BASE_URL}/products?limit=12`);
    const catData = await catRes.json();
    assert(catData.pagination.total === 140, `Catalogue contains exactly 140 products (actual: ${catData.pagination.total})`);
    assert(catData.products.length === 12, `Page 1 has 12 items`);
    assert(catData.pagination.totalPages === 12, `Total pages for 140 items @ 12/page is 12 (actual: ${catData.pagination.totalPages})`);
    
    sampleProductId = catData.products[0].id;

    // Test each of the 8 required categories
    const categoriesToTest = [
      { name: 'Reusable Bottles & Drinkware', min: 15 },
      { name: 'Sustainable Bags & Accessories', min: 15 },
      { name: 'Eco-Friendly Stationery', min: 15 },
      { name: 'Home & Kitchen Essentials', min: 20 },
      { name: 'Personal Care & Reusable Products', min: 15 },
      { name: 'Sustainable Fashion', min: 15 },
      { name: 'Gardening & Outdoor Products', min: 15 },
      { name: 'Travel & Lifestyle', min: 10 }
    ];

    for (const cat of categoriesToTest) {
      const res = await fetch(`${BASE_URL}/products?category=${encodeURIComponent(cat.name)}`);
      const data = await res.json();
      assert(
        data.pagination.total >= cat.min,
        `Category "${cat.name}" has >= ${cat.min} items (actual: ${data.pagination.total})`
      );
    }

    // Verify backward compatibility alias: 'Reusable Bottles'
    const legacyRes = await fetch(`${BASE_URL}/products?category=${encodeURIComponent('Reusable Bottles')}`);
    const legacyData = await legacyRes.json();
    assert(legacyData.pagination.total >= 20, `Legacy alias "Reusable Bottles" returns full series (actual: ${legacyData.pagination.total})`);

    // Verify all products on page 1 have realistic INR pricing (>= 99 and <= 5000)
    const validPrices = catData.products.every(p => typeof p.price === 'number' && p.price >= 99 && p.price <= 5000);
    assert(validPrices, 'Products have realistic INR pricing between ₹99 and ₹5,000');

    // Verify all products on page 1 have valid EcoScores (0 to 100)
    const validScores = catData.products.every(p => typeof p.eco_score === 'number' && p.eco_score >= 0 && p.eco_score <= 100);
    assert(validScores, 'Products have valid illustrative EcoScores (0–100)');

  } catch (err) {
    assert(false, 'Catalogue queries succeeded', err.message);
  }

  // --- 3. Search & Sorting Tests ---
  console.log('\n[3/7] Testing Search, Keyword Relevance, and Sorting...');
  try {
    // Search for artisanal / eco materials
    const copperRes = await fetch(`${BASE_URL}/products?search=copper`);
    const copperData = await copperRes.json();
    assert(copperData.pagination.total > 0, `Search for "copper" found matches (actual: ${copperData.pagination.total})`);

    const khadiRes = await fetch(`${BASE_URL}/products?search=khadi`);
    const khadiData = await khadiRes.json();
    assert(khadiData.pagination.total > 0, `Search for "khadi" found matches (actual: ${khadiData.pagination.total})`);

    const terraRes = await fetch(`${BASE_URL}/products?search=terracotta`);
    const terraData = await terraRes.json();
    assert(terraData.pagination.total > 0, `Search for "terracotta" found matches (actual: ${terraData.pagination.total})`);

    // Price sorting ascending
    const ascRes = await fetch(`${BASE_URL}/products?sort=price_asc&limit=5`);
    const ascData = await ascRes.json();
    const isAscending = ascData.products.every((p, i, arr) => i === 0 || p.price >= arr[i - 1].price);
    assert(isAscending, `Sort price_asc produces ascending prices (lowest: ₹${ascData.products[0]?.price})`);

    // Price sorting descending
    const descRes = await fetch(`${BASE_URL}/products?sort=price_desc&limit=5`);
    const descData = await descRes.json();
    const isDescending = descData.products.every((p, i, arr) => i === 0 || p.price <= arr[i - 1].price);
    assert(isDescending, `Sort price_desc produces descending prices (highest: ₹${descData.products[0]?.price})`);

    // EcoScore sorting descending
    const ecoRes = await fetch(`${BASE_URL}/products?sort=eco_desc&limit=5`);
    const ecoData = await ecoRes.json();
    const isEcoDescending = ecoData.products.every((p, i, arr) => i === 0 || p.eco_score <= arr[i - 1].eco_score);
    assert(isEcoDescending, `Sort eco_desc produces highest EcoScores first (top: ${ecoData.products[0]?.eco_score})`);

  } catch (err) {
    assert(false, 'Search and sort tests succeeded', err.message);
  }

  // --- 4. Product Details & Sustainable Alternatives ---
  console.log('\n[4/7] Testing Product Details & Sustainable Alternatives...');
  try {
    const singleRes = await fetch(`${BASE_URL}/products/${sampleProductId}`);
    const singleData = await singleRes.json();
    assert(singleRes.status === 200, `Product #${sampleProductId} detail fetched with 200 OK`);
    assert(singleData.product && singleData.product.id === sampleProductId, `Product #${sampleProductId} ID matches`);
    assert(Array.isArray(singleData.product.alternatives), 'Sustainable alternatives returned as array');
    console.log(`    ℹ️ Product: "${singleData.product.name}" (EcoScore: ${singleData.product.eco_score}, Price: ₹${singleData.product.price})`);
    console.log(`    ℹ️ Alternatives count: ${singleData.product.alternatives.length}`);
  } catch (err) {
    assert(false, 'Product details & alternatives succeeded', err.message);
  }

  // --- 5. Customer Authentication & Wishlist Operations ---
  console.log('\n[5/7] Testing Customer Authentication & Wishlist Endpoints...');
  let customerCookie = '';
  let customerToken = '';
  try {
    // Login as Jane Eco
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'jane.eco@example.local', password: 'GreenLiving#2026!' })
    });
    assert(loginRes.status === 200, 'Customer login succeeded (200 OK)');
    const loginData = await loginRes.json();
    assert(loginData.user && loginData.user.email === 'jane.eco@example.local', 'Logged in user is jane.eco@example.local');
    customerToken = loginData.token;

    // Extract cookie
    const setCookie = loginRes.headers.get('set-cookie');
    assert(!!setCookie, 'Received session cookie from login');
    customerCookie = setCookie ? setCookie.split(';')[0] : `token=${customerToken}`;

    // Auth me
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Cookie: customerCookie, Authorization: `Bearer ${customerToken}` }
    });
    assert(meRes.status === 200, 'GET /api/auth/me authenticated successfully');

    // Wishlist: Add item (sampleProductId)
    const addWishRes = await fetch(`${BASE_URL}/wishlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: customerCookie, Authorization: `Bearer ${customerToken}` },
      body: JSON.stringify({ productId: sampleProductId })
    });
    assert(addWishRes.status === 200 || addWishRes.status === 201, `POST /api/wishlist added product #${sampleProductId} (status: ${addWishRes.status})`);

    // Wishlist: Get items
    const getWishRes = await fetch(`${BASE_URL}/wishlist`, {
      headers: { Cookie: customerCookie, Authorization: `Bearer ${customerToken}` }
    });
    assert(getWishRes.status === 200, 'GET /api/wishlist returns 200 OK');
    const wishData = await getWishRes.json();
    const hasProduct = wishData.items.some(i => i.id === sampleProductId);
    assert(hasProduct, `Wishlist contains product #${sampleProductId} with joined details`);

    // Wishlist: Remove item
    const delWishRes = await fetch(`${BASE_URL}/wishlist/${sampleProductId}`, {
      method: 'DELETE',
      headers: { Cookie: customerCookie, Authorization: `Bearer ${customerToken}` }
    });
    assert(delWishRes.status === 200, `DELETE /api/wishlist/${sampleProductId} removed item successfully`);

  } catch (err) {
    assert(false, 'Customer authentication & wishlist succeeded', err.message);
  }

  // --- 6. Cart & Simulated Checkout Workflow ---
  console.log('\n[6/7] Testing Cart & Simulated Atomic Checkout...');
  try {
    // Add product to cart
    const addCartRes = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: customerCookie, Authorization: `Bearer ${customerToken}` },
      body: JSON.stringify({ productId: sampleProductId, quantity: 2 })
    });
    assert(addCartRes.status === 200 || addCartRes.status === 201, `Added item to cart (status: ${addCartRes.status})`);

    // Fetch cart
    const cartRes = await fetch(`${BASE_URL}/cart`, {
      headers: { Cookie: customerCookie, Authorization: `Bearer ${customerToken}` }
    });
    assert(cartRes.status === 200, 'Cart retrieved successfully');
    const cartData = await cartRes.json();
    assert(cartData.cart.items.length > 0, `Cart contains items (count: ${cartData.cart.items.length})`);
    assert(typeof cartData.cart.summary.subtotal === 'number' && cartData.cart.summary.subtotal > 0, `Cart subtotal calculated in INR: ₹${cartData.cart.summary.subtotal}`);

    // Fetch product stock before checkout
    const prodBefore = await (await fetch(`${BASE_URL}/products/${sampleProductId}`)).json();
    const stockBefore = prodBefore.product.stock;

    // Checkout with simulated payment
    const checkoutRes = await fetch(`${BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: customerCookie, Authorization: `Bearer ${customerToken}` },
      body: JSON.stringify({
        shipping_name: 'Jane Eco',
        shipping_address: 'Flat 402, Green Meadows',
        shipping_city: 'Bengaluru',
        shipping_postal_code: '560001',
        shipping_country: 'India',
        payment_method: 'simulated_card'
      })
    });
    assert(checkoutRes.status === 201, `Checkout succeeded with simulated payment (status: 201 Created)`);
    const checkoutData = await checkoutRes.json();
    assert(checkoutData.order && checkoutData.order.id, `Order generated with ID #${checkoutData.order?.id}`);
    assert(checkoutData.order.payment_status === 'paid', 'Order marked with paid simulated payment status');

    // Verify atomic stock deduction
    const prodAfter = await (await fetch(`${BASE_URL}/products/${sampleProductId}`)).json();
    const stockAfter = prodAfter.product.stock;
    assert(stockAfter < stockBefore, `Stock atomically decremented: before=${stockBefore}, after=${stockAfter}`);

    // Verify order in user history
    const historyRes = await fetch(`${BASE_URL}/orders`, {
      headers: { Cookie: customerCookie, Authorization: `Bearer ${customerToken}` }
    });
    const historyData = await historyRes.json();
    assert(historyData.orders.some(o => o.id === checkoutData.order.id), 'Newly created order appears in user order history');

  } catch (err) {
    assert(false, 'Cart & checkout workflow succeeded', err.message);
  }

  // --- 7. Security, Admin Analytics & Role Controls ---
  console.log('\n[7/7] Testing Security, Admin Analytics & Role Controls...');
  try {
    // 1. Customer cannot access admin analytics (403 Forbidden)
    const forbiddenRes = await fetch(`${BASE_URL}/admin/analytics`, {
      headers: { Cookie: customerCookie, Authorization: `Bearer ${customerToken}` }
    });
    assert(forbiddenRes.status === 403, 'Customer correctly forbidden from /api/admin/analytics (403 Forbidden)');

    // 2. Login as Admin
    const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ecocart.local', password: 'EcoAdmin#2026!' })
    });
    assert(adminLoginRes.status === 200, 'Admin login succeeded (200 OK)');
    const adminLoginData = await adminLoginRes.json();
    const adminToken = adminLoginData.token;
    const adminCookie = adminLoginRes.headers.get('set-cookie')?.split(';')[0] || `token=${adminToken}`;

    // 3. Admin Analytics
    const analyticsRes = await fetch(`${BASE_URL}/admin/analytics`, {
      headers: { Cookie: adminCookie, Authorization: `Bearer ${adminToken}` }
    });
    assert(analyticsRes.status === 200, 'Admin analytics returns 200 OK');
    const analyticsData = await analyticsRes.json();
    assert(typeof analyticsData.analytics.kpis.totalSimulatedRevenue === 'number', `Analytics reports total revenue: ₹${analyticsData.analytics.kpis.totalSimulatedRevenue}`);
    assert(analyticsData.analytics.kpis.totalOrders > 0, `Analytics reports total orders: ${analyticsData.analytics.kpis.totalOrders}`);
    assert(Array.isArray(analyticsData.analytics.lowStockProducts), `Admin identifies ${analyticsData.analytics.lowStockProducts.length} low-stock products`);

    // 4. Admin product list (all 140 products)
    const adminProdsRes = await fetch(`${BASE_URL}/admin/products`, {
      headers: { Cookie: adminCookie, Authorization: `Bearer ${adminToken}` }
    });
    assert(adminProdsRes.status === 200, 'Admin products list returns 200 OK');
    const adminProdsData = await adminProdsRes.json();
    assert(adminProdsData.products.length === 140, `Admin table has exactly 140 products (actual: ${adminProdsData.products.length})`);

  } catch (err) {
    assert(false, 'Admin security & analytics succeeded', err.message);
  }

  // --- Summary ---
  console.log('\n' + '='.repeat(70));
  console.log(`🎯 Test Verification Summary:`);
  console.log(`   Passed: ${testsPassed}`);
  console.log(`   Failed: ${testsFailed}`);
  console.log(`   Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`);
  console.log('='.repeat(70));

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
