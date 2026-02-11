'use client';

import { useState } from 'react';
import { motion, AnimatePresence, MotionValue, useTransform } from 'framer-motion';

interface ThoughtInteractionProps {
    scrollYProgress: MotionValue<number>;
}

export default function ThoughtInteraction({ scrollYProgress }: ThoughtInteractionProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState('');

    // Fade in ONLY at the very end of the scroll (e.g., last 10%)
    const opacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 0.5, 1]);
    const y = useTransform(scrollYProgress, [0.85, 1], [50, 0]);
    const pointerEvents = useTransform(scrollYProgress, (value) => value > 0.9 ? 'auto' : 'none');

    // Handle closing modal
    const closeModal = () => setIsModalOpen(false);

    // Handle saving thought
    const handleSave = () => {
        if (!note.trim()) return;

        const savedThoughts = JSON.parse(localStorage.getItem('captured_thoughts') || '[]');
        const newThought = {
            id: Date.now(),
            text: note,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('captured_thoughts', JSON.stringify([...savedThoughts, newThought]));
        console.log('Saved thought to local storage:', newThought);

        setNote('');
        closeModal();
        // Visual feedback could be added here
        alert('Thought preserved in the neural archive.');
    };

    return (
        <>
            {/* Main Trigger Section */}
            <motion.div
                style={{ opacity, y, pointerEvents }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center h-screen pointer-events-none"
            >
                <div className="flex flex-col items-center gap-6">
                    {/* "Capture The" Text - Outside and Above */}
                    <motion.h2
                        className="text-4xl md:text-6xl font-black text-white tracking-[0.3em] uppercase drop-shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Capture The
                    </motion.h2>

                    {/* "Thought?" Button - Centered */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-16 py-8 bg-transparent overflow-hidden rounded-full transition-all duration-300 hover:scale-105"
                    >
                        {/* Glass/Blur Background */}
                        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl border border-white/20 group-hover:border-[var(--gold)]/50 transition-colors duration-300 rounded-full" />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                        {/* Button Text */}
                        <span className="relative text-3xl md:text-5xl font-bold text-white tracking-widest group-hover:text-[var(--gold)] transition-colors duration-300 font-mono">
                            Thought?
                        </span>
                    </button>
                </div>
            </motion.div>

            {/* Note Taking Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-2xl bg-[#09090b] border border-white/10 rounded-2xl p-8 shadow-2xl shadow-[var(--gold)]/10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                            </button>

                            {/* Modal Header */}
                            <h3 className="text-2xl font-light text-[var(--gold)] mb-6 tracking-wide">
                                Crystallize Your Thought
                            </h3>

                            {/* Text Area */}
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="What ignited the spark?..."
                                className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-lg text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--gold)]/50 transition-colors resize-none mb-8"
                                autoFocus
                            />

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-3 text-sm text-white/40 hover:text-white transition-colors uppercase tracking-wider"
                                >
                                    Discard
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-[var(--gold)] text-black font-bold rounded-lg hover:bg-[#ffe44d] transition-colors uppercase tracking-wider hover:shadow-lg hover:shadow-[var(--gold)]/20"
                                >
                                    Preserve
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
