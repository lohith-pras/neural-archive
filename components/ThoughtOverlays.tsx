'use client';

import { MotionValue, motion, useTransform } from 'framer-motion';
import { ThoughtCategory } from '@/data/thoughts';

interface ThoughtOverlaysProps {
    thought: ThoughtCategory;
    scrollYProgress: MotionValue<number>;
}

export default function ThoughtOverlays({ thought, scrollYProgress }: ThoughtOverlaysProps) {
    // Opacity transforms based on scroll progress
    const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 0]);
    const subOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
    const statsOpacity = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 0]);

    const yMove = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center h-screen">
            {/* Title Section */}
            <motion.div style={{ opacity: titleOpacity, y: yMove }} className="text-center">
                <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter uppercase">
                    {thought.title}
                </h1>
            </motion.div>

            {/* Subtitle Section - Absolute positioned to appear at different time */}
            <motion.div
                style={{ opacity: subOpacity }}
                className="absolute bottom-1/4 text-center w-full max-w-2xl px-6"
            >
                <h2 className="text-2xl md:text-4xl font-light text-[var(--gold)] tracking-wide mb-4">
                    {thought.subtitle}
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                    {thought.description}
                </p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                style={{ opacity: statsOpacity }}
                className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 flex flex-col gap-8"
            >
                {thought.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col border-l-2 border-[var(--gold)]/30 pl-4">
                        <span className="text-[var(--gold)] text-xs uppercase tracking-widest mb-1">{stat.label}</span>
                        <span className="text-white text-3xl font-bold font-mono">{stat.val}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
