-- HB-Specific Tables for Demo

-- Process Chain Tracking
CREATE TABLE IF NOT EXISTS process_chains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES documents(id),
  chain_type VARCHAR(50),
  steps JSONB,
  current_step INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  time_saved_hours DECIMAL(10,2),
  cost_saved DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- HB Metrics Tracking
CREATE TABLE IF NOT EXISTS hb_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_date DATE DEFAULT CURRENT_DATE,
  hours_saved DECIMAL(10,2),
  cost_saved DECIMAL(10,2),
  documents_processed INTEGER,
  accuracy_rate DECIMAL(5,2),
  adoption_rate DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Workflow Templates (Based on HB's processes)
CREATE TABLE IF NOT EXISTS workflow_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100),
  description TEXT,
  practice_area VARCHAR(50),
  steps JSONB,
  average_time_minutes INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert HB Case Study Data
INSERT INTO workflow_templates (name, description, practice_area, steps, average_time_minutes)
VALUES 
  ('Contract Review - KIRA Style', 'Based on HB KIRA success case', 'Corporate', 
   '["Upload", "Extract", "Analyze", "Risk Assessment", "Export"]'::jsonb, 4),
  ('Conflict Check - Automated', 'Based on HB automation success', 'Admin',
   '["Intake", "Search", "Analysis", "Alert", "Approval"]'::jsonb, 2),
  ('Deposition Prep - AI Enhanced', 'Intelligent deposition preparation', 'Litigation',
   '["Upload Transcript", "Extract Key Points", "Generate Questions", "Review", "Export"]'::jsonb, 10);