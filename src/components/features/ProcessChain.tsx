'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export interface ProcessStep {
  id: string
  name: string
  description: string
  status: 'pending' | 'in-progress' | 'completed' | 'error'
  duration: number
  icon: string
  error?: string
}

interface ProcessChainProps {
  steps: ProcessStep[]
  isProcessing: boolean
  onComplete?: () => void
  className?: string
}

export function ProcessChain({
  steps,
  isProcessing,
  onComplete,
  className = ''
}: ProcessChainProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [animatedSteps, setAnimatedSteps] = useState(steps)

  useEffect(() => {
    setAnimatedSteps(steps)
  }, [steps])

  useEffect(() => {
    if (!isProcessing) return

    const interval = setInterval(() => {
      setAnimatedSteps(prev => {
        const newSteps = [...prev]
        const currentStep = newSteps.find(step => step.status === 'in-progress')

        if (currentStep) {
          // Complete current step
          currentStep.status = 'completed'

          // Start next step
          const currentIndex = newSteps.findIndex(step => step.id === currentStep.id)
          const nextStep = newSteps[currentIndex + 1]

          if (nextStep && nextStep.status === 'pending') {
            nextStep.status = 'in-progress'
            setCurrentStepIndex(currentIndex + 1)
          } else {
            // All steps completed
            if (onComplete) {
              setTimeout(onComplete, 1000)
            }
          }
        } else {
          // Start first pending step
          const firstPending = newSteps.find(step => step.status === 'pending')
          if (firstPending) {
            firstPending.status = 'in-progress'
            setCurrentStepIndex(newSteps.findIndex(step => step.id === firstPending.id))
          }
        }

        return newSteps
      })
    }, 2000) // Change step every 2 seconds for demo

    return () => clearInterval(interval)
  }, [isProcessing, onComplete])

  const completedSteps = animatedSteps.filter(step => step.status === 'completed').length
  const totalSteps = animatedSteps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-hb-navy">
            AI Processing Pipeline
          </h3>
          <span className="text-sm text-gray-600">
            {completedSteps} of {totalSteps} steps
          </span>
        </div>

        <Progress
          value={progressPercentage}
          className="h-3"
        />

        {isProcessing && (
          <div className="text-sm text-hb-blue animate-pulse">
            Processing your document...
          </div>
        )}
      </div>

      {/* Process Steps */}
      <div className="space-y-4">
        {animatedSteps.map((step, index) => (
          <ProcessStepCard
            key={step.id}
            step={step}
            isActive={step.status === 'in-progress'}
            isCompleted={step.status === 'completed'}
            hasError={step.status === 'error'}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Processing Summary */}
      {completedSteps === totalSteps && (
        <Card className="p-4 bg-green-50 border-green-200 animate-fade-in">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✅</span>
            <div>
              <h4 className="font-semibold text-green-800">
                Processing Complete!
              </h4>
              <p className="text-sm text-green-700">
                Your document has been analyzed and is ready for review.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

interface ProcessStepCardProps {
  step: ProcessStep
  isActive: boolean
  isCompleted: boolean
  hasError: boolean
  delay: number
}

function ProcessStepCard({
  step,
  isActive,
  isCompleted,
  hasError,
  delay
}: ProcessStepCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const getCardClasses = () => {
    const baseClasses = "p-4 transition-all duration-500 transform"

    if (!isVisible) {
      return `${baseClasses} opacity-0 translate-x-4`
    }

    if (hasError) {
      return `${baseClasses} opacity-100 translate-x-0 border-red-300 bg-red-50 shadow-sm`
    }

    if (isCompleted) {
      return `${baseClasses} opacity-100 translate-x-0 border-green-300 bg-green-50 shadow-sm`
    }

    if (isActive) {
      return `${baseClasses} opacity-100 translate-x-0 border-hb-blue bg-hb-blue/5 shadow-md animate-pulse`
    }

    return `${baseClasses} opacity-60 translate-x-0 border-gray-200 bg-gray-50`
  }

  const getIconClasses = () => {
    const baseClasses = "text-2xl transition-all duration-300"

    if (hasError) return `${baseClasses} animate-shake`
    if (isActive) return `${baseClasses} animate-spin-slow`
    if (isCompleted) return `${baseClasses} animate-bounce-once`

    return baseClasses
  }

  const getStatusIcon = () => {
    if (hasError) return '❌'
    if (isCompleted) return '✅'
    if (isActive) return step.icon
    return step.icon
  }

  const getDurationDisplay = () => {
    if (isCompleted && step.duration > 0) {
      return `${step.duration.toFixed(1)}s`
    }
    if (isActive) {
      return 'Processing...'
    }
    return ''
  }

  return (
    <Card className={getCardClasses()}>
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className={getIconClasses()}>
          {getStatusIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 truncate">
              {step.name}
            </h4>

            <span className="text-sm text-gray-500 ml-2">
              {getDurationDisplay()}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            {step.description}
          </p>

          {/* Progress bar for active step */}
          {isActive && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div
                className="bg-hb-blue h-1.5 rounded-full transition-all duration-1000 animate-pulse"
                style={{ width: '60%' }}
              />
            </div>
          )}

          {/* Error message */}
          {hasError && step.error && (
            <div className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">
              {step.error}
            </div>
          )}

          {/* Completion indicator */}
          {isCompleted && (
            <div className="flex items-center space-x-2 text-xs text-green-700">
              <span>✓ Completed</span>
              {step.duration > 0 && (
                <span>in {step.duration.toFixed(1)} seconds</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

// Default processing steps for document analysis
export const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'upload',
    name: 'Document Upload',
    description: 'Securely receiving and validating your document',
    status: 'pending',
    duration: 0,
    icon: '📄'
  },
  {
    id: 'extraction',
    name: 'Content Extraction',
    description: 'AI analyzing document structure and extracting key information',
    status: 'pending',
    duration: 0,
    icon: '🔍'
  },
  {
    id: 'analysis',
    name: 'Legal Analysis',
    description: 'Deep analysis of terms, conditions, and legal implications',
    status: 'pending',
    duration: 0,
    icon: '🧠'
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    description: 'Identifying potential risks and compliance issues',
    status: 'pending',
    duration: 0,
    icon: '⚠️'
  },
  {
    id: 'action-items',
    name: 'Action Items',
    description: 'Generating actionable recommendations and next steps',
    status: 'pending',
    duration: 0,
    icon: '📋'
  },
  {
    id: 'complete',
    name: 'Complete',
    description: 'Analysis complete and ready for your review',
    status: 'pending',
    duration: 0,
    icon: '✅'
  }
]