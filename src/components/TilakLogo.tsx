import React from 'react';

interface TilakLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showGoldBezel?: boolean;
}

export const TilakLogo: React.FC<TilakLogoProps> = ({
  className = '',
  size = 'md',
  showGoldBezel = true,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const containerClasses = [
    sizeMap[size] || 'w-11 h-11',
    showGoldBezel
      ? 'rounded-xl bg-[#0D0B0A] border-2 border-[#E5B25D] shadow-[0_2px_8px_rgba(0,0,0,0.4),0_0_0_1px_#78480F,inset_0_1px_2px_rgba(255,230,150,0.35)] p-1 flex items-center justify-center shrink-0'
      : 'flex items-center justify-center shrink-0',
    className,
  ].join(' ');

  return (
    <div className={containerClasses} title="Satarupa Steel Enterprise - Sacred Tilak Emblem">
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle metallic gold gradient for optional sheen */}
          <linearGradient id="tilakWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F3EF" />
          </linearGradient>
          {/* Sacred Vermilion Red flame gradient */}
          <linearGradient id="tilakRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF2E36" />
            <stop offset="60%" stopColor="#E11D25" />
            <stop offset="100%" stopColor="#C41219" />
          </linearGradient>
        </defs>

        {/* Outer White Sacred Urdhva Pundra */}
        <path
          d="
            M 17 24
            H 37
            C 37 40, 39 60, 41 68
            C 43 72, 47 75, 50 75
            C 53 75, 57 72, 59 68
            C 61 60, 63 40, 63 24
            H 83
            C 81 48, 77 75, 75 84
            C 73 87, 72 88, 74 91
            C 72 89, 67 92, 60 97
            C 55 101, 52 103, 50 103
            C 48 103, 45 101, 40 97
            C 33 92, 28 89, 26 91
            C 28 88, 27 87, 25 84
            C 23 75, 19 48, 17 24
            Z
          "
          fill="url(#tilakWhiteGrad)"
        />

        {/* Sacred Central Vermilion Red Flame (Thiruman / Srichurnam) */}
        <path
          d="
            M 50 13
            L 44.5 60
            C 44.2 65, 46.5 70, 50 70
            C 53.5 70, 55.8 65, 55.5 60
            Z
          "
          fill="url(#tilakRedGrad)"
        />
      </svg>
    </div>
  );
};
