# Quick Start Script for Frontend

Write-Host "🚀 Starting Frontend Development Server..." -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Clear Vite cache for fresh start
Write-Host "🧹 Clearing Vite cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .vite, node_modules/.vite -ErrorAction SilentlyContinue
Write-Host ""

# Start dev server
Write-Host "✨ Starting Vite dev server..." -ForegroundColor Green
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend should be running at: http://localhost:4000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev
