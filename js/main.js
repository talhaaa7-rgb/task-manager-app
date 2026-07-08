
import { getAllTasks, addTask, deleteTask, toggleTaskStatus } from "./taskService.js";
import { validateTask, isDuplicate } from "./taskModel.js";
import { renderTasks } from "./render.js";
import { filterByStatus, filterByPriority, sortTasks } from "./filterSort.js";
import { searchTasks } from "./search.js";
import { initTheme, toggleTheme } from "./theme.js";

const form = document.getElementById("task-form");
const titleInput = document.getElementById("title-input");
const descInput = document.getElementById("desc-input");
const priorityInput = document.getElementById("priority-input");
const errorEl = document.getElementById("form-error");

const searchInput = document.getElementById("search-input");
const filterStatus = document.getElementById("filter-status");
const filterPriority = document.getElementById("filter-priority");
const sortSelect = document.getElementById("sort-select");
const themeToggleBtn = document.getElementById("theme-toggle");

// Runs the full pipeline: search -> filter by status -> filter by priority -> sort.
// Order matters: narrow down with search/filters FIRST, then sort what's left —
// sorting everything before filtering would waste work on tasks we're about to drop.
function getVisibleTasks() {
  let tasks = getAllTasks();
  tasks = searchTasks(tasks, searchInput.value);
  tasks = filterByStatus(tasks, filterStatus.value);
  tasks = filterByPriority(tasks, filterPriority.value);
  tasks = sortTasks(tasks, sortSelect.value);
  return tasks;
}

// Re-renders the task list using the current search/filter/sort state.
function refresh() {
  const tasks = getVisibleTasks();
  renderTasks(tasks, {
    onToggle: (id) => { toggleTaskStatus(id); refresh(); },
    onDelete: (id) => { deleteTask(id); refresh(); }
  });
}

// Handles the "Add Task" form submission.
function handleSubmit(e) {
  e.preventDefault();
  errorEl.textContent = "";

  const taskData = {
    title: titleInput.value,
    description: descInput.value,
    priority: priorityInput.value
  };

  const error = validateTask(taskData);
  if (error) {
    errorEl.textContent = error;
    return;
  }

  if (isDuplicate(getAllTasks(), taskData.title)) {
    errorEl.textContent = "A task with this title already exists.";
    return;
  }

  addTask(taskData);
  form.reset();
  refresh();
}

form.addEventListener("submit", handleSubmit);
searchInput.addEventListener("input", refresh);
filterStatus.addEventListener("change", refresh);
filterPriority.addEventListener("change", refresh);
sortSelect.addEventListener("change", refresh);

themeToggleBtn.addEventListener("click", () => {
  const newTheme = toggleTheme();
  themeToggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// Initial setup on page load.
initTheme();
refresh();