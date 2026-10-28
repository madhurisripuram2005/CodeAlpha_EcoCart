import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function inspectDatabase() {
  console.log('========================================================');
  console.log('🔍 EcoCart SQLite Database Inspection');
  console.log('========================================================');

  // 1. Pragmas & Integrity
  const fkStatus = db.prepare('PRAGMA foreign_keys;').get();
  const integrity = db.prepare('PRAGMA quick_check;').get();
  const fkViolations = db.prepare('PRAGMA foreign_key_check;').all();

  console.log(`🔒 Foreign Keys: ${fkStatus.foreign_keys === 1 ? 'ENABLED (1)' : 'DISABLED (0)'}`);
  console.log(`🛡️ Integrity Check: ${integrity.quick_check}`);
  console.log(`⚠️ Foreign Key Violations: ${fkViolations.length}`);

  // 2. Table Counts
  const tables = ['users', 'products', 'cart_items', 'orders', 'order_items'];
  console.log('\n📊 Table Records:');
  for (const table of tables) {
    try {
      const count = db.prepare(`SELECT COUNT(*) as count FROM ${table};`).get();
      console.log(`  - ${table.padEnd(14)} : ${count.count} rows`);
    } catch (err) {
      console.log(`  - ${table.padEnd(14)} : Error (${err.message})`);
    }
  }

  // 3. Category Breakdown
  console.log('\n🌿 Products by Category:');
  const catBreakdown = db.prepare(`
    SELECT category, COUNT(*) as count, ROUND(AVG(price), 2) as avg_price, ROUND(AVG(eco_score), 1) as avg_score
    FROM products
    GROUP BY category
    ORDER BY count DESC;
  `).all();

  for (const cat of catBreakdown) {
    console.log(`  - ${cat.category.padEnd(20)}: ${cat.count} items | Avg Price: $${cat.avg_price} | Avg EcoScore: ${cat.avg_score}/100`);
  }

  // 4. Sample Users
  console.log('\n👥 Demo Accounts:');
  const demoUsers = db.prepare('SELECT id, name, email, role, created_at FROM users ORDER BY id ASC;').all();
  for (const u of demoUsers) {
    console.log(`  - [${u.role.toUpperCase()}] ${u.name} <${u.email}> (ID: ${u.id})`);
  }

  // 5. Orders Summary
  console.log('\n📦 Orders & Simulated Revenue:');
  const orderSummary = db.prepare(`
    SELECT COUNT(*) as total_orders, ROUND(SUM(total_amount), 2) as total_rev
    FROM orders;
  `).all();
  console.log(`  - Total Orders: ${orderSummary[0].total_orders} | Total Simulated Revenue: $${orderSummary[0].total_rev}`);

  console.log('========================================================\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  inspectDatabase();
}
