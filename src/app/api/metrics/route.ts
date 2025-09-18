import { NextRequest, NextResponse } from 'next/server'
import { generateMockDashboardMetrics } from '@/lib/mock/demo-data'

export const runtime = 'edge'

/**
 * GET /api/metrics
 * Returns dashboard metrics - uses mock data for demo
 */
export async function GET(request: NextRequest) {
  try {
    // In production, this would query the database
    // For now, return mock data for demo purposes
    const metrics = generateMockDashboardMetrics()

    // Add some dynamic elements to make it feel live
    const now = new Date()
    const documentsToday = Math.floor(Math.random() * 8) + 2
    const currentHourProcessing = Math.floor(Math.random() * 3) + 1

    const enhancedMetrics = {
      ...metrics,
      documentsToday,
      currentHourProcessing,
      lastUpdated: now.toISOString(),
      systemStatus: 'operational',
      apiStatus: {
        openai: process.env.OPENAI_API_KEY ? 'connected' : 'disconnected',
        anthropic: process.env.ANTHROPIC_API_KEY ? 'connected' : 'disconnected',
        supabase: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'connected' : 'disconnected'
      }
    }

    return NextResponse.json({
      success: true,
      data: enhancedMetrics,
      timestamp: now.toISOString()
    })

  } catch (error) {
    console.error('Error fetching metrics:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard metrics',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/metrics
 * Update metrics (for recording new document processing)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { documentType, processingTime, timeSaved, costSaved } = body

    // In production, save to database
    console.log('Recording metrics:', {
      documentType,
      processingTime,
      timeSaved,
      costSaved,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Metrics recorded successfully'
    })

  } catch (error) {
    console.error('Error recording metrics:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to record metrics'
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS method for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}