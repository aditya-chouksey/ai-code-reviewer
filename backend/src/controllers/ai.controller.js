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
    
    let errorMessage = "Something went wrong while processing the code review.";
    if (error.status === 429) {
      errorMessage = "Too Many Requests! Google's AI rate limit was reached. Please wait a minute before trying again.";
    } else if (error.message) {
      errorMessage = `AI Error: ${error.message}`;
    }

    res.status(500).send(errorMessage);
  }
};
