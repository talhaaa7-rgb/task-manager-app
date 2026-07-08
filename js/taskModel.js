// Generates a unique-enough ID without relying on crypto.randomUUID(),
// which only works in secure contexts (https or localhost) — it fails
// silently on http://<local-ip> when testing on a phone over WiFi.
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createTask({ title, description, priority }) {
  return {
    id: generateId(),
    title: title.trim(),
    description: description.trim(),
    priority,
    status: "pending",
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