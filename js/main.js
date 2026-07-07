import { getAllTasks, addTask, deleteTask, toggleTaskStatus } from "./taskService.js";
import { validateTask, isDuplicate } from "./taskModel.js";
import { renderTasks } from "./render.js";

const form = document.getElementById("task-form");
const titleInput = document.getElementById("title-input");
const descInput = document.getElementById("desc-input");
const priorityInput = document.getElementById("priority-input");
const errorEl = document.getElementById("form-error");

// Re-renders the task list from current storage state.
function refresh() {
  const tasks = getAllTasks();
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

// Initial render on page load.
refresh();