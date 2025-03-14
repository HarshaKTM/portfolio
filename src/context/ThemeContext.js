import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('');
  const [mounted, setMounted] = useState(false);

  // Initial setup - only run on client-side
  useEffect(() => {
    setMounted(true);
    
    // Get saved theme from localStorage or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply theme immediately
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Apply theme function to ensure consistent application
  const applyTheme = (newTheme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Remove both theme classes
      root.classList.remove('light', 'dark');
      
      // Add the new theme class
      root.classList.add(newTheme);
      
      // Store in localStorage
      localStorage.setItem('theme', newTheme);
      
      // Optional: change meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          newTheme === 'dark' ? '#111827' : '#f9fafb'
        );
      }
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Provide context values
  const contextValue = {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme,
    mounted
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 