import { useEffect, useRef, useState } from 'react';

/**
 * useMobileScrollExpand
 *
 * Returns a ref and an `expanded` boolean.
 * - On mobile (< 1024px): the element auto-expands when it's scrolled ≥ 60%
 *   into the viewport, and can also be toggled manually by the caller.
 * - On desktop (≥ 1024px): always returns false (hover CSS handles expansion).
 *
 * @param threshold  - 0–1, how much of the element must be visible before expanding
 */
export function useMobileScrollExpand(threshold = 0.6) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only run on mobile
    const mq = window.matchMedia('(max-width: 1023px)');
    if (!mq.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExpanded(true);
        } else {
          // Collapse again when card is fully off-screen (scrolled past)
          setExpanded(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const toggle = () => setExpanded(prev => !prev);

  return { ref, expanded, toggle };
}
