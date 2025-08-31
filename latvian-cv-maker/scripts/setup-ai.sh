#!/bin/bash

# 🇱🇻 AI CV Assistant Setup Script
# This script installs and configures Ollama for local AI CV creation

set -e

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
    echo -e "${BLUE}[AI-SETUP]${NC} $1"
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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check system requirements
check_system_requirements() {
    print_status "Checking system requirements..."
    
    # Check available RAM
    local total_ram=$(free -m | awk 'NR==2{printf "%.0f", $2}')
    if [ "$total_ram" -lt 2048 ]; then
        print_warning "System has ${total_ram}MB RAM. AI models require at least 2GB RAM for optimal performance."
    else
        print_success "System has ${total_ram}MB RAM - sufficient for AI models"
    fi
    
    # Check available disk space (need at least 5GB for models)
    local available_space=$(df -BG . | awk 'NR==2{print $4}' | sed 's/G//')
    if [ "$available_space" -lt 5 ]; then
        print_warning "Available disk space: ${available_space}GB. AI models require at least 5GB free space."
    else
        print_success "Available disk space: ${available_space}GB - sufficient for AI models"
    fi
}

# Function to install Ollama
install_ollama() {
    print_status "Installing Ollama..."
    
    if command_exists ollama; then
        print_success "Ollama is already installed"
        return 0
    fi
    
    # Install Ollama based on OS
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        print_status "Installing Ollama on Linux..."
        curl -fsSL https://ollama.ai/install.sh | sh
        
        # Start Ollama service
        sudo systemctl enable ollama
        sudo systemctl start ollama
        
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        print_status "Installing Ollama on macOS..."
        curl -fsSL https://ollama.ai/install.sh | sh
        
    else
        print_error "Unsupported operating system: $OSTYPE"
        print_status "Please install Ollama manually from https://ollama.ai"
        return 1
    fi
    
    print_success "Ollama installed successfully"
}

# Function to download AI models
download_models() {
    print_status "Downloading AI models for CV creation..."
    
    # Wait for Ollama to be ready
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:11434/api/version >/dev/null 2>&1; then
            break
        fi
        print_status "Waiting for Ollama to start... (attempt $attempt/$max_attempts)"
        sleep 2
        ((attempt++))
    done
    
    if [ $attempt -gt $max_attempts ]; then
        print_error "Ollama failed to start within expected time"
        return 1
    fi
    
    print_success "Ollama is running"
    
    # Download models in order of preference (memory efficient first)
    local models=("phi3:mini" "llama2:3b" "mistral:7b-instruct-q4_0")
    
    for model in "${models[@]}"; do
        print_status "Downloading model: $model"
        if ollama pull "$model"; then
            print_success "Successfully downloaded $model"
            # Test the model
            if echo "Hello" | ollama run "$model" "Say hello" >/dev/null 2>&1; then
                print_success "Model $model is working correctly"
                break
            else
                print_warning "Model $model downloaded but failed basic test"
            fi
        else
            print_warning "Failed to download $model"
        fi
    done
}

# Function to create systemd service for production
create_systemd_service() {
    if [[ "$OSTYPE" != "linux-gnu"* ]]; then
        print_status "Skipping systemd service creation (not Linux)"
        return 0
    fi
    
    print_status "Creating systemd service for Ollama..."
    
    local service_file="/etc/systemd/system/ollama-cv.service"
    
    if [ -f "$service_file" ]; then
        print_status "Systemd service already exists"
        return 0
    fi
    
    sudo tee "$service_file" >/dev/null <<EOF
[Unit]
Description=Ollama AI Service for CV Creation
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=/usr/local/bin/ollama serve
Restart=always
RestartSec=10
Environment=OLLAMA_HOST=0.0.0.0:11434
Environment=OLLAMA_ORIGINS=*

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable ollama-cv.service
    
    print_success "Systemd service created and enabled"
}

# Function to test AI service
test_ai_service() {
    print_status "Testing AI service..."
    
    # Wait a moment for service to be fully ready
    sleep 5
    
    # Test basic functionality
    if curl -s http://localhost:11434/api/version >/dev/null 2>&1; then
        print_success "Ollama API is responding"
        
        # Test model availability
        if ollama list | grep -q "phi3:mini\|llama2:3b\|mistral:7b-instruct-q4_0"; then
            print_success "AI models are available"
            
            # Test basic generation
            local test_response=$(echo "Create a simple CV summary" | ollama run phi3:mini 2>/dev/null | head -c 100)
            if [ -n "$test_response" ]; then
                print_success "AI generation test successful"
                return 0
            else
                print_warning "AI generation test failed"
                return 1
            fi
        else
            print_error "No AI models found"
            return 1
        fi
    else
        print_error "Ollama API is not responding"
        return 1
    fi
}

# Function to show usage information
show_usage() {
    echo ""
    echo -e "${PURPLE}🇱🇻 AI CV Assistant Setup${NC}"
    echo ""
    echo "This script installs and configures Ollama for local AI CV creation."
    echo ""
    echo -e "${YELLOW}Usage:${NC}"
    echo "  ./scripts/setup-ai.sh [OPTIONS]"
    echo ""
    echo -e "${YELLOW}Options:${NC}"
    echo "  -h, --help          Show this help message"
    echo "  -s, --service       Create systemd service for production"
    echo "  -t, --test          Test AI service after setup"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  ./scripts/setup-ai.sh                    # Basic setup"
    echo "  ./scripts/setup-ai.sh --service          # Setup with systemd service"
    echo "  ./scripts/setup-ai.sh --test             # Setup and test"
    echo ""
}

# Function to show next steps
show_next_steps() {
    echo ""
    echo -e "${PURPLE}🎉 AI Setup Complete!${NC}"
    echo ""
    echo -e "${GREEN}Next steps:${NC}"
    echo "1. Start your CV maker application:"
    echo "   npm run start:prod"
    echo ""
    echo "2. Access the AI Assistant in the CV editor"
    echo "3. Select your preferred language (Latvian, Russian, English)"
    echo "4. Use AI to generate or improve CVs"
    echo ""
    echo -e "${YELLOW}AI Service Management:${NC}"
    echo "• Check status: sudo systemctl status ollama"
    echo "• Start service: sudo systemctl start ollama"
    echo "• Stop service: sudo systemctl stop ollama"
    echo "• View logs: sudo journalctl -u ollama -f"
    echo ""
    echo -e "${BLUE}Models Available:${NC}"
    ollama list 2>/dev/null || echo "No models found"
    echo ""
}

# Parse command line arguments
CREATE_SERVICE=false
TEST_SERVICE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_usage
            exit 0
            ;;
        -s|--service)
            CREATE_SERVICE=true
            shift
            ;;
        -t|--test)
            TEST_SERVICE=true
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Main execution
main() {
    echo ""
    echo -e "${PURPLE}🇱🇻 Setting up AI CV Assistant...${NC}"
    echo ""
    
    # Check system requirements
    check_system_requirements
    
    # Install Ollama
    install_ollama
    
    # Download AI models
    download_models
    
    # Create systemd service if requested
    if [ "$CREATE_SERVICE" = true ]; then
        create_systemd_service
    fi
    
    # Test AI service if requested
    if [ "$TEST_SERVICE" = true ]; then
        test_ai_service
    fi
    
    # Show next steps
    show_next_steps
}

# Run main function
main "$@"