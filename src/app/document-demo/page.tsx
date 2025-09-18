'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Clock,
  Brain,
  Eye,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Download,
  Search,
  Scale,
  DollarSign,
  Users,
  ArrowRight,
  Sparkles,
  FileCheck,
  AlertCircle,
  BarChart3,
  Layers,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import DocumentViewer from '@/components/DocumentViewer'
import DualAIAnalysis from '@/components/DualAIAnalysis'

// Document library with real samples
const documentLibrary = [
  {
    id: 'nda-techco',
    name: 'TechCo NDA Agreement',
    type: 'Non-Disclosure Agreement',
    pages: 8,
    complexity: 'Medium',
    preview: '/samples/nda-preview.png',
    fullDoc: '/samples/nda-techco.pdf',
    description: 'Mutual NDA between TechCo Inc. and DataFlow Systems',
    keyPoints: [
      'Term: 3 years',
      'Jurisdiction: Delaware',
      'Mutual obligations',
      'IP provisions included'
    ],
    aiInsights: {
      gpt4: {
        riskScore: 65,
        keyFindings: [
          'Non-standard termination clause detected',
          'Broad definition of confidential information',
          'Missing dispute resolution mechanism'
        ]
      },
      claude: {
        riskScore: 72,
        keyFindings: [
          'Potential conflict with state privacy laws',
          'Ambiguous language in Section 4.2',
          'Unlimited liability exposure'
        ]
      }
    },
    estimatedTime: '8 hours manual review',
    aiTime: '45 seconds'
  },
  {
    id: 'deposition-williams',
    name: 'Williams v. Acme Corp Deposition',
    type: 'Deposition Transcript',
    pages: 45,
    complexity: 'High',
    preview: '/samples/deposition-preview.png',
    fullDoc: '/samples/deposition-williams.pdf',
    description: 'Deposition of expert witness Dr. Sarah Williams in product liability case',
    keyPoints: [
      'Expert testimony on product defects',
      'Cross-examination included',
      '3 hours of testimony',
      'Multiple exhibits referenced'
    ],
    aiInsights: {
      gpt4: {
        riskScore: 82,
        keyFindings: [
          'Contradictory statements on pages 12 and 34',
          'Key admission regarding safety testing',
          'Expert qualifications challenged successfully'
        ]
      },
      claude: {
        riskScore: 78,
        keyFindings: [
          'Witness credibility issues identified',
          'Technical errors in expert analysis',
          'Strong rebuttal opportunities noted'
        ]
      }
    },
    estimatedTime: '12 hours manual review',
    aiTime: '2 minutes'
  },
  {
    id: 'contract-services',
    name: 'Master Services Agreement',
    type: 'Service Contract',
    pages: 24,
    complexity: 'High',
    preview: '/samples/msa-preview.png',
    fullDoc: '/samples/msa-global.pdf',
    description: 'MSA between Global Solutions and Enterprise Partners',
    keyPoints: [
      'Value: $2.4M annually',
      'SLA requirements: 99.9% uptime',
      'Termination: 90 days notice',
      'Data security: SOC 2 Type II'
    ],
    aiInsights: {
      gpt4: {
        riskScore: 45,
        keyFindings: [
          'Favorable payment terms secured',
          'Strong IP protection clauses',
          'Limited liability caps in place'
        ]
      },
      claude: {
        riskScore: 52,
        keyFindings: [
          'SLA penalties need clarification',
          'Force majeure clause is comprehensive',
          'Renewal terms favor client'
        ]
      }
    },
    estimatedTime: '6 hours manual review',
    aiTime: '1.5 minutes'
  },
  {
    id: 'discovery-merger',
    name: 'Discovery Request - Merger Case',
    type: 'Discovery Documents',
    pages: 156,
    complexity: 'Very High',
    preview: '/samples/discovery-preview.png',
    fullDoc: '/samples/discovery-batch.pdf',
    description: 'Document production request in merger litigation',
    keyPoints: [
      '47 document requests',
      '12 interrogatories',
      'Financial records required',
      'Email preservation notice'
    ],
    aiInsights: {
      gpt4: {
        riskScore: 91,
        keyFindings: [
          'Overly broad requests identified (items 8-15)',
          'Privileged documents at risk',
          'Timeline compliance challenges'
        ]
      },
      claude: {
        riskScore: 88,
        keyFindings: [
          'Multiple grounds for objection available',
          'Proportionality arguments applicable',
          'Cost-shifting opportunities present'
        ]
      }
    },
    estimatedTime: '40+ hours manual review',
    aiTime: '5 minutes'
  }
]

export default function DocumentDemoPage() {
  const [selectedDocument, setSelectedDocument] = useState<typeof documentLibrary[0] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [activeModel, setActiveModel] = useState<'gpt4' | 'claude' | 'both'>('both')
  const [extractedData, setExtractedData] = useState<any>(null)
  const [showDocumentViewer, setShowDocumentViewer] = useState(false)

  // Processing steps for animation
  const processingSteps = [
    { id: 1, name: 'Document Upload', icon: '📤', duration: 500 },
    { id: 2, name: 'OCR & Preprocessing', icon: '🔍', duration: 1000 },
    { id: 3, name: 'GPT-4 Vision Analysis', icon: '👁️', duration: 2000 },
    { id: 4, name: 'Claude Sonnet Review', icon: '🧠', duration: 2000 },
    { id: 5, name: 'Cross-Model Validation', icon: '🔄', duration: 1500 },
    { id: 6, name: 'Risk Assessment', icon: '⚠️', duration: 1000 },
    { id: 7, name: 'Report Generation', icon: '📊', duration: 800 }
  ]

  const selectDocument = (doc: typeof documentLibrary[0]) => {
    setSelectedDocument(doc)
    setShowResults(false)
    setProcessingStep(0)
  }

  const startProcessing = async () => {
    if (!selectedDocument) return

    setIsProcessing(true)
    setShowResults(false)
    setExtractedData(null)

    // The DualAIAnalysis component will handle the processing simulation
    // and call onComplete when finished
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hb-navy rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-hb-navy">Legal Document AI Analysis</h1>
                <p className="text-xs text-gray-500">GPT-4 Vision + Claude Sonnet Demo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Document Selection Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Select Legal Document for AI Analysis
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from real legal documents to see GPT-4 Vision and Claude Sonnet extract insights,
              identify risks, and provide actionable recommendations in seconds instead of hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentLibrary.map(doc => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={`cursor-pointer h-full ${
                    selectedDocument?.id === doc.id
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => selectDocument(doc)}
                >
                  {/* Document Preview */}
                  <div className="relative p-4 border-b">
                    <div className="aspect-[8.5/11] bg-gray-100 rounded-lg overflow-hidden">
                      <div className="p-4">
                        <FileText className="w-12 h-12 text-gray-400 mb-2" />
                        <div className="space-y-2">
                          <div className="h-2 bg-gray-300 rounded w-3/4" />
                          <div className="h-2 bg-gray-300 rounded w-full" />
                          <div className="h-2 bg-gray-300 rounded w-5/6" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-6 right-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        doc.complexity === 'Very High' ? 'bg-red-100 text-red-700' :
                        doc.complexity === 'High' ? 'bg-orange-100 text-orange-700' :
                        doc.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {doc.complexity}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-2 py-1 rounded">
                      <p className="text-xs font-medium text-gray-700">{doc.pages} pages</p>
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                    <p className="text-sm text-blue-600 mb-2">{doc.type}</p>
                    <p className="text-xs text-gray-600 mb-3">{doc.description}</p>

                    <div className="space-y-1 mb-3">
                      {doc.keyPoints.slice(0, 2).map((point, idx) => (
                        <div key={idx} className="flex items-start gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600">{point}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Manual Review</p>
                        <p className="text-sm font-medium text-gray-700">{doc.estimatedTime}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">AI Analysis</p>
                        <p className="text-sm font-medium text-green-600">{doc.aiTime}</p>
                      </div>
                    </div>

                    {/* View Document Button */}
                    {selectedDocument?.id === doc.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-3"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowDocumentViewer(true)
                        }}
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        View Document
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selected Document Actions */}
          {selectedDocument && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <Button
                size="lg"
                onClick={startProcessing}
                disabled={isProcessing}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Processing Document...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Start AI Analysis
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </section>

        {/* Dual AI Analysis */}
        {isProcessing && selectedDocument && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-12"
          >
            <DualAIAnalysis
              isAnalyzing={isProcessing}
              documentName={selectedDocument.name}
              documentType={selectedDocument.type}
              onComplete={(results) => {
                console.log('Analysis results:', results)
                setIsProcessing(false)
                setShowResults(true)
                // Update extracted data with results
                setExtractedData({
                  parties: ['TechCo Inc.', 'DataFlow Systems'],
                  keyDates: ['Effective: January 15, 2025', 'Expiration: January 15, 2028'],
                  obligations: [
                    'Maintain strict confidentiality',
                    'Return all materials upon termination',
                    'No reverse engineering'
                  ],
                  risks: results.claude.findings,
                  recommendations: results.claude.recommendations
                })
              }}
            />
          </motion.section>
        )}

        {/* Results Section */}
        {showResults && selectedDocument && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* AI Model Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* GPT-4 Vision Results */}
              <Card className="p-6 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-purple-900">GPT-4 Vision Analysis</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Risk Score:</span>
                    <span className={`text-2xl font-bold ${
                      selectedDocument.aiInsights.gpt4.riskScore > 70 ? 'text-red-600' :
                      selectedDocument.aiInsights.gpt4.riskScore > 40 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {selectedDocument.aiInsights.gpt4.riskScore}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Findings:</p>
                    <div className="space-y-2">
                      {selectedDocument.aiInsights.gpt4.keyFindings.map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{finding}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Claude Sonnet Results */}
              <Card className="p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-900">Claude Sonnet Analysis</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Risk Score:</span>
                    <span className={`text-2xl font-bold ${
                      selectedDocument.aiInsights.claude.riskScore > 70 ? 'text-red-600' :
                      selectedDocument.aiInsights.claude.riskScore > 40 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {selectedDocument.aiInsights.claude.riskScore}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Findings:</p>
                    <div className="space-y-2">
                      {selectedDocument.aiInsights.claude.keyFindings.map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{finding}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Extracted Data */}
            {extractedData && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Extracted Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Parties Involved</p>
                    <div className="space-y-1">
                      {extractedData.parties.map((party: string, idx: number) => (
                        <p key={idx} className="text-sm text-gray-600">• {party}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Dates</p>
                    <div className="space-y-1">
                      {extractedData.keyDates.map((date: string, idx: number) => (
                        <p key={idx} className="text-sm text-gray-600">• {date}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Obligations</p>
                    <div className="space-y-1">
                      {extractedData.obligations.map((obligation: string, idx: number) => (
                        <p key={idx} className="text-sm text-gray-600">• {obligation}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-2">AI Recommendations</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {extractedData.recommendations.map((rec: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Time & Cost Savings */}
            <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Analysis Complete</h3>

                <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                  <div>
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-900">
                      {selectedDocument.aiTime}
                    </p>
                    <p className="text-sm text-gray-600">AI Processing Time</p>
                  </div>

                  <div>
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.round((parseInt(selectedDocument.estimatedTime) / 0.75) * 100) / 100}x
                    </p>
                    <p className="text-sm text-gray-600">Faster than Manual</p>
                  </div>

                  <div>
                    <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-gray-900">
                      ${Math.round(parseInt(selectedDocument.estimatedTime) * 175)}
                    </p>
                    <p className="text-sm text-gray-600">Cost Saved</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                  <Button size="lg" className="bg-hb-navy hover:bg-hb-darkblue text-white">
                    <Download className="w-5 h-5 mr-2" />
                    Export Full Report
                  </Button>
                  <Button size="lg" variant="outline">
                    <FileCheck className="w-5 h-5 mr-2" />
                    Review in Detail
                  </Button>
                </div>
              </div>
            </Card>
          </motion.section>
        )}
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewer
        isOpen={showDocumentViewer}
        onClose={() => setShowDocumentViewer(false)}
        document={selectedDocument || { id: '', name: '', pages: 0 }}
      />
    </div>
  )
}