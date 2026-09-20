import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import logoAsset from '../assets/logo-transparent.png';
import { LOGO_TRANSPARENT_BASE64 } from '../assets/logoBase64';

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

  // Primary: Vite bundled asset URL with fallback to base64 Data URI
  const [currentSrc, setCurrentSrc] = useState<string>(logoAsset || LOGO_TRANSPARENT_BASE64);

  return (
    <img
      src={currentSrc}
      alt="Algorudix.ai Logo"
      onError={() => {
        // Fail-safe: if bundled asset URL fails for any reason, use inline base64
        if (currentSrc !== LOGO_TRANSPARENT_BASE64) {
          setCurrentSrc(LOGO_TRANSPARENT_BASE64);
        }
      }}
      className={`${className} ${
        glow
          ? isDark
            ? 'filter drop-shadow-[0_0_8px_rgba(168,85,247,0.45)]'
            : 'filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]'
          : ''
      } transition-all duration-200 select-none pointer-events-none`}
      style={size ? { width: size, height: size } : undefined}
      loading="eager"
      decoding="sync"
    />
  );
};
