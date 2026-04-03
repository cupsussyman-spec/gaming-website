require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const tipsRoutes = require('./routes/tips');
const usersRoutes = require('./routes/users');
const votesRoutes = require('./routes/votes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // In production, frontend is served by this same Express server
    if (process.env.NODE_ENV === 'production') {
      callback(null, true);
      return;
    }
    const allowed = [
      'http://localhost:5173',
      process.env.FRONTEND_URL,
    ].filter(Boolean);
    if (!origin || allowed.some(url => origin.startsWith(url))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api/tips', votesRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CraftedWisdom API is running' });
});

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
} else {
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CraftedWisdom server running on port ${PORT}`);
});
