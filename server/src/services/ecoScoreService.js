import { db } from '../database/db.js';

/**
 * Service to manage illustrative EcoScores, alternative recommendations,
 * and environmental impact metrics.
 */
export const ecoScoreService = {
  /**
   * Find sustainable alternatives for a given product.
   * Recommends items in the same category with higher or comparable EcoScores.
   */
  getAlternatives(productId, category, currentScore, limit = 3) {
    // 1. First look for higher EcoScore products in the same category
    let alternatives = db.prepare(`
      SELECT id, name, slug, price, category, stock, eco_score, eco_factors, image_url
      FROM products
      WHERE category = ? AND id != ? AND eco_score > ?
      ORDER BY eco_score DESC, price ASC
      LIMIT ?;
    `).all(category, productId, currentScore, limit);

    // 2. If not enough higher scored products in category, get top-rated products in that category
    if (alternatives.length < limit) {
      const needed = limit - alternatives.length;
      const existingIds = [productId, ...alternatives.map(a => a.id)];
      const placeholders = existingIds.map(() => '?').join(',');

      const fallback = db.prepare(`
        SELECT id, name, slug, price, category, stock, eco_score, eco_factors, image_url
        FROM products
        WHERE category = ? AND id NOT IN (${placeholders})
        ORDER BY eco_score DESC, price ASC
        LIMIT ?;
      `).all(category, ...existingIds, needed);

      alternatives = [...alternatives, ...fallback];
    }

    return alternatives.map(alt => {
      let factors = {};
      try {
        factors = typeof alt.eco_factors === 'string' ? JSON.parse(alt.eco_factors) : alt.eco_factors;
      } catch (e) {
        factors = {};
      }

      const scoreDiff = alt.eco_score - currentScore;
      let comparisonNote = '';
      if (scoreDiff > 0) {
        comparisonNote = `+${scoreDiff} pts higher EcoScore: Features enhanced sustainable materials and reduced lifecycle impact.`;
      } else if (scoreDiff === 0) {
        comparisonNote = `Equal EcoScore (${alt.eco_score}/100): Excellent alternative choice in ${alt.category}.`;
      } else {
        comparisonNote = `Comparable option (${alt.eco_score}/100) with alternative budget and styling.`;
      }

      return {
        ...alt,
        eco_factors: factors,
        scoreDifference: scoreDiff,
        comparisonNote
      };
    });
  },

  /**
   * Compute illustrative impact indicators based on purchased or carted items.
   * NOTE: Clearly labeled as illustrative model calculations, not certified audits.
   */
  calculateImpact(items = []) {
    let totalItems = 0;
    let totalEcoScoreWeight = 0;
    let estimatedPlasticBottlesDiverted = 0;
    let estimatedSingleUseBagsSaved = 0;

    for (const item of items) {
      const qty = Number(item.quantity) || 1;
      const score = Number(item.eco_score) || 85;
      totalItems += qty;
      totalEcoScoreWeight += score * qty;

      const cat = (item.category || item.product_name || '').toLowerCase();
      if (cat.includes('bottle') || cat.includes('flask') || cat.includes('tumbler')) {
        estimatedPlasticBottlesDiverted += qty * 150;
      } else if (cat.includes('bag') || cat.includes('tote') || cat.includes('produce')) {
        estimatedSingleUseBagsSaved += qty * 120;
      } else {
        estimatedPlasticBottlesDiverted += qty * 25;
      }
    }

    const avgScore = totalItems > 0 ? Math.round(totalEcoScoreWeight / totalItems) : 0;

    return {
      totalEcoItemsPurchased: totalItems,
      averageEcoScore: avgScore,
      illustrativeImpact: {
        estimatedPlasticContainersAvoided: estimatedPlasticBottlesDiverted,
        estimatedSingleUseBagsSaved: estimatedSingleUseBagsSaved,
        disclaimer: 'Illustrative impact calculation for demonstration purposes based on typical product replacement lifecycle assumptions.'
      }
    };
  }
};
