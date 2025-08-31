#!/bin/bash

# 🇱🇻 Latvian CV Maker - Start Script
# This script starts the CV maker in an isolated tmux session

set -e

# Configuration
SESSION_NAME="latvian-cv-maker"
PROJECT_DIR="/workspace/latvian-cv-maker"
DEV_PORT=3002  # Using 3002 to avoid conflicts with 5000/5001
BACKUP_PORT=3003

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
    echo -e "${BLUE}[CV-MAKER]${NC} $1"
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
        print_warning "Killing existing tmux session: $SESSION_NAME"
        tmux kill-session -t $SESSION_NAME
        sleep 1
    fi
}

# Function to check dependencies
check_dependencies() {
    print_status "Checking dependencies..."
    
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
    
    print_success "Dependencies checked"
}



# Function to start the development server
start_dev_server() {
    local port=$1
    
    print_status "Starting Latvian CV Maker on port $port..."
    
    # Create new tmux session
    tmux new-session -d -s $SESSION_NAME -c "$PROJECT_DIR"
    
    # Start the development server
    tmux send-keys -t $SESSION_NAME "npm run dev:custom" Enter
    
    # Wait for server to start
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:$port >/dev/null 2>&1; then
            print_success "CV Maker started successfully on port $port"
            return 0
        fi
        
        print_status "Waiting for server to start... (attempt $attempt/$max_attempts)"
        sleep 2
        ((attempt++))
    done
    
    print_error "Server failed to start within expected time"
    return 1
}

# Function to show status
show_status() {
    local port=$1
    
    echo ""
    echo -e "${PURPLE}🎉 Latvian CV Maker is running!${NC}"
    echo ""
    echo -e "${GREEN}Access your application:${NC}"
    echo -e "  🌐 Local: http://localhost:$port"
    echo -e "  📱 Mobile: http://$(hostname -I | awk '{print $1}'):$port"
    echo ""
    echo -e "${BLUE}Session Management:${NC}"
    echo -e "  📊 Status: ./start.sh --status"
    echo -e "  📝 Logs: ./start.sh --logs"
    echo -e "  🛑 Stop: ./start.sh --kill"
    echo ""

}

# Function to show help
show_help() {
    echo ""
    echo -e "${PURPLE}🇱🇻 Latvian CV Maker - Start Script${NC}"
    echo ""
    echo "This script manages the CV maker application."
    echo ""
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./start.sh [OPTIONS]"
    echo ""
    echo -e "${YELLOW}Options:${NC}"
    echo "  -p, --port PORT     Use specific port (default: 3002)"
    echo "  -h, --help          Show this help message"
    echo "  -s, --status        Check if CV Maker is running"
    echo "  -k, --kill          Stop the CV Maker service"
    echo "  -l, --logs          Attach to tmux session to view logs"

    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  ./start.sh                    # Start on default port 3002"
    echo "  ./start.sh -p 3005           # Start on port 3005"
    echo "  ./start.sh --status          # Check if running"
    echo "  ./start.sh --kill            # Stop the service"

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
                print_success "CV Maker is running in tmux session: $SESSION_NAME"
                echo "Use 'tmux attach -t $SESSION_NAME' to view logs"
            else
                print_warning "CV Maker is not running"
            fi
            exit 0
            ;;
        -k|--kill)
            kill_existing_session
            print_success "CV Maker session killed"
            exit 0
            ;;
        -l|--logs)
            if tmux has-session -t $SESSION_NAME 2>/dev/null; then
                print_status "Attaching to tmux session..."
                tmux attach -t $SESSION_NAME
            else
                print_error "No active CV Maker session found"
                exit 1
            fi
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
    echo -e "${PURPLE}🇱🇻 Starting Latvian CV Maker...${NC}"
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
        AVAILABLE_PORT=$(find_available_port $DEV_PORT)
        if [ "$AVAILABLE_PORT" = "0" ]; then
            print_error "No available ports found in range $DEV_PORT-$((DEV_PORT + 10))"
            exit 1
        fi
        print_status "Found available port: $AVAILABLE_PORT"
    fi
    
    # Check dependencies
    check_dependencies
    

    
    # Start the development server
    if start_dev_server $AVAILABLE_PORT; then
        show_status $AVAILABLE_PORT
        
        # Optional: Open browser (uncomment if desired)
        # if command -v xdg-open > /dev/null; then
        #     xdg-open "http://localhost:$AVAILABLE_PORT" &
        # fi
        
        print_status "To view logs, run: tmux attach -t $SESSION_NAME"
        print_status "To stop the server, run: ./start.sh --kill"

    else
        print_error "Failed to start CV Maker"
        exit 1
    fi
}

# Run main function
main "$@"