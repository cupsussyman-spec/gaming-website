import { createClient } from '@supabase/supabase-js';

// Replace these with your own Supabase project URL and anon key
const SUPABASE_URL = 'https://iqgpagblakqorxceupyg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZ3BhZ2JsYWtxb3J4Y2V1cHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0MzAyNzksImV4cCI6MjA5MDAwNjI3OX0.WxgpIabbR9AlRkHrO_PwN5lqM-vB78dp6fw15iE9SLw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
