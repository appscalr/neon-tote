import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
  showDot?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 96, 
  className = '', 
  showDot = false 
}) => {
  return (
    <div 
      className={`group/logo relative inline-flex items-center justify-center bg-transparent cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
      title="PiedPod Logo"
    >
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(0,255,204,0.4)] drop-shadow-[0_0_18px_rgba(255,0,183,0.4)] group-hover/logo:drop-shadow-[0_0_20px_rgba(0,255,204,0.7)] group-hover/logo:drop-shadow-[0_0_30px_rgba(255,0,183,0.7)] transition-all duration-300 transform group-hover/logo:scale-105"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Body Gradient (Cyber Cyan to Vivid Magenta) */}
          <linearGradient id="ppV2BodyGrad" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#00FFCC" />
            <stop offset="35%" stopColor="#00E5FF" />
            <stop offset="65%" stopColor="#A800FF" />
            <stop offset="100%" stopColor="#FF00B7" />
          </linearGradient>

          {/* Top Handle Gradient */}
          <linearGradient id="ppV2HandleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFCC" />
            <stop offset="50%" stopColor="#9900FF" />
            <stop offset="100%" stopColor="#FF00B7" />
          </linearGradient>

          {/* Left Floppy Ear Gradient */}
          <linearGradient id="ppV2LeftEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFCC" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>

          {/* Right Floppy Ear Gradient */}
          <linearGradient id="ppV2RightEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B800FF" />
            <stop offset="100%" stopColor="#FF00B7" />
          </linearGradient>

          {/* Center Emblem Gradient */}
          <linearGradient id="ppV2CenterGrad" x1="30%" y1="20%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#FF00B7" />
            <stop offset="70%" stopColor="#E6007A" />
            <stop offset="100%" stopColor="#8A0065" />
          </linearGradient>

          {/* Play & Cloud Glowing Cyan */}
          <filter id="ppV2CyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00FFCC" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. TOP HANDLE (Loop arc) */}
        <path
          d="M 160 170 C 160 85, 200 60, 250 60 C 300 60, 340 85, 340 170 L 320 170 C 320 98, 290 80, 250 80 C 210 80, 180 98, 180 170 Z"
          fill="url(#ppV2HandleGrad)"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* 2. MAIN TOTE BODY */}
        <path
          d="M 145 195 C 180 205, 320 205, 355 195 L 372 235 C 380 260, 390 350, 392 410 C 393 435, 375 448, 345 448 L 155 448 C 125 448, 107 435, 108 410 C 110 350, 120 260, 128 235 Z"
          fill="url(#ppV2BodyGrad)"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* 3. LEFT FLOPPY DOG EAR */}
        <g className="transition-transform duration-300 origin-top-left group-hover/logo:-rotate-3">
          <path
            d="M 148 188 C 125 168, 88 175, 78 200 C 68 225, 75 250, 95 250 C 115 250, 128 235, 136 215 C 142 198, 148 190, 148 188 Z"
            fill="url(#ppV2LeftEarGrad)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Ear inner crease line matching v2 */}
          <path
            d="M 140 196 C 122 188, 98 196, 92 216 C 88 230, 95 240, 104 240"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 4. RIGHT FLOPPY DOG EAR */}
        <g className="transition-transform duration-300 origin-top-right group-hover/logo:rotate-3">
          <path
            d="M 352 188 C 375 168, 412 175, 422 200 C 432 225, 425 250, 405 250 C 385 250, 372 235, 364 215 C 358 198, 352 190, 352 188 Z"
            fill="url(#ppV2RightEarGrad)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Ear inner crease line matching v2 */}
          <path
            d="M 360 196 C 378 188, 402 196, 408 216 C 412 230, 405 240, 396 240"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 5. TOP BAG NECK RIM ACCENT */}
        <path
          d="M 148 194 C 182 204, 318 204, 352 194"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 6. CENTER SNOUT / DOME EMBLEM (Matching the 3-lobed snout in v2) */}
        <path
          d="M 195 385 C 160 380, 150 330, 185 290 C 215 255, 285 255, 315 290 C 350 330, 340 380, 305 385 C 285 388, 270 376, 250 395 C 230 376, 215 388, 195 385 Z"
          fill="url(#ppV2CenterGrad)"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinejoin="round"
          className="filter drop-shadow-[0_0_8px_rgba(255,0,183,0.6)]"
        />

        {/* 7. WAVY NOSE / CLOUD MOTIF */}
        <path
          d="M 224 285 C 224 278, 234 276, 240 282 C 244 276, 256 276, 260 282 C 266 276, 276 278, 276 285 C 276 295, 266 300, 250 297 C 234 300, 224 295, 224 285 Z"
          fill="#00FFCC"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          filter="url(#ppV2CyanGlow)"
        />

        {/* 8. PLAY BUTTON TRIANGLE (▶) */}
        <path
          d="M 230 310 C 230 306, 235 303, 238 305 L 280 330 C 284 332, 284 338, 280 340 L 238 365 C 235 367, 230 364, 230 360 Z"
          fill="#00FFCC"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#ppV2CyanGlow)"
        />
      </svg>

      {showDot && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#00FFCC] rounded-full shadow-[0_0_10px_#00FFCC] animate-pulse pointer-events-none" />
      )}
    </div>
  );
};
