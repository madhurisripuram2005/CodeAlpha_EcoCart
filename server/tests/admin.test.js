import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/database/db.js';

describe('5. Admin & Authorization API Tests', () => {
  let adminToken;
  let customerToken;

  before(async () => {
    // Authenticate Admin
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@ecocart.local', password: 'EcoAdmin#2026!' });
    adminToken = adminRes.body.token;

    // Authenticate Regular Customer
    const customerRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'jane.eco@example.local', password: 'GreenLiving#2026!' });
    customerToken = customerRes.body.token;
  });

  test('Security: Ordinary customer cannot access GET /api/admin/analytics (403 Forbidden)', async () => {
    const res = await request(app)
      .get('/api/admin/analytics')
      .set('Authorization', `Bearer ${customerToken}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /access denied/i);
  });

  test('Security: Unauthenticated request to /api/admin/analytics returns 401', async () => {
    const res = await request(app).get('/api/admin/analytics');
    assert.equal(res.status, 401);
  });

  test('GET /api/admin/analytics - Admin can view business metrics and low-stock alerts', async () => {
    const res = await request(app)
      .get('/api/admin/analytics')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.analytics);
    assert.ok(res.body.analytics.kpis.totalSimulatedRevenue >= 0);
    assert.ok(res.body.analytics.kpis.totalOrders >= 0);
    assert.equal(typeof res.body.analytics.kpis.lowStockCount, 'number');
    assert.equal(Array.isArray(res.body.analytics.lowStockProducts), true);
    assert.equal(Array.isArray(res.body.analytics.topProducts), true);
    assert.equal(Array.isArray(res.body.analytics.categorySales), true);
  });

  test('POST /api/admin/products - Admin can create a new eco product', async () => {
    const newProduct = {
      name: 'EcoClean Organic Wool Dryer Balls (Set of 6)',
      description: '100% New Zealand certified organic wool balls that naturally soften laundry and cut drying time by 25%. Eliminates chemical liquid fabric softeners.',
      price: 18.99,
      category: 'Home Essentials',
      stock: 50,
      eco_score: 95,
      eco_factors: {
        biodegradable: true,
        natural_fibers: '100% Pure Organic Wool',
        lifespan: 'Over 1,000 loads'
      },
      image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
      is_featured: 1
    };

    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newProduct);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.product.name, newProduct.name);
    assert.ok(res.body.product.slug.includes('ecoclean-organic-wool-dryer-balls'));
    assert.equal(res.body.product.eco_score, 95);
  });

  test('PUT /api/admin/products/:id - Admin can update product details and stock', async () => {
    const product = db.prepare('SELECT id FROM products ORDER BY id DESC LIMIT 1;').get();

    const res = await request(app)
      .put(`/api/admin/products/${product.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        price: 19.50,
        stock: 65
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.product.price, 19.50);
    assert.equal(res.body.product.stock, 65);
  });

  test('DELETE /api/admin/products/:id - Foreign key protection rejects deleting ordered product', async () => {
    // Find a product that has been ordered in order_items
    const ordered = db.prepare('SELECT product_id FROM order_items LIMIT 1;').get();
    assert.ok(ordered, 'Expected at least one ordered product in seed data');

    const res = await request(app)
      .delete(`/api/admin/products/${ordered.product_id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /referenced in.*past customer orders/i);
  });

  test('GET /api/admin/orders - Admin can view all customer orders', async () => {
    const res = await request(app)
      .get('/api/admin/orders')
      .set('Authorization', `Bearer ${adminToken}`);

    assert.equal(res.status, 200);
    assert.equal(Array.isArray(res.body.orders), true);
    assert.ok(res.body.orders.length >= 2);
    assert.ok(res.body.orders[0].customer_email);
  });

  test('PUT /api/admin/orders/:id/status - Admin can update order status', async () => {
    const order = db.prepare('SELECT id, status FROM orders LIMIT 1;').get();

    const res = await request(app)
      .put(`/api/admin/orders/${order.id}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'shipped' });

    assert.equal(res.status, 200);
    assert.equal(res.body.order.status, 'shipped');

    // Verify DB update
    const dbOrder = db.prepare('SELECT status FROM orders WHERE id = ?').get(order.id);
    assert.equal(dbOrder.status, 'shipped');
  });
});
