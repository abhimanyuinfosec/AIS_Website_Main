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

  const intervalMs = 5 * 60 * 1000; // 5 minutes (well under Render's 15m idle limit)
  const isProduction = process.env.NODE_ENV === 'production';
  const isRender = process.env.RENDER === 'true';
  const isExplicitlyEnabled = process.env.ENABLE_KEEP_ALIVE === 'true';
  const isExplicitlyDisabled = process.env.ENABLE_KEEP_ALIVE === 'false';

  if (isExplicitlyDisabled || (!isProduction && !isRender && !isExplicitlyEnabled)) {
    console.log('ℹ️ Keep-Alive daemon is idle (enabled in production, on Render, or with ENABLE_KEEP_ALIVE=true).');
    return;
  }

  console.log(`📡 Initializing Render Keep-Alive daemon -> target: ${backendUrl}/api/health (every 5m)`);

  const ping = async () => {
    try {
      const pingUrl = `${backendUrl}/api/health`;
      const t0 = performance.now();
      const res = await fetch(pingUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'AIS-Self-KeepAlive-Daemon/2.0',
          'Cache-Control': 'no-cache',
        },
        signal: AbortSignal.timeout(20000),
      });
      const duration = Math.round(performance.now() - t0);

      if (res.ok) {
        console.log(`💚 [Keep-Alive] Heartbeat OK (${res.status} in ${duration}ms) -> ${pingUrl}`);
      } else {
        console.warn(`⚠️ [Keep-Alive] Heartbeat HTTP ${res.status} in ${duration}ms -> scheduling retry in 30s`);
        setTimeout(ping, 30000);
      }
    } catch (err) {
      console.warn(`⚠️ [Keep-Alive] Heartbeat ping notice: ${err.message} -> scheduling retry in 30s`);
      setTimeout(ping, 30000);
    }
  };

  // Send first ping 15 seconds after boot, then every 5 minutes
  setTimeout(() => {
    ping();
    keepAliveInterval = setInterval(ping, intervalMs);
    if (keepAliveInterval && keepAliveInterval.unref) {
      keepAliveInterval.unref(); // Do not block clean process exit
    }
  }, 15 * 1000);
};

export const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log('🛑 [Keep-Alive] Daemon stopped.');
  }
};

export default { startKeepAlive, stopKeepAlive };
