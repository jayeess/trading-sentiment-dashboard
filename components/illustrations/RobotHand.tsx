'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RobotHandProps {
  className?: string;
  animate?: boolean;
}

export default function RobotHand({ className = '', animate = true }: RobotHandProps) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glow effect */}
      <defs>
        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="glow-strong">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Palm base */}
      <motion.rect
        x="70"
        y="120"
        width="60"
        height="50"
        rx="8"
        fill="url(#robotGradient)"
        filter="url(#glow)"
        animate={animate ? {
          y: [120, 118, 120],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Thumb - pointing interaction */}
      <motion.g
        animate={animate ? {
          rotate: [0, -5, 0],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: '65px', originY: '140px' }}
      >
        <rect x="55" y="135" width="18" height="35" rx="4" fill="url(#robotGradient)" filter="url(#glow)" />
        <rect x="55" y="130" width="18" height="10" rx="3" fill="#3b82f6" opacity="0.6" />
        {/* Thumb joint */}
        <circle cx="64" cy="142" r="4" fill="#8b5cf6" filter="url(#glow-strong)" />
      </motion.g>

      {/* Index finger - extended (pointing) */}
      <motion.g
        animate={animate ? {
          y: [0, -3, 0],
        } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <rect x="75" y="75" width="15" height="45" rx="4" fill="url(#robotGradient)" filter="url(#glow)" />
        <rect x="75" y="70" width="15" height="10" rx="3" fill="#3b82f6" opacity="0.6" />
        {/* Finger joints */}
        <circle cx="82.5" cy="95" r="3.5" fill="#8b5cf6" filter="url(#glow-strong)" />
        <circle cx="82.5" cy="108" r="3.5" fill="#8b5cf6" filter="url(#glow-strong)" />

        {/* Touch point indicator */}
        <motion.circle
          cx="82.5"
          cy="70"
          r="8"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          animate={animate ? {
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.2, 0.8],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>

      {/* Middle finger */}
      <motion.g
        animate={animate ? {
          y: [0, -2, 0],
        } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <rect x="95" y="70" width="15" height="50" rx="4" fill="url(#robotGradient)" filter="url(#glow)" />
        <rect x="95" y="65" width="15" height="10" rx="3" fill="#3b82f6" opacity="0.6" />
        <circle cx="102.5" cy="90" r="3.5" fill="#8b5cf6" filter="url(#glow-strong)" />
        <circle cx="102.5" cy="105" r="3.5" fill="#8b5cf6" filter="url(#glow-strong)" />
      </motion.g>

      {/* Ring finger */}
      <motion.g
        animate={animate ? {
          y: [0, -1, 0],
        } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      >
        <rect x="115" y="75" width="14" height="45" rx="4" fill="url(#robotGradient)" filter="url(#glow)" />
        <rect x="115" y="70" width="14" height="10" rx="3" fill="#3b82f6" opacity="0.6" />
        <circle cx="122" cy="95" r="3" fill="#8b5cf6" filter="url(#glow-strong)" />
        <circle cx="122" cy="108" r="3" fill="#8b5cf6" filter="url(#glow-strong)" />
      </motion.g>

      {/* Pinky finger */}
      <motion.g
        animate={animate ? {
          y: [0, -1, 0],
        } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <rect x="133" y="85" width="12" height="35" rx="4" fill="url(#robotGradient)" filter="url(#glow)" />
        <rect x="133" y="80" width="12" height="10" rx="3" fill="#3b82f6" opacity="0.6" />
        <circle cx="139" cy="100" r="3" fill="#8b5cf6" filter="url(#glow-strong)" />
        <circle cx="139" cy="112" r="3" fill="#8b5cf6" filter="url(#glow-strong)" />
      </motion.g>

      {/* Wrist connector */}
      <rect x="75" y="168" width="50" height="15" rx="6" fill="url(#robotGradient)" opacity="0.8" />

      {/* Tech details */}
      <motion.circle
        cx="100"
        cy="145"
        r="6"
        fill="#8b5cf6"
        filter="url(#glow-strong)"
        animate={animate ? {
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Energy lines */}
      <motion.path
        d="M 85 150 Q 90 155 95 150"
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        animate={animate ? {
          pathLength: [0, 1, 0],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 105 150 Q 110 155 115 150"
        stroke="#ec4899"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        animate={animate ? {
          pathLength: [0, 1, 0],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />

      {/* Floating particles around hand */}
      {[...Array(5)].map((_, i) => (
        <motion.circle
          key={i}
          cx={80 + i * 15}
          cy={160}
          r="2"
          fill="#3b82f6"
          opacity="0.6"
          animate={animate ? {
            y: [0, -20, 0],
            opacity: [0.6, 0.2, 0.6],
          } : {}}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.svg>
  );
}
