import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ExternalLink, Mail, PhoneCall } from 'lucide-react';

export const DocsPage = () => {
  const [activeSectionId, setActiveSectionId] = useState('getting-started-overview');
  const [searchQuery, setSearchQuery] = useState('');

  const docNav = [
    {
      group: '1. Getting Started',
      items: [
        { id: 'getting-started-overview', title: 'What AIS Does' },
        { id: 'getting-started-workflow', title: 'How an Engagement Works' },
        { id: 'getting-started-plans', title: 'Which Plan Fits You' },
        { id: 'getting-started-preparation', title: 'How to Prepare' },
      ],
    },
    {
      group: '2. Service Guides',
      items: [
        { id: 'service-vulnerability-assessment', title: 'Vulnerability Assessment' },
        { id: 'service-web-security', title: 'Web Application Security' },
        { id: 'service-network-security', title: 'Network Security' },
        { id: 'service-penetration-testing', title: 'Penetration Testing' },
        { id: 'service-threat-detection', title: 'Threat Detection' },
        { id: 'service-security-hardening', title: 'Security Hardening' },
      ],
    },
    {
      group: '3. Legal and Trust',
      items: [
        { id: 'legal-authorization', title: 'Scope & Authorization Rules' },
        { id: 'legal-confidentiality', title: 'Confidentiality & Data Handling' },
        { id: 'legal-limits', title: 'Limits & Point-in-Time Review' },
        { id: 'legal-policies', title: 'Policies & Trust Center' },
      ],
    },
    {
      group: '4. FAQ and Support',
      items: [
        { id: 'faq-common', title: 'Frequently Asked Questions' },
        { id: 'faq-support', title: 'Contact Support & Details' },
      ],
    },
  ];

  // Table of Contents for "On this page" right sidebar
  const pageTOC = {
    'getting-started-overview': [
      { id: 'overview-mission', title: 'Core Mission' },
      { id: 'overview-capabilities', title: 'Key Capabilities' },
      { id: 'overview-approach', title: 'Autonomous Defense Philosophy' },
    ],
    'getting-started-workflow': [
      { id: 'workflow-call', title: 'Step 1: 15-Minute Intro Call' },
      { id: 'workflow-scope', title: 'Step 2: Written Scope & NDA' },
      { id: 'workflow-testing', title: 'Step 3: Security Testing & Emulation' },
      { id: 'workflow-report', title: 'Step 4: Prioritized Report' },
      { id: 'workflow-retest', title: 'Step 5: Fix Verification & Free Retest' },
    ],
    'getting-started-plans': [
      { id: 'plans-starter', title: 'Starter Package' },
      { id: 'plans-enterprise', title: 'Enterprise (Partners)' },
      { id: 'plans-custom', title: 'Custom Engagements' },
      { id: 'plans-comparison', title: 'Detailed Comparison Table' },
    ],
    'getting-started-preparation': [
      { id: 'prep-urls', title: 'Target URLs & IP Ranges' },
      { id: 'prep-stack', title: 'Tech Stack Specifications' },
      { id: 'prep-staging', title: 'Staging Environment Setup' },
      { id: 'prep-accounts', title: 'Role-Based Test Accounts' },
    ],
    'service-vulnerability-assessment': [
      { id: 'va-overview', title: 'What It Is' },
      { id: 'va-scope', title: 'What We Test & Out of Scope' },
      { id: 'va-deliverables', title: 'Deliverables & Timeline' },
      { id: 'va-prereq', title: 'What You Need to Provide' },
    ],
    'service-web-security': [
      { id: 'web-overview', title: 'What It Is' },
      { id: 'web-scope', title: 'What We Test & Out of Scope' },
      { id: 'web-deliverables', title: 'Deliverables & Timeline' },
      { id: 'web-prereq', title: 'What You Need to Provide' },
    ],
    'service-network-security': [
      { id: 'net-overview', title: 'What It Is' },
      { id: 'net-scope', title: 'What We Test & Out of Scope' },
      { id: 'net-deliverables', title: 'Deliverables & Timeline' },
      { id: 'net-prereq', title: 'What You Need to Provide' },
    ],
    'service-penetration-testing': [
      { id: 'pen-overview', title: 'What It Is' },
      { id: 'pen-scope', title: 'What We Test & Out of Scope' },
      { id: 'pen-deliverables', title: 'Deliverables & Timeline' },
      { id: 'pen-prereq', title: 'What You Need to Provide' },
    ],
    'service-threat-detection': [
      { id: 'td-overview', title: 'What It Is' },
      { id: 'td-scope', title: 'What We Test & Out of Scope' },
      { id: 'td-deliverables', title: 'Deliverables & Timeline' },
      { id: 'td-prereq', title: 'What You Need to Provide' },
    ],
    'service-security-hardening': [
      { id: 'hard-overview', title: 'What It Is' },
      { id: 'hard-scope', title: 'What We Test & Out of Scope' },
      { id: 'hard-deliverables', title: 'Deliverables & Timeline' },
      { id: 'hard-prereq', title: 'What You Need to Provide' },
    ],
    'legal-authorization': [
      { id: 'legal-rules', title: 'Written Scope Rules' },
      { id: 'legal-boundary', title: 'Boundaries of Authorization' },
    ],
    'legal-confidentiality': [
      { id: 'conf-nda', title: 'Mutual NDA Standard' },
      { id: 'conf-vault', title: 'Encrypted Vault Storage' },
    ],
    'legal-limits': [
      { id: 'limit-point-in-time', title: 'Point-in-Time Review' },
      { id: 'limit-disclaimer', title: 'Continuous Change Advisory' },
    ],
    'legal-policies': [
      { id: 'policy-privacy', title: 'Privacy Policy' },
      { id: 'policy-terms', title: 'Terms of Service' },
      { id: 'policy-trust', title: 'Trust Center' },
    ],
    'faq-common': [
      { id: 'faq-duration', title: 'How Long Does Testing Take?' },
      { id: 'faq-staging', title: 'Is a Staging Environment Required?' },
      { id: 'faq-retest', title: 'How Does the Free Retest Work?' },
      { id: 'faq-llm', title: 'Do You Test AI & LLM Systems?' },
    ],
    'faq-support': [
      { id: 'support-channels', title: 'Support Channels' },
      { id: 'support-sla', title: 'Response SLA' },
      { id: 'support-contact', title: 'Direct Engineering Contacts' },
    ],
  };

  const filteredNav = useMemo(() => {
    if (!searchQuery.trim()) return docNav;
    const query = searchQuery.toLowerCase();
    return docNav
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            section.group.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery]);

  const currentTOC = pageTOC[activeSectionId] || [];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb & Call to Action Bar */}
        <div className="py-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="text-xs text-slate-500 font-medium">
            <span className="text-slate-400">Documentation</span>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900 font-semibold uppercase tracking-wider font-heading">
              {docNav.flatMap((g) => g.items).find((i) => i.id === activeSectionId)?.title ||
                'Overview'}
            </span>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C1121F] via-[#FF7A00] to-[#FFB000] hover:brightness-105 shadow-sm transition"
          >
            <PhoneCall size={13} />
            <span>Book a Free Call</span>
          </Link>
        </div>

        {/* 3-Column Layout: Left Nav Sidebar, Center Content, Right TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT SIDEBAR (Listing sections & Search Box) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-6">
            {/* Search Box */}
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C1121F] focus:bg-white transition"
              />
            </div>

            {/* Navigation Groups */}
            <nav className="space-y-6" aria-label="Documentation navigation">
              {filteredNav.map((section) => (
                <div key={section.group} className="space-y-1.5">
                  <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-900">
                    {section.group}
                  </div>
                  <ul className="space-y-0.5 border-l border-slate-200 ml-1 pl-2.5">
                    {section.items.map((item) => {
                      const isActive = activeSectionId === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSectionId(item.id);
                              window.scrollTo({ top: 120, behavior: 'smooth' });
                            }}
                            className={`w-full text-left py-1.5 px-2 rounded-lg text-xs transition-colors cursor-pointer ${
                              isActive
                                ? 'text-[#C1121F] font-bold bg-rose-50/70'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* CENTER MAIN CONTENT (Plain text, matching theme, no cards) */}
          <main className="lg:col-span-6 space-y-10 leading-relaxed text-sm text-slate-700">
            {/* 1. GETTING STARTED */}
            {activeSectionId === 'getting-started-overview' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    What Abhimanyu InfoSec Does
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Autonomous offensive and defensive cybersecurity engineering for modern infrastructure.
                  </p>
                </header>

                <section id="overview-mission" className="space-y-3 pt-2">
                  <h2 className="text-lg font-heading font-bold text-slate-900">Core Mission</h2>
                  <p>
                    Abhimanyu InfoSec (AIS) helps businesses identify vulnerabilities, detect active
                    threats, harden digital security postures, and build resilient infrastructure
                    without enterprise complexity or excessive overhead.
                  </p>
                  <p>
                    We operate on zero-trust principles: never assume security by obscurity, verify
                    every access boundary, and proactively emulate adversarial attack paths before
                    malicious actors discover them.
                  </p>
                </section>

                <section id="overview-capabilities" className="space-y-3 pt-4 border-t border-slate-100">
                  <h2 className="text-lg font-heading font-bold text-slate-900">Key Capabilities</h2>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Offensive Testing:</strong> Black-box, grey-box, and white-box Vulnerability
                      Assessment and Penetration Testing (VAPT) across web applications, APIs, mobile
                      apps, and cloud networks.
                    </li>
                    <li>
                      <strong>Autonomous Defense:</strong> Lightweight eBPF kernel telemetry agents
                      detecting anomalous process execution, zero-day behaviors, and container escapes.
                    </li>
                    <li>
                      <strong>Architecture Hardening:</strong> Systematic lockdown of cloud permissions,
                      server baselines, reverse proxy configurations, and secrets management.
                    </li>
                  </ul>
                </section>

                <section id="overview-approach" className="space-y-3 pt-4 border-t border-slate-100">
                  <h2 className="text-lg font-heading font-bold text-slate-900">
                    Autonomous Defense Philosophy
                  </h2>
                  <p>
                    Traditional security models rely on fragmented point solutions and lagging signature
                    updates. AIS combines deterministic manual penetration testing with real-time machine
                    intelligence to stop breach lateral movement instantaneously.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'getting-started-workflow' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    How an Engagement Works
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Our structured 5-step lifecycle from first conversation to full remediation.
                  </p>
                </header>

                <section id="workflow-call" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    1. 15-Minute Intro Call
                  </h2>
                  <p>
                    We discuss your stack, critical assets, compliance requirements, timeline, and
                    goals. We identify whether you need a quick pre-launch check, a comprehensive VAPT,
                    or an ongoing agency partnership.
                  </p>
                </section>

                <section id="workflow-scope" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    2. Written Scope &amp; NDA
                  </h2>
                  <p>
                    Prior to touching any network, we execute a mutual Non-Disclosure Agreement (NDA) and
                    a detailed Rules of Engagement (RoE) agreement specifying exact domains, IP ranges,
                    testing windows, and contact procedures.
                  </p>
                </section>

                <section id="workflow-testing" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    3. Security Testing &amp; Emulation
                  </h2>
                  <p>
                    Our engineers run automated scans followed by rigorous manual penetration testing,
                    business-logic flaw discovery, API fuzzing, and privilege escalation tests. Testing is
                    monitored to ensure zero degradation of production availability.
                  </p>
                </section>

                <section id="workflow-report" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    4. Prioritized Report Delivery
                  </h2>
                  <p>
                    You receive an executive summary for leadership alongside developer-ready technical
                    breakdowns. Each finding includes a CVSS severity score, proof-of-concept steps,
                    affected endpoints, and concrete code/config remediation instructions.
                  </p>
                </section>

                <section id="workflow-retest" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    5. Fix Verification &amp; Free Retest
                  </h2>
                  <p>
                    After your developers apply the suggested patches, we perform a complimentary retest
                    to verify that every finding is completely closed, and issue an updated final report.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'getting-started-plans' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Which Plan Fits You
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Guidance on selecting the right engagement model for your team size and infrastructure.
                  </p>
                </header>

                <section id="plans-starter" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">Starter Package</h2>
                  <p>
                    <strong>Best for:</strong> Startups, freelancers, and small businesses looking to secure
                    a single web application or site before public launch.
                  </p>
                  <p>
                    Includes: Quick Check (agreed pages), Standard Security Test, and Security Care
                    monthly scans. Fixed pricing per package with 2–3 day turnaround on Quick Checks.
                  </p>
                </section>

                <section id="plans-enterprise" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Enterprise (Partners)
                  </h2>
                  <p>
                    <strong>Best for:</strong> Software development agencies, dev shops, and enterprise
                    teams with multiple client deliverables or complex APIs.
                  </p>
                  <p>
                    Includes: Standard VAPT, AI/LLM testing, dependency/exposed-secret checks,
                    white-label reporting for your clients, volume discounts, and scheduling built around
                    your sprints.
                  </p>
                </section>

                <section id="plans-custom" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">Custom Engagements</h2>
                  <p>
                    <strong>Best for:</strong> Organizations requiring secure full-stack development from
                    scratch, bespoke architecture reviews, or specialized compliance auditing.
                  </p>
                  <p>
                    Includes: Requirement engineering, secure coding (safe authentication, input validation,
                    least-privilege RBAC), and milestone-based verification.
                  </p>
                </section>

                <section id="plans-comparison" className="pt-4 border-t border-slate-100">
                  <p>
                    To view the complete feature matrix and engagement terms without prices, visit our{' '}
                    <Link to="/pricing" className="text-[#C1121F] font-semibold hover:underline">
                      Pricing &amp; Package Comparison Page →
                    </Link>
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'getting-started-preparation' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    How to Prepare
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    What our engineering team needs from you to kick off testing without delay.
                  </p>
                </header>

                <section id="prep-urls" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    1. Target URLs &amp; IP Ranges
                  </h2>
                  <p>
                    Provide all fully-qualified domain names (FQDNs), staging URLs, public IP addresses,
                    and API documentation (Swagger, Postman collection, or OpenAPI spec) within scope.
                  </p>
                </section>

                <section id="prep-stack" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    2. Tech Stack Specifications
                  </h2>
                  <p>
                    Brief details regarding languages, backend frameworks (e.g., Node.js, Django, Go),
                    database engines, cloud providers (AWS, GCP, Azure), and any active WAF / CDN layers
                    (Cloudflare, AWS Shield).
                  </p>
                </section>

                <section id="prep-staging" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    3. Staging Environment Access
                  </h2>
                  <p>
                    Whenever possible, we recommend providing access to a dedicated staging or UAT
                    environment populated with realistic, non-production mock data. If testing on
                    production, ensure our IP addresses are whitelisted.
                  </p>
                </section>

                <section id="prep-accounts" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    4. Role-Based Test Accounts
                  </h2>
                  <p>
                    For grey-box testing, provide two test accounts per user role (e.g., two Admin accounts,
                    two Standard User accounts) to allow thorough verification of horizontal and
                    vertical privilege escalation (IDOR vulnerabilities).
                  </p>
                </section>
              </article>
            )}

            {/* 2. SERVICE GUIDES */}
            {activeSectionId === 'service-vulnerability-assessment' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Vulnerability Assessment Guide
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Automated and guided scanning to discover unpatched systems and perimeter misconfigurations.
                  </p>
                </header>

                <section id="va-overview" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">What It Is</h2>
                  <p>
                    A systematic scan of your network, servers, and digital perimeter to detect known
                    software flaws, unpatched operating system libraries, obsolete packages, open ports,
                    and weak TLS configurations before attackers exploit them.
                  </p>
                </section>

                <section id="va-scope" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What We Test &amp; What’s Out of Scope
                  </h2>
                  <p>
                    <strong>In Scope:</strong> External IP ranges, open network ports, SSL/TLS handshake
                    ciphers, DNS zone configuration, exposed staging subdomains, and third-party dependency
                    CVEs.
                  </p>
                  <p>
                    <strong>Out of Scope:</strong> Weaponized exploit delivery, social engineering,
                    denial-of-service stress testing, or physical premises attacks.
                  </p>
                </section>

                <section id="va-deliverables" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Receive &amp; Timeline
                  </h2>
                  <p>
                    A clean, severity-ranked report detailing every vulnerability with CVSS ratings and
                    exact patch instructions. Typical turnaround: 2 to 3 business days.
                  </p>
                </section>

                <section id="va-prereq" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Need to Provide
                  </h2>
                  <p>
                    A confirmed list of domain names, public IP addresses, and signed written authorization.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'service-web-security' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Web Application Security Guide
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Targeted assessment of web applications, REST/GraphQL APIs, and authentication logic.
                  </p>
                </header>

                <section id="web-overview" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">What It Is</h2>
                  <p>
                    A rigorous examination of your application logic, authentication mechanisms, session
                    tokens, and input validation to discover vulnerabilities outlined in the OWASP Top 10
                    and beyond.
                  </p>
                </section>

                <section id="web-scope" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What We Test &amp; What’s Out of Scope
                  </h2>
                  <p>
                    <strong>In Scope:</strong> SQL Injection, Cross-Site Scripting (XSS), Server-Side
                    Request Forgery (SSRF), Insecure Direct Object References (IDOR), Broken Access Control,
                    JWT/token forgery, and sensitive data leakage.
                  </p>
                  <p>
                    <strong>Out of Scope:</strong> External third-party payment gateways, DDoS attacks on
                    hosting infrastructure, or physical server room inspections.
                  </p>
                </section>

                <section id="web-deliverables" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Receive &amp; Timeline
                  </h2>
                  <p>
                    Technical vulnerability breakdown with proof-of-concept steps, code remediation advice,
                    and one free retest. Typical turnaround: 4 to 6 business days.
                  </p>
                </section>

                <section id="web-prereq" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Need to Provide
                  </h2>
                  <p>
                    Application URL, staging credentials for test user accounts, and API schema if available.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'service-network-security' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Network Security Guide
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Architectural defense, subnet segmentation, firewall audit, and perimeter gate validation.
                  </p>
                </header>

                <section id="net-overview" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">What It Is</h2>
                  <p>
                    An assessment of your internal and external network routing, firewall policies, VPN
                    gateways, and network segmentation to ensure high-value database and application assets
                    are isolated from unauthorized traffic.
                  </p>
                </section>

                <section id="net-scope" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What We Test &amp; What’s Out of Scope
                  </h2>
                  <p>
                    <strong>In Scope:</strong> Firewall access control lists (ACLs), ingress/egress filtering,
                    unauthenticated internal services, VPN cipher strength, and lateral movement paths.
                  </p>
                  <p>
                    <strong>Out of Scope:</strong> Destruction of routing hardware or interference with
                    unrelated co-located tenant networks.
                  </p>
                </section>

                <section id="net-deliverables" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Receive &amp; Timeline
                  </h2>
                  <p>
                    Network topology risk analysis and actionable segmentation hardening steps. Typical
                    turnaround: 4 to 6 business days.
                  </p>
                </section>

                <section id="net-prereq" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Need to Provide
                  </h2>
                  <p>Network CIDR ranges, firewall rule exports, and testing VPN credentials.</p>
                </section>
              </article>
            )}

            {activeSectionId === 'service-penetration-testing' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Penetration Testing Guide
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Simulated real-world adversary emulation to test your overall security defenses.
                  </p>
                </header>

                <section id="pen-overview" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">What It Is</h2>
                  <p>
                    A comprehensive offensive exercise where ethical hackers simulate realistic threat
                    actors, chaining multiple low-severity bugs into high-impact compromise scenarios to test
                    detection and containment.
                  </p>
                </section>

                <section id="pen-scope" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What We Test &amp; What’s Out of Scope
                  </h2>
                  <p>
                    <strong>In Scope:</strong> Chained exploit paths, privilege escalation, credential
                    dumping, administrative interface bypass, and data exfiltration emulation.
                  </p>
                  <p>
                    <strong>Out of Scope:</strong> Ransomware simulation without explicit written consent,
                    unauthorized phishing of non-consenting employees.
                  </p>
                </section>

                <section id="pen-deliverables" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Receive &amp; Timeline
                  </h2>
                  <p>
                    Comprehensive pentest report, executive findings summary, technical reproduction logs,
                    and a free retest after remediation. Typical turnaround: 5 to 8 business days.
                  </p>
                </section>

                <section id="pen-prereq" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Need to Provide
                  </h2>
                  <p>
                    Signed Rules of Engagement (RoE), emergency contact escalation protocol, and IP
                    whitelisting confirmation.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'service-threat-detection' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Threat Detection Guide
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Continuous 24/7 telemetry monitoring and automated incident containment.
                  </p>
                </header>

                <section id="td-overview" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">What It Is</h2>
                  <p>
                    Ongoing runtime monitoring leveraging eBPF sensors in the Linux kernel to detect
                    anomalous process execution, privilege escalation, reverse shells, and malicious network
                    connections in real time.
                  </p>
                </section>

                <section id="td-scope" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What We Test &amp; What’s Out of Scope
                  </h2>
                  <p>
                    <strong>In Scope:</strong> Kernel syscall telemetry, suspicious binary executions,
                    container boundary violations, and malicious outbound egress.
                  </p>
                  <p>
                    <strong>Out of Scope:</strong> Desktop end-user IT support or application runtime bugs
                    unrelated to security incidents.
                  </p>
                </section>

                <section id="td-deliverables" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Receive &amp; Timeline
                  </h2>
                  <p>
                    Automated Slack/Email incident alerting, monthly telemetry summary reports, and active
                    quarantine rules. Continuous service deployed within 24 hours.
                  </p>
                </section>

                <section id="td-prereq" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Need to Provide
                  </h2>
                  <p>
                    Server root access or Docker/Kubernetes deployment permissions for the lightweight
                    monitoring daemon.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'service-security-hardening' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Security Hardening Guide
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Baseline configuration lockdown across servers, cloud IAM, and database clusters.
                  </p>
                </header>

                <section id="hard-overview" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">What It Is</h2>
                  <p>
                    Systematic configuration lockdown aligning your servers, containers, and cloud baselines
                    with CIS Benchmarks, disabling redundant services, enforcing least privilege, and
                    hardening SSH/TLS.
                  </p>
                </section>

                <section id="hard-scope" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What We Test &amp; What’s Out of Scope
                  </h2>
                  <p>
                    <strong>In Scope:</strong> Linux kernel sysctl parameters, cloud IAM privilege trimming,
                    database encryption at rest, secure SSH keys, and container filesystem read-only policies.
                  </p>
                  <p>
                    <strong>Out of Scope:</strong> Rebuilding custom software architecture or redesigning
                    business databases.
                  </p>
                </section>

                <section id="hard-deliverables" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Receive &amp; Timeline
                  </h2>
                  <p>
                    Hardening scripts, Ansible playbooks, and a verification scorecard confirming baseline
                    compliance. Typical turnaround: 3 to 5 business days.
                  </p>
                </section>

                <section id="hard-prereq" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    What You Need to Provide
                  </h2>
                  <p>Read-access to server configuration templates or SSH access to a staging node.</p>
                </section>
              </article>
            )}

            {/* 3. LEGAL AND TRUST */}
            {activeSectionId === 'legal-authorization' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Scope &amp; Authorization Rules
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Strict ethical and legal standards governing all security operations.
                  </p>
                </header>

                <section id="legal-rules" className="space-y-3">
                  <h2 className="text-base font-heading font-bold text-slate-900">Written Scope Rules</h2>
                  <p>
                    Abhimanyu InfoSec conducts security assessments strictly under explicit written
                    authorization. We test <strong>only</strong> the assets, URLs, and IP blocks specified in
                    your signed engagement agreement.
                  </p>
                  <p>
                    Any attempt to request testing of assets outside your verified ownership or management
                    boundary will be refused immediately.
                  </p>
                </section>

                <section id="legal-boundary" className="space-y-3 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Boundaries of Authorization
                  </h2>
                  <p>
                    Testing is conducted in compliance with computer fraud and cyber security legislation. Our
                    signed Rules of Engagement document serves as your mutual authorization charter for
                    security teams and hosting providers.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'legal-confidentiality' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Confidentiality &amp; Data Handling
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    How client telemetry, findings, and credentials are protected.
                  </p>
                </header>

                <section id="conf-nda" className="space-y-3">
                  <h2 className="text-base font-heading font-bold text-slate-900">Mutual NDA Standard</h2>
                  <p>
                    Every engagement is backed by a mutual Non-Disclosure Agreement. Your proprietary source
                    code, architecture schematics, test findings, and internal vulnerabilities are never
                    disclosed or shared.
                  </p>
                </section>

                <section id="conf-vault" className="space-y-3 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Encrypted Vault Storage
                  </h2>
                  <p>
                    All vulnerability evidence, tokens, and credentials provided during testing are stored in
                    AES-256 encrypted vaults. Upon project completion and final report acceptance, raw test
                    artifacts are permanently purged according to secure data retention standards.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'legal-limits' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Limits &amp; Point-in-Time Review
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Understanding the scope and limitations of security assessments.
                  </p>
                </header>

                <section id="limit-point-in-time" className="space-y-3">
                  <h2 className="text-base font-heading font-bold text-slate-900">Point-in-Time Review</h2>
                  <p>
                    A penetration test or vulnerability assessment represents a comprehensive evaluation of
                    your systems at a specific snapshot in time. It reflects the security posture of the
                    configured code and infrastructure during the testing window.
                  </p>
                </section>

                <section id="limit-disclaimer" className="space-y-3 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Continuous Change Advisory
                  </h2>
                  <p>
                    Because digital environments evolve rapidly, subsequent code releases, dependency updates,
                    or firewall adjustments can introduce new vulnerabilities. A clean assessment report
                    demonstrates due diligence and significant hardening, but is not an absolute guarantee
                    against future unforeseen exploits.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'legal-policies' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Policies &amp; Trust Center
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Direct access to our regulatory and governance documentation.
                  </p>
                </header>

                <section id="policy-privacy" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">Privacy Policy</h2>
                  <p>
                    Our data protection guidelines detail how visitor analytics and client account
                    information are processed under GDPR, CCPA, and applicable data privacy regulations.
                  </p>
                  <Link to="/" className="text-xs font-semibold text-[#C1121F] hover:underline">
                    Read Privacy Policy →
                  </Link>
                </section>

                <section id="policy-terms" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">Terms of Service</h2>
                  <p>
                    Standard contractual terms defining our services, deliverables, client obligations, and
                    payment milestones.
                  </p>
                  <Link to="/" className="text-xs font-semibold text-[#C1121F] hover:underline">
                    Read Terms of Service →
                  </Link>
                </section>

                <section id="policy-trust" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">Trust Center</h2>
                  <p>
                    Information regarding our internal security certifications, vulnerability disclosure
                    programs, and ethical hacking standards.
                  </p>
                  <Link to="/" className="text-xs font-semibold text-[#C1121F] hover:underline">
                    Visit Trust Center →
                  </Link>
                </section>
              </article>
            )}

            {/* 4. FAQ AND SUPPORT */}
            {activeSectionId === 'faq-common' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Frequently Asked Questions
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Quick answers to our most common client questions.
                  </p>
                </header>

                <section id="faq-duration" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    How long does testing take?
                  </h2>
                  <p>
                    A standard Quick Check takes 2 to 3 business days. A comprehensive Web or Network VAPT
                    typically takes 4 to 6 business days. Full-scope red teaming or large custom builds are
                    scheduled in 1 to 2-week iterations based on your sprint roadmap.
                  </p>
                </section>

                <section id="faq-staging" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Is a staging environment required?
                  </h2>
                  <p>
                    A staging or testing environment is recommended so that intensive tests and simulated
                    exploits do not generate mock alerts or pollute production databases. If testing on
                    production, our team adheres to strict non-destructive protocols and off-peak testing
                    hours.
                  </p>
                </section>

                <section id="faq-retest" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    How does the free retest work?
                  </h2>
                  <p>
                    Every Standard test and Enterprise package includes a complimentary verification retest.
                    Once your engineers push patches, notify our team within 30 days and we will re-run the
                    target exploit paths to verify that each vulnerability is sealed.
                  </p>
                </section>

                <section id="faq-llm" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Do you test AI and LLM implementations?
                  </h2>
                  <p>
                    Yes. We evaluate prompt injection vulnerabilities, unauthorized system prompt retrieval,
                    vector database data leakage, insecure output handling, and adversarial model
                    manipulation.
                  </p>
                </section>
              </article>
            )}

            {activeSectionId === 'faq-support' && (
              <article className="space-y-6">
                <header>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                    Contact Support &amp; Engineering
                  </h1>
                  <p className="text-slate-500 text-sm mt-1">
                    Direct access to our senior offensive engineers and technical support.
                  </p>
                </header>

                <section id="support-channels" className="space-y-2">
                  <h2 className="text-base font-heading font-bold text-slate-900">Support Channels</h2>
                  <p>
                    Active engagement clients receive direct communication via dedicated Slack or Teams
                    channels, alongside secure email correspondence with our technical lead.
                  </p>
                </section>

                <section id="support-sla" className="space-y-2 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">Response SLA</h2>
                  <p>
                    We maintain a standard 24-hour response window for general inquiries, and a 4-hour
                    critical incident response SLA for Enterprise care clients.
                  </p>
                </section>

                <section id="support-contact" className="space-y-3 pt-4 border-t border-slate-100">
                  <h2 className="text-base font-heading font-bold text-slate-900">
                    Direct Engineering Contacts
                  </h2>
                  <div className="space-y-2 text-xs">
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-[#C1121F]" />
                      <span>Email:</span>
                      <a
                        href="mailto:contact@abhimanyuinfosec.com"
                        className="font-semibold text-slate-900 hover:text-[#C1121F] underline"
                      >
                        contact@abhimanyuinfosec.com
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <ExternalLink size={14} className="text-[#0A66C2]" />
                      <span>LinkedIn:</span>
                      <a
                        href="https://www.linkedin.com/company/abhimanyu-infosec/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#0A66C2] hover:underline"
                      >
                        Abhimanyu InfoSec LinkedIn Page
                      </a>
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
                    >
                      <span>Reach Security Desk</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </section>
              </article>
            )}
          </main>

          {/* RIGHT SIDEBAR ("On this page" TOC) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-4 hidden lg:block border-l border-slate-100 pl-6">
            <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-400">
              On this page
            </div>
            {currentTOC.length > 0 ? (
              <ul className="space-y-2 text-xs">
                {currentTOC.map((toc) => (
                  <li key={toc.id}>
                    <a
                      href={`#${toc.id}`}
                      className="text-slate-500 hover:text-[#C1121F] transition-colors block leading-snug"
                    >
                      {toc.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-400">Overview section</p>
            )}

            <div className="pt-6 border-t border-slate-100">
              <Link
                to="/contact"
                className="block text-center w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 hover:border-[#C1121F] hover:text-[#C1121F] transition"
              >
                Book a Free Call →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
