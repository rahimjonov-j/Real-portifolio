"use client";

function getNextTheme() {
  return document.documentElement.classList.contains("dark") ? "light" : "dark";
}

function applyTheme(theme: "dark" | "light") {
  const root = document.documentElement;

  root.classList.add("theme-changing");
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);

  window.setTimeout(() => {
    root.classList.remove("theme-changing");
  }, 80);
}

export function ThemeToggle() {
  function handleClick() {
    applyTheme(getNextTheme());
  }

  return (
    <button
      aria-label="Dark yoki light mode"
      className="fixed right-5 bottom-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#dbe4ef] bg-white/90 text-[1.15rem] text-[#111827] shadow-[0_14px_34px_rgba(15,23,42,0.18)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#f8fafc] active:scale-95 dark:border-[#243142] dark:bg-[#111827]/90 dark:text-white dark:shadow-[0_14px_34px_rgba(0,0,0,0.35)] dark:hover:bg-[#172033]"
      onClick={handleClick}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="size-5 dark:hidden"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M20.4 15.4A8.4 8.4 0 0 1 8.6 3.6 8.8 8.8 0 1 0 20.4 15.4Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="hidden size-5 dark:block"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 4V2M12 22v-2M4 12H2M22 12h-2M18.4 5.6 17 7M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
