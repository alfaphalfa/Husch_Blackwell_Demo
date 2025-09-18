'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Eye,
  Brain,
  AlertTriangle,
  Info,
  FileText,
  Maximize2,
  Search,
  Highlighter,
  MessageSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface DocumentViewerProps {
  isOpen: boolean
  onClose: () => void
  document: {
    id: string
    name: string
    pages: number
    content?: any
  }
}

// Sample page content for demo
const samplePages = {
  'nda-techco': [
    {
      pageNumber: 1,
      content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of January 15, 2025 ("Effective Date") by and between:

TECHCO INC., a Delaware corporation with its principal place of business at
1234 Innovation Drive, San Francisco, CA 94105 ("Disclosing Party")

and

DATAFLOW SYSTEMS, LLC, a California limited liability company with its principal place of business at
5678 Data Center Way, Los Angeles, CA 90028 ("Receiving Party")

WHEREAS, the parties wish to explore a potential business relationship ("Purpose") and, in connection with such discussions, Disclosing Party may disclose to Receiving Party certain confidential and proprietary information.

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means all information, whether written, oral, electronic, or visual, disclosed by Disclosing Party to Receiving Party, including but not limited to:
• Technical data, trade secrets, know-how
• Research, product plans, products, services
• Customer lists and customer information
• Financial information and projections
• Business strategies and marketing plans`,
      annotations: {
        gpt4: [
          { x: 50, y: 280, width: 400, height: 60, text: "Broad definition of confidential information - may be overly inclusive", risk: "medium" },
          { x: 50, y: 420, width: 350, height: 40, text: "Missing specific exclusions for publicly available information", risk: "high" }
        ],
        claude: [
          { x: 50, y: 180, width: 300, height: 40, text: "Parties properly identified with legal entities", risk: "low" },
          { x: 50, y: 520, width: 400, height: 50, text: "Consider adding definition of 'trade secrets' per UTSA", risk: "medium" }
        ]
      }
    },
    {
      pageNumber: 2,
      content: `2. OBLIGATIONS OF RECEIVING PARTY
Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence
b) Not disclose Confidential Information to third parties without prior written consent
c) Use Confidential Information solely for the Purpose
d) Protect Confidential Information using the same degree of care it uses for its own confidential information, but no less than reasonable care

3. TERM
This Agreement shall commence on the Effective Date and continue for three (3) years, unless earlier terminated by either party upon thirty (30) days written notice.

4. EXCEPTIONS
The obligations of Receiving Party under Section 2 shall not apply to information that:
a) Was known to Receiving Party prior to disclosure
b) Is or becomes publicly available through no breach by Receiving Party
c) Is rightfully received from a third party without breach of confidentiality
d) Is independently developed without use of Confidential Information

5. RETURN OF MATERIALS
Upon termination or upon request, Receiving Party shall promptly return or destroy all Confidential Information and certify such return or destruction in writing.`,
      annotations: {
        gpt4: [
          { x: 50, y: 200, width: 380, height: 50, text: "Standard of care clause could be more specific", risk: "medium" },
          { x: 50, y: 350, width: 400, height: 60, text: "30-day termination notice may be insufficient for ongoing projects", risk: "medium" }
        ],
        claude: [
          { x: 50, y: 450, width: 420, height: 50, text: "Exceptions are well-defined and industry standard", risk: "low" },
          { x: 50, y: 580, width: 400, height: 40, text: "Consider adding data retention requirements", risk: "medium" }
        ]
      }
    }
  ],
  'deposition-williams': [
    {
      pageNumber: 1,
      content: `UNITED STATES DISTRICT COURT
NORTHERN DISTRICT OF CALIFORNIA

WILLIAMS, et al.,
    Plaintiffs,
v.                                    Case No. 24-CV-00123-ABC
ACME CORPORATION,
    Defendant.

DEPOSITION OF DR. SARAH WILLIAMS

DATE: December 15, 2024
TIME: 9:00 AM
LOCATION: Smith & Associates Law Firm
          789 Legal Plaza, San Francisco, CA

APPEARANCES:
For Plaintiffs: JOHN SMITH, ESQ.
For Defendant: JANE DOE, ESQ.

EXAMINATION BY MR. SMITH:
Q: Please state your name for the record.
A: Dr. Sarah Williams.

Q: Dr. Williams, you've been retained as an expert witness in this case, correct?
A: Yes, that's correct.

Q: And what is your area of expertise?
A: I specialize in product safety engineering with a focus on consumer electronics.

Q: How long have you been working in this field?
A: Approximately 22 years.`,
      annotations: {
        gpt4: [
          { x: 50, y: 450, width: 400, height: 50, text: "Expert credentials established early - important for credibility", risk: "low" },
          { x: 50, y: 550, width: 380, height: 40, text: "22 years experience - strong qualification", risk: "low" }
        ],
        claude: [
          { x: 50, y: 350, width: 350, height: 40, text: "Proper case caption and formatting", risk: "low" },
          { x: 50, y: 500, width: 400, height: 60, text: "Consider follow-up on specific product experience", risk: "medium" }
        ]
      }
    }
  ]
}

export default function DocumentViewer({ isOpen, onClose, document }: DocumentViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [showAnnotations, setShowAnnotations] = useState(true)
  const [activeModel, setActiveModel] = useState<'both' | 'gpt4' | 'claude'>('both')
  const [zoomLevel, setZoomLevel] = useState(100)
  const [searchTerm, setSearchTerm] = useState('')

  const pages = samplePages[document?.id as keyof typeof samplePages] || []
  const currentPageData = pages[currentPage - 1]

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < document.pages) setCurrentPage(currentPage + 1)
  }

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 150))
  }

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 50))
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="fixed inset-4 z-50 bg-white rounded-xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-hb-navy to-hb-darkblue text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6" />
                <div>
                  <h3 className="text-lg font-semibold">{document.name}</h3>
                  <p className="text-sm text-hb-lightblue">
                    Page {currentPage} of {document.pages}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Page Navigation */}
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="p-1 hover:bg-white/20 rounded disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-3 text-sm font-medium">
                    {currentPage} / {document.pages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === document.pages}
                    className="p-1 hover:bg-white/20 rounded disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-white/20 rounded"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <span className="text-sm w-12 text-center">{zoomLevel}%</span>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-white/20 rounded"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>

                {/* AI Model Toggle */}
                <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setActiveModel('both')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeModel === 'both' ? 'bg-white text-hb-navy' : 'hover:bg-white/20'
                    }`}
                  >
                    Both
                  </button>
                  <button
                    onClick={() => setActiveModel('gpt4')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeModel === 'gpt4' ? 'bg-purple-500 text-white' : 'hover:bg-white/20'
                    }`}
                  >
                    GPT-4
                  </button>
                  <button
                    onClick={() => setActiveModel('claude')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeModel === 'claude' ? 'bg-blue-500 text-white' : 'hover:bg-white/20'
                    }`}
                  >
                    Claude
                  </button>
                </div>

                <button
                  onClick={() => setShowAnnotations(!showAnnotations)}
                  className={`p-2 rounded ${
                    showAnnotations ? 'bg-white/20' : 'hover:bg-white/20'
                  }`}
                >
                  <Highlighter className="w-5 h-5" />
                </button>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex h-[calc(100%-80px)]">
            {/* Document Display */}
            <div className="flex-1 bg-gray-100 overflow-auto p-8">
              <div
                className="bg-white shadow-lg rounded-lg mx-auto relative"
                style={{
                  width: '850px',
                  minHeight: '1100px',
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: 'top center'
                }}
              >
                {/* Document Content */}
                <div className="p-12 font-serif text-sm leading-relaxed whitespace-pre-wrap relative">
                  {currentPageData?.content}

                  {/* AI Annotations Overlay */}
                  {showAnnotations && currentPageData?.annotations && (
                    <>
                      {/* GPT-4 Vision Annotations */}
                      {(activeModel === 'both' || activeModel === 'gpt4') &&
                        currentPageData.annotations.gpt4?.map((annotation, idx) => (
                          <motion.div
                            key={`gpt4-${idx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute group"
                            style={{
                              top: `${annotation.y}px`,
                              left: `${annotation.x}px`,
                              width: `${annotation.width}px`,
                              height: `${annotation.height}px`
                            }}
                          >
                            <div className={`absolute inset-0 ${
                              annotation.risk === 'high' ? 'bg-red-200/30 border-red-400' :
                              annotation.risk === 'medium' ? 'bg-orange-200/30 border-orange-400' :
                              'bg-green-200/30 border-green-400'
                            } border-2 border-dashed rounded`} />
                            <div className="absolute -top-8 left-0 hidden group-hover:block z-10">
                              <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                                <div className="flex items-center gap-1 mb-1">
                                  <Eye className="w-3 h-3" />
                                  <span className="font-semibold">GPT-4 Vision</span>
                                </div>
                                <p>{annotation.text}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                      {/* Claude Sonnet Annotations */}
                      {(activeModel === 'both' || activeModel === 'claude') &&
                        currentPageData.annotations.claude?.map((annotation, idx) => (
                          <motion.div
                            key={`claude-${idx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute group"
                            style={{
                              top: `${annotation.y}px`,
                              left: `${annotation.x}px`,
                              width: `${annotation.width}px`,
                              height: `${annotation.height}px`
                            }}
                          >
                            <div className={`absolute inset-0 ${
                              annotation.risk === 'high' ? 'bg-red-300/20 border-red-500' :
                              annotation.risk === 'medium' ? 'bg-orange-300/20 border-orange-500' :
                              'bg-green-300/20 border-green-500'
                            } border-2 rounded`} />
                            <div className="absolute -bottom-8 left-0 hidden group-hover:block z-10">
                              <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded shadow-lg">
                                <div className="flex items-center gap-1 mb-1">
                                  <Brain className="w-3 h-3" />
                                  <span className="font-semibold">Claude Sonnet</span>
                                </div>
                                <p>{annotation.text}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - AI Insights */}
            <div className="w-96 bg-white border-l border-gray-200 overflow-auto">
              <div className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Analysis</h4>

                {/* Risk Summary */}
                <Card className="p-4 mb-4 bg-gradient-to-br from-red-50 to-orange-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Risk Level</span>
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">GPT-4 Vision</p>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-600 mb-1">Claude Sonnet</p>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '72%' }} />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Key Findings for Current Page */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">GPT-4 Vision Findings</span>
                    </div>
                    <div className="space-y-2">
                      {currentPageData?.annotations?.gpt4?.map((annotation, idx) => (
                        <div key={idx} className="text-xs p-2 bg-purple-50 rounded border-l-2 border-purple-400">
                          {annotation.text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Claude Sonnet Analysis</span>
                    </div>
                    <div className="space-y-2">
                      {currentPageData?.annotations?.claude?.map((annotation, idx) => (
                        <div key={idx} className="text-xs p-2 bg-blue-50 rounded border-l-2 border-blue-400">
                          {annotation.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Page Actions */}
                <div className="mt-6 space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Comment
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}