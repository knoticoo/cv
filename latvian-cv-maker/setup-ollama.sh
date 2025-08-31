#!/bin/bash

# 🇱🇻 Simple Ollama Setup for CV Maker
# This script helps you get Ollama running with a compatible model

echo "🚀 Setting up Ollama for CV Maker..."

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "📥 Installing Ollama..."
    curl -fsSL https://ollama.ai/install.sh | sh
    echo "✅ Ollama installed!"
else
    echo "✅ Ollama is already installed"
fi

# Start Ollama service
echo "🔄 Starting Ollama service..."
ollama serve &
OLLAMA_PID=$!

# Wait for Ollama to start
echo "⏳ Waiting for Ollama to start..."
sleep 5

# Check if Ollama is running
if curl -s http://localhost:11434/api/version >/dev/null 2>&1; then
    echo "✅ Ollama is running!"
else
    echo "❌ Ollama failed to start"
    exit 1
fi

# Download a lightweight model
echo "📥 Downloading phi3:mini model (most memory efficient)..."
if ollama pull phi3:mini; then
    echo "✅ phi3:mini model downloaded successfully!"
else
    echo "⚠️  Failed to download phi3:mini, trying llama2:3b..."
    if ollama pull llama2:3b; then
        echo "✅ llama2:3b model downloaded successfully!"
    else
        echo "❌ Failed to download models. Please check your internet connection and try again."
        exit 1
    fi
fi

# Test the model
echo "🧪 Testing the model..."
if echo "Hello" | ollama run phi3:mini "Say hello" >/dev/null 2>&1 || echo "Hello" | ollama run llama2:3b "Say hello" >/dev/null 2>&1; then
    echo "✅ Model is working correctly!"
else
    echo "⚠️  Model test failed, but Ollama is running"
fi

echo ""
echo "🎉 Setup complete! Your CV Maker should now work with AI features."
echo "📝 To start Ollama in the future, just run: ollama serve"
echo "🛑 To stop Ollama, press Ctrl+C or run: pkill ollama"
echo ""
echo "🌐 You can now refresh your CV Maker page and the AI service should be available!"

# Keep Ollama running
wait $OLLAMA_PID