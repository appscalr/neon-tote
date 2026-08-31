import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  showDot?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 96,
  className = '',
  showDot = false,
}) => {
  return (
    <div
      className={`group/logo relative inline-flex items-center justify-center bg-transparent cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
      title="PiedPod Logo"
    >
      <img
        src="/piedpod-logo.png"
        alt="PiedPod"
        className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,255,204,0.4)] drop-shadow-[0_0_18px_rgba(255,0,183,0.4)] group-hover/logo:drop-shadow-[0_0_20px_rgba(0,255,204,0.7)] group-hover/logo:drop-shadow-[0_0_30px_rgba(255,0,183,0.7)] transition-all duration-300 transform group-hover/logo:scale-105"
      />

      {showDot && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#00FFCC] rounded-full shadow-[0_0_10px_#00FFCC] animate-pulse pointer-events-none" />
      )}
    </div>
  );
};
