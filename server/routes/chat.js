const express = require('express');
const supabase = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/chat — fetch last 60 messages, public
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('id, username, avatar_url, message, created_at')
      .order('created_at', { ascending: false })
      .limit(60);

    if (error) throw error;
    res.json(data.reverse());
  } catch (err) {
    console.error('Chat fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// POST /api/chat — send a message, requires auth
router.post('/', authMiddleware, async (req, res) => {
  const { message } = req.body;
  const { id: user_id, username, avatar_url } = req.user;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }
  if (message.trim().length > 300) {
    return res.status(400).json({ error: 'Message too long (max 300 chars).' });
  }

  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({ user_id, username, avatar_url: avatar_url || null, message: message.trim() })
      .select('id, username, avatar_url, message, created_at')
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('Chat send error:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;
