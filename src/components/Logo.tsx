import React from 'react';
import fullLogo from '@/assets/Gateway full logo - white.png';
import favicon from '@/assets/favicon.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
  lightText?: boolean;
  minimized?: boolean;
}

export default function Logo({ className = "h-10", showText = true, lightText = false, minimized = false }: LogoProps) {
  // If minimized is true, or showText is false, render the favicon (emblem)
  if (minimized || !showText) {
    return (
      <img
        src={favicon}
        alt="Gateway Logo Emblem"
        className={`object-contain shrink-0 ${className}`}
      />
    );
  }

  // Otherwise, render the full logo
  return (
    <img
      src={fullLogo}
      alt="Gateway Logistics & Services (SL) Ltd"
      className={`object-contain shrink-0 ${className}`}
    />
  );
}

