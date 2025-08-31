# 🤖 AI CV Assistant - Conversational Interface

## Overview
The AI CV Assistant has been redesigned to be much simpler and more user-friendly. Instead of filling out complex forms, you now have a natural conversation with AI to create your CV.

## 🚀 Quick Start

### 1. Set up Ollama (AI Service)
```bash
# Run the setup script
./setup-ollama.sh

# Or manually:
ollama serve
ollama pull phi3:mini  # Most memory efficient
```

### 2. Start the CV Maker
```bash
npm run dev
```

### 3. Use the AI Assistant
- Go to the AI CV Assistant section
- Start chatting with AI about your CV
- AI will ask questions step by step
- When ready, AI will generate your CV

## 💬 How the Conversation Works

### Step-by-Step Process:
1. **AI greets you** and asks what job you're looking for
2. **You respond** with basic information
3. **AI asks follow-up questions** about:
   - Experience level
   - Education
   - Skills
   - Languages
   - Any specific requirements
4. **AI provides a summary** when it has enough information
5. **You can approve** and AI generates the complete CV

### Example Conversation:
```
AI: Sveiki! Kādu amatu jūs meklējat?
You: Programmatūras izstrādātājs
AI: Lieliski! Cik daudz pieredzes jums ir programmēšanā?
You: 3 gadi
AI: Kādu izglītību jums ir?
You: Bakalaura grāds datorzinātnēs
AI: Kādas programmēšanas valodas jūs zināt?
You: JavaScript, Python, Java
AI: CV kopsavilkums: Programmatūras izstrādātājs ar 3 gadu pieredzi...
```

## 🎯 Benefits of the New Interface

- **No complex forms** - just natural conversation
- **AI guides you** through the process step by step
- **Flexible** - you can provide as much or as little detail as you want
- **Interactive** - AI can ask clarifying questions
- **Multilingual** - supports Latvian, Russian, and English

## 🔧 Troubleshooting

### AI Service Unavailable
If you see "AI Serviss Nav Pieejams":

1. **Check if Ollama is running:**
   ```bash
   curl http://localhost:11434/api/version
   ```

2. **Start Ollama:**
   ```bash
   ollama serve
   ```

3. **Check available models:**
   ```bash
   ollama list
   ```

4. **Download a model if none available:**
   ```bash
   ollama pull phi3:mini
   ```

### Memory Issues
If you have limited RAM (less than 4GB):
- Use `phi3:mini` model (most memory efficient)
- Close other applications
- Restart Ollama if needed

## 🌐 Supported Languages

- **Latvian (lv)** - Primary language
- **Russian (ru)** - Secondary language  
- **English (en)** - International language

## 📱 Mobile Friendly

The new chat interface works great on mobile devices:
- Responsive design
- Touch-friendly buttons
- Easy text input
- Scrollable chat history

## 🔄 Starting Over

To start a new conversation:
- Click "Jauna Saruna" button
- Or refresh the page
- AI will start fresh with the greeting message

## 💡 Tips for Best Results

1. **Be specific** about your job goals
2. **Provide examples** of your work
3. **Mention achievements** not just responsibilities
4. **Include relevant skills** for the position
5. **Be honest** about experience level

## 🆘 Need Help?

If you encounter issues:
1. Check the Ollama setup
2. Ensure you have a compatible model
3. Check the browser console for errors
4. Try refreshing the page
5. Restart Ollama service

---

**Happy CV Creating! 🎉**