#!/bin/bash

# HB Legal Intelligence Pipeline - Deployment Script
# Automated deployment for production environments

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_ENV=${1:-production}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups/${TIMESTAMP}"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}HB Legal Intelligence Pipeline${NC}"
echo -e "${BLUE}Deployment Script v1.0${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Function to check prerequisites
check_prerequisites() {
    echo -e "${YELLOW}Checking prerequisites...${NC}"

    # Check Docker
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}✗ Docker is not installed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Docker found${NC}"

    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}✗ Docker Compose is not installed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Docker Compose found${NC}"

    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}✗ Node.js is not installed${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Node.js found${NC}"

    # Check for .env file
    if [ ! -f .env ]; then
        echo -e "${YELLOW}⚠ .env file not found, copying from .env.example${NC}"
        cp .env.example .env
        echo -e "${YELLOW}Please update .env with your configuration${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Environment configuration found${NC}"

    echo ""
}

# Function to backup existing data
backup_data() {
    echo -e "${YELLOW}Creating backup...${NC}"

    mkdir -p "$BACKUP_DIR"

    # Backup database
    if [ -f mcp-server/prompts.db ]; then
        cp mcp-server/prompts.db "$BACKUP_DIR/prompts_${TIMESTAMP}.db"
        echo -e "${GREEN}✓ Database backed up${NC}"
    fi

    # Backup n8n data
    if [ -d n8n-data ]; then
        tar -czf "$BACKUP_DIR/n8n-data_${TIMESTAMP}.tar.gz" n8n-data/
        echo -e "${GREEN}✓ n8n data backed up${NC}"
    fi

    # Backup configuration
    cp .env "$BACKUP_DIR/.env_${TIMESTAMP}"
    echo -e "${GREEN}✓ Configuration backed up${NC}"

    echo ""
}

# Function to stop existing services
stop_services() {
    echo -e "${YELLOW}Stopping existing services...${NC}"

    # Stop Docker containers
    docker-compose down || true

    # Kill any running node processes on our ports
    if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
        kill $(lsof -Pi :3001 -sTCP:LISTEN -t) 2>/dev/null || true
        echo -e "${GREEN}✓ Stopped process on port 3001${NC}"
    fi

    if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
        kill $(lsof -Pi :8080 -sTCP:LISTEN -t) 2>/dev/null || true
        echo -e "${GREEN}✓ Stopped process on port 8080${NC}"
    fi

    echo ""
}

# Function to deploy services
deploy_services() {
    echo -e "${YELLOW}Deploying services...${NC}"

    # Start Docker containers
    echo "Starting Docker containers..."
    docker-compose up -d

    # Wait for containers to be healthy
    echo "Waiting for containers to be ready..."
    sleep 10

    # Install MCP server dependencies
    echo "Installing MCP server dependencies..."
    cd mcp-server
    npm install --production

    # Initialize database if needed
    if [ ! -f prompts.db ]; then
        echo "Initializing database..."
        npm run init-db
    fi

    # Start MCP server
    echo "Starting MCP server..."
    if [ "$DEPLOY_ENV" = "production" ]; then
        nohup npm start > ../logs/mcp-server.log 2>&1 &
        echo $! > ../mcp-server.pid
    else
        npm start &
    fi
    cd ..

    # Start frontend server
    echo "Starting frontend server..."
    cd frontend
    if [ "$DEPLOY_ENV" = "production" ]; then
        nohup python3 -m http.server 8080 > ../logs/frontend.log 2>&1 &
        echo $! > ../frontend.pid
    else
        python3 -m http.server 8080 &
    fi
    cd ..

    echo -e "${GREEN}✓ All services deployed${NC}"
    echo ""
}

# Function to run health checks
run_health_checks() {
    echo -e "${YELLOW}Running health checks...${NC}"

    sleep 5  # Give services time to start

    # Check MCP server
    if curl -s http://localhost:3001/api/health > /dev/null; then
        echo -e "${GREEN}✓ MCP server is healthy${NC}"
    else
        echo -e "${RED}✗ MCP server health check failed${NC}"
        exit 1
    fi

    # Check n8n
    if curl -s http://localhost:5678 > /dev/null; then
        echo -e "${GREEN}✓ n8n is accessible${NC}"
    else
        echo -e "${RED}✗ n8n health check failed${NC}"
        exit 1
    fi

    # Run integration tests
    echo "Running integration tests..."
    node test/integration.test.js

    echo ""
}

# Function to setup monitoring
setup_monitoring() {
    echo -e "${YELLOW}Setting up monitoring...${NC}"

    # Create logs directory
    mkdir -p logs

    # Setup log rotation
    cat > /etc/logrotate.d/hb-legal-pipeline << EOF
${PWD}/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 640 nobody adm
    sharedscripts
    postrotate
        /bin/kill -SIGUSR1 \`cat ${PWD}/*.pid 2>/dev/null\` 2>/dev/null || true
    endscript
}
EOF

    echo -e "${GREEN}✓ Monitoring configured${NC}"
    echo ""
}

# Function to display deployment summary
display_summary() {
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Deployment Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Environment: ${DEPLOY_ENV}"
    echo "Timestamp: ${TIMESTAMP}"
    echo "Backup Location: ${BACKUP_DIR}"
    echo ""
    echo "Service URLs:"
    echo "  - Frontend Dashboard: http://localhost:8080"
    echo "  - MCP API Server: http://localhost:3001"
    echo "  - n8n Workflows: http://localhost:5678"
    echo ""
    echo "Management Commands:"
    echo "  - View logs: tail -f logs/*.log"
    echo "  - Stop services: ./stop-services.sh"
    echo "  - Restart services: ./restart-services.sh"
    echo "  - Run tests: node test/integration.test.js"
    echo ""

    if [ "$DEPLOY_ENV" = "production" ]; then
        echo "Production Notes:"
        echo "  - Services running in background"
        echo "  - Logs available in ./logs/"
        echo "  - PIDs stored in .pid files"
        echo "  - Monitoring enabled"
    fi

    echo ""
    echo -e "${GREEN}Deployment successful! All systems operational.${NC}"
}

# Function to handle errors
handle_error() {
    echo ""
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}Deployment Failed!${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo "Error occurred during: $1"
    echo ""
    echo "Troubleshooting steps:"
    echo "1. Check the logs in ./logs/"
    echo "2. Verify .env configuration"
    echo "3. Ensure all ports are available"
    echo "4. Run: docker-compose logs"
    echo ""
    echo "To rollback:"
    echo "1. Stop all services: ./stop-services.sh"
    echo "2. Restore backup from: ${BACKUP_DIR}"
    echo "3. Restart services: ./start-demo.sh"

    exit 1
}

# Main deployment flow
main() {
    trap 'handle_error "$BASH_COMMAND"' ERR

    check_prerequisites
    backup_data
    stop_services
    deploy_services
    run_health_checks

    if [ "$DEPLOY_ENV" = "production" ]; then
        setup_monitoring
    fi

    display_summary
}

# Run deployment
main