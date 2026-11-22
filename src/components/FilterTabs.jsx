import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function FilterTabs({
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  categoryFilter,
  onCategoryChange,
  categories,
  statusCounts,
  onResetFilters,
  isFiltered,
  totalMatching,
  totalTasks
}) {
  const tabs = [
    { id: 'all', label: 'All', count: statusCounts.all },
    { id: 'To do', label: 'To do', count: statusCounts.todo },
    { id: 'In progress', label: 'In progress', count: statusCounts.inProgress },
    { id: 'Completed', label: 'Completed', count: statusCounts.completed }
  ];

  return (
    <div className="filters-container">
      <div className="filter-tabs-row">
        {/* Status Tabs */}
        <div className="status-tabs" role="tablist" aria-label="Filter tasks by status">
          {tabs.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-tab ${isActive ? 'active' : ''}`}
                onClick={() => onStatusChange(tab.id)}
              >
                <span>{tab.label}</span>
                <span className={`tab-count ${isActive ? 'active' : ''}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dropdown Filters & Reset */}
        <div className="filter-dropdowns-group">
          {/* Priority Filter */}
          <div className="filter-select-wrapper">
            <label htmlFor="priority-filter" className="sr-only">
              Filter by Priority
            </label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => onPriorityChange(e.target.value)}
              className={`filter-select ${priorityFilter !== 'all' ? 'active-filter' : ''}`}
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="filter-select-wrapper">
            <label htmlFor="category-filter" className="sr-only">
              Filter by Category
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={`filter-select ${categoryFilter !== 'all' ? 'active-filter' : ''}`}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters button */}
          {isFiltered && (
            <button
              type="button"
              className="btn-reset-filters"
              onClick={onResetFilters}
              title="Reset all active filters"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="filter-meta-row">
        <span className="results-count-text">
          Showing <strong>{totalMatching}</strong> of <strong>{totalTasks}</strong> tasks
          {isFiltered && <span className="filtered-indicator"> (filtered)</span>}
        </span>
      </div>
    </div>
  );
}
