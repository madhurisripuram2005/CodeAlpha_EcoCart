import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('2. Products API Tests', () => {
  test('GET /api/products - Should list products with pagination', async () => {
    const res = await request(app).get('/api/products?page=1&limit=6');

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(Array.isArray(res.body.products), true);
    assert.equal(res.body.products.length, 6);
    assert.equal(res.body.pagination.page, 1);
    assert.equal(res.body.pagination.limit, 6);
    assert.ok(res.body.pagination.total >= 20);

    // Verify product structure
    const p = res.body.products[0];
    assert.ok(p.id);
    assert.ok(p.name);
    assert.ok(p.slug);
    assert.ok(p.price >= 0);
    assert.ok(p.eco_score >= 0 && p.eco_score <= 100);
    assert.equal(typeof p.eco_factors, 'object');
    assert.ok(p.eco_disclaimer);
  });

  test('GET /api/products?category=Reusable Bottles - Should filter by category', async () => {
    const res = await request(app).get('/api/products?category=Reusable%20Bottles');

    assert.equal(res.status, 200);
    assert.ok(res.body.products.length > 0);
    for (const p of res.body.products) {
      assert.equal(p.category, 'Reusable Bottles');
    }
  });

  test('GET /api/products?search=titanium - Should search by keyword in name/description', async () => {
    const res = await request(app).get('/api/products?search=titanium');

    assert.equal(res.status, 200);
    assert.ok(res.body.products.length >= 1);
    const found = res.body.products.some(p => p.name.toLowerCase().includes('titanium') || p.description.toLowerCase().includes('titanium'));
    assert.ok(found);
  });

  test('GET /api/products?sort=price_asc - Should sort products by price ascending', async () => {
    const res = await request(app).get('/api/products?sort=price_asc');

    assert.equal(res.status, 200);
    const products = res.body.products;
    for (let i = 1; i < products.length; i++) {
      assert.ok(products[i].price >= products[i - 1].price, 'Expected prices to be in ascending order');
    }
  });

  test('GET /api/products/:idOrSlug - Should return product details and sustainable alternatives', async () => {
    // Look up by slug
    const res = await request(app).get('/api/products/hydropure-insulated-bamboo-flask-750ml');

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.product.slug, 'hydropure-insulated-bamboo-flask-750ml');
    assert.ok(Array.isArray(res.body.product.alternatives));

    // Verify alternatives structure
    if (res.body.product.alternatives.length > 0) {
      const alt = res.body.product.alternatives[0];
      assert.ok(alt.name);
      assert.ok(alt.eco_score);
      assert.ok(alt.comparisonNote);
    }
  });

  test('GET /api/products/:idOrSlug - Should return 404 for non-existent product', async () => {
    const res = await request(app).get('/api/products/non-existent-product-slug-999');
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
  });

  test('GET /api/products/categories - Should return category counts and averages', async () => {
    const res = await request(app).get('/api/products/categories');

    assert.equal(res.status, 200);
    assert.equal(Array.isArray(res.body.categories), true);
    assert.ok(res.body.categories.length >= 4);

    const bottleCat = res.body.categories.find(c => c.category === 'Reusable Bottles');
    assert.ok(bottleCat);
    assert.ok(bottleCat.count >= 5);
    assert.ok(bottleCat.avg_eco_score > 0);
  });
});
