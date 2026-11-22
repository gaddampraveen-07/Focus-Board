import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  task,
  onClose,
  onConfirm
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div 
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="confirm-modal-box">
        <div className="confirm-modal-icon-wrapper" aria-hidden="true">
          <AlertTriangle size={22} className="warning-icon" />
        </div>

        <div className="confirm-modal-content">
          <h2 id="delete-dialog-title" className="confirm-modal-title">
            Delete Task
          </h2>
          <p className="confirm-modal-desc">
            Are you sure you want to delete <strong>"{task.title}"</strong>? This action cannot be undone.
          </p>
        </div>

        <div className="confirm-modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={() => onConfirm(task.id)}
            autoFocus
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
