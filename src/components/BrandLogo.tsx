import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'w-full h-full object-contain',
  size,
  glow = true,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <img
      src="/assets/brand/logo-transparent.png"
      alt="Algorudix.ai Logo"
      className={`${className} ${
        glow
          ? isDark
            ? 'filter drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]'
            : 'filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.12)]'
          : ''
      } transition-all duration-200`}
      style={size ? { width: size, height: size } : undefined}
      loading="eager"
      decoding="async"
    />
  );
};
