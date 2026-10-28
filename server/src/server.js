import app from './app.js';
import { initializeDatabase } from './database/init.js';
import { db } from './database/db.js';

const PORT = process.env.PORT || 5000;

// Ensure database schema is initialized before accepting traffic
try {
  initializeDatabase();
} catch (error) {
  console.error('Fatal: Failed to initialize SQLite schema on startup:', error);
  process.exit(1);
}

const server = app.listen(PORT, () => {
  console.log(`🚀 EcoCart API server running at http://localhost:${PORT}`);
  console.log(`🌿 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful Shutdown
function handleShutdown(signal) {
  console.log(`\nReceived ${signal}. Gracefully closing HTTP server and SQLite connection...`);
  server.close(() => {
    try {
      db.close();
      console.log('🔒 SQLite database connection closed.');
    } catch (e) {
      // Ignored if already closed
    }
    process.exit(0);
  });
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

export default server;
