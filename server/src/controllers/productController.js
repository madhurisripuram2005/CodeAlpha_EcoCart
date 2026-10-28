import { db } from '../database/db.js';
import { ecoScoreService } from '../services/ecoScoreService.js';

function parseProduct(p) {
  if (!p) return null;
  let factors = {};
  try {
    factors = typeof p.eco_factors === 'string' ? JSON.parse(p.eco_factors) : p.eco_factors;
  } catch (e) {
    factors = {};
  }
  return {
    ...p,
    eco_factors: factors
  };
}

export const productController = {
  /**
   * List products with search, category filtering, sorting, price range, and pagination
   * GET /api/products
   */
  getProducts(req, res, next) {
    try {
      const {
        search = '',
        category = '',
        sort = 'featured',
        min_price,
        max_price,
        min_eco_score,
        page = 1,
        limit = 12
      } = req.query;

      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
      const offset = (pageNum - 1) * limitNum;

      const conditions = [];
      const params = [];

      if (search && search.trim()) {
        conditions.push('(name LIKE ? OR description LIKE ?)');
        params.push(`%${search.trim()}%`, `%${search.trim()}%`);
      }

      if (category && category.trim() && category !== 'All') {
        conditions.push('(category = ? OR category LIKE ?)');
        params.push(category.trim(), `${category.trim()}%`);
      }

      if (min_price !== undefined && min_price !== '') {
        const minP = parseFloat(min_price);
        if (!isNaN(minP)) {
          conditions.push('price >= ?');
          params.push(minP);
        }
      }

      if (max_price !== undefined && max_price !== '') {
        const maxP = parseFloat(max_price);
        if (!isNaN(maxP)) {
          conditions.push('price <= ?');
          params.push(maxP);
        }
      }

      if (min_eco_score !== undefined && min_eco_score !== '') {
        const minScore = parseInt(min_eco_score, 10);
        if (!isNaN(minScore)) {
          conditions.push('eco_score >= ?');
          params.push(minScore);
        }
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      // Sorting map
      let orderClause = 'ORDER BY is_featured DESC, eco_score DESC, id DESC';
      switch (sort) {
        case 'price_asc':
          orderClause = 'ORDER BY price ASC, eco_score DESC';
          break;
        case 'price_desc':
          orderClause = 'ORDER BY price DESC, eco_score DESC';
          break;
        case 'eco_desc':
          orderClause = 'ORDER BY eco_score DESC, price ASC';
          break;
        case 'name_asc':
          orderClause = 'ORDER BY name ASC';
          break;
        case 'newest':
          orderClause = 'ORDER BY created_at DESC';
          break;
        default:
          orderClause = 'ORDER BY is_featured DESC, eco_score DESC, id DESC';
      }

      // Count query
      const countStmt = db.prepare(`SELECT COUNT(*) as total FROM products ${whereClause}`);
      const countResult = countStmt.get(...params);
      const total = countResult ? countResult.total : 0;

      // Select query
      const selectStmt = db.prepare(`
        SELECT id, name, slug, description, price, category, stock,
               eco_score, eco_factors, eco_disclaimer, image_url, is_featured, created_at
        FROM products
        ${whereClause}
        ${orderClause}
        LIMIT ? OFFSET ?
      `);

      const rows = selectStmt.all(...params, limitNum, offset);
      const products = rows.map(parseProduct);

      return res.json({
        success: true,
        products,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum)
        }
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get single product by ID or Slug, with sustainable alternatives
   * GET /api/products/:idOrSlug
   */
  getProductByIdOrSlug(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const isNumeric = /^\d+$/.test(idOrSlug);

      const stmt = isNumeric
        ? db.prepare('SELECT * FROM products WHERE id = ?')
        : db.prepare('SELECT * FROM products WHERE slug = ?');

      const product = stmt.get(isNumeric ? parseInt(idOrSlug, 10) : idOrSlug);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found.'
        });
      }

      const parsed = parseProduct(product);

      // Fetch Sustainable Alternatives using EcoScore service
      const alternatives = ecoScoreService.getAlternatives(
        parsed.id,
        parsed.category,
        parsed.eco_score,
        3
      );

      return res.json({
        success: true,
        product: {
          ...parsed,
          alternatives
        }
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * List product categories with product counts
   * GET /api/products/categories
   */
  getCategories(req, res, next) {
    try {
      const rows = db.prepare(`
        SELECT category, COUNT(*) as count, ROUND(AVG(eco_score), 1) as avg_eco_score
        FROM products
        GROUP BY category
        ORDER BY category ASC;
      `).all();

      return res.json({
        success: true,
        categories: rows
      });
    } catch (error) {
      next(error);
    }
  }
};
