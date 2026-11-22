import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';

export default function TaskForm({
  isOpen,
  onClose,
  onSave,
  initialTask,
  categories
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Engineering');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const titleInputRef = useRef(null);

  // Sync form state whenever modal opens or initialTask changes
  useEffect(() => {
    if (isOpen) {
      if (initialTask) {
        setTitle(initialTask.title || '');
        setDescription(initialTask.description || '');
        setCategory(initialTask.category || categories[0] || 'Engineering');
        setStatus(initialTask.status || 'To do');
        setPriority(initialTask.priority || 'Medium');
        setDueDate(initialTask.dueDate || '');
      } else {
        // Defaults for new task
        setTitle('');
        setDescription('');
        setCategory(categories[0] || 'Engineering');
        setStatus('To do');
        setPriority('Medium');
        
        // Default due date to today
        const today = new Date().toISOString().split('T')[0];
        setDueDate(today);
      }
      setErrors({});
      setTouched({});

      // Auto-focus title input
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, initialTask, categories]);

  // Handle ESC key to cancel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title should be at least 3 characters';
    }

    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, dueDate: true });

    if (!validate()) {
      return;
    }

    const taskPayload = {
      id: initialTask ? initialTask.id : `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      priority,
      dueDate,
      createdAt: initialTask ? initialTask.createdAt : new Date().toISOString()
    };

    onSave(taskPayload);
    onClose();
  };

  const isEditing = Boolean(initialTask);

  return (
    <div 
      className="modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div className="task-form-modal">
        {/* Modal Header */}
        <div className="form-modal-header">
          <div>
            <h2 id="task-form-title" className="form-modal-title">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
            <p className="form-modal-subtitle">
              {isEditing ? 'Update the details and priority of this task' : 'Add a clear, actionable item to your board'}
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Cancel and close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* Title Field (Required) */}
          <div className="form-group">
            <label htmlFor="form-task-title" className="form-label required">
              Title
            </label>
            <input
              id="form-task-title"
              ref={titleInputRef}
              type="text"
              className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
              placeholder="e.g. Conduct security review of authentication endpoints"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (touched.title) {
                  if (!e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, title: 'Task title is required' }));
                  } else if (e.target.value.trim().length < 3) {
                    setErrors((prev) => ({ ...prev, title: 'Title should be at least 3 characters' }));
                  } else {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.title;
                      return copy;
                    });
                  }
                }
              }}
              onBlur={() => {
                setTouched((prev) => ({ ...prev, title: true }));
                validate();
              }}
            />
            {touched.title && errors.title && (
              <div className="form-error-msg" role="alert">
                <AlertCircle size={13} />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          {/* Description Field (Optional) */}
          <div className="form-group">
            <label htmlFor="form-task-desc" className="form-label">
              Description <span className="label-optional">(optional)</span>
            </label>
            <textarea
              id="form-task-desc"
              rows={3}
              className="form-textarea"
              placeholder="Add relevant context, acceptance criteria, or links..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* 2-Column Grid: Category & Priority */}
          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="form-task-category" className="form-label">
                Category
              </label>
              <select
                id="form-task-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="form-task-priority" className="form-label required">
                Priority
              </label>
              <select
                id="form-task-priority"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* 2-Column Grid: Status & Due Date */}
          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="form-task-status" className="form-label required">
                Status
              </label>
              <select
                id="form-task-status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="form-task-due" className="form-label required">
                Due Date
              </label>
              <div className="input-with-icon">
                <input
                  id="form-task-due"
                  type="date"
                  className={`form-input ${touched.dueDate && errors.dueDate ? 'input-error' : ''}`}
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    if (touched.dueDate) {
                      if (!e.target.value) {
                        setErrors((prev) => ({ ...prev, dueDate: 'Due date is required' }));
                      } else {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.dueDate;
                          return copy;
                        });
                      }
                    }
                  }}
                  onBlur={() => {
                    setTouched((prev) => ({ ...prev, dueDate: true }));
                    validate();
                  }}
                />
              </div>
              {touched.dueDate && errors.dueDate && (
                <div className="form-error-msg" role="alert">
                  <AlertCircle size={13} />
                  <span>{errors.dueDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="form-actions-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
