import React from 'react';
import { Leaf, Info } from 'lucide-react';

export default function EcoScoreBadge({ score, size = 'md', showTooltip = true }) {
  const numScore = Math.min(100, Math.max(0, parseInt(score, 10) || 0));

  let colorClass = 'bg-emerald-100 text-emerald-900 border-emerald-300';
  let ratingLabel = 'Excellent';

  if (numScore >= 92) {
    colorClass = 'eco-badge-high';
    ratingLabel = 'Exceptional';
  } else if (numScore >= 85) {
    colorClass = 'eco-badge-good';
    ratingLabel = 'Very Good';
  } else {
    colorClass = 'eco-badge-fair';
    ratingLabel = 'Moderate';
  }

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div
      className={`eco-score-badge ${colorClass} ${isSmall ? 'eco-score-sm' : isLarge ? 'eco-score-lg' : ''}`}
      title={showTooltip ? 'Illustrative prototype EcoScore (0–100) based on material, carbon & packaging lifecycle data.' : undefined}
    >
      <Leaf size={isSmall ? 12 : isLarge ? 18 : 14} className="eco-leaf-icon" />
      <span className="eco-score-val">{numScore}</span>
      <span className="eco-score-max">/100</span>
      {isLarge && <span className="eco-score-label">• {ratingLabel}</span>}
    </div>
  );
}
