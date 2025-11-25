'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import RobotHand from '@/components/illustrations/RobotHand';
import NeuralNetwork from '@/components/illustrations/NeuralNetwork';
import FloatingIcons from '@/components/effects/FloatingIcons';
import {
  TrendingUp,
  Sparkles,
  Zap,
  BarChart3,
  Brain,
  Newspaper,
  ArrowRight,
  Activity,
  LineChart,
  Target,
  Shield,
  Globe,
  ChevronDown,
  Cpu,
} from 'lucide-react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax effects
  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Generate stable particles on client only
  const particles = React.useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      color: `hsl(${(i * 137.5) % 360}, 70%, 60%)`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      randomX: Math.random() * 20 - 10,
    }));
  }, [isMounted]);

  // Generate stable AI particles on client only
  const aiParticles = React.useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: 20 + i * 8,
      top: 30 + Math.random() * 40,
    }));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced sentiment analysis using OpenAI GPT-3.5 for accurate market predictions',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Activity,
      title: 'Real-Time Data',
      description: 'Live market updates every 30 seconds with seamless data synchronization',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart3,
      title: 'Interactive Charts',
      description: 'Beautiful visualizations with multiple time ranges and smooth animations',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Newspaper,
      title: 'News Integration',
      description: 'Latest financial news with automatic sentiment tagging and analysis',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with React Query caching and lazy loading',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Production Ready',
      description: 'Enterprise-grade code with TypeScript, error handling, and testing',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '<100ms', label: 'Response Time' },
    { value: '50+', label: 'Stocks Tracked' },
    { value: '24/7', label: 'Live Updates' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Futuristic AI-Themed Background */}
      <div className="fixed inset-0 z-0">
        {/* Subtle gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        {/* Floating Trading Icons */}
        <FloatingIcons count={15} />

        {/* Robot Hand - Right Side - ULTRA VISIBLE */}
        <motion.div
          className="absolute right-20 top-[30%] w-72 h-72 z-[100]"
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(99, 102, 241, 0.7))',
          }}
        >
          <RobotHand />
        </motion.div>

        {/* Neural Network - Left Side - ULTRA VISIBLE */}
        <motion.div
          className="absolute left-20 top-[45%] w-96 h-72 z-[100]"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            delay: 0.3,
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.7))',
          }}
        >
          <NeuralNetwork />
        </motion.div>

        {/* Glowing orbs - SUPER ENHANCED */}
        <motion.div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-60 dark:opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0.4) 40%, transparent 70%)',
            filter: 'blur(40px)',
            boxShadow: '0 0 100px rgba(99, 102, 241, 0.5)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full opacity-60 dark:opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0.4) 40%, transparent 70%)',
            filter: 'blur(40px)',
            boxShadow: '0 0 100px rgba(168, 85, 247, 0.5)',
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Interactive cursor glow */}
        <motion.div
          className="pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-30 dark:opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        />

        {/* AI Particles - MEGA VISIBLE WITH TRAILS */}
        {aiParticles.map((particle, i) => (
          <motion.div
            key={particle.id}
            className="absolute w-6 h-6 rounded-full z-[200]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: 'radial-gradient(circle, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)',
              boxShadow: `
                0 0 20px rgba(59, 130, 246, 1),
                0 0 40px rgba(59, 130, 246, 0.8),
                0 0 60px rgba(59, 130, 246, 0.6),
                0 0 80px rgba(59, 130, 246, 0.4)
              `,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 1, 1, 1, 0],
              scale: [0, 4, 4, 4, 0],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <TrendingUp className="h-8 w-8 text-primary" />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
                </motion.div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TradeSense
              </span>
            </motion.div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/dashboard">
                <Button className="group">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4">
        <motion.div
          className="container mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} style={{ y: y1, opacity }}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 backdrop-blur-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Trading Intelligence</span>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient heading-tight"
            variants={itemVariants}
            style={{ y: y1 }}
          >
            Trade Smarter
            <br />
            <span className="relative inline-block">
              Not Harder
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-lg shadow-primary/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto body-relaxed"
            variants={itemVariants}
          >
            Real-time sentiment analysis powered by AI. Make informed trading decisions
            with live market data, intelligent insights, and beautiful visualizations.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="group text-lg px-8 py-6 btn-gradient focus-ring">
                  <span className="flex items-center">
                    Get Started Free
                    <motion.div
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Zap className="ml-2 h-5 w-5" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 group glass focus-ring">
                Watch Demo
                <ChevronDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-6 rounded-2xl glass border border-border/50 backdrop-blur-xl card-modern"
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-gradient heading-tight"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed trading decisions in one beautiful dashboard
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="p-6 h-full relative overflow-hidden group cursor-pointer border-border/50 hover:border-primary/50 transition-all">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 relative`}>
                    <feature.icon className="w-full h-full text-white" />
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-50`} />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-6"
              >
                <Globe className="h-16 w-16 text-white" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Trading?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of traders using AI-powered insights to make better decisions
              </p>
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 group">
                  Start Trading Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>Built with Next.js, React Query, OpenAI, and lots of ❤️</p>
          <p className="mt-2 text-sm">© 2024 TradeSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
