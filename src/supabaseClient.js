import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_URL;
const supabaseKey = process.env.VITE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const signUpWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return user;
};

export const signInWithEmail = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
