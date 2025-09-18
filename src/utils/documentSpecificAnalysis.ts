import type { AIAnalysisResult } from './documentProcessor'

export interface DocumentSpecificAnalysis {
  gptVision: {
    extracted: string[]
    confidence: number
    documentStructure?: any
    keyElements?: string[]
  }
  claude: {
    insights: string[]
    warnings: string[]
    risks: {
      high: string[]
      medium: string[]
      low: string[]
    }
  }
  recommendations: string[]
  metrics: {
    timeSaved: number
    costSaved: number
    accuracy: number
  }
}

export const getDocumentSpecificAnalysis = (documentId: string): AIAnalysisResult => {
  const analyses: Record<string, DocumentSpecificAnalysis> = {
    'nda-techco': {
      gptVision: {
        extracted: [
          'Parties: TechCo Inc. (Delaware) and DataFlow Systems LLC (California)',
          'Effective Date: January 15, 2025',
          'Confidentiality Period: 3 years from disclosure',
          'Mutual NDA with reciprocal obligations',
          'Signature blocks: 4 authorized signatories identified',
          'Governing Law: Delaware',
          'Non-solicitation clause: 12 months',
          'Definition of Confidential Information includes source code, algorithms, customer lists'
        ],
        confidence: 0.97,
        keyElements: [
          'Mutual obligations properly structured',
          'Clear definition of confidential information',
          'Standard exceptions (publicly available, independently developed)',
          'Return/destruction of materials clause present'
        ]
      },
      claude: {
        insights: [
          'Mutual obligations properly balanced between parties',
          'Delaware jurisdiction favorable for enforcement',
          'Standard confidentiality period of 3 years',
          'Non-solicitation provision adds employee protection'
        ],
        warnings: [
          '3-year period may be insufficient for AI/ML models',
          'No specific provisions for training data or algorithms',
          'Consider adding residual knowledge clause for developers',
          'Lack of liquidated damages provision'
        ],
        risks: {
          high: [],
          medium: [
            'Confidentiality period may be too short for AI technology',
            'No liquidated damages clause for breach'
          ],
          low: [
            'Standard termination provisions may need enhancement',
            'Definition of "need to know" could be more specific'
          ]
        }
      },
      recommendations: [
        'Extend confidentiality period to 5-7 years for AI/ML models',
        'Add specific clause for training data and algorithm protection',
        'Include residual knowledge provisions for technical personnel',
        'Consider adding liquidated damages clause ($50K-$100K range)',
        'Clarify remote work and data access protocols'
      ],
      metrics: {
        timeSaved: 2.5,
        costSaved: 437,
        accuracy: 99.2
      }
    },

    'deposition-williams': {
      gptVision: {
        extracted: [
          'Case: Williams v. Acme Corporation, Case No. 2024-CV-1847',
          'Expert: Dr. Sarah Elizabeth Williams, PhD MIT',
          'Qualifications: 22 years experience, PE licensed in 4 states',
          'Prior testimony: 47 cases over 15 years',
          'Key findings: THREE critical design flaws identified',
          'Defect #1: Tensile strength 48,000 PSI (26% below 65,000 PSI spec)',
          'Defect #2: Weld penetration only 60% (minimum 85% required)',
          'Defect #3: Safety mechanism failed at 150% load (should trigger at 120%)',
          'QC violations: 127 below-spec products approved with deviations',
          'Compensation: $650/hour review, $850/hour testimony (~$78,000 total)'
        ],
        confidence: 0.94,
        keyElements: [
          'Expert qualifications thoroughly established',
          'Three independent design flaws documented',
          'Industry standard testing procedures used',
          'Pattern of quality control violations revealed'
        ]
      },
      claude: {
        insights: [
          'Dr. Williams credentials are impeccable - MIT PhD and professor',
          'Three independent design flaws create "perfect storm" causation theory',
          'ASTM testing standards properly followed - strengthens methodology',
          '127 quality control violations show pattern of negligence',
          'Expert maintained composure during aggressive cross-examination',
          'Testimony links all three defects directly to plaintiff incident'
        ],
        warnings: [
          '35 of 47 prior cases for plaintiffs (75%) - expect bias attack',
          '$78,000 compensation may seem high to jury',
          'Testing on exemplar units, not actual failed product',
          'Defense will challenge Daubert admissibility',
          'No errata sheet changes strengthens credibility'
        ],
        risks: {
          high: [
            'QC violations pattern suggests willful negligence - punitive damages likely',
            'Company approved 127 below-spec products knowingly'
          ],
          medium: [
            'Bias challenge based on 75% plaintiff work history',
            'High expert fees could affect jury perception'
          ],
          low: [
            'Exemplar testing is standard practice and defensible',
            'Daubert challenge unlikely to succeed given methodology'
          ]
        }
      },
      recommendations: [
        'IMMEDIATE: File Daubert motion to establish methodology admissibility',
        'Create visual demonstrative showing three-failure cascade',
        'Emphasize 127 QC violations for punitive damages claim',
        'Prepare redirect to address 75% plaintiff bias concern',
        'Use Dr. Williams\' declined case example to show objectivity',
        'Request jury instruction on exemplar testing standards',
        'Highlight MIT credentials and 22 years experience',
        'Create timeline showing pattern of QC violations',
        'Calculate damages multiplier based on willful negligence',
        'Prepare motion in limine to exclude compensation amount'
      ],
      metrics: {
        timeSaved: 14.5,
        costSaved: 2175,
        accuracy: 96.8
      }
    },

    'contract-services': {
      gptVision: {
        extracted: [
          'Parties: Global Solutions Inc. (Delaware) & Enterprise Partners LLC (NY LLC)',
          'Contract Value: $2,400,000 annually ($200,000 monthly)',
          'Initial Term: 3 years with automatic renewal',
          'Services: Cloud infrastructure, managed services, 24/7 support',
          'SLA: 99.9% monthly uptime commitment',
          'Service Credits: 5% (99.5%), 10% (99%), 25% (98%), 50% (<98%)',
          'Response Times: Critical 15min, High 1hr, Medium 4hrs, Low 24hrs',
          'Late Payment: 1.5% monthly interest or maximum legal rate',
          'Annual Increase: Greater of 3% or CPI',
          'Termination: 180 days notice after Initial Term',
          'Early Termination Fee: Remaining months x 50% monthly fee',
          'Insurance: $2M GL, $5M Professional, $5M Cyber',
          'Data Retention: 90 days post-termination',
          'Liability Cap: 12 months of fees',
          'SOC 2 Type II certification required'
        ],
        confidence: 0.96,
        keyElements: [
          'High-value long-term commitment structure',
          'Tiered service credit system',
          'Comprehensive insurance and compliance requirements',
          'Complex termination and penalty provisions'
        ]
      },
      claude: {
        insights: [
          '$2.4M annual commitment provides significant leverage for negotiation',
          'SOC 2 Type II and $5M cyber insurance show strong security posture',
          '24-hour breach notification is aggressive but protects client',
          'Liability cap at 12 months is reasonable for this service type',
          'Key personnel protection clause prevents bait-and-switch',
          'Comprehensive data protection with encryption requirements'
        ],
        warnings: [
          '3-year initial term creates $7.2M total commitment',
          '99.9% uptime = only 43 minutes downtime/month allowed',
          'Early termination could cost up to $3.6M in penalties',
          '180-day termination notice is excessive (industry standard 30-90)',
          'Annual 3% minimum increase compounds to 19% over 6 years',
          'Service credits cap at 50% despite potential total business impact',
          'Provider retains significant IP rights in work product',
          '1.5% monthly interest (18% annual) may exceed state usury limits'
        ],
        risks: {
          high: [
            'Total exposure: $7.2M over initial term with limited exit rights',
            '99.9% SLA extremely difficult to maintain consistently',
            'Early termination penalties could exceed $3.6M'
          ],
          medium: [
            'Service credits inadequate for business-critical failures',
            'Provider owns generic improvements and methodologies',
            'Automatic renewal with 90-day notice requirement',
            'Compound price increases not tied to service improvements'
          ],
          low: [
            'Standard limitation of liability provisions',
            'Reasonable insurance requirements',
            'Industry-standard data security provisions'
          ]
        }
      },
      recommendations: [
        'CRITICAL: Negotiate Initial Term down to 1-2 years',
        'CRITICAL: Reduce termination notice to 90 days maximum',
        'HIGH: Add termination right for 3+ months of SLA failures',
        'HIGH: Remove 3% floor on increases - tie to CPI only',
        'HIGH: Increase service credits or add termination trigger',
        'MEDIUM: Clarify IP ownership for custom-developed solutions',
        'MEDIUM: Add Most Favored Nation pricing clause',
        'MEDIUM: Negotiate 99.5% SLA (more realistic)',
        'MEDIUM: Add right to benchmark pricing annually',
        'LOW: Confirm 1.5% monthly interest is legal in your state',
        'LOW: Request examples of Provider\'s uptime history',
        'LOW: Add data localization requirements if needed'
      ],
      metrics: {
        timeSaved: 12.5,
        costSaved: 3125,
        accuracy: 98.4
      }
    },

    'discovery-merger': {
      gptVision: {
        extracted: [
          'Total Requests: 73 document categories',
          'Time Period: January 1, 2020 to present (5+ years)',
          'Estimated Documents: 2.4 million pages',
          'Key Focus: Merger valuation and antitrust concerns',
          'Communication Platforms: Email, Slack, Teams, Signal, WhatsApp',
          'Custodians: 47 individuals including C-suite and board',
          'Third Party Subpoenas: 12 investment banks and advisors',
          'Privilege Log Requirements: Document-by-document with metadata'
        ],
        confidence: 0.93,
        keyElements: [
          'Extremely broad scope of requests',
          'Multiple communication platforms included',
          'Personal devices explicitly requested',
          'Antitrust focus suggests regulatory scrutiny'
        ]
      },
      claude: {
        insights: [
          'Antitrust focus indicates DOJ/FTC investigation parallel to litigation',
          'Valuation documents (requests 12-27) highly material to damages',
          'Customer communications could provide market definition evidence',
          'Integration planning documents may show anti-competitive intent',
          'Board materials likely contain privileged strategy discussions'
        ],
        warnings: [
          'Scope suggests harassment/burden strategy by opposing counsel',
          '5-year lookback period likely overbroad for merger case',
          'Personal device searches raise significant privacy concerns',
          'Estimated review cost of $875,000 at standard rates',
          'Signal/WhatsApp requests may be technically impossible'
        ],
        risks: {
          high: [
            '2.4M document burden disproportionate to case value',
            'Review costs could exceed $875,000 with privilege review',
            'Personal device forensics could expose unrelated private data'
          ],
          medium: [
            'Privilege logging burden for 47 custodians excessive',
            'Third-party subpoena costs not addressed',
            'Clawback agreement may be insufficient for volume'
          ],
          low: [
            'Some requests (1-15) appear reasonably targeted',
            'ESI protocol provides some structure'
          ]
        }
      },
      recommendations: [
        'File emergency protective order and motion to quash/limit',
        'Propose phased discovery (start with 5 key custodians)',
        'Challenge 5-year timeframe as disproportionate',
        'Negotiate focused search terms and date ranges',
        'Request cost-shifting for overbroad requests',
        'Implement TAR/predictive coding to reduce costs',
        'Propose representative sampling for communications',
        'Seek in camera review for privilege disputes',
        'Object to personal device searches as invasive',
        'Negotiate burden-shifting for third-party subpoenas'
      ],
      metrics: {
        timeSaved: 8.0,
        costSaved: 1400,
        accuracy: 94.7
      }
    }
  }

  const analysis = analyses[documentId] || analyses['nda-techco']

  // Convert to AIAnalysisResult format
  return {
    gpt4Vision: {
      extractedElements: analysis.gptVision.extracted,
      documentStructure: analysis.gptVision.documentStructure || {
        sections: analysis.gptVision.keyElements || [],
        totalPages: 0
      },
      visualFindings: [
        `Document analyzed with ${(analysis.gptVision.confidence * 100).toFixed(0)}% confidence`,
        ...analysis.gptVision.extracted.slice(0, 3)
      ],
      confidence: analysis.gptVision.confidence,
      processingTime: 2500
    },
    claudeSonnet: {
      legalAnalysis: analysis.claude.insights,
      risks: [
        ...analysis.claude.risks.high.map(r => ({
          type: 'Legal Risk',
          level: 'High' as const,
          description: r
        })),
        ...analysis.claude.risks.medium.map(r => ({
          type: 'Operational Risk',
          level: 'Medium' as const,
          description: r
        })),
        ...analysis.claude.risks.low.map(r => ({
          type: 'Minor Issue',
          level: 'Low' as const,
          description: r
        }))
      ],
      keyTerms: analysis.claude.warnings,
      recommendations: analysis.recommendations,
      compliance: [],
      processingTime: 3500
    },
    combined: {
      summary: `Analysis complete. Identified ${analysis.claude.risks.high.length} high-risk items, ${analysis.claude.risks.medium.length} medium-risk items. Generated ${analysis.recommendations.length} actionable recommendations.`,
      criticalFindings: [
        ...analysis.claude.risks.high,
        ...analysis.claude.warnings.slice(0, 2)
      ],
      actionItems: analysis.recommendations,
      estimatedSavings: {
        time: `${analysis.metrics.timeSaved} hours saved vs manual review`,
        cost: analysis.metrics.costSaved
      }
    }
  }
}

export const getDocumentTypeIndicators = (documentType: string) => {
  const indicators: Record<string, {
    icon: string
    color: string
    focusAreas: string[]
    processingSteps: string[]
  }> = {
    'Non-Disclosure Agreement': {
      icon: '🔒',
      color: 'blue',
      focusAreas: ['Confidentiality Period', 'Mutual Obligations', 'IP Protection', 'Non-Solicitation'],
      processingSteps: ['Extract Parties', 'Identify Terms', 'Analyze Obligations', 'Risk Assessment']
    },
    'Deposition Transcript': {
      icon: '⚖️',
      color: 'purple',
      focusAreas: ['Witness Credibility', 'Key Testimony', 'Cross-Examination', 'Technical Evidence'],
      processingSteps: ['Parse Q&A Format', 'Extract Testimony', 'Identify Admissions', 'Assess Credibility']
    },
    'Service Contract': {
      icon: '💰',
      color: 'green',
      focusAreas: ['Financial Terms', 'SLA Requirements', 'Termination Clauses', 'Liability Caps'],
      processingSteps: ['Extract Pricing', 'Review SLAs', 'Analyze Terms', 'Calculate Risk']
    },
    'Document Request': {
      icon: '📋',
      color: 'orange',
      focusAreas: ['Request Scope', 'Burden Assessment', 'Proportionality', 'Privilege Issues'],
      processingSteps: ['Categorize Requests', 'Estimate Volume', 'Assess Burden', 'Strategy Recommendations']
    }
  }

  return indicators[documentType] || indicators['Non-Disclosure Agreement']
}