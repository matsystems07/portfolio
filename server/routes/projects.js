// server/routes/projects.js
const express = require("express");
const router = express.Router();

console.log("projects.js ROUTER CREATED");  // debug

router.get("/ping", (req, res) => {
  res.json({ ok: true });
});

module.exports = router;

console.log("projects.js EXPORT:", module.exports);  // debug
