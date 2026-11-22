# AI Usage Disclosure

## Project: FocusBoard
**Candidate Assignment**: MobileFirst Task Management Application  
**Assistance Tool**: Antigravity (Google DeepMind) in collaboration with the Developer.

---

## 1. Tools Used
- **Antigravity AI (Google DeepMind)**: Architecture planning, component structuring, initial CSS design tokens, and automated test scripting.

---

## 2. Representative Prompts
Below are representative prompts used during the development of FocusBoard:

1. *"Build FocusBoard – a complete, functional and responsive task management web application using React.js, Vite, JavaScript and CSS following the human-designed design philosophy (avoid generic AI dashboard layouts, excessive gradients, glassmorphism, oversized cards, and emojis as UI icons)."*
2. *"Design a warm off-white and dark charcoal CSS color system inspired by Linear and Notion with muted forest green (#2D4B3E), terracotta, and warm amber accents."*
3. *"Implement a custom useLocalStorage hook in React that handles JSON parsing safely, recovers from corrupted data gracefully, and ensures initial sample data does not overwrite saved user tasks on refresh."*
4. *"Create a reusable TaskForm component for both Create and Edit operations with required title and due date validation and Escape key dismissal."*
5. *"Write an automated Node.js test script to verify dynamic statistics recalculation, multi-facet filtering, status transitions, and form validation."*

---

## 3. AI-Assisted Areas
- **Project Scaffolding**: Setup of Vite React project structure, component breakdown, and `.gitignore`.
- **CSS Design System**: Creation of `--bg-canvas`, `--text-main`, and responsive CSS media queries for desktop (1440px), tablet (768px), and mobile (390px).
- **Carousel Component**: Implementation of circular navigation and active indicator controls in `FocusNotes.jsx`.
- **Sample Data**: Generating 7 realistic engineering, design, and product tasks rather than generic placeholder text.

---

## 4. Verified, Corrected, or Rejected Suggestions

### Suggestion 1: StatCard Component Architecture
- **Initial Suggestion**: Initially, the statistics grid was rendered as a single component that generated all four metric cards internally.
- **Developer Review & Correction**: The assignment rubric explicitly required: *"Create a reusable StatCard.jsx component. Pass the card title, value and icon as component properties (props). Create separate cards for each statistic."*
- **Action Taken**: Refactored `StatCard.jsx` into a standalone, reusable component that accepts `title`, `value`, `icon`, `sublabel`, `accent`, and `isProgress` props. Instantiated four distinct `<StatCard ... />` elements in `App.jsx`, ensuring alignment with the evaluation criteria.

### Suggestion 2: Carousel Auto-Advance Behavior
- **Initial Suggestion**: Auto-advancing the Focus Notes carousel every few seconds with a timer.
- **Developer Review & Correction**: The assignment specification in Step 7 noted: *"Automatic carousel rotation is not required. Manual previous/next navigation is sufficient."*
- **Action Taken**: Removed timer dependence in favor of clean manual navigation via previous/next buttons and clickable slide indicators, preventing accessibility issues and unexpected layout shifting for readers.

### Suggestion 3: Form Field Due Date Validation
- **Initial Suggestion**: Only validating the `title` field while treating `dueDate` as optional.
- **Developer Review & Correction**: Inspected Step 8 of the implementation specification table, which designates `Due date | Date picker | Required? Yes`.
- **Action Taken**: Updated `TaskForm.jsx` to validate that a valid due date is selected upon submission, displaying an inline error message if missing.

---

## 5. Candidate Understanding & Ownership
The codebase was verified using an automated test suite (`npm test`) and compiled via Vite (`npm run build`). All component responsibilities, state transformations, and styling rules have been reviewed and verified.
