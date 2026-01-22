const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  seoScore: { type: Number, default: 0 },
  keywords: [String],
  recommendations: [String],
  createdAt: { type: Date, default: Date.now }
});

const draftSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  currentContent: { type: String, default: '' },
  currentSeoScore: { type: Number, default: 0 },
  revisions: [revisionSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Draft', draftSchema);
