import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const THEME_STORAGE_KEY = 'algorudix-theme-mode';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      if (typeof window !== 'undefined') {
        // Clear any old test keys to ensure white/light is the clean default
        if (localStorage.getItem('algorudix-theme')) {
          localStorage.removeItem('algorudix-theme');
        }
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        if (savedTheme === 'dark') {
          return 'dark';
        }
      }
    } catch (err) {
      console.warn('localStorage not accessible:', err);
    }
    // Default theme is white (light mode)
    return 'light';
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (err) {
      console.warn('Failed to persist theme:', err);
    }
  }, [theme]);

  const toggleTheme = (event?: React.MouseEvent) => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';

    // View Transitions API check
    const doc = document as any;
    if (
      typeof window !== 'undefined' &&
      doc.startViewTransition &&
      event &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        setThemeState(nextTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 480,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
      return;
    }

    // Graceful fallback for browsers without View Transitions API
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 500);
    }

    setThemeState(nextTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
