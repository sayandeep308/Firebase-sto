import React from 'react';

export type LuxuryButtonVariant =
  | 'burnt-amber'
  | 'champagne-pearl'
  | 'dark-espresso'
  | 'brushed-taupe';

export type LuxuryButtonShape =
  | 'wide'
  | 'square-tile'
  | 'pill'
  | 'compact'
  | 'icon';

export interface LuxuryButtonProps {
  children?: React.ReactNode;
  variant?: LuxuryButtonVariant;
  shape?: LuxuryButtonShape;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  title?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
  children,
  variant = 'burnt-amber',
  shape = 'wide',
  size = 'md',
  icon,
  iconRight,
  href,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  title,
  ariaLabel,
  target,
  rel,
}) => {
  // Variant surface gradient and typography colors
  const variantClasses: Record<LuxuryButtonVariant, string> = {
    'burnt-amber': 'btn-luxury-burnt-amber',
    'champagne-pearl': 'btn-luxury-champagne-pearl',
    'dark-espresso': 'btn-luxury-dark-espresso',
    'brushed-taupe': 'btn-luxury-brushed-taupe',
  };

  // Shape geometry classes
  const shapeClasses: Record<LuxuryButtonShape, string> = {
    wide: 'px-8 py-3.5 rounded-[18px]',
    'square-tile': 'aspect-square w-36 md:w-44 rounded-[22px] flex-col p-4 text-center',
    pill: 'px-7 py-3 rounded-full',
    compact: 'px-4 py-2 rounded-[14px] text-xs',
    icon: 'p-3 rounded-full aspect-square',
  };

  // Size fine-tuning (for wide and pill shapes)
  const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
    sm: 'text-xs tracking-wider py-2 px-5',
    md: 'text-xs sm:text-sm tracking-widest',
    lg: 'text-sm sm:text-base tracking-widest py-4 px-10',
  };

  const combinedClasses = [
    'btn-luxury',
    variantClasses[variant] || variantClasses['burnt-amber'],
    shapeClasses[shape] || shapeClasses.wide,
    shape !== 'square-tile' && shape !== 'icon' && shape !== 'compact' ? sizeClasses[size] : '',
    disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>}
      {children && <span className="font-semibold uppercase select-none">{children}</span>}
      {iconRight && <span className="inline-flex shrink-0 items-center justify-center transition-transform group-hover:translate-x-0.5">{iconRight}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        onClick={onClick as any}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={combinedClasses}
        title={title}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick as any}
      disabled={disabled}
      className={combinedClasses}
      title={title}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
