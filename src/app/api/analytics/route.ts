import { NextRequest, NextResponse } from 'next/server'

interface AnalyticsEvent {
  event: string
  page?: string
  action?: string
  data?: any
  timestamp: number
  sessionId: string
}

// Simple in-memory storage for analytics (in production, use a database)
const analyticsStore: AnalyticsEvent[] = []

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json()

    // Basic validation
    if (!event.event || !event.timestamp || !event.sessionId) {
      return NextResponse.json({ error: 'Invalid event data' }, { status: 400 })
    }

    // Add server-side timestamp
    const enrichedEvent = {
      ...event,
      serverTimestamp: Date.now(),
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    }

    // Store the event (in production, save to database)
    analyticsStore.push(enrichedEvent)

    // Log important events
    if (event.event === 'document_process') {
      console.log(`[Analytics] Document processed: ${event.data?.documentType}, Success: ${event.data?.success}`)
    }

    // Keep only last 1000 events in memory
    if (analyticsStore.length > 1000) {
      analyticsStore.shift()
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics endpoint error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const sessionId = url.searchParams.get('sessionId')

    if (sessionId) {
      // Get events for specific session
      const sessionEvents = analyticsStore.filter(event => event.sessionId === sessionId)
      return NextResponse.json({ events: sessionEvents })
    }

    // Return analytics summary
    const summary = {
      totalEvents: analyticsStore.length,
      eventTypes: analyticsStore.reduce((acc, event) => {
        acc[event.event] = (acc[event.event] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      recentEvents: analyticsStore.slice(-10).map(event => ({
        event: event.event,
        page: event.page,
        timestamp: event.timestamp,
        sessionId: event.sessionId
      })),
      uniqueSessions: new Set(analyticsStore.map(e => e.sessionId)).size,
      documentsProcessed: analyticsStore.filter(e => e.event === 'document_process').length,
      averageProcessingTime: calculateAverageProcessingTime()
    }

    return NextResponse.json(summary)
  } catch (error) {
    console.error('Analytics GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function calculateAverageProcessingTime(): number {
  const processingEvents = analyticsStore.filter(e =>
    e.event === 'document_process' && e.data?.processingTime
  )

  if (processingEvents.length === 0) return 0

  const total = processingEvents.reduce((sum, e) => sum + e.data.processingTime, 0)
  return Math.round((total / processingEvents.length) * 100) / 100
}

// Endpoint to generate analytics report
export async function DELETE() {
  // Clear analytics data (for demo purposes)
  analyticsStore.length = 0
  return NextResponse.json({ success: true, message: 'Analytics data cleared' })
}