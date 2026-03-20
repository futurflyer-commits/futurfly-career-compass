import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
const env = envContent.split('\n').reduce((acc, line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        acc[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
    return acc;
}, {});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_SERVICE_ROLE_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkArjun() {
    console.log("Checking DB for Arjun...");
    
    // 1. Get user 
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) return console.error("Auth Error", authError);
    
    const arjun = users.find(u => u.email === 'arjun2@gmail.com');
    if (!arjun) return console.error("User arjun2@gmail.com not found!");
    
    console.log(`User ID: ${arjun.id}`);
    
    // 2. Test the RPC explicitly
    const { data, error } = await supabase.rpc("get_user_skill_wheel", {
      p_user_id: arjun.id,
      p_role_id: null
    });
    
    if (error) {
        console.error("\n[!] RAW RPC FATAL ERROR PAYLOAD:");
        console.error(JSON.stringify(error, null, 2));
    } else {
        console.log("RPC Data SUCCESS:", JSON.stringify(data, null, 2));
    }

}

checkArjun().catch(console.error);
