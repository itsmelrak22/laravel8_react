$manifestPath = "public\build\manifest.json"

# Function to copy assets
function Copy-Assets {
    if (Test-Path $manifestPath) {
        $manifest = Get-Content $manifestPath | ConvertFrom-Json
        
        # Create directories if they don't exist
        if (!(Test-Path "public\css")) { New-Item -ItemType Directory -Path "public\css" | Out-Null }
        if (!(Test-Path "public\js")) { New-Item -ItemType Directory -Path "public\js" | Out-Null }
        
        # Copy CSS
        if ($manifest.'resources/css/app.css') {
            $cssFile = $manifest.'resources/css/app.css'.file
            Copy-Item "public\build\$cssFile" "public\css\app.css"
            Write-Host "✓ CSS copied to /css/app.css" -ForegroundColor Green
        }
        
        # Copy JS
        if ($manifest.'resources/js/app.jsx') {
            $jsFile = $manifest.'resources/js/app.jsx'.file
            Copy-Item "public\build\$jsFile" "public\js\app.js"
            Write-Host "✓ JS copied to /js/app.js" -ForegroundColor Green
        }
        
        Write-Host "Assets copied successfully!" -ForegroundColor Green
    }
}

Write-Host "Building and copying assets..." -ForegroundColor Yellow
npm run build
Copy-Assets
