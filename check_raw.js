const fs = require('fs');

const envText = fs.readFileSync('.env', 'utf-8');
const env = {};
envText.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].replace(/^"|"$/g, '').trim();
  }
});

const url = env['VITE_SUPABASE_URL'];
const key = env['VITE_SUPABASE_SERVICE_ROLE_KEY'];

async function run() {
  const authRes = await fetch(`${url}/auth/v1/admin/users`, {
    headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
  });
  if (!authRes.ok) { console.error("Auth fetch failed:", await authRes.text()); return; }
  const authData = await authRes.json();
  const ravi = authData.users.find(u => u.email.includes('ravi105') || (u.user_metadata?.full_name || '').includes('ravi105'));
  
  if (!ravi) { console.log('ravi105 not found! Let me try searching profiles directly.'); }
  else { console.log('Found ravi105 in auth:', ravi.id, ravi.email); }

  const userId = ravi ? ravi.id : null;

  const tables = ['profiles', 'parsed_cvs', 'user_skill_profiles', 'vw_user_skill_profile_enriched', 'user_skills', 'skills'];
  
  for (const table of tables) {
    let query = userId ? `user_id=eq.${userId}` : 'select=*'; // fallback query
    if (table === 'profiles' && userId) query = `id=eq.${userId}`;
    
    const res = await fetch(`${url}/rest/v1/${table}?${query}`, {
      headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
    });
    
    if (res.ok) {
      const data = await res.json();
      let matchedData = data;
      // If we didn't find ravi105 in auth, search profiles for name
      if (!userId && table === 'profiles') {
        matchedData = data.filter(d => (d.full_name || d.name || '').includes('ravi105') || JSON.stringify(d).includes('ravi105'));
        if (matchedData.length > 0) {
           console.log('Found ravi105 in profiles directly:', matchedData[0].id);
        }
      }
      if (userId) {
        if (data && data.length > 0) {
            console.log(`\n--- Table: ${table} (${data.length} records) ---`);
            console.log(JSON.stringify(data.slice(0, 3), null, 2));
        } else {
            console.log(`\n--- Table: ${table} (Empty) ---`);
        }
      }
    }
  }
}
run();
