import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Premium Momentum Smooth Scrolling Component
 *
 * Implements inertial physics-based smooth scrolling across public pages
 * while preserving native high-speed scrolling in administrative consoles.
 */
export const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Respect accessibility settings for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis engine
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Animation frame loop
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // Adapt scroll behavior based on active route
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const isAdminRoute = location.pathname.startsWith('/admin');

    if (isAdminRoute) {
      // Defer to native overflow scrolling in admin control rooms
      lenis.stop();
      return;
    }

    lenis.start();

    // Smooth anchor navigation (e.g. #how-we-work, #services)
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        setTimeout(() => {
          lenis.scrollTo(target, { offset: -90, duration: 1.2 });
        }, 60);
        return;
      }
    }

    // Scroll to top on standard route transitions
    lenis.scrollTo(0, { immediate: true });
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};

export default SmoothScroll;
