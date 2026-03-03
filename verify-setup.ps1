# Verify Project Setup

Write-Host "🔍 Verifying Job Application Agent Setup..." -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()

# Check Node.js
Write-Host "Checking Node.js..." -NoNewline
try {
    $nodeVersion = node --version
    if ($nodeVersion -match "v(\d+)\.") {
        $major = [int]$Matches[1]
        if ($major -ge 18) {
            Write-Host " ✅ $nodeVersion" -ForegroundColor Green
        }
        else {
            Write-Host " ⚠️ $nodeVersion (recommend 18+)" -ForegroundColor Yellow
            $warnings += "Node.js version should be 18 or higher"
        }
    }
}
catch {
    Write-Host " ❌ Not found" -ForegroundColor Red
    $errors += "Node.js is not installed"
}

# Check npm
Write-Host "Checking npm..." -NoNewline
try {
    $npmVersion = npm --version
    Write-Host " ✅ v$npmVersion" -ForegroundColor Green
}
catch {
    Write-Host " ❌ Not found" -ForegroundColor Red
    $errors += "npm is not installed"
}

# Check critical files
Write-Host ""
Write-Host "Checking project files..." -ForegroundColor Cyan

$criticalFiles = @(
    "package.json",
    "tsconfig.json",
    "next.config.js",
    ".env.local.example",
    "app/layout.tsx",
    "app/page.tsx"
)

foreach ($file in $criticalFiles) {
    Write-Host "  $file..." -NoNewline
    if (Test-Path $file) {
        Write-Host " ✅" -ForegroundColor Green
    }
    else {
        Write-Host " ❌" -ForegroundColor Red
        $errors += "Missing file: $file"
    }
}

# Check environment file
Write-Host ""
Write-Host "Checking environment setup..." -ForegroundColor Cyan
Write-Host "  .env.local..." -NoNewline
if (Test-Path ".env.local") {
    Write-Host " ✅ Found" -ForegroundColor Green
    
    # Check for required variables
    $envContent = Get-Content ".env.local" -Raw
    $requiredVars = @(
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        "OPENAI_API_KEY"
    )
    
    foreach ($var in $requiredVars) {
        Write-Host "    $var..." -NoNewline
        if ($envContent -match "$var=.+") {
            Write-Host " ✅" -ForegroundColor Green
        }
        else {
            Write-Host " ⚠️ Not set" -ForegroundColor Yellow
            $warnings += "$var not configured in .env.local"
        }
    }
}
else {
    Write-Host " ⚠️ Not found" -ForegroundColor Yellow
    $warnings += "Create .env.local from .env.local.example"
}

# Check node_modules
Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Cyan
Write-Host "  node_modules..." -NoNewline
if (Test-Path "node_modules") {
    Write-Host " ✅ Installed" -ForegroundColor Green
}
else {
    Write-Host " ⚠️ Not installed" -ForegroundColor Yellow
    $warnings += "Run 'npm install' to install dependencies"
}

# Check service files
Write-Host ""
Write-Host "Checking services..." -ForegroundColor Cyan

$services = @(
    "services/jobDiscovery.service.ts",
    "services/resume.service.ts",
    "services/outreach.service.ts",
    "services/application.service.ts",
    "services/analytics.service.ts"
)

foreach ($service in $services) {
    Write-Host "  $service..." -NoNewline
    if (Test-Path $service) {
        Write-Host " ✅" -ForegroundColor Green
    }
    else {
        Write-Host " ❌" -ForegroundColor Red
        $errors += "Missing service: $service"
    }
}

# Check migrations
Write-Host ""
Write-Host "Checking database migrations..." -ForegroundColor Cyan

$migrations = @(
    "supabase/migrations/001_create_users.sql",
    "supabase/migrations/002_create_candidate_profiles.sql",
    "supabase/migrations/003_create_jobs.sql",
    "supabase/migrations/004_create_applications.sql",
    "supabase/migrations/005_create_outreach.sql"
)

foreach ($migration in $migrations) {
    Write-Host "  $(Split-Path $migration -Leaf)..." -NoNewline
    if (Test-Path $migration) {
        Write-Host " ✅" -ForegroundColor Green
    }
    else {
        Write-Host " ❌" -ForegroundColor Red
        $errors += "Missing migration: $migration"
    }
}

# Summary
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

if ($errors.Count -eq 0 -and $warnings.Count -eq 0) {
    Write-Host "✅ All checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Create .env.local from .env.local.example (if not done)"
    Write-Host "  2. Run: npm install"
    Write-Host "  3. Run: npm run dev"
    Write-Host "  4. Visit: http://localhost:3000"
    Write-Host ""
}
else {
    if ($errors.Count -gt 0) {
        Write-Host "❌ Errors found:" -ForegroundColor Red
        foreach ($error in $errors) {
            Write-Host "  • $error" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    if ($warnings.Count -gt 0) {
        Write-Host "⚠️  Warnings:" -ForegroundColor Yellow
        foreach ($warning in $warnings) {
            Write-Host "  • $warning" -ForegroundColor Yellow
        }
        Write-Host ""
    }
    
    Write-Host "Please address the issues above before proceeding." -ForegroundColor Yellow
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
