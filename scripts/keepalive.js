#!/usr/bin/env node

/**
 * Standalone CLI Keep-Alive Daemon
 *
 * Usage:
 *   node scripts/keepalive.js
 *   TARGET_URL=https://ais-website-main.onrender.com/api/health INTERVAL_MINUTES=10 npm run keepalive
 */

const TARGET_URL = process.env.TARGET_URL || 'https://ais-website-main.onrender.com/api/health';
const INTERVAL_MINUTES = parseInt(process.env.INTERVAL_MINUTES || '10', 10);
const INTERVAL_MS = INTERVAL_MINUTES * 60 * 1000;

console.log(`🛡️ AIS Autonomous Keep-Alive Daemon`);
console.log(`🎯 Target: ${TARGET_URL}`);
console.log(`⏱️  Interval: Every ${INTERVAL_MINUTES} minutes`);
console.log(`Press Ctrl+C to terminate.\n`);

async function ping() {
  const timestamp = new Date().toLocaleTimeString();
  const t0 = performance.now();
  try {
    const res = await fetch(TARGET_URL, {
      method: 'GET',
      headers: { 'User-Agent': 'AIS-CLI-KeepAlive/1.0' },
      signal: AbortSignal.timeout(30000),
    });
    const latency = Math.round(performance.now() - t0);

    if (res.ok) {
      console.log(`[${timestamp}] 💚 Heartbeat OK (HTTP ${res.status} in ${latency}ms)`);
    } else {
      console.warn(`[${timestamp}] ⚠️ Heartbeat HTTP ${res.status} in ${latency}ms`);
    }
  } catch (err) {
    const latency = Math.round(performance.now() - t0);
    console.error(`[${timestamp}] ❌ Heartbeat failed (${latency}ms): ${err.message}`);
  }
}

// Initial ping immediately on start, then repeat on schedule
ping();
setInterval(ping, INTERVAL_MS);
