require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Server-side operations require the service role key to bypass RLS and permission checks.
// Get it from: Supabase Dashboard → Project Settings → API → service_role (secret) key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

const supabase = createClient(
  process.env.SUPABASE_URL,
  supabaseKey
);

module.exports = supabase;
