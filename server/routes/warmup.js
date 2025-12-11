const express = require('express');
const router = express.Router();

console.log("Warmup router LOADED from:", __filename);

const { warmupProjects } = require('../controllers/warmupController');

router.get('/', warmupProjects);

module.exports = router;
