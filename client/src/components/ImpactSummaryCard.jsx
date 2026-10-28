import React from 'react';
import { Award, Droplets, ShoppingBag, Info } from 'lucide-react';

export default function ImpactSummaryCard({ impact, title = 'Your Environmental Impact Indicator' }) {
  if (!impact) return null;

  const bottles = impact.estimatedPlasticContainersAvoided || 0;
  const bags = impact.estimatedSingleUseBagsSaved || 0;
  const avgScore = impact.averageEcoScore || 0;

  return (
    <div className="impact-card card">
      <div className="impact-header">
        <div className="impact-title-group">
          <Award className="impact-icon" size={24} />
          <div>
            <h3 className="impact-title">{title}</h3>
            <span className="impact-subtitle">Illustrative estimation based on conscious shopping choices</span>
          </div>
        </div>
      </div>

      <div className="impact-grid">
        <div className="impact-stat-box">
          <Droplets className="impact-box-icon text-cyan" size={24} />
          <div className="impact-stat-num">{bottles.toLocaleString()}</div>
          <div className="impact-stat-label">Plastic Containers Avoided</div>
          <span className="impact-stat-sub">Based on reusable canteen lifetime cycles</span>
        </div>

        <div className="impact-stat-box">
          <ShoppingBag className="impact-box-icon text-forest" size={24} />
          <div className="impact-stat-num">{bags.toLocaleString()}</div>
          <div className="impact-stat-label">Single-Use Bags Saved</div>
          <span className="impact-stat-sub">From organic canvas & mesh totes</span>
        </div>

        <div className="impact-stat-box">
          <div className="impact-score-circle">
            <span className="impact-circle-num">{avgScore || 90}</span>
            <span className="impact-circle-max">/100</span>
          </div>
          <div className="impact-stat-label">Average Basket EcoScore</div>
          <span className="impact-stat-sub">Weighted lifecycle sustainability rating</span>
        </div>
      </div>

      <div className="impact-disclaimer">
        <Info size={14} className="disclaimer-icon" />
        <p>
          <strong>Disclaimer:</strong> {impact.disclaimer || 'Prototype score and impact indicators are illustrative estimates developed for this platform demonstration, not independently verified third-party ISO 14040 environmental certifications.'}
        </p>
      </div>
    </div>
  );
}
