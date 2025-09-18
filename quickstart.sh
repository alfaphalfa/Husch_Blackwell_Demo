#!/bin/bash

# HB Legal Intelligence Platform - Quick Start Script
# This script helps you get the platform running quickly

echo "🚀 HB Legal Intelligence Platform - Quick Start"
echo "=============================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detected: $(node --version)"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm detected: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for .env.local file
if [ ! -f .env.local ]; then
    echo ""
    echo "⚠️  No .env.local file found. Creating from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo ""
    echo "❗ IMPORTANT: Please edit .env.local and add your API keys:"
    echo "   - OPENAI_API_KEY"
    echo "   - ANTHROPIC_API_KEY"
    echo "   - SUPABASE credentials"
    echo ""
    echo "Press Enter to continue after adding your API keys..."
    read
fi

# Build the project
echo ""
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Start options
echo ""
echo "=============================================="
echo "Platform is ready! Choose how to start:"
echo ""
echo "1) Development mode (with hot reload)"
echo "2) Production mode"
echo "3) Exit"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting in development mode..."
        echo "   Access the platform at: http://localhost:3000"
        echo "   Press Ctrl+C to stop"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "🚀 Starting in production mode..."
        echo "   Access the platform at: http://localhost:3000"
        echo "   Press Ctrl+C to stop"
        echo ""
        npm start
        ;;
    3)
        echo ""
        echo "Setup complete! To start later, run:"
        echo "   npm run dev    (for development)"
        echo "   npm start      (for production)"
        echo ""
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
