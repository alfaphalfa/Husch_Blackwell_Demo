'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sampleDocuments } from '@/data/sampleDocuments'
import { fullDocuments } from '@/data/fullDocuments'

// Safe dynamic imports with fallbacks
const DocumentViewer = dynamic(
  () => import('@/components/DocumentViewer'),
  {
    loading: () => <div className="p-4">Loading viewer...</div>,
    ssr: false
  }
)

const ProcessingPipeline = dynamic(
  () => import('@/components/ProcessingPipeline'),
  {
    loading: () => <div className="p-4">Loading pipeline...</div>,
    ssr: false
  }
)

export default function SimpleUploadPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showViewer, setShowViewer] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleSelectDocument = (docId: string) => {
    setSelectedDoc(docId)
    setIsProcessing(true)
    setAnalysis(null)
  }

  const handleProcessingComplete = (result: any) => {
    setAnalysis(result)
    setIsProcessing(false)
  }

  const handleViewDocument = () => {
    if (selectedDoc) {
      setShowViewer(true)
    }
  }

  // Ensure components exist before rendering
  if (!DocumentViewer || !ProcessingPipeline) {
    return <div className="p-8">Loading components...</div>
  }

  const document = selectedDoc ? sampleDocuments[selectedDoc] : null
  const fullDoc = selectedDoc ? fullDocuments[selectedDoc] : null

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Analysis Platform</h1>
        <p className="text-gray-600">Select a document to analyze with AI</p>
      </div>

      {/* Document Selection */}
      {!selectedDoc && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Object.entries(sampleDocuments).map(([id, doc]) => (
            <Card
              key={id}
              className="p-6 cursor-pointer hover:border-blue-400 transition-colors"
              onClick={() => handleSelectDocument(id)}
            >
              <h3 className="font-semibold text-lg mb-2">{doc.title}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {doc.pages} pages • {doc.case || doc.parties?.join(' vs ') || 'Legal Document'}
              </p>
              <Button className="w-full">Select Document</Button>
            </Card>
          ))}
        </div>
      )}

      {/* Selected Document Info */}
      {selectedDoc && document && (
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{document.title}</h2>
              <p className="text-gray-600">
                {document.pages} pages • {document.case || document.parties?.join(' vs ')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleViewDocument}
                disabled={!fullDoc}
              >
                View Full Document
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDoc(null)
                  setIsProcessing(false)
                  setAnalysis(null)
                  setShowViewer(false)
                }}
              >
                Select Different Document
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Processing Pipeline */}
      {isProcessing && selectedDoc && (
        <div className="mb-6">
          <ProcessingPipeline
            document={document}
            onComplete={handleProcessingComplete}
          />
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Key Findings</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.keyFindings?.map((finding: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600">{finding}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Identified Risks</h4>
              <div className="space-y-2">
                {analysis.risks?.map((risk: any, i: number) => (
                  <div key={i} className={`p-2 rounded text-sm ${
                    risk.level === 'high' ? 'bg-red-50 text-red-700' :
                    risk.level === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {risk.description}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysis.recommendations?.map((rec: string, i: number) => (
                  <li key={i} className="text-sm text-gray-600">{rec}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Processing Time: {analysis.processingTime}s</span>
                <span>Confidence: {(analysis.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Document Viewer Modal */}
      {showViewer && fullDoc && DocumentViewer && (
        <DocumentViewer
          isOpen={showViewer}
          onClose={() => setShowViewer(false)}
          document={{
            id: fullDoc.id,
            name: fullDoc.name,
            pages: fullDoc.totalPages,
            content: fullDoc.pages
          }}
        />
      )}
    </div>
  )
}