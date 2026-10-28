import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function initializeDatabase() {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Execute schema
  db.exec(schemaSql);

  // Verify foreign keys pragma
  const fkCheck = db.prepare('PRAGMA foreign_keys;').get();
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;").all();

  console.log('✅ SQLite Database successfully initialized.');
  console.log(`🔒 Foreign key enforcement: ${fkCheck.foreign_keys === 1 ? 'ENABLED (active)' : 'DISABLED'}`);
  console.log(`📋 Created tables (${tables.length}): ${tables.map(t => t.name).join(', ')}`);

  return { success: true, tables: tables.map(t => t.name), foreignKeys: fkCheck.foreign_keys === 1 };
}

// Allow direct execution: node src/database/init.js
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    initializeDatabase();
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    process.exit(1);
  }
}
