const express = require('express');
const supabase = require('../database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const VALID_CATEGORIES = ['Survival', 'Redstone', 'Building', 'Combat', 'Farming'];

// ── Minecraft content validator ──────────────────────────────────────────────
const MC_KEYWORDS = [
  // Core game
  'minecraft','block','blocks','chunk','chunks','biome','biomes','world','server',
  'survival','creative','hardcore','spectator','adventure',
  // Dimensions
  'overworld','nether','end','the end','nether portal','end portal',
  // Mobs
  'creeper','zombie','skeleton','spider','enderman','blaze','ghast','slime','witch',
  'wither','ender dragon','pillager','ravager','phantom','drowned','husk','stray',
  'vindicator','evoker','vex','guardian','elder guardian','shulker','hoglin','zoglin',
  'piglin','strider','warden','allay','frog','axolotl','goat','bee','fox','wolf',
  'villager','iron golem','snow golem','bat','cat','ocelot','parrot','dolphin',
  'turtle','cod','salmon','squid','glow squid','panda','mooshroom','cow','pig',
  'sheep','chicken','horse','donkey','mule','llama','rabbit','trader',
  // Items & tools
  'sword','pickaxe','axe','shovel','hoe','bow','crossbow','trident','shield',
  'armor','helmet','chestplate','leggings','boots','elytra','totem',
  'diamond','netherite','iron','gold','stone','wood','wooden','enchant','enchantment',
  'mending','unbreaking','sharpness','fortune','silk touch','efficiency','protection',
  'looting','knockback','thorns','feather falling','depth strider','frost walker',
  'respiration','aqua affinity','infinity','power','punch','flame','smite',
  'bane of arthropods','sweeping edge','fire aspect','looting','fortune',
  // Blocks & materials
  'cobblestone','obsidian','bedrock','gravel','sand','dirt','grass','log','plank',
  'slab','stair','fence','glass','wool','concrete','terracotta','glazed',
  'redstone','repeater','comparator','piston','sticky piston','hopper','dropper',
  'dispenser','observer','lever','button','pressure plate','tripwire','daylight',
  'furnace','blast furnace','smoker','crafting','anvil','enchanting','grindstone',
  'smithing','stonecutter','loom','cartography','fletching','brewing stand',
  'chest','shulker box','barrel','composter','beehive','bee nest',
  'slime block','honey block','tnt','sculk','mangrove','cherry','bamboo',
  'deepslate','calcite','tuff','dripstone','moss','glow lichen','amethyst',
  // Gameplay mechanics
  'xp','experience','level','spawn','respawn','death','hunger','saturation',
  'healing','damage','knockback','critical hit','crit','combo','strafing',
  'mining','smelting','crafting','brewing','trading','enchanting','repair',
  'farm','farming','mob farm','xp farm','iron farm','gold farm','crop',
  'wheat','carrot','potato','beetroot','sugarcane','melon','pumpkin','cactus',
  'bamboo','kelp','nether wart','chorus','cocoa',
  'redstone circuit','redstone clock','flying machine','piston door',
  'item sorter','auto','automated','automation','contraption',
  // Structures & locations
  'dungeon','stronghold','mineshaft','village','mansion','temple','monument',
  'outpost','bastion','fortress','nether fortress','end city','shipwreck',
  'igloo','ruined portal','ancient city','trial chamber',
  // Other mechanics
  'spawn point','bed','respawn anchor','compass','map','banner','beacon',
  'conduit','bell','lodestone','spyglass','bundle','book','enchanted book',
  'golden apple','notch apple','potion','splash','lingering','arrow',
  'firework','rocket','riptide','channeling','loyalty','impaling',
  'swift sneak','soul speed','curse','mending','infinity',
  'nether highway','portal','coordinate','y level','y-level','seed',
  'chunk loading','tick','tps','lag','render distance','difficulty',
  'peaceful','easy','normal','hard','hardmode','hardcore',
  'op','operator','gamemode','command','cheat','gamerule',
];

const MC_SET = new Set(MC_KEYWORDS);

function validateMinecraftTip(title, content) {
  const text = `${title} ${content}`.toLowerCase();

  // Check for gibberish: ratio of non-alpha characters too high
  const alphaRatio = (text.match(/[a-z]/g) || []).length / text.length;
  if (alphaRatio < 0.5) {
    return 'Tip content appears to be gibberish. Please write a real Minecraft tip.';
  }

  // Check repeated characters (asdfasdf, aaaaa, etc.)
  if (/(.)\1{6,}/.test(text) || /^[^a-z]*([a-z]{1,3}[^a-z]*){1,5}$/i.test(content.trim()) ) {
    return 'Tip content does not look like a valid tip. Please describe a real Minecraft technique.';
  }

  // Must contain at least 2 distinct Minecraft keywords across title+content
  const words = text.match(/\b[\w'-]+\b/g) || [];
  const bigrams = [];
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i+1]}`);
  }
  const allTokens = [...words, ...bigrams];
  const hits = allTokens.filter(t => MC_SET.has(t));
  const uniqueHits = new Set(hits);

  if (uniqueHits.size < 2) {
    return 'This tip does not seem to be about Minecraft. Please include specific Minecraft content (blocks, mobs, mechanics, etc.).';
  }

  // Check average word length — random keyboard spam has very short/long words
  const wordList = content.trim().split(/\s+/);
  const avgWordLen = wordList.reduce((s, w) => s + w.length, 0) / wordList.length;
  if (avgWordLen < 2.5 || avgWordLen > 25) {
    return 'Tip content does not appear to be valid text. Please write a clear, descriptive Minecraft tip.';
  }

  return null; // valid
}

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

  const validationError = validateMinecraftTip(title.trim(), content.trim());
  if (validationError) {
    return res.status(400).json({ error: validationError });
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

  const validationError = validateMinecraftTip(title.trim(), content.trim());
  if (validationError) {
    return res.status(400).json({ error: validationError });
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
