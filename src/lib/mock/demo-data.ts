import type {
  DocumentAnalysis,
  ExtractionResult,
  AnalysisResult,
  RiskAssessment,
  ActionItem
} from '@/lib/ai/orchestration'

/**
 * Mock document processing result for demo purposes
 */
export function generateMockAnalysis(fileName: string, documentType?: string): DocumentAnalysis {
  const baseType = documentType || detectDocumentType(fileName)

  return {
    extraction: generateMockExtraction(baseType, fileName),
    analysis: generateMockAnalysisResult(baseType),
    risks: generateMockRisks(baseType),
    actionItems: generateMockActionItems(baseType),
    timeSaved: calculateMockTimeSaved(baseType),
    costSaved: calculateMockCostSaved(baseType)
  }
}

function detectDocumentType(fileName: string): string {
  const name = fileName.toLowerCase()
  if (name.includes('contract') || name.includes('agreement')) return 'Contract'
  if (name.includes('lease')) return 'Lease Agreement'
  if (name.includes('nda') || name.includes('confidential')) return 'Non-Disclosure Agreement'
  if (name.includes('employment')) return 'Employment Agreement'
  if (name.includes('terms')) return 'Terms of Service'
  return 'Legal Document'
}

function generateMockExtraction(documentType: string, fileName: string): ExtractionResult {
  const mockExtractions: Record<string, Partial<ExtractionResult>> = {
    'Contract': {
      documentType: 'Service Agreement',
      keyTerms: [
        {
          term: 'Payment Terms',
          context: 'Net 30 payment terms with 2% early payment discount',
          importance: 'high',
          location: 'Section 4.1'
        },
        {
          term: 'Termination Clause',
          context: '30-day written notice required for termination',
          importance: 'high',
          location: 'Section 8.2'
        },
        {
          term: 'Liability Cap',
          context: 'Liability limited to contract value',
          importance: 'medium',
          location: 'Section 12.1'
        }
      ],
      dates: [
        {
          date: '2024-12-31',
          type: 'Contract Expiration',
          description: 'Initial term expires',
          isCritical: true
        },
        {
          date: '2024-10-15',
          type: 'Review Date',
          description: 'Quarterly performance review',
          isCritical: false
        }
      ],
      parties: [
        {
          name: 'HB Legal Intelligence Platform',
          role: 'Service Provider',
          obligations: ['Provide AI document processing', 'Maintain 99.9% uptime', 'Ensure data security']
        },
        {
          name: 'Client Corporation',
          role: 'Client',
          obligations: ['Make timely payments', 'Provide necessary access', 'Comply with usage terms']
        }
      ],
      obligations: [
        {
          party: 'HB Legal Intelligence Platform',
          description: 'Deliver monthly processing reports',
          deadline: 'First business day of each month',
          status: 'active'
        },
        {
          party: 'Client Corporation',
          description: 'Pay invoices within 30 days',
          deadline: '30 days from invoice date',
          status: 'active'
        }
      ]
    },
    'Lease Agreement': {
      documentType: 'Commercial Lease',
      keyTerms: [
        {
          term: 'Rent Amount',
          context: '$8,500/month plus utilities',
          importance: 'high',
          location: 'Section 3'
        },
        {
          term: 'Security Deposit',
          context: 'First and last month rent as deposit',
          importance: 'high',
          location: 'Section 4'
        }
      ],
      dates: [
        {
          date: '2025-01-01',
          type: 'Lease Start',
          description: 'Lease commencement date',
          isCritical: true
        },
        {
          date: '2026-12-31',
          type: 'Lease End',
          description: 'Initial lease term expires',
          isCritical: true
        }
      ],
      parties: [
        {
          name: 'Property Management LLC',
          role: 'Landlord',
          obligations: ['Maintain property', 'Provide utilities access', 'Handle repairs']
        }
      ]
    }
  }

  const base = mockExtractions[documentType] || mockExtractions['Contract']

  return {
    documentType: base.documentType || documentType,
    keyTerms: base.keyTerms || [],
    dates: base.dates || [],
    parties: base.parties || [],
    obligations: base.obligations || [],
    rawText: `Mock extracted content from ${fileName}. This would contain the full document text in a real implementation.`,
    confidence: 92
  }
}

function generateMockAnalysisResult(documentType: string): AnalysisResult {
  const mockAnalyses: Record<string, AnalysisResult> = {
    'Contract': {
      summary: 'Standard service agreement with typical commercial terms. Contains standard liability limitations and termination provisions with moderate complexity.',
      keyFindings: [
        'Payment terms favor the client with extended 30-day payment period',
        'Termination clause allows either party to exit with 30-day notice',
        'Liability is appropriately capped at contract value',
        'Performance metrics are clearly defined and measurable',
        'Intellectual property rights are properly assigned'
      ],
      recommendations: [
        'Consider negotiating shorter payment terms (Net 15)',
        'Add automatic renewal clause to reduce administrative overhead',
        'Include force majeure provisions for pandemic-related disruptions',
        'Clarify data handling and privacy compliance requirements'
      ],
      complexity: 'medium',
      estimatedReviewTime: 2.5
    },
    'Lease Agreement': {
      summary: 'Commercial lease with standard terms and competitive rental rate. Property maintenance responsibilities are clearly defined.',
      keyFindings: [
        'Rent escalation clause tied to CPI increases',
        'Tenant responsible for utilities and maintenance',
        'Option to renew for additional 2-year term',
        'Security deposit equals first and last month rent'
      ],
      recommendations: [
        'Review local market rates before renewal',
        'Negotiate cap on annual rent increases',
        'Clarify responsibility for major repairs'
      ],
      complexity: 'low',
      estimatedReviewTime: 1.5
    }
  }

  return mockAnalyses[documentType] || mockAnalyses['Contract']
}

function generateMockRisks(documentType: string): RiskAssessment[] {
  const mockRisks: Record<string, RiskAssessment[]> = {
    'Contract': [
      {
        category: 'Financial',
        severity: 'medium',
        description: 'Extended payment terms may impact cash flow',
        mitigation: 'Implement payment terms monitoring and early payment incentives',
        probability: 35
      },
      {
        category: 'Operational',
        severity: 'low',
        description: 'Termination clause allows easy exit by either party',
        mitigation: 'Build strong client relationships and demonstrate ongoing value',
        probability: 20
      },
      {
        category: 'Compliance',
        severity: 'medium',
        description: 'Data privacy requirements not explicitly detailed',
        mitigation: 'Add comprehensive data handling addendum',
        probability: 45
      }
    ],
    'Lease Agreement': [
      {
        category: 'Financial',
        severity: 'high',
        description: 'Uncapped rent escalation could significantly increase costs',
        mitigation: 'Negotiate annual increase cap at 3-5%',
        probability: 70
      },
      {
        category: 'Operational',
        severity: 'medium',
        description: 'Tenant responsible for all maintenance costs',
        mitigation: 'Budget 2-3% of rent annually for maintenance',
        probability: 80
      }
    ]
  }

  return mockRisks[documentType] || mockRisks['Contract']
}

function generateMockActionItems(documentType: string): ActionItem[] {
  return [
    {
      id: 'ai-1',
      title: 'Review payment terms',
      description: 'Analyze the 30-day payment terms and assess impact on cash flow. Consider negotiating shorter terms.',
      priority: 'high',
      status: 'pending',
      estimatedTime: 1,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: 'ai-2',
      title: 'Clarify termination procedures',
      description: 'Document the specific steps required for contract termination to ensure compliance.',
      priority: 'medium',
      status: 'pending',
      estimatedTime: 0.5,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: 'ai-3',
      title: 'Schedule client review meeting',
      description: 'Arrange meeting with client to discuss contract terms and address any concerns.',
      priority: 'high',
      status: 'pending',
      estimatedTime: 2,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: 'ai-4',
      title: 'Update compliance documentation',
      description: 'Ensure all data privacy and security requirements are properly documented.',
      priority: 'medium',
      status: 'pending',
      estimatedTime: 1.5
    }
  ]
}

function calculateMockTimeSaved(documentType: string): number {
  const timeMap: Record<string, number> = {
    'Contract': 4.5,
    'Lease Agreement': 3.0,
    'Non-Disclosure Agreement': 2.0,
    'Employment Agreement': 3.5,
    'Terms of Service': 2.5
  }

  return timeMap[documentType] || 3.0
}

function calculateMockCostSaved(documentType: string): number {
  const timeSaved = calculateMockTimeSaved(documentType)
  const hourlyRate = 175 // Average paralegal/junior attorney rate
  return Math.round(timeSaved * hourlyRate)
}

/**
 * Mock dashboard metrics for demo - Enhanced with HB-specific data
 */
export function generateMockDashboardMetrics() {
  return {
    totalDocuments: 2847,
    documentsThisMonth: 187,
    totalTimeSaved: 8800, // Matching copilot integration hours saved
    totalCostSaved: 1540000, // $1.54M matching cost avoidance
    avgProcessingTime: 3.2, // seconds per page
    accuracy: 94.7,

    // HB-specific achievements
    hbAchievements: {
      kiraReplacement: {
        contractsProcessed: 937,
        timeFrame: "4 hours",
        costSavings: 47500,
        efficiencyGain: "12x faster"
      },
      conflictChecks: {
        annualHoursSaved: 800,
        errorReduction: 73,
        processSpeedup: "15x faster",
        costSavings: 120000
      }
    },

    topDocumentTypes: [
      { type: 'Contracts', count: 1023, percentage: 36 },
      { type: 'M&A Agreements', count: 456, percentage: 16 },
      { type: 'Depositions', count: 398, percentage: 14 },
      { type: 'Compliance Documents', count: 341, percentage: 12 },
      { type: 'Litigation Files', count: 285, percentage: 10 },
      { type: 'Other', count: 344, percentage: 12 }
    ],

    recentProcessing: [
      {
        id: '1',
        fileName: 'TechCorp_Merger_Agreement_2024.pdf',
        documentType: 'M&A Agreement',
        processedAt: new Date().toISOString(),
        timeSaved: 6.5,
        costSaved: 1137,
        status: 'completed'
      },
      {
        id: '2',
        fileName: 'Construction_Deposition_Martinez.pdf',
        documentType: 'Deposition',
        processedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        timeSaved: 4.2,
        costSaved: 735,
        status: 'completed'
      },
      {
        id: '3',
        fileName: 'Professional_Services_Agreement.pdf',
        documentType: 'Contract',
        processedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        timeSaved: 2.8,
        costSaved: 490,
        status: 'completed'
      },
      {
        id: '4',
        fileName: 'IP_License_Agreement_Q3.pdf',
        documentType: 'Contract',
        processedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        timeSaved: 3.5,
        costSaved: 612,
        status: 'completed'
      }
    ],

    weeklyStats: [
      { week: 'Week 1', documents: 42, timeSaved: 156.8 },
      { week: 'Week 2', documents: 51, timeSaved: 189.3 },
      { week: 'Week 3', documents: 48, timeSaved: 178.2 },
      { week: 'Week 4', documents: 46, timeSaved: 171.5 }
    ],

    // Performance metrics
    performanceMetrics: {
      averageAccuracy: 94.7,
      peakThroughput: 847, // pages per hour
      userSatisfaction: 4.6,
      userAdoption: 89,
      uptime: 99.97
    }
  }
}

/**
 * Mock processing steps for visualization
 */
export function generateMockProcessSteps() {
  return [
    {
      id: 'upload',
      name: 'Document Upload',
      description: 'Securely receiving and validating document',
      status: 'completed' as const,
      duration: 0.8,
      icon: '📄'
    },
    {
      id: 'extraction',
      name: 'AI Extraction',
      description: 'GPT-4 Vision analyzing document content',
      status: 'completed' as const,
      duration: 8.2,
      icon: '🔍'
    },
    {
      id: 'analysis',
      name: 'Legal Analysis',
      description: 'Claude analyzing extracted information',
      status: 'in-progress' as const,
      duration: 5.1,
      icon: '🧠'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment',
      description: 'Identifying potential legal risks',
      status: 'pending' as const,
      duration: 0,
      icon: '⚠️'
    },
    {
      id: 'action-items',
      name: 'Action Items',
      description: 'Generating actionable recommendations',
      status: 'pending' as const,
      duration: 0,
      icon: '📋'
    },
    {
      id: 'complete',
      name: 'Complete',
      description: 'Analysis ready for review',
      status: 'pending' as const,
      duration: 0,
      icon: '✅'
    }
  ]
}