import { db } from '../database/db.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export const adminController = {
  /**
   * Executive Analytics Dashboard
   * GET /api/admin/analytics
   */
  getAnalytics(req, res, next) {
    try {
      // 1. Revenue & Order KPIs
      const orderMetrics = db.prepare(`
        SELECT
          COUNT(*) as total_orders,
          COALESCE(SUM(total_amount), 0) as total_revenue,
          COALESCE(AVG(total_amount), 0) as avg_order_value
        FROM orders;
      `).get();

      // 2. Customer Counts
      const customerCount = db.prepare(`SELECT COUNT(*) as total FROM users WHERE role = 'customer';`).get();

      // 3. Low-Stock Alerts (stock <= 20)
      const lowStockProducts = db.prepare(`
        SELECT id, name, slug, price, category, stock, eco_score, image_url
        FROM products
        WHERE stock <= 20
        ORDER BY stock ASC;
      `).all();

      // 4. Top Performing Eco Products
      const topProducts = db.prepare(`
        SELECT
          oi.product_id,
          oi.product_name,
          oi.eco_score,
          SUM(oi.quantity) as total_quantity_sold,
          ROUND(SUM(oi.subtotal), 2) as total_revenue_generated
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE o.status != 'cancelled'
        GROUP BY oi.product_id
        ORDER BY total_quantity_sold DESC
        LIMIT 5;
      `).all();

      // 5. Category Breakdown
      const categorySales = db.prepare(`
        SELECT
          p.category,
          COUNT(DISTINCT o.id) as order_count,
          SUM(oi.quantity) as items_sold,
          ROUND(SUM(oi.subtotal), 2) as total_revenue
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        JOIN products p ON oi.product_id = p.id
        WHERE o.status != 'cancelled'
        GROUP BY p.category
        ORDER BY total_revenue DESC;
      `).all();

      // 6. Recent Orders
      const recentOrders = db.prepare(`
        SELECT o.id, o.order_number, o.total_amount, o.status, o.created_at, u.name as customer_name, u.email as customer_email
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
        LIMIT 6;
      `).all();

      return res.json({
        success: true,
        analytics: {
          kpis: {
            totalSimulatedRevenue: Math.round(orderMetrics.total_revenue * 100) / 100,
            totalOrders: orderMetrics.total_orders,
            averageOrderValue: Math.round(orderMetrics.avg_order_value * 100) / 100,
            totalCustomers: customerCount.total,
            lowStockCount: lowStockProducts.length
          },
          lowStockProducts,
          topProducts,
          categorySales,
          recentOrders,
          businessInsights: {
            sustainabilityAdvantage: 'High EcoScore items (90+) represent the highest conversion rates and customer satisfaction.',
            inventoryRecommendation: lowStockProducts.length > 0
              ? `${lowStockProducts.length} items require inventory replenishment to prevent lost sales.`
              : 'All eco product lines currently have sufficient inventory.'
          }
        }
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all products for admin inventory table
   * GET /api/admin/products
   */
  getAdminProducts(req, res, next) {
    try {
      const products = db.prepare(`
        SELECT id, name, slug, price, category, stock, eco_score, image_url, is_featured, created_at, updated_at
        FROM products
        ORDER BY id DESC;
      `).all();

      return res.json({
        success: true,
        products
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Create a new eco-friendly product
   * POST /api/admin/products
   */
  createProduct(req, res, next) {
    try {
      const {
        name,
        description,
        price,
        category,
        stock = 0,
        eco_score = 80,
        eco_factors = {},
        eco_disclaimer,
        image_url,
        is_featured = 0
      } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ success: false, message: 'Product name is required (min 3 chars).' });
      }
      if (!description || typeof description !== 'string') {
        return res.status(400).json({ success: false, message: 'Product description is required.' });
      }
      const numPrice = parseFloat(price);
      if (isNaN(numPrice) || numPrice < 0) {
        return res.status(400).json({ success: false, message: 'Valid positive price is required.' });
      }
      const allowedCategories = [
        'Reusable Bottles & Drinkware', 'Reusable Bottles',
        'Sustainable Bags & Accessories', 'Sustainable Bags',
        'Eco-Friendly Stationery', 'Eco Stationery',
        'Home & Kitchen Essentials', 'Home Essentials',
        'Personal Care & Reusable Products', 'Personal Care & Wellness',
        'Sustainable Fashion',
        'Gardening & Outdoor Products', 'Gardening & Outdoor',
        'Travel & Lifestyle'
      ];
      if (!allowedCategories.includes(category)) {
        return res.status(400).json({
          success: false,
          message: `Category must be one of: ${allowedCategories.join(', ')}`
        });
      }
      const numScore = parseInt(eco_score, 10);
      if (isNaN(numScore) || numScore < 0 || numScore > 100) {
        return res.status(400).json({ success: false, message: 'EcoScore must be an integer between 0 and 100.' });
      }
      const numStock = parseInt(stock, 10);
      if (isNaN(numStock) || numStock < 0) {
        return res.status(400).json({ success: false, message: 'Stock must be 0 or greater.' });
      }

      // Generate unique slug
      let baseSlug = slugify(name);
      let candidateSlug = baseSlug;
      let counter = 1;
      while (db.prepare('SELECT id FROM products WHERE slug = ?').get(candidateSlug)) {
        candidateSlug = `${baseSlug}-${counter++}`;
      }

      const factorsJson = typeof eco_factors === 'string' ? eco_factors : JSON.stringify(eco_factors);
      const disclaimer = eco_disclaimer || 'Illustrative prototype score based on material composition, packaging, and lifecycle inputs. Not an independently certified environmental lifecycle verification.';
      const fallbackImage = image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';

      const insert = db.prepare(`
        INSERT INTO products (
          name, slug, description, price, category, stock,
          eco_score, eco_factors, eco_disclaimer, image_url, is_featured
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = insert.run(
        name.trim(),
        candidateSlug,
        description.trim(),
        numPrice,
        category,
        numStock,
        numScore,
        factorsJson,
        disclaimer,
        fallbackImage,
        is_featured ? 1 : 0
      );

      const created = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);

      return res.status(201).json({
        success: true,
        message: 'Product created successfully.',
        product: created
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update an existing product
   * PUT /api/admin/products/:id
   */
  updateProduct(req, res, next) {
    try {
      const productId = parseInt(req.params.id, 10);
      if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({ success: false, message: 'Valid product ID is required.' });
      }

      const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      const {
        name = existing.name,
        description = existing.description,
        price = existing.price,
        category = existing.category,
        stock = existing.stock,
        eco_score = existing.eco_score,
        eco_factors = existing.eco_factors,
        image_url = existing.image_url,
        is_featured = existing.is_featured
      } = req.body;

      const numPrice = parseFloat(price);
      if (isNaN(numPrice) || numPrice < 0) {
        return res.status(400).json({ success: false, message: 'Valid positive price is required.' });
      }
      const numStock = parseInt(stock, 10);
      if (isNaN(numStock) || numStock < 0) {
        return res.status(400).json({ success: false, message: 'Valid positive stock is required.' });
      }
      const numScore = parseInt(eco_score, 10);
      if (isNaN(numScore) || numScore < 0 || numScore > 100) {
        return res.status(400).json({ success: false, message: 'EcoScore must be 0 to 100.' });
      }

      const factorsJson = typeof eco_factors === 'string' ? eco_factors : JSON.stringify(eco_factors);

      db.prepare(`
        UPDATE products SET
          name = ?,
          description = ?,
          price = ?,
          category = ?,
          stock = ?,
          eco_score = ?,
          eco_factors = ?,
          image_url = ?,
          is_featured = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        name.trim(),
        description.trim(),
        numPrice,
        category,
        numStock,
        numScore,
        factorsJson,
        image_url,
        is_featured ? 1 : 0,
        productId
      );

      const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);

      return res.json({
        success: true,
        message: 'Product updated successfully.',
        product: updated
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete product (with foreign key conflict protection)
   * DELETE /api/admin/products/:id
   */
  deleteProduct(req, res, next) {
    try {
      const productId = parseInt(req.params.id, 10);
      if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({ success: false, message: 'Valid product ID is required.' });
      }

      const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      // Check if product is referenced in any historical order items
      const orderCount = db.prepare('SELECT COUNT(*) as count FROM order_items WHERE product_id = ?').get(productId);
      if (orderCount && orderCount.count > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete "${existing.name}" because it is referenced in ${orderCount.count} past customer orders. You may set its stock to 0 to archive it instead.`
        });
      }

      db.prepare('DELETE FROM products WHERE id = ?').run(productId);

      return res.json({
        success: true,
        message: `Product "${existing.name}" deleted successfully.`
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all orders across the platform for admin review
   * GET /api/admin/orders
   */
  getAdminOrders(req, res, next) {
    try {
      const { status } = req.query;
      let query = `
        SELECT o.*, u.name as customer_name, u.email as customer_email, COUNT(oi.id) as items_count
        FROM orders o
        JOIN users u ON o.user_id = u.id
        LEFT JOIN order_items oi ON o.id = oi.order_id
      `;
      const params = [];

      if (status && status !== 'all') {
        query += ' WHERE o.status = ?';
        params.push(status);
      }

      query += ' GROUP BY o.id ORDER BY o.created_at DESC;';

      const orders = db.prepare(query).all(...params);

      return res.json({
        success: true,
        orders
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update order status
   * PUT /api/admin/orders/:id/status
   */
  updateOrderStatus(req, res, next) {
    try {
      const orderId = parseInt(req.params.id, 10);
      const { status } = req.body;

      const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status must be one of: ${allowedStatuses.join(', ')}`
        });
      }

      const existing = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, orderId);

      const updated = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);

      return res.json({
        success: true,
        message: `Order status updated to "${status}".`,
        order: updated
      });
    } catch (error) {
      next(error);
    }
  }
};
