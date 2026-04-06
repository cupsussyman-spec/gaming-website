require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const tipsRoutes = require('./routes/tips');
const usersRoutes = require('./routes/users');
const votesRoutes = require('./routes/votes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
  transports: ['websocket', 'polling'],
});
const PORT = process.env.PORT || 3001;

// ── Socket.io: real-time chat + online count ──────────────
const onlineUsers = new Map(); // socketId -> { username, id }
const MAX_MESSAGES = 100;
const recentMessages = [];

io.on('connection', (socket) => {
  // User joins
  socket.on('join', ({ username, userId }) => {
    onlineUsers.set(socket.id, { username: username || 'Guest', userId });
    io.emit('online_count', onlineUsers.size);
    io.emit('online_users', [...onlineUsers.values()].map(u => u.username));
  });

  // Send message
  socket.on('send_message', ({ username, message }) => {
    if (!message?.trim() || message.trim().length > 300) return;
    const msg = {
      id: Date.now(),
      username: username || 'Guest',
      message: message.trim(),
      created_at: new Date().toISOString(),
    };
    recentMessages.push(msg);
    if (recentMessages.length > MAX_MESSAGES) recentMessages.shift();
    io.emit('new_message', msg);
  });

  // Disconnect
  socket.on('disconnect', () => {
    onlineUsers.delete(socket.id);
    io.emit('online_count', onlineUsers.size);
    io.emit('online_users', [...onlineUsers.values()].map(u => u.username));
  });

  // Send recent messages to new connection or on refresh request
  socket.emit('message_history', recentMessages);
  socket.emit('online_count', onlineUsers.size);

  socket.on('request_history', () => {
    socket.emit('message_history', recentMessages);
  });
});

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

server.listen(PORT, '0.0.0.0', () => {
  console.log(`CraftedWisdom server running on port ${PORT}`);
});
