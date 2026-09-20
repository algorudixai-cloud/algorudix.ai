import React, { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggleSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If clicked via keyboard or edge cases without coordinates, calculate from button center
    let eventToPass = e;
    if (e.clientX === 0 && e.clientY === 0 && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const synthEvent = {
        ...e,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      } as React.MouseEvent<HTMLButtonElement>;
      eventToPass = synthEvent;
    }

    toggleTheme(eventToPass);
  };

  return (
    <button
      ref={switchRef}
      id="theme-toggle-btn"
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Currently in ${isDark ? 'Dark' : 'Light'} Mode. Click to switch.`}
      onClick={handleClick}
      className={`group relative inline-flex h-7 w-[52px] shrink-0 cursor-pointer items-center rounded-full p-0.5 border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 active:scale-95 ${
        isDark
          ? 'bg-[#18181b] border-zinc-700/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5),0_0_8px_rgba(139,92,246,0.2)]'
          : 'bg-slate-200/90 border-slate-300/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_0_8px_rgba(245,158,11,0.2)]'
      }`}
    >
      {/* Track Background Visual Hints (Subtle Sun on left, Moon on right) */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none select-none text-[10px]">
        {/* Subtle Sun Icon on Light side */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`w-3 h-3 transition-opacity duration-300 ${
            isDark ? 'text-zinc-600 opacity-40' : 'text-amber-500/30 opacity-0'
          }`}
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        {/* Subtle Moon Icon on Dark side */}
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-2.5 h-2.5 transition-opacity duration-300 ${
            isDark ? 'text-indigo-400/30 opacity-0' : 'text-slate-400 opacity-50'
          }`}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Sliding Knob with Sun/Moon Morph */}
      <span
        className={`pointer-events-none relative flex h-[22px] w-[22px] items-center justify-center rounded-full shadow-md transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? 'translate-x-[24px] bg-[#27272a] text-indigo-300 border border-indigo-500/40 shadow-indigo-950/40'
            : 'translate-x-0 bg-white text-amber-500 border border-amber-200/60 shadow-slate-300'
        }`}
      >
        {/* Sun / Moon Morphing Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: isDark ? 'rotate(40deg)' : 'rotate(0deg)',
          }}
        >
          {/* Mask that cuts into the center circle to form the crescent moon */}
          <mask id="theme-morph-mask">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <circle
              cx={isDark ? '17' : '28'}
              cy={isDark ? '7' : '-4'}
              r="7"
              fill="black"
              className="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            />
          </mask>

          {/* Central Sun / Moon Body */}
          <circle
            cx="12"
            cy="12"
            r={isDark ? '7.5' : '4.5'}
            fill="currentColor"
            mask="url(#theme-morph-mask)"
            className="transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          />

          {/* Sun Rays (Shrink & fade out in Dark Mode, expand in Light Mode) */}
          <g
            className={`transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isDark ? 'opacity-0 scale-50 -rotate-90' : 'opacity-100 scale-100 rotate-0'
            }`}
            style={{ transformOrigin: '12px 12px' }}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </span>
    </button>
  );
};
