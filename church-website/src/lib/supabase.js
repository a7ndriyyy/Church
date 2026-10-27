import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
// New projects get a "publishable" key; older ones call it the "anon" key.
const key =
  process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

// null until the Supabase keys are set in .env (see .env.example)
export const supabase = url && key ? createClient(url, key) : null;
