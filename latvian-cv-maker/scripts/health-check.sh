#!/bin/bash

# Health check script for CV Maker
PROJECT_DIR="/workspace/latvian-cv-maker"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_check() {
    echo -e "${BLUE}[CHECK]${NC} $1"
}

print_pass() {
    echo -e "${GREEN}[PASS]${NC} ✅ $1"
}

print_fail() {
    echo -e "${RED}[FAIL]${NC} ❌ $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} ⚠️  $1"
}

# Check functions
check_node() {
    print_check "Checking Node.js..."
    if command -v node > /dev/null; then
        local version=$(node --version)
        print_pass "Node.js $version found"
        return 0
    else
        print_fail "Node.js not found"
        return 1
    fi
}

check_npm() {
    print_check "Checking npm..."
    if command -v npm > /dev/null; then
        local version=$(npm --version)
        print_pass "npm $version found"
        return 0
    else
        print_fail "npm not found"
        return 1
    fi
}

check_tmux() {
    print_check "Checking tmux..."
    if command -v tmux > /dev/null; then
        local version=$(tmux -V)
        print_pass "$version found"
        return 0
    else
        print_fail "tmux not found"
        return 1
    fi
}

check_project_files() {
    print_check "Checking project files..."
    
    local files=(
        "package.json"
        "next.config.js"
        "tailwind.config.ts"
        "src/app/layout.tsx"
        "src/i18n/routing.ts"
    )
    
    local missing_files=()
    
    for file in "${files[@]}"; do
        if [ ! -f "$PROJECT_DIR/$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -eq 0 ]; then
        print_pass "All essential project files present"
        return 0
    else
        print_fail "Missing files: ${missing_files[*]}"
        return 1
    fi
}

check_dependencies() {
    print_check "Checking dependencies..."
    
    if [ ! -d "$PROJECT_DIR/node_modules" ]; then
        print_fail "node_modules directory not found"
        print_warn "Run 'npm install' to install dependencies"
        return 1
    fi
    
    # Check key dependencies
    local key_deps=(
        "next"
        "react"
        "typescript"
        "tailwindcss"
        "next-intl"
    )
    
    for dep in "${key_deps[@]}"; do
        if [ ! -d "$PROJECT_DIR/node_modules/$dep" ]; then
            print_fail "Missing dependency: $dep"
            return 1
        fi
    done
    
    print_pass "All key dependencies installed"
    return 0
}

check_ports() {
    print_check "Checking available ports..."
    
    local ports=(3002 3003 3004 3005)
    local available_ports=()
    
    for port in "${ports[@]}"; do
        if ! curl -s http://localhost:$port > /dev/null 2>&1; then
            available_ports+=("$port")
        fi
    done
    
    if [ ${#available_ports[@]} -gt 0 ]; then
        print_pass "Available ports: ${available_ports[*]}"
        return 0
    else
        print_warn "No available ports found in range 3002-3005"
        return 1
    fi
}

check_tmux_session() {
    print_check "Checking tmux session..."
    
    if tmux has-session -t $SESSION_NAME 2>/dev/null; then
        print_pass "Tmux session '$SESSION_NAME' is running"
        return 0
    else
        print_warn "Tmux session '$SESSION_NAME' not found"
        return 1
    fi
}

# Main health check
main() {
    echo ""
    echo -e "${PURPLE}🏥 Latvian CV Maker - Health Check${NC}"
    echo ""
    
    local checks_passed=0
    local total_checks=6
    
    # Run all checks
    check_node && ((checks_passed++))
    check_npm && ((checks_passed++))
    check_tmux && ((checks_passed++))
    check_project_files && ((checks_passed++))
    check_dependencies && ((checks_passed++))
    check_ports && ((checks_passed++))
    
    # Optional check for running session
    echo ""
    print_check "Checking running services..."
    check_tmux_session
    
    # Summary
    echo ""
    echo -e "${PURPLE}╔══════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}              ${CYAN}HEALTH SUMMARY${NC}              ${PURPLE}║${NC}"
    echo -e "${PURPLE}╠══════════════════════════════════════╣${NC}"
    
    if [ $checks_passed -eq $total_checks ]; then
        echo -e "${PURPLE}║${NC}  ${GREEN}Status: ALL SYSTEMS GO! 🚀${NC}           ${PURPLE}║${NC}"
        echo -e "${PURPLE}║${NC}  ${GREEN}Ready to start CV Maker${NC}              ${PURPLE}║${NC}"
    elif [ $checks_passed -ge $((total_checks - 1)) ]; then
        echo -e "${PURPLE}║${NC}  ${YELLOW}Status: MOSTLY READY ⚠️${NC}             ${PURPLE}║${NC}"
        echo -e "${PURPLE}║${NC}  ${YELLOW}Minor issues detected${NC}               ${PURPLE}║${NC}"
    else
        echo -e "${PURPLE}║${NC}  ${RED}Status: ISSUES DETECTED ❌${NC}          ${PURPLE}║${NC}"
        echo -e "${PURPLE}║${NC}  ${RED}Please fix issues before starting${NC}   ${PURPLE}║${NC}"
    fi
    
    echo -e "${PURPLE}║${NC}  ${BLUE}Checks passed: $checks_passed/$total_checks${NC}            ${PURPLE}║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════╝${NC}"
    echo ""
    
    if [ $checks_passed -ge $((total_checks - 1)) ]; then
        echo -e "${GREEN}💡 Ready to start? Run: ./start.sh${NC}"
        echo -e "${GREEN}📊 For management: ./manage.sh${NC}"
    else
        echo -e "${RED}🔧 Fix issues first, then run health check again${NC}"
    fi
    
    echo ""
}

# Run main function
main "$@"