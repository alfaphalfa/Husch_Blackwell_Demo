import { NextRequest, NextResponse } from 'next/server'
import { processDocument } from '@/lib/ai/orchestration'

export const runtime = 'edge'
export const maxDuration = 60 // 60 seconds timeout

// Simple rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map()

function rateLimit(ip: string, limit: number = 10, window: number = 60000): boolean {
  const now = Date.now()
  const windowStart = now - window

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [])
  }

  const requests = rateLimitMap.get(ip).filter((timestamp: number) => timestamp > windowStart)

  if (requests.length >= limit) {
    return false
  }

  requests.push(now)
  rateLimitMap.set(ip, requests)
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(ip, 5, 60000)) { // 5 requests per minute
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // Check for API keys
    if (!process.env.OPENAI_API_KEY || !process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI services not configured' },
        { status: 503 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const documentType = formData.get('documentType') as string | null
    const urgency = formData.get('urgency') as string | null

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/png',
      'image/jpeg',
      'image/jpg'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Supported: PDF, DOC, DOCX, PNG, JPG' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Process document with AI orchestration
    console.log(`Processing ${file.name} (${file.type})...`)
    const startTime = Date.now()
    
    const analysis = await processDocument(buffer, documentType || undefined)
    
    const processingTime = (Date.now() - startTime) / 1000
    console.log(`✅ Processing complete in ${processingTime}s`)

    // Log metrics (in production, save to database)
    const metrics = {
      fileName: file.name,
      fileSize: file.size,
      documentType: analysis.extraction.documentType,
      processingTime,
      timeSaved: analysis.timeSaved,
      costSaved: analysis.costSaved,
      confidence: analysis.extraction.confidence,
      timestamp: new Date().toISOString()
    }

    console.log('Metrics:', metrics)

    // Return analysis results
    return NextResponse.json({
      success: true,
      analysis,
      metrics,
      message: `Document processed successfully in ${processingTime.toFixed(1)}s`
    })

  } catch (error) {
    console.error('Document processing error:', error)
    
    // Determine error type and message
    let errorMessage = 'Failed to process document'
    let statusCode = 500

    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        errorMessage = 'API rate limit exceeded. Please try again later.'
        statusCode = 429
      } else if (error.message.includes('authentication')) {
        errorMessage = 'API authentication failed'
        statusCode = 401
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json(
      { 
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: statusCode }
    )
  }
}

// OPTIONS method for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
