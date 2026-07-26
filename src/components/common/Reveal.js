import React, { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const canObserve = () => typeof window !== 'undefined' && 'IntersectionObserver' in window;

/**
 * Reveals its children the first time they enter the viewport, so motion tracks
 * where attention actually is instead of firing against an empty screen on load.
 *
 * Anything in the first viewport should be rendered without this wrapper: text
 * that is simply present reads as faster and more credible than text that arrives.
 */
const Reveal = ({
  as: Tag = 'div',
  stagger = false,
  delay = 0,
  className = '',
  children,
  ...rest
}) => {
  const ref = useRef(null);
  // Start revealed whenever motion is unwanted or unobservable — content must
  // never be stranded at opacity 0.
  const [revealed, setRevealed] = useState(() => !canObserve() || prefersReducedMotion());

  useEffect(() => {
    if (revealed) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      // Fire on the first visible pixel, and a little before it: a tall block
      // whose heading is on screen must not sit there as an empty gap waiting
      // for a percentage threshold it cannot meet until it is half scrolled in.
      { rootMargin: '0px 0px 80px 0px', threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [revealed]);

  const classes = [
    stagger ? 'reveal-stagger' : 'reveal',
    revealed ? 'is-revealed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
