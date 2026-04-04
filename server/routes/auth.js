const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const supabase = require('../database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'craftedwisdom_secret';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }
  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long.' });
  }
  if (username.length > 20) {
    return res.status(400).json({ error: 'Username must be 20 characters or less.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  try {
    const { data: existingUsers } = await supabase
      .from('users')
      .select('id, username')
      .or(`username.eq.${username},email.eq.${email}`);

    if (existingUsers && existingUsers.length > 0) {
      const takenByUsername = existingUsers.find(u => u.username === username);
      if (takenByUsername) {
        return res.status(409).json({ error: 'Username is already taken.' });
      }
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const { data: user, error } = await supabase
      .from('users')
      .insert({ username, email, password_hash: passwordHash })
      .select('id, username, email, created_at')
      .single();

    if (error) throw error;

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Failed to create account.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// POST /api/auth/oauth
router.post('/oauth', async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) {
    return res.status(400).json({ error: 'Access token required.' });
  }

  try {
    // Verify the token with Supabase and get the user
    const { data: { user: supabaseUser }, error: authError } = await supabase.auth.getUser(access_token);

    if (authError || !supabaseUser) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    const email = supabaseUser.email;
    const fullName = supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || '';
    const avatarUrl = supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture || null;

    // Find or create user in our users table
    let { data: user } = await supabase
      .from('users')
      .select('id, username, email')
      .eq('email', email)
      .maybeSingle();

    if (!user) {
      // Generate username from their Google name
      let base = fullName.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 16) || 'player';
      let username = base;

      const { data: taken } = await supabase.from('users').select('id').eq('username', username).maybeSingle();
      if (taken) {
        username = base.slice(0, 12) + Math.random().toString(36).slice(2, 6);
      }

      const passwordHash = bcrypt.hashSync(crypto.randomBytes(32).toString('hex'), 10);
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({ username, email, password_hash: passwordHash })
        .select('id, username, email')
        .single();

      if (createError) throw createError;
      user = newUser;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, username: user.username, email: user.email, avatar_url: avatarUrl } });
  } catch (err) {
    console.error('OAuth error:', err);
    res.status(500).json({ error: 'OAuth authentication failed.' });
  }
});

module.exports = router;
