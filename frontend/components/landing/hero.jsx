'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
      
      {/* Animated Background with Parallax */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-secondary/5 blur-3xl"
        />
      </motion.div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="max-w-4xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-secondary/30 mb-6 hover:border-primary/50 transition-colors duration-300 cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground font-medium">
            AI-Powered Hospital Operations
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
        >
          Transform Hospital
          <br />
          <span className="text-primary">Operations Instantly</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed"
        >
          Intelligent automation for patient scheduling, staff coordination, and inventory management. Experience healthcare efficiency redefined.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link href="/signup">
            <motion.button
              className="px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold inline-flex items-center justify-center gap-2 w-full sm:w-auto hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <Link href="/signin">
            <motion.button
              className="px-6 sm:px-8 py-3 border border-slate-200 dark:border-slate-800 rounded-lg font-semibold text-foreground hover:bg-secondary/50 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--secondary), 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-slate-200 dark:border-slate-800"
        >
          {[
            { value: '40%', label: 'Wait Time Reduction' },
            { value: '24/7', label: 'AI Monitoring' },
            { value: '100%', label: 'Automation' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center group cursor-default"
            >
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
