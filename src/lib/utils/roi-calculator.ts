/**
 * ROI Calculator for HB Legal Intelligence Platform
 * Calculates time and cost savings from AI document processing
 */

export interface ROIMetrics {
  timeSaved: number
  costSaved: number
  efficiency: number
  accuracyImprovement: number
  riskReduction: number
}

export interface ProcessingStats {
  documentType: string
  pageCount?: number
  wordCount?: number
  complexity: 'low' | 'medium' | 'high'
  processingTimeAI: number
  traditionalTime: number
}

/**
 * Calculate ROI metrics based on document processing
 */
export function calculateROI(stats: ProcessingStats): ROIMetrics {
  const { documentType, complexity, processingTimeAI, traditionalTime } = stats

  // Base hourly rates (in USD)
  const PARALEGAL_RATE = 85
  const JUNIOR_ATTORNEY_RATE = 175
  const SENIOR_ATTORNEY_RATE = 350

  // Time savings calculation
  const timeSaved = Math.max(0, traditionalTime - processingTimeAI)

  // Cost savings based on who would typically handle this document
  const hourlyRate = getHourlyRate(documentType, complexity)
  const costSaved = timeSaved * hourlyRate

  // Efficiency improvement percentage
  const efficiency = traditionalTime > 0
    ? Math.round(((timeSaved) / traditionalTime) * 100)
    : 0

  // Accuracy improvement (estimated based on AI consistency vs human error rates)
  const accuracyImprovement = getAccuracyImprovement(documentType, complexity)

  // Risk reduction (estimated based on thoroughness and consistency)
  const riskReduction = getRiskReduction(documentType, complexity)

  return {
    timeSaved: Math.round(timeSaved * 100) / 100,
    costSaved: Math.round(costSaved),
    efficiency,
    accuracyImprovement,
    riskReduction
  }
}

/**
 * Estimate traditional processing time based on document characteristics
 */
export function estimateTraditionalTime(
  documentType: string,
  pageCount: number = 10,
  wordCount: number = 2500,
  complexity: 'low' | 'medium' | 'high' = 'medium'
): number {
  // Base time estimates (in hours) for initial review
  const baseTimeByType: Record<string, number> = {
    'Contract': 3.0,
    'Lease Agreement': 2.5,
    'Non-Disclosure Agreement': 1.5,
    'Employment Agreement': 2.8,
    'Terms of Service': 2.0,
    'Privacy Policy': 1.8,
    'Partnership Agreement': 4.0,
    'Merger Agreement': 8.0,
    'Securities Document': 6.0,
    'Compliance Document': 3.5,
    'Litigation Document': 4.5,
    'Patent Application': 5.0,
    'Trademark Document': 2.5,
    'Real Estate Document': 3.0,
    'Insurance Policy': 2.8,
    'default': 3.0
  }

  let baseTime = baseTimeByType[documentType] || baseTimeByType['default']

  // Adjust for page count (more pages = more time)
  const pageMultiplier = Math.min(2.0, 1 + (pageCount - 10) * 0.05)
  baseTime *= pageMultiplier

  // Adjust for word count
  const wordMultiplier = Math.min(2.5, 1 + (wordCount - 2500) * 0.0001)
  baseTime *= wordMultiplier

  // Adjust for complexity
  const complexityMultipliers = {
    'low': 0.7,
    'medium': 1.0,
    'high': 1.8
  }
  baseTime *= complexityMultipliers[complexity]

  return Math.round(baseTime * 10) / 10
}

/**
 * Get appropriate hourly rate based on document type and complexity
 */
function getHourlyRate(documentType: string, complexity: 'low' | 'medium' | 'high'): number {
  const PARALEGAL_RATE = 85
  const JUNIOR_ATTORNEY_RATE = 175
  const SENIOR_ATTORNEY_RATE = 350

  // High complexity or critical documents require senior attorney
  const seniorAttorneyTypes = [
    'Merger Agreement',
    'Securities Document',
    'Partnership Agreement',
    'Patent Application'
  ]

  if (seniorAttorneyTypes.includes(documentType) || complexity === 'high') {
    return SENIOR_ATTORNEY_RATE
  }

  // Medium complexity typically handled by junior attorney
  if (complexity === 'medium') {
    return JUNIOR_ATTORNEY_RATE
  }

  // Low complexity can be handled by paralegal
  return PARALEGAL_RATE
}

/**
 * Estimate accuracy improvement from AI processing
 */
function getAccuracyImprovement(documentType: string, complexity: 'low' | 'medium' | 'high'): number {
  // AI is particularly good at consistent extraction and identification
  // Human error rates vary but AI provides more consistent results

  const baseImprovements = {
    'low': 15,      // 15% improvement for simple documents
    'medium': 25,   // 25% improvement for moderate complexity
    'high': 35      // 35% improvement for complex documents (humans make more errors)
  }

  // Some document types benefit more from AI consistency
  const typeMultipliers: Record<string, number> = {
    'Contract': 1.2,
    'Lease Agreement': 1.1,
    'Securities Document': 1.4,
    'Compliance Document': 1.3,
    'default': 1.0
  }

  const multiplier = typeMultipliers[documentType] || typeMultipliers['default']
  return Math.round(baseImprovements[complexity] * multiplier)
}

/**
 * Estimate risk reduction from AI processing
 */
function getRiskReduction(documentType: string, complexity: 'low' | 'medium' | 'high'): number {
  // AI reduces risk through:
  // 1. Consistent identification of critical terms
  // 2. Systematic risk assessment
  // 3. No fatigue-related oversights
  // 4. Comprehensive analysis

  const baseRiskReduction = {
    'low': 20,      // 20% risk reduction
    'medium': 30,   // 30% risk reduction
    'high': 45      // 45% risk reduction
  }

  // High-stakes documents benefit more from systematic AI analysis
  const highRiskTypes = [
    'Merger Agreement',
    'Securities Document',
    'Partnership Agreement',
    'Employment Agreement',
    'Contract'
  ]

  const multiplier = highRiskTypes.includes(documentType) ? 1.2 : 1.0
  return Math.round(baseRiskReduction[complexity] * multiplier)
}

/**
 * Calculate monthly/yearly ROI projections
 */
export function calculateProjectedROI(
  documentsPerMonth: number,
  averageTimeSaved: number,
  averageCostSaved: number
): {
  monthly: { timeSaved: number; costSaved: number }
  yearly: { timeSaved: number; costSaved: number }
} {
  const monthly = {
    timeSaved: Math.round(documentsPerMonth * averageTimeSaved * 10) / 10,
    costSaved: Math.round(documentsPerMonth * averageCostSaved)
  }

  const yearly = {
    timeSaved: Math.round(monthly.timeSaved * 12 * 10) / 10,
    costSaved: Math.round(monthly.costSaved * 12)
  }

  return { monthly, yearly }
}

/**
 * Format time in a human-readable way
 */
export function formatTime(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`
  }

  if (hours === 1) {
    return '1 hour'
  }

  if (hours < 8) {
    return `${Math.round(hours * 10) / 10} hours`
  }

  const days = Math.floor(hours / 8)
  const remainingHours = Math.round((hours % 8) * 10) / 10

  if (remainingHours === 0) {
    return `${days} day${days > 1 ? 's' : ''}`
  }

  return `${days} day${days > 1 ? 's' : ''}, ${remainingHours} hour${remainingHours > 1 ? 's' : ''}`
}

/**
 * Format currency in USD
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Calculate total firm savings for dashboard
 */
export function calculateFirmSavings(
  totalDocuments: number,
  averageTimeSaved: number,
  averageCostSaved: number
): {
  totalTimeSaved: number
  totalCostSaved: number
  equivalentAttorneyDays: number
  potentialBillableHours: number
} {
  const totalTimeSaved = totalDocuments * averageTimeSaved
  const totalCostSaved = totalDocuments * averageCostSaved

  // Assuming 8-hour work days
  const equivalentAttorneyDays = Math.round(totalTimeSaved / 8)

  // Potential billable hours that could be allocated to higher-value work
  const potentialBillableHours = Math.round(totalTimeSaved * 0.8) // 80% of saved time could be billable

  return {
    totalTimeSaved: Math.round(totalTimeSaved * 10) / 10,
    totalCostSaved: Math.round(totalCostSaved),
    equivalentAttorneyDays,
    potentialBillableHours
  }
}