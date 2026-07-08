# Task Manager

A vanilla JavaScript task management application built from scratch — no frameworks, no libraries. Built as a 3-day learning project to practice CRUD operations, DOM manipulation, localStorage persistence, and modular JS architecture.

**Live demo:** https://talhaaa7-rgb.github.io/task-manager-app/

## Features

- **Create, read, update, delete** tasks with title, description, and priority
- **Form validation** — rejects empty/whitespace-only titles, enforces max length
- **Duplicate prevention** — blocks adding a task with a title that already exists (case-insensitive)
- **Search** — live, debounced search across task titles and descriptions
- **Filters** — by status (pending/done) and priority (low/medium/high)
- **Sorting** — newest, oldest, priority, or alphabetical
- **Dark/light theme** — toggle with persistence across page reloads
- **Keyboard shortcuts:**
  - `n` — focus the new task title field
  - `/` — focus the search field
  - `d` — toggle theme
  - `Esc` — blur the currently focused input
- **Task completion progress bar** — live percentage of completed vs total tasks
- **localStorage persistence** — tasks and theme preference survive page reloads
- **Empty states** — distinct messages for "no tasks yet" vs "no tasks match your filters"
- **Responsive layout** — usable on both desktop and mobile

## Project Structure

```
task-manager-app/
│
├── index.html
├── css/
│   └── style.css
│
└── js/
    ├── storage.js       # localStorage read/write — the only file that touches localStorage
    ├── taskModel.js     # task shape, ID generation, validation, duplicate checking
    ├── taskService.js   # CRUD operations (add, update, delete, toggle status)
    ├── filterSort.js    # pure functions for filtering and sorting tasks
    ├── search.js        # search/query matching logic
    ├── render.js         # DOM rendering for the task list and inline edit form
    ├── progress.js       # calculates and renders the completion percentage bar
    ├── theme.js          # dark/light theme logic and persistence
    ├── shortcuts.js      # keyboard shortcut handling
    ├── debounce.js       # generic debounce utility (used by search)
    └── main.js           # entry point — wires all modules together
```

Each module has a single responsibility, so each piece can be understood and explained independently of the others.

## Running Locally

This app uses native ES modules (`import`/`export`), which require a real server — opening `index.html` directly via `file://` will not work.

1. Clone the repo:
   ```bash
   git clone https://github.com/talhaaa7-rgb/task-manager-app.git
   ```
2. Open the folder in VS Code
3. Install the **Live Server** extension (if not already installed)
4. Right-click `index.html` → **Open with Live Server**
5. The app will open at `http://127.0.0.1:5500`

## Notable Implementation Details

- **Event delegation:** the task list uses a single click listener on the parent container rather than attaching listeners to every task/button individually — this avoids listener buildup as tasks are added, edited, and removed.
- **Debounced search:** search input is debounced (150ms) so filtering doesn't re-run on every keystroke.
- **ID generation:** task IDs are generated with a timestamp + random string combination rather than `crypto.randomUUID()`, since the latter only works in secure contexts (HTTPS or localhost) and fails silently when testing over a local network IP (e.g. from a phone on the same WiFi).
- **Theme persistence:** the selected theme is stored in localStorage and applied via a `data-theme` attribute on `<html>`, with CSS custom properties (`--bg`, `--text`, etc.) driving the actual color values.

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, CSS grid, animations)
- Vanilla JavaScript (ES modules, no frameworks or build tools)
- Browser localStorage API