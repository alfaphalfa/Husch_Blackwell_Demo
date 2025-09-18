# HB Legal Intelligence Pipeline - n8n Workflows

## Overview
This directory contains pre-configured n8n workflows for the HB Legal Intelligence Pipeline demonstration. These workflows integrate with the MCP server to provide AI-powered legal document analysis with real-time metrics tracking.

## Available Workflows

### 1. HB Legal Intelligence Pipeline
**File:** `hb-legal-intelligence-pipeline.json`

This comprehensive workflow demonstrates:
- 📥 Document intake via webhook endpoint
- 🤖 Dynamic prompt selection based on document type
- 🧠 AI analysis using GPT-4
- 📊 Metrics tracking and ROI calculation
- 📨 Result formatting and notifications

## How to Import Workflows into n8n

### Method 1: Via n8n UI
1. Open n8n in your browser: http://localhost:5678
2. Log in with your credentials
3. Click on **Workflows** in the left sidebar
4. Click the **Import** button (or press Ctrl+Alt+I)
5. Select **Import from File**
6. Browse to `hb-legal-pipeline-demo/n8n-workflows/`
7. Select `hb-legal-intelligence-pipeline.json`
8. Click **Import**
9. The workflow will appear in your editor

### Method 2: Drag and Drop
1. Open n8n in your browser: http://localhost:5678
2. Open the workflow editor
3. Simply drag the JSON file from your file explorer directly into the n8n canvas
4. The workflow will be automatically imported

### Method 3: Copy and Paste
1. Open `hb-legal-intelligence-pipeline.json` in a text editor
2. Copy the entire JSON content
3. In n8n, press **Ctrl+V** in the workflow editor
4. The workflow will be pasted and ready to use

## Configuration Requirements

### 1. API Endpoints
The workflow uses `host.docker.internal` to communicate with the MCP server from within Docker. This should work automatically if you're running both services as configured.

### 2. OpenAI API Key (Required for GPT-4 nodes)
1. In n8n, go to **Settings** → **Credentials**
2. Click **Add Credential**
3. Search for "OpenAI"
4. Add your OpenAI API key
5. Save the credential

### 3. Webhook URL
After importing the workflow:
1. Click on the **Document Intake** webhook node
2. Copy the webhook URL displayed
3. This URL will be in format: `http://localhost:5678/webhook/[unique-id]/legal-document`

## Testing the Workflow

### Using the Test Script
A test script is provided to verify your workflow is functioning correctly:

```bash
# Make the script executable (first time only)
chmod +x test-webhook.sh

# Run the test
./test-webhook.sh
```

### Manual Testing via cURL
```bash
curl -X POST http://localhost:5678/webhook/[your-webhook-id]/legal-document \
  -H "Content-Type: application/json" \
  -d '{
    "document": "This is a sample legal document for analysis...",
    "type": "deposition",
    "case_id": "HB-2025-001",
    "timestamp": 1234567890
  }'
```

### Testing via Postman or Insomnia
1. Create a new POST request
2. URL: `http://localhost:5678/webhook/[your-webhook-id]/legal-document`
3. Headers: `Content-Type: application/json`
4. Body (JSON):
```json
{
  "document": "Sample deposition transcript...",
  "type": "deposition",
  "case_id": "HB-2025-001"
}
```

## Workflow Components Explained

### Document Intake (Webhook)
- **Purpose:** Receives legal documents for processing
- **Path:** `/legal-document`
- **Expected Payload:**
  - `document`: The text content to analyze
  - `type`: Document type (deposition, contract, brief, etc.)
  - `case_id`: Unique case identifier

### Get Best Prompt (HTTP Request)
- **Purpose:** Fetches the most appropriate prompt from MCP server
- **Endpoint:** `http://host.docker.internal:3001/api/prompts`
- **Returns:** Array of prompts sorted by performance score

### GPT-4 Analysis (OpenAI)
- **Purpose:** Analyzes the document using AI
- **Model:** GPT-4
- **Temperature:** 0.3 (for consistent, focused responses)
- **Max Tokens:** 2000

### Track Metrics (HTTP Request)
- **Purpose:** Records workflow execution metrics
- **Endpoint:** `http://host.docker.internal:3001/api/workflow-metrics`
- **Tracks:**
  - Execution time
  - Success/failure status
  - Tokens used
  - Estimated cost

### Process Results (Function)
- **Purpose:** Calculates ROI metrics
- **Calculates:**
  - Time saved (minutes)
  - Cost saved (dollars)
  - Processing time (seconds)

## Monitoring and Debugging

### View Execution History
1. In n8n, click on **Executions** in the left sidebar
2. View all workflow runs with status, duration, and results
3. Click on any execution to see detailed step-by-step data

### Enable Debug Mode
1. Open the workflow in editor
2. Click on **Settings** (gear icon)
3. Enable **Save Manual Executions**
4. This allows you to review test runs in detail

### Check Logs
```bash
# View n8n container logs
docker logs hb-n8n -f

# View MCP server logs
# (Already visible in terminal where npm start is running)
```

## Common Issues and Solutions

### Issue: Webhook not responding
**Solution:** Ensure n8n is running and the workflow is active (toggle the Active switch)

### Issue: "host.docker.internal" not resolving
**Solution:**
- On Windows/Mac: Should work by default
- On Linux: Add `--add-host=host.docker.internal:host-gateway` to docker run command

### Issue: OpenAI node fails
**Solution:** Verify your OpenAI API key is correctly configured in n8n credentials

### Issue: MCP server connection refused
**Solution:** Ensure the MCP server is running on port 3001

## Advanced Customization

### Adding New Document Types
1. Duplicate the "Is Deposition?" IF node
2. Add conditions for your document type
3. Create specific prompt retrieval nodes
4. Connect to the merge node

### Integrating Additional AI Models
1. Add new AI nodes (Claude, Gemini, etc.)
2. Configure respective API credentials
3. Update the metrics tracking to record model used

### Adding Notification Channels
1. Add Email, Slack, or Teams nodes
2. Connect after "Format Notification" node
3. Configure with appropriate credentials

## Support and Resources

- **n8n Documentation:** https://docs.n8n.io
- **OpenAI API Docs:** https://platform.openai.com/docs
- **MCP Server API:** http://localhost:3001
- **Dashboard:** Open `frontend/index.html` in browser

## Next Steps
1. Import the workflow into n8n
2. Configure OpenAI credentials
3. Activate the workflow
4. Test with sample documents
5. Monitor metrics in the dashboard
6. Customize for your specific use cases