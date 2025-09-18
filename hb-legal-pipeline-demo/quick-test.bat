@echo off
REM Quick Test Script for n8n Webhook
REM This script helps you test your n8n webhook with the correct URL

echo ==========================================
echo n8n Webhook Quick Test
echo ==========================================
echo.

echo Please follow these steps first:
echo 1. Open n8n at http://localhost:5678
echo 2. Import the workflow from n8n-workflows folder
echo 3. Open the "Document Intake" webhook node
echo 4. Copy the webhook URL shown there
echo.

set /p WEBHOOK_URL=Paste your n8n webhook URL here:

if "%WEBHOOK_URL%"=="" (
    echo ERROR: No URL provided!
    pause
    exit /b 1
)

echo.
echo Testing webhook: %WEBHOOK_URL%
echo.

echo Test 1: Simple Document Test
echo ----------------------------------------
curl -X POST "%WEBHOOK_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"document\": \"This is a test legal document for processing.\", \"type\": \"deposition\", \"case_id\": \"TEST-001\"}"

echo.
echo.

timeout /t 2 >nul

echo Test 2: Contract Document
echo ----------------------------------------
curl -X POST "%WEBHOOK_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"document\": \"CONTRACT AGREEMENT: This agreement is entered into between Party A and Party B for services rendered.\", \"type\": \"contract\", \"case_id\": \"TEST-002\"}"

echo.
echo.
echo ==========================================
echo Test Complete!
echo ==========================================
echo.
echo If you received "Workflow was started":
echo   - SUCCESS! Your webhook is working
echo   - Check n8n Executions tab for details
echo   - View metrics at http://localhost:3001
echo.
echo If you received an error:
echo   - Make sure the workflow is ACTIVE
echo   - Verify the webhook URL is correct
echo   - Check that n8n is running
echo.
pause