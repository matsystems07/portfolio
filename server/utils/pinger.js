// server/utils/pinger.js
const axios = require('axios');

/**
 * pingUrls(urls, options)
 * @param {["https://vendorvault-8cbi.onrender.com"],['https://business-llm-tool.onrender.com/'],[ "https://movie-recommendation-system-ul6f.onrender.com"], ["https://d3-dashboard.onrender.com"]}           // API endpoints
      
     
       urls - array of full URLs to ping
 * @param {object} options
 *   - timeoutMs: number (per-request timeout)
 *   - concurrency: number (max concurrent requests)
 * @returns {Promise<Array<{url, ok, status, latencyMs, error}>>}
 */
async function pingUrls(urls = [], options = {}) {
  const timeoutMs = options.timeoutMs || 8_000;
  const concurrency = options.concurrency || 6;

  if (!Array.isArray(urls)) urls = [];

  const results = [];
  const queue = urls.slice();

  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      const start = Date.now();
      try {
        const response = await axios.get(url, { timeout: timeoutMs, validateStatus: () => true });
        const latencyMs = Date.now() - start;
        results.push({
          url,
          ok: response.status >= 200 && response.status < 400,
          status: response.status,
          latencyMs,
          error: null,
        });
      } catch (err) {
        const latencyMs = Date.now() - start;
        results.push({
          url,
          ok: false,
          status: err.response?.status ?? null,
          latencyMs,
          error: err.message,
        });
      }
    }
  }

  // start workers
  const workers = new Array(Math.min(concurrency, urls.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers);
  return results;
}

module.exports = { pingUrls };
