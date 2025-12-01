/**
 * useTheme Hook
 *
 * Manages dark/light theme with localStorage persistence and system preference fallback.
 * Prevents hydration mismatches by initializing theme before first render.
 */

import { useState, useEffect } from "react";

// Get initial theme before component mounts (prevents flash)
const getInitialTheme = () => {
  // 1. Check localStorage first
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    // 2. Fallback to system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  }

  // 3. Default to dark (matches portfolio aesthetic)
  return "dark";
};

// Apply theme to document (can be called before React renders)
const applyTheme = (theme) => {
  if (typeof window !== "undefined") {
    const root = document.documentElement;

    // Remove both classes first
    root.classList.remove("light", "dark");

    // Add the new theme class
    root.classList.add(theme);

    // Update data attribute for additional styling options
    root.setAttribute("data-theme", theme);
  }
};

export const useTheme = () => {
  // Initialize with the pre-computed theme (prevents flash)
  const [theme, setTheme] = useState(() => getInitialTheme());

  // Apply theme on mount and when it changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      return newTheme;
    });
  };

  const setSpecificTheme = (newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      setTheme(newTheme);
    }
  };

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
};

// Initialize theme BEFORE React renders (prevents flash of wrong theme)
if (typeof window !== "undefined") {
  applyTheme(getInitialTheme());
}
