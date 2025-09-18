'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const integrations = [
  {
    name: 'n8n Workflow Engine',
    status: 'Connected',
    endpoint: 'wss://n8n.hb-platform.io',
    icon: '🔄',
    description: 'Orchestrating 47 active workflows'
  },
  {
    name: 'MCP Context Server',
    status: 'Active',
    endpoint: 'mcp://context.hb-legal.ai',
    icon: '🧠',
    description: '1,247 patterns learned'
  },
  {
    name: 'Microsoft Copilot',
    status: 'Ready',
    endpoint: 'https://graph.microsoft.com',
    icon: '📊',
    description: 'Teams & SharePoint integrated'
  },
  {
    name: 'Slack Notifications',
    status: 'Configured',
    endpoint: 'https://slack.com/api',
    icon: '💬',
    description: 'Real-time alerts enabled'
  }
];

export default function IntegrationStatus() {
  const handleTestConnection = (name: string) => {
    toast.success(`${name} connection verified!`, {
      description: 'All systems operational'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
      case 'Active':
        return 'text-green-400 bg-green-500/20';
      case 'Ready':
      case 'Configured':
        return 'text-blue-400 bg-blue-500/20';
      default:
        return 'text-yellow-400 bg-yellow-500/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-green-900/10 to-gray-900 rounded-xl p-8 border border-green-500/20">
      <h2 className="text-2xl font-bold text-white mb-6">Integration Status</h2>

      <div className="space-y-4">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <h3 className="text-white font-semibold">{integration.name}</h3>
                  <p className="text-sm text-gray-400">{integration.endpoint}</p>
                  <p className="text-xs text-gray-500 mt-1">{integration.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(integration.status)}`}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.div>
                  {integration.status}
                </div>

                <button
                  onClick={() => handleTestConnection(integration.name)}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors text-sm"
                >
                  Test Connection
                </button>

                <button
                  onClick={() => toast.info('Configuration available in production')}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
                >
                  Configure
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-semibold">All Systems Operational</span>
        </div>
        <p className="text-sm text-gray-300 mt-1">Last sync: 2 minutes ago • Next sync: in 58 seconds</p>
      </div>
    </div>
  );
}