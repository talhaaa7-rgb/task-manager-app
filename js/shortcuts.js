// Registers all keyboard shortcuts for the app.
// Takes a set of callback functions so this file has zero knowledge of
// how those actions are implemented — just when to trigger them.
export function initShortcuts({ onNewTask, onFocusSearch, onEscape, onToggleTheme }) {
  document.addEventListener("keydown", (e) => {
    // Ignore shortcuts while the user is actively typing in a field,
    // EXCEPT Escape, which should always work (e.g. to unfocus).
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);

    if (e.key === "Escape") {
      onEscape();
      return;
    }

    if (isTyping) return;

    switch (e.key) {
      case "n":
        e.preventDefault();
        onNewTask();
        break;
      case "/":
        e.preventDefault();
        onFocusSearch();
        break;
      case "d":
        onToggleTheme();
        break;
    }
  });
}