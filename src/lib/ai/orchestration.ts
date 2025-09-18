// Demo mode - No AI clients needed
// import OpenAI from 'openai'
// import Anthropic from '@anthropic-ai/sdk'

// Initialize AI clients (disabled for demo)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// })

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY!,
// })

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
 * Always uses demo mode for reliable deployment
 */
export async function processDocument(
  file: File | Buffer,
  documentType?: string
): Promise<DocumentAnalysis> {
  const startTime = Date.now()

  try {
    // Always use demo mode for now
    console.log('🎭 Using demo mode for reliable deployment...')
    return await processDocumentMock(file, documentType)
  } catch (error) {
    console.error('Error in document processing:', error)
    // Fallback to mock data on any error
    console.log('🎭 Falling back to mock processing...')
    return await processDocumentMock(file, documentType)
  }
}

/**
 * Extract information using GPT-4 Vision (DISABLED FOR DEMO)
 */
async function extractWithVision(
  file: File | Buffer,
  documentType?: string
): Promise<ExtractionResult> {
  // Demo mode - return mock data instead of calling OpenAI
  console.log('🎭 GPT-4 Vision extraction disabled for demo mode')
  return await extractMock(file, documentType)
}

/**
 * Analyze extracted content using Claude (DISABLED FOR DEMO)
 */
async function analyzeWithClaude(
  extraction: ExtractionResult
): Promise<AnalysisResult> {
  // Demo mode - return mock data instead of calling Claude
  console.log('🎭 Claude analysis disabled for demo mode')
  return await analyzeMock(extraction)
}

/**
 * Assess risks based on extraction and analysis (DISABLED FOR DEMO)
 */
async function assessRisks(
  extraction: ExtractionResult,
  analysis: AnalysisResult
): Promise<RiskAssessment[]> {
  // Demo mode - return mock data instead of calling Claude
  console.log('🎭 Risk assessment disabled for demo mode')
  return await assessRisksMock(extraction, analysis)
}

/**
 * Generate actionable items for the legal team (DISABLED FOR DEMO)
 */
async function generateActionItems(
  extraction: ExtractionResult,
  analysis: AnalysisResult,
  risks: RiskAssessment[]
): Promise<ActionItem[]> {
  // Demo mode - return mock data instead of calling Claude
  console.log('🎭 Action item generation disabled for demo mode')
  return await generateActionItemsMock(extraction, analysis, risks)
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
