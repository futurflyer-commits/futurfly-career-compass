import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://helgwmlpwqskyvsmukdo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlbGd3bWxwd3Fza3l2c211a2RvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgyNjY1NSwiZXhwIjoyMDg4NDAyNjU1fQ.hFqio6yKhtVbrCqqZHCYr32_6TdR9P7zSV561mYZzWc";

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
