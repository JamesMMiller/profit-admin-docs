(() => {
  const root = document.documentElement;
  const stored = (() => {
    try {
      return localStorage.getItem("pa-docs-theme");
    } catch {
      return null;
    }
  })();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (prefersDark ? "dark" : "light");
  root.dataset.theme = theme;

  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("pa-docs-theme", next);
      } catch {
        /* ignore */
      }
      if (document.querySelector(".mermaid")) {
        window.location.reload();
      }
    });
  }

  if (window.mermaid) {
    window.mermaid.initialize({
      startOnLoad: true,
      securityLevel: "strict",
      theme: root.dataset.theme === "light" ? "neutral" : "dark",
    });
  }
})();
