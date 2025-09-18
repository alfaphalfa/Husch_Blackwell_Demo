'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({ error, errorInfo })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // Send to analytics/monitoring service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false
      })
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  private handleReportBug = () => {
    const subject = encodeURIComponent('Bug Report - HB Legal Intelligence Platform')
    const body = encodeURIComponent(`
Error: ${this.state.error?.message || 'Unknown error'}
Stack: ${this.state.error?.stack || 'No stack trace'}
Component Stack: ${this.state.errorInfo?.componentStack || 'No component stack'}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
    `)

    window.open(`mailto:support@hb.com?subject=${subject}&body=${body}`)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
          <Card className="max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>

            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. This has been logged and our team will investigate.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  Error Details (Development)
                </summary>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.error.stack && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="mt-1 text-xs overflow-auto bg-white p-2 rounded border">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="space-y-3">
              <Button
                onClick={this.handleRetry}
                className="w-full bg-hb-navy hover:bg-hb-darkblue text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>

                <Button
                  variant="outline"
                  onClick={this.handleReportBug}
                  className="flex-1"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  Report Bug
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                HB Legal Intelligence Platform
                <br />
                Error ID: {Date.now().toString(36)}
              </p>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  return WrappedComponent
}

// Simple error boundary for specific components
export function SimpleErrorBoundary({
  children,
  message = "Something went wrong with this component"
}: {
  children: ReactNode
  message?: string
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
          <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-red-700">{message}</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}