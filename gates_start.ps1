# Gates - Start Local Server
# Run this script to view the Gates website locally

$port = 3002
$path = Join-Path $PSScriptRoot "gates"

Write-Host "Starting Gates website..." -ForegroundColor Cyan
Write-Host "URL: http://localhost:$port" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Try npx serve first, fall back to Python
if (Get-Command npx -ErrorAction SilentlyContinue) {
    npx serve $path -l $port
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    Push-Location $path
    python -m http.server $port
    Pop-Location
} else {
    Write-Host "Error: Neither Node.js (npx) nor Python found." -ForegroundColor Red
    Write-Host "Install one of them to run a local server." -ForegroundColor Red
    Start-Process $path\index.html
}
