// Add these HB-specific types
export interface ProcessChainStep {
  id: number;
  name: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  duration?: number;
  icon?: React.ReactNode;
}

export interface HBMetrics {
  hoursSaved: number;
  costSaved: number;
  documentsProcessed: number;
  accuracy: number;
  adoptionRate: number;
}

export interface WorkflowChain {
  steps: string[];
  currentStep: number;
  startTime: Date;
  estimatedCompletion: number;
}