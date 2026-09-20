import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

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
        const savedTheme = localStorage.getItem('algorudix-theme') as Theme | null;
        if (savedTheme === 'light' || savedTheme === 'dark') {
          return savedTheme;
        }
      }
    } catch (err) {
      console.warn('localStorage not accessible:', err);
    }
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
      localStorage.setItem('algorudix-theme', theme);
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
        const isToDark = nextTheme === 'dark';
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath: isToDark ? clipPath : [...clipPath].reverse(),
          },
          {
            duration: 450,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: isToDark
              ? '::view-transition-new(root)'
              : '::view-transition-old(root)',
          }
        );
      });
      return;
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
