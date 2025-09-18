import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Create Supabase client (will be inactive if env vars not set)
export const supabase = supabaseUrl === 'https://placeholder.supabase.co' ?
  null as any :
  createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-application-name': 'hb-legal-platform'
      }
    }
  })

// Auth helpers
export const auth = {
  // Sign up new user
  async signUp(email: string, password: string, metadata?: Record<string, any>) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
    return { data, error }
  },

  // Sign in existing user
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Reset password
  async resetPassword(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    return { data, error }
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })
    return { data, error }
  }
}

// Database helpers
export const db = {
  // Documents
  documents: {
    async create(document: any) {
      const { data, error } = await supabase
        .from('documents')
        .insert(document)
        .select()
        .single()
      return { data, error }
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('documents')
        .select('*, analyses(*)')
        .eq('id', id)
        .single()
      return { data, error }
    },

    async getByUser(userId: string) {
      const { data, error } = await supabase
        .from('documents')
        .select('*, analyses(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    async getByOrganization(orgId: string) {
      const { data, error } = await supabase
        .from('documents')
        .select('*, analyses(*), users(full_name, email)')
        .eq('organization_id', orgId)
        .order('created_at', { ascending: false })
      return { data, error }
    },

    async updateStatus(id: string, status: string) {
      if (!supabase) return { data: null, error: new Error('Supabase not configured') }
      const { data, error } = await supabase
        .from('documents')
        .update({ status, processed_at: new Date().toISOString() } as any)
        .eq('id', id)
        .select()
        .single()
      return { data, error }
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id)
      return { error }
    }
  },

  // Analyses
  analyses: {
    async create(analysis: any) {
      const { data, error } = await supabase
        .from('analyses')
        .insert(analysis)
        .select()
        .single()
      return { data, error }
    },

    async getByDocument(documentId: string) {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('document_id', documentId)
        .single()
      return { data, error }
    }
  },

  // Action Items
  actionItems: {
    async create(actionItem: any) {
      const { data, error } = await supabase
        .from('action_items')
        .insert(actionItem)
        .select()
        .single()
      return { data, error }
    },

    async getByUser(userId: string) {
      const { data, error } = await supabase
        .from('action_items')
        .select('*, documents(file_name)')
        .eq('assigned_to', userId)
        .order('due_date', { ascending: true })
      return { data, error }
    },

    async updateStatus(id: string, status: string) {
      const updates: any = { status }
      if (status === 'completed') {
        updates.completed_at = new Date().toISOString()
      }
      const { data, error } = await supabase
        .from('action_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      return { data, error }
    }
  },

  // Metrics
  metrics: {
    async create(metric: any) {
      const { data, error } = await supabase
        .from('processing_metrics')
        .insert(metric)
        .select()
        .single()
      return { data, error }
    },

    async getOrganizationMetrics(orgId: string, days: number = 30) {
      const { data, error } = await supabase
        .rpc('get_organization_metrics', {
          p_org_id: orgId,
          p_days: days
        })
      return { data, error }
    },

    async getDashboardMetrics(orgId: string) {
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('*')
        .eq('organization_id', orgId)
        .single()
      return { data, error }
    },

    async getTeamUsage(orgId: string) {
      const { data, error } = await supabase
        .from('team_usage')
        .select('*')
      return { data, error }
    }
  },

  // Notifications
  notifications: {
    async create(notification: any) {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notification)
        .select()
        .single()
      return { data, error }
    },

    async getByUser(userId: string, unreadOnly: boolean = false) {
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        
      if (unreadOnly) {
        query = query.eq('read', false)
      }
      
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(20)
      
      return { data, error }
    },

    async markAsRead(id: string) {
      const { data, error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id)
        .select()
        .single()
      return { data, error }
    },

    async markAllAsRead(userId: string) {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false)
      return { error }
    }
  },

  // Audit Logs
  audit: {
    async log(action: string, details: any) {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return { error: new Error('No authenticated user') }
      
      const { data, error } = await supabase
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action,
          details,
          ip_address: window.location.hostname,
          user_agent: navigator.userAgent
        })
        .select()
        .single()
      
      return { data, error }
    },

    async getByUser(userId: string, limit: number = 50) {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)
      
      return { data, error }
    }
  }
}

// Storage helpers
export const storage = {
  // Upload document
  async uploadDocument(file: File, userId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) return { error }
    
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName)
    
    return { data: { path: data.path, url: publicUrl }, error: null }
  },

  // Delete document
  async deleteDocument(path: string) {
    const { error } = await supabase.storage
      .from('documents')
      .remove([path])
    
    return { error }
  },

  // Get document URL
  getDocumentUrl(path: string) {
    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(path)
    
    return data.publicUrl
  }
}

// Real-time subscriptions
export const realtime = {
  // Subscribe to document updates
  subscribeToDocuments(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('documents')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to notifications
  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // Unsubscribe from channel
  unsubscribe(channel: any) {
    return supabase.removeChannel(channel)
  }
}

export default supabase
