#!/bin/bash

# Development script with port configuration
PORT=${PORT:-3002}

echo "🇱🇻 Starting Latvian CV Maker on port $PORT..."
echo "📁 Project directory: $(pwd)"
echo "🌐 URL: http://localhost:$PORT"
echo ""

# Start Next.js with custom port
npx next dev -p $PORT