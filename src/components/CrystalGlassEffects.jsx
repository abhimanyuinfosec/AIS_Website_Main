import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CrystalGlassEffects = () => {
  const location = useLocation();

  useEffect(() => {
    const header = document.querySelector('header');

    // 1. Header depth & shadow state on scroll
    const syncHeader = () => {
      if (header) {
        header.classList.toggle('nav-scrolled', window.scrollY > 18);
      }
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    // 2. Subtle 3D tilt interaction for interactive cards
    const canTilt = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const cleanups = [];
    if (canTilt) {
      document.querySelectorAll('.glass-surface-interactive').forEach((card) => {
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(900px) rotateX(${(-y * 2.5).toFixed(2)}deg) rotateY(${(x * 2.5).toFixed(2)}deg) translateY(-4px)`;
        };
        const onLeave = () => {
          card.style.transform = '';
        };
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('pointermove', onMove);
          card.removeEventListener('pointerleave', onLeave);
        });
      });
    }

    // 3. Smooth active-nav feedback for hash sections
    const links = [...document.querySelectorAll('header a[href^="#"]')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    let navObserver = null;
    if (sections.length) {
      navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => a.classList.remove('text-brand-crimson', 'font-semibold'));
            const active = links.find((a) => a.getAttribute('href') === '#' + entry.target.id);
            if (active) active.classList.add('text-brand-crimson', 'font-semibold');
          });
        },
        { rootMargin: '-35% 0px -55% 0px' }
      );
      sections.forEach((s) => navObserver.observe(s));
    }

    // =========================================================
    // 4. Universal Scroll Reveal Engine (Light & Crisp Theme)
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

      // Section h2 & h3 headings outside hero & interactive sections
      main.querySelectorAll(
        'h2:not([data-purpose="hero-section"] *):not(#how-we-work *):not([data-no-anim]), .section-title:not([data-purpose="hero-section"] *):not(#how-we-work *):not([data-no-anim]), div.space-y-5 > h1:not([data-purpose="hero-section"] *)'
      ).forEach((h) => {
        if (!h.hasAttribute('data-anim')) {
          h.setAttribute('data-anim', 'up');
        }
      });

      // Paragraphs immediately after headings
      main.querySelectorAll('h2:not(#how-we-work *) + p, .section-title:not(#how-we-work *) + p').forEach((p) => {
        if (!p.hasAttribute('data-anim') && !p.closest('[data-anim-child]') && !p.closest('#how-we-work')) {
          p.setAttribute('data-anim', 'up');
          p.setAttribute('data-anim-delay', '100');
        }
      });

      // Grid containers — stagger children (exclude interactive step timelines like #how-we-work)
      main.querySelectorAll('.grid, [class*="grid-cols"]').forEach((grid) => {
        if (!grid.hasAttribute('data-anim-child') && !grid.hasAttribute('data-sr-stagger') && grid.children.length >= 2) {
          if (!grid.closest('[data-purpose="hero-section"]') && !grid.closest('#how-we-work')) {
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
        if (rect.top < vh - 40 && rect.bottom > 10) {
          el.classList.add('anim-visible');
        } else {
          animObserver.observe(el);
        }
      });
    };

    initScrollReveals();
    const timer1 = setTimeout(initScrollReveals, 60);
    const timer2 = setTimeout(initScrollReveals, 220);

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
      window.removeEventListener('scroll', syncHeader);
      animObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      if (navObserver) navObserver.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      cleanups.forEach((fn) => fn());
    };
  }, [location.pathname]);

  return null;
};

export default CrystalGlassEffects;
