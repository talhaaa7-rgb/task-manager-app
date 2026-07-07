// Creates a new task object with a unique id and timestamp.
export function createTask({ title, description, priority }) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    description: description.trim(),
    priority,
    status: "pending", // pending | done
    createdAt: Date.now()
  };
}

// Returns an error string if invalid, or null if the task is valid.
export function validateTask({ title }) {
  if (!title || title.trim().length === 0) {
    return "Title cannot be empty.";
  }
  if (title.trim().length > 100) {
    return "Title is too long (max 100 characters).";
  }
  return null;
}

// Checks if a task with the same title (case-insensitive) already exists.
export function isDuplicate(tasks, title) {
  return tasks.some(
    (t) => t.title.toLowerCase() === title.trim().toLowerCase()
  );
}