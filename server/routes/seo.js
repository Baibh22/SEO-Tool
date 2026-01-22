const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');
const authMiddleware = require('../middleware/auth');
const { analyzeSEO } = require('../services/openrouter');

// Protect SEO routes
router.use(authMiddleware);

// Analyze content and save as revision (only if owned by user)
router.post('/analyze/:draftId', async (req, res) => {
  try {
    const draft = await Draft.findOne({ _id: req.params.draftId, userId: req.userId });
    if (!draft) return res.status(404).json({ error: 'Draft not found' });

    const analysis = await analyzeSEO(draft.currentContent);

    // Create revision
    draft.revisions.push({
      content: draft.currentContent,
      seoScore: analysis.seoScore,
      keywords: analysis.keywords,
      recommendations: analysis.recommendations
    });

    // Update current SEO score
    draft.currentSeoScore = analysis.seoScore;
    draft.updatedAt = Date.now();

    await draft.save();
    res.json({ draft, analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
