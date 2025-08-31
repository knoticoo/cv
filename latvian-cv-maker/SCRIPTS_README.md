# 🇱🇻 Latvian CV Maker - Scripts Documentation

## 🚀 Quick Start

The CV Maker is now running in an isolated tmux session and accessible at:
**http://localhost:3002**

## 📜 Available Scripts

### Main Management Scripts

#### `./start.sh` - Primary Start Script
```bash
# Start on default port (3002)
./start.sh

# Start on custom port
./start.sh -p 3005

# Check status
./start.sh --status

# Stop service
./start.sh --kill

# View logs
./start.sh --logs

# Help
./start.sh --help
```

#### `./manage.sh` - Interactive Management Console
```bash
# Interactive menu (recommended)
./manage.sh

# Direct commands
./manage.sh start
./manage.sh stop
./manage.sh restart
./manage.sh status
./manage.sh backup
./manage.sh restore
```

### Utility Scripts

#### `scripts/health-check.sh` - System Health Check
```bash
# Full health check
./scripts/health-check.sh

# Shows system status, dependencies, and readiness
```

#### `scripts/monitor.sh` - Service Monitoring
```bash
# Check current status
./scripts/monitor.sh status

# Continuous monitoring
./scripts/monitor.sh monitor

# Quick status check (for automation)
./scripts/monitor.sh quick
```

#### `scripts/dev.sh` - Development Server
```bash
# Direct development start (no tmux)
./scripts/dev.sh

# With custom port
PORT=3005 ./scripts/dev.sh
```

### NPM Scripts

```bash
# Development (with custom port support)
npm run dev                    # Port 3002 (default)
PORT=3005 npm run dev         # Custom port

# Tmux management
npm run start:tmux            # Start in tmux
npm run stop                  # Stop tmux session
npm run status                # Check status
npm run logs                  # View logs

# Build and maintenance
npm run build                 # Production build
npm run clean                 # Clean cache
npm run reset                 # Full reset
```

## 🔧 Port Management

### Default Ports
- **Primary**: 3002 (avoids conflicts with 5000/5001)
- **Backup**: 3003, 3004, 3005

### Port Detection
The start script automatically:
- Detects occupied ports
- Finds next available port
- Avoids conflicts with existing services

### Custom Port Usage
```bash
# Specific port
./start.sh -p 3010

# Environment variable
PORT=3010 npm run dev

# Multiple instances
./start.sh -p 3002  # Instance 1
./start.sh -p 3003  # Instance 2 (different tmux session)
```

## 🖥️ Tmux Session Management

### Session Details
- **Session Name**: `latvian-cv-maker`
- **Isolation**: Complete process isolation
- **Persistence**: Survives terminal disconnection
- **Environment**: Development-optimized

### Tmux Commands
```bash
# View live logs
tmux attach -t latvian-cv-maker

# Detach from session (keep running)
Ctrl+B, then D

# Kill session
tmux kill-session -t latvian-cv-maker

# List all sessions
tmux list-sessions

# Send commands to session
tmux send-keys -t latvian-cv-maker "npm run build" Enter
```

## 🔍 Monitoring & Debugging

### Health Checks
```bash
# Complete system check
./scripts/health-check.sh

# Quick service check
./scripts/monitor.sh quick

# Continuous monitoring
./scripts/monitor.sh monitor
```

### Log Access
```bash
# Real-time logs (interactive)
./start.sh --logs

# Capture logs to file
tmux capture-pane -t latvian-cv-maker -p > logs.txt

# Last 50 lines
tmux capture-pane -t latvian-cv-maker -p | tail -50
```

### Troubleshooting
```bash
# If service won't start
./scripts/health-check.sh        # Check system
npm run clean                    # Clean cache
npm install                      # Reinstall deps
./start.sh                       # Try again

# If port conflicts
./start.sh -p 3010              # Use different port

# If tmux issues
tmux kill-server                # Kill all tmux
./start.sh                      # Restart fresh
```

## 💾 Backup & Restore

### Automatic Backups
```bash
# Create backup
./manage.sh backup

# Restore latest backup
./manage.sh restore

# Backup location
/workspace/latvian-cv-maker/backups/
```

### Manual Backup
```bash
# Export user data
./manage.sh interactive → 11 (backup)

# Keep last 5 backups automatically
# Excludes: node_modules, .next, .git
```

## 🎯 Production Deployment

### Build Process
```bash
# Production build
npm run build

# Start production server
npm run start

# Custom port in production
PORT=8080 npm run start
```

### Environment Variables
```bash
# Development
NODE_ENV=development
PORT=3002
NEXT_TELEMETRY_DISABLED=1

# Production
NODE_ENV=production
PORT=80
```

## 🆘 Common Issues & Solutions

### Issue: Port Already in Use
```bash
# Solution 1: Use different port
./start.sh -p 3010

# Solution 2: Find and kill process
lsof -ti:3002 | xargs kill -9
```

### Issue: Tmux Session Exists
```bash
# Solution: Kill existing session
./start.sh --kill
./start.sh
```

### Issue: Dependencies Missing
```bash
# Solution: Reinstall
npm run reset
```

### Issue: Build Errors
```bash
# Solution: Clean and rebuild
npm run clean
npm install
npm run build
```

## 📊 Service Status

### Current Status
- ✅ **Running**: http://localhost:3002
- ✅ **Tmux Session**: `latvian-cv-maker`
- ✅ **Auto-save**: Enabled
- ✅ **Multi-language**: LV/RU/EN
- ✅ **Templates**: Europass + 5 Creative
- ✅ **PDF Export**: Working
- ✅ **Premium Features**: Available

### Quick Commands Reference
```bash
./start.sh              # Start service
./start.sh --status     # Check status  
./start.sh --kill       # Stop service
./manage.sh             # Management console
./scripts/health-check.sh # System check
```

---

**🎉 Your Latvian CV Maker is ready!**  
Access it at: **http://localhost:3002**