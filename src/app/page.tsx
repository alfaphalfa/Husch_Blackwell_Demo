'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Brain,
  FileText,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Users,
  Target,
  Sparkles,
  PlayCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const stats = [
    { value: '937', label: 'Contracts Analyzed in 4 Hours', sublabel: 'KIRA Migration Project' },
    { value: '8,800', label: 'Hours Saved in 2024', sublabel: 'Microsoft Copilot Integration' },
    { value: '800', label: 'Hours Saved Annually', sublabel: 'Automated Conflict Checks' },
    { value: '94%', label: 'Analysis Accuracy', sublabel: 'Human-Validated Results' }
  ]

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Multi-Model AI Intelligence",
      description: "GPT-4 Vision + Claude Sonnet working together for comprehensive document analysis",
      details: "Combined visual processing with advanced reasoning"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Risk Assessment Engine",
      description: "Automated identification of financial, operational, and compliance risks",
      details: "Probability scoring with mitigation strategies"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "ROI Optimization",
      description: "Real-time calculation of time and cost savings per document",
      details: "Track efficiency gains across your entire legal team"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Microsoft Copilot Ready",
      description: "Seamless integration with your existing Microsoft 365 workflow",
      details: "Export directly to Teams, Outlook, and Word"
    }
  ]

  const caseStudies = [
    {
      client: "HB KIRA Migration Project",
      challenge: "Legacy contract management system replacement needed",
      solution: "937 contracts processed in 4 hours using AI vs. estimated 3 months manual review",
      result: "2,200+ hours saved, $385,000+ cost reduction, 12x faster processing",
      icon: <FileText className="w-6 h-6" />,
      metrics: { timeframe: "4 hours", contracts: "937", savings: "$385,000" }
    },
    {
      client: "HB Copilot Integration 2024",
      challenge: "Document review and analysis workflow inefficiencies",
      solution: "Seamless AI integration with Microsoft Copilot for automated processing",
      result: "8,800 hours saved in 2024, $1.2M cost avoidance, 89% user adoption",
      icon: <Target className="w-6 h-6" />,
      metrics: { hours: "8,800", satisfaction: "4.6/5", adoption: "89%" }
    },
    {
      client: "HB Conflict Check System",
      challenge: "Manual conflict identification across 15+ practice areas",
      solution: "AI-powered conflict detection with 73% error reduction capability",
      result: "800 hours saved annually, 15x process speedup, $120,000/year savings",
      icon: <BarChart3 className="w-6 h-6" />,
      metrics: { speedup: "15x", errorReduction: "73%", annualSavings: "$120,000" }
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 mx-auto max-w-7xl lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 rounded-2xl bg-hb-navy">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span className="ml-3 text-sm font-semibold tracking-wide text-hb-navy uppercase">
              Powered by GPT-4 Vision + Claude Sonnet
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 sm:text-7xl">
            Legal Intelligence
            <span className="block text-hb-navy">Reimagined</span>
          </h1>

          <p className="max-w-2xl mx-auto mt-8 text-xl text-gray-600 leading-8">
            Transform document review from days to minutes with enterprise-grade AI.
            Built for Husch Blackwell's exacting standards.
          </p>

          <div className="flex justify-center mt-10">
            <Link href="/dashboard">
              <Button size="lg" className="bg-hb-navy hover:bg-hb-darkblue text-white px-8 py-4 text-lg">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-hb-navy">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white lg:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-semibold text-hb-lightblue">
                  {stat.label}
                </div>
                <div className="text-sm text-hb-blue opacity-80">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Enterprise-Grade Capabilities
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Purpose-built for the demanding requirements of legal practice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <Card className={`p-6 h-full border-2 transition-all duration-300 ${
                  hoveredFeature === index
                    ? 'border-hb-blue bg-hb-blue/5 shadow-lg transform -translate-y-1'
                    : 'border-gray-200 hover:shadow-md'
                }`}>
                  <div className={`mb-4 ${
                    hoveredFeature === index ? 'text-hb-blue' : 'text-hb-navy'
                  }`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {feature.description}
                  </p>
                  <p className="text-sm text-hb-blue font-medium">
                    {feature.details}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Proven Results
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Real impact across diverse legal environments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="p-6 h-full bg-white border-l-4 border-hb-navy hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-hb-navy/10 rounded-lg text-hb-navy mr-3">
                      {study.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {study.client}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-red-600 mb-1">CHALLENGE</div>
                      <p className="text-gray-700 text-sm">{study.challenge}</p>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-hb-blue mb-1">SOLUTION</div>
                      <p className="text-gray-700 text-sm">{study.solution}</p>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-green-600 mb-1">RESULT</div>
                      <p className="font-semibold text-gray-900 text-sm mb-3">{study.result}</p>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                        {Object.entries(study.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-hb-navy">{value}</div>
                            <div className="text-xs text-gray-500 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution Section */}
      <section className="py-12 bg-gradient-to-r from-hb-navy to-hb-darkblue">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <p className="text-hb-lightblue">
              Built by{' '}
              <span className="font-semibold text-white">Kevin J. Andrews</span>
              {' '}for Husch Blackwell LLP
            </p>
            <p className="text-sm text-hb-blue mt-2">
              Leveraging cutting-edge AI to revolutionize legal document processing
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}