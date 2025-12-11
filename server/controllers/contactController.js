// server/controllers/contactController.js
const contactModel = require('../models/contactModel');

exports.handleContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log("✅ Contact form received:", { name, email });

    // ✅ SAVE TO DATABASE
    const saved = await contactModel.saveContact(name, email, message);

    res.status(200).json({
      success: true,
      message: "Message saved successfully!",
      data: saved
    });

  } catch (error) {
    console.error("❌ Contact DB error:", error.message);
    res.status(400).json({ error: "Failed to save message" });
  }
};
