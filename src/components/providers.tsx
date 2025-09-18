'use client'

import { ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // In a production app, you would add providers here such as:
  // - Authentication provider (Supabase, Auth0, etc.)
  // - Theme provider
  // - Analytics provider
  // - State management provider
  
  return (
    <>
      {children}
    </>
  )
}
