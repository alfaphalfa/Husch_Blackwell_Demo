'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Simple analytics tracking for HB Legal Intelligence Platform
export interface AnalyticsEvent {
  event: string
  page?: string
  action?: string
  data?: Record<string, unknown>
  timestamp: number
  sessionId: string
}

class Analytics {
  private sessionId: string
  private events: AnalyticsEvent[] = []
  private isDevelopment: boolean

  constructor() {
    this.sessionId = `hb-${Date.now()}-${Math.random().toString(36).substring(2)}`
    this.isDevelopment = process.env.NODE_ENV === 'development'
  }

  // Track page views
  trackPageView(page: string) {
    this.track('page_view', { page })
  }

  // Track user interactions
  trackEvent(action: string, data?: Record<string, unknown>) {
    this.track('user_interaction', { action, ...data })
  }

  // Track document processing
  trackDocumentProcess(documentType: string, processingTime: number, success: boolean) {
    this.track('document_process', {
      documentType,
      processingTime,
      success,
      timeSaved: this.calculateTimeSaved(documentType),
      cost: this.calculateCost(processingTime)
    })
  }

  // Track demo usage
  trackDemoUsage(demoType: string, completion: boolean) {
    this.track('demo_usage', {
      demoType,
      completion,
      timestamp: Date.now()
    })
  }

  // Track errors
  trackError(error: string, page: string, context?: Record<string, unknown>) {
    this.track('error', {
      error,
      page,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href
    })
  }

  private track(event: string, data?: Record<string, unknown>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      page: window.location.pathname,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      ...data
    }

    this.events.push(analyticsEvent)

    // Log to console in development
    if (this.isDevelopment) {
      console.log('[Analytics]', analyticsEvent)
    }

    // Send to analytics endpoint
    this.sendToEndpoint(analyticsEvent)

    // Keep only last 100 events in memory
    if (this.events.length > 100) {
      this.events.shift()
    }
  }

  private async sendToEndpoint(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      // Silently fail for analytics - don't break user experience
      if (this.isDevelopment) {
        console.warn('Analytics endpoint failed:', error)
      }
    }
  }

  private calculateCost(processingTime: number): number {
    // Rough estimate based on API costs
    const gptCost = 0.002 // per request
    const claudeCost = 0.008 // per request
    return Math.round((gptCost + claudeCost) * 100) / 100
  }

  private calculateTimeSaved(documentType: string): number {
    // Estimates based on document type
    const timeMap = {
      'Contract': 2.5,
      'Deposition': 4.5,
      'Discovery': 8.0,
      'M&A Agreement': 6.0
    }
    return timeMap[documentType as keyof typeof timeMap] || 3.0
  }

  // Get session summary
  getSessionSummary() {
    const events = this.events
    const pageViews = events.filter(e => e.event === 'page_view').length
    const interactions = events.filter(e => e.event === 'user_interaction').length
    const documentProcesses = events.filter(e => e.event === 'document_process')

    return {
      sessionId: this.sessionId,
      pageViews,
      interactions,
      documentsProcessed: documentProcesses.length,
      totalTimeSaved: documentProcesses.reduce((sum, e) => sum + ((e.data as Record<string, unknown>)?.timeSaved as number || 0), 0),
      totalCostSaved: documentProcesses.reduce((sum, e) => sum + (((e.data as Record<string, unknown>)?.timeSaved as number || 0) * 175), 0), // $175/hour
      sessionDuration: events.length > 0 ? Date.now() - events[0].timestamp : 0
    }
  }
}

// Global analytics instance
export const analytics = new Analytics()

// Hook for automatic page view tracking
export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    analytics.trackPageView(pathname)
  }, [pathname])

  return analytics
}

// Component for tracking page views
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useAnalytics()
  return <>{children}</>
}

// Hook for tracking interactions
export function useTrackInteraction() {
  return (action: string, data?: Record<string, unknown>) => {
    analytics.trackEvent(action, data)
  }
}