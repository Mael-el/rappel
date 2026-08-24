import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Emblem */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#003B73] via-[#00A389] to-[#00D26A] p-0.5 shadow-md shadow-[#00D26A]/20 ${iconSizes[size]}`}>
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center p-1 relative overflow-hidden">
          {/* Stylized twin medical heartbeat figures */}
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-[#00A389]">
            {/* Person 1 Left */}
            <circle cx="32" cy="26" r="10" fill="#003B73" />
            <path d="M 18 64 C 18 42, 38 38, 48 50 C 42 62, 28 66, 18 64 Z" fill="#003B73" />
            
            {/* Person 2 Right */}
            <circle cx="68" cy="26" r="10" fill="#00D26A" />
            <path d="M 82 64 C 82 42, 62 38, 52 50 C 58 62, 72 66, 82 64 Z" fill="#00D26A" />
            
            {/* Heartbeat Pulse */}
            <path
              d="M 28 50 L 40 50 L 46 36 L 54 64 L 60 44 L 66 50 L 74 50"
              fill="none"
              stroke="#067A45"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Protective Hands Cradle */}
            <path
              d="M 20 78 C 36 90, 64 90, 80 78 C 65 83, 35 83, 20 78 Z"
              fill="#00A389"
            />
          </svg>
        </div>

        {/* Green Medical Cross Badge */}
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
          <div className="w-3.5 h-3.5 bg-[#00D26A] rounded-full flex items-center justify-center">
            <span className="text-white font-extrabold text-[10px] leading-none mb-0.5">+</span>
          </div>
        </div>
      </div>

      {/* Brand Title and Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`font-black tracking-tight bg-gradient-to-r from-[#002B49] via-[#007A78] to-[#00D26A] bg-clip-text text-transparent font-['Plus_Jakarta_Sans',sans-serif] ${textSizes[size]}`}>
            Santé
          </span>
          <span className={`font-black text-[#00D26A] leading-none ${textSizes[size]}`}>
            +
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
            Bénin · E-Santé · Bitcoin
          </span>
        )}
      </div>
    </div>
  );
};
