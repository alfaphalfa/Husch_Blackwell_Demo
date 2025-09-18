const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./prompts.db');

const samplePrompts = [
  {
    name: 'Deposition Summary',
    model: 'gpt-4',
    template: 'Summarize the following deposition transcript, highlighting: 1) Key factual admissions, 2) Contradictions, 3) Areas requiring follow-up',
    performance_score: 0.95
  },
  {
    name: 'Action Item Extraction',
    model: 'claude-3-opus',
    template: 'Extract actionable items from this legal document. Format as: [PRIORITY] Action | Deadline | Responsible Party',
    performance_score: 0.92
  },
  {
    name: 'Evidence Classification',
    model: 'gpt-4-vision',
    template: 'Analyze this document image and classify evidence by: 1) Type, 2) Relevance (1-10), 3) Admissibility concerns',
    performance_score: 0.88
  },
  {
    name: 'Contract Clause Analysis',
    model: 'gpt-4',
    template: 'Review the following contract clauses and identify: 1) Potential risks, 2) Ambiguities, 3) Missing standard provisions, 4) Recommendations for negotiation',
    performance_score: 0.91
  },
  {
    name: 'Legal Research Summary',
    model: 'claude-3-opus',
    template: 'Research and summarize case law related to [TOPIC]. Include: 1) Relevant precedents, 2) Jurisdiction-specific rulings, 3) Key legal principles, 4) Potential arguments',
    performance_score: 0.89
  },
  {
    name: 'Discovery Request Generation',
    model: 'gpt-4',
    template: 'Generate discovery requests based on the case facts. Include: 1) Interrogatories, 2) Requests for Production, 3) Requests for Admission. Format according to [JURISDICTION] rules.',
    performance_score: 0.87
  },
  {
    name: 'Litigation Risk Assessment',
    model: 'gpt-4',
    template: 'Assess litigation risk for this case. Analyze: 1) Strengths and weaknesses, 2) Probability of success (percentage), 3) Potential damages/exposure, 4) Settlement considerations',
    performance_score: 0.90
  },
  {
    name: 'Brief Argument Outliner',
    model: 'claude-3-opus',
    template: 'Create an outline for a legal brief on [ISSUE]. Structure: 1) Statement of the Issue, 2) Statement of Facts, 3) Legal Arguments with supporting cases, 4) Conclusion',
    performance_score: 0.93
  },
  {
    name: 'Client Communication Drafter',
    model: 'gpt-3.5-turbo',
    template: 'Draft a client communication regarding [TOPIC]. Tone: Professional but accessible. Include: 1) Current status, 2) Next steps, 3) Required client actions, 4) Timeline',
    performance_score: 0.86
  },
  {
    name: 'Compliance Checklist Generator',
    model: 'gpt-4',
    template: 'Generate a compliance checklist for [REGULATION/LAW]. Include: 1) Required actions, 2) Documentation needed, 3) Deadlines, 4) Responsible parties, 5) Penalties for non-compliance',
    performance_score: 0.88
  }
];

const sampleContextTemplates = [
  {
    name: 'Case Background Context',
    description: 'Provides comprehensive case background for AI analysis',
    template: 'Case Name: [NAME]\\nCase Number: [NUMBER]\\nJurisdiction: [JURISDICTION]\\nCase Type: [TYPE]\\nParties: [PARTIES]\\nKey Issues: [ISSUES]\\nProcedural History: [HISTORY]',
    category: 'Case Management'
  },
  {
    name: 'Document Review Context',
    description: 'Context for document review and analysis',
    template: 'Document Type: [TYPE]\\nDate: [DATE]\\nParties: [PARTIES]\\nPurpose: [PURPOSE]\\nKey Terms to Identify: [TERMS]\\nRisk Factors to Consider: [RISKS]',
    category: 'Document Analysis'
  },
  {
    name: 'Legal Research Context',
    description: 'Framework for legal research queries',
    template: 'Legal Issue: [ISSUE]\\nJurisdiction: [JURISDICTION]\\nRelevant Statutes: [STATUTES]\\nTime Period: [PERIOD]\\nSpecific Questions: [QUESTIONS]',
    category: 'Research'
  },
  {
    name: 'Deposition Prep Context',
    description: 'Context for deposition preparation',
    template: 'Deponent: [NAME]\\nRole in Case: [ROLE]\\nKey Topics: [TOPICS]\\nDocument References: [DOCUMENTS]\\nPrior Testimony: [PRIOR]\\nObjectives: [OBJECTIVES]',
    category: 'Discovery'
  },
  {
    name: 'Contract Analysis Context',
    description: 'Framework for contract review',
    template: 'Contract Type: [TYPE]\\nParties: [PARTIES]\\nKey Terms: [TERMS]\\nDeal Value: [VALUE]\\nSpecial Considerations: [CONSIDERATIONS]\\nRisk Tolerance: [RISK_LEVEL]',
    category: 'Contracts'
  }
];

const sampleWorkflowMetrics = [
  {
    workflow_id: 'wf_001',
    workflow_name: 'Deposition Analysis Pipeline',
    execution_time: 45.2,
    success: 1,
    prompt_id: 1,
    model_used: 'gpt-4',
    tokens_used: 3500,
    cost: 0.105,
    error_message: null
  },
  {
    workflow_id: 'wf_002',
    workflow_name: 'Contract Review Workflow',
    execution_time: 62.8,
    success: 1,
    prompt_id: 4,
    model_used: 'gpt-4',
    tokens_used: 4200,
    cost: 0.126,
    error_message: null
  },
  {
    workflow_id: 'wf_003',
    workflow_name: 'Action Item Extraction',
    execution_time: 28.5,
    success: 1,
    prompt_id: 2,
    model_used: 'claude-3-opus',
    tokens_used: 2100,
    cost: 0.084,
    error_message: null
  },
  {
    workflow_id: 'wf_004',
    workflow_name: 'Evidence Classification',
    execution_time: 55.3,
    success: 0,
    prompt_id: 3,
    model_used: 'gpt-4-vision',
    tokens_used: 1800,
    cost: 0.072,
    error_message: 'Image processing timeout'
  },
  {
    workflow_id: 'wf_005',
    workflow_name: 'Legal Research Summary',
    execution_time: 89.7,
    success: 1,
    prompt_id: 5,
    model_used: 'claude-3-opus',
    tokens_used: 5500,
    cost: 0.220,
    error_message: null
  }
];

db.serialize(() => {
  console.log('Initializing database with sample data...');

  db.run(`CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    model TEXT NOT NULL,
    template TEXT NOT NULL,
    performance_score REAL DEFAULT 0.5,
    usage_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) console.error('Error creating prompts table:', err);
  });

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
  )`, (err) => {
    if (err) console.error('Error creating workflow_metrics table:', err);
  });

  db.run(`CREATE TABLE IF NOT EXISTS context_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    template TEXT NOT NULL,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) console.error('Error creating context_templates table:', err);
  });

  db.get("SELECT COUNT(*) as count FROM prompts", [], (err, row) => {
    if (err) {
      console.error('Error checking prompts table:', err);
      return;
    }

    if (row.count === 0) {
      console.log('Inserting sample prompts...');
      const stmt = db.prepare("INSERT INTO prompts (name, model, template, performance_score) VALUES (?, ?, ?, ?)");

      samplePrompts.forEach((prompt, index) => {
        stmt.run(prompt.name, prompt.model, prompt.template, prompt.performance_score, (err) => {
          if (err) {
            console.error(`Error inserting prompt ${prompt.name}:`, err);
          } else {
            console.log(`  ✓ Inserted prompt: ${prompt.name}`);
          }
        });
      });

      stmt.finalize();
    } else {
      console.log(`Prompts table already contains ${row.count} entries. Skipping prompt insertion.`);
    }
  });

  db.get("SELECT COUNT(*) as count FROM context_templates", [], (err, row) => {
    if (err) {
      console.error('Error checking context_templates table:', err);
      return;
    }

    if (row.count === 0) {
      console.log('Inserting sample context templates...');
      const stmt = db.prepare("INSERT INTO context_templates (name, description, template, category) VALUES (?, ?, ?, ?)");

      sampleContextTemplates.forEach((template) => {
        stmt.run(template.name, template.description, template.template, template.category, (err) => {
          if (err) {
            console.error(`Error inserting context template ${template.name}:`, err);
          } else {
            console.log(`  ✓ Inserted context template: ${template.name}`);
          }
        });
      });

      stmt.finalize();
    } else {
      console.log(`Context templates table already contains ${row.count} entries. Skipping template insertion.`);
    }
  });

  db.get("SELECT COUNT(*) as count FROM workflow_metrics", [], (err, row) => {
    if (err) {
      console.error('Error checking workflow_metrics table:', err);
      return;
    }

    if (row.count === 0) {
      console.log('Inserting sample workflow metrics...');
      const stmt = db.prepare(`INSERT INTO workflow_metrics
        (workflow_id, workflow_name, execution_time, success, prompt_id, model_used, tokens_used, cost, error_message)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

      sampleWorkflowMetrics.forEach((metric) => {
        stmt.run(
          metric.workflow_id,
          metric.workflow_name,
          metric.execution_time,
          metric.success,
          metric.prompt_id,
          metric.model_used,
          metric.tokens_used,
          metric.cost,
          metric.error_message,
          (err) => {
            if (err) {
              console.error(`Error inserting workflow metric ${metric.workflow_id}:`, err);
            } else {
              console.log(`  ✓ Inserted workflow metric: ${metric.workflow_name}`);
            }
          }
        );
      });

      stmt.finalize();
    } else {
      console.log(`Workflow metrics table already contains ${row.count} entries. Skipping metrics insertion.`);
    }
  });
});

setTimeout(() => {
  console.log('\\nDatabase initialization complete!');
  console.log('\\nSummary:');

  db.get("SELECT COUNT(*) as count FROM prompts", [], (err, row) => {
    if (!err) console.log(`  - Prompts: ${row.count} entries`);
  });

  db.get("SELECT COUNT(*) as count FROM context_templates", [], (err, row) => {
    if (!err) console.log(`  - Context Templates: ${row.count} entries`);
  });

  db.get("SELECT COUNT(*) as count FROM workflow_metrics", [], (err, row) => {
    if (!err) console.log(`  - Workflow Metrics: ${row.count} entries`);
  });

  setTimeout(() => {
    console.log('\\nClosing database connection...');
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed successfully.');
      }
      process.exit(0);
    });
  }, 1000);
}, 2000);