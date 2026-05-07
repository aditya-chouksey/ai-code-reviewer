// controllers/ai.controller.js
const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    // Optionally log language for future multi-language support
    console.log(`Received review request for language: ${language || "unknown"}`);

    const response = await aiService(code, language); // You may also send language if needed later
    res.status(200).send(response);
  } catch (error) {
    console.error("Error in getReview:", error);
    res.status(500).json({ error: "Something went wrong while processing the code review." });
  }
};
