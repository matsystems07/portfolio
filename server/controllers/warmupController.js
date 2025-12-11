
// server/controllers/warmupController.js
const { pingUrls } = require('../utils/pinger');  // ✅ Correct import

exports.warmupProjects = async (req, res, next) => {
  try {
    // ✅ HARDCODED Portfolio URLs
    const urls = [
      'https://business-llm-tool.onrender.com/',             // API endpoints
      'https://vendorvault-8cbi.onrender.com',
      "https://movie-recommendation-system-ul6f.onrender.com",
      "https://d3-dashboard.onrender.com"
    ];

    console.log("🔥 Warming up", urls.length, "endpoints...");
    
    // ✅ Use YOUR pinger (pingUrls)
    const results = await pingUrls(urls, { 
      timeoutMs: 5000, 
      concurrency: 4 
    });
    
    console.log("✅ Warmup complete:", results.length, "URLs");
    
    res.json({ 
      warmed: results.length,
      success: results.filter(r => r.ok).length,
      results 
    });
  } catch (err) {
    console.error("❌ Warmup failed:", err.message);
    next(err);
  }
};
