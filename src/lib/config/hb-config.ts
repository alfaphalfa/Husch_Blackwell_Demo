// HB-Specific Configuration
export const HB_CONFIG = {
  // Brand Colors
  colors: {
    navy: '#092244',
    darkblue: '#0a3d62',
    blue: '#196ca1',
    lightblue: '#7ad1e4',
    paleblue: '#a8e6f7'
  },
  
  // Target Metrics (Based on HB's goals)
  targets: {
    adoptionRate: 0.78, // 78% target from current 43%
    hoursSavedAnnual: 45000,
    costSavedAnnual: 15700000,
    accuracyRate: 0.992
  },
  
  // Process Chain Configuration
  processChains: {
    defaultTimeout: 30000, // 30 seconds
    steps: {
      upload: { duration: 2000, icon: 'Upload' },
      extraction: { duration: 8000, icon: 'Brain' },
      analysis: { duration: 12000, icon: 'Shield' },
      action: { duration: 3000, icon: 'Zap' },
      export: { duration: 1000, icon: 'Share' }
    }
  },
  
  // Integration Endpoints (Mock for demo)
  integrations: {
    copilot: 'https://graph.microsoft.com/v1.0/me/copilot',
    teams: 'https://graph.microsoft.com/v1.0/teams',
    sharepoint: 'https://graph.microsoft.com/v1.0/sites'
  }
};