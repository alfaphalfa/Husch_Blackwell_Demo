'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Eye,
  Scan,
  FileSearch,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Zap,
  Layers,
  FileText,
  Activity,
  Target,
  AlertCircle,
  Sparkles,
  BarChart3
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface DualAIAnalysisProps {
  isAnalyzing: boolean
  documentName: string
  documentType: string
  onComplete?: (results: any) => void
}

export default function DualAIAnalysis({ isAnalyzing, documentName, documentType, onComplete }: DualAIAnalysisProps) {
  const [gptProgress, setGptProgress] = useState(0)
  const [claudeProgress, setClaudeProgress] = useState(0)
  const [gptStatus, setGptStatus] = useState('Initializing...')
  const [claudeStatus, setClaudeStatus] = useState('Initializing...')
  const [gptFindings, setGptFindings] = useState<string[]>([])
  const [claudeFindings, setClaudeFindings] = useState<string[]>([])
  const [visualElements, setVisualElements] = useState<string[]>([])
  const [riskItems, setRiskItems] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    if (!isAnalyzing && gptProgress > 0) {
      // Show completion state - keep all findings visible
      setGptProgress(100)
      setClaudeProgress(100)
      setGptStatus('Analysis Complete ✓')
      setClaudeStatus('Analysis Complete ✓')
      // Don't clear findings - keep them visible
      return
    }

    if (!isAnalyzing) {
      // Only reset if we haven't started yet
      return
    }

    // Simulate GPT-4 Vision processing
    const gptSteps = [
      { progress: 10, status: 'Scanning document pages...', delay: 500 },
      { progress: 25, status: 'Detecting visual elements...', delay: 1000 },
      { progress: 40, status: 'Extracting text and layout...', delay: 1500 },
      { progress: 60, status: 'Identifying key sections...', delay: 2000 },
      { progress: 80, status: 'Analyzing signatures and tables...', delay: 2500 },
      { progress: 100, status: 'Analysis complete', delay: 3000 }
    ]

    const claudeSteps = [
      { progress: 10, status: 'Loading document...', delay: 300 },
      { progress: 20, status: 'Parsing legal language...', delay: 800 },
      { progress: 35, status: 'Identifying obligations...', delay: 1300 },
      { progress: 50, status: 'Assessing risk factors...', delay: 1800 },
      { progress: 70, status: 'Cross-referencing precedents...', delay: 2300 },
      { progress: 85, status: 'Generating recommendations...', delay: 2800 },
      { progress: 100, status: 'Analysis complete', delay: 3300 }
    ]

    // Run GPT-4 Vision simulation
    gptSteps.forEach(step => {
      setTimeout(() => {
        setGptProgress(step.progress)
        setGptStatus(step.status)

        // Add findings progressively
        if (step.progress === 25) {
          setVisualElements([
            '✓ Signature blocks identified (Page 8)',
            '✓ Company logos extracted'
          ])
        }
        if (step.progress === 60) {
          setVisualElements(prev => [...prev,
            '✓ Tables and exhibits mapped',
            '✓ Handwritten annotations found'
          ])

          // Set findings based on document type
          if (documentType === 'Service Agreement' || documentType === 'Service Contract') {
            setGptFindings([
              'Contract parties: Global Solutions Inc. & Enterprise Partners LLC',
              'Contract value: $2,400,000 annually ($200,000/month)',
              'Initial term: 3 years with automatic renewal',
              'SLA requirement: 99.9% monthly uptime'
            ])
          } else if (documentType === 'Deposition Transcript') {
            setGptFindings([
              'Witness: Dr. Sarah Elizabeth Williams, PhD MIT',
              'Case: Williams v. Acme Corporation, Case No. 2024-CV-1847',
              'Experience: 22 years, PE licensed in 4 states',
              'Key finding: THREE critical design flaws identified'
            ])
          } else if (documentType === 'Discovery Request' || documentType === 'Document Request') {
            setGptFindings([
              'Total requests: 73 document categories',
              'Time period: January 1, 2020 to present (5+ years)',
              'Estimated documents: 2.4 million pages',
              'Key focus: Merger valuation and antitrust concerns'
            ])
          } else {
            // Default to NDA
            setGptFindings([
              'Contract parties: TechCo Inc. and DataFlow Systems',
              'Contract type: Mutual Non-Disclosure Agreement',
              'Effective date: January 15, 2025',
              'Term duration: 3 years'
            ])
          }
        }
        if (step.progress === 100) {
          // Set additional findings based on document type
          if (documentType === 'Service Agreement' || documentType === 'Service Contract') {
            setGptFindings(prev => [...prev,
              'Service credits: 5% to 50% based on downtime',
              'Termination: 180 days notice, early termination penalties',
              'Annual increases: Greater of 3% or CPI',
              'Insurance: $5M Cyber, $5M Professional, $2M General'
            ])
          } else if (documentType === 'Deposition Transcript') {
            setGptFindings(prev => [...prev,
              'Defect #1: Tensile strength 48,000 PSI (26% below spec)',
              'Defect #2: Weld penetration only 60% (85% required)',
              'Defect #3: Safety mechanism failed at 150% load',
              'QC violations: 127 below-spec products approved'
            ])
          } else if (documentType === 'Discovery Request' || documentType === 'Document Request') {
            setGptFindings(prev => [...prev,
              'Communication platforms: Email, Slack, Teams, Signal',
              'Custodians: 47 individuals including C-suite',
              'Third party subpoenas: 12 investment banks',
              'Privilege log: Document-by-document required'
            ])
          } else {
            // Default to NDA
            setGptFindings(prev => [...prev,
              'Governing law: Delaware',
              'Confidentiality scope: Broad definition detected',
              'Termination clause: 30-day notice period',
              'Missing: Dispute resolution mechanism'
            ])
          }
        }
      }, step.delay)
    })

    // Run Claude Sonnet simulation
    claudeSteps.forEach(step => {
      setTimeout(() => {
        setClaudeProgress(step.progress)
        setClaudeStatus(step.status)

        // Add risk assessment progressively
        if (step.progress === 50) {
          setRiskItems([
            { type: 'Liability Exposure', level: 'high', score: 85 },
            { type: 'IP Rights', level: 'medium', score: 60 }
          ])
        }
        if (step.progress === 70) {
          setRiskItems(prev => [...prev,
            { type: 'Termination Risk', level: 'low', score: 30 },
            { type: 'Compliance Risk', level: 'medium', score: 55 }
          ])
          // Set Claude findings based on document type
          if (documentType === 'Service Agreement' || documentType === 'Service Contract') {
            setClaudeFindings([
              '99.9% SLA extremely difficult to maintain consistently',
              'Early termination penalties could exceed $3.6M',
              '180-day termination notice is excessive',
              'Service credits inadequate for business-critical failures'
            ])
          } else if (documentType === 'Deposition Transcript') {
            setClaudeFindings([
              'Expert credentials impeccable - MIT PhD and professor',
              'Three independent design flaws create "perfect storm"',
              '127 QC violations show pattern of negligence',
              'Testimony links all defects directly to incident'
            ])
          } else if (documentType === 'Discovery Request' || documentType === 'Document Request') {
            setClaudeFindings([
              'Scope suggests harassment strategy by opposing counsel',
              '5-year lookback period likely overbroad',
              'Personal device searches raise privacy concerns',
              'Estimated $875,000 review cost disproportionate'
            ])
          } else {
            // Default to NDA
            setClaudeFindings([
              'Broad confidentiality definition may be overly inclusive',
              'Potential conflict with state privacy laws identified',
              'Unlimited liability exposure in Section 5.3',
              'Missing arbitration clause increases litigation risk'
            ])
          }
        }
        if (step.progress === 85) {
          // Set recommendations based on document type
          if (documentType === 'Service Agreement' || documentType === 'Service Contract') {
            setRecommendations([
              'CRITICAL: Negotiate Initial Term down to 1-2 years',
              'CRITICAL: Reduce termination notice to 90 days',
              'HIGH: Add termination right for 3+ months SLA failures',
              'HIGH: Remove 3% floor on increases - tie to CPI only',
              'MEDIUM: Clarify IP ownership for custom solutions'
            ])
          } else if (documentType === 'Deposition Transcript') {
            setRecommendations([
              'IMMEDIATE: File Daubert motion to establish methodology',
              'Create visual demonstrative showing three-failure cascade',
              'Emphasize 127 QC violations for punitive damages',
              'Prepare redirect to address 75% plaintiff bias',
              'Use declined case example to show objectivity'
            ])
          } else if (documentType === 'Discovery Request' || documentType === 'Document Request') {
            setRecommendations([
              'File emergency protective order and motion to quash',
              'Propose phased discovery (start with 5 custodians)',
              'Challenge 5-year timeframe as disproportionate',
              'Negotiate focused search terms and date ranges',
              'Request cost-shifting for overbroad requests'
            ])
          } else {
            // Default to NDA
            setRecommendations([
              'Review limitation of liability clause (Section 7.2)',
              'Clarify IP ownership provisions',
              'Add data breach notification requirements',
              'Include specific dispute resolution mechanism',
              'Define "confidential information" more precisely'
            ])
          }
        }
        if (step.progress === 100 && onComplete) {
          setTimeout(() => {
            onComplete({
              gpt: { findings: gptFindings, visual: visualElements },
              claude: { findings: claudeFindings, risks: riskItems, recommendations }
            })
          }, 500)
        }
      }, step.delay)
    })
  }, [isAnalyzing])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isAnalyzing ? 'Dual AI Analysis in Progress' : 'Dual AI Analysis Complete'}
          </h2>
          <p className="text-gray-600">
            GPT-4 Vision and Claude Sonnet {isAnalyzing ? 'analyzing' : 'analyzed'}: <span className="font-semibold">{documentName}</span>
          </p>
          {!isAnalyzing && gptProgress === 100 && (
            <div className="mt-2 flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Analysis successfully completed</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GPT-4 Vision Panel */}
          <Card className="p-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900">GPT-4 Vision Analysis</h3>
                  <p className="text-xs text-purple-600">{gptStatus}</p>
                </div>
              </div>
              {gptProgress === 100 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600" />
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Page Scanning</span>
                <span>{gptProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                  animate={{ width: `${gptProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Extracted Information */}
            {gptFindings.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Extracted Information</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {gptFindings.map((finding, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xs p-2 bg-purple-100 rounded flex items-start gap-2"
                    >
                      <Sparkles className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>{finding}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Visual Elements */}
            {visualElements.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Visual Elements Detected</h4>
                <div className="space-y-1">
                  {visualElements.map((element, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xs text-gray-600"
                    >
                      {element}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Processing Animation */}
            {gptProgress > 0 && gptProgress < 100 && (
              <div className="mt-4 flex items-center justify-center">
                <div className="relative">
                  <Scan className="w-8 h-8 text-purple-400 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-ping" />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Claude Sonnet Panel */}
          <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">Claude Analysis</h3>
                  <p className="text-xs text-blue-600">{claudeStatus}</p>
                </div>
              </div>
              {claudeProgress === 100 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Deep Analysis</span>
                <span>{claudeProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  animate={{ width: `${claudeProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Legal Interpretation */}
            {claudeFindings.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Legal Interpretation</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {claudeFindings.map((finding, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xs p-2 bg-blue-100 rounded flex items-start gap-2"
                    >
                      <AlertCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{finding}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Assessment */}
            {riskItems.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Risk Analysis</h4>
                <div className="space-y-2">
                  {riskItems.map((risk, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-xs font-medium text-gray-700">{risk.type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full ${
                              risk.level === 'high' ? 'bg-red-500' :
                              risk.level === 'medium' ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${risk.score}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          risk.level === 'high' ? 'bg-red-100 text-red-700' :
                          risk.level === 'medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {risk.level.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommended Actions</h4>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {recommendations.map((rec, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xs text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-blue-600">{idx + 1}.</span>
                      <span>{rec}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Processing Animation */}
            {claudeProgress > 0 && claudeProgress < 100 && (
              <div className="mt-4 flex items-center justify-center">
                <div className="relative">
                  <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-blue-600 animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Combined Insights */}
        {gptProgress === 100 && claudeProgress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-800">
                  Analysis Complete
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-700">
                    {gptFindings.length + visualElements.length} GPT-4 Insights
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-gray-700">
                    {claudeFindings.length + recommendations.length} Claude Findings
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}

export { DualAIAnalysis }