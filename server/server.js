console.log("Server.js started");

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// DB
const db = require('./db');

// Middlewares
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

// ✅ IMPORT ROUTES FIRST
const aiRoutes = require('./routes/ai');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const warmupRoutes = require('./routes/warmup');

// Log routes
console.log("✅ Routes loaded:", { ai: true, projects: true, contact: true, warmup: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter());

// Routes
app.use('/ai', aiRoutes);
app.use('/projects', projectRoutes);
app.use('/contact', contactRoutes);
app.use('/warmup', warmupRoutes);

// Production frontend
if (process.env.NODE_ENV === 'production' || process.env.SERVE_FRONTEND) {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));
}

app.get("/", (req, res) => res.json({ message: "Server is running..." }));

// Error Handler
app.use(errorHandler);

// 🔥 COLD START WARMUP - RUNS ON SERVER START
const warmupServer = async () => {
  try {
    const { warmupProjects } = require('./controllers/warmupController');
    console.log("🔥 Starting cold start warmup...");
    
    await warmupProjects(
      {}, 
      { 
        json: (data) => console.log("✅ COLD START COMPLETE:", data.warmed || "all endpoints") 
      }, 
      () => {}
    );
  } catch (err) {
    console.error("❌ Warmup failed:", err.message);
  }
};

// Start Server + IMMEDIATE WARMUP
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // 🔥 WARMUP RUNS 2 SECONDS AFTER START
  setTimeout(warmupServer, 2000);
});
