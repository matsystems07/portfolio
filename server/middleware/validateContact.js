/**
 * validateContact middleware - FIXED for your frontend
 */
function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = function validateContact(req, res, next) {
  try {
    const raw = req.body || {};
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';
    const email = typeof raw.email === 'string' ? raw.email.trim() : '';
    const message = typeof raw.message === 'string' ? raw.message.trim() : '';

    const errors = [];

    if (!name || name.length < 2) errors.push('Name must be at least 2 characters.');
    if (!email || !isEmail(email)) errors.push('A valid email is required.');
    if (!message || message.length < 10) errors.push('Message must be at least 10 characters.');

    if (errors.length) {
      console.log("❌ Validation failed:", errors);
      return res.status(400).json({ error: errors[0] });  // ✅ Single error
    }

    // ✅ SANITIZED DATA - controller uses req.body directly
    const sanitized = {
      name: name.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
      email,
      message: message.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
    };

    console.log("✅ Validation passed:", sanitized.name);
    
    // ✅ Frontend expects req.body, not req.validatedBody
    req.body = sanitized;  // ✅ Override req.body for controller
    next();
  } catch (err) {
    console.error('validateContact error:', err);
    return res.status(400).json({ error: 'Invalid request' });
  }
};
