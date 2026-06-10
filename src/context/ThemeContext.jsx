"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    // Apply theme data attribute to body
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Auto-change theme every 3 minutes (180,000 ms)
  useEffect(() => {
    const themes = ["default", "cryo", "monsoon", "aurora"];
    const interval = setInterval(() => {
      setTheme((prevTheme) => {
        const currentIndex = themes.indexOf(prevTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        return themes[nextIndex];
      });
    }, 3 * 60 * 1000); // 3 minutes
    
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
