import React from 'react';
import TaskCard from './TaskCard';
import { ClipboardList, SearchX, Plus, RotateCcw } from 'lucide-react';

export default function TaskList({
  tasks,
  totalTasksCount,
  onToggleStatus,
  onStatusChange,
  onEdit,
  onDelete,
  onOpenCreate,
  onResetFilters,
  isFiltered
}) {
  // Case 1: Absolutely no tasks exist in the workspace
  if (totalTasksCount === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon-wrapper" aria-hidden="true">
          <ClipboardList size={32} strokeWidth={1.5} />
        </div>
        <h3 className="empty-state-title">No tasks logged yet</h3>
        <p className="empty-state-desc">
          Capture your high-priority items, set due dates, and build daily momentum.
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={onOpenCreate}
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Create your first task</span>
        </button>
      </div>
    );
  }

  // Case 2: Tasks exist, but current filters/search returned zero results
  if (tasks.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon-wrapper empty-search" aria-hidden="true">
          <SearchX size={32} strokeWidth={1.5} />
        </div>
        <h3 className="empty-state-title">No matching tasks found</h3>
        <p className="empty-state-desc">
          We couldn't find any tasks matching your active filters or search terms.
        </p>
        {isFiltered && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onResetFilters}
          >
            <RotateCcw size={14} />
            <span>Reset all filters</span>
          </button>
        )}
      </div>
    );
  }

  // Case 3: Normal list display
  return (
    <div className="task-list-wrapper" role="region" aria-label="Tasks list">
      <div className="task-items-container">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
