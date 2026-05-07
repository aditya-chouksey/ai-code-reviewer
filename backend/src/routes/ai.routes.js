// routes/ai.routes.js

const express = require('express');

const aiController = require('../controllers/ai.controller');
const router = express.Router();

// POST route to get AI code review
router.post('/get-review', aiController.getReview);

module.exports = router;

