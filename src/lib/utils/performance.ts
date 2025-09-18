/**
 * Performance optimization utilities for HB Legal Intelligence Platform
 */

// Request caching with TTL
interface CacheItem {
  data: any
  timestamp: number
  ttl: number
}

class RequestCache {
  private cache = new Map<string, CacheItem>()

  set(key: string, data: any, ttlMs: number = 5 * 60 * 1000) { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }
}

export const requestCache = new RequestCache()

// Debounced function utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

// Throttled function utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Image lazy loading utility
export function createImageLoader(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Bundle size analyzer
export function logBundleInfo() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Performance metrics available in browser dev tools')

    // Log largest contentful paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log(`LCP: ${entry.startTime}ms`)
          }
        })
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    }
  }
}

// Memory usage monitor
export function getMemoryUsage(): {
  used: number
  total: number
  percentage: number
} | null {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      percentage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
    }
  }
  return null
}

// Rate limiting utility
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  constructor(
    private maxRequests: number = 10,
    private windowMs: number = 60 * 1000 // 1 minute
  ) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const windowStart = now - this.windowMs

    // Get existing requests for this identifier
    let requests = this.requests.get(identifier) || []

    // Filter out old requests
    requests = requests.filter(time => time > windowStart)

    // Check if limit is exceeded
    if (requests.length >= this.maxRequests) {
      return false
    }

    // Add current request
    requests.push(now)
    this.requests.set(identifier, requests)

    return true
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now()
    const windowStart = now - this.windowMs
    const requests = this.requests.get(identifier) || []
    const validRequests = requests.filter(time => time > windowStart)

    return Math.max(0, this.maxRequests - validRequests.length)
  }

  getResetTime(identifier: string): number {
    const requests = this.requests.get(identifier) || []
    if (requests.length === 0) return 0

    const oldestRequest = Math.min(...requests)
    return oldestRequest + this.windowMs
  }
}

// API optimization utilities
export const apiOptimization = {
  // Fetch with retry logic
  async fetchWithRetry(
    url: string,
    options: RequestInit = {},
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<Response> {
    let lastError: Error

    for (let i = 0; i <= maxRetries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          signal: AbortSignal.timeout(30000) // 30 second timeout
        })

        if (response.ok) {
          return response
        }

        // Don't retry 4xx errors (except 429 rate limit)
        if (response.status >= 400 && response.status < 500 && response.status !== 429) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      } catch (error) {
        lastError = error as Error

        if (i < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
        }
      }
    }

    throw lastError!
  },

  // Request deduplication
  activeRequests: new Map<string, Promise<any>>(),

  async dedupedFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    if (this.activeRequests.has(key)) {
      return this.activeRequests.get(key)!
    }

    const promise = fetchFn().finally(() => {
      this.activeRequests.delete(key)
    })

    this.activeRequests.set(key, promise)
    return promise
  }
}

// Performance monitoring
export function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    const start = performance.now()

    fn()
      .then((result) => {
        const end = performance.now()
        const duration = end - start

        if (process.env.NODE_ENV === 'development') {
          console.log(`${name} took ${duration.toFixed(2)}ms`)
        }

        // Send to analytics if configured
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'performance_measure', {
            custom_parameter: name,
            value: Math.round(duration)
          })
        }

        resolve(result)
      })
      .catch(reject)
  })
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof document !== 'undefined') {
    const resources = [
      '/fonts/inter.woff2',
      '/images/hb-logo.svg'
    ]

    resources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = resource.endsWith('.woff2') ? 'font' : 'image'
      link.href = resource
      if (link.as === 'font') {
        link.crossOrigin = 'anonymous'
      }
      document.head.appendChild(link)
    })
  }
}

declare global {
  interface Window {
    gtag?: Function
  }
}