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
  console.log(`✅ Initial security products seeded (${initialProducts.length} products).`);

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
