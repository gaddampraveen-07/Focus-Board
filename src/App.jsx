import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_TASKS, CATEGORIES } from './data/sampleTasks';
import { Check, Layers, Clock3, CheckCircle2, TrendingUp } from 'lucide-react';

// Exact storage key recommended in assignment specification Step 14
const STORAGE_KEY = 'focusboard_tasks';

export default function App() {
  // Persistence via custom hook with sample tasks fallback
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, INITIAL_TASKS);

  // Navigation & UI state
  const [currentView, setCurrentView] = useState('overview'); // 'overview' | 'my-tasks' | 'completed'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'To do' | 'In progress' | 'Completed'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'High' | 'Medium' | 'Low'
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  // Lightweight toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3200);
  };

  // Dynamic Statistics derived from actual task dataset
  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    // Formula: (Completed Tasks / Total Tasks) * 100, guarding division by zero
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      inProgress,
      completed,
      todo,
      completionRate
    };
  }, [tasks]);

  // Status counts for filter tabs
  const statusCounts = useMemo(() => {
    return {
      all: tasks.length,
      todo: tasks.filter((t) => t.status === 'To do').length,
      inProgress: tasks.filter((t) => t.status === 'In progress').length,
      completed: tasks.filter((t) => t.status === 'Completed').length
    };
  }, [tasks]);

  // Handle view change from sidebar
  const handleViewChange = (viewId) => {
    setCurrentView(viewId);
    if (viewId === 'my-tasks') {
      setStatusFilter('To do');
    } else if (viewId === 'completed') {
      setStatusFilter('Completed');
    } else {
      setStatusFilter('all');
    }
  };

  // Filter and search logic (Search, status tabs, and priority filters work together)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Search Query filter (matches title or description case-insensitively)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // 2. Status Filter
      if (statusFilter !== 'all') {
        if (task.status !== statusFilter) return false;
      }

      // 3. Priority Filter
      if (priorityFilter !== 'all') {
        if (task.priority !== priorityFilter) return false;
      }

      // 4. Category Filter
      if (categoryFilter !== 'all') {
        if (task.category !== categoryFilter) return false;
      }

      return true;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const isFiltered = Boolean(
    searchQuery.trim() ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    categoryFilter !== 'all'
  );

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
    setCurrentView('overview');
  };

  // Task Actions (CRUD)
  const handleSaveTask = (taskPayload) => {
    if (editingTask) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) => (t.id === taskPayload.id ? { ...taskPayload } : t))
      );
      showToast(`Updated "${taskPayload.title}"`);
    } else {
      // Create new task
      setTasks((prev) => [taskPayload, ...prev]);
      showToast(`Created "${taskPayload.title}"`);
    }
    setEditingTask(null);
  };

  const handleToggleStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newStatus = t.status === 'Completed' ? 'To do' : 'Completed';
          showToast(newStatus === 'Completed' ? 'Task completed' : 'Task marked to do');
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          showToast(`Status updated to ${newStatus}`);
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
  };

  const handleDeleteConfirm = (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setDeletingTask(null);
    if (taskToDelete) {
      showToast(`Deleted "${taskToDelete.title}"`);
    }
  };

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        setCurrentView={handleViewChange}
        stats={stats}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Workspace Area */}
      <main className="main-content" id="main-content">
        <div className="content-container">
          {/* Header */}
          <Header
            onOpenTaskForm={handleOpenCreate}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Dynamic Statistics Cards - Reusable StatCard components */}
          <section className="stats-grid" aria-label="Task Overview Statistics">
            <StatCard
              title="Total Tasks"
              value={stats.total}
              sublabel={`${stats.todo} pending`}
              icon={Layers}
              accent="neutral"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              sublabel="Active momentum"
              icon={Clock3}
              accent="warning"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              sublabel={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% resolved`}
              icon={CheckCircle2}
              accent="success"
            />
            <StatCard
              title="Completion Rate"
              value={`${stats.completionRate}%`}
              sublabel={stats.completionRate === 100 ? 'All caught up' : 'Steady progress'}
              icon={TrendingUp}
              accent="primary"
              isProgress={true}
              progressValue={stats.completionRate}
            />
          </section>

          {/* Focus Notes Productivity Carousel */}
          <FocusNotes />

          {/* Task Management Section */}
          <section className="tasks-section" aria-label="Task Management">
            <div className="tasks-section-header">
              <div className="section-title-wrap">
                <h2 className="section-title">
                  {currentView === 'completed'
                    ? 'Completed Tasks'
                    : currentView === 'my-tasks'
                    ? 'Active Focus Tasks'
                    : 'All Tasks'}
                </h2>
                <span className="section-subtitle">
                  Review priorities, track status and maintain momentum
                </span>
              </div>
            </div>

            {/* Search Input Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Filter Tabs & Selectors */}
            <FilterTabs
              statusFilter={statusFilter}
              onStatusChange={(status) => {
                setStatusFilter(status);
                if (status === 'Completed') setCurrentView('completed');
                else if (status === 'To do') setCurrentView('my-tasks');
                else if (status === 'all') setCurrentView('overview');
              }}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              categories={CATEGORIES}
              statusCounts={statusCounts}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
              totalMatching={filteredTasks.length}
              totalTasks={tasks.length}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              totalTasksCount={tasks.length}
              onToggleStatus={handleToggleStatus}
              onStatusChange={handleStatusChange}
              onEdit={handleOpenEdit}
              onDelete={setDeletingTask}
              onOpenCreate={handleOpenCreate}
              onResetFilters={handleResetFilters}
              isFiltered={isFiltered}
            />
          </section>
        </div>
      </main>

      {/* Task Create / Edit Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialTask={editingTask}
        categories={CATEGORIES}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingTask)}
        task={deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          <Check size={14} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
