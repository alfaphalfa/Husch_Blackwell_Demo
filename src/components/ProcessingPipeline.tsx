'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Eye,
  Brain,
  Shield,
  TrendingUp,
  CheckCircle2,
  Loader2,
  Clock
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ProcessingStep {
  id: string
  name: string
  icon: React.ReactNode
  status: 'pending' | 'processing' | 'complete' | 'error'
  duration?: number
}

interface ProcessingPipelineProps {
  document?: any
  onComplete?: (analysis: any) => void
}

export function ProcessingPipeline({ document, onComplete }: ProcessingPipelineProps) {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: 'upload', name: 'Document Selection', icon: <FileText className="w-5 h-5" />, status: 'complete' },
    { id: 'vision', name: 'GPT-4 Vision Extraction', icon: <Eye className="w-5 h-5" />, status: 'pending' },
    { id: 'analysis', name: 'Claude Deep Analysis', icon: <Brain className="w-5 h-5" />, status: 'pending' },
    { id: 'risk', name: 'Risk Assessment', icon: <Shield className="w-5 h-5" />, status: 'pending' },
    { id: 'actions', name: 'Generate Recommendations', icon: <TrendingUp className="w-5 h-5" />, status: 'pending' }
  ])
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(20)

  useEffect(() => {
    if (!document) return

    // Simulate processing pipeline
    const processSteps = async () => {
      const stepDurations = [2000, 3000, 2500, 1500, 2000]

      for (let i = 1; i < steps.length; i++) {
        // Update current step to processing
        setSteps(prev => prev.map((step, idx) =>
          idx === i ? { ...step, status: 'processing' } : step
        ))
        setCurrentStep(i + 1)
        setProgress((i + 1) * 20)

        // Wait for step duration
        await new Promise(resolve => setTimeout(resolve, stepDurations[i]))

        // Mark step as complete
        setSteps(prev => prev.map((step, idx) =>
          idx === i ? { ...step, status: 'complete', duration: stepDurations[i] / 1000 } : step
        ))
      }

      // Complete the pipeline
      if (onComplete) {
        onComplete({
          keyFindings: [
            'Document analyzed successfully',
            'Key risks identified',
            'Recommendations generated'
          ],
          risks: [
            { level: 'high', description: 'Critical clause missing' },
            { level: 'medium', description: 'Ambiguous terms found' }
          ],
          recommendations: [
            'Review section 3.2 for clarity',
            'Add termination clause',
            'Define payment terms explicitly'
          ],
          processingTime: 11.0,
          confidence: 0.94
        })
      }
    }

    processSteps()
  }, [document])

  if (!document) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">Select a document to begin processing</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">AI Processing Pipeline</h3>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-2">
            Step {currentStep} of {steps.length}
          </p>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                step.status === 'complete' ? 'bg-green-50 border-green-200' :
                step.status === 'processing' ? 'bg-blue-50 border-blue-200' :
                step.status === 'error' ? 'bg-red-50 border-red-200' :
                'bg-gray-50 border-gray-200'
              }`}
            >
              <div className={`p-2 rounded-full ${
                step.status === 'complete' ? 'bg-green-100' :
                step.status === 'processing' ? 'bg-blue-100' :
                step.status === 'error' ? 'bg-red-100' :
                'bg-gray-100'
              }`}>
                {step.status === 'processing' ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : step.status === 'complete' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="text-gray-400">{step.icon}</div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    step.status === 'complete' ? 'text-green-700' :
                    step.status === 'processing' ? 'text-blue-700' :
                    'text-gray-600'
                  }`}>
                    {step.name}
                  </span>
                  {step.duration && (
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.duration}s
                    </span>
                  )}
                </div>
                {step.status === 'processing' && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                    className="h-1 bg-blue-400 rounded-full mt-2"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {steps.every(s => s.status === 'complete') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Processing Complete!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Document analyzed successfully. View results below.
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  )
}

export default ProcessingPipeline