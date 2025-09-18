'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WorkflowNode {
  id: string
  name: string
  type: string
  icon: string
  position: { x: number; y: number }
  color: string
  description: string
}

interface ExecutionLogEntry {
  node: string
  time: string
  status: 'success' | 'processing' | 'pending'
  message?: string
}

interface N8nWorkflowSimulatorProps {
  isProcessing?: boolean
  onNodeClick?: (node: WorkflowNode) => void
  onComplete?: () => void
}

const workflowNodes: WorkflowNode[] = [
  {
    id: 'trigger',
    name: 'Document Upload',
    type: 'webhook',
    icon: '📄',
    position: { x: 150, y: 250 },
    color: '#ff6d5a',
    description: 'Receives legal document'
  },
  {
    id: 'extract',
    name: 'GPT-4 Vision',
    type: 'ai',
    icon: '👁️',
    position: { x: 350, y: 250 },
    color: '#10b981',
    description: 'Extract text and structure'
  },
  {
    id: 'analyze',
    name: 'Claude Analysis',
    type: 'ai',
    icon: '🧠',
    position: { x: 550, y: 250 },
    color: '#8b5cf6',
    description: 'Legal analysis and interpretation'
  },
  {
    id: 'risk',
    name: 'Risk Assessment',
    type: 'function',
    icon: '⚖️',
    position: { x: 750, y: 250 },
    color: '#f59e0b',
    description: 'Evaluate legal risks'
  },
  {
    id: 'output',
    name: 'Generate Report',
    type: 'webhook',
    icon: '📊',
    position: { x: 950, y: 250 },
    color: '#3b82f6',
    description: 'Create final analysis'
  }
]

export function N8nWorkflowSimulator({
  isProcessing = false,
  onNodeClick,
  onComplete
}: N8nWorkflowSimulatorProps) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1)
  const [executionLog, setExecutionLog] = useState<ExecutionLogEntry[]>([])
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [metrics, setMetrics] = useState({
    processingTime: 0,
    nodesExecuted: 0,
    apiCost: 0,
    accuracy: 0
  })

  // Reset when processing starts
  useEffect(() => {
    if (isProcessing) {
      setActiveNodeIndex(-1)
      setExecutionLog([])
      setMetrics({
        processingTime: 0,
        nodesExecuted: 0,
        apiCost: 0,
        accuracy: 0
      })
    }
  }, [isProcessing])

  // Animation that progresses through nodes when processing
  useEffect(() => {
    if (isProcessing && activeNodeIndex === -1) {
      let currentNode = 0
      const startTime = Date.now()

      // Add all nodes to execution log as pending
      const initialLog: ExecutionLogEntry[] = workflowNodes.map(node => ({
        node: node.name,
        time: '',
        status: 'pending' as const,
        message: node.description
      }))
      setExecutionLog(initialLog)

      const interval = setInterval(() => {
        setActiveNodeIndex(currentNode)

        // Update execution log
        setExecutionLog(prev => {
          const updated = [...prev]
          if (currentNode > 0) {
            updated[currentNode - 1] = {
              ...updated[currentNode - 1],
              status: 'success',
              time: new Date().toLocaleTimeString()
            }
          }
          if (currentNode < workflowNodes.length) {
            updated[currentNode] = {
              ...updated[currentNode],
              status: 'processing',
              time: new Date().toLocaleTimeString()
            }
          }
          return updated
        })

        // Update metrics
        setMetrics(prev => ({
          processingTime: ((Date.now() - startTime) / 1000),
          nodesExecuted: currentNode + 1,
          apiCost: prev.apiCost + (currentNode === 1 || currentNode === 2 ? 0.03 : 0.01),
          accuracy: Math.min(99.2, prev.accuracy + 20)
        }))

        currentNode++
        if (currentNode >= workflowNodes.length) {
          // Mark last node as success
          setExecutionLog(prev => {
            const updated = [...prev]
            updated[workflowNodes.length - 1] = {
              ...updated[workflowNodes.length - 1],
              status: 'success',
              time: new Date().toLocaleTimeString()
            }
            return updated
          })

          clearInterval(interval)
          setActiveNodeIndex(-1)

          if (onComplete) {
            setTimeout(onComplete, 500)
          }
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isProcessing, activeNodeIndex, onComplete])

  return (
    <div className="n8n-simulator-container flex h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-[#1e1e2e]">
      {/* Main canvas area */}
      <div className="workflow-canvas flex-1 relative bg-[#1e1e2e]">
        <svg className="w-full h-full" viewBox="0 0 1100 500">
          {/* Background grid pattern like n8n */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a2a3e" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#1e1e2e" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Draw connections with animation */}
          {workflowNodes.slice(0, -1).map((node, idx) => {
            const nextNode = workflowNodes[idx + 1]
            const isActive = idx < activeNodeIndex
            const isCurrentlyProcessing = idx === activeNodeIndex - 1

            return (
              <g key={`connection-${idx}`}>
                {/* Connection line */}
                <line
                  x1={node.position.x + 60}
                  y1={node.position.y}
                  x2={nextNode.position.x - 60}
                  y2={nextNode.position.y}
                  stroke={isActive ? '#10b981' : '#4a4a5e'}
                  strokeWidth="2"
                  className="transition-all duration-500"
                />

                {/* Connection dot at start */}
                <circle
                  cx={node.position.x + 60}
                  cy={node.position.y}
                  r="4"
                  fill={isActive ? '#10b981' : '#4a4a5e'}
                />

                {/* Connection dot at end */}
                <circle
                  cx={nextNode.position.x - 60}
                  cy={nextNode.position.y}
                  r="4"
                  fill={isActive ? '#10b981' : '#4a4a5e'}
                />

                {/* Animated data packet */}
                {isCurrentlyProcessing && (
                  <motion.circle
                    r="6"
                    fill="#10b981"
                    initial={{
                      cx: node.position.x + 60,
                      cy: node.position.y,
                      scale: 0
                    }}
                    animate={{
                      cx: nextNode.position.x - 60,
                      cy: nextNode.position.y,
                      scale: [0, 1.5, 1, 1.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <animate
                      attributeName="opacity"
                      values="0;1;1;1;0"
                      dur="2s"
                    />
                  </motion.circle>
                )}
              </g>
            )
          })}

          {/* Draw nodes */}
          {workflowNodes.map((node, idx) => {
            const isActive = idx === activeNodeIndex
            const isCompleted = activeNodeIndex === -1 ? false : idx < activeNodeIndex
            const isHovered = hoveredNode === node.id

            return (
              <motion.g
                key={node.id}
                className="cursor-pointer"
                onClick={() => onNodeClick?.(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Node shadow */}
                <rect
                  x={node.position.x - 62}
                  y={node.position.y - 32}
                  width="124"
                  height="64"
                  rx="8"
                  fill="black"
                  opacity="0.3"
                  transform="translate(3, 3)"
                />

                {/* Node background */}
                <rect
                  x={node.position.x - 60}
                  y={node.position.y - 30}
                  width="120"
                  height="60"
                  rx="8"
                  fill={isActive ? node.color : isCompleted ? '#065f46' : '#2a2a3e'}
                  stroke={isActive ? node.color : isCompleted ? '#10b981' : '#4a4a5e'}
                  strokeWidth={isActive || isHovered ? "3" : "2"}
                  className="transition-all duration-300"
                  opacity={isActive || isHovered ? 1 : isCompleted ? 0.9 : 0.8}
                />

                {/* Node icon */}
                <text
                  x={node.position.x}
                  y={node.position.y - 5}
                  textAnchor="middle"
                  fontSize="24"
                  className="select-none pointer-events-none"
                >
                  {node.icon}
                </text>

                {/* Node name */}
                <text
                  x={node.position.x}
                  y={node.position.y + 15}
                  textAnchor="middle"
                  fontSize="11"
                  fill="white"
                  fontWeight="600"
                  className="select-none pointer-events-none"
                >
                  {node.name}
                </text>

                {/* Status indicator */}
                {isActive && (
                  <motion.circle
                    cx={node.position.x + 45}
                    cy={node.position.y - 15}
                    r="5"
                    fill="#10b981"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}

                {isCompleted && (
                  <circle
                    cx={node.position.x + 45}
                    cy={node.position.y - 15}
                    r="5"
                    fill="#10b981"
                  />
                )}

                {/* Hover tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={node.position.x - 80}
                      y={node.position.y + 35}
                      width="160"
                      height="30"
                      rx="4"
                      fill="#1a1a2e"
                      stroke="#4a4a5e"
                      strokeWidth="1"
                    />
                    <text
                      x={node.position.x}
                      y={node.position.y + 53}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#94a3b8"
                      className="select-none pointer-events-none"
                    >
                      {node.description}
                    </text>
                  </g>
                )}
              </motion.g>
            )
          })}
        </svg>
      </div>

      {/* Execution sidebar */}
      <div className="execution-panel w-[300px] bg-[#1a1a2e] border-l border-gray-700 p-4 flex flex-col">
        <h3 className="text-white text-sm font-semibold mb-4 flex items-center justify-between">
          <span>Execution Log</span>
          {isProcessing && (
            <span className="text-xs text-green-400 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              Running
            </span>
          )}
        </h3>

        <div className="space-y-2 flex-1 overflow-y-auto">
          {executionLog.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded p-3 text-xs border ${
                log.status === 'success'
                  ? 'bg-green-900/20 border-green-800 text-green-400'
                  : log.status === 'processing'
                  ? 'bg-blue-900/20 border-blue-800 text-blue-400'
                  : 'bg-gray-800/50 border-gray-700 text-gray-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium flex items-center">
                  {log.status === 'success' && '✓ '}
                  {log.status === 'processing' && (
                    <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  )}
                  {log.status === 'pending' && '○ '}
                  {log.node}
                </span>
                {log.time && (
                  <span className="text-gray-400 text-[10px]">{log.time}</span>
                )}
              </div>
              {log.message && (
                <div className="text-[10px] opacity-70 mt-1">{log.message}</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Metrics display */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-700">
          <div className="bg-gray-800/50 rounded p-2 text-center">
            <div className="text-lg font-bold text-green-400">
              {metrics.processingTime.toFixed(1)}s
            </div>
            <div className="text-[10px] text-gray-400">Processing Time</div>
          </div>
          <div className="bg-gray-800/50 rounded p-2 text-center">
            <div className="text-lg font-bold text-blue-400">
              {metrics.nodesExecuted}
            </div>
            <div className="text-[10px] text-gray-400">Nodes Executed</div>
          </div>
          <div className="bg-gray-800/50 rounded p-2 text-center">
            <div className="text-lg font-bold text-purple-400">
              ${metrics.apiCost.toFixed(2)}
            </div>
            <div className="text-[10px] text-gray-400">API Cost</div>
          </div>
          <div className="bg-gray-800/50 rounded p-2 text-center">
            <div className="text-lg font-bold text-orange-400">
              {metrics.accuracy.toFixed(1)}%
            </div>
            <div className="text-[10px] text-gray-400">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  )
}