import { createClient } from "@supabase/supabase-js";

let NEXT_PUBLIC_SUPABASE_URL = "https://eynjlxtyxihkokeesrlj.supabase.co";
let NEXT_PUBLIC_SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bmpseHR5eGloa29rZWVzcmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU2NzMyNzIsImV4cCI6MjAyMTI0OTI3Mn0.3ZjFnmezUcgt9LxbtgB6Ag4ZGbgb-N-o6VCbja0Kiyc";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = NEXT_PUBLIC_SUPABASE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);
