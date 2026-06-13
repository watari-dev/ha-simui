import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';

interface TileProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export function Tile({ children, active, onClick, className = '', style }: TileProps) {
  const handleKey = onClick
    ? (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }
    : undefined;

  return (
    <div
      className={[
        'simui-tile',
        active ? 'is-active' : '',
        onClick ? 'is-clickable' : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      onKeyDown={handleKey}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={style}
    >
      {children}
    </div>
  );
}
