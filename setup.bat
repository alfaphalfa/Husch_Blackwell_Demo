@echo off
echo Setting up HB Legal Intelligence Platform...
echo.

:: Install dependencies
echo Installing dependencies...
npm install

:: Create folder structure
echo Creating folder structure...
mkdir src\app 2>nul
mkdir src\components\ui 2>nul
mkdir src\components\features 2>nul
mkdir src\lib\ai 2>nul
mkdir src\lib\prompts 2>nul
mkdir src\lib\workflows 2>nul
mkdir public 2>nul

:: Create environment file
echo Creating .env.local file...
echo # Add your API keys here > .env.local
echo OPENAI_API_KEY=your_key_here >> .env.local
echo ANTHROPIC_API_KEY=your_key_here >> .env.local

echo.
echo Setup complete! Now:
echo 1. Add your API keys to .env.local
echo 2. Run 'npm run dev' to start the development server
echo.
pause