'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, TrendingUp, Zap, Settings, Activity, CheckCircle } from 'lucide-react';
import WorkflowSimulator from '@/components/features/WorkflowSimulator';
import { toast } from 'sonner';

const workflowTemplates = [
  {
    id: 'kira-contract',
    name: 'KIRA-Style Contract Review',
    description: 'Automated extraction and risk analysis',
    executions: '2,847',
    avgTime: '4.2 min',
    roi: '387%',
    status: 'active'
  },
  {
    id: 'copilot-integration',
    name: 'Microsoft 365 Integration',
    description: 'Seamless document flow to Teams',
    executions: '1,923',
    avgTime: '2.8 min',
    roi: '245%',
    status: 'active'
  },
  {
    id: 'escalation',
    name: 'Risk Escalation Chain',
    description: 'Auto-notify partners on high risk',
    executions: '347',
    avgTime: '45 sec',
    roi: 'Critical',
    status: 'active'
  },
  {
    id: 'discovery',
    name: 'Discovery Processing',
    description: 'Batch process discovery documents',
    executions: '5,892',
    avgTime: '12.3 min',
    roi: '892%',
    status: 'active'
  },
  {
    id: 'deposition',
    name: 'Deposition Prep',
    description: 'Auto-generate deposition outlines',
    executions: '892',
    avgTime: '8.7 min',
    roi: '156%',
    status: 'paused'
  },
  {
    id: 'billing',
    name: 'Billing Automation',
    description: 'Generate client billing from matters',
    executions: '12,847',
    avgTime: '1.2 min',
    roi: '723%',
    status: 'active'
  }
];

const activeWorkflows = [
  { name: 'Contract Review Workflow', status: 'running', progress: 67, documents: 48 },
  { name: 'Discovery Processing', status: 'running', progress: 23, documents: 1847 },
  { name: 'Deposition Prep', status: 'completed', progress: 100, documents: 23 },
  { name: 'Risk Analysis', status: 'running', progress: 89, documents: 12 }
];

export default function WorkflowsPage() {
  const [showSimulator, setShowSimulator] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Workflow Automation</h1>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">47 Workflows Deployed</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">12,847 Executions This Month</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">Average ROI: 487%</span>
            </div>
          </div>
        </div>

        {/* Workflow Simulator */}
        {showSimulator && (
          <div className="mb-8">
            <WorkflowSimulator />
          </div>
        )}

        {/* Workflow Templates Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Workflow Templates</h2>
          <div className="grid grid-cols-3 gap-6">
            {workflowTemplates.map((workflow) => (
              <motion.div
                key={workflow.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{workflow.name}</h3>
                    <p className="text-sm text-gray-400">{workflow.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    workflow.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {workflow.status}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Executions</p>
                    <p className="text-lg font-semibold text-blue-400">{workflow.executions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Avg Time</p>
                    <p className="text-lg font-semibold text-green-400">{workflow.avgTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ROI</p>
                    <p className="text-lg font-semibold text-purple-400">{workflow.roi}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowSimulator(true);
                    toast.info('Opening workflow configurator');
                  }}
                  className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Workflows */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Active Workflows</h2>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700">
            {activeWorkflows.map((workflow, index) => (
              <div
                key={index}
                className="p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {workflow.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Activity className="w-5 h-5 text-blue-400" />
                      </motion.div>
                    )}
                    <span className="text-white font-medium">{workflow.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{workflow.documents} documents</span>
                    <span className={`text-sm ${
                      workflow.status === 'completed' ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      {workflow.progress}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${workflow.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${
                      workflow.status === 'completed'
                        ? 'bg-green-500'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}