'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Brain,
  Eye,
  Shield,
  TrendingUp,
  Loader2,
  ArrowRight,
  Sparkles,
  DollarSign,
  BarChart3,
  Users,
  Gavel,
  Search,
  FileCheck,
  AlertTriangle,
  Play,
  ChevronDown,
  ChevronUp,
  Edit3,
  Save,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { DualAIAnalysis } from '@/components/DualAIAnalysis'
import { processDocumentWithAI } from '@/utils/documentProcessor'
import { getDocumentById, sampleDocuments } from '@/data/sampleDocuments'
import type { ProcessingStep as AIStep, AIAnalysisResult } from '@/utils/documentProcessor'
import type { SampleDocument } from '@/data/sampleDocuments'
import { fullDocuments } from '@/data/fullDocuments'
import type { FullDocument } from '@/data/fullDocuments'
import { getDocumentSpecificAnalysis, getDocumentTypeIndicators } from '@/utils/documentSpecificAnalysis'

interface ProcessingStep {
  id: string
  name: string
  icon: React.ReactNode
  status: 'pending' | 'processing' | 'complete' | 'error'
  duration?: number
}

// Document configuration (without JSX)
const documentConfig = [
  {
    id: 'nda-techco',
    name: 'TechCo NDA Agreement',
    type: 'Non-Disclosure Agreement',
    pages: 8,
    complexity: 'Medium',
    description: 'Mutual NDA between TechCo Inc. and DataFlow Systems LLC',
    iconType: 'shield',
    color: 'from-blue-500 to-cyan-500',
    processingTime: '12-15 seconds',
    riskFactors: ['Confidentiality period', 'IP ownership', 'Termination clauses']
  },
  {
    id: 'deposition-williams',
    name: 'Williams v. Acme Corp Deposition',
    type: 'Deposition Transcript',
    pages: 45,
    complexity: 'High',
    description: 'Expert witness deposition in product liability case',
    iconType: 'gavel',
    color: 'from-purple-500 to-pink-500',
    processingTime: '20-25 seconds',
    riskFactors: ['Technical contradictions', 'Expert qualifications', 'Causation testimony']
  },
  {
    id: 'contract-services',
    name: 'Master Services Agreement',
    type: 'Service Contract',
    pages: 24,
    complexity: 'High',
    description: 'Enterprise services agreement with SLA provisions',
    iconType: 'fileCheck',
    color: 'from-green-500 to-teal-500',
    processingTime: '18-22 seconds',
    riskFactors: ['Service level penalties', 'Payment terms', 'Liability limitations']
  },
  {
    id: 'discovery-merger',
    name: 'Discovery Request - Merger Case',
    type: 'Document Request',
    pages: 156,
    complexity: 'Very High',
    description: 'First request for production in merger litigation',
    iconType: 'search',
    color: 'from-orange-500 to-red-500',
    processingTime: '30-35 seconds',
    riskFactors: ['Broad document requests', 'Privilege issues', 'Proportionality concerns']
  }
]

// Demo content configuration (without JSX)
const demoSectionConfig = [
  {
    title: 'Real-World Impact',
    iconType: 'trending',
    stats: [
      { label: 'Processing Speed', value: '15x faster', detail: 'vs. manual review' },
      { label: 'Accuracy Rate', value: '94%', detail: 'validated by experts' },
      { label: 'Cost Reduction', value: '73%', detail: 'average savings' },
      { label: 'ROI Timeline', value: '< 3 months', detail: 'typical payback' }
    ]
  },
  {
    title: 'Live Performance Metrics',
    iconType: 'chart',
    metrics: [
      { name: 'Documents Processed Today', value: '1,247', trend: '+12%' },
      { name: 'Average Processing Time', value: '18.3s', trend: '-8%' },
      { name: 'Issues Identified', value: '347', trend: '+5%' },
      { name: 'Team Hours Saved', value: '892', trend: '+15%' }
    ]
  }
]

// Helper function for delays
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Simulate realistic API processing
const simulateAPICall = async (
  duration: number,
  setLoadingMessage: (msg: string) => void
) => {
  setLoadingMessage('Connecting to AI service...')
  await sleep(duration * 0.2)

  setLoadingMessage('Processing document...')
  await sleep(duration * 0.6)

  setLoadingMessage('Analyzing results...')
  await sleep(duration * 0.2)
}

export default function UploadPage() {
  const router = useRouter()

  // Icon mapping function
  const getIcon = (iconType: string, className = "w-5 h-5") => {
    switch(iconType) {
      case 'shield': return <Shield className={className} />
      case 'gavel': return <Gavel className={className} />
      case 'fileCheck': return <FileCheck className={className} />
      case 'search': return <Search className={className} />
      case 'trending': return <TrendingUp className={className} />
      case 'chart': return <BarChart3 className={className} />
      default: return <FileText className={className} />
    }
  }

  // Create documentLibrary with icons
  const documentLibrary = documentConfig.map(doc => ({
    ...doc,
    icon: getIcon(doc.iconType)
  }))

  // Create demoSections with icons
  const demoSections = demoSectionConfig.map(section => ({
    ...section,
    icon: getIcon(section.iconType, "w-6 h-6")
  }))

  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showDualAnalysis, setShowDualAnalysis] = useState(false)
  const [currentStep, setCurrentStep] = useState<AIStep | null>(null)
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null)
  const [editingDoc, setEditingDoc] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState<Record<string, any>>({})
  const [currentPage, setCurrentPage] = useState<Record<string, number>>({})
  const [loadingMessage, setLoadingMessage] = useState<string>('')
  const [viewMode, setViewMode] = useState<'snippets' | 'full'>('snippets')

  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: 'upload', name: 'Document Selection', icon: <FileText className="w-5 h-5" />, status: 'pending' },
    { id: 'vision', name: 'GPT-4 Vision Extraction', icon: <Eye className="w-5 h-5" />, status: 'pending' },
    { id: 'analysis', name: 'Claude Deep Analysis', icon: <Brain className="w-5 h-5" />, status: 'pending' },
    { id: 'risk', name: 'Risk Assessment', icon: <Shield className="w-5 h-5" />, status: 'pending' },
    { id: 'actions', name: 'Generate Recommendations', icon: <TrendingUp className="w-5 h-5" />, status: 'pending' }
  ])

  const updateStepStatus = (stepId: string, status: ProcessingStep['status'], duration?: number) => {
    setSteps(prev => prev.map(step =>
      step.id === stepId
        ? { ...step, status, duration }
        : step
    ))
  }

  const handleDocumentSelect = (docId: string) => {
    setSelectedDocument(docId)
    setError(null)
    setAnalysis(null)
    updateStepStatus('upload', 'complete', 0.5)
    setSteps(prev => prev.map((step, idx) =>
      idx === 0 ? step : { ...step, status: 'pending', duration: undefined }
    ))
  }

  const handleProcess = async () => {
    if (!selectedDocument) return

    console.log('🚀 Starting document processing for:', selectedDocument)

    // Get document type indicators for visual feedback
    const selectedDocConfig = documentLibrary.find(d => d.id === selectedDocument)
    const docTypeIndicators = selectedDocConfig ? getDocumentTypeIndicators(selectedDocConfig.type) : null

    setIsProcessing(true)
    setShowDualAnalysis(true)
    setError(null)
    setProgress(0)
    setAnalysis(null)

    // Reset all steps to pending
    setSteps(prev => prev.map(step => ({ ...step, status: 'pending', duration: undefined })))

    try {
      // Step 1: Document Upload
      console.log('Step 1: Document uploaded')
      updateStepStatus('upload', 'complete', 0.5)
      setProgress(20)
      await new Promise(resolve => setTimeout(resolve, 500))

      // Step 2: GPT-4 Vision Analysis
      console.log('Step 2: Starting GPT-4 Vision analysis')
      updateStepStatus('vision', 'processing')
      setProgress(40)

      // Simulate GPT-4 processing with realistic varied timing
      const gptDuration = 2000 + Math.random() * 1000 // 2-3 seconds
      await simulateAPICall(gptDuration, setLoadingMessage)
      updateStepStatus('vision', 'complete', gptDuration / 1000)
      setProgress(50)

      // Step 3: Claude Legal Analysis
      console.log('Step 3: Starting Claude analysis')
      updateStepStatus('analysis', 'processing')
      setProgress(60)

      // Simulate Claude processing with realistic varied timing
      const claudeDuration = 3000 + Math.random() * 1500 // 3-4.5 seconds
      await simulateAPICall(claudeDuration, setLoadingMessage)
      updateStepStatus('analysis', 'complete', claudeDuration / 1000)
      setProgress(70)

      // Step 4: Risk Assessment
      console.log('Step 4: Starting Risk Assessment')
      updateStepStatus('risk', 'processing')
      setProgress(80)

      // Simulate risk assessment with realistic varied timing
      const riskDuration = 1500 + Math.random() * 500 // 1.5-2 seconds
      setLoadingMessage('Evaluating risk factors...')
      await sleep(riskDuration * 0.4)
      setLoadingMessage('Calculating risk scores...')
      await sleep(riskDuration * 0.6)
      updateStepStatus('risk', 'complete', riskDuration / 1000)
      setProgress(90)

      // Step 5: Generate Recommendations
      console.log('Step 5: Generating recommendations')
      updateStepStatus('actions', 'processing')
      setProgress(95)

      // Simulate recommendations generation with realistic varied timing
      const recDuration = 1800 + Math.random() * 700 // 1.8-2.5 seconds
      setLoadingMessage('Generating actionable recommendations...')
      await sleep(recDuration * 0.5)
      setLoadingMessage('Prioritizing action items...')
      await sleep(recDuration * 0.5)
      updateStepStatus('actions', 'complete', recDuration / 1000)
      setProgress(100)
      setLoadingMessage('Analysis complete!')

      // Call the actual processing function if it exists
      let result
      try {
        result = await processDocumentWithAI(
          selectedDocument,
          (step, index, total) => {
            setCurrentStep(step)
            // Progress is already handled above
          }
        )
      } catch (e) {
        console.log('Using mock data for demo')
        // Use mock data if processing fails
        result = null
      }

      updateStepStatus('actions', 'complete', recDuration / 1000)
      setProgress(100)

      // Calculate total processing time from all steps
      const totalTime = steps.reduce((acc, step) => acc + (step.duration || 0), 0)

      // Document-specific variations for more realistic demo
      const docVariations = {
        'nda-techco': {
          confidence: 92 + Math.floor(Math.random() * 5),
          costSaved: 450 + Math.floor(Math.random() * 100),
          documentType: 'Non-Disclosure Agreement',
          timeSaved: 6.5 + Math.random() * 2
        },
        'deposition-williams': {
          confidence: 89 + Math.floor(Math.random() * 6),
          costSaved: 800 + Math.floor(Math.random() * 200),
          documentType: 'Deposition Transcript',
          timeSaved: 12 + Math.random() * 3
        },
        'contract-services': {
          confidence: 91 + Math.floor(Math.random() * 5),
          costSaved: 600 + Math.floor(Math.random() * 150),
          documentType: 'Service Agreement',
          timeSaved: 8 + Math.random() * 2
        },
        'discovery-merger': {
          confidence: 87 + Math.floor(Math.random() * 7),
          costSaved: 1200 + Math.floor(Math.random() * 300),
          documentType: 'Discovery Request',
          timeSaved: 24 + Math.random() * 6
        }
      }[selectedDocument] || {
        confidence: 90 + Math.floor(Math.random() * 5),
        costSaved: 500 + Math.floor(Math.random() * 100),
        documentType: 'Legal Document',
        timeSaved: 7.8
      }

      // Generate mock analysis data for demo
      const mockAnalysis: AIAnalysisResult = {
        gpt4Vision: {
          extractedElements: [
            'Mutual confidentiality obligations clearly defined',
            'Three-year confidentiality period established',
            'Carve-outs for publicly available information included'
          ],
          documentStructure: {
            sections: 12,
            definitions: 15
          },
          visualFindings: [
            'Document structure intact',
            'All pages accounted for',
            'Signatures present'
          ],
          confidence: docVariations.confidence / 100,
          processingTime: 2.5
        },
        claudeSonnet: {
          legalAnalysis: [
            'Comprehensive legal review completed',
            'Key obligations and rights identified'
          ],
          risks: [
            {
              type: 'Term Duration',
              level: 'High',
              description: 'Three-year term may be insufficient for AI/ML models',
              mitigation: 'Extend to 5 years'
            },
            {
              type: 'Derivative Works',
              level: 'Medium',
              description: 'No specific provisions for derivative works',
              mitigation: 'Add derivative works clause'
            }
          ],
          keyTerms: ['confidentiality', 'three-year term', 'jurisdiction'],
          recommendations: [
            'Extend confidentiality period to 5 years for AI-related information',
            'Add specific clauses for machine learning model training data',
            'Include provisions for handling derivative works and improvements',
            'Consider adding liquidated damages provision for breaches',
            'Add audit rights for compliance verification'
          ],
          compliance: [
            { regulation: 'Data Protection', status: 'Compliant', details: 'Adequate safeguards' }
          ],
          processingTime: 3.0
        },
        combined: {
          summary: `Analysis complete: ${docVariations.documentType} processed with ${docVariations.confidence}% confidence`,
          criticalFindings: [
            'Jurisdiction set to Delaware state courts',
            'Standard indemnification provisions included'
          ],
          actionItems: [
            'Review recommended changes',
            'Obtain stakeholder approval'
          ],
          estimatedSavings: {
            time: `${docVariations.timeSaved} hours`,
            cost: docVariations.costSaved
          }
        }
      }

      // Use document-specific analysis
      const analysisWithDefaults = result || getDocumentSpecificAnalysis(selectedDocument)

      console.log('Analysis complete:', analysisWithDefaults)
      setAnalysis(analysisWithDefaults)

      // Keep dual analysis visible but update loading message
      setTimeout(() => {
        // Keep setShowDualAnalysis as true to maintain visibility
        setLoadingMessage('')
      }, 1500)

    } catch (err) {
      console.error('Document processing error:', err)
      setError(err instanceof Error ? err.message : 'Processing failed')
      steps.forEach(step => {
        if (step.status === 'processing') {
          updateStepStatus(step.id, 'error')
        }
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetSelection = () => {
    setSelectedDocument(null)
    setAnalysis(null)
    setError(null)
    setProgress(0)
    setShowDualAnalysis(false)
    setSteps(steps.map(step => ({ ...step, status: 'pending', duration: undefined })))
  }

  const selectedDoc = selectedDocument ? documentLibrary.find(d => d.id === selectedDocument) : null

  // Debug logging for animation state
  useEffect(() => {
    if (isProcessing) {
      console.log('📊 Animation State:', {
        step: steps.find(s => s.status === 'processing')?.name || 'none',
        progress: `${progress}%`,
        hasAnalysis: !!analysis,
        showingDualAI: showDualAnalysis,
        completedSteps: steps.filter(s => s.status === 'complete').length
      })
    }
  }, [isProcessing, progress, steps, analysis, showDualAnalysis])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hb-navy rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-hb-navy">Legal Document AI Analysis</h1>
                <p className="text-xs text-gray-500">Multi-Model Orchestration Demo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                View Dashboard
              </Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Demo Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {demoSections.map((section, idx) => (
            <Card key={idx} className="p-6 bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {section.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
              </div>
              {'stats' in section && section.stats ? (
                <div className="grid grid-cols-2 gap-4">
                  {section.stats.map((stat, i) => (
                    <div key={i} className="text-center p-3 bg-white rounded-lg border border-gray-100">
                      <div className="text-2xl font-bold text-hb-navy">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                      <div className="text-xs text-blue-600">{stat.detail}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {section.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <span className="text-sm text-gray-600">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800">{metric.value}</span>
                        <span className={`text-xs ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Document Selection with Full Content */}
        {!selectedDocument && (
          <div className="space-y-8 mb-8">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-hb-navy mb-3">Legal Document Library</h2>
                <p className="text-lg text-gray-600 mb-2">
                  View, edit, and analyze complete legal documents with AI-powered processing
                </p>
                <p className="text-sm text-gray-500">
                  Click on any document to view its full content • Edit documents before processing
                </p>
              </div>

              <div className="space-y-6">
                {documentLibrary.map((doc) => {
                  const sampleDoc = sampleDocuments[doc.id]
                  const isExpanded = expandedDoc === doc.id
                  const isEditing = editingDoc === doc.id
                  const content = editedContent[doc.id] || sampleDoc

                  return (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className={`border-2 transition-all overflow-hidden ${
                          isExpanded ? 'border-blue-400 shadow-xl' : 'hover:border-blue-300'
                        }`}
                      >
                        {/* Document Header - Always Visible */}
                        <div
                          className="p-6 bg-gradient-to-r from-gray-50 to-white cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => setExpandedDoc(isExpanded ? null : doc.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`p-3 rounded-lg bg-gradient-to-br ${doc.color} text-white`}>
                                {doc.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{doc.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{doc.type} • {doc.pages} pages</p>
                                {sampleDoc && (
                                  <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                                    {sampleDoc.parties && (
                                      <span><strong>Parties:</strong> {sampleDoc.parties.join(' vs ')}</span>
                                    )}
                                    {sampleDoc.effectiveDate && (
                                      <span><strong>Date:</strong> {sampleDoc.effectiveDate}</span>
                                    )}
                                    {sampleDoc.value && (
                                      <span><strong>Value:</strong> {sampleDoc.value}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                doc.complexity === 'Very High' ? 'bg-red-100 text-red-700' :
                                doc.complexity === 'High' ? 'bg-orange-100 text-orange-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {doc.complexity}
                              </span>
                              <div className="p-2">
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Expanded Full Document Content */}
                        {isExpanded && sampleDoc && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {/* Action Bar */}
                            <div className="px-6 py-3 bg-gray-50 border-t border-b flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">
                                  {isEditing ? 'Editing Mode' : 'Viewing Mode'}
                                </span>
                                {isEditing && (
                                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                                    Changes will be used for AI analysis
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {!isEditing ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setEditingDoc(doc.id)
                                      setEditedContent({
                                        ...editedContent,
                                        [doc.id]: content || sampleDoc
                                      })
                                    }}
                                  >
                                    <Edit3 className="w-4 h-4 mr-1" />
                                    Edit Document
                                  </Button>
                                ) : (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-green-600 border-green-600 hover:bg-green-50"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setEditingDoc(null)
                                      }}
                                    >
                                      <Save className="w-4 h-4 mr-1" />
                                      Save Changes
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 border-red-600 hover:bg-red-50"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setEditingDoc(null)
                                        setEditedContent({
                                          ...editedContent,
                                          [doc.id]: sampleDoc
                                        })
                                      }}
                                    >
                                      <X className="w-4 h-4 mr-1" />
                                      Cancel
                                    </Button>
                                  </>
                                )}
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDocumentSelect(doc.id)
                                  }}
                                >
                                  <Play className="w-4 h-4 mr-1" />
                                  Analyze with AI
                                </Button>
                              </div>
                            </div>

                            {/* View Mode Toggle */}
                            {fullDocuments[doc.id] && (
                              <div className="px-6 py-3 bg-blue-50 border-b">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-700">View Mode:</span>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        variant={viewMode === 'snippets' ? 'default' : 'outline'}
                                        onClick={() => setViewMode('snippets')}
                                        className="text-xs"
                                      >
                                        Summary View
                                      </Button>
                                      {fullDocuments[doc.id] && (
                                        <Button
                                          size="sm"
                                          variant={viewMode === 'full' ? 'default' : 'outline'}
                                          onClick={() => {
                                            setViewMode('full')
                                            if (!currentPage[doc.id]) setCurrentPage({ ...currentPage, [doc.id]: 1 })
                                          }}
                                          className="text-xs"
                                        >
                                          Full Document ({fullDocuments[doc.id]?.totalPages || doc.pages} Pages)
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                  {viewMode === 'full' && fullDocuments[doc.id] && (
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setCurrentPage({
                                          ...currentPage,
                                          [doc.id]: Math.max(1, (currentPage[doc.id] || 1) - 1)
                                        })}
                                        disabled={(currentPage[doc.id] || 1) === 1}
                                      >
                                        ← Previous
                                      </Button>
                                      <span className="text-sm font-medium px-3">
                                        Page {currentPage[doc.id] || 1} of {fullDocuments[doc.id].totalPages}
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setCurrentPage({
                                          ...currentPage,
                                          [doc.id]: Math.min(fullDocuments[doc.id].totalPages, (currentPage[doc.id] || 1) + 1)
                                        })}
                                        disabled={(currentPage[doc.id] || 1) === fullDocuments[doc.id].totalPages}
                                      >
                                        Next →
                                      </Button>
                                    </div>
                                  )}
                                </div>
                                {/* Page Quick Navigation */}
                                {viewMode === 'full' && fullDocuments[doc.id] && (
                                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className="text-xs text-gray-600">Quick Jump:</span>
                                    {fullDocuments[doc.id].totalPages > 10 ? (
                                      // For long documents (deposition), show key pages
                                      <>
                                        {[1, 2, 3, 23, 24, 127, 128, 201, 215, 45].map(pageNum => (
                                          <Button
                                            key={pageNum}
                                            size="sm"
                                            variant={(currentPage[doc.id] || 1) === pageNum ? 'default' : 'outline'}
                                            className="h-8 px-2 text-xs"
                                            onClick={() => setCurrentPage({ ...currentPage, [doc.id]: pageNum })}
                                          >
                                            {pageNum === 1 ? 'Caption' :
                                             pageNum === 3 ? 'Direct' :
                                             pageNum === 23 ? 'Tech' :
                                             pageNum === 127 ? 'Cross' :
                                             pageNum === 201 ? 'Redirect' :
                                             pageNum === 45 ? 'Cert' :
                                             `Pg ${pageNum}`}
                                          </Button>
                                        ))}
                                      </>
                                    ) : (
                                      // For short documents (NDA), show all pages
                                      Array.from({ length: fullDocuments[doc.id].totalPages }, (_, i) => i + 1).map(pageNum => (
                                        <Button
                                          key={pageNum}
                                          size="sm"
                                          variant={(currentPage[doc.id] || 1) === pageNum ? 'default' : 'outline'}
                                          className="w-8 h-8 p-0 text-xs"
                                          onClick={() => setCurrentPage({ ...currentPage, [doc.id]: pageNum })}
                                        >
                                          {pageNum}
                                        </Button>
                                      ))
                                    )}
                                    <span className="text-xs text-gray-500 ml-2">
                                      {fullDocuments[doc.id].pages[(currentPage[doc.id] || 1) - 1].title}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Full Document Content */}
                            <div className="p-6 max-h-[600px] overflow-y-auto">
                              <div className="space-y-8">
                                {viewMode === 'full' && fullDocuments[doc.id] ? (
                                  // Show full document page by page
                                  <div className="space-y-6">
                                    {(() => {
                                      const fullDoc = fullDocuments[doc.id]
                                      const page = fullDoc.pages[(currentPage[doc.id] || 1) - 1]
                                      return (
                                        <div className="space-y-4">
                                          {/* Page Header */}
                                          <div className="pb-4 border-b">
                                            <h3 className="text-xl font-bold text-gray-800">{page.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Page {page.pageNumber} of {fullDoc.totalPages}</p>
                                          </div>

                                          {/* Page Content - Special handling for depositions */}
                                          {isEditing ? (
                                            <textarea
                                              className="w-full p-6 bg-white border border-gray-300 rounded-lg text-sm leading-relaxed font-serif focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                              rows={20}
                                              value={page.content}
                                              onChange={(e) => {
                                                const newFullDoc = { ...fullDocuments[doc.id] }
                                                newFullDoc.pages[page.pageNumber - 1].content = e.target.value
                                                setEditedContent({
                                                  ...editedContent,
                                                  [doc.id]: newFullDoc
                                                })
                                              }}
                                              style={{ minHeight: '500px' }}
                                            />
                                          ) : (
                                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-inner">
                                              {fullDoc.documentType === 'Deposition Transcript' ? (
                                                // Special formatting for depositions
                                                <div className="deposition-content">
                                                  {page.content.split('\n').map((line, idx) => {
                                                    const isQuestion = line.startsWith('Q:')
                                                    const isAnswer = line.startsWith('A:')
                                                    const isExamination = line.includes('EXAMINATION') || line.includes('CROSS-EXAMINATION')
                                                    const isSpeaker = line.includes('BY MS.') || line.includes('BY MR.')

                                                    return (
                                                      <div
                                                        key={idx}
                                                        className={`
                                                          ${isQuestion ? 'font-semibold text-blue-900 mt-3' : ''}
                                                          ${isAnswer ? 'ml-4 text-gray-700 mt-2' : ''}
                                                          ${isExamination ? 'text-lg font-bold text-gray-900 mt-6 mb-3 border-b pb-2' : ''}
                                                          ${isSpeaker ? 'font-medium text-gray-600 mt-4' : ''}
                                                          ${!isQuestion && !isAnswer && !isExamination && !isSpeaker ? 'text-gray-600' : ''}
                                                          text-sm leading-relaxed
                                                        `}
                                                        style={{
                                                          fontFamily: isQuestion || isAnswer ? 'Courier New, monospace' : 'inherit'
                                                        }}
                                                      >
                                                        {line || '\u00A0'}
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              ) : (
                                                // Standard document formatting
                                                <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-serif">
                                                  {page.content}
                                                </pre>
                                              )}
                                            </div>
                                          )}

                                          {/* AI Annotations for this page */}
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                                              <div className="flex items-center gap-2 mb-3">
                                                <Eye className="w-5 h-5 text-purple-600" />
                                                <span className="font-semibold text-purple-700">GPT-4 Vision Analysis</span>
                                              </div>
                                              <ul className="space-y-2">
                                                {page.aiAnnotations.gptVision.map((annotation, idx) => (
                                                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                                                    <CheckCircle2 className="w-3 h-3 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                                                    <span>{annotation.text}</span>
                                                    <span className="text-gray-400 ml-2">
                                                      (pos: {annotation.position.x}, {annotation.position.y})
                                                    </span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                                              <div className="flex items-center gap-2 mb-3">
                                                <Brain className="w-5 h-5 text-blue-600" />
                                                <span className="font-semibold text-blue-700">Claude Legal Analysis</span>
                                              </div>
                                              <ul className="space-y-2">
                                                {page.aiAnnotations.claude.map((annotation, idx) => (
                                                  <li key={idx} className="text-xs text-gray-700 flex items-start">
                                                    <span className={`w-3 h-3 rounded-full mr-2 mt-0.5 flex-shrink-0 ${
                                                      annotation.type === 'positive' ? 'bg-green-500' :
                                                      annotation.type === 'warning' ? 'bg-orange-500' :
                                                      'bg-blue-500'
                                                    }`} />
                                                    <span>{annotation.text}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    })()}
                                  </div>
                                ) : (
                                  // Show summary snippets
                                  content?.snippets?.map((snippet: any, idx: number) => (
                                    <div key={idx} className="space-y-4">
                                    {/* Section Header */}
                                    <div className="flex items-center justify-between pb-2 border-b">
                                      <div>
                                        <h4 className="font-semibold text-gray-800">
                                          Page {snippet.page} - {snippet.section}
                                        </h4>
                                      </div>
                                      {snippet.highlights && (
                                        <div className="flex flex-wrap gap-1">
                                          {snippet.highlights.map((highlight: string, hIdx: number) => (
                                            <span
                                              key={hIdx}
                                              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
                                            >
                                              {highlight}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Document Text */}
                                    {isEditing ? (
                                      <textarea
                                        className="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm leading-relaxed focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                                        rows={8}
                                        value={snippet.content}
                                        onChange={(e) => {
                                          const newContent = { ...content }
                                          newContent.snippets[idx].content = e.target.value
                                          setEditedContent({
                                            ...editedContent,
                                            [doc.id]: newContent
                                          })
                                        }}
                                      />
                                    ) : (
                                      <div className="p-4 bg-white border border-gray-200 rounded-lg">
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                          {snippet.content}
                                        </p>
                                      </div>
                                    )}

                                    {/* AI Annotations */}
                                    {snippet.aiAnnotations && (
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                                          <div className="flex items-center gap-2 mb-2">
                                            <Eye className="w-4 h-4 text-purple-600" />
                                            <span className="font-semibold text-purple-700">GPT-4 Vision Analysis</span>
                                          </div>
                                          <ul className="space-y-1">
                                            {snippet.aiAnnotations.gpt4.map((annotation: string, aIdx: number) => (
                                              <li key={aIdx} className="text-xs text-gray-700 flex items-start">
                                                <CheckCircle2 className="w-3 h-3 text-purple-500 mt-0.5 mr-1 flex-shrink-0" />
                                                {annotation}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                                          <div className="flex items-center gap-2 mb-2">
                                            <Brain className="w-4 h-4 text-blue-600" />
                                            <span className="font-semibold text-blue-700">Claude Legal Analysis</span>
                                          </div>
                                          <ul className="space-y-1">
                                            {snippet.aiAnnotations.claude.map((annotation: string, aIdx: number) => (
                                              <li key={aIdx} className="text-xs text-gray-700 flex items-start">
                                                <CheckCircle2 className="w-3 h-3 text-blue-500 mt-0.5 mr-1 flex-shrink-0" />
                                                {annotation}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))
                                )}
                              </div>
                            </div>

                            {/* Analysis Results Summary (for NDA with full document) */}
                            {viewMode === 'full' && fullDocuments[doc.id] && currentPage[doc.id] === fullDocuments[doc.id].totalPages && (
                              <div className="px-6 pb-6">
                                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-blue-200">
                                  <h3 className="text-lg font-bold text-gray-800 mb-4">Complete Document Analysis Summary</h3>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* GPT-4 Vision Summary */}
                                    <div className="bg-white rounded-lg p-4 border border-purple-200">
                                      <div className="flex items-center gap-2 mb-3">
                                        <Eye className="w-5 h-5 text-purple-600" />
                                        <span className="font-semibold text-purple-700">GPT-4 Vision Results</span>
                                      </div>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Pages Scanned:</span>
                                          <span className="font-medium">{fullDocuments[doc.id].analysisResults.gptVisionSummary.documentsScanned}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Key Terms Found:</span>
                                          <span className="font-medium">{fullDocuments[doc.id].analysisResults.gptVisionSummary.keyTermsExtracted}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Signatures:</span>
                                          <span className="font-medium">{fullDocuments[doc.id].analysisResults.gptVisionSummary.signaturesDetected}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Processing Time:</span>
                                          <span className="font-medium text-green-600">{fullDocuments[doc.id].analysisResults.gptVisionSummary.executionTime}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Confidence:</span>
                                          <span className="font-medium text-blue-600">{(fullDocuments[doc.id].analysisResults.gptVisionSummary.confidence * 100).toFixed(0)}%</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Claude Analysis Summary */}
                                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                                      <div className="flex items-center gap-2 mb-3">
                                        <Brain className="w-5 h-5 text-blue-600" />
                                        <span className="font-semibold text-blue-700">Claude Legal Analysis</span>
                                      </div>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Risk Level:</span>
                                          <span className={`font-medium ${
                                            fullDocuments[doc.id].analysisResults.claudeAnalysis.riskLevel === 'High' ? 'text-red-600' :
                                            fullDocuments[doc.id].analysisResults.claudeAnalysis.riskLevel === 'Medium' ? 'text-orange-600' :
                                            'text-green-600'
                                          }`}>
                                            {fullDocuments[doc.id].analysisResults.claudeAnalysis.riskLevel}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Contract Score:</span>
                                          <span className="font-medium">{fullDocuments[doc.id].analysisResults.claudeAnalysis.contractScore}/100</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Key Risks:</span>
                                          <span className="font-medium text-orange-600">{fullDocuments[doc.id].analysisResults.claudeAnalysis.keyRisks.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Processing Time:</span>
                                          <span className="font-medium text-green-600">{fullDocuments[doc.id].analysisResults.claudeAnalysis.executionTime}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Overall Metrics */}
                                  <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                      <div>
                                        <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                                        <p className="text-2xl font-bold text-gray-800">{fullDocuments[doc.id].analysisResults.timeSaved}</p>
                                        <p className="text-xs text-gray-600">Time Saved</p>
                                      </div>
                                      <div>
                                        <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-1" />
                                        <p className="text-2xl font-bold text-gray-800">{fullDocuments[doc.id].analysisResults.costSaved}</p>
                                        <p className="text-xs text-gray-600">Cost Saved</p>
                                      </div>
                                      <div>
                                        <CheckCircle2 className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                                        <p className="text-2xl font-bold text-gray-800">{fullDocuments[doc.id].analysisResults.accuracy}</p>
                                        <p className="text-xs text-gray-600">Accuracy</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Document Footer with Actions */}
                            <div className="px-6 py-4 bg-gray-50 border-t">
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                  <Clock className="w-4 h-4 inline mr-1" />
                                  Processing time: {doc.processingTime}
                                </div>
                                <Button
                                  className="bg-hb-navy hover:bg-hb-darkblue text-white"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDocumentSelect(doc.id)
                                  }}
                                >
                                  <Play className="w-5 h-5 mr-2" />
                                  Start AI Analysis
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </div>
        )}

        {/* Selected Document & Processing */}
        {selectedDocument && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Document Info & Processing */}
            <div className="lg:col-span-1 space-y-6">
              {/* Document Card */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Selected Document</h3>
                  {!isProcessing && !analysis && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetSelection}
                      className="text-gray-500"
                    >
                      Change
                    </Button>
                  )}
                </div>
                {selectedDoc && (
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${selectedDoc.color} text-white inline-block`}>
                      {selectedDoc.icon}
                    </div>
                    <h4 className="font-bold text-gray-900">{selectedDoc.name}</h4>
                    <p className="text-sm text-gray-600">{selectedDoc.description}</p>
                    <div className="pt-3 border-t space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium">{selectedDoc.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Pages:</span>
                        <span className="font-medium">{selectedDoc.pages}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Complexity:</span>
                        <span className="font-medium">{selectedDoc.complexity}</span>
                      </div>
                    </div>
                    {!analysis && (
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                        onClick={handleProcess}
                        disabled={isProcessing}
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 mr-2" />
                            Start AI Analysis
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </Card>

              {/* Processing Steps */}
              {(isProcessing || analysis) && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Processing Pipeline
                  </h3>

                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          step.status === 'complete' ? 'bg-green-50 border border-green-200' :
                          step.status === 'processing' ? 'bg-blue-50 border border-blue-200' :
                          step.status === 'error' ? 'bg-red-50 border border-red-200' :
                          'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className={`p-2 rounded-full ${
                          step.status === 'complete' ? 'bg-green-500 text-white' :
                          step.status === 'processing' ? 'bg-blue-500 text-white animate-pulse' :
                          step.status === 'error' ? 'bg-red-500 text-white' :
                          'bg-gray-300 text-gray-600'
                        }`}>
                          {step.status === 'processing' ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : step.status === 'complete' ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : step.status === 'error' ? (
                            <AlertCircle className="w-5 h-5" />
                          ) : (
                            step.icon
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{step.name}</p>
                          {step.duration && (
                            <p className="text-xs text-gray-500">{step.duration}s</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {isProcessing && (
                    <div className="mt-4 space-y-3">
                      <Progress value={progress} className="h-2" />
                      <div className="text-center space-y-1">
                        <p className="text-xs text-gray-500">
                          {progress}% Complete
                        </p>
                        {loadingMessage && (
                          <motion.p
                            key={loadingMessage}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="text-xs text-blue-600 font-medium"
                          >
                            {loadingMessage}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  )}
                </Card>
              )}
            </div>

            {/* Center/Right Column - Dual AI Analysis AND Results */}
            <div className="lg:col-span-2 space-y-6">
              {showDualAnalysis && (
                <DualAIAnalysis
                  isAnalyzing={isProcessing}
                  documentName={selectedDocument}
                  documentType={
                    selectedDocument.includes('nda') ? 'Non-Disclosure Agreement' :
                    selectedDocument.includes('deposition') ? 'Deposition Transcript' :
                    selectedDocument.includes('contract') ? 'Service Agreement' :
                    selectedDocument.includes('discovery') ? 'Discovery Request' :
                    'Legal Document'
                  }
                />
              )}

              {analysis && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Performance Metrics */}
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        AI Analysis Complete: {selectedDoc?.name}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-600">
                            {((analysis?.gpt4Vision?.processingTime || 0) + (analysis?.claudeSonnet?.processingTime || 0) / 1000).toFixed(1)}s
                          </p>
                          <p className="text-xs text-gray-500">Processing Time</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-green-600">
                            ${analysis?.combined?.estimatedSavings?.cost || 487}
                          </p>
                          <p className="text-xs text-gray-500">Cost Saved</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600">
                            {((analysis?.gpt4Vision?.confidence || 0.94) * 100).toFixed(0)}%
                          </p>
                          <p className="text-xs text-gray-500">Confidence</p>
                        </div>
                      </div>
                    </Card>

                    {/* GPT-4 Vision Extraction Results */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-purple-500" />
                        GPT-4 Vision Document Extraction
                      </h3>
                      <div className="space-y-2">
                        {analysis?.gpt4Vision?.extractedElements?.slice(0, 5).map((element, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <p className="text-sm text-gray-700">{element}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Confidence: {((analysis?.gpt4Vision?.confidence || 0.94) * 100).toFixed(0)}% •
                          Extracted {analysis?.gpt4Vision?.extractedElements?.length || 0} key elements
                        </p>
                      </div>
                    </Card>

                    {/* Claude Legal Analysis */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-blue-500" />
                        Claude Legal Analysis
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 mb-2">Key Insights</h4>
                          <div className="space-y-2">
                            {analysis?.claudeSonnet?.legalAnalysis?.slice(0, 3).map((insight, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="text-blue-500 text-xs mt-0.5">•</span>
                                <p className="text-sm text-gray-700">{insight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {analysis?.claudeSonnet?.keyTerms && analysis.claudeSonnet.keyTerms.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-yellow-600 mb-2">Important Considerations</h4>
                            <div className="space-y-2">
                              {analysis.claudeSonnet.keyTerms.slice(0, 2).map((term, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                  <p className="text-sm text-gray-700">{term}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* Key Findings */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Key Findings
                      </h3>
                      <div className="space-y-3">
                        {analysis?.combined?.criticalFindings?.map((finding, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{finding}</p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Special display for service agreements */}
                    {selectedDocument?.includes('contract') && (
                      <>
                        {/* Financial Impact Analysis */}
                        <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-l-4 border-green-500">
                          <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                            <DollarSign className="w-5 h-5" />
                            Financial Impact Analysis
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                              <div className="text-2xl font-bold text-green-600">$7.2M</div>
                              <div className="text-xs text-gray-600">Total 3-Year Commitment</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg border border-red-200">
                              <div className="text-2xl font-bold text-red-600">$3.6M</div>
                              <div className="text-xs text-gray-600">Max Early Termination</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                              <div className="text-2xl font-bold text-blue-600">99.9%</div>
                              <div className="text-xs text-gray-600">Required Uptime</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                              <div className="text-2xl font-bold text-purple-600">19%</div>
                              <div className="text-xs text-gray-600">6-Year Price Increase</div>
                            </div>
                          </div>
                        </Card>

                        {/* SLA Calculator */}
                        <Card className="p-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                            SLA Impact Calculator
                          </h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b bg-gray-50">
                                  <th className="text-left p-2">Availability</th>
                                  <th className="text-right p-2">Downtime/Month</th>
                                  <th className="text-right p-2">Credit %</th>
                                  <th className="text-right p-2">Credit Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-2">99.5% - 99.89%</td>
                                  <td className="text-right p-2 text-gray-600">3.6 - 43 min</td>
                                  <td className="text-right p-2">5%</td>
                                  <td className="text-right p-2 font-semibold">$10,000</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-2">99.0% - 99.49%</td>
                                  <td className="text-right p-2 text-gray-600">44 min - 7.2 hrs</td>
                                  <td className="text-right p-2">10%</td>
                                  <td className="text-right p-2 font-semibold">$20,000</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                  <td className="p-2">98.0% - 98.99%</td>
                                  <td className="text-right p-2 text-gray-600">7.3 - 14.4 hrs</td>
                                  <td className="text-right p-2">25%</td>
                                  <td className="text-right p-2 font-semibold">$50,000</td>
                                </tr>
                                <tr className="hover:bg-red-50">
                                  <td className="p-2">Below 98.0%</td>
                                  <td className="text-right p-2 text-gray-600">&gt; 14.4 hrs</td>
                                  <td className="text-right p-2">50%</td>
                                  <td className="text-right p-2 font-semibold text-red-600">$100,000</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                            <p className="text-xs text-amber-800">
                              <strong>⚠️ Note:</strong> 99.9% uptime allows only 43.8 minutes of downtime per month.
                              This is extremely difficult to maintain for complex enterprise systems.
                            </p>
                          </div>
                        </Card>
                      </>
                    )}

                    {/* Special display for deposition testimony */}
                    {selectedDocument?.includes('deposition') && (
                      <>
                        {/* Expert & Defects Analysis */}
                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
                          <h4 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Expert Analysis Summary
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <h5 className="font-medium text-purple-700 text-sm">Expert Credentials</h5>
                              <ul className="text-xs space-y-1 text-gray-600">
                                <li>• Dr. Sarah Elizabeth Williams, PhD MIT</li>
                                <li>• 22 years experience, PE licensed in 4 states</li>
                                <li>• 47 prior expert testimonies</li>
                                <li>• Professor of Mechanical Engineering</li>
                              </ul>
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-medium text-red-700 text-sm">Three Critical Defects Found</h5>
                              <ul className="text-xs space-y-1 text-gray-600">
                                <li>• <span className="font-semibold">Defect #1:</span> Tensile strength 26% below spec</li>
                                <li>• <span className="font-semibold">Defect #2:</span> Weld penetration only 60%</li>
                                <li>• <span className="font-semibold">Defect #3:</span> Safety mechanism failed at 150%</li>
                                <li className="text-red-600 font-semibold">• 127 QC violations documented</li>
                              </ul>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-l-4 border-purple-500">
                          <h4 className="font-semibold text-purple-900 mb-4 flex items-center gap-2">
                            <Gavel className="w-5 h-5" />
                            Critical Testimony Extracted
                          </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-white rounded-lg border border-purple-200">
                            <span className="font-medium text-purple-700">Page 23:</span>
                            <span className="block mt-1 italic text-sm text-gray-700">
                              "Tensile strength only 48,000 PSI - 26% below specification of 65,000 PSI required"
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-purple-200">
                            <span className="font-medium text-purple-700">Page 24:</span>
                            <span className="block mt-1 italic text-sm text-gray-700">
                              "127 instances of below-spec products approved for shipment despite QC failures"
                            </span>
                          </div>
                          <div className="p-3 bg-white rounded-lg border border-purple-200">
                            <span className="font-medium text-purple-700">Page 201:</span>
                            <span className="block mt-1 italic text-sm text-gray-700">
                              "Expert declined plaintiff case last year when evidence didn't support claim"
                            </span>
                          </div>
                        </div>

                        {/* Deposition-specific metrics */}
                        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-200">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">487</div>
                            <div className="text-xs text-gray-500">Questions Analyzed</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">47</div>
                            <div className="text-xs text-gray-500">Key Facts</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">23</div>
                            <div className="text-xs text-gray-500">Objections</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">87%</div>
                            <div className="text-xs text-gray-500">Credibility Score</div>
                          </div>
                        </div>
                      </Card>
                      </>
                    )}

                    {/* Risk Assessment */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        Risk Assessment
                      </h3>
                      <div className="space-y-3">
                        {analysis?.claudeSonnet?.risks?.map((risk, i) => (
                          <div
                            key={i}
                            className={`p-4 rounded-lg ${
                              risk.level === 'High' ? 'bg-red-50 border border-red-200' :
                              risk.level === 'Medium' ? 'bg-orange-50 border border-orange-200' :
                              'bg-yellow-50 border border-yellow-200'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{risk.type}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                risk.level === 'High' ? 'bg-red-100 text-red-700' :
                                risk.level === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {risk.level.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{risk.description}</p>
                            <p className="text-xs text-gray-500">
                              <strong>Mitigation:</strong> {risk.mitigation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Recommendations */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        AI Recommendations
                      </h3>
                      <ol className="space-y-3">
                        {analysis?.claudeSonnet?.recommendations?.map((rec, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </span>
                            <p className="text-sm text-gray-700">{rec}</p>
                          </li>
                        ))}
                      </ol>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Button
                        className="flex-1"
                        onClick={() => router.push('/dashboard')}
                      >
                        View Full Dashboard
                      </Button>
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={resetSelection}
                      >
                        Analyze Another Document
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {!analysis && !isProcessing && !showDualAnalysis && (
                <Card className="p-12 text-center">
                  <Brain className="w-20 h-20 mx-auto mb-6 text-gray-300" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    Ready for AI Analysis
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Select a document and click "Start AI Analysis" to see GPT-4 Vision and Claude
                    work together to extract insights from legal documents
                  </p>
                </Card>
              )}

              {error && (
                <Card className="p-6 bg-red-50 border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Processing Error</p>
                      <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}