const express = require('express');
const supabase = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const VALID_CATEGORIES = ['Survival', 'Redstone', 'Building', 'Combat', 'Farming'];

// GET /api/tips
router.get('/', async (req, res) => {
  const { category, sort = 'newest', page = 1 } = req.query;
  const limit = 10;
  const offset = (parseInt(page) - 1) * limit;

  try {
    let query = supabase
      .from('tips_with_votes')
      .select('*', { count: 'exact' });

    if (category && VALID_CATEGORIES.includes(category)) {
      query = query.eq('category', category);
    }

    if (sort === 'top') {
      query = query.order('score', { ascending: false }).order('created_at', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    query = query.range(offset, offset + limit - 1);

    const { data: tips, count, error } = await query;
    if (error) throw error;

    const total = count;
    const totalPages = Math.ceil(total / limit);

    res.json({ tips, total, page: parseInt(page), totalPages });
  } catch (err) {
    console.error('Get tips error:', err);
    res.status(500).json({ error: 'Failed to fetch tips.' });
  }
});

// GET /api/tips/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data: tip, error } = await supabase
      .from('tips_with_votes')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!tip) return res.status(404).json({ error: 'Tip not found.' });

    res.json(tip);
  } catch (err) {
    console.error('Get tip error:', err);
    res.status(500).json({ error: 'Failed to fetch tip.' });
  }
});

// POST /api/tips
router.post('/', authMiddleware, async (req, res) => {
  const { title, category, content, youtube_url } = req.body;
  const userId = req.user.id;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required.' });
  }
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}.` });
  }
  if (!content || content.trim().length < 50) {
    return res.status(400).json({ error: 'Content must be at least 50 characters long.' });
  }

  try {
    const { data: tip, error } = await supabase
      .from('tips')
      .insert({ user_id: userId, title: title.trim(), category, content: content.trim(), youtube_url: youtube_url || null })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(tip);
  } catch (err) {
    console.error('Create tip error:', err);
    res.status(500).json({ error: 'Failed to create tip.' });
  }
});

// PUT /api/tips/:id
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, category, content, youtube_url } = req.body;
  const userId = req.user.id;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required.' });
  }
  if (!category || !VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}.` });
  }
  if (!content || content.trim().length < 50) {
    return res.status(400).json({ error: 'Content must be at least 50 characters long.' });
  }

  try {
    const { data: existing, error: fetchError } = await supabase
      .from('tips')
      .select('user_id')
      .eq('id', id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!existing) return res.status(404).json({ error: 'Tip not found.' });
    if (existing.user_id !== userId) return res.status(403).json({ error: 'You can only edit your own tips.' });

    const { error: updateError } = await supabase
      .from('tips')
      .update({ title: title.trim(), category, content: content.trim(), youtube_url: youtube_url || null })
      .eq('id', id);

    if (updateError) throw updateError;

    const { data: updatedTip, error: viewError } = await supabase
      .from('tips_with_votes')
      .select('*')
      .eq('id', id)
      .single();

    if (viewError) throw viewError;

    res.json(updatedTip);
  } catch (err) {
    console.error('Update tip error:', err);
    res.status(500).json({ error: 'Failed to update tip.' });
  }
});

// DELETE /api/tips/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const { data: existing, error: fetchError } = await supabase
      .from('tips')
      .select('user_id')
      .eq('id', id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!existing) return res.status(404).json({ error: 'Tip not found.' });
    if (existing.user_id !== userId) return res.status(403).json({ error: 'You can only delete your own tips.' });

    const { error } = await supabase.from('tips').delete().eq('id', id);
    if (error) throw error;

    res.json({ message: 'Tip deleted successfully.' });
  } catch (err) {
    console.error('Delete tip error:', err);
    res.status(500).json({ error: 'Failed to delete tip.' });
  }
});

module.exports = router;
