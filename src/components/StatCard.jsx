import React from 'react';

/**
 * Reusable StatCard component
 * Renders an individual compact statistic card with an icon, metric value, and optional progress bar.
 * 
 * @param {Object} props
 * @param {string} props.title - Card heading/metric title
 * @param {string|number} props.value - Metric value (e.g. 7, "45%")
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {string} [props.sublabel] - Descriptive context sublabel
 * @param {string} [props.accent] - Theme accent (neutral | warning | success | primary)
 * @param {boolean} [props.isProgress] - Whether to render a mini completion progress bar
 * @param {number} [props.progressValue] - Completion percentage (0 - 100)
 */
export default function StatCard({
  title,
  value,
  icon: Icon,
  sublabel,
  accent = 'neutral',
  isProgress = false,
  progressValue = 0
}) {
  return (
    <div className={`stat-card stat-${accent}`}>
      <div className="stat-card-top">
        <span className="stat-label">{title}</span>
        {Icon && (
          <div className="stat-icon-wrapper" aria-hidden="true">
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="stat-card-bottom">
        <span className="stat-value">{value}</span>
        {sublabel && <span className="stat-sublabel">{sublabel}</span>}
      </div>

      {isProgress && (
        <div className="stat-progress-bar-bg" aria-hidden="true">
          <div
            className="stat-progress-bar-fill"
            style={{ width: `${Math.min(100, Math.max(0, progressValue))}%` }}
          />
        </div>
      )}
    </div>
  );
}
