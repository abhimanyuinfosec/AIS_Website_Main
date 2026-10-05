/**
 * Vercel Serverless Function & Cron Worker
 *
 * This function is triggered by Vercel Cron every 10 minutes to ping the
 * Render backend health endpoint, preventing cold-start spin-downs.
 * Can also be triggered manually via: GET /api/keepalive
 */

export default async function handler(req, res) {
  const backendBaseUrl = (
    process.env.VITE_API_URL ||
    'https://ais-website-main.onrender.com/api'
  ).trim().replace(/\/$/, '');

  const healthUrl = backendBaseUrl.endsWith('/health')
    ? backendBaseUrl
    : `${backendBaseUrl}/health`;

  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const backendRes = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Vercel-KeepAlive-Cron/1.0 (+https://vercel.com)',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Date.now() - startTime;
    const body = await backendRes.json().catch(() => ({}));

    return res.status(200).json({
      success: true,
      service: 'Vercel-KeepAlive-Gateway',
      target: healthUrl,
      backendStatus: backendRes.status,
      latencyMs,
      timestamp: new Date().toISOString(),
      details: body,
    });
  } catch (err) {
    const latencyMs = Date.now() - startTime;
    return res.status(502).json({
      success: false,
      service: 'Vercel-KeepAlive-Gateway',
      target: healthUrl,
      latencyMs,
      error: err.message,
      timestamp: new Date().toISOString(),
      note: 'Render backend may be spinning up or unreachable.',
    });
  }
}
