import React, { useState } from 'react';
import { 
  Calendar, 
  Pencil, 
  Trash2, 
  Check, 
  Clock, 
  AlertCircle,
  Tag,
  ChevronDown
} from 'lucide-react';

export default function TaskCard({ 
  task, 
  onToggleStatus, 
  onStatusChange,
  onEdit, 
  onDelete 
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const isCompleted = task.status === 'Completed';

  // Format and evaluate due date
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    try {
      const due = new Date(dateString + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const diffTime = due.getTime() - today.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      const formattedStr = due.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });

      if (diffDays < 0 && !isCompleted) {
        return { text: `Overdue (${formattedStr})`, isOverdue: true };
      } else if (diffDays === 0) {
        return { text: 'Due Today', isToday: true };
      } else if (diffDays === 1) {
        return { text: 'Due Tomorrow', isUpcoming: true };
      }
      return { text: formattedStr, isNormal: true };
    } catch {
      return { text: dateString };
    }
  };

  const dueInfo = formatDueDate(task.dueDate);

  const priorityClasses = {
    High: 'priority-high',
    Medium: 'priority-medium',
    Low: 'priority-low'
  };

  const statusClasses = {
    'To do': 'status-todo',
    'In progress': 'status-in-progress',
    'Completed': 'status-completed'
  };

  const statusOptions = ['To do', 'In progress', 'Completed'];

  return (
    <article className={`task-card ${isCompleted ? 'task-card-completed' : ''}`}>
      <div className="task-card-main">
        {/* Quick Checkbox / Completion Toggle */}
        <button
          type="button"
          className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleStatus(task.id)}
          aria-label={isCompleted ? `Mark "${task.title}" as incomplete` : `Mark "${task.title}" as completed`}
          title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isCompleted && <Check size={13} strokeWidth={3} />}
        </button>

        {/* Task Content Block */}
        <div className="task-details-col">
          <div className="task-header-row">
            <h3 className={`task-title ${isCompleted ? 'line-through' : ''}`}>
              {task.title}
            </h3>

            {/* Inline Quick Badges for Category & Priority */}
            <div className="task-meta-pills">
              {task.category && (
                <span className="task-category-pill" title={`Category: ${task.category}`}>
                  <Tag size={11} className="pill-icon" />
                  <span>{task.category}</span>
                </span>
              )}

              <span className={`task-priority-pill ${priorityClasses[task.priority] || 'priority-low'}`}>
                <span className="priority-dot" aria-hidden="true" />
                <span>{task.priority}</span>
              </span>
            </div>
          </div>

          {task.description && (
            <p className={`task-description ${isCompleted ? 'desc-completed' : ''}`}>
              {task.description}
            </p>
          )}

          {/* Footer of the task item: Due date, Status selector, Actions */}
          <div className="task-card-footer">
            <div className="task-footer-left">
              {/* Due Date Indicator */}
              {dueInfo && (
                <div 
                  className={`task-due-date ${dueInfo.isOverdue ? 'due-overdue' : ''} ${dueInfo.isToday ? 'due-today' : ''}`}
                  title={task.dueDate}
                >
                  {dueInfo.isOverdue ? (
                    <AlertCircle size={13} className="due-icon" />
                  ) : (
                    <Calendar size={13} className="due-icon" />
                  )}
                  <span>{dueInfo.text}</span>
                </div>
              )}

              {/* Status Dropdown Selector */}
              <div className="task-status-selector-wrap">
                <button
                  type="button"
                  className={`task-status-badge ${statusClasses[task.status] || ''}`}
                  onClick={() => setShowStatusMenu(!showStatusMenu)}
                  aria-expanded={showStatusMenu}
                  aria-haspopup="listbox"
                  title="Click to update status"
                >
                  <span className="status-badge-dot" />
                  <span className="status-badge-text">{task.status}</span>
                  <ChevronDown size={11} className="status-caret" />
                </button>

                {showStatusMenu && (
                  <>
                    <div 
                      className="status-menu-backdrop" 
                      onClick={() => setShowStatusMenu(false)}
                      aria-hidden="true" 
                    />
                    <ul className="task-status-menu" role="listbox">
                      {statusOptions.map((opt) => (
                        <li key={opt}>
                          <button
                            type="button"
                            className={`status-menu-item ${task.status === opt ? 'active' : ''}`}
                            onClick={() => {
                              onStatusChange(task.id, opt);
                              setShowStatusMenu(false);
                            }}
                          >
                            <span className={`menu-status-dot ${statusClasses[opt]}`} />
                            <span>{opt}</span>
                            {task.status === opt && <Check size={12} className="menu-check" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons: Edit, Delete */}
            <div className="task-actions-group">
              <button
                type="button"
                className="task-action-btn edit-btn"
                onClick={() => onEdit(task)}
                aria-label={`Edit task "${task.title}"`}
                title="Edit task"
              >
                <Pencil size={14} />
              </button>

              <button
                type="button"
                className="task-action-btn delete-btn"
                onClick={() => onDelete(task)}
                aria-label={`Delete task "${task.title}"`}
                title="Delete task"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
