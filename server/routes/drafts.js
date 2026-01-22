const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');
const authMiddleware = require('../middleware/auth');

// Protect all draft routes
router.use(authMiddleware);

// Get all drafts for logged-in user
router.get('/', async (req, res) => {
  try {
    const drafts = await Draft.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(drafts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single draft (only if owned by user)
router.get('/:id', async (req, res) => {
  try {
    const draft = await Draft.findOne({ _id: req.params.id, userId: req.userId });
    if (!draft) return res.status(404).json({ error: 'Draft not found' });
    res.json(draft);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create draft for logged-in user
router.post('/', async (req, res) => {
  try {
    const draft = new Draft({
      ...req.body,
      userId: req.userId
    });
    await draft.save();
    res.status(201).json(draft);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update draft (only if owned by user)
router.put('/:id', async (req, res) => {
  try {
    const draft = await Draft.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!draft) return res.status(404).json({ error: 'Draft not found' });
    res.json(draft);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete draft (only if owned by user)
router.delete('/:id', async (req, res) => {
  try {
    const draft = await Draft.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!draft) return res.status(404).json({ error: 'Draft not found' });
    res.json({ message: 'Draft deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
