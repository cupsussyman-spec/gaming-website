const express = require('express');
const supabase = require('../database');

const router = express.Router();

// GET /api/users/:username
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username, email, created_at')
      .eq('username', username)
      .maybeSingle();

    if (userError) throw userError;
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const { data: tips, error: tipsError } = await supabase
      .from('tips_with_votes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (tipsError) throw tipsError;

    const totalTips = tips.length;
    const totalUpvotes = tips.reduce((sum, tip) => sum + tip.up_votes, 0);

    res.json({ user, tips, total_tips: totalTips, total_upvotes: totalUpvotes });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
});

module.exports = router;
