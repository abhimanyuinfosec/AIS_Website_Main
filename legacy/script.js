document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-Up Animations
    const fadeElements = document.querySelectorAll('.fade-up');
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once animated to ensure it only happens once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    } else {
        // Fallback or reduced motion: make everything visible immediately
        fadeElements.forEach(el => el.classList.add('visible'));
    }

    // 2. Subtle Parallax for Hero Background
    const parallaxEl = document.querySelector('.parallax-element');
    
    if (parallaxEl && !prefersReducedMotion) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    // Only apply parallax if near top of page (performance)
                    if (scrollY < window.innerHeight) {
                        // Move the background slower than the scroll speed (e.g., 0.3)
                        parallaxEl.style.transform = `translateY(calc(-50% + ${scrollY * 0.3}px))`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true }); // Passive listener for better scroll performance
    }
});
