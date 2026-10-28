import { db, runTransaction } from '../database/db.js';

export const orderController = {
  /**
   * Checkout and place simulated order with atomic stock validation
   * POST /api/orders/checkout
   */
  checkout(req, res, next) {
    try {
      const {
        shipping_name,
        shipping_address,
        shipping_city,
        shipping_postal_code,
        shipping_country,
        payment_method = 'simulated_card'
      } = req.body;

      // Validate Shipping Details
      if (!shipping_name || !shipping_name.trim()) {
        return res.status(400).json({ success: false, message: 'Recipient name is required.' });
      }
      if (!shipping_address || !shipping_address.trim()) {
        return res.status(400).json({ success: false, message: 'Shipping address is required.' });
      }
      if (!shipping_city || !shipping_city.trim()) {
        return res.status(400).json({ success: false, message: 'Shipping city is required.' });
      }
      if (!shipping_postal_code || !shipping_postal_code.trim()) {
        return res.status(400).json({ success: false, message: 'Postal code is required.' });
      }
      if (!shipping_country || !shipping_country.trim()) {
        return res.status(400).json({ success: false, message: 'Country is required.' });
      }

      // Fetch user's cart from database
      const cartRows = db.prepare(`
        SELECT c.id as cart_id, c.quantity, p.id as product_id, p.name, p.price, p.stock, p.eco_score
        FROM cart_items c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
      `).all(req.user.id);

      if (!cartRows || cartRows.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Your cart is empty. Add products before checking out.'
        });
      }

      // Check stock availability before initiating transaction
      for (const item of cartRows) {
        if (item.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for "${item.name}". Only ${item.stock} available (requested: ${item.quantity}).`
          });
        }
      }

      // Calculate server-side total
      let calculatedTotal = 0;
      const orderItemsData = cartRows.map(item => {
        const itemSubtotal = Math.round(item.price * item.quantity * 100) / 100;
        calculatedTotal += itemSubtotal;
        return {
          productId: item.product_id,
          name: item.name,
          unitPrice: item.price,
          quantity: item.quantity,
          subtotal: itemSubtotal,
          ecoScore: item.eco_score
        };
      });

      calculatedTotal = Math.round(calculatedTotal * 100) / 100;

      // Unique Order Number
      const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      // Execute order creation and stock deduction within an atomic transaction
      let createdOrderId;
      runTransaction(() => {
        // 1. Re-verify and deduct stock
        const updateStock = db.prepare('UPDATE products SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND stock >= ?');
        for (const item of orderItemsData) {
          const result = updateStock.run(item.quantity, item.productId, item.quantity);
          if (result.changes === 0) {
            throw new Error(`Insufficient stock for "${item.name}" during checkout transaction.`);
          }
        }

        // 2. Insert Order
        const insertOrder = db.prepare(`
          INSERT INTO orders (
            order_number, user_id, total_amount, status,
            shipping_name, shipping_address, shipping_city, shipping_postal_code, shipping_country,
            payment_method, payment_status
          ) VALUES (?, ?, ?, 'processing', ?, ?, ?, ?, ?, ?, 'paid')
        `);

        const orderResult = insertOrder.run(
          orderNumber,
          req.user.id,
          calculatedTotal,
          shipping_name.trim(),
          shipping_address.trim(),
          shipping_city.trim(),
          shipping_postal_code.trim(),
          shipping_country.trim(),
          payment_method
        );

        createdOrderId = orderResult.lastInsertRowid;

        // 3. Insert Order Items
        const insertItem = db.prepare(`
          INSERT INTO order_items (
            order_id, product_id, product_name, unit_price, quantity, subtotal, eco_score
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        for (const item of orderItemsData) {
          insertItem.run(
            createdOrderId,
            item.productId,
            item.name,
            item.unitPrice,
            item.quantity,
            item.subtotal,
            item.ecoScore
          );
        }

        // 4. Clear user's cart
        db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(req.user.id);
      });

      const finalOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(createdOrderId);
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(createdOrderId);

      return res.status(201).json({
        success: true,
        message: 'Order placed successfully! (Simulated payment approved)',
        order: {
          ...finalOrder,
          items
        }
      });
    } catch (error) {
      if (error.message && error.message.includes('Insufficient stock')) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      next(error);
    }
  },

  /**
   * Get authenticated user's order history
   * GET /api/orders
   */
  getUserOrders(req, res, next) {
    try {
      const orders = db.prepare(`
        SELECT o.*, COUNT(oi.id) as items_count
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC;
      `).all(req.user.id);

      return res.json({
        success: true,
        orders
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get single order by ID with line items
   * GET /api/orders/:id
   */
  getOrderById(req, res, next) {
    try {
      const orderId = parseInt(req.params.id, 10);
      if (isNaN(orderId) || orderId <= 0) {
        return res.status(400).json({ success: false, message: 'Valid order ID required.' });
      }

      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      // Customer can only view their own order; Admin can view any order
      if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You cannot view another customer’s order.'
        });
      }

      const items = db.prepare(`
        SELECT oi.*, p.image_url, p.slug, p.category
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `).all(orderId);

      return res.json({
        success: true,
        order: {
          ...order,
          items
        }
      });
    } catch (error) {
      next(error);
    }
  }
};
