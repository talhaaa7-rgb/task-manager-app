// Delays calling `fn` until `delay` ms have passed since the LAST call.
// Used on the search input so we don't re-filter/re-render on every
// single keystroke — only after the user pauses typing.
export function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}