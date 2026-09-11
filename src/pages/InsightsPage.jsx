import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Clock, User, Tag, ArrowRight, BookOpen, ShieldAlert } from 'lucide-react';
import api from '../services/api';

const fallbackArticles = [
  {
    id: '1',
    title: 'Dissecting Modern Multi-Stage Ransomware Tactics in 2026',
    slug: 'dissecting-modern-ransomware-2026',
    excerpt: 'An in-depth technical analysis of living-off-the-land techniques, kernel driver abuse (BYOVD), and decentralized exfiltration channels used by contemporary extortion cartels.',
    category: { name: 'Threat Intelligence' },
    author: { name: 'AIS Research Lab' },
    readingTime: 6,
    publishedAt: '2026-08-15T10:00:00Z',
    content: `## Threat Overview\n\nRecent telemetry from the Abhimanyu InfoSec Global Sensor Grid shows a 42% increase in Bring-Your-Own-Vulnerable-Driver (BYOVD) attacks against enterprise endpoints.\n\n### Attack Vector Breakdown\n1. **Initial Access**: Phishing with signed malicious payloads\n2. **Defense Evasion**: Dropping legitimate vulnerable signed third-party drivers to disable EDR sensors from kernel space\n3. **Lateral Movement**: Fast credential harvesting via memory dumping and automated bloodhound path discovery\n4. **Exfiltration**: Fragmented HTTPS tunneling to legitimate cloud storage APIs\n\n### Defensive Mitigation Recommendations\nEnforce Windows Defender Application Control (WDAC) driver blocklists and block unsigned kernel code loading across all production servers.`
  },
  {
    id: '2',
    title: 'OWASP API Top 10: Mitigating Broken Object Level Authorization (BOLA)',
    slug: 'owasp-api-mitigating-bola',
    excerpt: 'Why BOLA continues to dominate modern web application breaches and how to implement Zero-Trust context-aware authorization filters in microservice architectures.',
    category: { name: 'Web Security' },
    author: { name: 'Lead AppSec Engineer' },
    readingTime: 4,
    publishedAt: '2026-08-20T14:30:00Z',
    content: `## The Root Cause of BOLA\n\nBroken Object Level Authorization occurs when an API endpoint accepts an object ID directly from user input without verifying whether the authenticated user owns or has legitimate access permissions to that object.\n\n### Code-Level Remediation\nAlways perform ownership checks at the data-access layer rather than trusting client-supplied identifiers.`
  },
  {
    id: '3',
    title: 'Zero-Trust Network Segmentation for SMEs: A Practical Blueprint',
    slug: 'zero-trust-network-segmentation-sme',
    excerpt: 'Step-by-step guidance for small and mid-market organizations to compartmentalize internal networks without seven-figure enterprise infrastructure costs.',
    category: { name: 'SME Security' },
    author: { name: 'Security Advisory Team' },
    readingTime: 5,
    publishedAt: '2026-08-25T09:15:00Z',
    content: `## Practical Segmentation Steps\n\n1. **Isolate Guest Wi-Fi & IoT Devices**: Place all non-essential equipment into dedicated isolated VLANs.\n2. **Micro-Segment Financial & ERP Databases**: Deny all ingress except from verified static application subnets.\n3. **Enforce Egress Filtering**: Restrict outbound DNS and SMB traffic to authorized enterprise servers only.`
  },
];

export const InsightsPage = ({ defaultCategory }) => {
  const params = useParams();
  const [posts, setPosts] = useState(fallbackArticles);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await api.get('/blog');
        if (res.success && res.data && res.data.length > 0) {
          setPosts(res.data);
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-4 tracking-wider">
            <FileText size={14} /> CYBER INTELLIGENCE
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Threat Intelligence & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Security Research</span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Technical advisories, malware teardowns, vulnerability disclosures, and defense strategies published by the Abhimanyu InfoSec research team.
          </p>
        </div>

        {/* Selected Article Reader Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-3xl bg-[#0b1120] border border-cyan-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl my-8 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <span className="px-3 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-mono">
                  {selectedPost.category?.name || 'Advisory'}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                >
                  Close [ESC]
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mb-6 pb-4 border-b border-slate-800">
                <span>By {selectedPost.author?.name || 'AIS Team'}</span>
                <span>•</span>
                <span>{new Date(selectedPost.publishedAt || Date.now()).toLocaleDateString()}</span>
                <span>•</span>
                <span>{selectedPost.readingTime || 5} min read</span>
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                {selectedPost.content}
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="p-6 rounded-2xl bg-[#0b1120] border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono">
                    {post.category?.name || 'Intelligence'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Clock size={11} /> {post.readingTime || 4}m read
                  </span>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition line-clamp-2 mb-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-800/80 text-xs">
                <span className="text-slate-500 font-mono text-[11px]">
                  {post.author?.name || 'AIS Security'}
                </span>
                <span className="flex items-center gap-1 text-cyan-400 group-hover:translate-x-1 transition-transform font-mono text-[11px]">
                  Read Analysis <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
