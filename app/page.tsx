'use client';

import { useState, useEffect } from 'react';
import { thoughts } from '@/data/thoughts';
import MindBloomScroll from '@/components/MindBloomScroll';
import NeuralNav from '@/components/NeuralNav';

import ScrollProgress from '@/components/ScrollProgress';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hydration fix: avoid mismatched content
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentThought = thoughts[currentIndex];


  return (
    <main className="min-h-screen bg-[var(--background)] text-white selection:bg-[var(--gold)] selection:text-black">
      <ScrollProgress />
      <NeuralNav />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div
          key={currentThought.id}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Gradient Transition */}
          <div
            className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${currentThought.themeColor}15 0%, transparent 70%)`
            }}
          />


          <MindBloomScroll thought={currentThought} />
        </motion.div>

      </AnimatePresence>
    </main>
  );
}
