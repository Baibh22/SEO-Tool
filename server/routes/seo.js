const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');
const { analyzeSEO } = require('../services/openrouter');

// Analyze content and save as revision
router.post('/analyze/:draftId', async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.draftId);
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
