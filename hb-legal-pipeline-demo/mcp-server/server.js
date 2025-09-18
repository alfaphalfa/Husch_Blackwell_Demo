const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Set Content Security Policy headers
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  next();
});

app.use(express.static('public'));

const db = new sqlite3.Database('./prompts.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    model TEXT NOT NULL,
    template TEXT NOT NULL,
    performance_score REAL DEFAULT 0.5,
    usage_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS workflow_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workflow_id TEXT NOT NULL,
    workflow_name TEXT,
    execution_time REAL,
    success BOOLEAN,
    prompt_id INTEGER,
    model_used TEXT,
    tokens_used INTEGER,
    cost REAL,
    error_message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prompt_id) REFERENCES prompts (id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS context_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    template TEXT NOT NULL,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

app.get('/api/prompts', (req, res) => {
  db.all("SELECT * FROM prompts ORDER BY performance_score DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/prompts/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM prompts WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Prompt not found' });
      return;
    }
    res.json(row);
  });
});

app.post('/api/prompts', (req, res) => {
  const { name, model, template, performance_score } = req.body;

  if (!name || !model || !template) {
    res.status(400).json({ error: 'Name, model, and template are required' });
    return;
  }

  const sql = `INSERT INTO prompts (name, model, template, performance_score)
               VALUES (?, ?, ?, ?)`;
  const params = [name, model, template, performance_score || 0.5];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      name,
      model,
      template,
      performance_score: performance_score || 0.5
    });
  });
});

app.put('/api/prompts/:id', (req, res) => {
  const { id } = req.params;
  const { name, model, template, performance_score } = req.body;

  const sql = `UPDATE prompts
               SET name = COALESCE(?, name),
                   model = COALESCE(?, model),
                   template = COALESCE(?, template),
                   performance_score = COALESCE(?, performance_score),
                   updated_at = CURRENT_TIMESTAMP
               WHERE id = ?`;

  const params = [name, model, template, performance_score, id];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Prompt not found' });
      return;
    }
    res.json({ id, name, model, template, performance_score });
  });
});

app.delete('/api/prompts/:id', (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM prompts WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Prompt not found' });
      return;
    }
    res.json({ message: 'Prompt deleted successfully' });
  });
});

app.post('/api/prompts/:id/use', (req, res) => {
  const { id } = req.params;

  db.run("UPDATE prompts SET usage_count = usage_count + 1 WHERE id = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Usage count updated' });
  });
});

app.post('/api/workflow-metrics', (req, res) => {
  const {
    workflow_id,
    workflow_name,
    execution_time,
    success,
    prompt_id,
    model_used,
    tokens_used,
    cost,
    error_message
  } = req.body;

  const sql = `INSERT INTO workflow_metrics
               (workflow_id, workflow_name, execution_time, success, prompt_id,
                model_used, tokens_used, cost, error_message)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    workflow_id || uuidv4(),
    workflow_name,
    execution_time,
    success,
    prompt_id,
    model_used,
    tokens_used,
    cost,
    error_message
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, workflow_id: params[0] });
  });
});

app.get('/api/workflow-metrics', (req, res) => {
  const { limit = 100, offset = 0 } = req.query;

  const sql = `SELECT wm.*, p.name as prompt_name
               FROM workflow_metrics wm
               LEFT JOIN prompts p ON wm.prompt_id = p.id
               ORDER BY wm.created_at DESC
               LIMIT ? OFFSET ?`;

  db.all(sql, [limit, offset], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/workflow-metrics/stats', (req, res) => {
  const sql = `
    SELECT
      COUNT(*) as total_executions,
      SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successful_executions,
      AVG(execution_time) as avg_execution_time,
      SUM(tokens_used) as total_tokens,
      SUM(cost) as total_cost,
      COUNT(DISTINCT workflow_id) as unique_workflows
    FROM workflow_metrics
    WHERE created_at >= datetime('now', '-30 days')
  `;

  db.get(sql, [], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.get('/api/model-performance', (req, res) => {
  const sql = `
    SELECT
      model_used,
      COUNT(*) as total_uses,
      AVG(CASE WHEN success = 1 THEN 1.0 ELSE 0.0 END) as success_rate,
      AVG(execution_time) as avg_execution_time,
      SUM(tokens_used) as total_tokens,
      SUM(cost) as total_cost
    FROM workflow_metrics
    WHERE model_used IS NOT NULL
    GROUP BY model_used
    ORDER BY success_rate DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/prompts/:id/update-score', (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE prompts
    SET performance_score = (
      SELECT AVG(CASE WHEN wm.success = 1 THEN 1.0 ELSE 0.0 END)
      FROM workflow_metrics wm
      WHERE wm.prompt_id = ?
    )
    WHERE id = ?
  `;

  db.run(sql, [id, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Performance score updated' });
  });
});

app.get('/api/context-templates', (req, res) => {
  db.all("SELECT * FROM context_templates ORDER BY category, name", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/context-templates', (req, res) => {
  const { name, description, template, category } = req.body;

  if (!name || !template) {
    res.status(400).json({ error: 'Name and template are required' });
    return;
  }

  const sql = `INSERT INTO context_templates (name, description, template, category)
               VALUES (?, ?, ?, ?)`;
  const params = [name, description, template, category];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      name,
      description,
      template,
      category
    });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle Chrome DevTools requests gracefully
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(404).json({ message: 'Chrome DevTools config not required' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// Simplified metrics endpoint for n8n workflows
app.post('/metrics', (req, res) => {
  const {
    workflow_id,
    execution_time,
    tokens_used,
    cost,
    success,
    time_saved,
    cost_saved,
    model_used,
    prompt_id,
    workflow_name
  } = req.body;

  // Insert into workflow_metrics table
  const sql = `INSERT INTO workflow_metrics
    (workflow_id, workflow_name, execution_time, success, prompt_id, model_used, tokens_used, cost)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    workflow_id || 'demo-' + Date.now(),
    workflow_name || 'Demo Workflow',
    execution_time || 0,
    success !== undefined ? success : true,
    prompt_id || 1,
    model_used || 'gpt-4',
    tokens_used || 0,
    cost || 0
  ];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error saving metrics:', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      id: this.lastID,
      success: true,
      message: 'Metrics saved successfully',
      time_saved: time_saved || execution_time * 60,
      cost_saved: cost_saved || 450
    });
  });
});

// Alternative metrics endpoint path for compatibility
app.post('/api/metrics', (req, res) => {
  // Forward to main metrics endpoint
  req.url = '/metrics';
  app.handle(req, res);
});

app.listen(PORT, () => {
  console.log(`MCP Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /api/health');
  console.log('  GET    /api/prompts');
  console.log('  GET    /api/prompts/:id');
  console.log('  POST   /api/prompts');
  console.log('  PUT    /api/prompts/:id');
  console.log('  DELETE /api/prompts/:id');
  console.log('  POST   /api/prompts/:id/use');
  console.log('  POST   /api/prompts/:id/update-score');
  console.log('  POST   /api/workflow-metrics');
  console.log('  GET    /api/workflow-metrics');
  console.log('  GET    /api/workflow-metrics/stats');
  console.log('  GET    /api/model-performance');
  console.log('  GET    /api/context-templates');
  console.log('  POST   /api/context-templates');
  console.log('  POST   /metrics');
  console.log('  POST   /api/metrics');
});

process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});