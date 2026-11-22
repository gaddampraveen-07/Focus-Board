import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare2, 
  CheckCircle2, 
  FolderKanban,
  X,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ 
  currentView, 
  setCurrentView, 
  stats, 
  isOpen, 
  onClose 
}) {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      count: stats.total
    },
    {
      id: 'my-tasks',
      label: 'My Tasks',
      icon: CheckSquare2,
      count: stats.inProgress + stats.todo
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle2,
      count: stats.completed
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-glyph" aria-hidden="true">
              <FolderKanban size={19} strokeWidth={2.2} />
            </div>
            <div className="brand-text">
              <span className="brand-name">FocusBoard</span>
              <span className="brand-edition">Daily Planner</span>
            </div>
          </div>
          
          <button 
            type="button" 
            className="mobile-close-btn"
            onClick={onClose}
            aria-label="Close sidebar navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main Navigation">
          <div className="nav-section-label">Navigation</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentView(item.id);
                      if (onClose) onClose();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={17} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    <span className={`nav-count ${isActive ? 'active' : ''}`}>
                      {item.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-productivity-card">
          <div className="productivity-card-header">
            <Sparkles size={14} className="sparkle-icon" />
            <span className="productivity-card-title">Mindful Focus</span>
          </div>
          <p className="productivity-card-text">
            Prioritize clarity over speed. Focus on 2-3 core objectives today.
          </p>
        </div>

        <div className="sidebar-footer">
          <div className="footer-status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">Saved locally</span>
          </div>
          <span className="footer-version">v1.2.0</span>
        </div>
      </aside>
    </>
  );
}
