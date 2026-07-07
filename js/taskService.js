import { getTasks, saveTasks } from "./storage.js";
import { createTask } from "./taskModel.js";

// Returns all tasks currently saved.
export function getAllTasks() {
  return getTasks();
}

// Adds a new task to storage and returns the updated list.
export function addTask(taskData) {
  const tasks = getTasks();
  const newTask = createTask(taskData);
  tasks.push(newTask);
  saveTasks(tasks);
  return tasks;
}

// Updates an existing task by id with the given changes.
export function updateTask(id, changes) {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return tasks; // task not found, no-op
  tasks[index] = { ...tasks[index], ...changes };
  saveTasks(tasks);
  return tasks;
}

// Removes a task by id and returns the updated list.
export function deleteTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
  return tasks;
}

// Toggles a task's status between pending and done.
export function toggleTaskStatus(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return tasks;
  task.status = task.status === "done" ? "pending" : "done";
  saveTasks(tasks);
  return tasks;
}