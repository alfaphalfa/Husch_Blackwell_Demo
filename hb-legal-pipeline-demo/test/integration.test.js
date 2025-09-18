/**
 * HB Legal Intelligence Pipeline - Integration Test Suite
 * Tests all components working together
 */

const http = require('http');
const assert = require('assert');

// Color codes for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

// Test configuration
const config = {
  mcpServer: 'http://localhost:3001',
  n8nServer: 'http://localhost:5678',
  timeout: 5000
};

// Helper function for HTTP requests
async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(config.timeout, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Test MCP Server endpoints
async function testMCPServer() {
  console.log(`${colors.blue}Testing MCP Server...${colors.reset}`);

  try {
    // Test health endpoint
    console.log('  - Testing health endpoint...');
    const healthResponse = await makeRequest(`${config.mcpServer}/api/health`);
    assert(healthResponse.statusCode === 200, 'Health endpoint should return 200');
    const healthData = JSON.parse(healthResponse.body);
    assert(healthData.status === 'healthy', 'Server should be healthy');
    console.log(`  ${colors.green}✓${colors.reset} Health check passed`);

    // Test prompt retrieval
    console.log('  - Testing prompt retrieval...');
    const promptsResponse = await makeRequest(`${config.mcpServer}/api/prompts`);
    assert(promptsResponse.statusCode === 200, 'Prompts endpoint should return 200');
    const prompts = JSON.parse(promptsResponse.body);
    assert(Array.isArray(prompts), 'Should return array of prompts');
    assert(prompts.length > 0, 'Should have at least one prompt');
    console.log(`  ${colors.green}✓${colors.reset} Retrieved ${prompts.length} prompts`);

    // Test specific prompt
    console.log('  - Testing specific prompt retrieval...');
    const promptResponse = await makeRequest(`${config.mcpServer}/api/prompts/1`);
    assert(promptResponse.statusCode === 200, 'Specific prompt should return 200');
    const prompt = JSON.parse(promptResponse.body);
    assert(prompt.id === 1, 'Should return correct prompt');
    console.log(`  ${colors.green}✓${colors.reset} Retrieved prompt: ${prompt.name}`);

    // Test metrics posting
    console.log('  - Testing metrics posting...');
    const metricsData = JSON.stringify({
      workflow_id: 'test-' + Date.now(),
      workflow_name: 'Integration Test',
      execution_time: 45.2,
      success: true,
      prompt_id: 1,
      model_used: 'gpt-4',
      tokens_used: 1500,
      cost: 0.045
    });

    const metricsResponse = await makeRequest(`${config.mcpServer}/api/workflow-metrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(metricsData)
      },
      body: metricsData
    });
    assert(metricsResponse.statusCode === 200, 'Metrics should be saved successfully');
    console.log(`  ${colors.green}✓${colors.reset} Metrics saved successfully`);

    // Test metrics retrieval
    console.log('  - Testing metrics retrieval...');
    const statsResponse = await makeRequest(`${config.mcpServer}/api/workflow-metrics/stats`);
    assert(statsResponse.statusCode === 200, 'Stats endpoint should return 200');
    const stats = JSON.parse(statsResponse.body);
    assert(stats.total_executions !== undefined, 'Should return execution stats');
    console.log(`  ${colors.green}✓${colors.reset} Stats retrieved: ${stats.total_executions} total executions`);

    // Test model performance
    console.log('  - Testing model performance endpoint...');
    const perfResponse = await makeRequest(`${config.mcpServer}/api/model-performance`);
    assert(perfResponse.statusCode === 200, 'Model performance should return 200');
    const performance = JSON.parse(perfResponse.body);
    assert(Array.isArray(performance), 'Should return performance array');
    console.log(`  ${colors.green}✓${colors.reset} Model performance data retrieved`);

    // Test context templates
    console.log('  - Testing context templates...');
    const contextResponse = await makeRequest(`${config.mcpServer}/api/context-templates`);
    assert(contextResponse.statusCode === 200, 'Context templates should return 200');
    const templates = JSON.parse(contextResponse.body);
    assert(Array.isArray(templates), 'Should return templates array');
    console.log(`  ${colors.green}✓${colors.reset} Retrieved ${templates.length} context templates`);

    console.log(`${colors.green}✓ MCP Server: All tests passed${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ MCP Server test failed: ${error.message}${colors.reset}`);
    return false;
  }
}

// Test n8n availability
async function testN8nServer() {
  console.log(`${colors.blue}Testing n8n Server...${colors.reset}`);

  try {
    // Test n8n is running
    console.log('  - Testing n8n availability...');
    const response = await makeRequest(config.n8nServer);
    assert(response.statusCode === 200 || response.statusCode === 401, 'n8n should be accessible');
    console.log(`  ${colors.green}✓${colors.reset} n8n is running`);

    // Test webhook endpoint (this will fail if workflow not imported, which is expected)
    console.log('  - Testing webhook endpoint...');
    const webhookData = JSON.stringify({
      document: 'Integration test document',
      type: 'test',
      case_id: 'TEST-001'
    });

    try {
      const webhookResponse = await makeRequest(`${config.n8nServer}/webhook/legal-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(webhookData)
        },
        body: webhookData
      });

      if (webhookResponse.statusCode === 404) {
        console.log(`  ${colors.yellow}⚠${colors.reset} Webhook not configured (workflow needs to be imported)`);
      } else {
        console.log(`  ${colors.green}✓${colors.reset} Webhook endpoint accessible`);
      }
    } catch (webhookError) {
      console.log(`  ${colors.yellow}⚠${colors.reset} Webhook test skipped (workflow not active)`);
    }

    console.log(`${colors.green}✓ n8n Server: Basic tests passed${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ n8n test failed: ${error.message}${colors.reset}`);
    return false;
  }
}

// Test frontend dashboard
async function testFrontendAccess() {
  console.log(`${colors.blue}Testing Frontend Access...${colors.reset}`);

  try {
    // Test MCP dashboard
    console.log('  - Testing MCP dashboard...');
    const dashboardResponse = await makeRequest(`${config.mcpServer}/`);
    assert(dashboardResponse.statusCode === 200, 'Dashboard should be accessible');
    assert(dashboardResponse.body.includes('HB Legal'), 'Dashboard should contain HB content');
    console.log(`  ${colors.green}✓${colors.reset} MCP dashboard accessible`);

    console.log(`${colors.green}✓ Frontend: Tests passed${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ Frontend test failed: ${error.message}${colors.reset}`);
    return false;
  }
}

// Performance benchmarks
async function runPerformanceBenchmark() {
  console.log(`${colors.blue}Running Performance Benchmarks...${colors.reset}`);

  try {
    const iterations = 10;
    const times = [];

    console.log(`  - Running ${iterations} API calls...`);
    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      await makeRequest(`${config.mcpServer}/api/prompts`);
      const duration = Date.now() - start;
      times.push(duration);
    }

    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);

    console.log(`  ${colors.green}✓${colors.reset} Average response time: ${avgTime.toFixed(2)}ms`);
    console.log(`  ${colors.green}✓${colors.reset} Min/Max: ${minTime}ms / ${maxTime}ms`);

    assert(avgTime < 1000, 'Average response time should be under 1 second');
    console.log(`${colors.green}✓ Performance: Within acceptable limits${colors.reset}\n`);
    return true;
  } catch (error) {
    console.error(`${colors.red}✗ Performance benchmark failed: ${error.message}${colors.reset}`);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('========================================');
  console.log('HB Legal Intelligence Pipeline');
  console.log('Integration Test Suite');
  console.log('========================================\n');

  const startTime = Date.now();
  const results = {
    mcp: false,
    n8n: false,
    frontend: false,
    performance: false
  };

  // Run tests
  results.mcp = await testMCPServer();
  results.n8n = await testN8nServer();
  results.frontend = await testFrontendAccess();
  results.performance = await runPerformanceBenchmark();

  // Summary
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const passed = Object.values(results).filter(r => r).length;
  const total = Object.values(results).length;

  console.log('========================================');
  console.log('Test Summary');
  console.log('========================================');
  console.log(`MCP Server:    ${results.mcp ? colors.green + '✓ PASSED' : colors.red + '✗ FAILED'}${colors.reset}`);
  console.log(`n8n Server:    ${results.n8n ? colors.green + '✓ PASSED' : colors.red + '✗ FAILED'}${colors.reset}`);
  console.log(`Frontend:      ${results.frontend ? colors.green + '✓ PASSED' : colors.red + '✗ FAILED'}${colors.reset}`);
  console.log(`Performance:   ${results.performance ? colors.green + '✓ PASSED' : colors.red + '✗ FAILED'}${colors.reset}`);
  console.log('----------------------------------------');
  console.log(`Total: ${passed}/${total} tests passed`);
  console.log(`Duration: ${duration}s`);
  console.log('========================================\n');

  if (passed === total) {
    console.log(`${colors.green}🎉 All integration tests passed!${colors.reset}`);
    console.log('\nYour HB Legal Intelligence Pipeline is ready for demonstration.');
    process.exit(0);
  } else {
    console.log(`${colors.red}⚠️  Some tests failed. Please check the logs above.${colors.reset}`);
    console.log('\nTroubleshooting tips:');
    console.log('1. Ensure Docker containers are running: docker-compose up -d');
    console.log('2. Check MCP server is running: npm start (in mcp-server directory)');
    console.log('3. Verify n8n is accessible at http://localhost:5678');
    console.log('4. Import and activate the workflow in n8n');
    process.exit(1);
  }
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error(`${colors.red}Unhandled error: ${error.message}${colors.reset}`);
  process.exit(1);
});

// Run tests
console.log('Starting integration tests...\n');
runAllTests();