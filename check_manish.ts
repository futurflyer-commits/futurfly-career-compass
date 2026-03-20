// ts-node or node
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
const env = envContent.split('\n').reduce((acc: any, line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        acc[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
    return acc;
}, {});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_SERVICE_ROLE_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkManish() {
    console.log("Checking DB for Manish...");
    
    // 1. Get user 
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) return console.error("Auth ERror", authError);
    
    const manish = users.find(u => u.email === 'manish1@gmail.com');
    if (!manish) return console.error("User manish1@gmail.com not found!");
    
    console.log(`User ID: ${manish.id}`);
    
    // 2. Check cv_parse_runs
    const { data: runs, error: runErr } = await supabase.from('cv_parse_runs').select('*').eq('user_id', manish.id);
    if (runErr) console.error("Runs error", runErr);
    console.log(`\nParse Runs (${runs?.length || 0}):`);
    runs?.forEach((r: any) => console.log(`  - Status: ${r.parse_status}, Created: ${r.created_at}`));
    
    // 3. check user_skill_profiles
    const { data: skills, error: skillErr } = await supabase.from('user_skill_profiles').select('*').eq('user_id', manish.id);
    console.log(`\nRaw Skills extracted: ${skills?.length || 0}`);
    
    // 4. check enriched vw
    const { data: enriched, error: enErr } = await supabase.from('vw_user_skill_profile_enriched').select('*').eq('user_id', manish.id);
    console.log(`\nEnriched Normalized View Skills: ${enriched?.length || 0}`);
    
    if (enriched && enriched.length > 0) {
        console.log("  Sample:");
        console.log(enriched.slice(0, 2).map((s:any) => `    ${s.skill_name} (Lvl ${s.competency_level})`));
    }
}

checkManish().catch(console.error);
