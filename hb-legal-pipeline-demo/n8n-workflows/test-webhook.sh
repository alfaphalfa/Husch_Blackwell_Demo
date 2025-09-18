#!/bin/bash

# HB Legal Pipeline - Webhook Test Script
# This script tests the n8n webhook endpoint with sample legal documents

echo "=========================================="
echo "HB Legal Intelligence Pipeline Test"
echo "=========================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default webhook URL - update this after importing workflow to n8n
WEBHOOK_URL="http://localhost:5678/webhook/legal-document"

# Check if custom webhook URL is provided
if [ ! -z "$1" ]; then
    WEBHOOK_URL="$1"
    echo -e "${YELLOW}Using custom webhook URL: $WEBHOOK_URL${NC}"
else
    echo -e "${YELLOW}Using default webhook URL: $WEBHOOK_URL${NC}"
    echo "Tip: You can provide a custom URL as argument: ./test-webhook.sh [your-webhook-url]"
fi
echo ""

# Test 1: Deposition Document
echo -e "${GREEN}Test 1: Sending Deposition Document${NC}"
echo "----------------------------------------"

DEPOSITION_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "document": "DEPOSITION OF JOHN SMITH\n\nDate: January 15, 2025\nCase No: HB-2025-001\n\nQ: Please state your name for the record.\nA: John Smith.\n\nQ: Mr. Smith, were you present at the board meeting on December 1st, 2024?\nA: Yes, I was present.\n\nQ: Can you describe what was discussed regarding the merger?\nA: The board discussed the potential acquisition of TechCorp. There were concerns about the valuation and due diligence findings. Specifically, we identified three areas of risk: intellectual property disputes, pending litigation, and regulatory compliance issues.\n\nQ: Did you vote in favor of the merger?\nA: Initially, I had reservations. After reviewing the updated risk assessment, I voted against the proposal.\n\nQ: Were there any conflicts of interest disclosed?\nA: Yes, two board members disclosed financial interests in TechCorp.",
    "type": "deposition",
    "case_id": "HB-2025-001",
    "timestamp": '$(date +%s)'
  }')

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Deposition document sent successfully${NC}"
    echo "Response: $DEPOSITION_RESPONSE"
else
    echo -e "${RED}✗ Failed to send deposition document${NC}"
fi
echo ""

# Wait 2 seconds between tests
sleep 2

# Test 2: Contract Document
echo -e "${GREEN}Test 2: Sending Contract Document${NC}"
echo "----------------------------------------"

CONTRACT_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "document": "SERVICE AGREEMENT\n\nThis Agreement is entered into as of January 15, 2025 between ABC Corporation (\"Client\") and XYZ Services LLC (\"Provider\").\n\n1. SCOPE OF SERVICES\nProvider agrees to deliver consulting services including:\n- Strategic planning and analysis\n- Implementation support\n- Monthly progress reports\n\n2. COMPENSATION\nClient shall pay Provider $50,000 per month, due within 30 days of invoice.\n\n3. TERM\nThis Agreement shall commence on February 1, 2025 and continue for 12 months.\n\n4. TERMINATION\nEither party may terminate with 60 days written notice. Early termination penalties apply.\n\n5. CONFIDENTIALITY\nBoth parties agree to maintain strict confidentiality of proprietary information.\n\n6. LIMITATION OF LIABILITY\nProvider liability limited to total fees paid in preceding 6 months.",
    "type": "contract",
    "case_id": "HB-2025-002",
    "timestamp": '$(date +%s)'
  }')

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Contract document sent successfully${NC}"
    echo "Response: $CONTRACT_RESPONSE"
else
    echo -e "${RED}✗ Failed to send contract document${NC}"
fi
echo ""

# Wait 2 seconds between tests
sleep 2

# Test 3: Legal Brief Document
echo -e "${GREEN}Test 3: Sending Legal Brief${NC}"
echo "----------------------------------------"

BRIEF_RESPONSE=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "document": "MOTION FOR SUMMARY JUDGMENT\n\nCase: HB-2025-003\n\nI. INTRODUCTION\nDefendant moves for summary judgment on all claims asserted by Plaintiff.\n\nII. STATEMENT OF FACTS\n1. On October 15, 2024, the parties entered into a purchase agreement.\n2. Plaintiff failed to secure financing by the deadline specified in Section 4.2.\n3. Defendant properly exercised termination rights under Section 8.1.\n\nIII. LEGAL ARGUMENT\nA. No Genuine Issue of Material Fact Exists\nThe undisputed evidence shows Plaintiff breached the agreement.\n\nB. Defendant Is Entitled to Judgment as a Matter of Law\nUnder state contract law, failure to meet conditions precedent relieves the other party of obligations.\n\nIV. CONCLUSION\nFor the foregoing reasons, Defendant respectfully requests the Court grant summary judgment.",
    "type": "brief",
    "case_id": "HB-2025-003",
    "timestamp": '$(date +%s)'
  }')

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Legal brief sent successfully${NC}"
    echo "Response: $BRIEF_RESPONSE"
else
    echo -e "${RED}✗ Failed to send legal brief${NC}"
fi
echo ""

# Test 4: Check MCP Server Metrics
echo -e "${GREEN}Test 4: Checking MCP Server Metrics${NC}"
echo "----------------------------------------"

METRICS_RESPONSE=$(curl -s -X GET "http://localhost:3001/api/workflow-metrics/stats")

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Successfully retrieved metrics from MCP server${NC}"
    echo "Metrics: $METRICS_RESPONSE"
else
    echo -e "${RED}✗ Failed to retrieve metrics${NC}"
fi
echo ""

# Test 5: Verify Workflow Health
echo -e "${GREEN}Test 5: Checking System Health${NC}"
echo "----------------------------------------"

HEALTH_RESPONSE=$(curl -s -X GET "http://localhost:3001/api/health")

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ MCP Server is healthy${NC}"
    echo "Health Status: $HEALTH_RESPONSE"
else
    echo -e "${RED}✗ MCP Server health check failed${NC}"
fi
echo ""

echo "=========================================="
echo -e "${GREEN}Testing Complete!${NC}"
echo "=========================================="
echo ""
echo "Next Steps:"
echo "1. Check n8n Executions tab to see workflow results"
echo "2. View metrics in the dashboard (frontend/index.html)"
echo "3. Check MCP server logs for detailed information"
echo ""
echo "If tests failed:"
echo "- Ensure n8n workflow is imported and active"
echo "- Verify webhook URL is correct"
echo "- Check that MCP server is running on port 3001"
echo "- Confirm Docker containers are running"