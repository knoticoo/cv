#!/bin/bash

# 🇱🇻 Latvian CV Maker - Update Refresh Script
# This script clears caches and restarts services after git pull/merge
# for instant updates without manual intervention

set -e

# Configuration
PROJECT_DIR="/workspace/latvian-cv-maker"
SESSION_NAME="latvian-cv-maker-prod"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[UPDATE-REFRESH]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if production is running
check_production_status() {
    if tmux has-session -t $SESSION_NAME 2>/dev/null; then
        return 0  # Production is running
    else
        return 1  # Production is not running
    fi
}

# Function to clear all caches
clear_all_caches() {
    print_status "Clearing all caches for instant updates..."
    
    cd "$PROJECT_DIR"
    
    # Clear Next.js build cache
    if [ -d ".next" ]; then
        print_status "Clearing Next.js build cache..."
        rm -rf .next
        print_success "Next.js build cache cleared"
    fi
    
    # Clear node_modules cache
    if [ -d "node_modules/.cache" ]; then
        print_status "Clearing node_modules cache..."
        rm -rf node_modules/.cache
        print_success "Node modules cache cleared"
    fi
    
    # Clear npm cache
    print_status "Clearing npm cache..."
    npm cache clean --force 2>/dev/null || true
    print_success "NPM cache cleared"
    
    # Clear browser caches (if possible)
    print_status "Attempting to clear browser caches..."
    
    # Clear Chrome/Chromium cache
    if command -v google-chrome >/dev/null 2>&1; then
        print_status "Clearing Chrome cache..."
        rm -rf ~/.cache/google-chrome/Default/Cache/* 2>/dev/null || true
        rm -rf ~/.cache/google-chrome/Default/Code\ Cache/* 2>/dev/null || true
        print_success "Chrome cache cleared"
    fi
    
    # Clear Firefox cache
    if command -v firefox >/dev/null 2>&1; then
        print_status "Clearing Firefox cache..."
        rm -rf ~/.cache/mozilla/firefox/*/Cache/* 2>/dev/null || true
        print_success "Firefox cache cleared"
    fi
    
    # Clear system cache
    print_status "Clearing system cache..."
    sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches >/dev/null 2>&1 || true
    print_success "System cache cleared"
    
    print_success "All caches cleared successfully"
}

# Function to rebuild application
rebuild_application() {
    print_status "Rebuilding application for instant updates..."
    
    cd "$PROJECT_DIR"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi
    
    # Build the application
    print_status "Building application..."
    npm run build
    
    print_success "Application rebuilt successfully"
}

# Function to restart production service
restart_production() {
    print_status "Restarting production service..."
    
    # Kill existing session
    if tmux has-session -t $SESSION_NAME 2>/dev/null; then
        print_status "Killing existing production session..."
        tmux kill-session -t $SESSION_NAME
        sleep 2
    fi
    
    # Start production service
    print_status "Starting production service..."
    ./scripts/start-prod.sh
    
    print_success "Production service restarted successfully"
}

# Function to show help
show_help() {
    echo ""
    echo -e "${PURPLE}🇱🇻 Latvian CV Maker - Update Refresh Script${NC}"
    echo ""
    echo "This script clears caches and restarts services after git pull/merge"
    echo "for instant updates without manual intervention."
    echo ""
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./scripts/update-refresh.sh [OPTIONS]"
    echo ""
    echo -e "${YELLOW}Options:${NC}"
    echo "  -h, --help          Show this help message"
    echo "  -c, --clear-cache   Only clear caches (don't restart)"
    echo "  -r, --rebuild       Only rebuild (don't restart)"
    echo "  -f, --full          Full refresh: clear cache + rebuild + restart"
    echo "  --auto              Auto-detect and refresh (default)"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  ./scripts/update-refresh.sh              # Auto refresh"
    echo "  ./scripts/update-refresh.sh --clear-cache    # Only clear cache"
    echo "  ./scripts/update-refresh.sh --rebuild        # Only rebuild"
    echo "  ./scripts/update-refresh.sh --full           # Full refresh"
    echo ""
    echo -e "${PURPLE}💡 Pro Tips:${NC}"
    echo "  • Run this script after every git pull/merge"
    echo "  • Use --full for major dependency changes"
    echo "  • Use --clear-cache for quick updates"
    echo ""
}

# Parse command line arguments
MODE="auto"

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        -c|--clear-cache)
            MODE="clear-cache"
            shift
            ;;
        -r|--rebuild)
            MODE="rebuild"
            shift
            ;;
        -f|--full)
            MODE="full"
            shift
            ;;
        --auto)
            MODE="auto"
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Main execution
main() {
    echo ""
    echo -e "${PURPLE}🇱🇻 Latvian CV Maker - Update Refresh${NC}"
    echo ""
    
    case $MODE in
        "clear-cache")
            print_status "Mode: Clear cache only"
            clear_all_caches
            ;;
        "rebuild")
            print_status "Mode: Rebuild only"
            rebuild_application
            ;;
        "full")
            print_status "Mode: Full refresh"
            clear_all_caches
            rebuild_application
            restart_production
            ;;
        "auto")
            print_status "Mode: Auto-detect and refresh"
            
            # Check if production is running
            if check_production_status; then
                print_status "Production service is running. Performing full refresh..."
                clear_all_caches
                rebuild_application
                restart_production
            else
                print_status "Production service is not running. Performing build only..."
                clear_all_caches
                rebuild_application
                print_warning "Production service not started. Run './scripts/start-prod.sh' to start."
            fi
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}✅ Update refresh completed successfully!${NC}"
    echo ""
    echo -e "${CYAN}Next steps:${NC}"
    echo "  • Your changes should now be visible instantly"
    echo "  • If using browser, refresh the page (Ctrl+F5 or Cmd+Shift+R)"
    echo "  • Check the application at the configured port"
    echo ""
    echo -e "${PURPLE}💡 For future updates:${NC}"
    echo "  • Run this script after every git pull/merge"
    echo "  • Use './scripts/update-refresh.sh --help' for more options"
    echo ""
}

# Run main function
main "$@"