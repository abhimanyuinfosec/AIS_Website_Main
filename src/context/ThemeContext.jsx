import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Dark theme is disabled — always light
  const theme = 'light';
  const isDark = false;
  const toggleTheme = () => {}; // no-op: dark mode is disabled

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('light');
    root.classList.remove('dark');
    // Clear any saved dark preference
    try {
      localStorage.removeItem('ais_theme');
    } catch {
      // ignore
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light',
      isDark: false,
      toggleTheme: () => {},
    };
  }
  return context;
};

export default ThemeContext;
