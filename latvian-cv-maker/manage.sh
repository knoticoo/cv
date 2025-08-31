#!/bin/bash

# 🇱🇻 Latvian CV Maker - Management Script
# Comprehensive management for the CV maker application

set -e

# Configuration
PROJECT_DIR="/workspace/latvian-cv-maker"
SESSION_NAME="latvian-cv-maker"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Function to print colored output
print_header() {
    echo ""
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}                  ${CYAN}🇱🇻 LATVIAN CV MAKER${NC}                     ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}                   ${YELLOW}Management Console${NC}                     ${PURPLE}║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
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

# Function to show main menu
show_menu() {
    echo -e "${CYAN}Available Commands:${NC}"
    echo ""
    echo -e "  ${GREEN}1.${NC} start     - Start the CV maker in tmux"
    echo -e "  ${GREEN}2.${NC} stop      - Stop the CV maker"
    echo -e "  ${GREEN}3.${NC} restart   - Restart the CV maker"
    echo -e "  ${GREEN}4.${NC} status    - Check service status"
    echo -e "  ${GREEN}5.${NC} logs      - View application logs"
    echo -e "  ${GREEN}6.${NC} monitor   - Monitor service continuously"
    echo ""
    echo -e "  ${YELLOW}7.${NC} install   - Install/reinstall dependencies"
    echo -e "  ${YELLOW}8.${NC} build     - Build for production"
    echo -e "  ${YELLOW}9.${NC} clean     - Clean build cache"
    echo -e "  ${YELLOW}10.${NC} reset     - Full reset (clean + install)"
    echo ""
    echo -e "  ${PURPLE}11.${NC} backup    - Create backup of current data"
    echo -e "  ${PURPLE}12.${NC} restore   - Restore from backup"
    echo ""
    echo -e "  ${RED}q.${NC} quit      - Exit management console"
    echo ""
}

# Function to create backup
create_backup() {
    local backup_dir="$PROJECT_DIR/backups"
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    local backup_file="$backup_dir/cv_maker_backup_$timestamp.tar.gz"
    
    print_status "Creating backup..."
    
    mkdir -p "$backup_dir"
    
    # Create backup excluding node_modules and .next
    tar -czf "$backup_file" \
        --exclude="node_modules" \
        --exclude=".next" \
        --exclude="backups" \
        --exclude=".git" \
        -C "$(dirname $PROJECT_DIR)" \
        "$(basename $PROJECT_DIR)"
    
    print_success "Backup created: $backup_file"
    
    # Keep only last 5 backups
    ls -t "$backup_dir"/cv_maker_backup_*.tar.gz | tail -n +6 | xargs -r rm
    print_status "Cleaned old backups (keeping last 5)"
}

# Function to restore from backup
restore_backup() {
    local backup_dir="$PROJECT_DIR/backups"
    
    if [ ! -d "$backup_dir" ]; then
        print_error "No backups directory found"
        return 1
    fi
    
    local latest_backup=$(ls -t "$backup_dir"/cv_maker_backup_*.tar.gz 2>/dev/null | head -n 1)
    
    if [ -z "$latest_backup" ]; then
        print_error "No backup files found"
        return 1
    fi
    
    print_warning "This will restore from: $(basename $latest_backup)"
    read -p "Continue? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_status "Stopping service..."
        ./start.sh --kill 2>/dev/null || true
        
        print_status "Restoring from backup..."
        cd "$(dirname $PROJECT_DIR)"
        tar -xzf "$latest_backup"
        
        print_status "Reinstalling dependencies..."
        cd "$PROJECT_DIR"
        npm install
        
        print_success "Restore completed"
    else
        print_status "Restore cancelled"
    fi
}

# Function to interactive mode
interactive_mode() {
    while true; do
        clear
        print_header
        show_menu
        
        read -p "Enter your choice: " choice
        echo ""
        
        case $choice in
            1|start)
                ./start.sh
                read -p "Press Enter to continue..."
                ;;
            2|stop)
                ./start.sh --kill
                read -p "Press Enter to continue..."
                ;;
            3|restart)
                print_status "Restarting CV Maker..."
                ./start.sh --kill 2>/dev/null || true
                sleep 2
                ./start.sh
                read -p "Press Enter to continue..."
                ;;
            4|status)
                ./start.sh --status
                ./scripts/monitor.sh status
                read -p "Press Enter to continue..."
                ;;
            5|logs)
                ./start.sh --logs
                ;;
            6|monitor)
                ./scripts/monitor.sh monitor
                ;;
            7|install)
                print_status "Installing dependencies..."
                npm install
                print_success "Dependencies installed"
                read -p "Press Enter to continue..."
                ;;
            8|build)
                print_status "Building for production..."
                npm run build
                print_success "Build completed"
                read -p "Press Enter to continue..."
                ;;
            9|clean)
                print_status "Cleaning build cache..."
                npm run clean
                print_success "Cache cleaned"
                read -p "Press Enter to continue..."
                ;;
            10|reset)
                print_warning "This will clean cache and reinstall dependencies"
                read -p "Continue? (y/N): " -n 1 -r
                echo
                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    npm run reset
                    print_success "Reset completed"
                fi
                read -p "Press Enter to continue..."
                ;;
            11|backup)
                create_backup
                read -p "Press Enter to continue..."
                ;;
            12|restore)
                restore_backup
                read -p "Press Enter to continue..."
                ;;
            q|quit|exit)
                print_success "Goodbye! 👋"
                exit 0
                ;;
            *)
                print_error "Invalid choice: $choice"
                read -p "Press Enter to continue..."
                ;;
        esac
    done
}

# Handle command line arguments
case "${1:-interactive}" in
    "start")
        ./start.sh "${@:2}"
        ;;
    "stop")
        ./start.sh --kill
        ;;
    "restart")
        ./start.sh --kill 2>/dev/null || true
        sleep 2
        ./start.sh "${@:2}"
        ;;
    "status")
        ./start.sh --status
        ./scripts/monitor.sh status
        ;;
    "logs")
        ./start.sh --logs
        ;;
    "monitor")
        ./scripts/monitor.sh monitor
        ;;
    "backup")
        create_backup
        ;;
    "restore")
        restore_backup
        ;;
    "install")
        npm install
        ;;
    "build")
        npm run build
        ;;
    "clean")
        npm run clean
        ;;
    "reset")
        npm run reset
        ;;
    "interactive"|"menu"|"")
        interactive_mode
        ;;
    "help"|"-h"|"--help")
        print_header
        echo -e "${CYAN}Latvian CV Maker Management Script${NC}"
        echo ""
        echo -e "${YELLOW}Usage:${NC}"
        echo "  ./manage.sh [COMMAND] [OPTIONS]"
        echo ""
        echo -e "${YELLOW}Commands:${NC}"
        echo "  start [options]    Start the CV maker"
        echo "  stop              Stop the CV maker"
        echo "  restart [options] Restart the CV maker"
        echo "  status            Check service status"
        echo "  logs              View application logs"
        echo "  monitor           Monitor service continuously"
        echo "  backup            Create backup"
        echo "  restore           Restore from latest backup"
        echo "  install           Install dependencies"
        echo "  build             Build for production"
        echo "  clean             Clean build cache"
        echo "  reset             Full reset"
        echo "  interactive       Start interactive menu (default)"
        echo ""
        echo -e "${YELLOW}Examples:${NC}"
        echo "  ./manage.sh start -p 3005    # Start on port 3005"
        echo "  ./manage.sh status           # Check if running"
        echo "  ./manage.sh                  # Interactive menu"
        echo ""
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Use './manage.sh help' for usage information"
        exit 1
        ;;
esac