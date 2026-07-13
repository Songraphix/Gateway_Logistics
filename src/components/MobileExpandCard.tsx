import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * MobileExpandCard
 * 
 * A wrapper that adds click-to-expand (accordion) behaviour on mobile (<lg).
 * On desktop (lg+) the original hover logic takes over — this component does nothing.
 *
 * Usage:
 *   <MobileExpandCard className="group rounded-3xl …" chevronColorClass="text-slate-400">
 *     {/* header content always visible */}
 *     <MobileExpandCard.Header>…</MobileExpandCard.Header>
 *     {/* collapsible body */}
 *     <MobileExpandCard.Body>…</MobileExpandCard.Body>
 *   </MobileExpandCard>
 *
 * Or use the render-prop children pattern (simpler, used here):
 *   Pass children as a function: children(isExpanded) => JSX
 */

interface MobileExpandCardProps {
  /** Classes applied to the outer wrapper div (your card classes) */
  className?: string;
  /** Color class for the chevron icon e.g. "text-slate-400 group-hover:text-white/70" */
  chevronColorClass?: string;
  /** The card content as a render-prop: receives isExpanded boolean */
  children: (isExpanded: boolean) => React.ReactNode;
  /** Forwarded motion props (passed as spread to the outer element aren't needed here — caller handles motion.div) */
  onClick?: () => void;
}

export function MobileExpandCard({
  className = '',
  chevronColorClass = 'text-slate-400',
  children,
  onClick,
}: MobileExpandCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    // Only intercept on mobile — on desktop the card's own hover handles it
    if (window.innerWidth >= 1024) {
      onClick?.();
      return;
    }
    e.stopPropagation();
    setExpanded(prev => !prev);
    onClick?.();
  };

  return (
    <div
      className={`relative ${className}`}
      onClick={handleToggle}
    >
      {children(expanded)}

      {/* Mobile-only expand chevron indicator */}
      <div
        className={`
          absolute bottom-3 right-3
          flex items-center justify-center
          w-6 h-6 rounded-full
          bg-black/5 dark:bg-white/10
          transition-transform duration-300 ease-out
          lg:hidden
          ${chevronColorClass}
          ${expanded ? 'rotate-180' : 'rotate-0'}
        `}
        aria-label={expanded ? 'Collapse' : 'Expand'}
      >
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}
