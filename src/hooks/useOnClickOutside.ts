export function useOnClickOutSide(callback: () => any, elementId: string) {
  if (process.browser) {
    const element = document.getElementById(elementId);

    if (element) {
      document.addEventListener("click", (e) => {
        if (!element.contains(e.target as Node)) callback();
      });
    }
  }
}
