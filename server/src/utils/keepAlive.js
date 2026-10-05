/**
 * Autonomous Keep-Alive Service for Render Free Tier
 *
 * Render free web services spin down after 15 minutes of zero inbound traffic.
 * This worker issues periodic external HTTP GET requests to the public URL
 * every 10 minutes, resetting the idle countdown on Render's ingress proxy.
 */

let keepAliveInterval = null;

export const startKeepAlive = () => {
  const backendUrl = (
    process.env.BACKEND_URL ||
    'https://ais-website-main.onrender.com'
  ).trim().replace(/\/$/, '');

  const intervalMs = 10 * 60 * 1000; // 10 minutes (well under the 15m idle limit)
  const isProduction = process.env.NODE_ENV === 'production';
  const isExplicitlyEnabled = process.env.ENABLE_KEEP_ALIVE === 'true';

  if (!isProduction && !isExplicitlyEnabled) {
    console.log('ℹ️ Keep-Alive daemon is idle (enabled only in production or with ENABLE_KEEP_ALIVE=true).');
    return;
  }

  console.log(`📡 Initializing Render Keep-Alive daemon -> target: ${backendUrl}/api/health (every 10m)`);

  const ping = async () => {
    try {
      const pingUrl = `${backendUrl}/api/health`;
      const t0 = performance.now();
      const res = await fetch(pingUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'AIS-Self-KeepAlive-Daemon/1.0',
          'Cache-Control': 'no-cache',
        },
        signal: AbortSignal.timeout(20000),
      });
      const duration = Math.round(performance.now() - t0);

      if (res.ok) {
        console.log(`💚 [Keep-Alive] Heartbeat OK (${res.status} in ${duration}ms) -> ${pingUrl}`);
      } else {
        console.warn(`⚠️ [Keep-Alive] Heartbeat HTTP ${res.status} in ${duration}ms`);
      }
    } catch (err) {
      console.warn(`⚠️ [Keep-Alive] Heartbeat ping notice: ${err.message}`);
    }
  };

  // Send first ping 2 minutes after boot, then every 10 minutes
  setTimeout(() => {
    ping();
    keepAliveInterval = setInterval(ping, intervalMs);
    if (keepAliveInterval && keepAliveInterval.unref) {
      keepAliveInterval.unref(); // Do not block clean process exit
    }
  }, 2 * 60 * 1000);
};

export const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log('🛑 [Keep-Alive] Daemon stopped.');
  }
};

export default { startKeepAlive, stopKeepAlive };
