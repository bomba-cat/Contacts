import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_URL;
const supabaseKey = import.meta.env.VITE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
