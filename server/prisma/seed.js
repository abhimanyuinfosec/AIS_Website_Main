import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Abhimanyu InfoSec...');

  // 1. Seed Super Admin User
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@abhimanyuinfosec.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'AdminSecurePassword2026!';
  const adminName = process.env.SEED_ADMIN_NAME || 'System Administrator';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: adminName,
        role: 'SUPER_ADMIN',
        isActive: true,
      },
    });

    console.log(`✅ Super Admin created: ${admin.email} (Role: ${admin.role})`);
  } else {
    console.log(`ℹ️ Super Admin already exists: ${existingAdmin.email}`);
  }

  // 2. Seed Default Site Settings
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

  // 3. Seed Initial Services from current live site
  const initialServices = [
    {
      name: 'Security Assessment',
      slug: 'security-assessment',
      icon: 'ShieldAlert',
      shortDesc: 'Identify vulnerabilities and security weaknesses across systems and applications.',
      detailedDesc: 'Comprehensive vulnerability assessment and architecture review designed to uncover risks before threat actors can exploit them.',
      objectives: ['Identify unknown vulnerabilities', 'Evaluate current defense efficacy', 'Provide actionable remediation roadmap'],
      features: ['Automated & manual scanning', 'Configuration audits', 'Risk prioritization matrix'],
      deliverables: ['Executive Summary', 'Technical Vulnerability Matrix', 'Patching & Hardening Plan'],
      tools: ['Nmap', 'OpenVAS', 'Burp Suite', 'Custom Analyzers'],
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
      objectives: ['Test authentication & authorization', 'Prevent data leakage', 'Verify business logic security'],
      features: ['OWASP Top 10 testing', 'API endpoint fuzzing', 'Source code review support'],
      deliverables: ['Proof-of-Concept exploits', 'Step-by-step remediation guide', 'Retesting verification'],
      tools: ['Burp Suite Pro', 'OWASP ZAP', 'Postman', 'SQLmap'],
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
      objectives: ['Map exposed assets', 'Identify lateral movement vectors', 'Harden network boundaries'],
      features: ['Port scanning & service enumeration', 'Firewall rule audits', 'Wireless security checks'],
      deliverables: ['Network topology risk map', 'Perimeter lockdown guide', 'Egress control audit'],
      tools: ['Wireshark', 'Nmap', 'Metasploit', 'Custom IDS'],
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
      objectives: ['Real-time attack detection', 'Minimize Mean Time to Detect (MTTD)', 'Correlate multi-stage attacks'],
      features: ['Log aggregation & SIEM support', 'Behavioral anomaly detection', 'Automated alert triage'],
      deliverables: ['Daily / Weekly Threat Briefs', 'Incident Escalate SLAs', 'SOC Dashboard Access'],
      tools: ['Hybrid IDS', 'Suricata', 'ELK Stack', 'IP Intelligence'],
      displayOrder: 4,
      isActive: true,
      featured: true,
    },
  ];

  for (const s of initialServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log(`✅ Initial core cybersecurity services seeded (${initialServices.length} services).`);

  // 4. Seed Initial Products
  const initialProducts = [
    {
      name: 'SANJAY',
      slug: 'sanjay-url-detector',
      shortDesc: 'Phishing URL and Malicious IP detection and threat intelligence platform.',
      detailedDesc: 'Autonomous real-time URL and IP intelligence engine analyzing domain age, SSL anomalies, redirection chains, and lexical patterns to stop phishing campaigns.',
      keyFeatures: ['Live URL detonation simulation', 'Lexical domain analysis', 'Reputation scoring API', 'Browser extension integration'],
      techStack: ['Python', 'FastAPI', 'Machine Learning', 'PostgreSQL', 'Redis'],
      version: 'v1.2.0',
      status: 'BETA',
      featured: true,
    },
    {
      name: 'Hybrid IDS',
      slug: 'hybrid-ids',
      shortDesc: 'Intelligent intrusion detection combining rule-based heuristics and anomaly classification.',
      detailedDesc: 'Next-generation network and host-based intrusion detection system blending signature matching with behavioral machine learning models.',
      keyFeatures: ['Packet inspection engine', 'Low CPU overhead', 'Automated rule generation', 'Anomaly scoring'],
      techStack: ['C++', 'Rust', 'Python', 'eBPF'],
      version: 'v0.9.0',
      status: 'DEVELOPMENT',
      featured: true,
    },
  ];

  for (const p of initialProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  // 5. Seed Initial Team Members
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
  console.log(`✅ Initial team members seeded (${initialTeam.length} members).`);

  // 6. Seed Blog Categories & Posts
  const categories = [
    { name: 'Web Security', slug: 'web-security' },
    { name: 'Network Security', slug: 'network-security' },
    { name: 'Threat Intelligence', slug: 'threat-intelligence' },
    { name: 'SME / MSME Security', slug: 'sme-security' },
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

  const adminUser = await prisma.user.findFirst();
  if (adminUser) {
    const initialPosts = [
      {
        title: '5 Web Security Risks Every Business Should Know in 2026',
        slug: '5-web-security-risks-every-business-should-know',
        excerpt: 'Learn how modern application vulnerabilities, broken access controls, and API authorization flaws can compromise sensitive corporate data.',
        content: 'Modern web applications are increasingly distributed, utilizing microservices and headless architectures that expand the exposed attack surface...',
        categoryId: createdCategories['web-security'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 5,
        publishedAt: new Date(),
      },
      {
        title: 'Why SMEs & MSMEs Are Becoming Primary Targets for Cyber Attacks',
        slug: 'why-smes-are-becoming-targets-for-cyber-attacks',
        excerpt: 'Understanding why smaller organizations need practical zero-trust security controls without requiring multi-million dollar IT budgets.',
        content: 'Small and medium enterprises often assume threat actors only target enterprise giants. In reality, automated botnets and ransomware syndicates target SMEs...',
        categoryId: createdCategories['sme-security'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 4,
        publishedAt: new Date(),
      },
      {
        title: 'What Is Attack Surface Management (ASM) & Why It Matters',
        slug: 'what-is-attack-surface-management',
        excerpt: 'A practical, engineering-first guide to discovering, monitoring, and reducing exposed shadow IT assets and cloud perimeters.',
        content: 'Attack Surface Management is the continuous discovery, analysis, and remediation of cybersecurity vulnerabilities across an organization digital footprint...',
        categoryId: createdCategories['threat-intelligence'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 6,
        publishedAt: new Date(),
      },
      {
        title: 'Vulnerability Assessment vs Penetration Testing: The Comprehensive Guide',
        slug: 'vulnerability-assessment-vs-penetration-testing',
        excerpt: 'Understand the key differences between automated vulnerability scanning and deep adversary simulation, and when your team needs each.',
        content: 'While both vulnerability assessment and penetration testing aim to find security flaws, their goals, methodologies, and depth are distinct...',
        categoryId: createdCategories['network-security'],
        authorId: adminUser.id,
        status: 'PUBLISHED',
        featured: true,
        readingTime: 7,
        publishedAt: new Date(),
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

  console.log('✨ Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

