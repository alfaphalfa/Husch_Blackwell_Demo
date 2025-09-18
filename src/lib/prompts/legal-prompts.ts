// HB-Specific Legal Prompt Library
// Based on industry best practices and HB's workflow needs

export const LEGAL_PROMPTS = {
  // Contract Review Prompts (Based on HB's KIRA success case)
  contractReview: {
    extraction: `As a seasoned lawyer with deep expertise in contract law, extract the following key information from this contract:

PARTIES & BASIC TERMS:
- Party names, roles, and contact information
- Effective date and term duration
- Governing law and jurisdiction

FINANCIAL TERMS:
- Payment amounts and schedules
- Interest rates and penalties
- Fee structures and adjustments

KEY OBLIGATIONS:
- Deliverables and milestones
- Performance standards and KPIs
- Reporting requirements

RISK FACTORS:
- Termination clauses and triggers
- Liability limitations and caps
- Indemnification provisions

Format the output as structured JSON with confidence scores (0-100) for each extracted element.`,

    riskAssessment: `Perform a comprehensive risk assessment of this contract, identifying:

HIGH RISK ITEMS:
- Unlimited liability exposures
- Automatic renewal clauses without notice periods
- Unilateral amendment rights

MEDIUM RISK ITEMS:
- Ambiguous payment terms
- Unclear performance standards
- Limited remedies for breach

For each risk:
1. Specify the exact clause and location
2. Explain why it's problematic
3. Suggest specific amendment language
4. Provide fallback positions for negotiation

Rate overall contract risk on scale of 1-10.`
  },

  // Litigation Support Prompts
  litigation: {
    depositionPrep: `Analyze this deposition transcript and provide:

KEY ADMISSIONS:
- Direct admissions relevant to case elements
- Implied admissions through testimony
- Contradictions with prior statements

FOLLOW-UP AREAS:
- Topics requiring clarification
- Inconsistencies to explore
- Missing information gaps

Generate 20 follow-up questions prioritized by importance.`,

    discoveryAnalysis: `Review these discovery documents and identify:

SMOKING GUNS:
- Documents directly supporting our claims
- Evidence contradicting opponent's position
- Third-party corroboration

TIMELINE CONSTRUCTION:
- Create chronological event timeline
- Identify critical dates
- Note document creation/modification dates

Format as litigation-ready summary with exhibit references.`
  },

  // Intelligent Process Chain Prompts (HB's 2025 Vision)
  processChain: {
    intake: `Begin intelligent legal workflow for this matter:

INITIAL ASSESSMENT:
- Matter type and complexity
- Urgency and deadlines
- Stakeholders involved
- Resource requirements

ROUTING LOGIC:
- Appropriate practice group
- Required expertise level
- Geographic considerations
- Conflict check needs

Trigger appropriate downstream processes automatically.`,

    handoff: `Prepare intelligent handoff to next workflow stage:

WORK COMPLETED:
- Tasks accomplished
- Documents generated
- Decisions made

PENDING ITEMS:
- Open questions
- Required follow-ups
- Risk factors

NEXT STEPS:
- Recommended actions
- Priority sequence
- Resource needs

Format for seamless transition to next team/system.`
  }
};

// Model Selection Logic (Based on HB's multi-model approach)
export const MODEL_SELECTION = {
  extraction: 'gpt-4-vision',
  analysis: 'claude-3-opus',
  drafting: 'claude-3-opus',
  research: 'gpt-4',
  summary: 'claude-3-opus'
};

// HB-Specific Metrics
export const HB_METRICS = {
  kiraCase: {
    documents: 937,
    timeSaved: "99%",
    costSaved: "90%"
  },
  copilotSavings: {
    hoursSaved: 8800,
    yearlyValue: 3100000,
    adoptionRate: 0.43,
    targetAdoption: 0.78
  }
};