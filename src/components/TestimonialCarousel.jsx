import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import FadeIn from './FadeIn';

const testimonials = [
  {
    quote: "Abhimanyu InfoSec found vulnerabilities that other automated platforms completely missed. Their AI-driven response time is unparalleled.",
    name: "Jane Doe",
    role: "CISO, Acme FinTech"
  },
  {
    quote: "Deployment took hours, not weeks. The clarity it brings to our Kubernetes environments gives our engineering teams the confidence to move fast.",
    name: "John Smith",
    role: "VP Engineering, Globex Software"
  },
  {
    quote: "Finally, a platform that doesn't just generate noise. High fidelity alerts and true automation have made our lean team highly effective.",
    name: "Elena Rodriguez",
    role: "Director of SecOps, CloudScale"
  }
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);
  
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timerRef.current);
  }, [activeIndex, isHovered]);

  return (
    <section className="section-padding theme-dark">
      <div className="wrap">
        <div className="grid-2" style={{ alignItems: 'center' }}>
          
          <FadeIn className="testimonial-content" 
               onMouseEnter={() => setIsHovered(true)} 
               onMouseLeave={() => setIsHovered(false)}
               style={{ position: 'relative', minHeight: '300px', overflow: 'hidden' }}>
            
            {testimonials.map((t, i) => {
              let slideClass = "slide";
              if (i === activeIndex) slideClass += " active";
              else if (i < activeIndex || (activeIndex === 0 && i === testimonials.length - 1)) slideClass += " prev";
              else slideClass += " next";
              
              return (
                <div key={i} className={slideClass}>
                  <div className="quote-mark">"</div>
                  <div className="quote-text">
                    {t.quote}
                  </div>
                  <div className="author">
                    <div style={{ fontWeight: 700 }}>{t.name}</div>
                    <div className="muted">{t.role}</div>
                  </div>
                </div>
              );
            })}

            {/* Progress indicators */}
            <div style={{ display: 'flex', gap: '8px', position: 'absolute', bottom: 0, left: 0 }}>
              {testimonials.map((_, i) => (
                <div key={i} className="progress-dot" onClick={() => setActiveIndex(i)}>
                  <div className="progress-fill" style={{ 
                    width: i === activeIndex ? '100%' : '0%',
                    transition: i === activeIndex && !isHovered ? 'width 5000ms linear' : 'width 200ms',
                  }}></div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="testimonial-video">
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: 'var(--bg-dark-muted)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button className="play-button" style={{ 
                  width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-gradient)', border: 'none', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer',
                  boxShadow: '0 10px 30px var(--accent-primary-alpha)'
                }}>
                  <Play size={24} fill="currentColor" style={{ marginLeft: '4px' }} />
                </button>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
