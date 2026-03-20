const https = require('https');
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

const parsedUrl = new URL(`${url}/rest/v1/user_skill_profiles?user_id=eq.62ae02c5-7e57-4488-b4d7-d6f283a42394`);

const req = https.request({
  hostname: parsedUrl.hostname,
  path: parsedUrl.pathname + parsedUrl.search,
  method: 'GET',
  headers: {
    'apikey': key,
    'Authorization': `Bearer ${key}`
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('raw.json', data);
    console.log("Status:", res.statusCode);
  });
});

req.on('error', e => console.error(e));
req.end();
