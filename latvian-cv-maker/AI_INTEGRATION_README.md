# 🤖 AI CV Assistant Integration

This document explains how to use the AI-powered CV creation features in the Latvian CV Maker application.

## 🌟 Features

### 1. **Professional CV Generation**
- Create complete CVs from scratch using AI
- Specify job title, experience level, education, and skills
- AI generates professional content in your chosen language

### 2. **CV Improvement**
- **Content & Impact**: Make descriptions more impactful and specific
- **Structure & Organization**: Improve logical flow and information hierarchy
- **Language & Grammar**: Fix grammar, spelling, and professional terminology
- **Professional Standards**: Get industry best practices and ATS optimization tips

### 3. **Job-Specific Optimization**
- Paste job descriptions to get tailored CV suggestions
- Identify relevant keywords and skills to highlight
- Optimize CV content for specific positions

### 4. **Multi-Language Support**
- **Latvian (Latviešu)**: Optimized for Latvian job market
- **Russian (Русский)**: Professional Russian CV standards
- **English**: International CV best practices

## 🚀 Quick Start

### 1. Install AI Service

```bash
# Navigate to project directory
cd latvian-cv-maker

# Run AI setup script
./scripts/setup-ai.sh --service --test
```

This will:
- Install Ollama (local AI service)
- Download optimized models for 2GB RAM systems
- Create systemd service for production
- Test the AI service

### 2. Start the Application

```bash
# Development mode
./start.sh

# Production mode with AI
./scripts/start-prod.sh
```

### 3. Access AI Assistant

1. Open the CV editor
2. Click the "🤖 AI Asistents" button (mobile) or use the right panel (desktop)
3. Select your preferred language
4. Choose the AI feature you want to use

## 🔧 AI Service Management

### Check Status
```bash
# Check if AI service is running
./start.sh --ai-status

# Check production AI service
./scripts/start-prod.sh --ai-status
```

### Start/Stop AI Service
```bash
# Start AI service
./start.sh --ai-start

# Stop AI service
./start.sh --ai-stop

# Production mode
./scripts/start-prod.sh --ai-start
./scripts/start-prod.sh --ai-stop
```

### System Service Management
```bash
# Check systemd service status
sudo systemctl status ollama-cv

# Start systemd service
sudo systemctl start ollama-cv

# Stop systemd service
sudo systemctl stop ollama-cv

# View logs
sudo journalctl -u ollama-cv -f
```

## 🧠 AI Models

The system automatically selects the best available model for your system:

### **Primary Models (2GB RAM Compatible)**
1. **phi3:mini** - Very lightweight, excellent for 2GB RAM
2. **llama2:3b** - Good balance of quality and performance
3. **mistral:7b-instruct-q4_0** - Quantized version for memory efficiency

### **Model Selection**
- Automatically chooses the first available model
- Falls back to alternatives if primary model fails
- Optimized for CV creation tasks

## 📱 Using the AI Assistant

### **CV Generation**
1. Select language (Latvian/Russian/English)
2. Fill in job details:
   - Job title (required)
   - Experience level
   - Education
   - Skills (comma-separated)
   - Additional information
3. Click "Generate Professional CV"
4. AI creates a complete CV structure

### **CV Improvement**
1. Select improvement type:
   - **Content**: Make descriptions more impactful
   - **Structure**: Improve organization and flow
   - **Language**: Fix grammar and terminology
   - **Professional**: Industry best practices
2. Add specific feedback (optional)
3. Click "Improve CV"
4. Get AI-powered suggestions

### **Job-Specific Optimization**
1. Paste the job description
2. Select your language
3. Click "Optimize for This Job"
4. Receive tailored recommendations

## 🌐 Language Support

### **Latvian (Latviešu)**
- Professional Latvian CV standards
- Cultural appropriateness for Latvian market
- Europass compatibility
- Local industry terminology

### **Russian (Русский)**
- Professional Russian CV format
- Russian job market standards
- Cultural context awareness
- Professional terminology

### **English**
- International CV standards
- ATS optimization
- Global job market compatibility
- Professional English language

## ⚡ Performance Optimization

### **Memory Management**
- Models optimized for 2GB RAM systems
- Automatic model selection based on available memory
- Response length limits to prevent memory issues

### **Response Optimization**
- Maximum 512 tokens per response
- Temperature: 0.7 (balanced creativity)
- Top-p: 0.9 (focused responses)

## 🔍 Troubleshooting

### **AI Service Not Responding**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/version

# Restart AI service
./start.sh --ai-stop
./start.sh --ai-start
```

### **Model Not Found**
```bash
# Check available models
ollama list

# Download specific model
ollama pull phi3:mini
```

### **Memory Issues**
```bash
# Check system memory
free -h

# Kill other processes if needed
pkill -f "ollama serve"
```

### **Port Conflicts**
```bash
# Check what's using port 11434
sudo netstat -tlnp | grep 11434

# Kill conflicting process
sudo kill -9 <PID>
```

## 📊 Monitoring

### **System Resources**
```bash
# Memory usage
free -h

# CPU usage
htop

# Disk space
df -h
```

### **AI Service Logs**
```bash
# View real-time logs
sudo journalctl -u ollama-cv -f

# View recent logs
sudo journalctl -u ollama-cv --since "1 hour ago"
```

## 🚀 Production Deployment

### **System Requirements**
- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: 5GB+ free space for models
- **OS**: Linux (Ubuntu 18.04+, CentOS 7+)

### **Security Considerations**
- AI service runs on localhost only
- No external API calls
- All data processed locally
- GDPR compliant

### **Scaling**
- Single instance supports multiple concurrent users
- Model loading is shared across requests
- Consider multiple instances for high traffic

## 🔄 Updates and Maintenance

### **Update AI Models**
```bash
# Update specific model
ollama pull phi3:mini

# Update all models
ollama pull phi3:mini llama2:3b mistral:7b-instruct-q4_0
```

### **Update Ollama**
```bash
# Reinstall Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Restart service
sudo systemctl restart ollama-cv
```

## 📚 Examples

### **CV Generation Prompt**
```
Create a professional CV in Latvian language.

Job Title: Software Developer
Experience Level: Entry level
Education: Bachelor's degree in Computer Science
Skills: Programming, Problem solving, Teamwork
Additional Information: Looking for opportunities to grow and learn
```

### **CV Improvement Prompt**
```
Analyze this CV and suggest content improvements in Latvian:

Focus on:
- Making descriptions more impactful and specific
- Adding quantifiable achievements
- Improving professional language
- Enhancing skill descriptions
```

## 🆘 Support

### **Common Issues**
1. **AI service not starting**: Check system requirements and Ollama installation
2. **Slow responses**: Verify sufficient RAM and model availability
3. **Language detection issues**: Ensure proper language selection

### **Getting Help**
- Check system logs: `sudo journalctl -u ollama-cv`
- Verify model status: `ollama list`
- Test API: `curl http://localhost:11434/api/version`

## 🎯 Best Practices

### **For Users**
- Start with CV generation for new CVs
- Use improvement features for existing CVs
- Specify language preference for best results
- Provide detailed job information for better AI responses

### **For Administrators**
- Monitor system resources regularly
- Keep AI models updated
- Use systemd service for production
- Set up log rotation for AI service

---

**🎉 You're now ready to create professional CVs with AI assistance!**

The AI CV Assistant provides enterprise-grade CV creation capabilities while maintaining full data privacy and local processing.