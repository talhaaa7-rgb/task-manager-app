const listEl = document.getElementById("task-list");

// Renders the given array of tasks into the DOM.
// Shows an empty-state message if the array is empty.
export function renderTasks(tasks, handlers) {
  listEl.innerHTML = "";

  if (tasks.length === 0) {
    listEl.innerHTML = `<p class="empty-state">No tasks yet. Add one above!</p>`;
    return;
  }

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = `task-item ${task.status === "done" ? "done" : ""}`;
    div.innerHTML = `
      <strong>${task.title}</strong> (${task.priority})
      <p>${task.description}</p>
      <button data-action="toggle">${task.status === "done" ? "Undo" : "Complete"}</button>
      <button data-action="delete">Delete</button>
    `;

    // Event delegation-friendly: attach handlers directly per button here.
    div.querySelector('[data-action="toggle"]').addEventListener("click", () => handlers.onToggle(task.id));
    div.querySelector('[data-action="delete"]').addEventListener("click", () => handlers.onDelete(task.id));

    listEl.appendChild(div);
  });
}