-- Run this entire file in the Supabase SQL Editor

-- Tables
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tips (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  youtube_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS votes (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tip_id BIGINT NOT NULL REFERENCES tips(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('up', 'down')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tip_id)
);

-- Auto-update updated_at on tips
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tips_updated_at
  BEFORE UPDATE ON tips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- View: tips joined with user and vote counts
CREATE OR REPLACE VIEW tips_with_votes AS
SELECT
  t.id,
  t.title,
  t.category,
  t.content,
  t.youtube_url,
  t.created_at,
  t.updated_at,
  t.user_id,
  u.username,
  COALESCE(SUM(CASE WHEN v.type = 'up' THEN 1 ELSE 0 END), 0)::int AS up_votes,
  COALESCE(SUM(CASE WHEN v.type = 'down' THEN 1 ELSE 0 END), 0)::int AS down_votes,
  (COALESCE(SUM(CASE WHEN v.type = 'up' THEN 1 ELSE 0 END), 0) -
   COALESCE(SUM(CASE WHEN v.type = 'down' THEN 1 ELSE 0 END), 0))::int AS score
FROM tips t
JOIN users u ON t.user_id = u.id
LEFT JOIN votes v ON t.id = v.tip_id
GROUP BY t.id, u.username;

-- Disable RLS so the anon key can read/write from the server
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE tips DISABLE ROW LEVEL SECURITY;
ALTER TABLE votes DISABLE ROW LEVEL SECURITY;

-- Seed data
DO $$
DECLARE
  v_user_id BIGINT;
BEGIN
  IF (SELECT COUNT(*) FROM users) = 0 THEN
    INSERT INTO users (username, email, password_hash)
    VALUES ('CraftMaster', 'craftmaster@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
    RETURNING id INTO v_user_id;

    INSERT INTO tips (user_id, title, category, content, youtube_url) VALUES
    (v_user_id, 'Never Dig Straight Down', 'Survival', 'One of the most important rules in Minecraft: never dig straight down! You could fall into lava, a cave system, or even the void in the End dimension. Always dig at an angle (2 blocks forward, 1 block down) or use a staircase pattern. This ensures you always have solid ground to stand on and can avoid unexpected drops. Keep a bucket of water handy for emergencies when exploring underground areas.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
    (v_user_id, 'Automatic Wheat Farm with Observers', 'Farming', 'Build a fully automatic wheat farm using Observer blocks! Place observers facing your crops — when the wheat reaches full growth (stage 7), the observer detects the block state change and sends a redstone signal. Connect that signal to pistons that sweep across the row, harvesting the wheat automatically. Use a water stream below to collect all drops into a hopper and chest system. You can scale this design to harvest hundreds of wheat per cycle without lifting a finger.', NULL),
    (v_user_id, 'Redstone Clock for Automated Systems', 'Redstone', 'A basic 5-clock (5-tick clock) is essential for any automated Redstone system. Build it with two repeaters set to 2 ticks each facing each other, with a solid block and torch to start the loop. You can adjust the speed by changing repeater delay settings. Use a lever to turn the clock on and off to prevent lag. This type of clock powers smelting arrays, mob farms, and item sorters. Remember: clocks left running can cause significant server lag, so always include an off switch.', NULL),
    (v_user_id, 'Enchanting Room Setup for Maximum Efficiency', 'Survival', 'To reach the maximum enchantment level of 30, you need exactly 15 bookshelves surrounding your enchanting table. Place the bookshelves in a 5x5 square around the table (leaving the corners and the table square itself empty) with one block of air between the shelves and the table. Make sure nothing blocks the line of sight between bookshelves and the table — even a torch or carpet will break the connection. Combine this with a grindstone for stripping bad enchantments and an anvil for combining books.', NULL),
    (v_user_id, 'Shield Strafing in Combat', 'Combat', 'Mastering shield usage is the key to surviving tough encounters in Minecraft. Hold your shield up to block 100% of frontal damage from projectiles and melee attacks. The trick is shield strafing: quickly lower your shield, land a critical hit (jump + attack), then raise your shield again before the enemy can react. Circle-strafing while keeping your shield raised prevents knockback from interrupting your attacks. Against pillagers and skeletons, time your shield raises to the sound cue of their bow drawing back.', NULL),
    (v_user_id, 'Mob-Proof Building Techniques', 'Building', 'When building a base, mob-proofing is just as important as aesthetics. Use slabs on the top surfaces of your roof — mobs cannot spawn on half-slabs. Place torches or glowstone every 7 blocks inside and outside to keep light levels above 7 (mobs spawn at light level 0 in 1.18+). Use carpet on the floor of outdoor areas; mobs cannot spawn on carpet. For entrances, a 2-block-high doorway with an iron door and button is creeper-proof. Always light up caves beneath your base to prevent underground spawns.', NULL),
    (v_user_id, 'Item Sorter Using Hoppers and Droppers', 'Redstone', 'Build an automatic item sorter to keep your storage organized. The core mechanism uses a hopper with a named item in one slot (only one of that item type) — this "locks" the sorter so only that item can pass through while everything else gets pushed to the overflow. Stack multiple sorter units for different item types. Connect each sorter to a double chest for organized storage. Add a overflow chest at the end for uncategorized items. This design scales infinitely and handles over 200 items per second when optimized.', NULL),
    (v_user_id, 'Nether Highway for Fast Travel', 'Survival', 'The Nether moves you 8x faster than the Overworld — 1 block in the Nether equals 8 blocks in the Overworld. Build a highway along the X or Z axis in the Nether using Nether brick or obsidian (creeper-proof). Use ice blocks under a carpet pathway to sprint at maximum speed. Install Nether portals every 50 blocks along the highway; each portal will appear 400 blocks away in the Overworld. This makes crossing thousands of blocks in seconds possible. Build the highway at Y=100 to avoid lava lakes.', NULL),
    (v_user_id, 'Trident Farm Using Drowned Spawning', 'Combat', 'Tridents are rare drops from Drowned mobs and are among the most powerful weapons in Minecraft. Build a drowned farm by finding a river biome and constructing a dark water column above Y=63. Drowned spawn naturally in rivers and oceans and will fall into your killing chamber. Use a trapdoor mechanism to drop them to 1 health, then finish them off manually to collect tridents, copper ingots, and nautilus shells. Convert a zombie spawner to drowned for even higher rates — zombies convert to drowned in 15 seconds underwater.', NULL),
    (v_user_id, 'Terraforming with Bonemeal and Silk Touch', 'Building', 'Professional builders use terraforming to make their builds look natural and impressive. Use a Silk Touch shovel to collect grass blocks and place them anywhere you want — they will spread to adjacent dirt blocks in sunlight. Apply bonemeal to grass to instantly grow flowers and tall grass for a natural look. For hills, build up dirt in organic shapes (avoid flat planes — use 3-4 block height variations). Plant oak trees with bonemeal and let them grow into natural clusters. Combine stone, gravel, and grass in layers to simulate realistic cliff faces.', NULL);
  END IF;
END $$;
