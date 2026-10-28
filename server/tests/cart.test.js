import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/database/db.js';

describe('3. Cart API Tests', () => {
  let customerToken;
  let sampleProduct;

  before(async () => {
    // Authenticate demo customer
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'jane.eco@example.local', password: 'GreenLiving#2026!' });
    customerToken = loginRes.body.token;

    // Get an in-stock product
    sampleProduct = db.prepare('SELECT id, name, price, stock FROM products WHERE stock > 5 LIMIT 1;').get();
  });

  test('GET /api/cart - Should reject unauthenticated user with 401', async () => {
    const res = await request(app).get('/api/cart');
    assert.equal(res.status, 401);
  });

  test('GET /api/cart - Should return authenticated customer cart with totals and impact', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${customerToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.cart);
    assert.equal(Array.isArray(res.body.cart.items), true);
    assert.equal(typeof res.body.cart.summary.subtotal, 'number');
    assert.equal(typeof res.body.cart.summary.totalItems, 'number');
    assert.ok(res.body.cart.summary.averageEcoScore >= 0);
  });

  test('POST /api/cart - Should add product to cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        productId: sampleProduct.id,
        quantity: 2
      });

    assert.ok([200, 201].includes(res.status));
    assert.equal(res.body.success, true);
    const inCart = res.body.cart.items.find(i => i.product_id === sampleProduct.id);
    assert.ok(inCart);
    assert.ok(inCart.quantity >= 2);
  });

  test('POST /api/cart - Should reject adding quantity exceeding stock with 400', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        productId: sampleProduct.id,
        quantity: sampleProduct.stock + 9999
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /exceeds available stock/i);
  });

  test('PUT /api/cart/:id - Should update cart item quantity', async () => {
    // Get existing item
    const cartRes = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${customerToken}`);

    const targetItem = cartRes.body.cart.items[0];
    assert.ok(targetItem, 'Expected at least one cart item');

    const updateRes = await request(app)
      .put(`/api/cart/${targetItem.cart_item_id}`)
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ quantity: 3 });

    assert.equal(updateRes.status, 200);
    const updated = updateRes.body.cart.items.find(i => i.cart_item_id === targetItem.cart_item_id);
    assert.equal(updated.quantity, 3);
  });

  test('DELETE /api/cart/:id - Should remove single item from cart', async () => {
    const cartRes = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${customerToken}`);

    const targetItem = cartRes.body.cart.items[0];

    const delRes = await request(app)
      .delete(`/api/cart/${targetItem.cart_item_id}`)
      .set('Authorization', `Bearer ${customerToken}`);

    assert.equal(delRes.status, 200);
    const remaining = delRes.body.cart.items.find(i => i.cart_item_id === targetItem.cart_item_id);
    assert.equal(remaining, undefined);
  });

  test('DELETE /api/cart - Should clear all cart items', async () => {
    const clearRes = await request(app)
      .delete('/api/cart')
      .set('Authorization', `Bearer ${customerToken}`);

    assert.equal(clearRes.status, 200);
    assert.equal(clearRes.body.cart.items.length, 0);
    assert.equal(clearRes.body.cart.summary.totalItems, 0);
    assert.equal(clearRes.body.cart.summary.subtotal, 0);
  });
});
