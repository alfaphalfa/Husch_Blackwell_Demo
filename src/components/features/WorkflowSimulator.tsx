'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, DollarSign, Zap, ArrowRight, Play, Settings } from 'lucide-react';
import { toast } from 'sonner';

const workflows = [
  {
    id: 'kira-contract',
    name: 'KIRA-Style Contract Review',
    description: 'Automated 937 contracts in 4 hours',
    steps: ['Upload', 'Extract', 'Risk Analysis', 'Partner Review', 'Client Report'],
    timeSaved: '399 hours',
    costSaved: '$139,650',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'copilot-integration',
    name: 'Copilot Integration Flow',
    description: 'Seamless Microsoft 365 workflow',
    steps: ['Process', 'Format', 'Export to Teams', 'Create Tasks', 'Schedule Follow-up'],
    timeSaved: '8 hours/document',
    costSaved: '$2,800/document',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 'escalation',
    name: 'High-Risk Escalation Chain',
    description: 'Automatic partner notification',
    steps: ['Risk Detection', 'Partner Alert', 'Client Hold', 'Emergency Review', 'Mitigation Plan'],
    timeSaved: '2 hours response',
    costSaved: 'Risk mitigation',
    color: 'from-red-500 to-orange-600'
  }
];

export default function WorkflowSimulator() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);
  const [activeStep, setActiveStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setActiveStep(0);

    selectedWorkflow.steps.forEach((_, index) => {
      setTimeout(() => {
        setActiveStep(index);
        if (index === selectedWorkflow.steps.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setActiveStep(-1);
            toast.success('Workflow deployed successfully!', {
              description: `Saved ${selectedWorkflow.timeSaved} and ${selectedWorkflow.costSaved}`
            });
          }, 1000);
        }
      }, (index + 1) * 1200);
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 rounded-xl p-8 border border-blue-500/20">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Workflow Orchestration</h2>
          <p className="text-blue-200">Visual workflow builder with n8n integration</p>
        </div>
        <button
          onClick={() => toast.info('Configuration panel coming soon')}
          className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          <Settings className="w-5 h-5 text-blue-300" />
        </button>
      </div>

      {/* Workflow Selector */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {workflows.map((workflow) => (
          <motion.button
            key={workflow.id}
            onClick={() => {
              setSelectedWorkflow(workflow);
              setActiveStep(-1);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg border transition-all ${
              selectedWorkflow.id === workflow.id
                ? 'bg-gradient-to-br ' + workflow.color + ' border-transparent text-white'
                : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600'
            }`}
          >
            <h3 className="font-semibold mb-1">{workflow.name}</h3>
            <p className="text-sm opacity-90">{workflow.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Workflow Visualization */}
      <div className="bg-gray-800/30 rounded-lg p-6 mb-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          {selectedWorkflow.steps.map((step, index) => (
            <React.Fragment key={step}>
              <motion.div
                animate={{
                  scale: activeStep === index ? 1.1 : 1,
                  opacity: activeStep >= index || activeStep === -1 ? 1 : 0.5
                }}
                className="relative"
              >
                <div
                  className={`w-32 h-32 rounded-lg flex flex-col items-center justify-center border-2 transition-all ${
                    activeStep === index
                      ? 'bg-gradient-to-br ' + selectedWorkflow.color + ' border-transparent shadow-lg shadow-blue-500/50'
                      : activeStep > index
                      ? 'bg-green-500/20 border-green-500'
                      : 'bg-gray-700/50 border-gray-600'
                  }`}
                >
                  {activeStep > index && (
                    <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                  )}
                  {activeStep === index && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mb-2"
                    >
                      <Zap className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                  {activeStep < index && (
                    <div className="w-8 h-8 rounded-full bg-gray-600 mb-2" />
                  )}
                  <span className="text-sm font-medium text-center px-2">{step}</span>
                </div>

                {/* Animated particles */}
                {activeStep === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 100 - 50,
                          opacity: 0
                        }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>

              {index < selectedWorkflow.steps.length - 1 && (
                <motion.div
                  animate={{
                    opacity: activeStep > index ? 1 : 0.3,
                    scaleX: activeStep > index ? 1 : 0.5
                  }}
                  className="flex-1 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-2 origin-left"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Metrics Display */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Time Saved</span>
            </div>
            <p className="text-2xl font-bold text-white">{selectedWorkflow.timeSaved}</p>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">Cost Saved</span>
            </div>
            <p className="text-2xl font-bold text-white">{selectedWorkflow.costSaved}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <motion.button
          onClick={runSimulation}
          disabled={isRunning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-5 h-5" />
          {isRunning ? 'Running Workflow...' : 'Deploy Workflow'}
        </motion.button>
        <motion.button
          onClick={() => toast.info('Advanced configuration available in production')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
        >
          Configure
        </motion.button>
      </div>
    </div>
  );
}