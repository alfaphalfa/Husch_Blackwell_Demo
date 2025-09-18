# Troubleshooting Guide - HB Legal Intelligence Pipeline

## 🔴 Common Issues and Solutions

---

## 1. Webhook Returns 404 Not Found

### Symptoms:
```
curl: (7) Failed to connect to localhost port 5678
404 Not Found
```

### Causes & Solutions:

#### ❌ Wrong webhook URL
**Problem**: Using a generic URL instead of your unique webhook URL
- Wrong: `http://localhost:5678/webhook/legal-document`
- Right: `http://localhost:5678/webhook/[your-unique-id]`

**Solution**:
1. Open n8n workflow
2. Double-click "Document Intake" node
3. Copy the EXACT webhook URL shown
4. Update your test scripts

#### ❌ Workflow not active
**Problem**: The workflow toggle is set to "Inactive"

**Solution**:
1. Open your workflow in n8n
2. Click the Active/Inactive toggle (top-right)
3. Ensure it shows "Active" (green/blue)
4. Save the workflow

#### ❌ Workflow not imported
**Problem**: The workflow hasn't been imported yet

**Solution**:
1. Click "Add workflow" in n8n
2. Import from `n8n-workflows/hb-legal-intelligence-pipeline.json`
3. Save and activate the workflow

---

## 2. n8n Login Issues

### Can't access n8n at http://localhost:5678

#### ❌ n8n container not running
**Check**:
```bash
docker ps
```

**Solution**:
```bash
docker-compose up -d
```

#### ❌ Port 5678 already in use
**Check**:
```bash
netstat -ano | findstr :5678
```

**Solution**:
```bash
# Kill the process using the port
taskkill //PID [PID_NUMBER] //F

# Restart Docker
docker-compose down
docker-compose up -d
```

#### ❌ Forgot n8n password
**Solution**:
1. Stop n8n: `docker-compose down`
2. Delete n8n data: `rm -rf n8n-data/`
3. Restart: `docker-compose up -d`
4. Create new account

---

## 3. MCP Server Connection Issues

### Workflow can't connect to MCP server

#### ❌ Using wrong hostname in Docker
**Problem**: Workflow using `localhost` instead of `host.docker.internal`

**Solution**:
1. In n8n workflow, edit HTTP Request nodes
2. Change URLs from:
   - `http://localhost:3001/api/...`
3. To:
   - `http://host.docker.internal:3001/api/...`

#### ❌ MCP server not running
**Check**:
```bash
curl http://localhost:3001/api/health
```

**Solution**:
```bash
cd mcp-server
npm start
```

#### ❌ CORS errors
**Problem**: Browser blocking cross-origin requests

**Solution**: Already configured in server.js, but verify:
- MCP server has CORS enabled
- Using correct ports

---

## 4. Workflow Execution Errors

### Workflow starts but fails

#### ❌ OpenAI credentials not configured
**Error**: "OpenAI API key not found"

**Solution**:
1. In n8n, go to Credentials
2. Add OpenAI credential
3. Enter your API key
4. Update workflow nodes to use credential

**Demo Mode Alternative**:
- Remove or bypass OpenAI nodes
- Use mock responses for demo

#### ❌ Malformed JSON in webhook request
**Error**: "Invalid JSON"

**Solution** - Ensure proper JSON format:
```json
{
  "document": "Your text here",
  "type": "deposition",
  "case_id": "TEST-001"
}
```

#### ❌ Node version mismatch
**Error**: Nodes showing as "unknown"

**Solution**:
1. Update n8n to latest version
2. Re-import the workflow
3. Reconnect any broken connections

---

## 5. Docker Issues

### Docker containers won't start

#### ❌ Docker Desktop not running
**Solution**:
1. Start Docker Desktop
2. Wait for it to fully initialize
3. Run `docker-compose up -d`

#### ❌ Port conflicts
**Error**: "Port already allocated"

**Solution**:
```bash
# Check what's using the ports
netstat -ano | findstr :5678
netstat -ano | findstr :5432
netstat -ano | findstr :3001

# Stop conflicting services or change ports in docker-compose.yml
```

#### ❌ Insufficient resources
**Error**: "No space left on device"

**Solution**:
1. Clear Docker cache: `docker system prune -a`
2. Increase Docker Desktop resources
3. Free up disk space

---

## 6. Database Issues

### MCP server database errors

#### ❌ Database not initialized
**Error**: "SQLITE_ERROR: no such table: prompts"

**Solution**:
```bash
cd mcp-server
npm run init-db
npm start
```

#### ❌ Database locked
**Error**: "SQLITE_BUSY: database is locked"

**Solution**:
1. Stop all services
2. Delete `mcp-server/prompts.db-journal`
3. Restart services

---

## 7. Frontend Dashboard Issues

### Dashboard not loading

#### ❌ Frontend server not running
**Solution**:
```bash
cd frontend
python -m http.server 8080
```

#### ❌ CORS blocking API calls
**Check**: Browser console for CORS errors

**Solution**:
- Access dashboard via http://localhost:8080
- Not via file:// protocol

#### ❌ API endpoint incorrect
**Check**: Network tab in browser DevTools

**Solution**:
- Verify MCP server is at http://localhost:3001
- Update `frontend/app.js` if using different port

---

## 8. Testing Issues

### Test scripts not working

#### ❌ Wrong file permissions (Linux/Mac)
**Solution**:
```bash
chmod +x test-webhook.sh
chmod +x start-demo.sh
```

#### ❌ curl not found (Windows)
**Solution**:
- Install Git Bash (includes curl)
- Or use PowerShell: `Invoke-WebRequest`

#### ❌ Integration tests failing
**Common fixes**:
```bash
# Ensure all services are running
docker ps
netstat -ano | findstr :3001
netstat -ano | findstr :5678

# Run tests with verbose output
node test/integration.test.js
```

---

## 🛠️ Debug Commands

### Check Service Status
```bash
# Docker containers
docker ps
docker-compose logs

# Port availability
netstat -ano | findstr :3001
netstat -ano | findstr :5678
netstat -ano | findstr :8080

# API health
curl http://localhost:3001/api/health
curl http://localhost:5678

# Process list
tasklist | findstr node
tasklist | findstr docker
```

### View Logs
```bash
# n8n logs
docker logs hb-n8n -f

# PostgreSQL logs
docker logs hb-postgres -f

# MCP server logs (if running in background)
tail -f logs/mcp-server.log
```

### Reset Everything
```bash
# Stop all services
docker-compose down
taskkill //F //IM node.exe

# Clear data
rm -rf n8n-data/
rm -rf postgres-data/
rm -rf mcp-server/prompts.db

# Restart fresh
docker-compose up -d
cd mcp-server && npm run init-db && npm start
```

---

## 🆘 Still Having Issues?

### Quick Checklist:
- [ ] Docker Desktop is running
- [ ] All ports are free (3001, 5678, 8080)
- [ ] Workflow is imported and ACTIVE
- [ ] Using correct webhook URL from n8n
- [ ] MCP server is running
- [ ] Database is initialized

### Get Diagnostic Info:
Run this command and save output:
```bash
echo "=== System Diagnostics ===" > diagnostics.txt
echo "Date: %date% %time%" >> diagnostics.txt
docker --version >> diagnostics.txt
node --version >> diagnostics.txt
docker ps >> diagnostics.txt
netstat -ano | findstr "3001 5678 8080" >> diagnostics.txt
curl http://localhost:3001/api/health >> diagnostics.txt
curl http://localhost:5678 >> diagnostics.txt
```

### Contact Support:
Include the diagnostics.txt file and:
1. Screenshot of n8n workflow
2. Screenshot of error message
3. Your webhook URL (sanitized)
4. Steps you've already tried

---

## 💡 Pro Tips

1. **Always check the webhook URL first** - 90% of issues are wrong URL
2. **Workflow must be ACTIVE** - Inactive workflows don't receive webhooks
3. **Use `host.docker.internal`** - When Docker containers need to talk to host
4. **Check n8n Executions tab** - Shows detailed error messages
5. **Test incrementally** - Start with simple webhook, then add complexity
6. **Keep logs open** - Watch logs while testing for real-time feedback

---

## 🎯 Success Indicators

You know everything is working when:
- ✅ `curl` to webhook returns: `{"message":"Workflow was started"}`
- ✅ n8n Executions shows green (successful) runs
- ✅ MCP dashboard shows updated metrics
- ✅ Frontend dashboard displays real-time data
- ✅ Integration tests all pass

---

*Last updated: January 2025 | Version 1.0*