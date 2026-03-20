$envFile = Get-Content ".env"
$envVars = @{}
foreach ($line in $envFile) {
    if ($line -match "^([^=]+)=(.*)$") {
        $envVars[$matches[1].Trim()] = $matches[2].Trim('"', ' ')
    }
}

$url = $envVars["VITE_SUPABASE_URL"]
$key = $envVars["VITE_SUPABASE_SERVICE_ROLE_KEY"]

$headers = @{
    "apikey" = $key
    "Authorization" = "Bearer $key"
}

$output = @{
    User = $null
    Data = @{}
}

$usersResp = Invoke-RestMethod -Uri "$url/auth/v1/admin/users" -Headers $headers -Method Get

$targetId = $null
foreach ($u in $usersResp.users) {
    $email = $u.email
    $name = $u.user_metadata.full_name
    if ($email -like "*ravi105*" -or $name -like "*ravi105*") {
        $output.User = @{ "ID" = $u.id; "Email" = $email; "Name" = $name }
        $targetId = $u.id
        break
    }
}

if ($targetId) {
    $tables = @("profiles", "parsed_cvs", "user_skill_profiles", "vw_user_skill_profile_enriched", "user_skills", "skills")
    
    foreach ($table in $tables) {
        $query = "user_id=eq.$targetId"
        if ($table -eq "profiles") { $query = "id=eq.$targetId" }
        
        try {
            $resp = Invoke-RestMethod -Uri "$url/rest/v1/$table?$query" -Headers $headers -Method Get
            if ($resp.Count -gt 0) {
                # Just take the first few items for brevity
                $items = @()
                foreach ($item in $resp) { $items += $item }
                if ($items.Count -gt 3) { $items = $items[0..2] }
                $output.Data[$table] = $items
            } else {
                $output.Data[$table] = "Empty"
            }
        } catch {
             $output.Data[$table] = "Error or Table Missing"
        }
    }
}

$output | ConvertTo-Json -Depth 5 -Compress | Out-File "ravi_data.json" -Encoding utf8
