import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Abhimanyu InfoSec...');

  // ──────────────────────────────────────────────
  // 1. Seed Super Admin User
  // ──────────────────────────────────────────────
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@abhimanyuinfosec.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'AdminSecurePassword2026!';
  const adminName = process.env.SEED_ADMIN_NAME || 'System Administrator';

  let adminUser = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!adminUser) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(adminPassword, salt);
    adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: adminName,
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });
    console.log(`✅ Super Admin created: ${adminUser.email} (Role: ${adminUser.role})`);
  } else {
    console.log(`ℹ️  Super Admin already exists: ${adminUser.email}`);
  }

  // ──────────────────────────────────────────────
  // 2. Seed Default Site Settings
  // ──────────────────────────────────────────────
  const defaultSettings = [
    { key: 'site.name', value: 'Abhimanyu InfoSec', type: 'string' },
    { key: 'site.tagline', value: 'Cybersecurity for businesses that cannot afford to be vulnerable.', type: 'string' },
    { key: 'site.email', value: 'contact@abhimanyuinfosec.com', type: 'string' },
    { key: 'site.phone', value: '+91 98765 43210', type: 'string' },
    { key: 'hero.title', value: 'Break Through Any Formation.', type: 'string' },
    { key: 'hero.subtitle', value: 'Cybersecurity built for businesses that cannot afford to be vulnerable.', type: 'string' },
    { key: 'hero.desc', value: 'Abhimanyu InfoSec helps businesses identify vulnerabilities, detect threats, strengthen security, and build resilient digital infrastructure.', type: 'string' },
    { key: 'stats.projectsCompleted', value: '50+', type: 'string' },
    { key: 'stats.researchInitiatives', value: '12+', type: 'string' },
    { key: 'stats.toolsDeveloped', value: '8+', type: 'string' },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log(`✅ Default site settings seeded (${defaultSettings.length} keys).`);

  // ──────────────────────────────────────────────
  // 3. Seed Cybersecurity Services
  // ──────────────────────────────────────────────
  const initialServices = [
    {
      name: 'Security Assessment',
      slug: 'security-assessment',
      icon: 'ShieldAlert',
      shortDesc: 'Identify vulnerabilities and security weaknesses across systems and applications.',
      detailedDesc: 'Comprehensive vulnerability assessment and architecture review designed to uncover risks before threat actors can exploit them.',
      problem: 'Organizations often lack visibility into their true attack surface, leaving gaps that adversaries exploit in the first 24 hours of an engagement.',
      objectives: ['Identify unknown vulnerabilities', 'Evaluate current defense efficacy', 'Provide actionable remediation roadmap'],
      features: ['Automated & manual scanning', 'Configuration audits', 'Risk prioritization matrix'],
      methodology: 'We follow a structured PTES (Penetration Testing Execution Standard) combined with OWASP testing guides for a thorough, reproducible assessment.',
      deliverables: ['Executive Summary', 'Technical Vulnerability Matrix', 'Patching & Hardening Plan'],
      tools: ['Nmap', 'OpenVAS', 'Burp Suite', 'Custom Analyzers'],
      cta: 'Request a Security Assessment',
      displayOrder: 1,
      isActive: true,
      featured: true,
    },
    {
      name: 'Web Application Security',
      slug: 'web-application-security',
      icon: 'Globe',
      shortDesc: 'Security testing, vulnerability assessment, OWASP-focused testing, and remediation guidance.',
      detailedDesc: 'Deep-dive security assessments across web applications, APIs, and microservices following OWASP Top 10 guidelines.',
      problem: 'Web apps expose authentication, business logic, and data processing endpoints that are constantly probed by automated scanners and manual adversaries.',
      objectives: ['Test authentication & authorization', 'Prevent data leakage', 'Verify business logic security'],
      features: ['OWASP Top 10 testing', 'API endpoint fuzzing', 'Source code review support'],
      methodology: 'Combines automated tooling (Burp Suite Pro, ZAP) with deep manual testing to find logic flaws that scanners miss.',
      deliverables: ['Proof-of-Concept exploits', 'Step-by-step remediation guide', 'Retesting verification'],
      tools: ['Burp Suite Pro', 'OWASP ZAP', 'Postman', 'SQLmap'],
      cta: 'Secure Your Web Application',
      displayOrder: 2,
      isActive: true,
      featured: true,
    },
    {
      name: 'Network Security',
      slug: 'network-security',
      icon: 'Network',
      shortDesc: 'Network assessment, exposed service analysis, configuration review, and security hardening.',
      detailedDesc: 'Internal and external network penetration testing, perimeter defense analysis, and firewall configuration audit.',
      problem: 'Misconfigured firewalls, legacy services, and flat network topologies allow lateral movement that transforms a single compromised host into a full breach.',
      objectives: ['Map exposed assets', 'Identify lateral movement vectors', 'Harden network boundaries'],
      features: ['Port scanning & service enumeration', 'Firewall rule audits', 'Wireless security checks'],
      methodology: 'Black-box and grey-box testing from external attacker perspective, followed by internal network emulation to validate segmentation controls.',
      deliverables: ['Network topology risk map', 'Perimeter lockdown guide', 'Egress control audit'],
      tools: ['Wireshark', 'Nmap', 'Metasploit', 'Custom IDS'],
      cta: 'Harden Your Network Perimeter',
      displayOrder: 3,
      isActive: true,
      featured: true,
    },
    {
      name: 'Threat Detection & Monitoring',
      slug: 'threat-detection',
      icon: 'Activity',
      shortDesc: 'Monitor security events and identify suspicious activity in real-time.',
      detailedDesc: 'Continuous telemetry analysis, log correlation, and anomaly detection powered by hybrid intrusion detection mechanisms.',
      problem: 'Most organizations detect breaches after 197 days on average. Real-time monitoring closes this gap to hours or minutes.',
      objectives: ['Real-time attack detection', 'Minimize Mean Time to Detect (MTTD)', 'Correlate multi-stage attacks'],
      features: ['Log aggregation & SIEM support', 'Behavioral anomaly detection', 'Automated alert triage'],
      methodology: 'Hybrid rule-based + ML anomaly detection with human SOC analyst escalation for confirmed incidents.',
      deliverables: ['Daily / Weekly Threat Briefs', 'Incident Escalate SLAs', 'SOC Dashboard Access'],
      tools: ['Hybrid IDS', 'Suricata', 'ELK Stack', 'IP Intelligence'],
      cta: 'Deploy Real-Time Threat Detection',
      displayOrder: 4,
      isActive: true,
      featured: true,
    },
    {
      name: 'Cloud Security Architecture',
      slug: 'cloud-security',
      icon: 'Cloud',
      shortDesc: 'Secure cloud workloads, container infrastructure, and multi-cloud IAM policies.',
      detailedDesc: 'End-to-end cloud security design covering AWS, Azure, and GCP — from IAM hardening to container runtime defense and supply chain integrity.',
      problem: 'Cloud misconfigurations are responsible for 80%+ of public cloud breaches. Workload identity confusion and overpermissioned roles expose entire tenants.',
      objectives: ['Eliminate IAM over-privilege', 'Secure containerized workloads', 'Enforce supply chain integrity'],
      features: ['CIS Benchmark compliance automation', 'Zero-trust network policy enforcement', 'CI/CD pipeline security gates'],
      methodology: 'Architecture review followed by live infrastructure scanning using cloud-native APIs and open-source security tooling.',
      deliverables: ['Cloud Security Posture Report', 'IAM Remediation Runbook', 'Compliance Scorecard'],
      tools: ['AWS Security Hub', 'Falco', 'Trivy', 'OPA Gatekeeper', 'Cosign'],
      cta: 'Secure Your Cloud Infrastructure',
      displayOrder: 5,
      isActive: true,
      featured: false,
    },
  ];

  for (const s of initialServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log(`✅ Services seeded (${initialServices.length} services).`);

  // ──────────────────────────────────────────────
  // 4. Seed Security Products
  // ──────────────────────────────────────────────
  const initialProducts = [
    {
      name: 'AutoRed APT',
      slug: 'autored-apt',
      shortDesc: 'Orchestrate reconnaissance, vulnerability discovery, and reporting through a unified automated pentesting workflow.',
      detailedDesc: 'AutoRed APT is an automated adversary simulation and penetration testing platform designed to simulate modern threat actors, discover exploitable attack paths, and generate audit-ready compliance reports.',
      problem: 'Manual penetration testing is periodic, expensive, and fails to keep pace with rapid code deployments, leaving perimeter gaps undiscovered between audit cycles.',
      keyFeatures: [
        'Automated reconnaissance & surface discovery',
        'CVE exploit verification & lateral movement checks',
        'Continuous adversary emulation workflows',
        'Automated compliance mapping (SOC2, ISO 27001)',
        'Actionable executive & developer remediation reports',
      ],
      architecture: 'Distributed agent mesh with a central orchestration controller, event-driven workflow engine, and pluggable exploit module registry.',
      techStack: ['Python', 'Golang', 'Docker', 'Kubernetes', 'FastAPI'],
      version: 'v2.4.0',
      status: 'PRODUCTION',
      githubUrl: 'https://github.com/Abhimanyu-InfoSec',
      demoUrl: '/contact',
      docsUrl: '/contact',
      featured: true,
      publishedAt: new Date('2025-06-01'),
    },
    {
      name: 'IP Intelligence',
      slug: 'ip-intelligence',
      shortDesc: 'Decode any IP address — reputation, geolocation, ASN, hosting, and real-time threat indicators in one lookup.',
      detailedDesc: 'Global IP Threat Intelligence engine providing low-latency risk telemetry, BGP route tracing, botnet/C2 correlation, and Tor/proxy/VPN tagging for proactive defense.',
      problem: 'Security analysts face alert fatigue and delayed investigations when validating high-volume incoming connection anomalies across disparate data feeds.',
      keyFeatures: [
        'Abuse confidence scoring & threat history',
        'High-precision geolocation & physical hosting location',
        'BGP routing announcements & ASN ownership data',
        'Proxy, VPN, Tor exit node, and cloud egress tagging',
        'C2 botnet tracking & automated blocklist syncing',
      ],
      architecture: 'Multi-region distributed query layer backed by aggregated threat intelligence feeds, real-time BGP monitoring, and probabilistic classification models.',
      techStack: ['Rust', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka'],
      version: 'v3.1.0',
      status: 'PRODUCTION',
      githubUrl: 'https://github.com/Abhimanyu-InfoSec',
      demoUrl: '/contact',
      docsUrl: '/contact',
      featured: true,
      publishedAt: new Date('2025-08-15'),
    },
    {
      name: 'Hybrid IDS',
      slug: 'hybrid-ids',
      shortDesc: 'Detect malicious network behavior with a research-driven hybrid intrusion detection system powered by neural models.',
      detailedDesc: 'Hybrid Intrusion Detection System combining deterministic signature filters with deep unsupervised neural network models to catch zero-day attacks and stealthy lateral movements.',
      problem: 'Traditional signature-only IDS tools generate excessive false positives and fail to detect novel zero-day attack patterns that deviate from known rule sets.',
      keyFeatures: [
        'High-throughput deep packet inspection (DPI)',
        'Unsupervised neural anomaly deviation modeling',
        'Multi-class attack classification mapped to MITRE',
        'Low-latency inline threat containment triggers',
        'Automated triage to eliminate SOC false-alert fatigue',
      ],
      architecture: 'eBPF-powered kernel bypass for packet capture feeding into a dual-pipeline: signature matching engine (Suricata rules) + PyTorch inference microservice.',
      techStack: ['PyTorch', 'C++', 'eBPF', 'Suricata', 'FastAPI'],
      version: 'v1.8.0',
      status: 'BETA',
      githubUrl: 'https://github.com/Abhimanyu-InfoSec',
      demoUrl: '/contact',
      docsUrl: '/contact',
      featured: true,
      publishedAt: new Date('2025-10-01'),
    },
    {
      name: 'SANJAY',
      slug: 'sanjay-url-detector',
      shortDesc: 'Phishing URL and Malicious IP detection and threat intelligence platform.',
      detailedDesc: 'Autonomous real-time URL and IP intelligence engine analyzing domain age, SSL anomalies, redirection chains, and lexical patterns to stop phishing campaigns.',
      problem: 'Phishing links evolve within minutes of detection, bypassing static blocklists and leaving users and organizations exposed to credential theft and malware delivery.',
      keyFeatures: [
        'Live URL detonation simulation',
        'Lexical domain analysis',
        'Reputation scoring API',
        'Browser extension integration',
        'Enterprise webhook integrations',
      ],
      architecture: 'Stateless URL analysis microservice with Redis caching, threat feed aggregation pipeline, and a REST + WebSocket API for real-time integrations.',
      techStack: ['Python', 'FastAPI', 'Machine Learning', 'PostgreSQL', 'Redis'],
      version: 'v1.2.0',
      status: 'BETA',
      githubUrl: 'https://github.com/Abhimanyu-InfoSec',
      demoUrl: '/contact',
      docsUrl: '/contact',
      featured: true,
      publishedAt: new Date('2025-09-01'),
    },
  ];

  for (const p of initialProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log(`✅ Products seeded (${initialProducts.length} products).`);

  // ──────────────────────────────────────────────
  // 5. Seed Security Projects / Case Studies
  // ──────────────────────────────────────────────
  const initialProjects = [
    {
      name: 'Global Banking SWIFT Gateway Red Team & Hardening',
      slug: 'banking-swift-gateway-red-team',
      category: 'Adversary Simulation & Hardening',
      shortDesc: 'Nation-state threat simulation and wire-tampering defense for an international Tier-1 financial institution.',
      detailedDesc: 'Abhimanyu InfoSec conducted an exhaustive full-scope adversary emulation replicating advanced persistent threats (APTs). Our team validated transaction isolation boundaries, reverse-engineered HSM communications, and engineered zero-trust kernel defense policies.',
      problem: 'High-value financial transactions network requiring stress testing against nation-state APT kill chains, out-of-band wire tampering, and compromised insider accounts.',
      solution: 'End-to-end black-box adversary simulation compromising network perimeters and proving lateral movement into the staging payment core, followed by zero-trust enclave hardening and automated SIEM detection rules.',
      keyFeatures: [
        'Multi-phase simulated APT adversary attack',
        'Air-gapped transaction enclave verification',
        'Defensive SIEM/SOC rule generation & live debrief',
        'Executive board-level cyber threat landscape briefing',
      ],
      techStack: ['Cobalt Strike', 'Custom C2 Rust', 'Wireshark', 'Suricata', 'Linux Hardening', 'Snort'],
      githubUrl: '',
      liveUrl: 'https://abhimanyuinfosec.com/services/adversary-simulation',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2025-11-10'),
    },
    {
      name: 'Enterprise Cloud DevSecOps & Container Security Gate',
      slug: 'cloud-devsecops-container-security',
      category: 'Cloud Security & DevSecOps',
      shortDesc: 'Automated CI/CD supply chain security gate and runtime eBPF threat detection for 500+ microservices.',
      detailedDesc: 'Designed and deployed an automated, zero-friction DevSecOps security pipeline for a multi-cloud healthtech platform. Enforced cryptographic artifact signing, OPA Gatekeeper cluster policies, and live container escape prevention.',
      problem: 'Rapid deployment cycles resulting in unvetted container base images, inadvertent API credential leakage in Git repos, and lack of runtime cluster visibility.',
      solution: 'Integrated automated image vulnerability gating via Trivy, secret sanitization pre-commit hooks, Cosign digital signing, and runtime Falco behavioral telemetry.',
      keyFeatures: [
        'Zero-friction automated CI/CD pipeline vulnerability gating',
        'Automated cluster CIS benchmark compliance reporting',
        'Runtime privilege escalation prevention via eBPF probes',
        'Ephemeral credential injection with zero secrets in code',
      ],
      techStack: ['Kubernetes', 'Trivy', 'OPA Gatekeeper', 'Falco', 'Cosign', 'HashiCorp Vault'],
      githubUrl: 'https://github.com/abhimanyu-infosec/cloud-security-gate',
      liveUrl: '',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2025-12-20'),
    },
    {
      name: 'National Critical Infrastructure SCADA / ICS Security Audit',
      slug: 'scada-ics-critical-infrastructure-audit',
      category: 'Industrial Security (OT/ICS)',
      shortDesc: 'Comprehensive vulnerability audit and protocol fortification for electrical grid SCADA telecontrol networks.',
      detailedDesc: 'Conducted rigorous, non-destructive penetration testing and communication fuzzing across Modbus, DNP3, and IEC 60870-5-104 control loops, pinpointing unauthorized command injection vectors and engineering hardened DMZ topologies.',
      problem: 'Power transmission utility SCADA protocols exposed to potential remote command injection, legacy PLC firmware exploits, and unsegmented substation communications.',
      solution: 'Performed passive network packet deep inspection, custom protocol fuzzing, and physical gateway air-gap fortification without disrupting 24/7 power transmission.',
      keyFeatures: [
        'Non-intrusive ICS/SCADA protocol traffic inspection',
        'Legacy PLC firmware vulnerability analysis and mitigation',
        'Air-gap DMZ boundary segmentation & unidirectional data diodes',
        'OT-specific cyber incident response playbook',
      ],
      techStack: ['Modbus/DNP3', 'IEC 60870-5', 'Suricata OT', 'Python Scapy', 'Wireshark', 'Industrial Firewalls'],
      githubUrl: '',
      liveUrl: 'https://abhimanyuinfosec.com/services/ics-security',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2026-01-25'),
    },
  ];

  for (const proj of initialProjects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {},
      create: proj,
    });
  }
  console.log(`✅ Projects seeded (${initialProjects.length} case studies).`);

  // ──────────────────────────────────────────────
  // 6. Seed Research Papers
  // ──────────────────────────────────────────────
  const initialResearch = [
    {
      title: 'Deep Packet Anomaly Detection in High-Throughput Enterprise Gateways using eBPF & Quantized Transformers',
      slug: 'ebpf-deep-packet-anomaly-detection',
      authors: ['Abhimanyu Research Labs', 'K. S. Verma', 'Aditya Sharma'],
      category: 'Intrusion Detection Systems',
      abstract: 'This paper presents a novel approach to inline kernel-level packet inspection utilizing extended Berkeley Packet Filters (eBPF) combined with quantized multi-head attention transformers. Benchmarked across 100 Gbps simulated enterprise pipelines, the architecture achieves a 99.4% detection rate for zero-day obfuscated payloads while maintaining sub-1.2 microsecond processing latency.',
      description: 'Detailed analysis of kernel bypass techniques, programmable network interface cards (SmartNICs), and ultra-low latency machine learning inference in defensive cyber operations.',
      keywords: ['eBPF', 'Packet Inspection', 'Zero-day Detection', 'Transformer Networks', 'Network Security', 'IDS'],
      journal: 'IEEE Transactions on Dependable and Secure Computing (TDSC)',
      doi: '10.1109/TDSC.2025.1092841',
      paperUrl: 'https://arxiv.org',
      datasetUrl: 'https://huggingface.co',
      githubUrl: 'https://github.com/abhimanyu-infosec/ebpf-threat-detector',
      citation: 'Verma, K. S., et al. (2025). Deep Packet Anomaly Detection using eBPF. IEEE TDSC, 22(4), 1845-1859.',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2025-10-12'),
    },
    {
      title: 'Autonomous Graph-Based Adversary Simulation in Hybrid Multi-Cloud Infrastructures',
      slug: 'autonomous-graph-adversary-simulation',
      authors: ['Offensive Security Division', 'Elena Rostova', 'Marcus Chen'],
      category: 'Threat Intelligence',
      abstract: 'Enterprise multi-cloud networks exhibit non-deterministic trust boundaries between AWS, Azure, and on-premises directory structures. We demonstrate an autonomous lateral movement graph algorithm that computes shortest privilege-escalation vectors in polynomial time, validating zero-trust security postures without service disruption.',
      description: 'Empirical evaluation of 1,200 simulated hybrid environments highlighting credential hygiene deficiencies and cross-cloud IAM role chaining vulnerabilities.',
      keywords: ['Adversary Simulation', 'Multi-cloud', 'Graph Algorithms', 'Lateral Movement', 'Zero Trust', 'IAM'],
      journal: 'Journal of Information Security and Applications (Elsevier)',
      doi: '10.1016/j.jisa.2025.103789',
      paperUrl: 'https://arxiv.org',
      datasetUrl: '',
      githubUrl: 'https://github.com/abhimanyu-infosec/autored-core',
      citation: 'Rostova, E., & Chen, M. (2025). Autonomous Graph-Based Adversary Simulation. J. Inf. Secur. Appl., 81, 103789.',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2025-12-05'),
    },
    {
      title: 'Empirical Security Analysis of Enterprise GraphQL and Microservice Service Meshes',
      slug: 'empirical-security-graphql-microservice-meshes',
      authors: ['Application Security Group', 'Vikramaditya Roy'],
      category: 'Web & Application Security',
      abstract: 'A systematic audit of 450+ enterprise GraphQL and REST API meshes, identifying pervasive authorization token confusion, deep query nested circular denial-of-service, and batch introspection vulnerabilities across production financial and healthcare platforms.',
      description: 'Guidelines and open-source defensive plugins for Envoy proxy and Apollo Router to eliminate AST traversal abuse and broken object level authorization (BOLA).',
      keywords: ['GraphQL Security', 'API Security', 'BOLA', 'Microservices', 'Authorization', 'Web Security'],
      journal: 'ACM Conference on Computer and Communications Security (CCS)',
      doi: '10.1145/3576915.3623101',
      paperUrl: 'https://dl.acm.org',
      datasetUrl: '',
      githubUrl: 'https://github.com/abhimanyu-infosec/graphql-armor-mesh',
      citation: 'Roy, V. (2026). Empirical Security Analysis of Enterprise GraphQL Meshes. ACM CCS 2026, 412-426.',
      featured: true,
      status: 'PUBLISHED',
      publishedAt: new Date('2026-02-18'),
    },
  ];

  for (const paper of initialResearch) {
    await prisma.research.upsert({
      where: { slug: paper.slug },
      update: {},
      create: paper,
    });
  }
  console.log(`✅ Research papers seeded (${initialResearch.length} papers).`);

  // ──────────────────────────────────────────────
  // 7. Seed Team Members
  // ──────────────────────────────────────────────
  const initialTeam = [
    {
      name: 'Dr. Vikramaditya Sharma',
      role: 'Founder / Cybersecurity Lead',
      shortBio: 'Responsible for cybersecurity strategy, security research, product direction and technical development.',
      detailedBio: 'Over 14 years of offensive and defensive security experience. Spearheaded enterprise defense architecture across Fortune 500 networks.',
      skills: ['Zero-Trust Architecture', 'Red Teaming', 'Cloud Security', 'VAPT'],
      expertise: ['Offensive Security', 'Threat Modeling'],
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'lead@abhimanyuinfosec.com',
      displayOrder: 1,
      isActive: true,
    },
    {
      name: 'Aarav Patel',
      role: 'Offensive Security Researcher & Pen Tester',
      shortBio: 'Specializes in web application penetration testing, zero-day vulnerability discovery, and exploit validation.',
      detailedBio: 'Prolific bug hunter and offensive security specialist certified with OSCP and CRTO.',
      skills: ['OWASP Top 10', 'API Fuzzing', 'Reverse Engineering', 'Burp Suite Pro'],
      expertise: ['Web App Penetration Testing', 'API Security'],
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'research@abhimanyuinfosec.com',
      displayOrder: 2,
      isActive: true,
    },
    {
      name: 'Rohan Deshmukh',
      role: 'Cloud & Network Security Lead',
      shortBio: 'Focuses on network hardening, micro-segmentation, and automated perimeter threat detection.',
      detailedBio: 'Architects fault-tolerant, air-gapped network security infrastructure across AWS, Azure, and private cloud enclaves.',
      skills: ['Network Hardening', 'Firewall Auditing', 'Kubernetes Security', 'eBPF'],
      expertise: ['Perimeter Defense', 'Infrastructure Hardening'],
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'infra@abhimanyuinfosec.com',
      displayOrder: 3,
      isActive: true,
    },
    {
      name: 'Meera Nambiar',
      role: 'AI & Security Systems Developer',
      shortBio: 'Builds intelligent intrusion detection pipelines, real-time telemetry correlation, and autonomous mitigation bots.',
      detailedBio: 'Specializes in machine learning application for high-throughput network packet analysis and anomaly detection.',
      skills: ['Python', 'FastAPI', 'Machine Learning', 'ELK Stack', 'Rust'],
      expertise: ['AI Cyber Defense', 'SIEM / SOAR Automation'],
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'ai-sec@abhimanyuinfosec.com',
      displayOrder: 4,
      isActive: true,
    },
  ];

  for (const t of initialTeam) {
    const existing = await prisma.teamMember.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.teamMember.create({ data: t });
    }
  }
  console.log(`✅ Team members seeded (${initialTeam.length} members).`);

  // ──────────────────────────────────────────────
  // 8. Seed Client Reviews / Testimonials
  // ──────────────────────────────────────────────
  const initialReviews = [
    {
      reviewerName: 'Michael Vance',
      designation: 'Chief Information Security Officer',
      organization: 'Apex FinTech Global',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      reviewText: "Abhimanyu InfoSec's adversary simulation and architecture review discovered zero-day vulnerabilities in our transaction gateway that three prior compliance audits missed. Outstanding tactical precision and professional execution.",
      rating: 5,
      verified: true,
      status: 'PUBLISHED',
      date: new Date('2025-11-14'),
      source: 'Direct Engagement',
    },
    {
      reviewerName: 'Dr. Elena Rostova',
      designation: 'VP of Engineering & Cloud Infrastructure',
      organization: 'QuantumCloud Labs',
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      reviewText: "AutoRed and CloudSentinel completely overhauled our SecOps workflows. Our mean-time-to-remediate critical CVEs dropped by 72% within the first quarter, giving our leadership total visibility into multi-cloud risk.",
      rating: 5,
      verified: true,
      status: 'PUBLISHED',
      date: new Date('2025-12-02'),
      source: 'Direct Engagement',
    },
    {
      reviewerName: 'Rajeshwar Sen',
      designation: 'Head of Cyber Defense Operations',
      organization: 'Bharat National Infrastructure',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      reviewText: "Their industrial network and penetration testing methodologies are world-class. The team didn't just deliver a static PDF—they gave our engineers exact proof-of-concepts, live debriefs, and fortified our perimeter defenses.",
      rating: 5,
      verified: true,
      status: 'PUBLISHED',
      date: new Date('2026-01-18'),
      source: 'Direct Engagement',
    },
    {
      reviewerName: 'Sarah Jenkins',
      designation: 'Director of Information Security',
      organization: 'OmniHealth Systems',
      profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      reviewText: "Exceptional speed, rigorous confidentiality, and deep domain knowledge during our HIPAA compliance penetration test. They pinpointed subtle API authorization flaws and helped our dev team build resilient controls.",
      rating: 5,
      verified: true,
      status: 'PUBLISHED',
      date: new Date('2026-02-05'),
      source: 'Direct Engagement',
    },
  ];

  for (const review of initialReviews) {
    const existing = await prisma.review.findFirst({
      where: { reviewerName: review.reviewerName, organization: review.organization },
    });
    if (!existing) {
      await prisma.review.create({ data: review });
    }
  }
  console.log(`✅ Client reviews/testimonials seeded (${initialReviews.length} reviews).`);

  // ──────────────────────────────────────────────
  // 9. Seed Blog Categories & Posts
  // ──────────────────────────────────────────────
  const categories = [
    { name: 'Web Security', slug: 'web-security' },
    { name: 'Network Security', slug: 'network-security' },
    { name: 'Threat Intelligence', slug: 'threat-intelligence' },
    { name: 'SME / MSME Security', slug: 'sme-security' },
    { name: 'Cloud Security', slug: 'cloud-security' },
    { name: 'Industrial & OT Security', slug: 'ot-ics-security' },
  ];

  const createdCategories = {};
  for (const cat of categories) {
    const c = await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories[cat.slug] = c.id;
  }
  console.log(`✅ Blog categories seeded (${categories.length} categories).`);

  if (adminUser) {
    const initialPosts = [
      {
        title: '5 Web Security Risks Every Business Should Know in 2026',
        slug: '5-web-security-risks-every-business-should-know',
        excerpt: 'Learn how modern application vulnerabilities, broken access controls, and API authorization flaws can compromise sensitive corporate data.',
        content: `Modern web applications are increasingly distributed, utilizing microservices and headless architectures that expand the exposed attack surface.

**1. Broken Object Level Authorization (BOLA)**
The most common API vulnerability. Attackers manipulate resource IDs in API requests to access data belonging to other users.

**2. SQL Injection via ORM Misconfiguration**
Despite ORMs, raw query escapes in dynamic filters remain exploitable. Always use parameterized queries.

**3. Authentication Token Confusion**
JWT algorithm confusion attacks allow forging tokens when servers accept both symmetric and asymmetric algorithms.

**4. SSRF in Cloud Environments**
Server-Side Request Forgery targeting cloud metadata endpoints (AWS: 169.254.169.254) can expose IAM credentials.

**5. Insecure Direct Object References in GraphQL**
Deep query nesting and batch introspection expose internal schema structures and bypass rate limits.

**Remediation**: Implement defense-in-depth — WAF, input validation, output encoding, and regular penetration testing cycles.`,
        categoryId: createdCategories['web-security'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 5,
        publishedAt: new Date('2026-01-15'),
      },
      {
        title: 'Why SMEs & MSMEs Are Becoming Primary Targets for Cyber Attacks',
        slug: 'why-smes-are-becoming-targets-for-cyber-attacks',
        excerpt: 'Understanding why smaller organizations need practical zero-trust security controls without requiring multi-million dollar IT budgets.',
        content: `Small and medium enterprises often assume threat actors only target enterprise giants. In reality, automated botnets and ransomware syndicates target SMEs due to weaker controls.

**The Economics of Targeting SMEs**
Ransomware operators use automated scanning to identify vulnerable RDP ports, outdated CMS plugins, and unpatched VPNs. SMEs are soft targets that pay faster.

**Top Vectors Used Against SMEs**
- Phishing campaigns exploiting low security awareness
- Unpatched WordPress/Joomla installations
- Exposed admin panels without MFA
- Credential stuffing from data breaches

**Affordable Zero-Trust Controls**
1. Multi-Factor Authentication on all external-facing services
2. Network segmentation via VLAN and firewall rules
3. Regular vulnerability scanning (free tools: OpenVAS, Nuclei)
4. Endpoint Detection & Response (EDR) for workstations
5. Immutable offsite backups tested quarterly

**ROI of Prevention**
Average ransomware payment for SMEs: $170,000. A quarterly security assessment costs a fraction of that.`,
        categoryId: createdCategories['sme-security'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 4,
        publishedAt: new Date('2026-02-01'),
      },
      {
        title: 'What Is Attack Surface Management (ASM) & Why It Matters',
        slug: 'what-is-attack-surface-management',
        excerpt: 'A practical, engineering-first guide to discovering, monitoring, and reducing exposed shadow IT assets and cloud perimeters.',
        content: `Attack Surface Management is the continuous discovery, analysis, and remediation of cybersecurity vulnerabilities across an organization's digital footprint.

**What Constitutes Your Attack Surface?**
- All internet-facing IP addresses and domains
- Cloud storage buckets (S3, GCS, Azure Blob)
- SaaS applications with corporate SSO
- Third-party vendor access points
- Employee devices on remote networks

**Discovering Shadow IT**
Shadow IT — applications deployed without IT approval — represents a major unmonitored attack surface. Identify via:
- DNS enumeration and certificate transparency logs
- Cloud account audits (AWS Config, GCP Asset Inventory)
- Network traffic analysis for unexpected egress

**Prioritization Framework**
Not all exposed assets are equal. Prioritize by:
1. Exploitability (CVSS score + exploit availability)
2. Business criticality of the asset
3. Data sensitivity exposure risk

**ASM Tooling**
Open-source: Amass, Subfinder, Shodan (passive recon)
Commercial: Censys, Tenable ASM, Microsoft Defender EASM

**Continuous ASM Program**
Weekly automated scanning + monthly manual review + quarterly red team exercise = robust attack surface hygiene.`,
        categoryId: createdCategories['threat-intelligence'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 6,
        publishedAt: new Date('2026-02-20'),
      },
      {
        title: 'Vulnerability Assessment vs Penetration Testing: The Comprehensive Guide',
        slug: 'vulnerability-assessment-vs-penetration-testing',
        excerpt: 'Understand the key differences between automated vulnerability scanning and deep adversary simulation, and when your team needs each.',
        content: `While both vulnerability assessment and penetration testing aim to find security flaws, their goals, methodologies, and depth are fundamentally distinct.

**Vulnerability Assessment**
Automated scanning to identify known vulnerabilities (CVEs) across systems. Produces a list of potential weaknesses ranked by severity.
- Tools: Nessus, OpenVAS, Qualys
- Frequency: Monthly or quarterly
- Cost: Low to moderate
- Output: CVE list with CVSS scores

**Penetration Testing**
Manual, adversary-driven exploitation of vulnerabilities to demonstrate real-world impact. Goes beyond detection to prove exploitability and lateral movement.
- Tools: Metasploit, Burp Suite, custom exploits
- Frequency: Annually or after major changes
- Cost: Moderate to high
- Output: Attack narrative with full kill chain

**When to Use Each**
| Scenario | VA | Pentest |
|---|---|---|
| Compliance baseline | ✅ | Optional |
| Pre-launch security check | ✅ | ✅ |
| Post-breach forensics | ✅ | ✅ |
| Board-level risk demonstration | ❌ | ✅ |
| Continuous monitoring | ✅ | ❌ |

**Best Practice**: Run quarterly vulnerability assessments and annual penetration tests. For high-risk environments, monthly pentests via automated adversary simulation platforms are recommended.`,
        categoryId: createdCategories['network-security'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 7,
        publishedAt: new Date('2026-03-05'),
      },
      {
        title: 'Securing Kubernetes Clusters: A Zero-Trust Hardening Checklist',
        slug: 'securing-kubernetes-clusters-zero-trust-hardening',
        excerpt: 'A production-grade security checklist covering RBAC, network policies, pod security, and runtime threat detection for Kubernetes environments.',
        content: `Kubernetes clusters are complex distributed systems with many potential misconfigurations. This checklist covers the critical controls for production hardening.

**1. Authentication & Authorization**
- [ ] Disable anonymous API server access
- [ ] Enable RBAC and audit all ClusterRoleBindings
- [ ] Use service account tokens with minimum required permissions
- [ ] Rotate service account keys quarterly

**2. Network Policies**
- [ ] Default-deny all ingress and egress with NetworkPolicy
- [ ] Restrict pod-to-pod communication to required paths only
- [ ] Use service mesh (Istio/Linkerd) for mTLS between services

**3. Pod Security**
- [ ] Enforce PodSecurity standards (Restricted profile)
- [ ] Disable privileged containers and hostPath mounts
- [ ] Set readOnlyRootFilesystem: true where possible
- [ ] Drop all capabilities, add only required ones

**4. Supply Chain Security**
- [ ] Sign and verify container images with Cosign/Notary
- [ ] Scan images in CI/CD with Trivy before deployment
- [ ] Use admission controllers (OPA Gatekeeper) to enforce policies

**5. Runtime Detection**
- [ ] Deploy Falco for behavioral anomaly detection
- [ ] Enable Kubernetes audit logging to a SIEM
- [ ] Monitor for container escapes and privilege escalations

**6. Secrets Management**
- [ ] Never store secrets in environment variables or ConfigMaps
- [ ] Use HashiCorp Vault or AWS Secrets Manager with sidecar injection
- [ ] Rotate all secrets at least quarterly`,
        categoryId: createdCategories['cloud-security'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: false,
        readingTime: 8,
        publishedAt: new Date('2026-03-15'),
      },
    ];

    for (const post of initialPosts) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {},
        create: post,
      });
    }
    console.log(`✅ Blog posts seeded (${initialPosts.length} posts).`);
  }

  console.log('\n✨ Database seeding completed successfully.');
  console.log('📊 Summary:');
  console.log('   • Super Admin user');
  console.log('   • 10 site settings');
  console.log('   • 5 cybersecurity services');
  console.log('   • 4 security products (AutoRed APT, IP Intelligence, Hybrid IDS, SANJAY)');
  console.log('   • 3 case study projects');
  console.log('   • 3 research papers');
  console.log('   • 4 team members');
  console.log('   • 4 client testimonials/reviews');
  console.log('   • 6 blog categories');
  console.log('   • 5 blog posts');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
