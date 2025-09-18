'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Zap, CheckCircle, ArrowRight, Clock } from 'lucide-react';

const processSteps = [
  { name: 'Upload', icon: FileText, time: '0.5s' },
  { name: 'Extract', icon: Zap, time: '1.2s' },
  { name: 'Analyze', icon: Zap, time: '2.8s' },
  { name: 'Review', icon: CheckCircle, time: '0.8s' },
  { name: 'Complete', icon: CheckCircle, time: '0.2s' }
];

export default function AnimatedProcessChain() {
  const [activeDocument, setActiveDocument] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDocument(prev => (prev + 1) % 5);
      setActiveStep(0);

      processSteps.forEach((_, index) => {
        setTimeout(() => {
          setActiveStep(index);
        }, index * 800);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900 rounded-xl p-8 border border-indigo-500/20">
      <h2 className="text-2xl font-bold text-white mb-6">Automated Process Chain</h2>

      <div className="relative h-64 bg-gray-800/30 rounded-lg p-6 overflow-hidden">
        {/* Process Steps */}
        <div className="flex items-center justify-between relative z-10">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.name}>
                <motion.div
                  animate={{
                    scale: activeStep === index ? 1.2 : 1,
                    opacity: activeStep >= index ? 1 : 0.5
                  }}
                  className="relative"
                >
                  <div
                    className={`w-20 h-20 rounded-lg flex flex-col items-center justify-center border-2 transition-all ${
                      activeStep === index
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent shadow-lg shadow-indigo-500/50'
                        : activeStep > index
                        ? 'bg-green-500/20 border-green-500'
                        : 'bg-gray-700/50 border-gray-600'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white mb-1" />
                    <span className="text-xs text-white">{step.name}</span>
                  </div>
                  {activeStep === index && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <span className="text-xs text-indigo-400">{step.time}</span>
                    </div>
                  )}
                </motion.div>

                {index < processSteps.length - 1 && (
                  <motion.div
                    animate={{
                      scaleX: activeStep > index ? 1 : 0,
                      opacity: activeStep > index ? 1 : 0.3
                    }}
                    className="flex-1 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 origin-left"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Animated Document */}
        <AnimatePresence>
          {activeStep >= 0 && (
            <motion.div
              key={activeDocument}
              initial={{ x: -50, y: 100, opacity: 0 }}
              animate={{
                x: activeStep * 160,
                y: 100,
                opacity: 1
              }}
              exit={{ x: 800, y: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-12 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center"
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Particle Effects */}
        {activeStep >= 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: activeStep * 160 + 40,
                  y: 120,
                  opacity: 1
                }}
                animate={{
                  x: activeStep * 160 + 40 + (Math.random() - 0.5) * 100,
                  y: 120 + (Math.random() - 0.5) * 100,
                  opacity: 0
                }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="absolute w-1 h-1 bg-indigo-400 rounded-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400">Documents/Hour</span>
          </div>
          <p className="text-xl font-bold text-white">847</p>
        </div>
        <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">Avg Process Time</span>
          </div>
          <p className="text-xl font-bold text-white">4.2 sec</p>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">Accuracy</span>
          </div>
          <p className="text-xl font-bold text-white">99.7%</p>
        </div>
      </div>
    </div>
  );
}