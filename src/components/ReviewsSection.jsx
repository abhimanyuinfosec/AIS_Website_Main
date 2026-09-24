import React, { useState, useEffect } from 'react';
import { Star, Quote, Award } from 'lucide-react';
import reviewsService from '../services/reviewsService';

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    reviewsService.getAll(false).then((data) => {
      if (isMounted) {
        setReviews(data || []);
        setLoading(false);
      }
    });

    const unsubscribe = reviewsService.subscribe((updated) => {
      if (isMounted) {
        setReviews(updated.filter((r) => r.status === 'PUBLISHED'));
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (!loading && reviews.length === 0) return null;

  return (
    <section className="py-20 bg-[#05080D] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background cyber grid & subtle ambient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.06),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-slate-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Trusted by CISOs & <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
              Enterprise Defense Leaders
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how critical infrastructure operators, financial institutions, and cloud engineering teams validate our offensive rigor and defensive hardening.
          </p>
        </div>

        {/* Reviews Grid - 4 Columns in 1 Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative p-5 sm:p-6 rounded-2xl bg-[#080d1a]/85 backdrop-blur-xl border border-slate-800/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              {/* Quote Watermark */}
              <Quote
                size={34}
                className="absolute top-5 right-5 text-slate-800/30 group-hover:text-slate-700/40 transition-colors pointer-events-none"
              />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: review.rating || 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.3)]"
                    />
                  ))}
                </div>

                {/* Review Body */}
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-5 font-normal italic">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/70">
                {review.profileImage ? (
                  <img
                    src={review.profileImage}
                    alt={review.reviewerName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700 transition shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 font-bold text-sm font-mono shrink-0">
                    {review.reviewerName.charAt(0)}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-slate-200 transition truncate">
                    {review.reviewerName}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight truncate">
                    {review.designation}
                  </div>
                  {review.organization && (
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                      {review.organization}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
