import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CrystalGlassEffects = () => {
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector('header');

    // 1. Cursor-controlled atmospheric light
    const handlePointerMove = (e) => {
      root.style.setProperty('--mx', `${e.clientX}px`);
      root.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 2. Header depth on scroll
    const syncHeader = () => {
      if (header) {
        header.classList.toggle('nav-scrolled', window.scrollY > 18);
      }
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    // 3. Lightweight 3D tilt
    const canTilt = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const cleanups = [];
    if (canTilt) {
      document.querySelectorAll('.glass-surface-interactive').forEach((card) => {
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(900px) rotateX(${(-y * 3.2).toFixed(2)}deg) rotateY(${(x * 3.2).toFixed(2)}deg) translateY(-7px) scale(1.008)`;
        };
        const onLeave = () => { card.style.transform = ''; };
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('pointermove', onMove);
          card.removeEventListener('pointerleave', onLeave);
        });
      });
    }

    // 4. Crystal scan highlight
    document.querySelectorAll('.glass-surface, .glass-surface-interactive').forEach((el) => {
      if (!el.classList.contains('crystal-edge')) el.classList.add('crystal-edge');
      if (!el.querySelector(':scope > .crystal-scan')) {
        const scan = document.createElement('span');
        scan.className = 'crystal-scan';
        el.appendChild(scan);
      }
    });

    // 5. Ambient micro-particles
    const particleCount = window.matchMedia('(max-width:700px)').matches ? 12 : 22;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('span');
      p.className = 'crystal-particle';
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `${Math.random() * 100}vh`;
      p.style.opacity = (0.12 + Math.random() * 0.28).toFixed(2);
      const driftX = (Math.random() * 80 - 40).toFixed(0);
      p.style.setProperty('--drift-x', `${driftX}px`);
      p.style.animation = `particleDrift ${9 + Math.random() * 13}s linear ${-Math.random() * 12}s infinite`;
      document.body.appendChild(p);
      particles.push(p);
    }

    // 6. Smooth active-nav feedback
    const links = [...document.querySelectorAll('header a[href^="#"]')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    let navObserver = null;
    if (sections.length) {
      navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => a.classList.remove('text-cyan-300', 'bg-white/[0.06]'));
            const active = links.find((a) => a.getAttribute('href') === '#' + entry.target.id);
            if (active) active.classList.add('text-cyan-300', 'bg-white/[0.06]');
          });
        },
        { rootMargin: '-35% 0px -55% 0px' }
      );
      sections.forEach((s) => navObserver.observe(s));
    }

    // =========================================================
    // 7. Universal SkyFort Scroll Reveal Engine (Works on all pages & sections)
    // =========================================================
    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );

    const initScrollReveals = () => {
      const main = document.querySelector('main') || document.body;

      // Eyebrow badges outside hero
      main.querySelectorAll(
        '.font-mono.uppercase:not([data-purpose="hero-section"] *), [class*="tracking-wider"][class*="uppercase"]:not([data-purpose="hero-section"] *)'
      ).forEach((el) => {
        if (!el.hasAttribute('data-anim') && !el.closest('[data-anim-child]') && !el.closest('[data-purpose="hero-section"]')) {
          el.setAttribute('data-anim', 'fade');
        }
      });

      // Section h2 & h3 headings outside hero
      main.querySelectorAll(
        'h2:not([data-purpose="hero-section"] *), .section-title:not([data-purpose="hero-section"] *), div.space-y-5 > h1:not([data-purpose="hero-section"] *)'
      ).forEach((h) => {
        if (!h.hasAttribute('data-anim')) {
          h.setAttribute('data-anim', 'up');
        }
      });

      // Paragraphs immediately after headings
      main.querySelectorAll('h2 + p, .section-title + p').forEach((p) => {
        if (!p.hasAttribute('data-anim') && !p.closest('[data-anim-child]')) {
          p.setAttribute('data-anim', 'up');
          p.setAttribute('data-anim-delay', '100');
        }
      });

      // Grid containers — stagger children
      main.querySelectorAll('.grid, [class*="grid-cols"]').forEach((grid) => {
        if (!grid.hasAttribute('data-anim-child') && !grid.hasAttribute('data-sr-stagger') && grid.children.length >= 2) {
          // Exclude hero top grid
          if (!grid.closest('[data-purpose="hero-section"]')) {
            grid.setAttribute('data-anim-child', '');
          }
        }
      });

      // Standalone cards and interactive containers
      main.querySelectorAll(
        '[data-purpose="feature-card"], .glass-feature-card, [data-purpose="faq-item"], .glass-faq-item, [data-purpose="cta-panel"], .glass-cta-panel'
      ).forEach((card) => {
        if (!card.hasAttribute('data-anim') && !card.closest('[data-anim-child]') && !card.closest('[data-sr-stagger]')) {
          card.setAttribute('data-anim', 'up');
        }
      });

      // Observe all target elements or reveal immediately if already in viewport
      const elementsToObserve = main.querySelectorAll(
        '[data-anim], [data-anim-child], [data-sr], [data-sr-stagger]'
      );

      const vh = window.innerHeight;
      elementsToObserve.forEach((el) => {
        if (el.classList.contains('anim-visible')) return;

        const rect = el.getBoundingClientRect();
        // If element is already in the viewport on initial page view, reveal it smoothly
        if (rect.top < vh - 40 && rect.bottom > 10) {
          el.classList.add('anim-visible');
        } else {
          animObserver.observe(el);
        }
      });
    };

    // Run immediately and schedule scans for subsequent React mounts
    initScrollReveals();
    const timer1 = setTimeout(initScrollReveals, 60);
    const timer2 = setTimeout(initScrollReveals, 220);

    // Watch for dynamic route transitions or DOM changes inside main
    const mainEl = document.querySelector('main');
    let mutationObserver = null;
    if (mainEl && window.MutationObserver) {
      let debounceTimeout = null;
      mutationObserver = new MutationObserver(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(initScrollReveals, 80);
      });
      mutationObserver.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', syncHeader);
      animObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      if (navObserver) navObserver.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      cleanups.forEach((fn) => fn());
      particles.forEach((p) => p.remove());
    };
  }, [location.pathname]);

  return null;
};

export default CrystalGlassEffects;
