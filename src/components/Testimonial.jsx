import React from 'react';
import { Quote } from 'lucide-react';

const Testimonial = () => {
  return (
    <section className="testimonial section-padding">
      <div className="wrap fade-up">
        <Quote size={48} strokeWidth={1} color="var(--gold-dim)" style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
        <blockquote>
          "Abhimanyu InfoSec didn't just hand us a PDF of automated scanner results. They found logical flaws in our API that would have led to a complete tenant takeover. Their approach is uniquely adversarial and deeply technical."
        </blockquote>
        <div className="testimonial-author">
          <strong>[Jane Doe]</strong>
          Chief Information Security Officer, [FinTech Startup] [REPLACE]
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
