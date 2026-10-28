import { db } from '../database/db.js';
import { ecoScoreService } from '../services/ecoScoreService.js';

export function getUserCartSummary(userId) {
  const rows = db.prepare(`
    SELECT
      c.id as cart_item_id,
      c.quantity,
      p.id as product_id,
      p.name,
      p.slug,
      p.price,
      p.stock,
      p.eco_score,
      p.category,
      p.image_url
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
    ORDER BY c.created_at DESC;
  `).all(userId);

  let subtotal = 0;
  let totalItems = 0;
  const items = [];

  for (const row of rows) {
    const itemSubtotal = Math.round(row.price * row.quantity * 100) / 100;
    subtotal += itemSubtotal;
    totalItems += row.quantity;

    items.push({
      cart_item_id: row.cart_item_id,
      product_id: row.product_id,
      name: row.name,
      slug: row.slug,
      price: row.price,
      stock: row.stock,
      eco_score: row.eco_score,
      category: row.category,
      image_url: row.image_url,
      quantity: row.quantity,
      subtotal: itemSubtotal,
      hasSufficientStock: row.stock >= row.quantity
    });
  }

  subtotal = Math.round(subtotal * 100) / 100;
  const impact = ecoScoreService.calculateImpact(items);

  return {
    items,
    summary: {
      totalItems,
      subtotal,
      averageEcoScore: impact.averageEcoScore,
      impact: impact.illustrativeImpact
    }
  };
}

export const cartController = {
  /**
   * Get user's cart with computed subtotal and eco impact metrics
   * GET /api/cart
   */
  getCart(req, res, next) {
    try {
      const cart = getUserCartSummary(req.user.id);
      return res.json({
        success: true,
        cart
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Add item to cart or increment quantity
   * POST /api/cart
   */
  addToCart(req, res, next) {
    try {
      const { productId, quantity = 1 } = req.body;
      const parsedProductId = parseInt(productId, 10);
      const parsedQty = parseInt(quantity, 10);

      if (isNaN(parsedProductId) || parsedProductId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'A valid productId is required.'
        });
      }

      if (isNaN(parsedQty) || parsedQty <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be a positive integer.'
        });
      }

      // Check product existence and current stock
      const product = db.prepare('SELECT id, name, price, stock FROM products WHERE id = ?').get(parsedProductId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found.'
        });
      }

      if (product.stock <= 0) {
        return res.status(400).json({
          success: false,
          message: `"${product.name}" is currently out of stock.`
        });
      }

      // Check if item is already in cart
      const existing = db.prepare('SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?').get(req.user.id, parsedProductId);

      const targetQuantity = existing ? existing.quantity + parsedQty : parsedQty;

      if (targetQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Cannot add ${parsedQty} more. Requested quantity (${targetQuantity}) exceeds available stock (${product.stock}).`
        });
      }

      if (existing) {
        db.prepare('UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(targetQuantity, existing.id);
      } else {
        db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)').run(req.user.id, parsedProductId, targetQuantity);
      }

      const updatedCart = getUserCartSummary(req.user.id);
      return res.status(existing ? 200 : 201).json({
        success: true,
        message: `Added "${product.name}" to cart.`,
        cart: updatedCart
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update quantity of a cart item
   * PUT /api/cart/:id
   */
  updateCartItem(req, res, next) {
    try {
      const cartItemId = parseInt(req.params.id, 10);
      const { quantity } = req.body;
      const parsedQty = parseInt(quantity, 10);

      if (isNaN(cartItemId) || cartItemId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Valid cart item ID is required.'
        });
      }

      const item = db.prepare(`
        SELECT c.id, c.user_id, c.quantity, p.id as product_id, p.name, p.stock
        FROM cart_items c
        JOIN products p ON c.product_id = p.id
        WHERE c.id = ? AND c.user_id = ?
      `).get(cartItemId, req.user.id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found.'
        });
      }

      // If quantity is 0 or negative, remove from cart
      if (isNaN(parsedQty) || parsedQty <= 0) {
        db.prepare('DELETE FROM cart_items WHERE id = ?').run(cartItemId);
        const updatedCart = getUserCartSummary(req.user.id);
        return res.json({
          success: true,
          message: `Removed "${item.name}" from cart.`,
          cart: updatedCart
        });
      }

      // Check stock limit
      if (parsedQty > item.stock) {
        return res.status(400).json({
          success: false,
          message: `Requested quantity (${parsedQty}) exceeds available stock (${item.stock}).`
        });
      }

      db.prepare('UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(parsedQty, cartItemId);
      const updatedCart = getUserCartSummary(req.user.id);

      return res.json({
        success: true,
        message: 'Cart item quantity updated.',
        cart: updatedCart
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Remove item from cart
   * DELETE /api/cart/:id
   */
  removeCartItem(req, res, next) {
    try {
      const cartItemId = parseInt(req.params.id, 10);
      if (isNaN(cartItemId) || cartItemId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Valid cart item ID is required.'
        });
      }

      const result = db.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').run(cartItemId, req.user.id);

      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found.'
        });
      }

      const updatedCart = getUserCartSummary(req.user.id);
      return res.json({
        success: true,
        message: 'Item removed from cart.',
        cart: updatedCart
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Clear user's entire cart
   * DELETE /api/cart
   */
  clearCart(req, res, next) {
    try {
      db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);
      const updatedCart = getUserCartSummary(req.user.id);
      return res.json({
        success: true,
        message: 'Cart cleared successfully.',
        cart: updatedCart
      });
    } catch (error) {
      next(error);
    }
  }
};
