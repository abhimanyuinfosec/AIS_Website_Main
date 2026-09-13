import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — SkyFort-style scroll reveal hook.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <section ref={ref} data-sr-container>
 *     <h2 data-sr>Title</h2>
 *     <div data-sr-stagger>
 *       <div>Card 1</div>
 *       <div>Card 2</div>
 *     </div>
 *   </section>
 *
 * data-sr            → fade + slide-up (default)
 * data-sr="left"     → slide from left
 * data-sr="right"    → slide from right
 * data-sr="scale"    → scale up + fade
 * data-sr="fade"     → fade only
 * data-sr-stagger    → children stagger 80ms apart
 * data-sr-delay="N"  → extra delay in ms
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const { threshold = 0.1, rootMargin = '0px 0px -64px 0px' } = options;

    // Collect all [data-sr] and [data-sr-stagger] elements
    const singles = [...container.querySelectorAll('[data-sr]')];
    const staggerGroups = [...container.querySelectorAll('[data-sr-stagger]')];

    // Also observe the container itself if it has data-sr
    if (container.hasAttribute('data-sr')) singles.push(container);

    // Set initial hidden state
    const setHidden = (el, type) => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      switch (type) {
        case 'left':  el.style.transform = 'translateX(-52px)'; break;
        case 'right': el.style.transform = 'translateX(52px)'; break;
        case 'scale': el.style.transform = 'scale(0.87) translateY(18px)'; break;
        case 'fade':  el.style.transform = 'none'; break;
        default:      el.style.transform = 'translateY(38px)'; break;
      }
    };

    const setVisible = (el, delay = 0) => {
      requestAnimationFrame(() => {
        el.style.transition = `opacity 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    };

    // Init: hide everything
    singles.forEach((el) => {
      const type = el.getAttribute('data-sr') || 'up';
      const baseDelay = parseInt(el.getAttribute('data-sr-delay') || '0', 10);
      el._srType = type;
      el._srDelay = baseDelay;
      setHidden(el, type);
    });

    staggerGroups.forEach((group) => {
      const baseDelay = parseInt(group.getAttribute('data-sr-delay') || '0', 10);
      [...group.children].forEach((child, i) => {
        child._srDelay = baseDelay + i * 85;
        setHidden(child, 'up');
      });
    });

    // Force reflow so transitions don't snap on first render
    // eslint-disable-next-line no-unused-expressions
    container.offsetHeight;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;

          if (el._srType !== undefined) {
            // single element
            setVisible(el, el._srDelay || 0);
          } else if (el.hasAttribute('data-sr-stagger')) {
            // stagger group — reveal children
            [...el.children].forEach((child) => {
              setVisible(child, child._srDelay || 0);
            });
          }

          observer.unobserve(el);
        });
      },
      { threshold, rootMargin }
    );

    singles.forEach((el) => observer.observe(el));
    staggerGroups.forEach((group) => observer.observe(group));

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
