'use client';

import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import Agents from '@/components/landing/agents';
import Testimonials from '@/components/landing/testimonials';
import CTA from '@/components/landing/cta';
import Footer from '@/components/landing/footer';
import ThemeToggle from '@/components/ThemeToggle';
import { Activity } from 'lucide-react';

import styles from './landing.module.css';

export default function Home() {
  return (
    <main className={`${styles.landingWrapper} relative`}>
      {/* Logo - Fixed Top Left */}
      <div className="fixed left-4 top-4 z-50 flex items-center gap-2 p-2 bg-background/50 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-800/50">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 hidden sm:block">
          Narada AI
        </span>
      </div>

      {/* Theme Toggle - Fixed Top Right */}
      <div className='p-2 fixed right-4 top-4 z-50'>
        <ThemeToggle/>
      </div>

      <Hero />
      <Features />
      <Agents />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
