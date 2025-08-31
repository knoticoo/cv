# 🚀 Instant Updates After Git Pull/Merge

This document explains how to use the enhanced scripts to see instant updates on your web app after pulling or merging changes.

## 🎯 Quick Start

After every `git pull` or `git merge`, run one of these commands to see your changes instantly:

```bash
# Auto-detect and refresh (recommended)
npm run update:refresh

# Or use the script directly
./scripts/update-refresh.sh
```

## 🔧 Available Commands

### NPM Scripts (Recommended)
```bash
# Auto refresh - detects if production is running and refreshes accordingly
npm run update:refresh

# Clear cache only - for quick updates
npm run update:cache

# Rebuild only - for dependency changes
npm run update:rebuild

# Full refresh - clear cache + rebuild + restart
npm run update:full
```

### Direct Script Usage
```bash
# Auto refresh (default)
./scripts/update-refresh.sh

# Clear cache only
./scripts/update-refresh.sh --clear-cache

# Rebuild only
./scripts/update-refresh.sh --rebuild

# Full refresh
./scripts/update-refresh.sh --full

# Show help
./scripts/update-refresh.sh --help
```

## 🚀 Enhanced Production Start Script

The production start script now includes additional options for better control:

```bash
# Start production with automatic service killing
./scripts/start-prod.sh --kill-all

# Clear all caches before starting
./scripts/start-prod.sh --clear-cache

# Force complete rebuild
./scripts/start-prod.sh --force-rebuild

# Show all options
./scripts/start-prod.sh --help
```

## 🔄 Workflow for Instant Updates

### 1. After Git Pull/Merge
```bash
# Pull your changes
git pull origin main

# Refresh for instant updates
npm run update:refresh
```

### 2. For Major Changes
```bash
# If you have new dependencies or major changes
npm run update:full
```

### 3. For Quick Updates
```bash
# If you only changed code (no new dependencies)
npm run update:cache
```

## 🧹 What Gets Cleared

The scripts automatically clear:

- ✅ Next.js build cache (`.next` directory)
- ✅ Node modules cache (`node_modules/.cache`)
- ✅ NPM cache
- ✅ Browser caches (Chrome, Firefox)
- ✅ System cache
- ✅ All running services

## 🌐 Browser Cache Issues

If you still don't see updates in your browser:

1. **Hard Refresh**: Press `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Clear Browser Cache**: Clear browser cache manually
3. **Incognito Mode**: Test in incognito/private browsing mode

## 🚨 Troubleshooting

### Services Won't Start
```bash
# Kill all services and start fresh
./scripts/start-prod.sh --kill-all
```

### Still No Updates
```bash
# Force complete rebuild
npm run update:full

# Or manually
./scripts/start-prod.sh --force-rebuild
```

### Port Conflicts
```bash
# Use custom port
./scripts/start-prod.sh -p 3005
```

## 📋 Complete Update Workflow

Here's the complete workflow for instant updates:

```bash
# 1. Pull your changes
git pull origin main

# 2. Refresh for instant updates
npm run update:refresh

# 3. Check if running
npm run status

# 4. View logs if needed
npm run logs
```

## 🔍 Monitoring

Check the status of your services:

```bash
# Check production status
npm run status

# Check AI service status
npm run ai:prod:status

# View production logs
npm run logs
```

## 💡 Pro Tips

- **Always run `npm run update:refresh` after git operations**
- **Use `npm run update:full` for major dependency changes**
- **Use `npm run update:cache` for quick code updates**
- **The scripts automatically detect if production is running**
- **Browser hard refresh (Ctrl+F5) may still be needed sometimes**

## 🆘 Need Help?

If you encounter issues:

1. Check the script help: `./scripts/update-refresh.sh --help`
2. Check production status: `npm run status`
3. View logs: `npm run logs`
4. Check the main README for more information

---

**Happy coding! 🎉 Your updates should now be visible instantly after every git operation.**