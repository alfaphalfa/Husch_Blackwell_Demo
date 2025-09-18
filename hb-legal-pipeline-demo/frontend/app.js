// Connect to MCP server
const MCP_URL = 'http://localhost:3001';

// Global state
let workflows = [];
let prompts = [];
let activities = [];
let metricsData = {};
let chartInstance = null;

// Initialize dashboard
async function initDashboard() {
    console.log('Initializing HB Legal Pipeline Dashboard...');

    // Fetch initial data
    await Promise.all([
        fetchMetrics(),
        fetchPrompts(),
        fetchWorkflowMetrics(),
        fetchModelPerformance()
    ]);

    // Set up periodic updates
    setInterval(updateDashboard, 5000);

    // Initialize chart
    initPerformanceChart();

    // Start animations
    animateCounters();

    // Update timestamps
    updateTimestamps();

    // Set up WebSocket for live updates (if implemented)
    // setupWebSocket();
}

// Fetch metrics from MCP server
async function fetchMetrics() {
    try {
        const response = await fetch(`${MCP_URL}/api/workflow-metrics/stats`);
        const data = await response.json();
        metricsData = data;
        updateMetricsDisplay(data);
    } catch (error) {
        console.error('Error fetching metrics:', error);
    }
}

// Fetch prompts
async function fetchPrompts() {
    try {
        const response = await fetch(`${MCP_URL}/api/prompts`);
        prompts = await response.json();
        updatePromptsDisplay(prompts);
    } catch (error) {
        console.error('Error fetching prompts:', error);
    }
}

// Fetch workflow metrics
async function fetchWorkflowMetrics() {
    try {
        const response = await fetch(`${MCP_URL}/api/workflow-metrics?limit=10`);
        const data = await response.json();
        updateWorkflowDisplay(data);
        updateActivityFeed(data);
    } catch (error) {
        console.error('Error fetching workflow metrics:', error);
    }
}

// Fetch model performance
async function fetchModelPerformance() {
    try {
        const response = await fetch(`${MCP_URL}/api/model-performance`);
        const data = await response.json();
        updateModelStats(data);
        if (chartInstance) {
            updateChart(data);
        }
    } catch (error) {
        console.error('Error fetching model performance:', error);
    }
}

// Update metrics display with animation
function updateMetricsDisplay(metrics) {
    // Calculate derived metrics
    const costSavings = ((metrics.total_executions || 0) * 45).toFixed(0);
    const timeSaved = ((metrics.total_executions || 0) * 2.5).toFixed(0);
    const accuracy = metrics.successful_executions && metrics.total_executions
        ? ((metrics.successful_executions / metrics.total_executions) * 100).toFixed(1)
        : 95.8;

    // Update counters with animation
    animateCounter('cost-savings', costSavings / 1000);
    animateCounter('time-saved', timeSaved);
    animateCounter('accuracy-rate', accuracy);
    animateCounter('docs-processed', metrics.total_executions || 0);
}

// Animated counter function
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const current = parseFloat(element.textContent) || 0;
    const increment = (targetValue - current) / 20;
    let count = 0;

    const timer = setInterval(() => {
        count++;
        const value = current + (increment * count);
        element.textContent = value.toFixed(elementId === 'cost-savings' ? 1 : 0);

        if (count >= 20) {
            clearInterval(timer);
            element.textContent = targetValue.toFixed(elementId === 'cost-savings' ? 1 : 0);
        }
    }, 50);
}

// Update prompts display
function updatePromptsDisplay(prompts) {
    const container = document.getElementById('prompt-list');
    if (!container) return;

    // Sort by performance score
    const topPrompts = prompts
        .sort((a, b) => b.performance_score - a.performance_score)
        .slice(0, 5);

    container.innerHTML = topPrompts.map(prompt => `
        <div class="prompt-item">
            <div class="prompt-header">
                <span class="prompt-name">${prompt.name}</span>
                <span class="prompt-model">${prompt.model}</span>
            </div>
            <div class="prompt-stats">
                <div class="performance-bar">
                    <div class="performance-fill" style="width: ${prompt.performance_score * 100}%"></div>
                </div>
                <span class="performance-score">${(prompt.performance_score * 100).toFixed(0)}%</span>
            </div>
            <div class="prompt-usage">Used ${prompt.usage_count || 0} times</div>
        </div>
    `).join('');
}

// Update workflow display
function updateWorkflowDisplay(workflows) {
    const container = document.getElementById('workflow-list');
    if (!container) return;

    const recentWorkflows = workflows.slice(0, 5);
    const runningCount = recentWorkflows.filter(w => !w.success && !w.error_message).length;

    document.getElementById('workflow-count').textContent = `${runningCount} Running`;

    container.innerHTML = recentWorkflows.map(workflow => {
        const status = workflow.success ? 'success' : workflow.error_message ? 'error' : 'running';
        const statusIcon = status === 'success' ? '✓' : status === 'error' ? '✗' : '⟳';

        return `
            <div class="workflow-item ${status}">
                <span class="workflow-icon">${statusIcon}</span>
                <div class="workflow-details">
                    <div class="workflow-name">${workflow.workflow_name || 'Unnamed Workflow'}</div>
                    <div class="workflow-meta">
                        <span>${workflow.model_used || 'N/A'}</span>
                        <span>${workflow.execution_time ? workflow.execution_time.toFixed(1) + 's' : 'Running...'}</span>
                    </div>
                </div>
                ${status === 'running' ? '<div class="workflow-progress"></div>' : ''}
            </div>
        `;
    }).join('');
}

// Update activity feed
function updateActivityFeed(workflows) {
    const container = document.getElementById('activity-list');
    if (!container) return;

    const activities = workflows.slice(0, 8).map(workflow => {
        const time = new Date(workflow.created_at);
        const timeAgo = getTimeAgo(time);
        const status = workflow.success ? 'completed' : workflow.error_message ? 'failed' : 'started';

        return `
            <div class="activity-item">
                <div class="activity-icon ${status}"></div>
                <div class="activity-content">
                    <div class="activity-title">${workflow.workflow_name || 'Workflow'} ${status}</div>
                    <div class="activity-time">${timeAgo}</div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = activities;
}

// Update model statistics
function updateModelStats(models) {
    const container = document.getElementById('model-stats');
    if (!container) return;

    container.innerHTML = models.map(model => `
        <div class="model-stat-item">
            <div class="model-name">${model.model_used}</div>
            <div class="model-metrics">
                <span class="metric">Success: ${(model.success_rate * 100).toFixed(1)}%</span>
                <span class="metric">Avg: ${model.avg_execution_time.toFixed(1)}s</span>
                <span class="metric">Cost: $${model.total_cost.toFixed(2)}</span>
            </div>
        </div>
    `).join('');
}

// Initialize performance chart
function initPerformanceChart() {
    const ctx = document.getElementById('performance-chart');
    if (!ctx) return;

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Success Rate',
                data: [],
                borderColor: '#196ca1',
                backgroundColor: 'rgba(25, 108, 161, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update chart with new data
function updateChart(models) {
    if (!chartInstance) return;

    const labels = models.map(m => m.model_used);
    const data = models.map(m => m.success_rate * 100);

    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.update();
}

// Helper function to get relative time
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    return Math.floor(seconds / 86400) + ' days ago';
}

// Update timestamps
function updateTimestamps() {
    const now = new Date().toLocaleTimeString();
    const element = document.getElementById('last-update');
    if (element) element.textContent = now;
}

// Animate all counters on load
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseFloat(counter.textContent) || 0;
        if (target > 0) {
            counter.textContent = '0';
            setTimeout(() => {
                animateCounter(counter.id, target);
            }, 500);
        }
    });
}

// Update dashboard (called periodically)
async function updateDashboard() {
    await Promise.all([
        fetchMetrics(),
        fetchWorkflowMetrics()
    ]);
    updateTimestamps();

    // Add refresh animation
    const refreshIcon = document.getElementById('roi-refresh');
    if (refreshIcon) {
        refreshIcon.classList.add('spinning');
        setTimeout(() => refreshIcon.classList.remove('spinning'), 1000);
    }
}

// Quick action functions
function openPromptLibrary() {
    const modal = document.getElementById('prompt-modal');
    const content = document.getElementById('prompt-modal-content');

    content.innerHTML = prompts.map(prompt => `
        <div class="prompt-detail-card">
            <h3>${prompt.name}</h3>
            <div class="prompt-meta">
                <span class="badge">${prompt.model}</span>
                <span class="performance">${(prompt.performance_score * 100).toFixed(0)}% accuracy</span>
            </div>
            <div class="prompt-template">${prompt.template}</div>
            <div class="prompt-actions">
                <button class="btn-primary" onclick="usePrompt(${prompt.id})">Use This Prompt</button>
                <button class="btn-secondary" onclick="editPrompt(${prompt.id})">Edit</button>
            </div>
        </div>
    `).join('');

    modal.style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function startNewWorkflow() {
    window.open('http://localhost:5678', '_blank');
}

function viewAnalytics() {
    alert('Analytics view coming soon! This will show detailed performance metrics and trends.');
}

function openSettings() {
    alert('Settings panel coming soon! Configure API endpoints, models, and preferences here.');
}

function usePrompt(promptId) {
    fetch(`${MCP_URL}/api/prompts/${promptId}/use`, { method: 'POST' })
        .then(() => {
            alert(`Prompt ${promptId} selected! Opening n8n to create workflow...`);
            window.open('http://localhost:5678', '_blank');
        });
}

function editPrompt(promptId) {
    alert(`Edit functionality for prompt ${promptId} coming soon!`);
}

function refreshPrompts() {
    fetchPrompts();
    const btn = event.target;
    btn.textContent = 'Refreshing...';
    setTimeout(() => {
        btn.textContent = 'Refresh';
    }, 1000);
}

// WebSocket setup (for future implementation)
function setupWebSocket() {
    // This would connect to a WebSocket server for real-time updates
    // For now, we're using polling instead
    console.log('WebSocket support planned for future implementation');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initDashboard);