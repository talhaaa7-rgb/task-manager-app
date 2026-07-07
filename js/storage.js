const STORAGE_KEY = "tasks";

// Reads tasks array from localStorage. Returns [] if nothing saved yet.
export function getTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Overwrites localStorage with the given tasks array.
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}