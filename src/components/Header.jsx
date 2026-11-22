import React from 'react';
import { Plus, Menu } from 'lucide-react';

export default function Header({ onOpenTaskForm, onToggleSidebar }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-trigger"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="header-titles">
          <div className="header-meta">
            <span className="greeting-text">{getGreeting()}</span>
            <span className="meta-separator">•</span>
            <span className="date-text">{formattedDate}</span>
          </div>
          <h1 className="header-headline">Focus on what matters most today</h1>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={() => onOpenTaskForm(null)}
          aria-label="Add new task"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
