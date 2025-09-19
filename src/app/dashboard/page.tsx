'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from '@/components/ui/Toast'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import {
  FileText,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Activity,
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  ChevronRight,
  XCircle,
  AlertTriangle,
  Sparkles,
  Play,
  Pause,
  SkipForward,
  Check,
  Upload,
  FileCheck,
  Zap,
  Brain
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { N8nWorkflowSimulator } from '@/components/N8nWorkflowSimulator'

// Custom hook for animated counting
const useCountUp = (end: number, duration: number = 2000, prefix: string = '', suffix: string = '') => {
  const [count, setCount] = useState('0')
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    const endValue = parseFloat(end.toString())

    const updateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const currentValue = endValue * progress
      const formattedValue = end % 1 === 0
        ? Math.floor(currentValue).toString()
        : currentValue.toFixed(1)

      setCount(prefix + formattedValue + suffix)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(prefix + end.toString() + suffix)
      }
    }

    requestAnimationFrame(updateCount)
  }, [hasStarted, end, duration, prefix, suffix])

  return { value: count, start: () => setHasStarted(true) }
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [selectedMetric, setSelectedMetric] = useState<'time' | 'cost' | 'volume'>('time')
  const [workflowStep, setWorkflowStep] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [demoRuntime, setDemoRuntime] = useState(0)
  const [visitedSections, setVisitedSections] = useState<number[]>([])

  // Document processing states
  const [selectedDocument, setSelectedDocument] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [contextItems, setContextItems] = useState<{time: string, text: string}[]>([])
  const [keyFindings, setKeyFindings] = useState<string[]>([])
  const [actionItems, setActionItems] = useState<string[]>([])
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low')
  const [tokenCount, setTokenCount] = useState(0)
  const [apiCalls, setApiCalls] = useState(0)
  const [processCost, setProcessCost] = useState(0)
  const [execTime, setExecTime] = useState(0)

  // Refs for sections
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const runtimeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const processingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const timeSavedLiveCounter = useCountUp(7.8, 1500, '', ' hrs')
  const costSavedLiveCounter = useCountUp(487, 1500, '$', '')

  const sections = [
    { id: 'challenge', name: 'The Challenge', icon: '⚠️' },
    { id: 'transformation', name: 'The Transformation', icon: '✨' },
    { id: 'process', name: 'Process Chain', icon: '⚙️' },
    { id: 'impact', name: 'The Impact', icon: '📈' }
  ]

  // Dynamic data for charts
  const [timeSeriesData, setTimeSeriesData] = useState([
    { date: 'Jan 1', documents: 45, timeSaved: 112, costSaved: 19600 },
    { date: 'Jan 2', documents: 52, timeSaved: 130, costSaved: 22750 },
    { date: 'Jan 3', documents: 48, timeSaved: 120, costSaved: 21000 },
    { date: 'Jan 4', documents: 61, timeSaved: 152, costSaved: 26600 },
    { date: 'Jan 5', documents: 58, timeSaved: 145, costSaved: 25375 },
    { date: 'Jan 6', documents: 42, timeSaved: 105, costSaved: 18375 },
    { date: 'Jan 7', documents: 55, timeSaved: 137, costSaved: 23975 },
  ])

  // Update chart data periodically for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSeriesData(prevData => {
        const newData = [...prevData]
        // Shift data and add new point
        newData.shift()
        const lastDate = newData[newData.length - 1].date
        const day = parseInt(lastDate.split(' ')[1]) + 1
        newData.push({
          date: `Jan ${day}`,
          documents: 40 + Math.floor(Math.random() * 25),
          timeSaved: 100 + Math.floor(Math.random() * 60),
          costSaved: 18000 + Math.floor(Math.random() * 10000)
        })
        return newData
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const documentTypeData = [
    { type: 'Contracts', count: 234, percentage: 35 },
    { type: 'Discovery', count: 187, percentage: 28 },
    { type: 'Depositions', count: 134, percentage: 20 },
    { type: 'Briefs', count: 67, percentage: 10 },
    { type: 'Other', count: 47, percentage: 7 },
  ]

  const [performanceData, setPerformanceData] = useState([
    { metric: 'Accuracy', value: 0, benchmark: 95, actualValue: 99.2 },
    { metric: 'Speed', value: 0, benchmark: 90, actualValue: 97.8 },
    { metric: 'Satisfaction', value: 0, benchmark: 85, actualValue: 94.5 },
    { metric: 'Cost Savings', value: 0, benchmark: 50, actualValue: 78.3 },
  ])

  // Animate performance bars on mount and section change
  useEffect(() => {
    if (currentSection === 1 || visitedSections.includes(1)) {
      const timer = setTimeout(() => {
        setPerformanceData(prev => prev.map(item => ({
          ...item,
          value: item.actualValue
        })))
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setPerformanceData(prev => prev.map(item => ({
        ...item,
        value: 0
      })))
    }
  }, [currentSection, visitedSections])

  const [teamUsageData, setTeamUsageData] = useState([
    { name: 'Litigation', hours: 234, documents: 567, progress: 0 },
    { name: 'Corporate', hours: 189, documents: 423, progress: 0 },
    { name: 'IP', hours: 156, documents: 342, progress: 0 },
    { name: 'Real Estate', hours: 98, documents: 234, progress: 0 },
    { name: 'Tax', hours: 67, documents: 145, progress: 0 },
  ])

  // Update team usage with real-time animation
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setTeamUsageData(prev => prev.map((team, idx) => {
        const variation = Math.random() * 10 - 5 // Random +/- 5
        const newHours = Math.max(50, Math.min(250, team.hours + variation))
        return {
          ...team,
          hours: Math.round(newHours),
          documents: Math.round(team.documents + variation * 2),
          progress: (newHours / 250) * 100
        }
      }))
    }, 3000)

    return () => clearInterval(updateInterval)
  }, [])

  const kpiCards = [
    {
      title: 'Total Time Saved',
      value: '2,340 hrs',
      change: '+52%',
      trend: 'up',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Cost Savings',
      value: '$409,500',
      change: '+43%',
      trend: 'up',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Documents Processed',
      value: '1,247',
      change: '+28%',
      trend: 'up',
      icon: <FileText className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Active Users',
      value: '487',
      change: '+15%',
      trend: 'up',
      icon: <Users className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    }
  ]

  // New workflow metrics
  const workflowMetrics = [
    {
      title: 'Workflows Automated',
      value: '47',
      change: '+12',
      icon: <Activity className="w-4 h-4" />,
      color: 'text-blue-600'
    },
    {
      title: 'Context Patterns Learned',
      value: '1,247',
      change: '+234',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-purple-600'
    },
    {
      title: 'Process Chains Active',
      value: '12',
      change: 'Live',
      icon: <Activity className="w-4 h-4 animate-pulse" />,
      color: 'text-green-600'
    },
    {
      title: 'Cross-Matter Insights',
      value: '89',
      change: '+17',
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'text-orange-600'
    }
  ]

  // Workflow activity feed
  const workflowActivity = [
    { id: 1, name: 'Contract Review Workflow', status: 'completed', time: '2 min ago', icon: '✅' },
    { id: 2, name: 'High Risk Escalation', status: 'triggered', time: '15 min ago', icon: '⚠️' },
    { id: 3, name: 'Batch Processing: 48/50 documents', status: 'in-progress', time: 'In Progress', icon: '⏳' },
    { id: 4, name: 'Discovery Processing', status: 'completed', time: '1 hour ago', icon: '✅' },
    { id: 5, name: 'Compliance Check', status: 'completed', time: '3 hours ago', icon: '✅' }
  ]

  const recentActivity = [
    { id: 1, user: 'Sarah Johnson', action: 'Processed contract', time: '2 min ago', saved: '2.5 hrs' },
    { id: 2, user: 'Michael Chen', action: 'Analyzed deposition', time: '15 min ago', saved: '4 hrs' },
    { id: 3, user: 'Emily Davis', action: 'Reviewed discovery batch', time: '1 hr ago', saved: '8 hrs' },
    { id: 4, user: 'Robert Wilson', action: 'Generated risk report', time: '2 hrs ago', saved: '1.5 hrs' },
    { id: 5, user: 'Lisa Anderson', action: 'Extracted key terms', time: '3 hrs ago', saved: '3 hrs' },
  ]

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#a855f7', '#eab308']

  // Workflow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWorkflowStep((prev) => (prev + 1) % 5)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const workflowSteps = [
    { icon: '📄', label: 'Document Upload', time: '0:02s' },
    { icon: '🔍', label: 'AI Extraction', time: '0:15s' },
    { icon: '🧠', label: 'Analysis', time: '0:45s' },
    { icon: '📝', label: 'Draft Generation', time: '1:30s' },
    { icon: '✅', label: 'Complete', time: '2:00s' }
  ]


  const navigateToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' })
    setCurrentSection(index)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Document processing functions
  const startProcessing = async () => {
    if (!selectedDocument) {
      toast.info('Please select a document first')
      return
    }

    // Reset states
    setIsProcessing(true)
    setProcessingStep(0)
    setContextItems([])
    setKeyFindings([])
    setActionItems([])
    setRiskLevel('low')
    setTokenCount(0)
    setApiCalls(0)
    setProcessCost(0)
    setExecTime(0)

    // Start execution timer
    const startTime = Date.now()
    processingIntervalRef.current = setInterval(() => {
      setExecTime(Math.floor((Date.now() - startTime) / 1000))
    }, 100)

    // Run processing animation
    await animateDocumentProcessing()
  }

  const animateDocumentProcessing = async () => {
    // Step 1: Document Intake (0-2s)
    setProcessingStep(1)
    addContextItem('Document received: ' + getDocumentName(selectedDocument))
    await sleep(2000)

    // Step 2: AI Extraction (2-5s)
    setProcessingStep(2)
    addContextItem('Extracting key terms and parties...')
    animateTokenCounter(0, 1247)
    setApiCalls(1)
    await sleep(3000)
    addKeyFinding('2 parties identified: Acme Corp, Beta LLC')
    addKeyFinding('Contract type: ' + getDocumentType(selectedDocument))

    // Step 3: Deep Analysis (5-8s)
    setProcessingStep(3)
    addContextItem('Analyzing clauses and obligations...')
    animateTokenCounter(1247, 3892)
    setApiCalls(3)
    setProcessCost(0.47)
    await sleep(3000)
    addKeyFinding('Non-compete clause: 2 years, 50-mile radius')
    addKeyFinding('Confidentiality period: 5 years')
    setRiskLevel('medium')

    // Step 4: Generate Output (8-10s)
    setProcessingStep(4)
    addContextItem('Generating summary and recommendations...')
    setApiCalls(4)
    setProcessCost(0.89)
    await sleep(2000)
    addActionItem('Review non-compete geographic scope')
    addActionItem('Clarify intellectual property ownership')
    addActionItem('Add termination clause provisions')

    // Step 5: Quality Check (10-12s)
    setProcessingStep(5)
    addContextItem('Performing quality assurance...')
    setApiCalls(5)
    setProcessCost(1.12)
    await sleep(2000)

    // Complete
    setProcessingStep(6)
    addContextItem('Processing complete!')
    timeSavedLiveCounter.start()
    costSavedLiveCounter.start()

    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current)
    }

    setTimeout(() => {
      setIsProcessing(false)
    }, 2000)
  }

  const addContextItem = (text: string) => {
    const time = new Date().toLocaleTimeString()
    setContextItems(prev => [{time, text}, ...prev].slice(0, 5))
  }

  const addKeyFinding = (finding: string) => {
    setKeyFindings(prev => [...prev, finding])
  }

  const addActionItem = (action: string) => {
    setActionItems(prev => [...prev, action])
  }

  const animateTokenCounter = (start: number, end: number) => {
    const duration = 1000
    const increment = (end - start) / (duration / 50)
    let current = start

    const interval = setInterval(() => {
      current += increment
      if (current >= end) {
        current = end
        clearInterval(interval)
      }
      setTokenCount(Math.floor(current))
    }, 50)
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const getDocumentName = (doc: string) => {
    const names: {[key: string]: string} = {
      'nda': 'NDA_Agreement_2025.pdf',
      'deposition': 'Deposition_Transcript_Johnson.pdf',
      'contract': 'Service_Contract_ABC.pdf',
      'discovery': 'Discovery_Request_Case_2025.pdf'
    }
    return names[doc] || 'Document.pdf'
  }

  const getDocumentType = (doc: string) => {
    const types: {[key: string]: string} = {
      'nda': 'Non-Disclosure Agreement',
      'deposition': 'Deposition Transcript',
      'contract': 'Service Contract',
      'discovery': 'Discovery Request'
    }
    return types[doc] || 'Legal Document'
  }

  // Demo runtime timer
  useEffect(() => {
    if (demoRuntime > 0) {
      runtimeIntervalRef.current = setInterval(() => {
        setDemoRuntime((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (runtimeIntervalRef.current) {
        clearInterval(runtimeIntervalRef.current)
      }
    }
  }, [demoRuntime])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        navigateToSection(Math.min(currentSection + 1, sections.length - 1))
      } else if (e.key === 'ArrowUp') {
        navigateToSection(Math.max(currentSection - 1, 0))
      } else if (e.key === ' ') {
        e.preventDefault()
        setWorkflowStep((prev) => (prev + 1) % 5)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSection])

  // Section observer for current section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setCurrentSection(index)
              if (!visitedSections.includes(index)) {
                setVisitedSections((prev) => [...prev, index])
              }
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      {/* Header with Progress Bar */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hb-navy rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-hb-navy">Analytics Dashboard</h1>
                <p className="text-xs text-gray-500">Real-time Performance Metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Demo Runtime Timer */}
              {demoRuntime > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Demo Runtime: {formatTime(demoRuntime)}</span>
                </div>
              )}
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Interactive Progress Bar */}
        <div className="border-t border-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between py-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => navigateToSection(index)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${
                    currentSection === index
                      ? 'bg-hb-navy text-white'
                      : visitedSections.includes(index)
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <span className="text-lg">
                    {visitedSections.includes(index) && currentSection !== index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      section.icon
                    )}
                  </span>
                  <span className="text-sm font-medium hidden md:inline">{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6">
        {/* Section 1: The Challenge */}
        <section ref={(el) => { sectionRefs.current[0] = el }} className="py-16 border-b border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-400 mb-4">The Challenge: Traditional Legal Workflows</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Before AI transformation, legal teams faced manual, time-consuming processes with limited visibility and high risk
            </p>
          </motion.div>

          {/* Traditional Workflow Visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12"
          >
            <Card className="p-8 bg-gray-50 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 mb-6">The Old Way: Manual Document Processing</h3>
              <div className="flex items-center justify-between mb-8">
                <div className="flex-1 flex items-center gap-4">
                  {[
                    { icon: <FileText className="w-6 h-6" />, label: 'Document Intake', time: '30 min' },
                    { icon: <ChevronRight className="w-5 h-5 text-gray-400" />, label: '', time: '' },
                    { icon: <Users className="w-6 h-6" />, label: 'Manual Review', time: '3-4 hrs' },
                    { icon: <ChevronRight className="w-5 h-5 text-gray-400" />, label: '', time: '' },
                    { icon: <FileText className="w-6 h-6" />, label: 'Drafting', time: '2-3 hrs' },
                    { icon: <ChevronRight className="w-5 h-5 text-gray-400" />, label: '', time: '' },
                    { icon: <Users className="w-6 h-6" />, label: 'Multiple Reviews', time: '2+ hrs' },
                    { icon: <ChevronRight className="w-5 h-5 text-gray-400" />, label: '', time: '' },
                    { icon: <FileText className="w-6 h-6" />, label: 'Final Delivery', time: '30 min' },
                  ].map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`${
                        step.label === '' ? '' : 'w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500'
                      }`}>
                        {step.icon}
                      </div>
                      {step.label && (
                        <>
                          <p className="text-sm font-medium text-gray-600 mt-2">{step.label}</p>
                          <p className="text-xs text-gray-400">{step.time}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg px-6 py-3">
                  <p className="text-2xl font-bold text-red-600">8+ hours per contract</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Pain Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Clock className="w-6 h-6" />,
                title: '8+ Hours Per Contract',
                description: 'Manual review and drafting consumed entire workdays',
                color: 'text-gray-500',
                bgColor: 'bg-gray-100'
              },
              {
                icon: <AlertTriangle className="w-6 h-6" />,
                title: 'High Error Risk',
                description: 'Human fatigue led to missed clauses and inconsistencies',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50'
              },
              {
                icon: <XCircle className="w-6 h-6" />,
                title: 'No Context Retention',
                description: 'Each document reviewed in isolation, patterns lost',
                color: 'text-red-600',
                bgColor: 'bg-red-50'
              }
            ].map((point, index) => (
              <Card key={index} className={`p-6 ${point.bgColor} border-gray-200`}>
                <div className={`${point.color} mb-4`}>{point.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{point.title}</h4>
                <p className="text-sm text-gray-600">{point.description}</p>
              </Card>
            ))}
          </motion.div>
        </section>

        {/* Section 2: The Transformation */}
        <section ref={(el) => { sectionRefs.current[1] = el }} className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-hb-navy mb-4">The Transformation: AI-Powered Intelligence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how AI has revolutionized legal workflows, delivering unprecedented efficiency and accuracy
            </p>
          </motion.div>
          {/* AI Document Processing Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Link href="/upload">
              <Card className="p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        <Brain className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl font-bold text-hb-navy">Watch AI Process a Legal Document</h2>
                    </div>
                    <p className="text-lg text-gray-600 mb-4">
                      See how our multi-model orchestration transforms hours of work into seconds
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        4 Sample Documents Available
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Real-time Processing Demo
                      </span>
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        GPT-4 + Claude Analysis
                      </span>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center">
                    <div className="p-4 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow">
                      <Play className="w-8 h-8 text-blue-600 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* KPI Cards - Now showing transformation metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${kpi.color} text-white`}>
                    {kpi.icon}
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {kpi.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-hb-navy">{kpi.value}</p>
                <p className="text-sm text-gray-500 mt-1">{kpi.title}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Live Processing Pipeline */}
        <section ref={(el) => { sectionRefs.current[2] = el }} className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-hb-navy mb-2">Live Processing Pipeline</h3>
            <p className="text-gray-600">Real-time AI document processing with MCP context and n8n workflows</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            {/* Column 1: MCP Context (30%) */}
            <div className="lg:col-span-3">
              <Card className="p-6 h-full bg-gradient-to-br from-purple-50 to-white">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-purple-900">📚 Context Memory (MCP)</h4>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                    <span className={`text-xs font-medium ${isProcessing ? 'text-green-600' : 'text-gray-500'}`}>
                      {isProcessing ? 'Active' : 'Standby'}
                    </span>
                  </div>
                </div>

                {/* Live Context Updates */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Context Feed:</p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {contextItems.length > 0 ? contextItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs bg-white p-2 rounded border border-purple-100"
                      >
                        <span className="text-purple-600 font-mono">{item.time}</span>
                        <span className="ml-2 text-gray-700">{item.text}</span>
                      </motion.div>
                    )) : (
                      <p className="text-xs text-gray-500 italic">Awaiting document...</p>
                    )}
                  </div>
                </div>

                {/* Prompt Selection */}
                <div className="mb-4 p-3 bg-purple-100 rounded-lg">
                  <p className="text-xs font-medium text-purple-900 mb-1">Active Prompt:</p>
                  <p className="text-sm font-semibold text-purple-800">Contract Analysis v2.1</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-purple-700">
                    <span>Model: GPT-4</span>
                    <span>Accuracy: 98%</span>
                  </div>
                </div>

                {/* Memory Stats */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tokens Used:</span>
                    <span className="font-mono font-bold text-purple-600">{tokenCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Context Window:</span>
                    <span className="font-mono text-gray-800">8,192</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Embeddings:</span>
                    <span className="font-mono text-gray-800">{Math.floor(tokenCount / 10)}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Column 2: n8n Workflow (40%) */}
            <div className="lg:col-span-4">
              <Card className="p-6 h-full">
                <h4 className="font-semibold text-gray-900 mb-6 text-center">⚙️ Automated Workflow (n8n)</h4>

                {/* Visual Flow Diagram */}
                <div className="space-y-3">
                  {[
                    { id: 1, icon: '📄', name: 'Document Intake', time: '2.1s' },
                    { id: 2, icon: '🔍', name: 'AI Extraction', time: '3.2s' },
                    { id: 3, icon: '🧠', name: 'Deep Analysis', time: '3.5s' },
                    { id: 4, icon: '📝', name: 'Generate Output', time: '2.0s' },
                    { id: 5, icon: '✅', name: 'Quality Check', time: '1.8s' }
                  ].map((step, index) => (
                    <div key={step.id} className="relative">
                      <motion.div
                        className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                          processingStep === step.id
                            ? 'bg-blue-100 border-2 border-blue-400 scale-105'
                            : processingStep > step.id
                            ? 'bg-green-50 border border-green-300'
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                        animate={processingStep === step.id ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <span className="text-2xl">{step.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{step.name}</p>
                          {processingStep > step.id && (
                            <p className="text-xs text-green-600">{step.time}</p>
                          )}
                        </div>
                        {processingStep > step.id && (
                          <Check className="w-5 h-5 text-green-600" />
                        )}
                        {processingStep === step.id && (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
                        )}
                      </motion.div>
                      {index < 4 && (
                        <div className="flex justify-center my-1">
                          <ChevronRight className={`w-4 h-4 ${
                            processingStep > step.id ? 'text-green-500' : 'text-gray-300'
                          }`} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Workflow Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Execution</p>
                    <p className="text-sm font-bold text-gray-800">{execTime}s</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">API Calls</p>
                    <p className="text-sm font-bold text-gray-800">{apiCalls}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Cost</p>
                    <p className="text-sm font-bold text-gray-800">${processCost.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Column 3: Live Results (30%) */}
            <div className="lg:col-span-3">
              <Card className="p-6 h-full bg-gradient-to-br from-green-50 to-white">
                <h4 className="font-semibold text-green-900 mb-4">📊 Real-time Results</h4>

                {/* Key Findings */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Key Findings:</p>
                  <div className="space-y-1">
                    {keyFindings.length > 0 ? keyFindings.map((finding, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs p-2 bg-white rounded border border-green-200"
                      >
                        <span className="text-green-600">✓</span> {finding}
                      </motion.div>
                    )) : (
                      <p className="text-xs text-gray-500 italic">Awaiting analysis...</p>
                    )}
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Risk Assessment:</p>
                  <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute left-0 top-0 h-full ${
                        riskLevel === 'high' ? 'bg-red-500' :
                        riskLevel === 'medium' ? 'bg-orange-500' :
                        'bg-green-500'
                      }`}
                      initial={{ width: '0%' }}
                      animate={{
                        width: riskLevel === 'high' ? '100%' :
                               riskLevel === 'medium' ? '60%' :
                               '30%'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Action Items */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Recommended Actions:</p>
                  <div className="space-y-1">
                    {actionItems.length > 0 ? actionItems.map((action, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs p-2 bg-orange-50 rounded border border-orange-200"
                      >
                        <span className="text-orange-600">→</span> {action}
                      </motion.div>
                    )) : (
                      <p className="text-xs text-gray-500 italic">Processing...</p>
                    )}
                  </div>
                </div>

                {/* Savings Highlight */}
                <div className="mt-auto pt-4 border-t border-green-200">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-green-100 rounded">
                      <p className="text-xs text-gray-600">Time Saved</p>
                      <p className="text-lg font-bold text-green-600">{timeSavedLiveCounter.value}</p>
                    </div>
                    <div className="text-center p-2 bg-blue-100 rounded">
                      <p className="text-xs text-gray-600">Cost Saved</p>
                      <p className="text-lg font-bold text-blue-600">{costSavedLiveCounter.value}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
        </section>

        {/* N8n Workflow Visualization Section */}
        <section className="py-12 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-hb-navy mb-2">Intelligent Workflow Automation</h3>
              <p className="text-gray-600">Visual representation of our n8n-powered document processing pipeline</p>
            </div>

            <N8nWorkflowSimulator
              isProcessing={isProcessing}
              onNodeClick={(node) => {
                addContextItem(`Node clicked: ${node.name} - ${node.description}`)
              }}
              onComplete={() => {
                addContextItem('Workflow completed successfully!')
              }}
            />

            <div className="mt-6 flex justify-center gap-4">
              <Button
                onClick={startProcessing}
                disabled={isProcessing}
                className="bg-hb-navy hover:bg-hb-darkblue text-white px-6 py-3"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Run Demo Workflow'
                )}
              </Button>
              <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hb-blue"
                disabled={isProcessing}
              >
                <option value="">Select a document type</option>
                <option value="nda">NDA Agreement</option>
                <option value="deposition">Deposition Transcript</option>
                <option value="contract">Service Contract</option>
                <option value="discovery">Discovery Request</option>
              </select>
            </div>

            {/* Workflow Description Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Automated Pipeline</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Seamlessly orchestrates multiple AI models and processing steps without manual intervention
                </p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-blue-50 to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Multi-Model Intelligence</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Combines GPT-4 Vision for extraction with Claude for deep legal analysis
                </p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Real-Time Monitoring</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Track execution progress, costs, and performance metrics as documents process
                </p>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Time Series Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-hb-navy">Processing Trends</h3>
                <div className="flex gap-2">
                  {(['time', 'cost', 'volume'] as const).map((metric) => (
                    <Button
                      key={metric}
                      variant={selectedMetric === metric ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedMetric(metric)}
                      className={selectedMetric === metric ? 'bg-hb-navy text-white' : ''}
                    >
                      {metric === 'time' ? 'Time Saved' : metric === 'cost' ? 'Cost Saved' : 'Volume'}
                    </Button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timeSeriesData} key={selectedMetric}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7ad1e4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7ad1e4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    formatter={(value: number) => [
                      selectedMetric === 'time' ? `${value} hrs` :
                      selectedMetric === 'cost' ? `$${value.toLocaleString()}` :
                      `${value} docs`,
                      selectedMetric === 'time' ? 'Time Saved' :
                      selectedMetric === 'cost' ? 'Cost Saved' :
                      'Documents'
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey={selectedMetric === 'time' ? 'timeSaved' : selectedMetric === 'cost' ? 'costSaved' : 'documents'}
                    stroke="#092244"
                    strokeWidth={2}
                    fill="url(#colorGradient)"
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Document Types Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-hb-navy mb-6">Document Types</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={documentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {documentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {documentTypeData.map((type, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                      <span className="text-gray-600">{type.type}</span>
                    </div>
                    <span className="font-medium text-gray-900">{type.count}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-hb-navy mb-6">Performance Metrics</h3>
              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                      <span className="text-sm text-gray-500">{item.value.toFixed(1)}%</span>
                    </div>
                    <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                      {/* Benchmark bar */}
                      <div
                        className="absolute top-0 left-0 h-full bg-hb-blue/30 transition-all duration-1000"
                        style={{ width: `${item.benchmark}%` }}
                      />
                      {/* Actual value bar */}
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-hb-navy to-hb-blue transition-all duration-1000"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                      {/* Benchmark line */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-gray-600"
                        style={{ left: `${item.benchmark}%` }}
                      >
                        <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                          Target
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-hb-navy to-hb-blue rounded-full" />
                  <span className="text-sm text-gray-600">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-hb-blue/30 rounded-full" />
                  <span className="text-sm text-gray-600">Benchmark</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Team Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-hb-navy mb-6">Team Usage</h3>
              <div className="space-y-4">
                {teamUsageData.map((team, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{team.name}</span>
                      <span className="text-xs text-gray-500">{team.hours} hrs saved</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          animate={{ width: `${team.progress}%` }}
                          transition={{ duration: 0.5 }}
                          className="bg-gradient-to-r from-hb-navy to-hb-blue h-2 rounded-full"
                          style={{ transition: 'width 0.5s ease-in-out' }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{team.documents} documents</span>
                      <span>{Math.round(team.hours / team.documents * 10) / 10} hrs/doc</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Workflow Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {workflowMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              <Card className="p-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-center justify-between mb-2">
                  <div className={metric.color}>
                    {metric.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-500">{metric.change}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                <p className="text-xs text-gray-600 mt-1">{metric.title}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity and Workflow Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-hb-navy">Recent Activity</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-hb-blue to-hb-lightblue rounded-full flex items-center justify-center text-white font-semibold">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-500">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{activity.saved} saved</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Workflow Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-hb-navy">Workflow Activity</h3>
                <Link href="/workflows">
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {workflowActivity.map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{workflow.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{workflow.name}</p>
                        <p className="text-xs text-gray-500">{workflow.time}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      workflow.status === 'completed' ? 'bg-green-100 text-green-700' :
                      workflow.status === 'triggered' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {workflow.status}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        </section>

        {/* Section 3: The Impact */}
        <section ref={(el) => { sectionRefs.current[3] = el }} className="py-16 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-hb-navy mb-4">The Impact: Measurable Value Delivered</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real transformation, real results. See the dramatic difference AI makes in your legal operations.
            </p>
          </motion.div>

          {/* Before/After Comparison */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="p-8 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Before Column */}
                <div className="relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-orange-400" />
                  <h3 className="text-xl font-bold text-gray-400 mb-6 mt-4">Before (Traditional Process)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-gray-700 font-medium">Time per contract</span>
                      <span className="text-xl font-bold text-red-600">8+ hours</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-gray-700 font-medium">Cost per document</span>
                      <span className="text-xl font-bold text-red-600">$2,000</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-gray-700 font-medium">Attorney time required</span>
                      <span className="text-xl font-bold text-red-600">70%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-gray-700 font-medium">Process tracking</span>
                      <span className="text-xl font-bold text-red-600">Manual</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-gray-700 font-medium">Error rate</span>
                      <span className="text-xl font-bold text-red-600">15-20%</span>
                    </div>
                  </div>
                </div>

                {/* After Column */}
                <div className="relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-400" />
                  <h3 className="text-xl font-bold text-hb-navy mb-6 mt-4">After (With AI Platform)</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-gray-700 font-medium">Time per contract</span>
                      <span className="text-xl font-bold text-green-600">10 minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-gray-700 font-medium">Cost per document</span>
                      <span className="text-xl font-bold text-green-600">$125</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-gray-700 font-medium">Attorney time required</span>
                      <span className="text-xl font-bold text-green-600">5%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-gray-700 font-medium">Process tracking</span>
                      <span className="text-xl font-bold text-green-600">Automated</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-gray-700 font-medium">Error rate</span>
                      <span className="text-xl font-bold text-green-600">&lt;1%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation Arrow */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">48x faster</span>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-500">16x cheaper</span>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-500">99% more accurate</span>
                </div>
              </div>
            </Card>
          </motion.div>

        </section>
      </div>

    </div>
  )
}
