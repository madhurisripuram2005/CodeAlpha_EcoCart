import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/database/db.js';
import { seedDatabase } from '../src/database/seed.js';

describe('1. Authentication API Tests', () => {
  // Ensure fresh seed before tests
  test('Setup: Seed fresh test data', () => {
    seedDatabase();
    assert.ok(true);
  });

  test('POST /api/auth/register - Should register a new customer with hashed password', async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.local`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Sarah Connor',
        email: uniqueEmail,
        password: 'Password#2026!'
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.token);
    assert.equal(res.body.user.email, uniqueEmail);
    assert.equal(res.body.user.role, 'customer');
    assert.equal(res.body.user.password_hash, undefined, 'password_hash must NEVER be exposed');

    // Verify DB stored hash, not plain text
    const dbRow = db.prepare('SELECT password_hash FROM users WHERE email = ?').get(uniqueEmail);
    assert.ok(dbRow);
    assert.notEqual(dbRow.password_hash, 'Password#2026!');
    assert.ok(dbRow.password_hash.startsWith('$2'));
  });

  test('POST /api/auth/register - Should reject duplicate email with 409', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Duplicate Jane',
        email: 'jane.eco@example.local',
        password: 'Password#2026!'
      });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /already exists/i);
  });

  test('POST /api/auth/register - Should reject invalid inputs with 400', async () => {
    const shortPass = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bob', email: 'bob@example.com', password: '123' });
    assert.equal(shortPass.status, 400);

    const badEmail = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bob', email: 'not-an-email', password: 'ValidPassword123' });
    assert.equal(badEmail.status, 400);

    const emptyName = await request(app)
      .post('/api/auth/register')
      .send({ name: ' ', email: 'valid@example.com', password: 'ValidPassword123' });
    assert.equal(emptyName.status, 400);
  });

  test('POST /api/auth/login - Should authenticate valid customer', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jane.eco@example.local',
        password: 'GreenLiving#2026!'
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.token);
    assert.equal(res.body.user.email, 'jane.eco@example.local');
    assert.equal(res.body.user.role, 'customer');
    assert.equal(res.body.user.password_hash, undefined);

    // Verify Set-Cookie header exists
    const setCookie = res.headers['set-cookie'];
    assert.ok(setCookie);
    assert.ok(setCookie.some(c => c.includes('token=')));
  });

  test('POST /api/auth/login - Should reject invalid password with 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'jane.eco@example.local',
        password: 'WrongPassword999!'
      });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
    assert.match(res.body.message, /invalid email or password/i);
  });

  test('GET /api/auth/me - Should return current user when authenticated', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'jane.eco@example.local', password: 'GreenLiving#2026!' });

    const token = loginRes.body.token;

    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    assert.equal(meRes.status, 200);
    assert.equal(meRes.body.user.email, 'jane.eco@example.local');
    assert.equal(meRes.body.user.role, 'customer');
  });

  test('GET /api/auth/me - Should reject unauthenticated requests with 401', async () => {
    const res = await request(app).get('/api/auth/me');
    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  test('POST /api/auth/logout - Should clear token cookie', async () => {
    const res = await request(app).post('/api/auth/logout');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });
});
