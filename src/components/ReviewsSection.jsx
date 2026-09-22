import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Quote, ChevronRight, Award } from 'lucide-react';
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
    <section className="py-24 bg-[#05080D] border-t border-slate-800/80 relative overflow-hidden">
      {/* Background cyber grid & glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.1),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            <Award size={14} />
            <span>Verified Client Endorsements</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Trusted by CISOs & <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Enterprise Defense Leaders
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how critical infrastructure operators, financial institutions, and cloud engineering teams validate our offensive rigor and defensive hardening.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="relative p-7 sm:p-8 rounded-3xl bg-[#080d1a]/80 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
            >
              {/* Quote Watermark */}
              <Quote
                size={48}
                className="absolute top-6 right-6 text-slate-800/40 group-hover:text-cyan-500/10 transition-colors pointer-events-none"
              />

              <div>
                {/* Rating Stars & Verified Tag */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating || 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
                      />
                    ))}
                  </div>

                  {review.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-medium">
                      <ShieldCheck size={12} className="text-cyan-400" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>

                {/* Review Body */}
                <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal italic">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-slate-800/70">
                {review.profileImage ? (
                  <img
                    src={review.profileImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30 group-hover:border-cyan-400 transition"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-base font-mono">
                    {review.reviewerName.charAt(0)}
                  </div>
                )}

                <div>
                  <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                    {review.reviewerName}
                  </div>
                  <div className="text-xs text-slate-400 leading-tight">
                    {review.designation}
                  </div>
                  {review.organization && (
                    <div className="text-[11px] font-mono text-cyan-400/90 mt-0.5">
                      {review.organization}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stat / Micro Bar */}
        <div className="mt-14 p-5 rounded-2xl bg-[#091122]/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">100%</strong> of assessments delivered with zero breach incident escalation during testing.
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            Audit-Grade Confidentiality Guaranteed
          </span>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
