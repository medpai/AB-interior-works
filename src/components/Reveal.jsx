import React, { useEffect, useRef } from 'react';

export default function Reveal({ as: Tag = 'div', children, delay = 0, className = '', ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      // Fallback: reveal immediately
      el.classList.add('is-visible');
    }
  }, []);

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style} {...props}>
      {children}
    </Tag>
  );
}
