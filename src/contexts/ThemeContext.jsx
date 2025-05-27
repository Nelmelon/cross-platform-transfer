import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  // Add more themes here in the future
  // BLUE: 'blue',
  // PURPLE: 'purple',
};

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved && Object.values(THEMES).includes(saved)) {
      return saved;
    }
    // Default to system preference for dark/light
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  });

  useEffect(() => {
    // Remove all theme classes first
    Object.values(THEMES).forEach(theme => {
      document.documentElement.classList.remove(theme);
    });
    // Add dark class when theme is dark
    if (currentTheme === THEMES.DARK) {
      document.documentElement.classList.add('dark');
    }
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme) => {
    if (Object.values(THEMES).includes(theme)) {
      setCurrentTheme(theme);
    }
  };

  const value = {
    currentTheme,
    setTheme,
    THEMES
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 