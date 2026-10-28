import bcrypt from 'bcryptjs';
import { db } from '../database/db.js';
import { ecoScoreService } from '../services/ecoScoreService.js';

export const userController = {
  /**
   * Get user profile and personal sustainability impact
   * GET /api/user/profile
   */
  getProfile(req, res, next) {
    try {
      const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      // Aggregate all items purchased across user's valid orders
      const purchasedItems = db.prepare(`
        SELECT oi.quantity, oi.eco_score, oi.product_name, p.category
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ? AND o.status != 'cancelled';
      `).all(req.user.id);

      const impact = ecoScoreService.calculateImpact(purchasedItems);

      const ordersSummary = db.prepare(`
        SELECT COUNT(*) as total_orders, COALESCE(SUM(total_amount), 0) as total_spent
        FROM orders
        WHERE user_id = ?;
      `).get(req.user.id);

      return res.json({
        success: true,
        user,
        impact,
        ordersSummary: {
          totalOrders: ordersSummary.total_orders,
          totalSpent: Math.round(ordersSummary.total_spent * 100) / 100
        }
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update profile information (name or password)
   * PUT /api/user/profile
   */
  updateProfile(req, res, next) {
    try {
      const { name, currentPassword, newPassword } = req.body;

      if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length < 2) {
          return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' });
        }
        db.prepare('UPDATE users SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(name.trim(), req.user.id);
      }

      // Handle password change if requested
      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ success: false, message: 'Current password is required to set a new password.' });
        }
        if (typeof newPassword !== 'string' || newPassword.length < 6) {
          return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
        }

        const userRow = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
        const match = bcrypt.compareSync(currentPassword, userRow.password_hash);
        if (!match) {
          return res.status(400).json({ success: false, message: 'Current password does not match.' });
        }

        const newHash = bcrypt.hashSync(newPassword, 10);
        db.prepare('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(newHash, req.user.id);
      }

      const updatedUser = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.id);

      return res.json({
        success: true,
        message: 'Profile updated successfully.',
        user: updatedUser
      });
    } catch (error) {
      next(error);
    }
  }
};
