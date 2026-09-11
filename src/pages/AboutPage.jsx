import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, Target, Award, Users, Mail, CheckCircle2, Globe } from 'lucide-react';
import api from '../services/api';

const fallbackTeam = [
  {
    id: '1',
    name: 'Abhimanyu Security Leadership',
    role: 'Head of Offensive Operations',
    shortBio: 'Specialist in red team adversary emulation, binary exploitation, and kernel security research with over a decade of defensive architecture experience.',
    skills: ['Offensive Red Teaming', 'Reverse Engineering', 'Zero-Trust Architecture', 'CISSP'],
  },
  {
    id: '2',
    name: 'Threat Telemetry & AI Lead',
    role: 'Principal Security Scientist',
    shortBio: 'Leading the development of SANJAY and Hybrid IDS anomaly detection models, behavioral packet classification, and real-time threat correlation.',
    skills: ['Machine Learning', 'eBPF', 'Threat Hunting', 'Anomaly Detection'],
  },
  {
    id: '3',
    name: 'Application Security Engineer',
    role: 'Senior AppSec Architect',
    shortBio: 'Focusing on high-consequence API testing, cloud security hardening, and DevSecOps automated pipeline integration.',
    skills: ['OWASP ASVS', 'Cloud Security', 'API Fuzzing', 'Kubernetes Security'],
  },
];

export const AboutPage = ({ defaultSection }) => {
  const params = useParams();
  const [team, setTeam] = useState(fallbackTeam);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get('/team');
        if (res.success && res.data && res.data.length > 0) {
          setTeam(res.data);
        }
      } catch {
        // Fallback
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            <Shield size={14} /> ABOUT ABHIMANYU INFOSEC
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Break Through Any <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Chakravyuha Formation</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Inspired by the legendary resilience and unmatched tactical prowess of Abhimanyu, our mission is to ensure modern enterprises can enter, defend, and overcome the most complex cyber formations.
          </p>
        </div>

        {/* Mission & Vision Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-[#0b1120] border border-cyan-500/20 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Target size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Our Mission</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              To eliminate critical vulnerabilities before adversaries exploit them, providing uncompromising, institutional-grade security consulting, proprietary tooling, and continuous threat intelligence.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0b1120] border border-blue-500/20 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Shield size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Our Tactical Approach</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              We combine offensive red-team thinking with defensive engineering rigor. Every security assessment is verified with deterministic proof-of-concept exploits and paired with step-by-step code hardening.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0b1120] border border-purple-500/20 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Why Abhimanyu?</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Unlike generic automated scanner reports, our findings are thoroughly manually triaged by expert researchers. Zero false positives, deep business logic verification, and rapid executive remediation support.
            </p>
          </div>
        </div>

        {/* Tactical Principles */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#0b1120] via-slate-900 to-[#070b14] border border-cyan-500/30 shadow-2xl">
          <h2 className="text-2xl font-extrabold text-white mb-6">Core Operational Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <div className="font-bold text-cyan-400 font-mono">01. ASSUME BREACH</div>
              <p className="text-slate-400">We engineer defensive architectures under the assumption that perimeter defenses will eventually be tested, preventing lateral expansion.</p>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-cyan-400 font-mono">02. PROOF OVER THEORY</div>
              <p className="text-slate-400">Every vulnerability report includes actionable proof-of-concept verification with precise remediation source code examples.</p>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-cyan-400 font-mono">03. ZERO FALSE POSITIVES</div>
              <p className="text-slate-400">Our senior analysts validate all automated telemetry findings manually so your engineering teams never waste time on phantom alerts.</p>
            </div>
            <div className="space-y-2">
              <div className="font-bold text-cyan-400 font-mono">04. RESILIENCE BY DESIGN</div>
              <p className="text-slate-400">We construct defense-in-depth layers that allow critical operations to maintain integrity even while under active targeted attack.</p>
            </div>
          </div>
        </div>

        {/* Team Roster */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Security Specialists & Researchers</h2>
            <p className="text-xs text-slate-400 mt-2">
              Our multidisciplinary team of certified ethical hackers, reverse engineers, and defense architects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.id}
                className="p-6 rounded-2xl bg-[#0b1120] border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-black text-xl mb-4">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-cyan-400 font-mono mb-3">{member.role}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{member.shortBio}</p>
                </div>

                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center p-10 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Fortify Your Enterprise?</h2>
          <p className="text-xs text-slate-400 mb-6 max-w-xl mx-auto">
            Schedule a scoping briefing with our senior technical analysts to review your attack surface and requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.3)] transition"
          >
            Initiate Security Scoping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
