require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const draftRoutes = require('./routes/drafts');
const seoRoutes = require('./routes/seo');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Content Optimizer API',
    status: 'running',
    endpoints: {
      api: '/api',
      health: '/health',
      auth: '/api/auth',
      drafts: '/api/drafts',
      seo: '/api/seo'
    }
  });
});

// Routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'AI Content Optimizer API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      drafts: '/api/drafts',
      seo: '/api/seo'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/drafts', draftRoutes);
app.use('/api/seo', seoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
