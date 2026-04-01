require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const tipsRoutes = require('./routes/tips');
const usersRoutes = require('./routes/users');
const votesRoutes = require('./routes/votes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost')) {
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`CraftedWisdom server running on http://localhost:${PORT}`);
});
