@echo off
REM HB Legal Pipeline - Webhook Test Script (Windows)
REM This script tests the n8n webhook endpoint with sample legal documents

echo ==========================================
echo HB Legal Intelligence Pipeline Test
echo ==========================================
echo.

REM Default webhook URL - update this after importing workflow to n8n
set WEBHOOK_URL=http://localhost:5678/webhook/legal-document

REM Check if custom webhook URL is provided
if not "%1"=="" (
    set WEBHOOK_URL=%1
    echo Using custom webhook URL: %WEBHOOK_URL%
) else (
    echo Using default webhook URL: %WEBHOOK_URL%
    echo Tip: You can provide a custom URL as argument: test-webhook.bat [your-webhook-url]
)
echo.

REM Test 1: Deposition Document
echo Test 1: Sending Deposition Document
echo ----------------------------------------

curl -X POST "%WEBHOOK_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"document\":\"DEPOSITION OF JOHN SMITH\n\nDate: January 15, 2025\nCase No: HB-2025-001\n\nQ: Please state your name for the record.\nA: John Smith.\n\nQ: Mr. Smith, were you present at the board meeting on December 1st, 2024?\nA: Yes, I was present.\n\nQ: Can you describe what was discussed regarding the merger?\nA: The board discussed the potential acquisition of TechCorp.\",\"type\":\"deposition\",\"case_id\":\"HB-2025-001\"}"

echo.
echo.

timeout /t 2 >nul

REM Test 2: Contract Document
echo Test 2: Sending Contract Document
echo ----------------------------------------

curl -X POST "%WEBHOOK_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"document\":\"SERVICE AGREEMENT\n\nThis Agreement is entered into as of January 15, 2025 between ABC Corporation and XYZ Services LLC.\n\n1. SCOPE OF SERVICES\nProvider agrees to deliver consulting services.\n\n2. COMPENSATION\nClient shall pay Provider $50,000 per month.\",\"type\":\"contract\",\"case_id\":\"HB-2025-002\"}"

echo.
echo.

timeout /t 2 >nul

REM Test 3: Check MCP Server Metrics
echo Test 3: Checking MCP Server Metrics
echo ----------------------------------------

curl -X GET "http://localhost:3001/api/workflow-metrics/stats"

echo.
echo.

REM Test 4: Verify System Health
echo Test 4: Checking System Health
echo ----------------------------------------

curl -X GET "http://localhost:3001/api/health"

echo.
echo.
echo ==========================================
echo Testing Complete!
echo ==========================================
echo.
echo Next Steps:
echo 1. Check n8n Executions tab to see workflow results
echo 2. View metrics in the dashboard (frontend/index.html)
echo 3. Check MCP server logs for detailed information
echo.
pause