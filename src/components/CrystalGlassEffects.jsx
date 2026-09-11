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

    // 3. Scroll reveal for major sections and cards
    const targets = document.querySelectorAll(
      'main section, [data-purpose="feature-card"], .glass-surface-interactive'
    );
    targets.forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        if (i % 4 === 1) el.classList.add('reveal-delay-1');
        if (i % 4 === 2) el.classList.add('reveal-delay-2');
        if (i % 4 === 3) el.classList.add('reveal-delay-3');
      }
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    targets.forEach((el) => revealObserver.observe(el));

    // 4. Lightweight 3D tilt for cards on pointer devices
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

    // 5. Crystal scan highlight
    document.querySelectorAll('.glass-surface, .glass-surface-interactive').forEach((el) => {
      if (!el.classList.contains('crystal-edge')) el.classList.add('crystal-edge');
      if (!el.querySelector(':scope > .crystal-scan')) {
        const scan = document.createElement('span');
        scan.className = 'crystal-scan';
        el.appendChild(scan);
      }
    });

    // 6. Ambient micro-particles
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

    // 7. Smooth active-nav feedback
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

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', syncHeader);
      revealObserver.disconnect();
      if (navObserver) navObserver.disconnect();
      cleanups.forEach((fn) => fn());
      particles.forEach((p) => p.remove());
    };
  }, [location.pathname]);

  return null;
};

export default CrystalGlassEffects;
