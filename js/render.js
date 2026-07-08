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
    div.dataset.priority = task.priority;
    div.dataset.id = task.id; // used for event delegation lookups

    div.innerHTML = `
      <strong class="task-title">${task.title}</strong> (${task.priority})
      <p class="task-desc">${task.description}</p>
      <button data-action="toggle">${task.status === "done" ? "Undo" : "Complete"}</button>
      <button data-action="edit">Edit</button>
      <button data-action="delete">Delete</button>
    `;

    listEl.appendChild(div);
  });
}

// Turns a single task card into an inline edit form.
// Called when the user clicks "Edit" on that task.
export function renderEditForm(taskEl, task, onSave, onCancel) {
  taskEl.innerHTML = `
    <input type="text" class="edit-title" value="${task.title}" />
    <textarea class="edit-desc">${task.description}</textarea>
    <button data-action="save">Save</button>
    <button data-action="cancel">Cancel</button>
  `;

  taskEl.querySelector('[data-action="save"]').addEventListener("click", () => {
    const newTitle = taskEl.querySelector(".edit-title").value;
    const newDesc = taskEl.querySelector(".edit-desc").value;
    onSave(newTitle, newDesc);
  });

  taskEl.querySelector('[data-action="cancel"]').addEventListener("click", onCancel);
}