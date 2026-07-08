// Returns tasks whose title or description contains the query (case-insensitive).
// Empty query returns all tasks unchanged.
export function searchTasks(tasks, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return tasks;

  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(trimmed) ||
      t.description.toLowerCase().includes(trimmed)
  );
}