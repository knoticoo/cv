#!/bin/bash

# Monitor script for CV Maker
SESSION_NAME="latvian-cv-maker"
CHECK_INTERVAL=30  # seconds

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1"
}

print_error() {
    echo -e "${RED}[$(date '+%H:%M:%S')]${NC} $1"
}

# Function to check if session is running
check_session() {
    if tmux has-session -t $SESSION_NAME 2>/dev/null; then
        return 0  # Session exists
    else
        return 1  # Session doesn't exist
    fi
}

# Function to check if service is responding
check_service() {
    local port=${1:-3002}
    if curl -s -f http://localhost:$port > /dev/null 2>&1; then
        return 0  # Service is responding
    else
        return 1  # Service is not responding
    fi
}

# Function to get service info
get_service_info() {
    if check_session; then
        print_success "✅ Tmux session '$SESSION_NAME' is active"
        
        # Try to detect the port
        for port in 3002 3003 3004 3005; do
            if check_service $port; then
                print_success "✅ CV Maker responding on port $port"
                echo -e "   🌐 Access at: ${BLUE}http://localhost:$port${NC}"
                return 0
            fi
        done
        
        print_error "❌ Tmux session exists but service not responding on expected ports"
        return 1
    else
        print_error "❌ Tmux session '$SESSION_NAME' not found"
        return 1
    fi
}

# Main monitoring function
monitor() {
    print_status "🔍 Starting CV Maker monitor..."
    print_status "Press Ctrl+C to stop monitoring"
    echo ""
    
    while true; do
        get_service_info
        echo ""
        sleep $CHECK_INTERVAL
    done
}

# Handle script arguments
case "${1:-status}" in
    "monitor")
        monitor
        ;;
    "status")
        get_service_info
        ;;
    "quick")
        if check_session && check_service; then
            echo -e "${GREEN}✅ Running${NC}"
            exit 0
        else
            echo -e "${RED}❌ Not running${NC}"
            exit 1
        fi
        ;;
    *)
        echo "Usage: $0 [status|monitor|quick]"
        echo "  status  - Check current status (default)"
        echo "  monitor - Continuously monitor service"
        echo "  quick   - Quick status check (exit code based)"
        exit 1
        ;;
esac