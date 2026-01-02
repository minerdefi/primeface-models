# API Testing Script for PrimeFace Models
# Run this after starting your dev server (npm run dev)

Write-Host "Testing PrimeFace Models API Endpoints" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"

# Test 1: POST /api/applications - Submit model application
Write-Host "1. Testing POST /api/applications (Submit Application)" -ForegroundColor Yellow
$applicationData = @{
    firstName = "John"
    lastName = "Doe"
    email = "john.doe@example.com"
    phone = "555-1234"
    address = "123 Main St"
    city = "Houston"
    state = "TX"
    dateOfBirth = "1995-01-15"
    instagram = "@johndoe"
    facebook = "johndoe"
    message = "I want to become a model"
    gender = "male"
    height = "6'0`""
    waist = "32`""
    bust = "40`""
    hips = "38`""
    dressSize = "M"
    shoeSize = "10"
    hairColor = "Brown"
    eyeColor = "Blue"
    imageUrls = @()
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/applications" -Method Post -Body $applicationData -ContentType "application/json"
    Write-Host "✓ Success: Application submitted" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: GET /api/applications - List applications
Write-Host "2. Testing GET /api/applications (List Applications)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/applications" -Method Get
    Write-Host "✓ Success: Retrieved $($response.data.Count) applications" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: POST /api/models - Create a model
Write-Host "3. Testing POST /api/models (Create Model)" -ForegroundColor Yellow
$modelData = @{
    name = "Test Model"
    category = "women"
    subcategory = "main-board"
    height = "5'9`""
    chest = "34`""
    waist = "24`""
    bust = "34`""
    hips = "36`""
    shoeSize = "8"
    hairColor = "Blonde"
    eyeColor = "Blue"
    images = @("https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80")
    featured = $true
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/models" -Method Post -Body $modelData -ContentType "application/json"
    Write-Host "✓ Success: Model created" -ForegroundColor Green
    $createdSlug = $response.data.slug
    Write-Host ($response | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
    $createdSlug = "test-model"
}
Write-Host ""

# Test 4: GET /api/models - List all models
Write-Host "4. Testing GET /api/models (List Models)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/models" -Method Get
    Write-Host "✓ Success: Retrieved $($response.data.Count) models" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 5: GET /api/models?category=women - Filter by category
Write-Host "5. Testing GET /api/models?category=women (Filter Models)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/models?category=women" -Method Get
    Write-Host "✓ Success: Retrieved $($response.data.Count) women models" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: GET /api/models/[slug] - Get single model
Write-Host "6. Testing GET /api/models/$createdSlug (Get Single Model)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/models/$createdSlug" -Method Get
    Write-Host "✓ Success: Retrieved model" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 7: PUT /api/models/[slug] - Update model
Write-Host "7. Testing PUT /api/models/$createdSlug (Update Model)" -ForegroundColor Yellow
$updateData = @{
    featured = $false
    height = "5'10`""
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/models/$createdSlug" -Method Put -Body $updateData -ContentType "application/json"
    Write-Host "✓ Success: Model updated" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 8: POST /api/contact - Submit contact form
Write-Host "8. Testing POST /api/contact (Submit Contact)" -ForegroundColor Yellow
$contactData = @{
    name = "Jane Smith"
    email = "jane@example.com"
    phone = "555-5678"
    subject = "Inquiry"
    message = "I have a question about your services"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method Post -Body $contactData -ContentType "application/json"
    Write-Host "✓ Success: Contact submitted" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 9: GET /api/contact - List contacts
Write-Host "9. Testing GET /api/contact (List Contacts)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/contact" -Method Get
    Write-Host "✓ Success: Retrieved $($response.data.Count) contacts" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 2)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 10: DELETE /api/models/[slug] - Delete model
Write-Host "10. Testing DELETE /api/models/$createdSlug (Delete Model)" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/models/$createdSlug" -Method Delete
    Write-Host "✓ Success: Model deleted" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 3)
} catch {
    Write-Host "✗ Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "API Testing Complete!" -ForegroundColor Cyan
