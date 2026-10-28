import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('6. User Profile API Tests', () => {
  let customerToken;

  before(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'jane.eco@example.local', password: 'GreenLiving#2026!' });
    customerToken = res.body.token;
  });

  test('GET /api/user/profile - Should return profile with aggregated eco impact metrics', async () => {
    const res = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${customerToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.user.email, 'jane.eco@example.local');
    assert.ok(res.body.impact);
    assert.equal(typeof res.body.impact.totalEcoItemsPurchased, 'number');
    assert.equal(typeof res.body.impact.averageEcoScore, 'number');
    assert.ok(res.body.ordersSummary);
  });

  test('PUT /api/user/profile - Should update profile name', async () => {
    const res = await request(app)
      .put('/api/user/profile')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ name: 'Jane Eco Champion' });

    assert.equal(res.status, 200);
    assert.equal(res.body.user.name, 'Jane Eco Champion');
  });

  test('PUT /api/user/profile - Should reject password update if current password wrong', async () => {
    const res = await request(app)
      .put('/api/user/profile')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        currentPassword: 'WrongPassword999!',
        newPassword: 'BrandNewPassword#2026!'
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /current password does not match/i);
  });
});
