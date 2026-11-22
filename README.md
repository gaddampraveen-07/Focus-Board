# FocusBoard – A Natural, Human-Designed Task Management Application

> **Project Name**: FocusBoard  
> **Built for**: MobileFirst Candidate Implementation Assignment  
> **Tech Stack**: React.js, Vite, JavaScript (ES6+), CSS3, Lucide React, HTML5, LocalStorage  

FocusBoard is a responsive, distraction-free task management dashboard crafted with an intentional, human-designed aesthetic inspired by modern tools like Linear, Todoist, and Notion. It intentionally avoids generic SaaS dashboard clichés—such as neon gradients, glassmorphism, oversized cards, and artificial metrics—in favor of a warm, restrained palette, thoughtful typography, and tactile interactions.

---

## Table of Contents
1. [Overview & Requirements Checklist](#overview--requirements-checklist)
2. [Technology Stack](#technology-stack)
3. [Project Folder Structure](#project-folder-structure)
4. [State Management Architecture](#state-management-architecture)
5. [LocalStorage Persistence Implementation](#localstorage-persistence-implementation)
6. [Key Features Implemented](#key-features-implemented)
7. [Installation & Local Setup](#installation--local-setup)
8. [Responsive Design & Breakpoints](#responsive-design--breakpoints)
9. [Accessibility & Usability](#accessibility--usability)
10. [Deployment Guide (Vercel / Netlify)](#deployment-guide-vercel--netlify)
11. [GitHub Repository Instructions](#github-repository-instructions)
12. [Known Limitations & Future Extensions](#known-limitations--future-extensions)

---

## Overview & Requirements Checklist

| Feature | Requirement | Status | Implementation Details |
| :--- | :--- | :--- | :--- |
| **Initial Sample Data** | Minimum 6 realistic tasks | Verified | 7 sample tasks across 6 categories with realistic names |
| **Create Task** | Add new task via validated form | Verified | Reusable modal with required title and due date validation |
| **Edit Task** | Update existing task record | Verified | Reuses same form, preserves unique ID, updates immediately |
| **Delete Task** | Remove task with confirmation | Verified | `DeleteConfirmModal` with Confirm and Cancel actions |
| **Status Options** | To do, In progress, Completed | Verified | Distinct visual pills, quick checkbox, inline status dropdown |
| **Search** | Case-insensitive title/keyword | Verified | Real-time title & description search with clear button |
| **Filters** | Status tabs & Priority dropdown | Verified | Multi-facet filtering working simultaneously with reset button |
| **Dynamic Statistics**| Counts & completion percentage | Verified | Dynamically calculated using $(Completed / Total) \times 100$ |
| **Focus Notes** | 3-slide productivity carousel | Verified | Circular navigation, prev/next buttons, and interactive dots |
| **Data Persistence** | Browser localStorage | Verified | `focusboard_tasks` key with fallback recovery and no overwrites |
| **Responsive Views** | Desktop, Tablet, Mobile | Verified | Tested at 1440px, 768px, and 390px (collapsible mobile drawer) |
| **Accessibility** | Semantic HTML & keyboard navigation | Verified | ARIA roles, label bindings, Esc key modal dismissal, focus rings |

---

## Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React.js 18** | Reusable component-based UI and reactive lifecycle |
| **Vite 5** | High-performance build tool and rapid development server |
| **JavaScript (ES6+)** | Modern functional programming logic and data transformations |
| **CSS3** | Custom design system using CSS variables, flexbox, and CSS grid |
| **React Hooks** | `useState`, `useEffect`, `useMemo`, `useRef`, and custom `useLocalStorage` |
| **Lucide React** | Clean, accessible vector icons |
| **HTML5** | Semantic structure (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`) |
| **LocalStorage** | Browser-side client data persistence |

*Note: In accordance with the assignment guidelines, no unnecessary heavyweight state libraries (e.g. Redux) or backend servers are used, keeping the project lightweight, fast, and maintainable.*

---

## Project Folder Structure

```
focusboard/
├── public/
├── src/
│   ├── assets/                      # Static assets and icons
│   ├── components/
│   │   ├── DeleteConfirmModal.jsx   # Deletion confirmation dialog
│   │   ├── FilterTabs.jsx           # Status tabs, priority & category dropdowns
│   │   ├── FocusNotes.jsx           # 3-slide productivity carousel
│   │   ├── Header.jsx               # Greeting, date, and primary actions
│   │   ├── SearchBar.jsx            # Real-time search with clear button
│   │   ├── Sidebar.jsx              # App branding, navigation, and mobile drawer
│   │   ├── StatCard.jsx             # Reusable individual statistic card component
│   │   ├── TaskCard.jsx             # Individual task row/card with inline status selector
│   │   ├── TaskForm.jsx             # Reusable Create/Edit task modal with validation
│   │   └── TaskList.jsx             # Task list container with contextual empty states
│   ├── data/
│   │   └── sampleTasks.js           # 7 realistic initial tasks across categories
│   ├── hooks/
│   │   └── useLocalStorage.js       # Resilient localStorage synchronization hook
│   ├── App.jsx                      # State management, filtering, and layout orchestration
│   ├── main.jsx                     # React DOM entry point
│   └── index.css                    # Complete human-designed CSS design system
├── scripts/
│   └── verify-focusboard.js         # Automated logic verification test suite
├── screenshots/
│   └── README.md                    # Visual submission guidelines for 1440px/768px/390px
├── .gitignore                       # Git ignore rules for node_modules and dist
├── package.json                     # Scripts and dependencies
├── vite.config.js                   # Vite configuration
├── README.md                        # Complete project implementation guide
└── AI_USAGE.md                      # AI assistance disclosure
```

---

## State Management Architecture

### Approach Selected: React Functional Components + Hooks
We chose standard React Hooks (`useState`, `useMemo`, `useEffect`, and custom hooks) because they offer optimal reactivity, zero bundle bloat, predictable single-directional data flow, and transparent maintainability without the overengineering of Redux.

### How State is Maintained and Flows:
1. **Primary Source of Truth (`tasks`)**:
   Maintained in `App.jsx` via the `useLocalStorage` hook. All CRUD actions operate on this single dataset, ensuring that statistics, filter tabs, search, and list views remain strictly in sync.
2. **Derived Statistics (Never Hardcoded)**:
   Calculated using `useMemo` whenever `tasks` changes:
   - **Total Tasks**: `tasks.length`
   - **In Progress**: `tasks.filter(t => t.status === 'In progress').length`
   - **Completed**: `tasks.filter(t => t.status === 'Completed').length`
   - **Pending (To do)**: `tasks.filter(t => t.status === 'To do').length`
   - **Completion %**: $\frac{\text{Completed}}{\text{Total}} \times 100$ (with guard against division by zero when tasks list is empty).
3. **Multi-Facet Filtering Engine**:
   `filteredTasks` is computed dynamically from `tasks` by intersecting:
   - `searchQuery`: Case-insensitive substring match against task `title` and `description`.
   - `statusFilter`: Matches selected status (`all`, `To do`, `In progress`, `Completed`).
   - `priorityFilter`: Matches selected priority (`all`, `High`, `Medium`, `Low`).
   - `categoryFilter`: Matches selected category (`all`, `Engineering`, `Design`, etc.).
4. **CRUD State Transitions**:
   - **Create**: Prepends new task object with timestamp and generated ID (`task-${Date.now()}`).
   - **Read**: Renders `filteredTasks` through `TaskList` and `TaskCard`.
   - **Update**: Replaces target task by ID while preserving created date and unique ID.
   - **Delete**: Removes task by ID following confirmation via `DeleteConfirmModal`.
   - **Status Toggle**: One-click completion flips between `Completed` and `To do`, or direct selection via inline status menu.
5. **Carousel State**:
   Maintained independently inside `FocusNotes.jsx` via `currentSlide` index (0 to 2) with modulo wrap-around logic for seamless circular navigation.

---

## LocalStorage Persistence Implementation

- **Storage Key**: `focusboard_tasks` (consistent with assignment recommendations).
- **Startup Logic**:
  1. Checks `localStorage.getItem('focusboard_tasks')`.
  2. If data exists, parses JSON safely.
  3. If no saved data exists (first-time visitor), falls back to `INITIAL_TASKS` (7 sample tasks).
  4. If stored data is corrupted or non-array, catches the exception and resets gracefully.
- **Sync on Mutation**: A React `useEffect` inside `useLocalStorage` serializes the current `tasks` state whenever it changes.
- **No Overwrite on Refresh**: Existing user data is never overwritten with sample tasks on subsequent browser reloads.

---

## Installation & Local Setup

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or pnpm

### Commands
```bash
# 1. Clone repository or navigate to directory
cd "Job Project"

# 2. Install dependencies
npm install

# 3. Run the automated verification test suite
npm test

# 4. Start the local development server
npm run dev
```

Open your browser to `http://localhost:5173`.

### Production Build
```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## Responsive Design & Breakpoints

FocusBoard is fully responsive across three core viewports:

1. **Desktop (1440 × 1000)**:
   - Sticky side navigation (250px) alongside main workspace (max-width 980px).
   - 4-column compact statistics row.
   - Horizontal status filter tabs and dropdown controls.
2. **Tablet (768px)**:
   - 2-column statistics grid.
   - Filter tabs and selectors wrap gracefully without horizontal collision.
3. **Mobile (390 × 1128 / iPhone)**:
   - Collapsible slide-over drawer navigation triggered by mobile header button.
   - Stacked single-column statistics cards.
   - Touch-friendly action buttons (minimum 44px touch targets).
   - Fluid modal dialogues that fit within small mobile viewports.

---

## Accessibility & Usability

- **Semantic Tags**: Uses `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<button>`, and `<dialog>` semantics.
- **Accessible Forms**: Explicit `<label htmlFor="...">` bindings on all form inputs.
- **Keyboard Shortcuts**: `Escape` key dismisses modals; form can be submitted with `Enter`.
- **Visible Focus Rings**: Distinct `outline: 2px solid #2D4B3E` with `outline-offset: 1px`.
- **Color Contrast**: All text conforms to WCAG 2.1 AA standards (dark charcoal `#191816` on warm off-white `#FBFBFA`). Status is indicated by both color and text labels.

---

## Deployment Guide (Vercel / Netlify)

FocusBoard is ready for one-click deployment:

### Deploying to Vercel
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import the `focusboard` repository.
4. Build settings will auto-detect Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**. Your app will be live with a secure HTTPS URL.

### Deploying to Netlify
1. Log in to [netlify.com](https://www.netlify.com/).
2. Select **"Add new site"** > **"Import an existing project"** > **GitHub**.
3. Set Build command to `npm run build` and Publish directory to `dist`.
4. Click **Deploy FocusBoard**.

---

## GitHub Repository Instructions

To push the project to your GitHub account:

```bash
# Initialize git repository
git init

# Stage all files
git add .

# Create initial commit
git commit -m "Initial FocusBoard implementation"

# Set default branch to main
git branch -M main

# Link to your remote GitHub repository
git remote add origin https://github.com/<your-username>/focusboard.git

# Push code
git push -u origin main
```

---

## Known Limitations & Future Extensions
- **Attachments**: The task data model supports links in descriptions; file attachment uploads can be connected to S3 presigned URLs in future iterations.
- **Drag-and-Drop Kanban**: A future release could introduce a Kanban board view toggle alongside the current list view.
