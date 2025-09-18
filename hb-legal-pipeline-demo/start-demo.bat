@echo off
REM HB Legal Intelligence Pipeline - Demo Startup Script (Windows)

echo ==========================================
echo HB Legal Intelligence Pipeline Demo
echo Starting all components...
echo ==========================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)

echo [1/5] Starting Docker containers...
docker-compose up -d
if %errorlevel% neq 0 (
    echo ERROR: Failed to start Docker containers
    pause
    exit /b 1
)
echo      Docker containers started successfully

REM Wait for containers to be ready
echo      Waiting for services to initialize...
timeout /t 10 /nobreak >nul

echo.
echo [2/5] Initializing MCP database...
cd mcp-server
call npm run init-db >nul 2>&1
cd ..
echo      Database initialized with sample data

echo.
echo [3/5] Starting MCP server...
cd mcp-server
start /min cmd /c "npm start"
cd ..
echo      MCP server started on port 3001

REM Wait for MCP server to start
timeout /t 5 /nobreak >nul

echo.
echo [4/5] Starting frontend server...
cd frontend
start /min cmd /c "python -m http.server 8080"
cd ..
echo      Frontend server started on port 8080

echo.
echo [5/5] Running integration tests...
timeout /t 3 /nobreak >nul
node test\integration.test.js

echo.
echo ==========================================
echo Demo is now running!
echo ==========================================
echo.
echo Access points:
echo   - Frontend Dashboard:    http://localhost:8080
echo   - MCP API Dashboard:     http://localhost:3001
echo   - n8n Workflow Designer: http://localhost:5678
echo.
echo Default n8n credentials:
echo   - Create account on first visit
echo   - Use any email and password
echo.
echo To test the workflow:
echo   1. Import workflow: n8n-workflows\hb-legal-intelligence-pipeline.json
echo   2. Activate the workflow in n8n
echo   3. Run test: n8n-workflows\test-webhook.bat
echo.
echo To stop the demo:
echo   1. Close this window
echo   2. Run: docker-compose down
echo.
echo ==========================================
pause