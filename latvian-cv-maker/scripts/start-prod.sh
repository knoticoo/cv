#!/bin/bash

# 🇱🇻 Latvian CV Maker - Production Start Script
# This script starts the CV maker in production mode with AI service

set -e

# Configuration
SESSION_NAME="latvian-cv-maker-prod"
PROJECT_DIR="/workspace/latvian-cv-maker"
PROD_PORT=3002
AI_SERVICE_NAME="ollama-cv"

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
    echo -e "${BLUE}[PROD-START]${NC} $1"
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

# Function to check if port is available
check_port() {
    local port=$1
    if curl -s http://localhost:$port > /dev/null 2>&1; then
        return 1  # Port is occupied
    else
        return 0  # Port is free
    fi
}

# Function to find available port
find_available_port() {
    local start_port=$1
    local port=$start_port
    
    while [ $port -le $((start_port + 10)) ]; do
        if check_port $port; then
            echo $port
            return 0
        fi
        ((port++))
    done
    
    echo "0"  # No available port found
    return 1
}

# Function to kill existing tmux session
kill_existing_session() {
    if tmux has-session -t $SESSION_NAME 2>/dev/null; then
        print_warning "Killing existing production session: $SESSION_NAME"
        tmux kill-session -t $SESSION_NAME
        sleep 1
    fi
}

# Function to check dependencies
check_dependencies() {
    print_status "Checking production dependencies..."
    
    # Check if we're in the right directory
    if [ ! -f "$PROJECT_DIR/package.json" ]; then
        print_error "package.json not found in $PROJECT_DIR"
        exit 1
    fi
    
    # Check if node_modules exists
    if [ ! -d "$PROJECT_DIR/node_modules" ]; then
        print_warning "node_modules not found. Installing dependencies..."
        cd "$PROJECT_DIR"
        npm install
    fi
    
    # Check if build exists
    if [ ! -d "$PROJECT_DIR/.next" ]; then
        print_warning "Production build not found. Building application..."
        cd "$PROJECT_DIR"
        npm run build
    fi
    
    print_success "Production dependencies checked"
}

# Function to check AI service
check_ai_service() {
    print_status "Checking AI service..."
    
    if command -v ollama >/dev/null 2>&1; then
        if curl -s http://localhost:11434/api/version >/dev/null 2>&1; then
            print_success "AI service (Ollama) is running"
            return 0
        else
            print_warning "AI service (Ollama) is installed but not running"
            return 1
        fi
    else
        print_warning "AI service (Ollama) is not installed"
        print_status "Run './scripts/setup-ai.sh --service' to install AI capabilities"
        return 1
    fi
}

# Function to start AI service
start_ai_service() {
    print_status "Starting AI service..."
    
    if command -v ollama >/dev/null 2>&1; then
        # Try systemd service first
        if systemctl is-active --quiet $AI_SERVICE_NAME 2>/dev/null; then
            print_success "AI service already running via systemd"
        elif systemctl start $AI_SERVICE_NAME 2>/dev/null; then
            print_success "AI service started via systemd"
            sleep 3
        else
            # Fallback to direct start
            print_status "Starting AI service directly..."
            nohup ollama serve >/dev/null 2>&1 &
            sleep 5
        fi
        
        # Verify service is running
        if curl -s http://localhost:11434/api/version >/dev/null 2>&1; then
            print_success "AI service is running"
        else
            print_warning "AI service may not be running properly"
        fi
    else
        print_warning "AI service not available - install with './scripts/setup-ai.sh --service'"
    fi
}

# Function to start production server
start_production_server() {
    local port=$1
    
    print_status "Starting production server on port $port..."
    
    # Create new tmux session
    tmux new-session -d -s $SESSION_NAME -c "$PROJECT_DIR"
    
    # Set production environment
    tmux send-keys -t $SESSION_NAME "export NODE_ENV=production" Enter
    tmux send-keys -t $SESSION_NAME "export PORT=$port" Enter
    tmux send-keys -t $SESSION_NAME "export NEXT_TELEMETRY_DISABLED=1" Enter
    
    # Start the production server
    tmux send-keys -t $SESSION_NAME "npm run start:prod" Enter
    
    # Wait for server to start
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:$port >/dev/null 2>&1; then
            print_success "Production server started successfully on port $port"
            return 0
        fi
        
        print_status "Waiting for server to start... (attempt $attempt/$max_attempts)"
        sleep 2
        ((attempt++))
    done
    
    print_error "Production server failed to start within expected time"
    return 1
}

# Function to show status
show_status() {
    local port=$1
    
    echo ""
    echo -e "${PURPLE}🎉 Latvian CV Maker Production is running!${NC}"
    echo ""
    echo -e "${GREEN}Production Application:${NC}"
    echo -e "  🌐 Local: http://localhost:$port"
    echo -e "  📱 Network: http://$(hostname -I | awk '{print $1}'):$port"
    echo ""
    echo -e "${BLUE}Session Management:${NC}"
    echo -e "  📊 Status: tmux has-session -t $SESSION_NAME"
    echo -e "  📝 Logs: tmux attach -t $SESSION_NAME"
    echo -e "  🛑 Stop: tmux kill-session -t $SESSION_NAME"
    echo ""
    echo -e "${YELLOW}AI Service:${NC}"
    echo -e "  🤖 Status: systemctl status $AI_SERVICE_NAME"
    echo -e "  🚀 Start: systemctl start $AI_SERVICE_NAME"
    echo -e "  ⏹️  Stop: systemctl stop $AI_SERVICE_NAME"
    echo -e "  📋 Logs: journalctl -u $AI_SERVICE_NAME -f"
    echo ""
    echo -e "${CYAN}System Management:${NC}"
    echo -e "  🔄 Restart: ./scripts/start-prod.sh"
    echo -e "  📊 Monitor: htop"
    echo -e "  💾 Memory: free -h"
    echo ""
}

# Function to show help
show_help() {
    echo ""
    echo -e "${PURPLE}🇱🇻 Latvian CV Maker - Production Start Script${NC}"
    echo ""
    echo "This script starts the CV maker in production mode with AI service."
    echo ""
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./scripts/start-prod.sh [OPTIONS]"
    echo ""
    echo -e "${YELLOW}Options:${NC}"
    echo "  -p, --port PORT     Use specific port (default: 3002)"
    echo "  -h, --help          Show this help message"
    echo "  -s, --status        Check production status"
    echo "  -k, --kill          Stop production service"
    echo "  -l, --logs          View production logs"
    echo "  --ai-status         Check AI service status"
    echo "  --ai-start          Start AI service"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  ./scripts/start-prod.sh              # Start production on default port"
    echo "  ./scripts/start-prod.sh -p 3005     # Start on port 3005"
    echo "  ./scripts/start-prod.sh --status    # Check production status"
    echo "  ./scripts/start-prod.sh --kill      # Stop production service"
    echo ""
}

# Parse command line arguments
CUSTOM_PORT=""
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--port)
            CUSTOM_PORT="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        -s|--status)
            if tmux has-session -t $SESSION_NAME 2>/dev/null; then
                print_success "Production CV Maker is running in tmux session: $SESSION_NAME"
                echo "Use 'tmux attach -t $SESSION_NAME' to view logs"
            else
                print_warning "Production CV Maker is not running"
            fi
            
            if systemctl is-active --quiet $AI_SERVICE_NAME 2>/dev/null; then
                print_success "AI service is running via systemd"
            else
                print_warning "AI service is not running"
            fi
            exit 0
            ;;
        -k|--kill)
            kill_existing_session
            if systemctl is-active --quiet $AI_SERVICE_NAME 2>/dev/null; then
                systemctl stop $AI_SERVICE_NAME
                print_success "AI service stopped"
            fi
            print_success "Production service killed"
            exit 0
            ;;
        -l|--logs)
            if tmux has-session -t $SESSION_NAME 2>/dev/null; then
                print_status "Attaching to production session..."
                tmux attach -t $SESSION_NAME
            else
                print_error "No active production session found"
                exit 1
            fi
            exit 0
            ;;
        --ai-status)
            check_ai_service
            exit 0
            ;;
        --ai-start)
            start_ai_service
            exit 0
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
    echo -e "${PURPLE}🇱🇻 Starting Latvian CV Maker in Production Mode...${NC}"
    echo ""
    
    # Find available port
    if [ -n "$CUSTOM_PORT" ]; then
        if check_port $CUSTOM_PORT; then
            AVAILABLE_PORT=$CUSTOM_PORT
            print_status "Using custom port: $CUSTOM_PORT"
        else
            print_error "Port $CUSTOM_PORT is already in use"
            exit 1
        fi
    else
        AVAILABLE_PORT=$(find_available_port $PROD_PORT)
        if [ "$AVAILABLE_PORT" = "0" ]; then
            print_error "No available ports found in range $PROD_PORT-$((PROD_PORT + 10))"
            exit 1
        fi
        print_status "Found available port: $AVAILABLE_PORT"
    fi
    
    # Check dependencies
    check_dependencies
    
    # Start AI service
    start_ai_service
    
    # Start production server
    if start_production_server $AVAILABLE_PORT; then
        show_status $AVAILABLE_PORT
        
        print_status "Production service started successfully!"
        print_status "To view logs, run: tmux attach -t $SESSION_NAME"
        print_status "To stop the service, run: ./scripts/start-prod.sh --kill"
        print_status "To check status, run: ./scripts/start-prod.sh --status"
    else
        print_error "Failed to start production service"
        exit 1
    fi
}

# Run main function
main "$@"
