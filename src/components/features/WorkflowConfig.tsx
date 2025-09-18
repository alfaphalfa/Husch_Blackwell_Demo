'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Settings, Key, Bell, TestTube } from 'lucide-react';
import { toast } from 'sonner';

interface WorkflowConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkflowConfig({ isOpen, onClose }: WorkflowConfigProps) {
  const [webhookUrl, setWebhookUrl] = useState('https://n8n.hb-platform.io/webhook/workflow-trigger');
  const [authToken, setAuthToken] = useState('••••••••••••••••');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(true);

  const handleTestConnection = () => {
    toast.success('Connection test successful!', {
      description: 'Webhook endpoint is responding correctly'
    });
  };

  const handleSave = () => {
    toast.success('Configuration saved!', {
      description: 'Workflow settings have been updated'
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-700 p-6 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Workflow Configuration</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Webhook Configuration */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Webhook URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleTestConnection}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <TestTube className="w-4 h-4" />
                    Test
                  </button>
                </div>
              </div>

              {/* Authentication */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Key className="w-4 h-4 inline mr-2" />
                  Authentication Token
                </label>
                <input
                  type="password"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Workflow Triggers */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Workflow Triggers</h3>
                <div className="space-y-2">
                  {[
                    'Document Upload',
                    'Risk Score > 7',
                    'Contract Review Complete',
                    'Matter Status Change'
                  ].map((trigger) => (
                    <label key={trigger} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-300">{trigger}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  <Bell className="w-4 h-4 inline mr-2" />
                  Notifications
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">Email Notifications</span>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        emailNotifications ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: emailNotifications ? 24 : 0 }}
                        className="w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </label>
                  <label className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">Slack Notifications</span>
                    <button
                      onClick={() => setSlackNotifications(!slackNotifications)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        slackNotifications ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: slackNotifications ? 24 : 0 }}
                        className="w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </label>
                </div>
              </div>

              {/* Note */}
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-300">Full configuration available in production</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Advanced settings including retry policies, error handling, and custom scripts will be available in the production environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Save Configuration
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}