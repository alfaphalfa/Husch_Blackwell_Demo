'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Link2, TrendingUp, Database } from 'lucide-react';

const contextData = [
  { id: 'MSA_Acme_2024', x: 300, y: 200, connections: ['SOW_Acme_1', 'SOW_Acme_2', 'Amendment_1'] },
  { id: 'SOW_Acme_1', x: 500, y: 150, connections: [] },
  { id: 'SOW_Acme_2', x: 500, y: 250, connections: [] },
  { id: 'Amendment_1', x: 450, y: 350, connections: [] },
  { id: 'NDA_TechCorp', x: 150, y: 300, connections: ['NDA_DataCo', 'NDA_CloudInc'] },
  { id: 'NDA_DataCo', x: 100, y: 450, connections: [] },
  { id: 'NDA_CloudInc', x: 250, y: 450, connections: [] }
];

const patterns = [
  'Unlimited liability clause in 23% of vendor contracts',
  'Average negotiation reduces liability by 67%',
  'Auto-renewal clauses missed in 12% of reviews',
  'Similar indemnification clause in 14 contracts',
  'Risk pattern detected across 3 matters',
  'Precedent found from Johnson v. Smith case'
];

export default function ContextMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      contextData.forEach(node => {
        node.connections.forEach(targetId => {
          const target = contextData.find(n => n.id === targetId);
          if (target) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-xl p-8 border border-purple-500/20">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Context Memory Map</h2>
          <p className="text-purple-200">MCP-powered institutional knowledge graph</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-lg">
          <Brain className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-semibold">Knowledge Score: 847</span>
        </div>
      </div>

      {/* Knowledge Graph Visualization */}
      <div className="relative bg-gray-800/30 rounded-lg p-6 mb-6 h-[500px] overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="absolute inset-0"
        />
        {contextData.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute w-32 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/50 flex items-center justify-center"
            style={{ left: node.x - 64, top: node.y - 40 }}
          >
            <div className="text-center">
              <Database className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <span className="text-xs text-white">{node.id.replace(/_/g, ' ')}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learned Patterns */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Learned Patterns
          </h3>
          <ul className="space-y-2">
            {patterns.slice(0, 3).map((pattern, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-blue-400">•</span>
                {pattern}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-purple-400" />
            Cross-Matter Insights
          </h3>
          <ul className="space-y-2">
            {patterns.slice(3).map((pattern, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-purple-400">•</span>
                {pattern}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-800/30 rounded-lg p-4">
        <h3 className="text-sm text-gray-400 mb-2">Context Building Timeline</h3>
        <div className="flex items-center justify-between">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
            <div key={month} className="text-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 20 + index * 8 }}
                transition={{ delay: index * 0.1 }}
                className="w-12 bg-gradient-to-t from-purple-500 to-blue-500 rounded-t mb-2"
              />
              <span className="text-xs text-gray-400">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}