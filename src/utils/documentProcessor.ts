import { sampleDocuments, SampleDocument } from '@/data/sampleDocuments'

export interface ProcessingStep {
  step: string
  ai: 'system' | 'gpt4-vision' | 'claude-sonnet' | 'both'
  message: string
  duration: number
  results?: any
}

export interface AIAnalysisResult {
  gpt4Vision: {
    extractedElements: string[]
    documentStructure: any
    visualFindings: string[]
    confidence: number
    processingTime: number
  }
  claudeSonnet: {
    legalAnalysis: string[]
    risks: RiskItem[]
    keyTerms: string[]
    recommendations: string[]
    compliance: ComplianceItem[]
    processingTime: number
  }
  combined: {
    summary: string
    criticalFindings: string[]
    actionItems: string[]
    estimatedSavings: {
      time: string
      cost: number
    }
  }
}

export interface RiskItem {
  type: string
  level: 'High' | 'Medium' | 'Low'
  description: string
  section?: string
  mitigation?: string
}

export interface ComplianceItem {
  regulation: string
  status: 'Compliant' | 'Non-compliant' | 'Needs Review'
  details: string
}

// Document-specific processing configurations
const documentProcessingConfigs = {
  'nda-techco': {
    documentType: 'Non-Disclosure Agreement',
    expectedDuration: 12000,
    complexity: 'Medium',
    steps: [
      {
        step: 'document-intake',
        ai: 'system' as const,
        message: 'Received 8-page Mutual Non-Disclosure Agreement',
        duration: 500,
        results: {
          format: 'PDF',
          pages: 8,
          fileSize: '245 KB',
          language: 'English'
        }
      },
      {
        step: 'gpt-vision-scan',
        ai: 'gpt4-vision' as const,
        message: 'Scanning document structure and identifying key sections...',
        duration: 2000,
        results: {
          extracted: [
            'Party identification blocks',
            'Recitals section',
            'Numbered paragraphs (1-12)',
            'Signature blocks on page 8',
            'Exhibit A reference'
          ],
          documentStructure: {
            sections: 12,
            subsections: 28,
            definitions: 15,
            crossReferences: 7
          },
          confidence: 0.98
        }
      },
      {
        step: 'text-extraction',
        ai: 'gpt4-vision' as const,
        message: 'Extracting legal text and identifying defined terms...',
        duration: 1500,
        results: {
          words: 3247,
          sentences: 142,
          definedTerms: [
            'Confidential Information',
            'Purpose',
            'Disclosing Party',
            'Receiving Party',
            'Representatives'
          ],
          dates: ['January 15, 2025', 'January 15, 2028'],
          parties: ['TechCo Inc.', 'DataFlow Systems LLC']
        }
      },
      {
        step: 'claude-legal-analysis',
        ai: 'claude-sonnet' as const,
        message: 'Analyzing legal implications and identifying risks...',
        duration: 3000,
        results: {
          risks: [
            {
              type: 'Confidentiality Scope',
              level: 'Medium' as const,
              description: 'Definition of Confidential Information is extremely broad',
              section: 'Section 1.1',
              mitigation: 'Add specific exclusions for publicly available information'
            },
            {
              type: 'Term Duration',
              level: 'Low' as const,
              description: 'Three-year confidentiality period is standard',
              section: 'Section 3.4'
            },
            {
              type: 'Dispute Resolution',
              level: 'High' as const,
              description: 'No arbitration or mediation clause present',
              mitigation: 'Add mandatory arbitration provision to avoid litigation'
            }
          ],
          keyTerms: [
            'Mutual obligations',
            '3-year term',
            'Delaware governing law',
            'Strict confidence standard',
            '30-day termination notice'
          ],
          compliance: [
            {
              regulation: 'UTSA (Uniform Trade Secrets Act)',
              status: 'Compliant' as const,
              details: 'Trade secret definition aligns with UTSA standards'
            },
            {
              regulation: 'GDPR',
              status: 'Needs Review' as const,
              details: 'Missing data protection provisions for EU data'
            }
          ]
        }
      },
      {
        step: 'cross-validation',
        ai: 'both' as const,
        message: 'Cross-validating findings between GPT-4 and Claude...',
        duration: 1500,
        results: {
          agreement: 0.92,
          discrepancies: [
            'GPT-4 identified potential formatting issue in Section 5',
            'Claude flagged additional compliance concern with CCPA'
          ],
          combinedFindings: 18
        }
      },
      {
        step: 'report-generation',
        ai: 'both' as const,
        message: 'Generating comprehensive analysis report...',
        duration: 1000,
        results: {
          reportSections: [
            'Executive Summary',
            'Party Analysis',
            'Key Terms & Obligations',
            'Risk Assessment',
            'Compliance Review',
            'Recommendations'
          ],
          totalFindings: 24,
          criticalIssues: 3,
          estimatedReviewTime: '10 minutes',
          manualReviewTime: '2-3 hours'
        }
      }
    ]
  },

  'deposition-williams': {
    documentType: 'Deposition Transcript',
    expectedDuration: 15000,
    complexity: 'High',
    steps: [
      {
        step: 'document-intake',
        ai: 'system' as const,
        message: 'Received 45-page Deposition Transcript',
        duration: 700,
        results: {
          format: 'PDF',
          pages: 45,
          fileSize: '1.2 MB',
          caseInfo: 'Williams v. Acme Corporation, Case No. 2024-CV-1847'
        }
      },
      {
        step: 'gpt-vision-scan',
        ai: 'gpt4-vision' as const,
        message: 'Identifying Q&A format and speaker transitions...',
        duration: 2500,
        results: {
          extracted: [
            'Court reporter certification',
            'Appearances section',
            'Question/Answer format detected',
            'Exhibit references (Exhibits 1-12)',
            'Objections and colloquy'
          ],
          speakerAnalysis: {
            attorneys: ['Ms. Martinez', 'Mr. Chen'],
            witness: 'Dr. Sarah Williams',
            questions: 342,
            objections: 28,
            exhibits: 12
          },
          confidence: 0.96
        }
      },
      {
        step: 'testimony-extraction',
        ai: 'gpt4-vision' as const,
        message: 'Extracting testimony and identifying key admissions...',
        duration: 2000,
        results: {
          words: 18453,
          pages: 45,
          keyTestimony: [
            'Expert qualifications (22 years experience)',
            'Three critical design flaws identified',
            'Tensile strength insufficient (48,000 PSI vs 65,000 required)',
            'Safety mechanism failure admission'
          ],
          exhibits: ['Exhibit 12 - Metallographic cross-sections']
        }
      },
      {
        step: 'claude-testimony-analysis',
        ai: 'claude-sonnet' as const,
        message: 'Analyzing testimony for admissions and inconsistencies...',
        duration: 4000,
        results: {
          risks: [
            {
              type: 'Expert Credibility',
              level: 'Low' as const,
              description: 'Strong credentials and experience established',
              section: 'Pages 3-5'
            },
            {
              type: 'Technical Evidence',
              level: 'High' as const,
              description: 'Specific quantitative defects admitted',
              section: 'Page 23',
              mitigation: 'Challenge testing methodology on cross'
            },
            {
              type: 'Causation',
              level: 'High' as const,
              description: 'Direct causation opinion given',
              section: 'Pages 23-24',
              mitigation: 'Prepare Daubert motion on methodology'
            }
          ],
          keyAdmissions: [
            'Product failed at 48,000 PSI (below spec)',
            'Welding showed 40% incomplete fusion',
            'Safety mechanism trigger set incorrectly',
            'Defects were "substantial contributing factors"'
          ],
          inconsistencies: [
            'Page 12 vs Page 34 on testing timeline',
            'Uncertainty about batch testing procedures'
          ],
          recommendations: [
            'File Daubert motion challenging methodology',
            'Depose fact witnesses on testing procedures',
            'Obtain original testing data',
            'Research expert\'s prior testimony for inconsistencies'
          ]
        }
      },
      {
        step: 'credibility-assessment',
        ai: 'claude-sonnet' as const,
        message: 'Assessing witness credibility and testimony strength...',
        duration: 2000,
        results: {
          credibilityScore: 0.78,
          strengths: [
            'Strong educational background',
            'Consistent technical explanations',
            'Specific quantitative data provided'
          ],
          weaknesses: [
            'Did not test actual incident product',
            'Relied on exemplar testing',
            'Some hesitation on cross-examination'
          ]
        }
      },
      {
        step: 'synthesis',
        ai: 'both' as const,
        message: 'Creating deposition summary and strategy recommendations...',
        duration: 1500,
        results: {
          summary: 'Expert provided strong technical testimony with specific defects identified',
          criticalPoints: 5,
          followUpNeeded: 8,
          estimatedImpact: 'High - supports plaintiff\'s case',
          timeToReview: '15 minutes',
          manualReviewTime: '4-5 hours'
        }
      }
    ]
  },

  'contract-services': {
    documentType: 'Master Services Agreement',
    expectedDuration: 14000,
    complexity: 'High',
    steps: [
      {
        step: 'document-intake',
        ai: 'system' as const,
        message: 'Received 24-page Master Services Agreement',
        duration: 600,
        results: {
          format: 'PDF',
          pages: 24,
          fileSize: '512 KB',
          contractValue: '$2,400,000',
          term: '3 years'
        }
      },
      {
        step: 'gpt-vision-scan',
        ai: 'gpt4-vision' as const,
        message: 'Mapping contract structure and identifying schedules...',
        duration: 2200,
        results: {
          extracted: [
            'Main agreement body',
            'Schedule A - Service Description',
            'Schedule B - Pricing',
            'Schedule C - SLAs',
            'Signature pages'
          ],
          contractStructure: {
            articles: 15,
            schedules: 3,
            definedTerms: 42,
            crossReferences: 31
          },
          confidence: 0.97
        }
      },
      {
        step: 'commercial-extraction',
        ai: 'gpt4-vision' as const,
        message: 'Extracting commercial terms and payment obligations...',
        duration: 1800,
        results: {
          commercialTerms: {
            totalValue: '$2,400,000',
            monthlyFee: '$200,000',
            paymentTerms: 'Net 30',
            lateFee: '1.5% per month',
            escalation: '3% or CPI annually'
          },
          slaMetrics: {
            availability: '99.9%',
            criticalResponse: '15 minutes',
            credits: 'Up to 50% monthly fee'
          },
          hourlyRates: {
            seniorArchitect: '$350/hour',
            projectManager: '$250/hour',
            developer: '$175/hour'
          }
        }
      },
      {
        step: 'claude-contract-analysis',
        ai: 'claude-sonnet' as const,
        message: 'Analyzing contract terms and identifying risks...',
        duration: 3500,
        results: {
          risks: [
            {
              type: 'SLA Commitment',
              level: 'High' as const,
              description: '99.9% availability is aggressive for complex systems',
              section: 'Section 5.1',
              mitigation: 'Negotiate to 99.5% or add force majeure exceptions'
            },
            {
              type: 'Liability',
              level: 'Medium' as const,
              description: 'Liability cap at annual fees may be insufficient',
              section: 'Section 10.2',
              mitigation: 'Seek higher cap for data breaches'
            },
            {
              type: 'Termination',
              level: 'Low' as const,
              description: 'Standard termination for convenience clause',
              section: 'Section 13'
            },
            {
              type: 'IP Ownership',
              level: 'Medium' as const,
              description: 'Work product ownership needs clarification',
              section: 'Section 8',
              mitigation: 'Specify ownership of custom developments'
            }
          ],
          favorableTerms: [
            'Service credit structure is reasonable',
            'Dispute escalation process well-defined',
            'Clear acceptance criteria for deliverables',
            'Annual price increase capped'
          ],
          recommendations: [
            'Negotiate SLA targets based on historical performance',
            'Add specific data security and privacy provisions',
            'Clarify IP ownership for custom developments',
            'Include right to audit service levels',
            'Add benchmarking provisions for rates'
          ]
        }
      },
      {
        step: 'compliance-check',
        ai: 'claude-sonnet' as const,
        message: 'Checking regulatory compliance and industry standards...',
        duration: 2000,
        results: {
          compliance: [
            {
              regulation: 'SOC 2 Type II',
              status: 'Compliant' as const,
              details: 'Required certifications addressed'
            },
            {
              regulation: 'GDPR',
              status: 'Needs Review' as const,
              details: 'Data processing agreement should be added'
            },
            {
              regulation: 'CCPA',
              status: 'Non-compliant' as const,
              details: 'Missing California privacy provisions'
            }
          ]
        }
      },
      {
        step: 'final-assessment',
        ai: 'both' as const,
        message: 'Generating risk-weighted recommendations...',
        duration: 1200,
        results: {
          overallRisk: 'Medium',
          dealValue: '$2.4M over 3 years',
          keyIssues: 6,
          negotiationPriorities: [
            'SLA targets adjustment',
            'Liability cap increase',
            'IP ownership clarification'
          ],
          estimatedNegotiation: '2-3 rounds',
          timeToReview: '12 minutes',
          manualReviewTime: '3-4 hours'
        }
      }
    ]
  },

  'discovery-merger': {
    documentType: 'Discovery Request',
    expectedDuration: 18000,
    complexity: 'Very High',
    steps: [
      {
        step: 'document-intake',
        ai: 'system' as const,
        message: 'Received 156-page First Request for Production of Documents',
        duration: 800,
        results: {
          format: 'PDF',
          pages: 156,
          fileSize: '3.4 MB',
          requests: 47,
          case: 'MegaCorp Inc. v. Global Dynamics LLC'
        }
      },
      {
        step: 'gpt-vision-scan',
        ai: 'gpt4-vision' as const,
        message: 'Cataloging document requests and identifying categories...',
        duration: 3000,
        results: {
          extracted: [
            '47 numbered document requests',
            '12 interrogatories',
            'Definitions section (pages 1-8)',
            'Instructions (pages 9-12)',
            'Requests (pages 13-156)'
          ],
          requestCategories: {
            financial: 15,
            communications: 12,
            contracts: 8,
            regulatory: 7,
            general: 5
          },
          timeFrames: [
            'January 1, 2019 to present',
            'January 1, 2020 to present',
            'All documents (no time limit)'
          ],
          confidence: 0.95
        }
      },
      {
        step: 'request-analysis',
        ai: 'gpt4-vision' as const,
        message: 'Analyzing scope and burden of each request...',
        duration: 2500,
        results: {
          totalRequests: 47,
          categorizedRequests: {
            'Overly Broad': 18,
            'Reasonable': 15,
            'Vague/Ambiguous': 8,
            'Privileged': 6
          },
          estimatedDocuments: '50,000-75,000',
          estimatedReviewHours: 450,
          keyIndividuals: [
            'CEO - John Smith',
            'CFO - Jane Doe',
            'General Counsel - Robert Johnson',
            'Board of Directors (12 members)'
          ]
        }
      },
      {
        step: 'claude-discovery-analysis',
        ai: 'claude-sonnet' as const,
        message: 'Identifying objections and privilege issues...',
        duration: 4500,
        results: {
          objections: [
            {
              request: 'Request No. 12',
              grounds: ['Overly broad', 'Unduly burdensome', 'Not proportional'],
              recommendation: 'Negotiate time frame limitation'
            },
            {
              request: 'Request No. 38',
              grounds: ['Attorney-client privilege', 'Work product'],
              recommendation: 'Prepare privilege log'
            },
            {
              request: 'Request No. 40',
              grounds: ['Government investigation privilege'],
              recommendation: 'Seek protective order'
            }
          ],
          privilegeIssues: [
            'Attorney-client communications (est. 2,000 documents)',
            'Work product materials (est. 500 documents)',
            'Board deliberations (est. 300 documents)'
          ],
          proportionalityArguments: [
            'Time frame exceeds case relevance period',
            'Burden outweighs likely benefit',
            'Information available from other sources'
          ],
          recommendations: [
            'Meet and confer to narrow scope',
            'Propose search term limitations',
            'Seek cost-shifting for broad requests',
            'File motion for protective order on Requests 38-42',
            'Negotiate phased production schedule'
          ]
        }
      },
      {
        step: 'burden-assessment',
        ai: 'claude-sonnet' as const,
        message: 'Calculating collection and review burden...',
        duration: 2000,
        results: {
          collectionBurden: {
            dataSources: 24,
            custodians: 18,
            emailVolume: '~2.5 million',
            estimatedGB: 450,
            collectionHours: 120
          },
          reviewBurden: {
            documentsToReview: '~75,000',
            reviewRate: '50 docs/hour',
            totalHours: 1500,
            estimatedCost: '$450,000'
          },
          timeline: {
            collection: '2-3 weeks',
            processing: '1 week',
            review: '6-8 weeks',
            production: '1 week'
          }
        }
      },
      {
        step: 'strategy-synthesis',
        ai: 'both' as const,
        message: 'Developing response strategy and timeline...',
        duration: 2000,
        results: {
          strategy: 'Negotiate then selective objection',
          immediateActions: [
            'Send meet and confer letter',
            'Begin litigation hold refresh',
            'Identify key custodians',
            'Prepare cost estimates'
          ],
          objectionDeadline: '30 days from service',
          productionDeadline: '45 days (with extensions)',
          estimatedTotalCost: '$450,000 - $600,000',
          riskLevel: 'High - sanctions possible if mishandled',
          timeToReview: '25 minutes',
          manualReviewTime: '8-10 hours'
        }
      }
    ]
  }
}

// Main processing function
export async function processDocumentWithAI(
  documentId: string,
  onStepComplete?: (step: ProcessingStep, index: number, total: number) => void,
  onProgress?: (progress: number) => void
): Promise<AIAnalysisResult> {
  const config = documentProcessingConfigs[documentId as keyof typeof documentProcessingConfigs]

  if (!config) {
    throw new Error(`No processing configuration found for document: ${documentId}`)
  }

  const steps = config.steps
  const totalDuration = config.expectedDuration
  let currentProgress = 0

  // Process each step
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i]

    // Notify step start
    if (onStepComplete) {
      onStepComplete(step, i, steps.length)
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, step.duration))

    // Update progress
    currentProgress += (step.duration / totalDuration) * 100
    if (onProgress) {
      onProgress(Math.min(currentProgress, 100))
    }
  }

  // Generate final analysis result
  return generateFinalAnalysis(documentId, config)
}

// Generate comprehensive final analysis
function generateFinalAnalysis(
  documentId: string,
  config: typeof documentProcessingConfigs[keyof typeof documentProcessingConfigs]
): AIAnalysisResult {
  const gptResults = config.steps
    .filter(s => s.ai === 'gpt4-vision')
    .reduce((acc, step) => ({ ...acc, ...step.results }), {})

  const claudeResults = config.steps
    .filter(s => s.ai === 'claude-sonnet')
    .reduce((acc, step) => ({ ...acc, ...step.results }), {})

  const documentType = config.documentType
  const complexity = config.complexity

  // Build comprehensive result
  const result: AIAnalysisResult = {
    gpt4Vision: {
      extractedElements: (gptResults as any).extracted || [],
      documentStructure: (gptResults as any).documentStructure || {},
      visualFindings: [
        `Document type: ${documentType}`,
        `Total pages: ${(gptResults as any).pages || 'Unknown'}`,
        `Complexity: ${complexity}`,
        ...((gptResults as any).keyTestimony || []),
        ...((gptResults as any).definedTerms || [])
      ],
      confidence: (gptResults as any).confidence || 0.95,
      processingTime: config.steps
        .filter(s => s.ai === 'gpt4-vision')
        .reduce((sum, s) => sum + s.duration, 0)
    },
    claudeSonnet: {
      legalAnalysis: (claudeResults as any).keyAdmissions || (claudeResults as any).favorableTerms || [],
      risks: (claudeResults as any).risks || [],
      keyTerms: (claudeResults as any).keyTerms || [],
      recommendations: (claudeResults as any).recommendations || [],
      compliance: (claudeResults as any).compliance || [],
      processingTime: config.steps
        .filter(s => s.ai === 'claude-sonnet')
        .reduce((sum, s) => sum + s.duration, 0)
    },
    combined: {
      summary: generateSummary(documentType, claudeResults as any),
      criticalFindings: extractCriticalFindings(claudeResults as any),
      actionItems: (claudeResults as any).recommendations || [],
      estimatedSavings: {
        time: calculateTimeSavings(config),
        cost: calculateCostSavings(config)
      }
    }
  }

  return result
}

// Helper functions
function generateSummary(documentType: string, results: any): string {
  const riskLevel = results.overallRisk ||
    (results.risks && results.risks.length > 0 ?
      results.risks[0].level : 'Medium')

  return `Analysis complete for ${documentType}. Risk level: ${riskLevel}. ` +
    `${results.keyIssues || results.risks?.length || 0} issues identified requiring attention.`
}

function extractCriticalFindings(results: any): string[] {
  const findings: string[] = []

  if (results.risks) {
    results.risks
      .filter((r: RiskItem) => r.level === 'High')
      .forEach((r: RiskItem) => findings.push(r.description))
  }

  if (results.criticalIssues) {
    findings.push(`${results.criticalIssues} critical issues require immediate attention`)
  }

  return findings
}

function calculateTimeSavings(config: any): string {
  const aiTime = config.expectedDuration / 1000 / 60 // Convert to minutes
  const manualTime = parseInt(config.steps[config.steps.length - 1].results?.manualReviewTime || '4') * 60
  const savings = ((manualTime - aiTime) / manualTime * 100).toFixed(0)
  return `${savings}% faster than manual review`
}

function calculateCostSavings(config: any): number {
  const hourlyRate = 175 // Attorney hourly rate
  const manualHours = parseInt(config.steps[config.steps.length - 1].results?.manualReviewTime || '4')
  const aiMinutes = config.expectedDuration / 1000 / 60
  const savings = (manualHours * hourlyRate) - ((aiMinutes / 60) * hourlyRate)
  return Math.round(savings)
}

export { documentProcessingConfigs }