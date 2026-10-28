import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/database/db.js';

describe('4. Orders & Checkout API Tests', () => {
  let customer1Token;
  let customer2Token;
  let sampleProduct;

  before(async () => {
    // Authenticate Customer 1
    const res1 = await request(app)
      .post('/api/auth/login')
      .send({ email: 'jane.eco@example.local', password: 'GreenLiving#2026!' });
    customer1Token = res1.body.token;

    // Authenticate Customer 2
    const res2 = await request(app)
      .post('/api/auth/login')
      .send({ email: 'marcus.green@example.local', password: 'EcoShopper#2026!' });
    customer2Token = res2.body.token;

    // Select product with known stock
    sampleProduct = db.prepare('SELECT id, name, price, stock FROM products WHERE stock >= 10 LIMIT 1;').get();
  });

  test('POST /api/orders/checkout - Should reject checkout when cart is empty', async () => {
    // Clear cart first
    await request(app).delete('/api/cart').set('Authorization', `Bearer ${customer1Token}`);

    const res = await request(app)
      .post('/api/orders/checkout')
      .set('Authorization', `Bearer ${customer1Token}`)
      .send({
        shipping_name: 'Jane Doe',
        shipping_address: '123 Tree Lane',
        shipping_city: 'Portland',
        shipping_postal_code: '97201',
        shipping_country: 'United States'
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /cart is empty/i);
  });

  test('POST /api/orders/checkout - Should reject missing shipping address', async () => {
    // Add product to cart
    await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${customer1Token}`)
      .send({ productId: sampleProduct.id, quantity: 1 });

    const res = await request(app)
      .post('/api/orders/checkout')
      .set('Authorization', `Bearer ${customer1Token}`)
      .send({
        shipping_name: 'Jane Doe',
        shipping_address: '', // missing
        shipping_city: 'Portland',
        shipping_postal_code: '97201',
        shipping_country: 'United States'
      });

    assert.equal(res.status, 400);
    assert.match(res.body.message, /address is required/i);
  });

  test('POST /api/orders/checkout - Should calculate totals on server and deduct stock atomically', async () => {
    // Initial product stock
    const initialProduct = db.prepare('SELECT stock, price FROM products WHERE id = ?').get(sampleProduct.id);
    const purchaseQty = 2;

    // Clear and populate cart
    await request(app).delete('/api/cart').set('Authorization', `Bearer ${customer1Token}`);
    await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${customer1Token}`)
      .send({ productId: sampleProduct.id, quantity: purchaseQty });

    // Submit Checkout with intentionally spoofed/absent frontend price
    const res = await request(app)
      .post('/api/orders/checkout')
      .set('Authorization', `Bearer ${customer1Token}`)
      .send({
        shipping_name: 'Jane Doe',
        shipping_address: '404 Evergreen Blvd',
        shipping_city: 'Portland',
        shipping_postal_code: '97201',
        shipping_country: 'United States',
        payment_method: 'simulated_card'
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.order.order_number.startsWith('ORD-'));

    // Verify calculated total strictly matches database price * quantity
    const expectedTotal = Math.round(initialProduct.price * purchaseQty * 100) / 100;
    assert.equal(res.body.order.total_amount, expectedTotal);
    assert.equal(res.body.order.payment_status, 'paid');
    assert.equal(res.body.order.status, 'processing');

    // Verify atomic stock deduction in database
    const updatedProduct = db.prepare('SELECT stock FROM products WHERE id = ?').get(sampleProduct.id);
    assert.equal(updatedProduct.stock, initialProduct.stock - purchaseQty);

    // Verify cart was cleared after successful order
    const cartCheck = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${customer1Token}`);
    assert.equal(cartCheck.body.cart.items.length, 0);
  });

  test('GET /api/orders - Should list customer order history', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${customer1Token}`);

    assert.equal(res.status, 200);
    assert.equal(Array.isArray(res.body.orders), true);
    assert.ok(res.body.orders.length >= 1);
  });

  test('GET /api/orders/:id - Should allow customer to view own order details', async () => {
    const listRes = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${customer1Token}`);

    const orderId = listRes.body.orders[0].id;

    const res = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${customer1Token}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.order.id, orderId);
    assert.ok(Array.isArray(res.body.order.items));
    assert.ok(res.body.order.items.length >= 1);
  });

  test('GET /api/orders/:id - Should prevent Customer 2 from accessing Customer 1 order (403)', async () => {
    // Get Customer 1's order
    const listRes = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${customer1Token}`);

    const customer1OrderId = listRes.body.orders[0].id;

    // Attempt access as Customer 2
    const res = await request(app)
      .get(`/api/orders/${customer1OrderId}`)
      .set('Authorization', `Bearer ${customer2Token}`);

    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /access denied/i);
  });
});
