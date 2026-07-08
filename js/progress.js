// Calculates and renders the task completion percentage bar.
// Takes the FULL task list (not the filtered/visible one) so the
// percentage always reflects true overall progress, not just what's
// currently shown after search/filtering.
export function renderProgress(allTasks) {
  const fillEl = document.getElementById("progress-fill");
  const labelEl = document.getElementById("progress-label");

  if (allTasks.length === 0) {
    fillEl.style.width = "0%";
    labelEl.textContent = "No tasks yet";
    return;
  }

  const doneCount = allTasks.filter((t) => t.status === "done").length;
  const percent = Math.round((doneCount / allTasks.length) * 100);

  fillEl.style.width = `${percent}%`;
  labelEl.textContent = `${percent}% complete (${doneCount}/${allTasks.length})`;
}