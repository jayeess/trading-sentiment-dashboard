'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  Zap,
  Target,
  Cpu,
  Brain,
} from 'lucide-react';

interface FloatingIconsProps {
  count?: number;
}

export default function FloatingIcons({ count = 12 }: FloatingIconsProps) {
  const [isMounted, setIsMounted] = useState(false);

  const icons = [
    TrendingUp,
    TrendingDown,
    DollarSign,
    BarChart3,
    Activity,
    Zap,
    Target,
    Cpu,
    Brain,
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const floatingIcons = React.useMemo(() => {
    if (!isMounted) return [];

    return Array.from({ length: count }, (_, i) => {
      const Icon = icons[i % icons.length];
      return {
        id: i,
        Icon,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 28 + Math.random() * 24,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 4,
        xMovement: Math.random() * 30 - 15,
        color: [
          'text-blue-500/60',
          'text-purple-500/60',
          'text-pink-500/60',
          'text-cyan-500/60',
          'text-green-500/60',
          'text-yellow-500/60',
        ][i % 6],
      };
    });
  }, [count, isMounted]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingIcons.map((item) => {
        const Icon = item.Icon;
        return (
          <motion.div
            key={item.id}
            className={`absolute ${item.color}`}
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              width: item.size,
              height: item.size,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, item.xMovement, 0],
              rotate: [0, 360],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
          >
            <Icon className="w-full h-full" />
          </motion.div>
        );
      })}
    </div>
  );
}
