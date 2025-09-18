/**
 * Supabase Database Operations for HB Legal Intelligence Platform
 * Handles document storage, metrics tracking, and user actions
 */

import { createClient } from '@supabase/supabase-js'
import type { DocumentAnalysis } from '@/lib/ai/orchestration'

// Initialize Supabase client (only if environment variables are present)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export interface DocumentRecord {
  id: string
  file_name: string
  file_size: number
  document_type: string
  analysis_result: DocumentAnalysis
  processing_time: number
  time_saved: number
  cost_saved: number
  confidence: number
  user_id?: string
  created_at: string
  updated_at: string
}

export interface MetricsRecord {
  id: string
  document_type: string
  processing_time: number
  time_saved: number
  cost_saved: number
  confidence: number
  date: string
  user_id?: string
}

export interface UserAction {
  id: string
  document_id: string
  action_type: 'uploaded' | 'processed' | 'exported' | 'shared'
  metadata?: Record<string, any>
  user_id?: string
  created_at: string
}

/**
 * Check if Supabase is configured and available
 */
export function isSupabaseAvailable(): boolean {
  return !!supabase
}

/**
 * Save processed document to database
 */
export async function saveDocument(
  fileName: string,
  fileSize: number,
  analysis: DocumentAnalysis,
  processingTime: number,
  userId?: string
): Promise<DocumentRecord | null> {
  if (!supabase) {
    console.log('Supabase not configured, skipping document save')
    return null
  }

  try {
    const documentRecord: Omit<DocumentRecord, 'id' | 'created_at' | 'updated_at'> = {
      file_name: fileName,
      file_size: fileSize,
      document_type: analysis.extraction.documentType,
      analysis_result: analysis,
      processing_time: processingTime,
      time_saved: analysis.timeSaved,
      cost_saved: analysis.costSaved,
      confidence: analysis.extraction.confidence,
      user_id: userId
    }

    const { data, error } = await supabase
      .from('documents')
      .insert([documentRecord])
      .select()
      .single()

    if (error) {
      console.error('Error saving document:', error)
      return null
    }

    console.log('Document saved successfully:', data.id)
    return data
  } catch (error) {
    console.error('Error saving document:', error)
    return null
  }
}

/**
 * Record processing metrics
 */
export async function recordMetrics(
  documentType: string,
  processingTime: number,
  timeSaved: number,
  costSaved: number,
  confidence: number,
  userId?: string
): Promise<MetricsRecord | null> {
  if (!supabase) {
    console.log('Supabase not configured, skipping metrics recording')
    return null
  }

  try {
    const metricsRecord: Omit<MetricsRecord, 'id'> = {
      document_type: documentType,
      processing_time: processingTime,
      time_saved: timeSaved,
      cost_saved: costSaved,
      confidence: confidence,
      date: new Date().toISOString().split('T')[0],
      user_id: userId
    }

    const { data, error } = await supabase
      .from('metrics')
      .insert([metricsRecord])
      .select()
      .single()

    if (error) {
      console.error('Error recording metrics:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error recording metrics:', error)
    return null
  }
}

/**
 * Track user actions for analytics
 */
export async function trackUserAction(
  documentId: string,
  actionType: UserAction['action_type'],
  metadata?: Record<string, any>,
  userId?: string
): Promise<UserAction | null> {
  if (!supabase) {
    return null
  }

  try {
    const action: Omit<UserAction, 'id' | 'created_at'> = {
      document_id: documentId,
      action_type: actionType,
      metadata,
      user_id: userId
    }

    const { data, error } = await supabase
      .from('user_actions')
      .insert([action])
      .select()
      .single()

    if (error) {
      console.error('Error tracking user action:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error tracking user action:', error)
    return null
  }
}

/**
 * Get dashboard metrics from database
 */
export async function getDashboardMetrics(userId?: string) {
  if (!supabase) {
    return null
  }

  try {
    // Get total documents processed
    let documentsQuery = supabase
      .from('documents')
      .select('*', { count: 'exact' })

    if (userId) {
      documentsQuery = documentsQuery.eq('user_id', userId)
    }

    const { count: totalDocuments, error: documentsError } = await documentsQuery

    if (documentsError) {
      console.error('Error fetching document count:', documentsError)
      return null
    }

    // Get metrics for this month
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
    let metricsQuery = supabase
      .from('metrics')
      .select('*')
      .gte('date', `${currentMonth}-01`)

    if (userId) {
      metricsQuery = metricsQuery.eq('user_id', userId)
    }

    const { data: monthlyMetrics, error: metricsError } = await metricsQuery

    if (metricsError) {
      console.error('Error fetching metrics:', metricsError)
      return null
    }

    // Calculate aggregated metrics
    const totalTimeSaved = monthlyMetrics?.reduce((sum, m) => sum + m.time_saved, 0) || 0
    const totalCostSaved = monthlyMetrics?.reduce((sum, m) => sum + m.cost_saved, 0) || 0
    const avgProcessingTime = monthlyMetrics?.length > 0
      ? monthlyMetrics.reduce((sum, m) => sum + m.processing_time, 0) / monthlyMetrics.length
      : 0
    const avgAccuracy = monthlyMetrics?.length > 0
      ? monthlyMetrics.reduce((sum, m) => sum + m.confidence, 0) / monthlyMetrics.length
      : 0

    // Get recent documents
    let recentQuery = supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (userId) {
      recentQuery = recentQuery.eq('user_id', userId)
    }

    const { data: recentDocuments, error: recentError } = await recentQuery

    if (recentError) {
      console.error('Error fetching recent documents:', recentError)
    }

    return {
      totalDocuments: totalDocuments || 0,
      documentsThisMonth: monthlyMetrics?.length || 0,
      totalTimeSaved,
      totalCostSaved,
      avgProcessingTime: Math.round(avgProcessingTime * 10) / 10,
      accuracy: Math.round(avgAccuracy * 10) / 10,
      recentProcessing: recentDocuments?.map(doc => ({
        id: doc.id,
        fileName: doc.file_name,
        documentType: doc.document_type,
        processedAt: doc.created_at,
        timeSaved: doc.time_saved,
        costSaved: doc.cost_saved,
        status: 'completed'
      })) || []
    }
  } catch (error) {
    console.error('Error getting dashboard metrics:', error)
    return null
  }
}

/**
 * Get document by ID
 */
export async function getDocument(documentId: string, userId?: string): Promise<DocumentRecord | null> {
  if (!supabase) {
    return null
  }

  try {
    let query = supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query.single()

    if (error) {
      console.error('Error fetching document:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching document:', error)
    return null
  }
}

/**
 * Get documents with pagination
 */
export async function getDocuments(
  page: number = 1,
  limit: number = 20,
  userId?: string
): Promise<{ documents: DocumentRecord[]; total: number } | null> {
  if (!supabase) {
    return null
  }

  try {
    const offset = (page - 1) * limit

    let query = supabase
      .from('documents')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, count, error } = await query

    if (error) {
      console.error('Error fetching documents:', error)
      return null
    }

    return {
      documents: data || [],
      total: count || 0
    }
  } catch (error) {
    console.error('Error fetching documents:', error)
    return null
  }
}

/**
 * Delete document (soft delete by updating status)
 */
export async function deleteDocument(documentId: string, userId?: string): Promise<boolean> {
  if (!supabase) {
    return false
  }

  try {
    let query = supabase
      .from('documents')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', documentId)

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { error } = await query

    if (error) {
      console.error('Error deleting document:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting document:', error)
    return false
  }
}

/**
 * Get processing statistics by document type
 */
export async function getDocumentTypeStats(userId?: string) {
  if (!supabase) {
    return null
  }

  try {
    let query = supabase
      .from('documents')
      .select('document_type')

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching document type stats:', error)
      return null
    }

    // Group by document type and count
    const typeCount = data?.reduce((acc: Record<string, number>, doc) => {
      acc[doc.document_type] = (acc[doc.document_type] || 0) + 1
      return acc
    }, {}) || {}

    const total = Object.values(typeCount).reduce((sum: number, count: number) => sum + count, 0)

    return Object.entries(typeCount).map(([type, count]) => ({
      type,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }))
  } catch (error) {
    console.error('Error fetching document type stats:', error)
    return null
  }
}

/**
 * Export utility functions
 */
export {
  supabase as default,
  supabaseUrl,
  supabaseKey
}