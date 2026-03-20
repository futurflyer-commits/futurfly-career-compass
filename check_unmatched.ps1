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

$targetId = "62ae02c5-7e57-4488-b4d7-d6f283a42394"

$tables = @("unmatched_user_skills")

foreach ($table in $tables) {
    $query = "user_id=eq.$targetId"
    Write-Host "`n--- Querying $table ---"
    try {
        $resp = Invoke-RestMethod -Uri "$url/rest/v1/$table?$query" -Headers $headers -Method Get
        $resp | ConvertTo-Json -Depth 3 | Write-Host
    } catch {
        Write-Host "ERROR querying $table : $_"
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $reader.ReadToEnd() | Write-Host
        }
    }
}
