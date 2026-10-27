import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// null until the Supabase keys are set in .env.local (see .env.example)
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
