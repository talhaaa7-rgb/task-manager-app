const THEME_KEY = "theme";

// Applies the given theme ("light" or "dark") to the document.
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

// Reads saved theme from localStorage (defaults to "light") and applies it.
// Call this once on page load.
export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(saved);
}

// Flips the current theme, saves it, and re-applies it.
export function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || "light";
  const next = current === "light" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
  return next;
}