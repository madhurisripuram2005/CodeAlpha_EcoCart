import { db } from '../database/db.js';

export const wishlistController = {
  /**
   * Get authenticated user's wishlist
   * GET /api/wishlist
   */
  getWishlist(req, res, next) {
    try {
      const rows = db.prepare(`
        SELECT w.id as wishlist_id, w.created_at as saved_at,
               p.id, p.name, p.slug, p.description, p.price, p.category, p.stock,
               p.eco_score, p.image_url, p.is_featured
        FROM wishlist_items w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = ?
        ORDER BY w.created_at DESC;
      `).all(req.user.id);

      return res.json({
        success: true,
        items: rows,
        count: rows.length
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Add product to wishlist
   * POST /api/wishlist
   */
  addToWishlist(req, res, next) {
    try {
      const { productId } = req.body;
      const numId = parseInt(productId, 10);

      if (isNaN(numId) || numId <= 0) {
        return res.status(400).json({ success: false, message: 'Valid product ID is required.' });
      }

      const product = db.prepare('SELECT id, name FROM products WHERE id = ?').get(numId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      // Insert or ignore if already present
      const insert = db.prepare(`
        INSERT OR IGNORE INTO wishlist_items (user_id, product_id)
        VALUES (?, ?)
      `);
      insert.run(req.user.id, numId);

      return res.status(201).json({
        success: true,
        message: `Added "${product.name}" to your wishlist.`,
        productId: numId
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Remove product from wishlist
   * DELETE /api/wishlist/:productId
   */
  removeFromWishlist(req, res, next) {
    try {
      const productId = parseInt(req.params.productId, 10);

      if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({ success: false, message: 'Valid product ID is required.' });
      }

      db.prepare('DELETE FROM wishlist_items WHERE user_id = ? AND product_id = ?').run(req.user.id, productId);

      return res.json({
        success: true,
        message: 'Item removed from wishlist.',
        productId
      });
    } catch (error) {
      next(error);
    }
  }
};
