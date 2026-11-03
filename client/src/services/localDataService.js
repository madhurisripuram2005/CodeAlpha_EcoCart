/**
 * EcoCart Local Data & Offline Fallback Service
 * Provides complete in-memory & localStorage fallback for products, search,
 * filtering, pagination, sustainable alternatives, cart, and simulated checkout.
 * Used automatically when the backend API server is offline or on static hosting (e.g. Netlify).
 */

import { fallbackProducts } from '../data/productsData.js';

const CART_STORAGE_KEY = 'ecocart_local_cart';
const ORDERS_STORAGE_KEY = 'ecocart_local_orders';
const WISHLIST_STORAGE_KEY = 'ecocart_wishlist_items';

// Helpers
function getStored(key, defaultValue) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // quota exceeded or private mode
  }
}

export const localDataService = {
  /**
   * Get products with search, category filtering, price filtering, EcoScore filtering, sorting, and pagination
   */
  getProducts(params = {}) {
    const {
      search = '',
      category = '',
      sort = 'featured',
      min_price,
      max_price,
      min_eco_score,
      page = 1,
      limit = 12
    } = params;

    let list = [...fallbackProducts];

    // 1. Search Filter
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (category && category !== 'All' && category.trim()) {
      const catTrim = category.trim().toLowerCase();
      list = list.filter(p => {
        if (!p.category) return false;
        const pCat = p.category.toLowerCase();
        return pCat === catTrim || pCat.startsWith(catTrim) || catTrim.startsWith(pCat);
      });
    }

    // 3. Price Filter
    if (min_price !== undefined && min_price !== '') {
      const min = parseFloat(min_price);
      if (!isNaN(min)) {
        list = list.filter(p => p.price >= min);
      }
    }
    if (max_price !== undefined && max_price !== '') {
      const max = parseFloat(max_price);
      if (!isNaN(max)) {
        list = list.filter(p => p.price <= max);
      }
    }

    // 4. EcoScore Filter
    if (min_eco_score !== undefined && min_eco_score !== '') {
      const minScore = parseInt(min_eco_score, 10);
      if (!isNaN(minScore)) {
        list = list.filter(p => (p.eco_score || 0) >= minScore);
      }
    }

    // 5. Sorting
    switch (sort) {
      case 'price_asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'eco_desc':
        list.sort((a, b) => (b.eco_score || 0) - (a.eco_score || 0));
        break;
      case 'newest':
        list.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case 'name_asc':
        list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'featured':
      default:
        list.sort((a, b) => {
          if (b.is_featured !== a.is_featured) return (b.is_featured || 0) - (a.is_featured || 0);
          return (b.eco_score || 0) - (a.eco_score || 0);
        });
        break;
    }

    // 6. Pagination
    const total = list.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 12);
    const totalPages = Math.ceil(total / limitNum) || 1;
    const offset = (pageNum - 1) * limitNum;
    const paginatedProducts = list.slice(offset, offset + limitNum);

    return {
      success: true,
      products: paginatedProducts,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages
      }
    };
  },

  /**
   * Get single product with intelligent sustainable alternatives
   */
  getProduct(idOrSlug) {
    if (!idOrSlug) {
      return { success: false, message: 'Product ID or slug is required.' };
    }

    const isNum = /^\d+$/.test(idOrSlug.toString());
    const product = isNum
      ? fallbackProducts.find(p => p.id === parseInt(idOrSlug, 10))
      : fallbackProducts.find(p => p.slug === idOrSlug.toString() || p.id === parseInt(idOrSlug, 10));

    if (!product) {
      return { success: false, message: 'Product not found.' };
    }

    // Find up to 3 sustainable alternatives (same or similar category, eco_score >= product.eco_score)
    const alternatives = fallbackProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .sort((a, b) => (b.eco_score || 0) - (a.eco_score || 0))
      .slice(0, 3)
      .map(alt => ({
        id: alt.id,
        name: alt.name,
        slug: alt.slug,
        price: alt.price,
        category: alt.category,
        eco_score: alt.eco_score,
        image_url: alt.image_url,
        stock: alt.stock,
        scoreAdvantage: Math.max(0, (alt.eco_score || 0) - (product.eco_score || 0)),
        ecoHighlights: [
          alt.eco_factors?.recycled_content || 'Renewable organic materials',
          alt.eco_factors?.packaging || '100% plastic-free kraft packaging'
        ]
      }));

    return {
      success: true,
      product: {
        ...product,
        alternatives
      }
    };
  },

  /**
   * Get all categories with product counts and average EcoScores
   */
  getCategories() {
    const map = {};
    for (const p of fallbackProducts) {
      const cat = p.category || 'General';
      if (!map[cat]) {
        map[cat] = { category: cat, count: 0, totalScore: 0 };
      }
      map[cat].count += 1;
      map[cat].totalScore += (p.eco_score || 0);
    }

    const categories = Object.values(map)
      .map(c => ({
        category: c.category,
        count: c.count,
        avg_eco_score: Math.round((c.totalScore / c.count) * 10) / 10
      }))
      .sort((a, b) => a.category.localeCompare(b.category));

    return {
      success: true,
      categories
    };
  },

  /**
   * Cart Operations (backed by localStorage)
   */
  getCart() {
    const rawItems = getStored(CART_STORAGE_KEY, []);
    const items = [];
    let subtotal = 0;
    let totalItems = 0;

    for (const item of rawItems) {
      const prod = fallbackProducts.find(p => p.id === item.product_id);
      if (!prod) continue;

      const qty = Math.max(1, item.quantity || 1);
      const itemSubtotal = Math.round(prod.price * qty * 100) / 100;
      subtotal += itemSubtotal;
      totalItems += qty;

      items.push({
        cart_item_id: item.cart_item_id || item.product_id,
        product_id: prod.id,
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        stock: prod.stock,
        eco_score: prod.eco_score,
        category: prod.category,
        image_url: prod.image_url,
        quantity: qty,
        subtotal: itemSubtotal,
        hasSufficientStock: prod.stock >= qty
      });
    }

    subtotal = Math.round(subtotal * 100) / 100;
    const avgScore = items.length > 0
      ? Math.round(items.reduce((acc, i) => acc + (i.eco_score || 0) * i.quantity, 0) / totalItems)
      : 95;

    return {
      success: true,
      cart: {
        items,
        summary: {
          totalItems,
          subtotal,
          averageEcoScore: avgScore,
          impact: {
            estimatedPlasticBottlesSaved: totalItems * 8,
            estimatedPlasticBagsSaved: totalItems * 12,
            carbonReductionKg: Math.round(totalItems * 2.4 * 10) / 10
          }
        }
      }
    };
  },

  addToCart(productId, quantity = 1) {
    const numId = parseInt(productId, 10);
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const prod = fallbackProducts.find(p => p.id === numId);

    if (!prod) {
      return { success: false, message: 'Product not found.' };
    }

    const cart = getStored(CART_STORAGE_KEY, []);
    const existingIndex = cart.findIndex(i => i.product_id === numId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity = Math.min(prod.stock, (cart[existingIndex].quantity || 1) + qty);
    } else {
      cart.push({
        cart_item_id: Date.now(),
        product_id: numId,
        quantity: Math.min(prod.stock, qty)
      });
    }

    setStored(CART_STORAGE_KEY, cart);
    return this.getCart();
  },

  updateQuantity(cartItemId, quantity) {
    const qty = parseInt(quantity, 10);
    let cart = getStored(CART_STORAGE_KEY, []);

    if (qty <= 0) {
      cart = cart.filter(i => (i.cart_item_id || i.product_id) !== cartItemId && i.product_id !== cartItemId);
    } else {
      const item = cart.find(i => (i.cart_item_id || i.product_id) === cartItemId || i.product_id === cartItemId);
      if (item) {
        item.quantity = qty;
      }
    }

    setStored(CART_STORAGE_KEY, cart);
    return this.getCart();
  },

  removeItem(cartItemId) {
    let cart = getStored(CART_STORAGE_KEY, []);
    cart = cart.filter(i => (i.cart_item_id || i.product_id) !== cartItemId && i.product_id !== cartItemId);
    setStored(CART_STORAGE_KEY, cart);
    return this.getCart();
  },

  clearCart() {
    setStored(CART_STORAGE_KEY, []);
    return { success: true, message: 'Cart cleared.' };
  },

  /**
   * Checkout & Orders (localStorage)
   */
  checkout(shippingDetails) {
    const cartRes = this.getCart();
    const items = cartRes.cart?.items || [];

    if (items.length === 0) {
      return { success: false, message: 'Your cart is empty. Add products before checking out.' };
    }

    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: Date.now(),
      order_number: orderNumber,
      total_amount: cartRes.cart.summary.subtotal,
      status: 'processing',
      payment_status: 'paid',
      created_at: new Date().toISOString(),
      shipping_name: shippingDetails.shipping_name || 'Conscious Shopper',
      shipping_address: shippingDetails.shipping_address || '123 Green Way',
      shipping_city: shippingDetails.shipping_city || 'Bengaluru',
      shipping_postal_code: shippingDetails.shipping_postal_code || '560001',
      shipping_country: shippingDetails.shipping_country || 'India',
      items: items.map(i => ({
        product_id: i.product_id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        subtotal: i.subtotal,
        eco_score: i.eco_score,
        image_url: i.image_url
      }))
    };

    const orders = getStored(ORDERS_STORAGE_KEY, []);
    orders.unshift(newOrder);
    setStored(ORDERS_STORAGE_KEY, orders);

    // Clear cart after checkout
    this.clearCart();

    return {
      success: true,
      message: 'Simulated order placed successfully!',
      order: newOrder
    };
  },

  getOrders() {
    const orders = getStored(ORDERS_STORAGE_KEY, [
      {
        id: 101,
        order_number: 'ORD-2026-849201',
        total_amount: 2848,
        status: 'delivered',
        payment_status: 'paid',
        created_at: '2026-10-24T10:30:00Z',
        shipping_name: 'Jane Eco Champion',
        shipping_city: 'Bengaluru',
        shipping_postal_code: '560001',
        shipping_country: 'India',
        items: [
          { name: 'PureCopper Hand-Hammered Ayurvedic Bottle (900ml)', price: 1299, quantity: 1, subtotal: 1299, eco_score: 96 },
          { name: 'HydroPure Insulated Bamboo Flask (750ml)', price: 1549, quantity: 1, subtotal: 1549, eco_score: 94 }
        ]
      }
    ]);

    return {
      success: true,
      orders
    };
  },

  getOrder(id) {
    const orders = getStored(ORDERS_STORAGE_KEY, []);
    const order = orders.find(o => o.id === parseInt(id, 10) || o.order_number === id);
    if (!order) {
      return { success: false, message: 'Order not found.' };
    }
    return { success: true, order };
  },

  /**
   * User Profile Impact
   */
  getProfile() {
    const orders = getStored(ORDERS_STORAGE_KEY, []);
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

    return {
      success: true,
      user: {
        id: 1,
        name: 'Jane Eco Champion',
        email: 'jane.eco@example.local',
        role: 'customer'
      },
      stats: {
        totalOrders,
        totalSpent,
        lifetimeBottlesSaved: (totalOrders || 1) * 36,
        lifetimeBagsSaved: (totalOrders || 1) * 48,
        averageEcoScore: 95.4
      }
    };
  },

  /**
   * Admin Analytics & Inventory
   */
  getAnalytics() {
    const orders = getStored(ORDERS_STORAGE_KEY, []);
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    const lowStock = fallbackProducts.filter(p => (p.stock || 0) <= 20);

    return {
      success: true,
      analytics: {
        kpis: {
          totalSimulatedRevenue: totalRevenue || 3497,
          totalOrders: orders.length || 3,
          averageOrderValue: Math.round(((totalRevenue || 3497) / (orders.length || 3)) * 100) / 100,
          totalCustomers: 4,
          lowStockCount: lowStock.length
        },
        lowStockProducts: lowStock.slice(0, 8),
        topProducts: fallbackProducts.slice(0, 5).map(p => ({
          product_id: p.id,
          product_name: p.name,
          eco_score: p.eco_score,
          total_quantity_sold: 14 + (p.id % 20),
          total_revenue_generated: p.price * (14 + (p.id % 20))
        })),
        categorySales: this.getCategories().categories.map(c => ({
          category: c.category,
          order_count: Math.max(1, Math.floor(c.count / 3)),
          items_sold: c.count * 2,
          total_revenue: Math.round(c.count * 1250)
        })),
        businessInsights: {
          sustainabilityAdvantage: 'High EcoScore items (90+) represent the highest conversion rates and customer satisfaction.',
          inventoryRecommendation: `${lowStock.length} items require inventory replenishment to prevent lost sales.`
        }
      }
    };
  }
};

export default localDataService;
