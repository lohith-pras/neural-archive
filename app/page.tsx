'use client';

import { useState, useEffect } from 'react';
import { thoughts } from '@/data/thoughts';
import MindBloomScroll from '@/components/MindBloomScroll';
import ThoughtBody from '@/components/ThoughtBody';
import NextThoughtCTA from '@/components/NextThoughtCTA';
import NeuralNav from '@/components/NeuralNav';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hydration fix: avoid mismatched content
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentThought = thoughts[currentIndex];
  const nextIndex = (currentIndex + 1) % thoughts.length;
  const nextThought = thoughts[nextIndex];

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'instant' }); // Instant jump to top before transition
    setTimeout(() => {
      setCurrentIndex(nextIndex);
    }, 100);
    // Or better: state change triggers exit animation, then we scroll top?
    // Actually, simplest is: change state, AnimatePresence handles fade out/in.
    // But we need to be at top for the new one.
    // Let's try: Scroll to top, THEN change state.
  };

  // Re-implement handleNext for smoother flow
  const handleTransition = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Wait for scroll to finish approximately? Or just switch.
    // If we are at bottom, scrolling top takes time.
    // Let's simple switch and scroll.
    setCurrentIndex(nextIndex);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-white selection:bg-[var(--gold)] selection:text-black">
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
          <ThoughtBody thought={currentThought} />
          <NextThoughtCTA onNext={() => setCurrentIndex(nextIndex)} nextTitle={nextThought.title} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
