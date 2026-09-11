import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Cpu, Terminal, Shield, Zap, Code2, Database, Network, ArrowRight } from 'lucide-react';
import api from '../services/api';

const staticTechnologies = [
  {
    slug: 'hybrid-ids',
    name: 'Hybrid IDS Engine',
    tagline: 'Multi-tiered intrusion detection blending deterministic heuristics and anomaly AI.',
    category: 'Autonomous Intrusion Detection',
    version: 'v0.9.4',
    status: 'DEVELOPMENT',
    description: 'Traditional signature-based detection misses novel zero-days, while pure anomaly detectors create unbearable false positives. AIS Hybrid IDS combines deep packet inspection (eBPF) with adaptive behavioral models to detect multi-stage lateral movement at wire speed.',
    features: [
      'Kernel-level eBPF packet capture with sub-millisecond latency',
      'Real-time behavioral graph neural network for lateral movement detection',
      'Automated Suricata rule synthesis and dynamic IP quarantine',
      'Zero overhead host telemetry sensor for Linux and Windows Server'
    ],
    techStack: ['Rust', 'eBPF', 'C++', 'Python', 'Redis', 'Kafka'],
    architecture: 'Host Sensor (eBPF) → Telemetry Bus (Kafka) → GNN Classifier → Automated Firewall Mitigation'
  },
  {
    slug: 'autored-apt',
    name: 'AutoRed APT Simulation',
    tagline: 'Continuous offensive red teaming and automated exploit chaining platform.',
    category: 'Autonomous Red Teaming',
    version: 'v1.1.0',
    status: 'BETA',
    description: 'AutoRed simulates the exact tactics, techniques, and procedures (TTPs) of nation-state threat actors (MITRE ATT&CK framework). It maps attack paths, probes privilege escalation avenues, and evaluates defensive responses 24/7 without risking operational stability.',
    features: [
      'Full MITRE ATT&CK enterprise matrix mapping',
      'Automated Active Directory attack path discovery (BloodHound integration)',
      'Egress command-and-control (C2) evasion testing',
      'Safe payload detonation with zero collateral data corruption'
    ],
    techStack: ['Go', 'Python', 'Neo4j', 'FastAPI', 'Docker'],
    architecture: 'Target Orchestrator → Agentless Prober → Graph Path Calculator → Defensive Efficacy Score'
  },
  {
    slug: 'ip-intelligence',
    name: 'IP & Threat Intelligence Grid',
    tagline: 'Global honeypot network and real-time malicious IP reputation scoring.',
    category: 'Threat Telemetry',
    version: 'v2.0.1',
    status: 'PRODUCTION',
    description: 'Our distributed global network of decoy honeypots captures millions of exploit payloads and malicious IP scanning behaviors daily. This live feed feeds directly into our client perimeter firewalls to preemptively block adversaries.',
    features: [
      'Over 250 global honeypot nodes capturing live exploits',
      'Sub-second REST API for IP reputation and ASN risk scoring',
      'Automated Tor exit node, bulletproof hoster, and proxy classification',
      'STIX / TAXII format export for SIEM integration'
    ],
    techStack: ['PostgreSQL', 'TimescaleDB', 'Node.js', 'Redis', 'FastAPI'],
    architecture: 'Global Decoy Nodes → Telemetry Ingestion API → Anomaly Normalizer → Client Edge Firewall Feed'
  },
  {
    slug: 'security-engineering',
    name: 'Custom Security Engineering',
    tagline: 'Hardware security modules, custom cryptographic protocol development, and kernel drivers.',
    category: 'Deep Security Engineering',
    version: 'Enterprise',
    status: 'PRODUCTION',
    description: 'For organizations with specialized high-assurance environments, our team crafts custom defensive software, kernel-level drivers, and bespoke cryptographic protocols that commercial off-the-shelf tools cannot provide.',
    features: [
      'Custom Windows and Linux kernel security drivers',
      'Zero-Knowledge authentication protocol implementation',
      'Post-Quantum cryptography (PQC) transition readiness',
      'Automated CI/CD security pipeline gates'
    ],
    techStack: ['C', 'Rust', 'Assembly', 'OpenSSL', 'LibreSSL'],
    architecture: 'Specification Analysis → Formal Verification → Kernel Driver Authoring → Fuzzing & Stress Testing'
  },
  {
    slug: 'research-development',
    name: 'R&D Labs & Vulnerability Research',
    tagline: 'Pioneering security research in AI model poisoning, binary exploitation, and hardware reverse engineering.',
    category: 'Vulnerability Research',
    version: 'Ongoing',
    status: 'ACTIVE',
    description: 'The Abhimanyu InfoSec Research Lab actively investigates novel attack surfaces, including LLM jailbreaks, side-channel attacks, and IoT firmware vulnerabilities, contributing to CVE disclosures and academic publications.',
    features: [
      'Zero-day vulnerability discovery & responsible disclosure',
      'AI/LLM prompt injection and model extraction defense',
      'Hardware and firmware reverse engineering',
      'Peer-reviewed security publications and dataset releases'
    ],
    techStack: ['Ghidra', 'IDA Pro', 'QEMU', 'PyTorch', 'Radare2'],
    architecture: 'Target Firmware / Binary → Decompilation & Dynamic Fuzzing → Exploit PoC → Remediation Advisory'
  },
];

export const TechnologyPage = ({ defaultSlug }) => {
  const params = useParams();
  const currentSlug = params.slug || defaultSlug;
  const [selectedTech, setSelectedTech] = useState(
    staticTechnologies.find((t) => t.slug === currentSlug) || staticTechnologies[0]
  );

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            <Cpu size={14} /> PROPRIETARY TECHNOLOGY
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Cyber Defense Tooling</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Proprietary intrusion detection systems, autonomous red teaming engines, and threat intelligence grids engineered by Abhimanyu InfoSec.
          </p>
        </div>

        {/* Technology Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {staticTechnologies.map((t) => {
            const isSelected = selectedTech.slug === t.slug;
            return (
              <button
                key={t.slug}
                onClick={() => setSelectedTech(t)}
                className={`p-4 rounded-xl text-center transition border flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-300 font-bold shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    : 'bg-[#0b1120] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs">{t.name}</div>
                <span className="text-[10px] font-mono text-slate-500">{t.version}</span>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Card */}
        <div className="bg-[#0b1120] border border-cyan-500/20 rounded-2xl p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{selectedTech.category}</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">{selectedTech.name}</h2>
              <p className="text-slate-400 text-sm mt-1">{selectedTech.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedTech.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                {selectedTech.version}
              </span>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {selectedTech.description}
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedTech.features.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#070b14] border border-slate-800/80 flex items-start gap-3">
                <div className="p-1 rounded bg-cyan-500/10 text-cyan-400 mt-0.5">
                  <Zap size={14} />
                </div>
                <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <Code2 size={14} /> Core Engineering Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedTech.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Pipeline */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">ENGINE PIPELINE</span>
            <div className="text-xs font-mono text-cyan-300 mt-1 font-semibold overflow-x-auto">
              {selectedTech.architecture}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              Interested in licensing or integrating {selectedTech.name}?
            </div>
            <Link
              to="/contact"
              className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition"
            >
              Request API / Demo Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyPage;
