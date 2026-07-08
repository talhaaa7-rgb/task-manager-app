// Filters tasks by status. "all" returns everything unchanged.
export function filterByStatus(tasks, status) {
  if (status === "all") return tasks;
  return tasks.filter((t) => t.status === status);
}

// Filters tasks by priority. "all" returns everything unchanged.
export function filterByPriority(tasks, priority) {
  if (priority === "all") return tasks;
  return tasks.filter((t) => t.priority === priority);
}

// Sorts tasks based on the given key: "newest", "oldest", "priority", "az".
// Returns a NEW array — never mutates the original (important for predictable state).
export function sortTasks(tasks, sortBy) {
  const sorted = [...tasks];
  const priorityOrder = { high: 0, medium: 1, low: 2 };

  switch (sortBy) {
    case "newest":
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    case "oldest":
      return sorted.sort((a, b) => a.createdAt - b.createdAt);
    case "priority":
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case "az":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
}