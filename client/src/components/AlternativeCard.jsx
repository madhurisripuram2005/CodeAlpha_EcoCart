import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import EcoScoreBadge from './EcoScoreBadge';

export default function AlternativeCard({ alternative }) {
  const isHigher = alternative.scoreDifference > 0;

  return (
    <div className="alternative-card card card-hover">
      <div className="alt-card-header">
        <div className="alt-score-diff">
          <Sparkles size={16} className={isHigher ? 'text-forest' : 'text-amber'} />
          <span className="alt-diff-text">
            {isHigher ? `+${alternative.scoreDifference} pts higher EcoScore` : 'Comparable Eco-Friendly Choice'}
          </span>
        </div>
        <EcoScoreBadge score={alternative.eco_score} size="sm" />
      </div>

      <div className="alt-body">
        <img
          src={alternative.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80'}
          alt={alternative.name}
          className="alt-thumb"
          loading="lazy"
        />
        <div className="alt-details">
          <span className="alt-cat">{alternative.category}</span>
          <h4 className="alt-title">{alternative.name}</h4>
          <span className="alt-price">${Number(alternative.price).toFixed(2)}</span>
        </div>
      </div>

      <p className="alt-note">{alternative.comparisonNote}</p>

      <Link to={`/product/${alternative.slug || alternative.id}`} className="btn btn-sm btn-outline alt-action-btn">
        <span>View Sustainable Alternative</span>
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
