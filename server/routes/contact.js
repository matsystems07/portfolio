// server/routes/contact.js
const express = require('express');
const router = express.Router();

const validateContact = require('../middleware/validateContact');
const contactController = require('../controllers/contactController');

// POST /contact
router.post('/', validateContact, contactController.handleContact);

module.exports = router;
