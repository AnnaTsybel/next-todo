import 'server-only'; // optional but nice
import { createClient } from '@supabase/supabase-js';

const SUPABASE_HOST = process.env.SUPABASE_HOST!;
const SUPABASE_URL = `https://${SUPABASE_HOST}`;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_HOST || !SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Missing SUPABASE_HOST or SUPABASE_SERVICE_ROLE_KEY');
}

export const supabaseSrv = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
});
