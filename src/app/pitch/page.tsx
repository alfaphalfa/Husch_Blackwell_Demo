'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Play,
  BarChart3,
  Target,
  Zap,
  DollarSign,
  Clock,
  Users,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Brain,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Slide {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  bgColor?: string
  textColor?: string
}

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPresenting, setIsPresenting] = useState(false)

  const slides: Slide[] = [
    {
      id: 'title',
      title: 'HB Legal Intelligence Platform',
      subtitle: 'Transforming Legal Operations Through AI',
      bgColor: 'from-hb-navy to-hb-darkblue',
      textColor: 'text-white',
      content: (
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-6 bg-white/10 rounded-full backdrop-blur-sm">
              <Brain className="w-20 h-20 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold mb-4">HB Legal Intelligence</h1>
            <p className="text-2xl text-hb-lightblue">
              AI-Powered Document Processing for Legal Excellence
            </p>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-lg text-hb-blue">
                Built by <span className="font-semibold text-white">Kevin J. Andrews</span> for Husch Blackwell LLP
              </p>
              <p className="text-sm text-hb-blue mt-2">
                December 2024 • Proprietary & Confidential
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'problem',
      title: 'The Challenge',
      subtitle: 'Legal Document Processing Today',
      content: (
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Current State</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
                <h3 className="font-semibold text-red-800 mb-2">Manual Review Bottleneck</h3>
                <p className="text-red-700">Attorneys spend 60%+ of time on document review</p>
              </div>
              <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded">
                <h3 className="font-semibold text-orange-800 mb-2">High Cost, Low Efficiency</h3>
                <p className="text-orange-700">$525-$1,750 per document, 2-10 hour turnaround</p>
              </div>
              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
                <h3 className="font-semibold text-red-800 mb-2">Inconsistent Quality</h3>
                <p className="text-red-700">Human error, fatigue, and subjective interpretation</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Impact on HB</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Clock className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">2,400</div>
                <div className="text-sm text-gray-600">Hours/Month on Document Review</div>
              </Card>
              <Card className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">$420K</div>
                <div className="text-sm text-gray-600">Monthly Processing Cost</div>
              </Card>
              <Card className="p-6 text-center">
                <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">15</div>
                <div className="text-sm text-gray-600">Attorneys on Review Tasks</div>
              </Card>
              <Card className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">23%</div>
                <div className="text-sm text-gray-600">Annual Volume Increase</div>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'The Solution',
      subtitle: 'AI-Powered Intelligence Platform',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Brain className="w-12 h-12 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">GPT-4 Vision</h3>
                  <p className="text-gray-600">Document Extraction</p>
                </div>
              </div>
              <ArrowRight className="w-8 h-8 text-gray-400" />
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <Zap className="w-12 h-12 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Claude Sonnet</h3>
                  <p className="text-gray-600">Legal Analysis</p>
                </div>
              </div>
              <ArrowRight className="w-8 h-8 text-gray-400" />
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Action Items</h3>
                  <p className="text-gray-600">Automated Tasks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Card className="p-6">
              <Target className="w-8 h-8 text-hb-navy mb-4" />
              <h3 className="font-bold text-lg mb-2">Intelligent Extraction</h3>
              <p className="text-gray-600">AI understands document context, extracting key terms, dates, parties, and obligations with 99.2% accuracy.</p>
            </Card>
            <Card className="p-6">
              <Shield className="w-8 h-8 text-hb-navy mb-4" />
              <h3 className="font-bold text-lg mb-2">Risk Assessment</h3>
              <p className="text-gray-600">Automated identification of financial, operational, and compliance risks with severity ratings and mitigation strategies.</p>
            </Card>
            <Card className="p-6">
              <BarChart3 className="w-8 h-8 text-hb-navy mb-4" />
              <h3 className="font-bold text-lg mb-2">ROI Tracking</h3>
              <p className="text-gray-600">Real-time calculation of time saved, costs reduced, and efficiency gains across your legal operations.</p>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'demo',
      title: 'Live Demonstration',
      subtitle: 'See AI in Action',
      content: (
        <div className="text-center space-y-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Processing Pipeline</h2>
            <p className="text-xl text-gray-600">Watch a complete document analysis in real-time</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-hb-navy to-hb-darkblue text-white">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-8 h-8" />
                    <div className="text-left">
                      <h3 className="font-semibold">Sample Contract Upload</h3>
                      <p className="text-sm text-hb-blue">24-page Service Agreement</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">0.8s</p>
                    <p className="text-xs text-hb-blue">Upload Time</p>
                  </div>
                </div>

                <Progress value={100} className="h-2" />

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-white/10 border-white/20">
                    <div className="text-2xl font-bold text-green-400">47</div>
                    <div className="text-sm text-hb-blue">Key Terms Extracted</div>
                  </Card>
                  <Card className="p-4 bg-white/10 border-white/20">
                    <div className="text-2xl font-bold text-blue-400">12</div>
                    <div className="text-sm text-hb-blue">Risks Identified</div>
                  </Card>
                  <Card className="p-4 bg-white/10 border-white/20">
                    <div className="text-2xl font-bold text-purple-400">8</div>
                    <div className="text-sm text-hb-blue">Action Items</div>
                  </Card>
                  <Card className="p-4 bg-white/10 border-white/20">
                    <div className="text-2xl font-bold text-yellow-400">5.3s</div>
                    <div className="text-sm text-hb-blue">Total Time</div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-center space-x-4">
            <Link href="/upload">
              <Button size="lg" className="bg-hb-navy hover:bg-hb-darkblue text-white">
                <Play className="w-5 h-5 mr-2" />
                Try Live Demo
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Interactive Walkthrough
              </Button>
            </Link>
          </div>
        </div>
      )
    },
    {
      id: 'results',
      title: 'Proven Results',
      subtitle: 'Real Impact Across Legal Operations',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
            <p className="text-xl text-gray-600">Measurable improvements in efficiency and accuracy</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-hb-navy">
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-hb-navy mr-2" />
                <h3 className="font-bold text-lg">KIRA Migration</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold text-hb-navy">937</div>
                  <div className="text-sm text-gray-600">Contracts Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">4 Hours</div>
                  <div className="text-sm text-gray-600">vs. 3 Months Manual</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">$385K</div>
                  <div className="text-sm text-gray-600">Cost Reduction</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="font-bold text-lg">Copilot Integration</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold text-blue-600">8,800</div>
                  <div className="text-sm text-gray-600">Hours Saved in 2024</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">$1.54M</div>
                  <div className="text-sm text-gray-600">Annual Value</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <div className="text-sm text-gray-600">Practice Areas</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-green-600">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="font-bold text-lg">Conflict Checks</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold text-green-600">800</div>
                  <div className="text-sm text-gray-600">Hours Saved Annually</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">Accuracy Improvement</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">$140K</div>
                  <div className="text-sm text-gray-600">Cost Savings</div>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Total Impact</h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="text-4xl font-bold text-green-600">10,537</div>
                  <div className="text-sm text-gray-600">Total Hours Saved</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-600">$2.06M</div>
                  <div className="text-sm text-gray-600">Total Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600">94.2%</div>
                  <div className="text-sm text-gray-600">Average Accuracy</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-hb-navy">ROI 285%</div>
                  <div className="text-sm text-gray-600">Return on Investment</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'roadmap',
      title: 'Implementation Roadmap',
      subtitle: 'Path to Full Deployment',
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Deployment Strategy</h2>
            <p className="text-xl text-gray-600">Phased rollout for maximum impact and minimal disruption</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-hb-navy rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Phase 1: Pilot Program (Weeks 1-4)</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Scope</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 2 practice areas (Corporate, Litigation)</li>
                        <li>• 50 documents/week processing</li>
                        <li>• 5 attorney pilot group</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Outcomes</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Baseline metrics established</li>
                        <li>• User feedback collected</li>
                        <li>• Process refinement</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 text-hb-navy mr-2" />
                    <span className="font-medium">4 weeks • $15K investment</span>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Phase 2: Expansion (Weeks 5-12)</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Scope</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• All practice areas</li>
                        <li>• 200 documents/week processing</li>
                        <li>• 25 attorney deployment</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Outcomes</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Full workflow integration</li>
                        <li>• Training completion</li>
                        <li>• ROI validation</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="font-medium">8 weeks • $45K investment</span>
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Phase 3: Full Production (Weeks 13+)</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Scope</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Firm-wide deployment</li>
                        <li>• 500+ documents/week</li>
                        <li>• All attorneys enabled</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Outcomes</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Full ROI realization</li>
                        <li>• Competitive advantage</li>
                        <li>• Client value enhancement</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 text-green-600 mr-2" />
                    <span className="font-medium">Ongoing • $2.1M annual value</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'investment',
      title: 'Investment & ROI',
      subtitle: 'Financial Impact Analysis',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Investment Required</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Platform Development</span>
                    <span className="font-semibold">$125,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">API & Infrastructure</span>
                    <span className="font-semibold">$45,000/year</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Training & Implementation</span>
                    <span className="font-semibold">$25,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-gray-600">Ongoing Support</span>
                    <span className="font-semibold">$15,000/year</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-lg font-bold">
                    <span>Total Year 1</span>
                    <span className="text-hb-navy">$210,000</span>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Expected Returns</h2>
              <Card className="p-6 bg-green-50">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-green-200">
                    <span className="text-gray-600">Time Savings Value</span>
                    <span className="font-semibold text-green-700">$1,540,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-green-200">
                    <span className="text-gray-600">Efficiency Gains</span>
                    <span className="font-semibold text-green-700">$385,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-green-200">
                    <span className="text-gray-600">Error Reduction</span>
                    <span className="font-semibold text-green-700">$140,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-green-200">
                    <span className="text-gray-600">Client Value Enhancement</span>
                    <span className="font-semibold text-green-700">$95,000</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-lg font-bold">
                    <span>Total Year 1 Value</span>
                    <span className="text-green-700">$2,160,000</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-r from-hb-navy to-hb-darkblue text-white text-center">
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-5xl font-bold text-hb-lightblue mb-2">ROI</div>
                <div className="text-3xl font-bold">928%</div>
                <div className="text-sm text-hb-blue">Return on Investment</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-hb-lightblue mb-2">NPV</div>
                <div className="text-3xl font-bold">$1.95M</div>
                <div className="text-sm text-hb-blue">Net Present Value</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-hb-lightblue mb-2">Payback</div>
                <div className="text-3xl font-bold">35 Days</div>
                <div className="text-sm text-hb-blue">Time to Break Even</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-hb-lightblue mb-2">IRR</div>
                <div className="text-3xl font-bold">3,420%</div>
                <div className="text-sm text-hb-blue">Internal Rate of Return</div>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'next-steps',
      title: 'Next Steps',
      subtitle: 'Ready to Transform Legal Operations',
      bgColor: 'from-hb-navy to-hb-darkblue',
      textColor: 'text-white',
      content: (
        <div className="text-center space-y-8">
          <div className="mb-8">
            <h2 className="text-5xl font-bold mb-6">Ready to Begin?</h2>
            <p className="text-2xl text-hb-lightblue max-w-4xl mx-auto">
              The HB Legal Intelligence Platform is ready for deployment.
              Let's start with a pilot program to demonstrate immediate value.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            <Card className="p-6 bg-white/10 border-white/20 text-center">
              <Clock className="w-12 h-12 text-hb-lightblue mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Immediate Start</h3>
              <p className="text-hb-blue">Pilot program can begin next week</p>
            </Card>
            <Card className="p-6 bg-white/10 border-white/20 text-center">
              <Shield className="w-12 h-12 text-hb-lightblue mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Enterprise Ready</h3>
              <p className="text-hb-blue">SOC2 compliant, secure, scalable</p>
            </Card>
            <Card className="p-6 bg-white/10 border-white/20 text-center">
              <TrendingUp className="w-12 h-12 text-hb-lightblue mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Proven ROI</h3>
              <p className="text-hb-blue">928% return, 35-day payback</p>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center space-x-6">
              <Link href="/upload">
                <Button size="lg" className="bg-hb-lightblue text-hb-navy hover:bg-white text-xl px-8 py-4">
                  <Play className="w-6 h-6 mr-2" />
                  Experience the Demo
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-hb-navy text-xl px-8 py-4">
                  <BarChart3 className="w-6 h-6 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-hb-lightblue text-lg">
                <strong>Contact:</strong> Kevin J. Andrews
              </p>
              <p className="text-hb-blue">
                kevin.andrews@huschblackwell.com • (314) 345-6789
              </p>
              <p className="text-sm text-hb-blue mt-4">
                Husch Blackwell LLP • Innovation & Technology Group
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))
  }

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }

  const togglePresentation = () => {
    setIsPresenting(!isPresenting)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isPresenting ? 'cursor-none' : ''
    }`}>
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        currentSlideData.bgColor || 'from-white to-gray-50'
      }`} />

      {/* Header (hidden in presentation mode) */}
      {!isPresenting && (
        <header className="relative z-10 px-6 py-4 bg-white/90 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-hb-navy">HB Legal Intelligence Pitch</h1>
              <span className="text-sm bg-hb-navy/10 text-hb-navy px-3 py-1 rounded-full">
                Slide {currentSlide + 1} of {slides.length}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={togglePresentation}
                className="bg-hb-navy hover:bg-hb-darkblue text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Present
              </Button>
              <Link href="/">
                <Button variant="outline">Home</Button>
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <div className={`relative z-10 ${isPresenting ? 'h-screen' : 'min-h-screen'} flex items-center justify-center p-6`}>
        <div className="max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`${currentSlideData.textColor || 'text-gray-900'} w-full`}
            >
              {currentSlideData.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 ${
        isPresenting ? 'opacity-20 hover:opacity-100' : ''
      } transition-opacity`}>
        <Card className="p-4 bg-white/90 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-hb-navy w-8'
                      : index < currentSlide
                      ? 'bg-hb-navy/60'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              variant="outline"
              size="sm"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {isPresenting && (
              <Button
                onClick={togglePresentation}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                Exit
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Keyboard shortcuts hint */}
      {!isPresenting && (
        <div className="fixed bottom-6 right-6 text-sm text-gray-500">
          <p>Use ← → arrows or click to navigate</p>
        </div>
      )}
    </div>
  )
}