const express = require('express');
const supabase = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/tips/:id/vote
router.post('/:id/vote', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  const userId = req.user.id;

  if (!type || !['up', 'down'].includes(type)) {
    return res.status(400).json({ error: 'Vote type must be "up" or "down".' });
  }

  try {
    const { data: tip } = await supabase.from('tips').select('id').eq('id', id).maybeSingle();
    if (!tip) return res.status(404).json({ error: 'Tip not found.' });

    const { data: existingVote } = await supabase
      .from('votes')
      .select('type')
      .eq('user_id', userId)
      .eq('tip_id', id)
      .maybeSingle();

    if (existingVote && existingVote.type === type) {
      await supabase.from('votes').delete().eq('user_id', userId).eq('tip_id', id);
    } else {
      await supabase
        .from('votes')
        .upsert({ user_id: userId, tip_id: id, type }, { onConflict: 'user_id,tip_id' });
    }

    const { data: voteRows } = await supabase.from('votes').select('type').eq('tip_id', id);
    const up_votes = voteRows.filter(v => v.type === 'up').length;
    const down_votes = voteRows.filter(v => v.type === 'down').length;

    const { data: userVote } = await supabase
      .from('votes')
      .select('type')
      .eq('user_id', userId)
      .eq('tip_id', id)
      .maybeSingle();

    res.json({ up_votes, down_votes, user_vote: userVote ? userVote.type : null });
  } catch (err) {
    console.error('Vote error:', err);
    res.status(500).json({ error: 'Failed to process vote.' });
  }
});

module.exports = router;
