#!/bin/bash

# Production Start Script for Latvian CV Maker
# This script starts the application in production mode

set -e

echo "🚀 Starting Latvian CV Maker in production mode..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if .next directory exists
if [ ! -d ".next" ]; then
    echo "❌ Error: .next directory not found. Please run 'npm run build' first."
    exit 1
fi

# Set production environment variables
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export PORT=${PORT:-3002}

# Performance optimizations
export NEXT_OPTIMIZE_FONTS=true
export NEXT_OPTIMIZE_IMAGES=true
export NEXT_OPTIMIZE_CSS=true

# Security
export NEXT_SECURITY_HEADERS=true

# PWA
export NEXT_PWA_ENABLED=true

echo "🔧 Environment configured:"
echo "   NODE_ENV: $NODE_ENV"
echo "   PORT: $PORT"
echo "   PWA: Enabled"
echo "   Optimizations: Enabled"
echo ""

# Check system resources
echo "💻 System resources:"
echo "   CPU cores: $(nproc)"
echo "   Memory: $(free -h | awk '/^Mem:/{print $2}')"
echo "   Disk space: $(df -h . | awk 'NR==2{print $4}') available"
echo ""

# Start the production server
echo "🌐 Starting production server on port $PORT..."
echo "   Local: http://localhost:$PORT"
echo "   Network: http://$(hostname -I | awk '{print $1}'):$PORT"
echo ""
echo "📱 PWA features:"
echo "   - Service Worker: /sw.js"
echo "   - Manifest: /manifest.json"
echo "   - Offline support: /offline.html"
echo ""
echo "🔒 Security headers enabled"
echo "⚡ Performance optimizations enabled"
echo ""

# Start the server
