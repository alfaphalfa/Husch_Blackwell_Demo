/**
 * Simplified Supabase client for production build compatibility
 */

export const supabase = null // Simplified for demo

export function isSupabaseAvailable(): boolean {
  return false
}

export async function saveDocument() {
  return null
}

export async function recordMetrics() {
  return null
}

export async function getDashboardMetrics() {
  return null
}