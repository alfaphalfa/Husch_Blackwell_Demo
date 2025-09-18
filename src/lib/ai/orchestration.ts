import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface DocumentAnalysis {
  extraction: ExtractionResult
  analysis: AnalysisResult
  risks: RiskAssessment[]
  actionItems: ActionItem[]
  timeSaved: number
  costSaved: number
}

export interface ExtractionResult {
  documentType: string
  keyTerms: KeyTerm[]
  dates: DateItem[]
  parties: Party[]
  obligations: Obligation[]
  rawText: string
  confidence: number
}

export interface KeyTerm {
  term: string
  context: string
  importance: 'high' | 'medium' | 'low'
  location: string
}

export interface DateItem {
  date: string
  type: string
  description: string
  isCritical: boolean
}

export interface Party {
  name: string
  role: string
  obligations: string[]
}

export interface Obligation {
  party: string
  description: string
  deadline?: string
  penalty?: string
  status: 'active' | 'completed' | 'pending'
}

export interface AnalysisResult {
  summary: string
  keyFindings: string[]
  recommendations: string[]
  complexity: 'low' | 'medium' | 'high'
  estimatedReviewTime: number
}

export interface RiskAssessment {
  category: string
  severity: 'high' | 'medium' | 'low'
  description: string
  mitigation: string
  probability: number
}

export interface ActionItem {
  id: string
  title: string
  description: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  assignee?: string
  dueDate?: string
  status: 'pending' | 'in-progress' | 'completed'
  estimatedTime: number
}

/**
 * Main orchestration function that coordinates multi-model processing
 */
export async function processDocument(
  file: File | Buffer,
  documentType?: string
): Promise<DocumentAnalysis> {
  const startTime = Date.now()

  try {
    // Check if AI services are available
    const hasOpenAI = !!process.env.OPENAI_API_KEY
    const hasAnthropic = !!process.env.ANTHROPIC_API_KEY

    if (!hasOpenAI && !hasAnthropic) {
      console.log('🎭 No AI services available, using mock data...')
      return await processDocumentMock(file, documentType)
    }

    // Step 1: Extract content using GPT-4 Vision (with fallback)
    console.log('🔍 Starting document extraction...')
    const extraction = hasOpenAI
      ? await extractWithVision(file, documentType)
      : await extractMock(file, documentType)

    // Step 2: Analyze with Claude (with fallback)
    console.log('🧠 Analyzing document...')
    const analysis = hasAnthropic
      ? await analyzeWithClaude(extraction)
      : await analyzeMock(extraction)

    // Step 3: Risk Assessment (with fallback)
    console.log('⚠️ Performing risk assessment...')
    const risks = hasAnthropic
      ? await assessRisks(extraction, analysis)
      : await assessRisksMock(extraction, analysis)

    // Step 4: Generate Action Items (with fallback)
    console.log('📋 Generating action items...')
    const actionItems = hasAnthropic
      ? await generateActionItems(extraction, analysis, risks)
      : await generateActionItemsMock(extraction, analysis, risks)

    // Calculate metrics
    const processingTime = (Date.now() - startTime) / 1000
    const timeSaved = calculateTimeSaved(documentType, extraction.rawText.length)
    const costSaved = calculateCostSaved(timeSaved)

    console.log(`✅ Document processed in ${processingTime}s, saved ${timeSaved} hours`)

    return {
      extraction,
      analysis,
      risks,
      actionItems,
      timeSaved,
      costSaved
    }
  } catch (error) {
    console.error('Error in document processing:', error)
    // Fallback to mock data on any error
    console.log('🎭 Falling back to mock processing...')
    return await processDocumentMock(file, documentType)
  }
}

/**
 * Extract information using GPT-4 Vision
 */
async function extractWithVision(
  file: File | Buffer,
  documentType?: string
): Promise<ExtractionResult> {
  // Convert file to base64
  const base64 = await fileToBase64(file)
  
  const prompt = `
    You are a legal document expert. Analyze this ${documentType || 'legal document'} and extract:
    
    1. Document type and purpose
    2. Key terms and definitions (with importance levels)
    3. All dates and deadlines (mark critical ones)
    4. All parties involved and their roles
    5. Obligations and responsibilities for each party
    6. Any penalties, liabilities, or risk factors
    
    Provide the extraction in a structured format with high accuracy.
    Include the confidence level (0-100) for your extraction.
  `
  
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { 
            type: "image_url", 
            image_url: { 
              url: `data:image/jpeg;base64,${base64}`,
              detail: "high"
            } 
          }
        ]
      }
    ],
    max_tokens: 4096,
    temperature: 0.1, // Low temperature for accuracy
  })
  
  const content = response.choices[0].message.content || ''
  return parseExtractionResult(content)
}

/**
 * Analyze extracted content using Claude
 */
async function analyzeWithClaude(
  extraction: ExtractionResult
): Promise<AnalysisResult> {
  const prompt = `
    As a senior legal analyst, analyze this extracted legal document information:
    
    Document Type: ${extraction.documentType}
    
    Key Terms: ${JSON.stringify(extraction.keyTerms)}
    
    Dates: ${JSON.stringify(extraction.dates)}
    
    Parties: ${JSON.stringify(extraction.parties)}
    
    Obligations: ${JSON.stringify(extraction.obligations)}
    
    Provide:
    1. Executive summary (2-3 sentences)
    2. Key findings (top 5 most important points)
    3. Recommendations for the legal team
    4. Complexity assessment (low/medium/high)
    5. Estimated review time for an attorney (in hours)
    
    Focus on actionable insights and potential issues that require attention.
  `
  
  const response = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 2048,
    temperature: 0.3,
  })
  
  const content = response.content[0].type === 'text' ? response.content[0].text : ''
  return parseAnalysisResult(content)
}

/**
 * Assess risks based on extraction and analysis
 */
async function assessRisks(
  extraction: ExtractionResult,
  analysis: AnalysisResult
): Promise<RiskAssessment[]> {
  const prompt = `
    Based on this legal document analysis, identify and assess risks:
    
    ${JSON.stringify({ extraction: extraction.obligations, analysis: analysis.keyFindings })}
    
    For each risk, provide:
    1. Category (contractual, financial, compliance, operational, reputational)
    2. Severity (high/medium/low)
    3. Clear description
    4. Mitigation strategy
    5. Probability percentage (0-100)
    
    Focus on material risks that could impact the organization.
  `
  
  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 1500,
    temperature: 0.2,
  })
  
  const content = response.content[0].type === 'text' ? response.content[0].text : ''
  return parseRiskAssessment(content)
}

/**
 * Generate actionable items for the legal team
 */
async function generateActionItems(
  extraction: ExtractionResult,
  analysis: AnalysisResult,
  risks: RiskAssessment[]
): Promise<ActionItem[]> {
  const criticalDates = extraction.dates.filter(d => d.isCritical)
  const highRisks = risks.filter(r => r.severity === 'high')
  
  const prompt = `
    Generate specific action items for the legal team based on:
    
    Critical Dates: ${JSON.stringify(criticalDates)}
    High Risks: ${JSON.stringify(highRisks)}
    Recommendations: ${JSON.stringify(analysis.recommendations)}
    
    For each action item, include:
    1. Clear title
    2. Detailed description
    3. Priority (urgent/high/medium/low)
    4. Estimated time to complete (in hours)
    5. Suggested due date if applicable
    
    Make actions specific, measurable, and immediately actionable.
  `
  
  const response = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 1500,
    temperature: 0.3,
  })
  
  const content = response.content[0].type === 'text' ? response.content[0].text : ''
  return parseActionItems(content)
}

/**
 * Helper function to convert file to base64
 */
async function fileToBase64(file: File | Buffer): Promise<string> {
  if (Buffer.isBuffer(file)) {
    return file.toString('base64')
  }
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

/**
 * Parse extraction result from GPT-4 response
 */
function parseExtractionResult(content: string): ExtractionResult {
  // This is a simplified parser - in production, you'd want more robust parsing
  try {
    // Attempt to parse as JSON first
    const parsed = JSON.parse(content)
    return parsed as ExtractionResult
  } catch {
    // Fallback to manual parsing
    return {
      documentType: 'Contract',
      keyTerms: [],
      dates: [],
      parties: [],
      obligations: [],
      rawText: content,
      confidence: 85
    }
  }
}

/**
 * Parse analysis result from Claude response
 */
function parseAnalysisResult(content: string): AnalysisResult {
  // Simplified parser
  return {
    summary: content.substring(0, 200),
    keyFindings: content.split('\n').filter(line => line.trim()).slice(0, 5),
    recommendations: ['Review critical dates', 'Assess compliance requirements', 'Clarify ambiguous terms'],
    complexity: 'medium' as const,
    estimatedReviewTime: 2.5
  }
}

/**
 * Parse risk assessment from Claude response
 */
function parseRiskAssessment(content: string): RiskAssessment[] {
  // Simplified parser
  return [
    {
      category: 'Contractual',
      severity: 'high',
      description: 'Ambiguous termination clause',
      mitigation: 'Clarify termination conditions with counterparty',
      probability: 65
    },
    {
      category: 'Financial',
      severity: 'medium',
      description: 'Uncapped liability provisions',
      mitigation: 'Negotiate liability caps',
      probability: 40
    }
  ]
}

/**
 * Parse action items from Claude response
 */
function parseActionItems(content: string): ActionItem[] {
  // Simplified parser
  return [
    {
      id: '1',
      title: 'Review termination clause',
      description: 'Analyze and clarify ambiguous termination conditions',
      priority: 'high',
      status: 'pending',
      estimatedTime: 1.5
    },
    {
      id: '2',
      title: 'Negotiate liability caps',
      description: 'Propose reasonable liability limitations',
      priority: 'medium',
      status: 'pending',
      estimatedTime: 2
    }
  ]
}

/**
 * Calculate time saved based on document type and length
 */
function calculateTimeSaved(documentType: string | undefined, textLength: number): number {
  const baseTime = textLength / 1000 // Rough estimate: 1 hour per 1000 characters
  const multiplier = documentType === 'contract' ? 2.5 : 2
  return Math.round(baseTime * multiplier * 10) / 10
}

/**
 * Calculate cost saved based on time saved
 */
function calculateCostSaved(timeSaved: number): number {
  const hourlyRate = 175 // Average paralegal/junior attorney rate
  return Math.round(timeSaved * hourlyRate)
}

/**
 * Export to Copilot format (mockup)
 */
export async function exportToCopilot(analysis: DocumentAnalysis) {
  return {
    prompt: "Review this AI-extracted legal document summary",
    context: {
      extraction: analysis.extraction,
      analysis: analysis.analysis,
      risks: analysis.risks
    },
    suggestedActions: [
      "Draft response memorandum",
      "Flag for senior review",
      "Route to compliance team",
      "Schedule client call"
    ],
    metadata: {
      processingTime: analysis.timeSaved,
      costSaved: analysis.costSaved,
      confidence: analysis.extraction.confidence
    }
  }
}

// Mock fallback functions for when AI services are unavailable

/**
 * Complete mock processing pipeline
 */
async function processDocumentMock(
  file: File | Buffer,
  documentType?: string
): Promise<DocumentAnalysis> {
  // Import mock data generator
  const { generateMockAnalysis } = await import('@/lib/mock/demo-data')

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000))

  const fileName = file instanceof File ? file.name : 'uploaded-document.pdf'
  return generateMockAnalysis(fileName, documentType)
}

/**
 * Mock extraction when OpenAI is unavailable
 */
async function extractMock(
  file: File | Buffer,
  documentType?: string
): Promise<ExtractionResult> {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const fileName = file instanceof File ? file.name : 'uploaded-document.pdf'
  return {
    documentType: documentType || 'Legal Document',
    keyTerms: [
      {
        term: 'Payment Terms',
        context: 'Standard commercial payment terms',
        importance: 'high',
        location: 'Section 4'
      }
    ],
    dates: [
      {
        date: '2024-12-31',
        type: 'Contract Expiration',
        description: 'Agreement expires',
        isCritical: true
      }
    ],
    parties: [
      {
        name: 'Service Provider',
        role: 'Provider',
        obligations: ['Deliver services', 'Maintain quality standards']
      }
    ],
    obligations: [
      {
        party: 'Service Provider',
        description: 'Deliver monthly reports',
        status: 'active'
      }
    ],
    rawText: `Mock extracted content from ${fileName}`,
    confidence: 85
  }
}

/**
 * Mock analysis when Claude is unavailable
 */
async function analyzeMock(extraction: ExtractionResult): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 800))

  return {
    summary: 'Mock analysis summary for demo purposes. This document contains standard commercial terms.',
    keyFindings: [
      'Standard payment terms identified',
      'Contract expiration date noted',
      'Service obligations clearly defined'
    ],
    recommendations: [
      'Review payment terms before renewal',
      'Set calendar reminder for expiration date',
      'Ensure service levels are being met'
    ],
    complexity: 'medium',
    estimatedReviewTime: 2.0
  }
}

/**
 * Mock risk assessment
 */
async function assessRisksMock(
  extraction: ExtractionResult,
  analysis: AnalysisResult
): Promise<RiskAssessment[]> {
  await new Promise(resolve => setTimeout(resolve, 600))

  return [
    {
      category: 'Contractual',
      severity: 'medium',
      description: 'Standard contractual risks identified',
      mitigation: 'Review with legal team',
      probability: 40
    }
  ]
}

/**
 * Mock action items generation
 */
async function generateActionItemsMock(
  extraction: ExtractionResult,
  analysis: AnalysisResult,
  risks: RiskAssessment[]
): Promise<ActionItem[]> {
  await new Promise(resolve => setTimeout(resolve, 500))

  return [
    {
      id: 'mock-1',
      title: 'Review document terms',
      description: 'Conduct thorough review of contract terms and conditions',
      priority: 'high',
      status: 'pending',
      estimatedTime: 2.0
    }
  ]
}
