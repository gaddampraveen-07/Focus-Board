export const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Refactor authentication flow for session timeouts",
    description: "Ensure silent token refresh handles expired access tokens before triggering an interactive re-login modal. Test with staging OAuth provider.",
    category: "Engineering",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-24",
    createdAt: "2026-11-20T10:00:00.000Z"
  },
  {
    id: "task-2",
    title: "Audit WCAG 2.1 AA accessibility contrast ratios",
    description: "Review color tokens across dark and light modes using Axe DevTools. Fix low-contrast subtitle text and form helper labels in task management.",
    category: "Design",
    status: "To do",
    priority: "Medium",
    dueDate: "2026-11-26",
    createdAt: "2026-11-21T09:30:00.000Z"
  },
  {
    id: "task-3",
    title: "Draft customer onboarding email cadence for v2 release",
    description: "Prepare 4-part automated drip campaign focusing on daily planning habits, keyboard navigation tips, and weekly retrospectives.",
    category: "Marketing",
    status: "To do",
    priority: "Low",
    dueDate: "2026-11-28",
    createdAt: "2026-11-21T14:15:00.000Z"
  },
  {
    id: "task-4",
    title: "Optimize Postgres indexes on task query workloads",
    description: "Analyze EXPLAIN ANALYZE traces on tenant-filtered queries. Add composite index on (workspace_id, status, due_date) to reduce P95 latency below 45ms.",
    category: "Engineering",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-23",
    createdAt: "2026-11-19T16:00:00.000Z"
  },
  {
    id: "task-5",
    title: "Finalize Q4 product roadmap & resource allocation",
    description: "Align engineering squad priorities with leadership goals. Synthesize user interview feedback from the October beta test cohort.",
    category: "Product",
    status: "Completed",
    priority: "High",
    dueDate: "2026-11-18",
    createdAt: "2026-11-15T11:00:00.000Z"
  },
  {
    id: "task-6",
    title: "Document public REST API webhook schemas",
    description: "Publish OpenAPI 3.1 specification for task.created, task.updated, and task.deleted payload events with HMAC signature verification guides.",
    category: "Documentation",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-19",
    createdAt: "2026-11-16T13:45:00.000Z"
  },
  {
    id: "task-7",
    title: "Conduct security review of file upload endpoint",
    description: "Verify MIME-type verification, magic number validation, and AWS S3 presigned URL expiration policies for task attachment previews.",
    category: "Operations",
    status: "To do",
    priority: "Medium",
    dueDate: "2026-11-27",
    createdAt: "2026-11-22T08:00:00.000Z"
  }
];

export const CATEGORIES = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Operations",
  "Documentation"
];
