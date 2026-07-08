const listEl = document.getElementById("task-list");

// Renders the given array of tasks into the DOM.
// hasAnyTasks tells us whether the FULL list is empty vs just the filtered view.
export function renderTasks(tasks, handlers, hasAnyTasks = true) {
  listEl.innerHTML = "";

  if (tasks.length === 0) {
    const message = hasAnyTasks
      ? "No tasks match your search/filters."
      : "No tasks yet. Add one above!";
    listEl.innerHTML = `<p class="empty-state">${message}</p>`;
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

    div.querySelector('[data-action="toggle"]').addEventListener("click", () => handlers.onToggle(task.id));
    div.querySelector('[data-action="delete"]').addEventListener("click", () => handlers.onDelete(task.id));

    listEl.appendChild(div);
  });
}