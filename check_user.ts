import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envText = fs.readFileSync('.env', 'utf-8');
const env: Record<string, string> = {};
envText.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].replace(/^"|"$/g, '').trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: users, error: err1 } = await supabase.auth.admin.listUsers();
  if (err1) { console.error('Auth check error:', err1); return; }
  const ravi = users?.users.find(u => u.email?.includes('ravi105') || u.user_metadata?.full_name?.includes('ravi105'));
  
  if (!ravi) {
    console.log('User ravi105 not found in auth.');
    return;
  }
  console.log('User ravi105 found in auth:', ravi.email, ravi.id);

  const { data: profile, error: err2 } = await supabase.from('profiles').select('*').eq('id', ravi.id).single();
  if (err2) console.error('Profile check error:', err2.message);
  else console.log('Profile Data:\n', JSON.stringify(profile, null, 2));
  
  const tables = ['skills', 'user_skills', 'parsed_cvs', 'persona', 'skill_assessments'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').eq('user_id', ravi.id);
    if (!error && data && data.length > 0) {
      console.log(`\nFound entries in ${table}:\n`, JSON.stringify(data, null, 2));
    } else if (error && error.code !== 'PGRST204' && !error.message.includes('does not exist') && error.code !== '42P01') {
      console.error(`Error querying ${table}:`, error.message);
    }
  }
}
check();
