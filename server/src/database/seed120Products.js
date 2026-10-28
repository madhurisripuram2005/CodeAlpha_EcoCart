/**
 * Idempotent 120-Product Seeder for EcoCart
 * Safely inserts 120 new fictional eco-friendly products into SQLite without
 * deleting, resetting, or duplicating existing products, users, carts, or orders.
 */

import { db, runTransaction } from './db.js';
import { runMigration } from './migrateSchema.js';
import { newProducts120 } from './productsData120.js';

export function seed120Products() {
  console.log('================================================================');
  console.log('🌱 EcoCart: Seeding 120 Additional Sustainable Products');
  console.log('================================================================\n');

  // Step 1: Ensure schema is migrated safely
  runMigration();

  // Step 2: Check current products count
  const initialCount = db.prepare('SELECT COUNT(*) as count FROM products;').get().count;
  console.log(`📦 Existing products in database before seeding: ${initialCount}`);

  // Fetch existing slugs to guarantee idempotency and zero duplicates
  const existingSlugs = new Set(
    db.prepare('SELECT slug FROM products;').all().map(row => row.slug)
  );

  let insertedCount = 0;
  let skippedCount = 0;
  const categoryAddedCount = {};

  const insertStmt = db.prepare(`
    INSERT INTO products (
      name, slug, description, price, category, stock,
      eco_score, eco_factors, eco_disclaimer, image_url, is_featured
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `);

  runTransaction(() => {
    for (const product of newProducts120) {
      if (existingSlugs.has(product.slug)) {
        skippedCount++;
        continue;
      }

      const factorsJson = typeof product.eco_factors === 'string'
        ? product.eco_factors
        : JSON.stringify(product.eco_factors || {});

      insertStmt.run(
        product.name.trim(),
        product.slug.trim(),
        product.description.trim(),
        product.price,
        product.category.trim(),
        product.stock,
        product.eco_score,
        factorsJson,
        product.eco_disclaimer || 'Illustrative prototype score, not an independently verified environmental certification.',
        product.image_url,
        product.is_featured ? 1 : 0
      );

      existingSlugs.add(product.slug);
      insertedCount++;
      categoryAddedCount[product.category] = (categoryAddedCount[product.category] || 0) + 1;
    }
  });

  const finalCount = db.prepare('SELECT COUNT(*) as count FROM products;').get().count;

  console.log('\n📊 Seeding Execution Summary:');
  console.log(`  - Products newly inserted : ${insertedCount}`);
  console.log(`  - Products skipped (exists): ${skippedCount}`);
  console.log(`  - Total products now in DB : ${finalCount}`);

  console.log('\n🌿 Newly Added Distribution:');
  for (const [cat, count] of Object.entries(categoryAddedCount)) {
    console.log(`  - ${cat.padEnd(35)}: +${count} items`);
  }

  // Verify foreign key integrity
  const fkViolations = db.prepare('PRAGMA foreign_key_check;').all();
  if (fkViolations.length > 0) {
    throw new Error(`Integrity check failed: ${fkViolations.length} foreign key violations found!`);
  }
  console.log('\n🔒 Foreign Key Check: 0 violations (PASSED)');

  // Verify overall category breakdown in database
  const fullBreakdown = db.prepare(`
    SELECT category, COUNT(*) as count, ROUND(AVG(price), 0) as avg_price, ROUND(AVG(eco_score), 1) as avg_score
    FROM products
    GROUP BY category
    ORDER BY count DESC;
  `).all();

  console.log('\n🏆 Complete 140-Product Catalogue by Category:');
  for (const cat of fullBreakdown) {
    console.log(`  • ${cat.category.padEnd(35)}: ${cat.count} items (Avg ₹${cat.avg_price}, EcoScore: ${cat.avg_score}/100)`);
  }

  console.log('\n================================================================');
  console.log(`✅ Seeding Complete: ${finalCount} Total Sustainable Products in EcoCart`);
  console.log('================================================================\n');

  return {
    initialCount,
    insertedCount,
    skippedCount,
    finalCount,
    success: true
  };
}

if (process.argv[1] && process.argv[1].endsWith('seed120Products.js')) {
  try {
    seed120Products();
  } catch (err) {
    console.error('❌ Failed to seed products:', err);
    process.exit(1);
  }
}
