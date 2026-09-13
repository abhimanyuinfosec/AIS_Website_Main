import React from 'react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Founder & Cybersecurity Lead',
    role: 'Founder / Cybersecurity Lead',
    desc: 'Responsible for cybersecurity strategy, security research, product direction and technical development.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Offensive Security Researcher',
    role: 'Security Engineer / Pen Tester',
    desc: 'Specializes in web application penetration testing, vulnerability discovery, and exploit validation.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'Infrastructure & Systems Lead',
    role: 'Cloud & Network Security Engineer',
    desc: 'Focuses on network hardening, architecture review, and automated perimeter threat detection.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  {
    name: 'AI & Security Systems Developer',
    role: 'Security Software Engineer',
    desc: 'Builds intelligent intrusion detection pipelines, threat data telemetry, and automation tools.',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-[#030611] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">About Us</span>
          <span>/</span>
          <span className="text-cyan-400">Team</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
            About Us • Team
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            Meet the people behind Abhimanyu InfoSec.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            A security-focused team combining cybersecurity, software development, research and engineering.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Get in Touch →
            </Link>
          </div>
        </div>

        {/* 2. TEAM CARDS */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Leadership & Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  {/* Photo Space Container */}
                  <div className="w-full aspect-square rounded-xl bg-slate-900/80 border border-dashed border-cyan-400/30 flex flex-col items-center justify-center text-center p-4 mb-5">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                      Photo
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">
                      Member Portrait
                    </span>
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-base font-bold text-white mb-1 leading-snug">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400 mb-3">
                    {member.role}
                  </div>

                  {/* Short 1-2 line description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    {member.desc}
                  </p>
                </div>

                {/* Social Links (text-based, no icons) */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-3 text-xs font-mono">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <span className="text-slate-600">•</span>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. OUR CULTURE */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase mb-2">
              Engineering Mindset
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Our Culture
            </h2>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl bg-[rgba(8,24,45,0.55)] border border-[rgba(100,190,255,0.14)] backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
              {['Learn', 'Build', 'Test', 'Improve'].map((stage, i, arr) => (
                <React.Fragment key={stage}>
                  <div className="flex-1 p-4 rounded-xl bg-slate-900/70 border border-slate-800 w-full">
                    <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                      STEP 0{i + 1}
                    </span>
                    <span className="text-lg font-bold text-white">{stage}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-slate-500 font-mono text-xl select-none hidden sm:inline">
                      →
                    </span>
                  )}
                  {i < arr.length - 1 && (
                    <span className="text-slate-500 font-mono text-sm select-none sm:hidden">
                      ↓
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-center max-w-2xl mx-auto pt-2">
              We believe cybersecurity is best learned by building real systems, testing them and continuously improving them.
            </p>
          </div>
        </div>

        {/* 4. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgba(10,32,60,0.85)] to-[rgba(7,20,45,0.9)] border border-cyan-400/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Collaborate with our security engineering team.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 via-brand-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-full shadow-glow-blue border border-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Get in Touch →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamPage;
