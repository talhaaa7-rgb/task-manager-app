import { getAllTasks, addTask, deleteTask, toggleTaskStatus, updateTask } from "./taskService.js";
import { validateTask, isDuplicate } from "./taskModel.js";
import { renderTasks, renderEditForm } from "./render.js";
import { filterByStatus, filterByPriority, sortTasks } from "./filterSort.js";
import { searchTasks } from "./search.js";
import { initTheme, toggleTheme } from "./theme.js";
import { initShortcuts } from "./shortcuts.js";
import { debounce } from "./debounce.js";
import { renderProgress } from "./progress.js";

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
const listEl = document.getElementById("task-list");

// Runs the full pipeline: search -> filter by status -> filter by priority -> sort.
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
  const allTasks = getAllTasks();
  const visible = getVisibleTasks();
  renderTasks(visible, {}, allTasks.length > 0);
  renderProgress(allTasks);
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

// EVENT DELEGATION: one listener on the parent list handles clicks
// for EVERY task, current and future — instead of attaching a new
// listener to each task div every time we render. This scales better
// and avoids leaking listeners as tasks are added/removed.
listEl.addEventListener("click", (e) => {
  const button = e.target.closest("button[data-action]");
  if (!button) return;

  const taskEl = button.closest(".task-item");
  const taskId = taskEl?.dataset.id;
  const action = button.dataset.action;

  if (action === "toggle") {
    toggleTaskStatus(taskId);
    refresh();
  }

  if (action === "delete") {
    deleteTask(taskId);
    refresh();
  }

  if (action === "edit") {
    const task = getAllTasks().find((t) => t.id === taskId);
    renderEditForm(
      taskEl,
      task,
      (newTitle, newDesc) => {
        const error = validateTask({ title: newTitle });
        if (error) {
          alert(error); // simple feedback for now — could be improved later
          return;
        }
        updateTask(taskId, { title: newTitle.trim(), description: newDesc.trim() });
        refresh();
      },
      () => refresh() // cancel just re-renders to discard the edit form
    );
  }
});

form.addEventListener("submit", handleSubmit);

// Debounced so we only re-filter after the user pauses typing (150ms),
// not on every single keystroke — cheap here, but the habit matters
// as task lists grow.
searchInput.addEventListener("input", debounce(refresh, 150));

filterStatus.addEventListener("change", refresh);
filterPriority.addEventListener("change", refresh);
sortSelect.addEventListener("change", refresh);

themeToggleBtn.addEventListener("click", () => {
  const newTheme = toggleTheme();
  themeToggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// Wire up keyboard shortcuts:
// n = focus the title input to start a new task
// / = focus the search box
// Escape = blur whatever input is focused (dismiss without submitting)
// d = toggle theme
initShortcuts({
  onNewTask: () => titleInput.focus(),
  onFocusSearch: () => searchInput.focus(),
  onEscape: () => document.activeElement.blur(),
  onToggleTheme: () => themeToggleBtn.click()
});

// Initial setup on page load.
initTheme();
refresh();