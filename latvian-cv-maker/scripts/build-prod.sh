#!/bin/bash

# Production Build Script for Latvian CV Maker
# This script optimizes the build process for production deployment

set -e

echo "🚀 Starting production build process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm ci --production=false
fi

# Set production environment
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Type checking
echo "🔍 Running type checks..."
npm run type-check

# Linting
echo "✅ Running linting..."
npm run lint

# Build the application
echo "🏗️ Building application..."
npm run build

# Analyze bundle if requested
if [ "$1" = "--analyze" ]; then
    echo "📊 Analyzing bundle..."
    npm run build:analyze
fi

# Generate static export (optional)
if [ "$2" = "--export" ]; then
    echo "📤 Generating static export..."
    npm run export
fi

# Performance audit
echo "📈 Running performance audit..."
if command -v lighthouse &> /dev/null; then
    echo "Lighthouse found - you can run: lighthouse http://localhost:3002 --output=html --output-path=./lighthouse-report.html"
else
    echo "Lighthouse not found. Install with: npm install -g lighthouse"
fi

# Build size analysis
echo "📏 Build size analysis:"
du -sh .next

# Check for common issues
echo "🔍 Checking for common issues..."

# Check if PWA files exist
if [ ! -f "public/manifest.json" ]; then
    echo "⚠️  Warning: PWA manifest not found"
fi

if [ ! -f "public/sw.js" ]; then
    echo "⚠️  Warning: Service worker not found"
fi

# Check bundle size
if [ -d ".next" ]; then
    echo "📦 Bundle sizes:"
    find .next -name "*.js" -exec du -sh {} \; | head -5
fi

echo ""
echo "✅ Production build completed successfully!"
echo ""
echo "🚀 To start the production server:"
echo "   npm run start:prod"
echo ""
echo "📱 PWA features enabled:"
echo "   - Service Worker: public/sw.js"
echo "   - Manifest: public/manifest.json"
echo "   - Offline support: public/offline.html"
echo ""
echo "🔧 Build optimizations applied:"
echo "   - Code splitting and tree shaking"
echo "   - CSS optimization"
echo "   - Image optimization"
echo "   - Security headers"
echo "   - Performance optimizations"
echo ""
echo "📊 To analyze bundle: npm run build:analyze"
echo "🌐 To export static: npm run export"