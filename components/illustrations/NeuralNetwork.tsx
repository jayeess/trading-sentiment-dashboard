'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NeuralNetworkProps {
  className?: string;
}

export default function NeuralNetwork({ className = '' }: NeuralNetworkProps) {
  // Generate nodes for neural network
  const layers = [
    { nodes: 4, x: 30 },
    { nodes: 6, x: 100 },
    { nodes: 5, x: 170 },
    { nodes: 3, x: 240 },
  ];

  const connections: Array<{ x1: number; y1: number; x2: number; y2: number; delay: number }> = [];

  // Generate connections between layers
  layers.forEach((layer, layerIndex) => {
    if (layerIndex < layers.length - 1) {
      const nextLayer = layers[layerIndex + 1];
      for (let i = 0; i < layer.nodes; i++) {
        for (let j = 0; j < nextLayer.nodes; j++) {
          connections.push({
            x1: layer.x,
            y1: 50 + (i * 150) / (layer.nodes - 1 || 1),
            x2: nextLayer.x,
            y2: 50 + (j * 150) / (nextLayer.nodes - 1 || 1),
            delay: Math.random() * 2,
          });
        }
      }
    }
  });

  return (
    <svg
      className={className}
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="neural-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      {connections.map((conn, index) => (
        <motion.line
          key={index}
          x1={conn.x1}
          y1={conn.y1}
          x2={conn.x2}
          y2={conn.y2}
          stroke="url(#neuralGradient)"
          strokeWidth="1"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: conn.delay,
          }}
        />
      ))}

      {/* Nodes */}
      {layers.map((layer, layerIndex) => (
        <g key={layerIndex}>
          {Array.from({ length: layer.nodes }).map((_, nodeIndex) => {
            const y = 50 + (nodeIndex * 150) / (layer.nodes - 1 || 1);
            return (
              <motion.circle
                key={nodeIndex}
                cx={layer.x}
                cy={y}
                r="6"
                fill="url(#neuralGradient)"
                filter="url(#neural-glow)"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: nodeIndex * 0.2 + layerIndex * 0.3,
                }}
              />
            );
          })}
        </g>
      ))}

      {/* Data flow particles */}
      {[...Array(8)].map((_, i) => (
        <motion.circle
          key={i}
          r="3"
          fill="#3b82f6"
          opacity="0.8"
          animate={{
            cx: [30, 100, 170, 240],
            cy: [
              50 + Math.random() * 150,
              50 + Math.random() * 150,
              50 + Math.random() * 150,
              50 + Math.random() * 150,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </svg>
  );
}
