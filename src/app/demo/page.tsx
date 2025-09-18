'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  SkipForward,
  FileText,
  Brain,
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    {
      title: "Document Upload",
      description: "Drag and drop any legal document - contracts, depositions, discovery batches",
      duration: "0.5s",
      visual: "📄",
      metrics: { time: "Instant", status: "Ready" }
    },
    {
      title: "GPT-4 Vision Extraction",
      description: "AI reads and understands document structure, extracting key terms, dates, parties, and obligations",
      duration: "2.1s",
      visual: "👁️",
      metrics: { accuracy: "99.2%", items: "47 extracted" }
    },
    {
      title: "Claude Deep Analysis",
      description: "Advanced legal analysis identifies patterns, risks, and generates strategic recommendations",
      duration: "1.8s",
      visual: "🧠",
      metrics: { findings: "12 key points", complexity: "Medium" }
    },
    {
      title: "Risk Assessment",
      description: "Automatic identification of contractual, financial, and compliance risks with severity ratings",
      duration: "0.9s",
      visual: "⚠️",
      metrics: { high: "2 risks", medium: "3 risks", low: "1 risk" }
    },
    {
      title: "Action Items Generated",
      description: "Prioritized task list with deadlines, assignments, and time estimates for the legal team",
      duration: "0.7s",
      visual: "✅",
      metrics: { tasks: "8 items", urgent: "2 urgent" }
    },
    {
      title: "Copilot Integration",
      description: "Export to Microsoft Copilot for seamless workflow integration and further action",
      duration: "0.3s",
      visual: "🔗",
      metrics: { format: "Ready", status: "Exported" }
    }
  ]

  const sampleDocuments = [
    {
      name: "Service Agreement - Acme Corp.pdf",
      type: "Contract",
      pages: 24,
      complexity: "High",
      preview: "Standard service agreement with complex liability clauses"
    },
    {
      name: "Johnson Deposition Transcript.docx",
      type: "Deposition",
      pages: 87,
      complexity: "Medium",
      preview: "Witness testimony regarding patent infringement case"
    },
    {
      name: "Discovery Batch #2847.pdf",
      type: "Discovery",
      pages: 342,
      complexity: "Very High",
      preview: "Email communications and internal documents for litigation"
    }
  ]

  const comparisonData = [
    {
      task: "Contract Review",
      traditional: { time: "2-3 hours", cost: "$525", accuracy: "Variable" },
      aiPowered: { time: "2 minutes", cost: "$3.50", accuracy: "99.2%" }
    },
    {
      task: "Deposition Summary",
      traditional: { time: "4-5 hours", cost: "$875", accuracy: "Variable" },
      aiPowered: { time: "3 minutes", cost: "$5.25", accuracy: "98.8%" }
    },
    {
      task: "Discovery Analysis",
      traditional: { time: "8-10 hours", cost: "$1,750", accuracy: "Variable" },
      aiPowered: { time: "5 minutes", cost: "$8.75", accuracy: "99.1%" }
    }
  ]

  const handlePlayDemo = () => {
    setIsPlaying(true)
    setCurrentStep(0)
    
    // Auto-advance through steps
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= demoSteps.length - 1) {
          clearInterval(interval)
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hb-navy rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-hb-navy">Interactive Demo</h1>
                <p className="text-xs text-gray-500">Experience the Platform in Action</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/upload">
                <Button className="bg-hb-navy hover:bg-hb-darkblue text-white">
                  Try It Yourself
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Demo Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-hb-navy to-hb-darkblue text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Watch AI Process a Legal Document</h2>
                <p className="text-hb-blue">
                  See how our multi-model orchestration transforms hours of work into seconds
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white text-hb-navy hover:bg-gray-100"
                onClick={handlePlayDemo}
                disabled={isPlaying}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Demo
                  </>
                )}
              </Button>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.5 }}
                  animate={{ 
                    opacity: currentStep >= index ? 1 : 0.5,
                    scale: currentStep === index ? 1.02 : 1
                  }}
                  className={`p-4 rounded-lg transition-all ${
                    currentStep === index 
                      ? 'bg-white/20 border border-white/40' 
                      : currentStep > index 
                      ? 'bg-white/10' 
                      : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{step.visual}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <p className="text-sm text-hb-blue">{step.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-hb-blue">Processing Time</p>
                      <p className="text-xl font-bold">{step.duration}</p>
                      {currentStep === index && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2.5 }}
                          className="h-1 bg-hb-blue rounded-full mt-2"
                        />
                      )}
                    </div>
                  </div>
                  {currentStep >= index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-white/20 flex gap-6"
                    >
                      {Object.entries(step.metrics).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-xs text-hb-blue capitalize">{key}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Total Metrics */}
            {currentStep >= demoSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-white/20 rounded-lg"
              >
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold">5.3s</p>
                    <p className="text-sm text-hb-blue">Total Time</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">2.5 hrs</p>
                    <p className="text-sm text-hb-blue">Time Saved</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">$437</p>
                    <p className="text-sm text-hb-blue">Cost Saved</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">99.2%</p>
                    <p className="text-sm text-hb-blue">Accuracy</p>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Sample Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-hb-navy mb-6">Try Sample Documents</h2>
          <div className="grid grid-cols-3 gap-6">
            {sampleDocuments.map((doc, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <FileText className="w-8 h-8 text-hb-navy" />
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    doc.complexity === 'High' ? 'bg-orange-100 text-orange-700' :
                    doc.complexity === 'Very High' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {doc.complexity}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{doc.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{doc.preview}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{doc.type}</span>
                  <span>{doc.pages} pages</span>
                </div>
                <Link href={`/upload?demo=${doc.type === 'Contract' ? 'sample-contract' : doc.type === 'Deposition' ? 'sample-deposition' : 'sample-merger'}`}>
                  <Button className="w-full mt-4 bg-hb-navy hover:bg-hb-darkblue text-white">
                    Process This Document
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-hb-navy mb-6">Performance Comparison</h2>
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-hb-navy text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Task</th>
                  <th className="px-6 py-4 text-center" colSpan={3}>Traditional Method</th>
                  <th className="px-6 py-4 text-center" colSpan={3}>AI-Powered</th>
                </tr>
                <tr className="bg-hb-darkblue text-hb-blue text-sm">
                  <th className="px-6 py-2"></th>
                  <th className="px-6 py-2">Time</th>
                  <th className="px-6 py-2">Cost</th>
                  <th className="px-6 py-2">Accuracy</th>
                  <th className="px-6 py-2">Time</th>
                  <th className="px-6 py-2">Cost</th>
                  <th className="px-6 py-2">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{row.task}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{row.traditional.time}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{row.traditional.cost}</td>
                    <td className="px-6 py-4 text-center text-gray-500">{row.traditional.accuracy}</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">{row.aiPowered.time}</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">{row.aiPowered.cost}</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">{row.aiPowered.accuracy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-hb-navy mb-6">Key Features in Action</h2>
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Intelligent Extraction
                  </h3>
                  <p className="text-gray-600 mb-4">
                    GPT-4 Vision understands document layout and context, extracting not just text 
                    but meaning - identifying parties, obligations, dates, and critical terms with 
                    human-level comprehension.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>99.2% accuracy</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Clock className="w-4 h-4" />
                      <span>2.1s average</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    Strategic Analysis
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Claude performs deep legal analysis, identifying risks, generating recommendations, 
                    and creating actionable insights that would take hours of attorney review to produce.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span>$437 saved/doc</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <Clock className="w-4 h-4" />
                      <span>1.8s average</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 bg-gradient-to-r from-hb-navy to-hb-darkblue text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience the Future of Legal Tech?
            </h2>
            <p className="text-xl text-hb-blue mb-8 max-w-2xl mx-auto">
              Upload your own document or use our samples to see how AI can transform 
              your legal workflows in seconds, not hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" className="bg-white text-hb-navy hover:bg-gray-100">
                  Upload Your Document
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-hb-navy"
                onClick={handlePlayDemo}
              >
                Replay Demo
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
