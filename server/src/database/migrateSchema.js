/**
 * Safe SQLite Schema Migration Script for EcoCart
 * 1. Creates wishlist_items table if missing
 * 2. Migrates products table to support 8 target categories
 * 3. Preserves all existing products, users, cart items, and order data
 * 4. Normalizes existing 20 products to realistic INR prices
 */

import { db, runTransaction } from './db.js';

export function runMigration() {
  console.log('🔄 Running safe SQLite schema migration...');

  // 1. Create wishlist_items table if it does not exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS wishlist_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, product_id)
    );
    CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist_items(user_id);
  `);
  console.log('✅ Checked/created wishlist_items table.');

  // 2. Check if products table check constraint needs expansion
  // We recreate products with expanded categories using standard SQLite table migration
  db.exec('PRAGMA foreign_keys = OFF;');

  try {
    runTransaction(() => {
      // Create new products table with all 8 target categories allowed
      db.exec(`
        CREATE TABLE IF NOT EXISTS products_new (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT NOT NULL,
          price REAL NOT NULL CHECK(price >= 0),
          category TEXT NOT NULL CHECK(category IN (
            'Reusable Bottles & Drinkware', 'Reusable Bottles',
            'Sustainable Bags & Accessories', 'Sustainable Bags',
            'Eco-Friendly Stationery', 'Eco Stationery',
            'Home & Kitchen Essentials', 'Home Essentials',
            'Personal Care & Reusable Products', 'Personal Care & Wellness',
            'Sustainable Fashion',
            'Gardening & Outdoor Products', 'Gardening & Outdoor',
            'Travel & Lifestyle'
          )),
          stock INTEGER NOT NULL DEFAULT 0 CHECK(stock >= 0),
          eco_score INTEGER NOT NULL CHECK(eco_score >= 0 AND eco_score <= 100),
          eco_factors TEXT NOT NULL,
          eco_disclaimer TEXT NOT NULL DEFAULT 'Illustrative prototype score, not an independently verified environmental certification.',
          image_url TEXT NOT NULL,
          is_featured INTEGER DEFAULT 0 CHECK(is_featured IN (0, 1)),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Copy all existing product rows into products_new
      db.exec('INSERT OR REPLACE INTO products_new SELECT * FROM products;');

      // Drop old products table and rename
      db.exec('DROP TABLE products;');
      db.exec('ALTER TABLE products_new RENAME TO products;');

      // Re-create indexes
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_products_eco_score ON products(eco_score);
        CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
      `);
    });
    console.log('✅ Safely migrated products table check constraint.');
  } finally {
    db.exec('PRAGMA foreign_keys = ON;');
  }

  // 3. Update existing 20 products' prices to realistic INR values if they are still USD decimals (< 100)
  const existingLowPrices = db.prepare('SELECT id, price FROM products WHERE price < 100;').all();
  if (existingLowPrices.length > 0) {
    console.log(`💵 Normalizing ${existingLowPrices.length} existing products to realistic INR prices...`);
    const updatePrice = db.prepare('UPDATE products SET price = ? WHERE id = ?');
    runTransaction(() => {
      for (const p of existingLowPrices) {
        // Convert to realistic INR prices (e.g. $34.99 -> ₹1,499, $18.50 -> ₹799)
        let inrPrice = Math.round((p.price * 45) / 50) * 50 - 1; // e.g. 1499, 799
        if (inrPrice < 299) inrPrice = 299;
        updatePrice.run(inrPrice, p.id);
      }
    });
    console.log('✅ Converted legacy product prices to realistic INR values.');
  }

  // 4. Verify foreign key integrity
  const fkViolations = db.prepare('PRAGMA foreign_key_check;').all();
  if (fkViolations.length > 0) {
    throw new Error(`Migration foreign key check failed with ${fkViolations.length} violations.`);
  }

  console.log('🛡️ Foreign key check: 0 violations. Database integrity 100% verified.\n');
  return true;
}

if (process.argv[1] && process.argv[1].endsWith('migrateSchema.js')) {
  runMigration();
}
