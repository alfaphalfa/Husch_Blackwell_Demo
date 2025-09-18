import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const maxDuration = 60

// Mock analysis data for different document types
const getMockAnalysis = (documentType?: string, fileName?: string) => {
  const analyses = {
    'nda': {
      extraction: {
        documentType: 'Non-Disclosure Agreement',
        confidence: 0.97,
        keyTerms: [
          { term: 'Mutual confidentiality obligations', context: 'Both parties must protect shared information', importance: 'high', location: 'Section 3' },
          { term: 'Delaware jurisdiction', context: 'Legal disputes governed by Delaware law', importance: 'medium', location: 'Section 11' },
          { term: '3-year confidentiality period', context: 'Information remains confidential for 3 years', importance: 'high', location: 'Section 3.2' }
        ],
        dates: [
          { date: 'January 15, 2025', type: 'Effective Date', description: 'Agreement becomes effective', isCritical: true },
          { date: 'January 15, 2028', type: 'Expiration', description: 'Confidentiality obligations end', isCritical: true }
        ],
        parties: [
          { name: 'TechCo Inc.', role: 'Disclosing Party', obligations: ['Protect confidential information', 'Provide accurate information'] },
          { name: 'DataFlow Systems LLC', role: 'Receiving Party', obligations: ['Maintain confidentiality', 'Return information upon request'] }
        ],
        obligations: [
          { party: 'Both Parties', description: 'Maintain strict confidentiality', status: 'active' },
          { party: 'Receiving Party', description: 'Return or destroy confidential information upon termination', status: 'active' }
        ],
        rawText: 'Mock extracted content from NDA document',
        confidence: 97
      },
      analysis: {
        summary: 'Mutual NDA between TechCo Inc. and DataFlow Systems LLC with standard confidentiality provisions and Delaware jurisdiction.',
        keyFindings: [
          'Mutual obligations properly balanced between parties',
          'Standard confidentiality period of 3 years',
          'Delaware jurisdiction favorable for enforcement',
          'No liquidated damages provision specified'
        ],
        recommendations: [
          'Consider AI/ML specific provisions for technology companies',
          'Add residual knowledge clause for developers',
          'Include liquidated damages clause ($50K-$100K range)',
          'Clarify remote work and data access protocols'
        ],
        complexity: 'medium',
        estimatedReviewTime: 2.5
      },
      risks: [
        { category: 'Legal', severity: 'medium', description: 'Confidentiality period may be insufficient for AI technology', mitigation: 'Extend period to 5-7 years for AI/ML models', probability: 65 },
        { category: 'Operational', severity: 'low', description: 'Standard termination provisions may need enhancement', mitigation: 'Add specific termination procedures', probability: 30 }
      ],
      actionItems: [
        { id: '1', title: 'Review AI/ML provisions', description: 'Add specific clause for training data and algorithm protection', priority: 'high', status: 'pending', estimatedTime: 1.5 },
        { id: '2', title: 'Add liquidated damages', description: 'Include monetary penalties for breach', priority: 'medium', status: 'pending', estimatedTime: 1.0 }
      ],
      timeSaved: 7.8,
      costSaved: 487
    },
    'deposition': {
      extraction: {
        documentType: 'Deposition Transcript',
        confidence: 0.94,
        keyTerms: [
          { term: 'Expert witness credentials', context: 'Dr. Williams PhD MIT, 22 years experience', importance: 'high', location: 'Page 3' },
          { term: 'Three design flaws', context: 'Tensile strength, weld penetration, safety mechanism', importance: 'high', location: 'Page 23' },
          { term: '127 QC violations', context: 'Below-spec products approved with deviations', importance: 'high', location: 'Page 24' }
        ],
        dates: [
          { date: 'December 10, 2024', type: 'Deposition Date', description: 'Expert testimony given', isCritical: true },
          { date: 'December 20, 2024', type: 'Signature Date', description: 'Witness signed transcript', isCritical: false }
        ],
        parties: [
          { name: 'Dr. Sarah Williams', role: 'Expert Witness', obligations: ['Provide truthful testimony', 'Review transcript for accuracy'] },
          { name: 'Jonathan Williams', role: 'Plaintiff', obligations: ['Pursue case diligently'] },
          { name: 'Acme Corporation', role: 'Defendant', obligations: ['Respond to discovery requests'] }
        ],
        obligations: [],
        rawText: 'Mock extracted content from deposition transcript',
        confidence: 94
      },
      analysis: {
        summary: 'Expert witness deposition in Williams v. Acme product liability case with strong technical testimony identifying multiple design flaws.',
        keyFindings: [
          'Expert credentials are impeccable - MIT PhD and professor',
          'Three independent design flaws create strong causation theory',
          'ASTM testing standards properly followed',
          '127 quality control violations show pattern of negligence',
          'Expert maintained composure during cross-examination'
        ],
        recommendations: [
          'File Daubert motion to establish methodology admissibility',
          'Create visual demonstrative showing three-failure cascade',
          'Emphasize 127 QC violations for punitive damages claim',
          'Prepare redirect to address 75% plaintiff bias concern',
          'Highlight MIT credentials and 22 years experience'
        ],
        complexity: 'high',
        estimatedReviewTime: 8.5
      },
      risks: [
        { category: 'Legal', severity: 'high', description: 'QC violations pattern suggests willful negligence - punitive damages likely', mitigation: 'Prepare strong damages argument', probability: 85 },
        { category: 'Reputational', severity: 'medium', description: 'Bias challenge based on 75% plaintiff work history', mitigation: 'Prepare redirect on objectivity', probability: 60 }
      ],
      actionItems: [
        { id: '1', title: 'File Daubert motion', description: 'Establish methodology admissibility before trial', priority: 'urgent', status: 'pending', estimatedTime: 4.0 },
        { id: '2', title: 'Create visual aids', description: 'Develop demonstratives for three-failure theory', priority: 'high', status: 'pending', estimatedTime: 3.0 }
      ],
      timeSaved: 14.5,
      costSaved: 2175
    },
    'msa': {
      extraction: {
        documentType: 'Master Services Agreement',
        confidence: 0.96,
        keyTerms: [
          { term: '$2,400,000 annual commitment', context: '$200,000 monthly service fee', importance: 'high', location: 'Section 8.1' },
          { term: '99.9% uptime SLA', context: 'Monthly availability requirement', importance: 'high', location: 'Section 5.1' },
          { term: '3-year initial term', context: 'Contract duration with auto-renewal', importance: 'high', location: 'Section 9.1' }
        ],
        dates: [
          { date: 'February 1, 2025', type: 'Effective Date', description: 'Services commence', isCritical: true },
          { date: 'February 1, 2028', type: 'Initial Term End', description: 'First renewal decision point', isCritical: true }
        ],
        parties: [
          { name: 'Global Solutions Inc.', role: 'Service Provider', obligations: ['Deliver services per SLA', 'Maintain security standards'] },
          { name: 'Enterprise Partners LLC', role: 'Client', obligations: ['Pay fees on time', 'Provide necessary access'] }
        ],
        obligations: [
          { party: 'Provider', description: 'Maintain 99.9% uptime', deadline: 'Monthly', status: 'active' },
          { party: 'Client', description: 'Pay monthly fees within 30 days', deadline: 'Monthly', status: 'active' }
        ],
        rawText: 'Mock extracted content from MSA document',
        confidence: 96
      },
      analysis: {
        summary: 'High-value enterprise services agreement with aggressive SLA requirements and significant financial commitments.',
        keyFindings: [
          '$2.4M annual commitment provides significant leverage for negotiation',
          'SOC 2 Type II and $5M cyber insurance show strong security posture',
          '99.9% uptime SLA extremely difficult to maintain consistently',
          '3-year initial term creates $7.2M total commitment',
          'Early termination could cost up to $3.6M in penalties'
        ],
        recommendations: [
          'Negotiate Initial Term down to 1-2 years',
          'Reduce termination notice to 90 days maximum',
          'Add termination right for 3+ months of SLA failures',
          'Remove 3% floor on increases - tie to CPI only',
          'Negotiate 99.5% SLA (more realistic)'
        ],
        complexity: 'high',
        estimatedReviewTime: 6.5
      },
      risks: [
        { category: 'Financial', severity: 'high', description: 'Total exposure: $7.2M over initial term with limited exit rights', mitigation: 'Negotiate shorter initial term', probability: 90 },
        { category: 'Operational', severity: 'high', description: '99.9% SLA extremely difficult to maintain consistently', mitigation: 'Request realistic SLA targets', probability: 75 }
      ],
      actionItems: [
        { id: '1', title: 'Negotiate contract terms', description: 'Reduce initial term and improve exit provisions', priority: 'urgent', status: 'pending', estimatedTime: 8.0 },
        { id: '2', title: 'Review SLA feasibility', description: 'Assess whether 99.9% uptime is achievable', priority: 'high', status: 'pending', estimatedTime: 2.0 }
      ],
      timeSaved: 12.5,
      costSaved: 3125
    },
    'discovery': {
      extraction: {
        documentType: 'Discovery Request',
        confidence: 0.93,
        keyTerms: [
          { term: '73 document categories', context: 'Total number of production requests', importance: 'high', location: 'Summary' },
          { term: '2.4 million pages estimated', context: 'Expected document volume', importance: 'high', location: 'Certificate' },
          { term: '5-year lookback period', context: 'January 1, 2020 to present', importance: 'medium', location: 'Definitions' }
        ],
        dates: [
          { date: 'March 1, 2025', type: 'Service Date', description: 'Discovery requests served', isCritical: true },
          { date: 'March 31, 2025', type: 'Response Due', description: '30-day response deadline', isCritical: true }
        ],
        parties: [
          { name: 'Pinnacle Holdings, Inc.', role: 'Requesting Party', obligations: ['Serve proper discovery requests'] },
          { name: 'Apex Corporation', role: 'Responding Party', obligations: ['Produce responsive documents', 'Provide privilege log'] }
        ],
        obligations: [
          { party: 'Apex Corporation', description: 'Produce all responsive documents', deadline: 'March 31, 2025', status: 'pending' },
          { party: 'Apex Corporation', description: 'Provide document-by-document privilege log', deadline: 'March 31, 2025', status: 'pending' }
        ],
        rawText: 'Mock extracted content from discovery requests',
        confidence: 93
      },
      analysis: {
        summary: 'Comprehensive discovery requests in merger litigation with extraordinarily broad scope targeting 2.4 million documents over 5-year period.',
        keyFindings: [
          'Antitrust focus indicates DOJ/FTC investigation parallel to litigation',
          'Valuation documents (requests 12-27) highly material to damages',
          'Integration planning documents may show anti-competitive intent',
          '5-year lookback period likely overbroad for merger case',
          'Personal device searches raise significant privacy concerns'
        ],
        recommendations: [
          'File emergency protective order and motion to quash/limit',
          'Propose phased discovery (start with 5 key custodians)',
          'Challenge 5-year timeframe as disproportionate',
          'Negotiate focused search terms and date ranges',
          'Request cost-shifting for overbroad requests'
        ],
        complexity: 'high',
        estimatedReviewTime: 25.0
      },
      risks: [
        { category: 'Financial', severity: 'high', description: '2.4M document burden disproportionate to case value', mitigation: 'File motion for protective order', probability: 95 },
        { category: 'Operational', severity: 'high', description: 'Review costs could exceed $875,000 with privilege review', mitigation: 'Negotiate cost-shifting', probability: 85 }
      ],
      actionItems: [
        { id: '1', title: 'File protective motion', description: 'Emergency motion to limit scope of discovery', priority: 'urgent', status: 'pending', estimatedTime: 12.0 },
        { id: '2', title: 'Negotiate ESI protocol', description: 'Establish search terms and review procedures', priority: 'high', status: 'pending', estimatedTime: 6.0 }
      ],
      timeSaved: 32,
      costSaved: 9600
    }
  }

  // Return appropriate analysis based on document type or filename
  const name = fileName?.toLowerCase() || ''
  const type = documentType?.toLowerCase() || ''

  if (type.includes('nda') || name.includes('nda')) return analyses.nda
  if (type.includes('deposition') || name.includes('deposition') || name.includes('williams')) return analyses.deposition
  if (type.includes('msa') || type.includes('service') || name.includes('service') || name.includes('msa')) return analyses.msa
  if (type.includes('discovery') || name.includes('discovery') || name.includes('merger')) return analyses.discovery

  return analyses.nda // default
}

export async function POST(request: NextRequest) {
  try {
    // Always use demo mode for now
    const isDemoMode = true

    // Parse the request to get document type
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const documentType = formData.get('documentType') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Simulate processing time (2.5-4.5 seconds)
    const processingTime = 2.5 + Math.random() * 2
    await new Promise(resolve => setTimeout(resolve, processingTime * 1000))

    // Get mock analysis based on document type
    const mockAnalysis = getMockAnalysis(documentType || undefined, file.name)

    // Return successful demo response
    return NextResponse.json({
      success: true,
      analysis: {
        ...mockAnalysis,
        metadata: {
          processingTime,
          fileName: file.name,
          fileSize: file.size,
          documentType: documentType || 'contract',
          timestamp: new Date().toISOString()
        }
      },
      metrics: {
        fileName: file.name,
        fileSize: file.size,
        documentType: mockAnalysis.extraction.documentType,
        processingTime,
        timeSaved: mockAnalysis.timeSaved,
        costSaved: mockAnalysis.costSaved,
        confidence: mockAnalysis.extraction.confidence,
        timestamp: new Date().toISOString()
      },
      message: `Document processed successfully in ${processingTime.toFixed(1)}s (Demo Mode)`
    })

  } catch (error) {
    console.error('Document processing error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process document',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

// OPTIONS method for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
