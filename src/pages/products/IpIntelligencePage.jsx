import React from 'react';
import { Link } from 'react-router-dom';

const IpIntelligencePage = () => {
  return (
    <div className="min-h-screen bg-[#05080D] text-slate-200 pt-12 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-400 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-blue-400">IP Intelligence</span>
        </div>

        {/* 1. HERO SECTION */}
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
            Understand the risk behind an IP address.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            IP Intelligence helps analyze IP addresses and associated security signals to support investigation and threat analysis.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Explore IP Intelligence →
            </Link>
          </div>
        </div>

        {/* 2. POTENTIAL CAPABILITIES */}
        <div className="space-y-8">
          <div>
            <div className="text-xs font-bold font-mono tracking-widest text-blue-400 uppercase mb-2">
              Telemetry & Threat Feeds
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Potential Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'IP reputation',
                desc: 'Historical threat activity, blocklist presence, and abuse confidence scoring.',
              },
              {
                title: 'Geolocation',
                desc: 'Precise geographic coordinates, country, region, and physical hosting locale.',
              },
              {
                title: 'ASN information',
                desc: 'Autonomous System Number mapping, routing paths, and BGP announcement data.',
              },
              {
                title: 'Hosting information',
                desc: 'ISP details, cloud infrastructure identification, and data center footprints.',
              },
              {
                title: 'Threat indicators',
                desc: 'Active command-and-control correlation, botnet membership, and scanning history.',
              },
              {
                title: 'Risk classification',
                desc: 'Dynamic categorization distinguishing proxies, VPNs, Tor nodes, and malicious relays.',
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-2">
                    Signal 0{idx + 1}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl mx-auto leading-snug">
            Real-time IP threat intelligence for security investigations.
          </h2>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              Explore IP Intelligence →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IpIntelligencePage;
