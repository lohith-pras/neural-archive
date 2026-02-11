'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface NextThoughtCTAProps {
    onNext: () => void;
    nextTitle: string;
}

export default function NextThoughtCTA({ onNext, nextTitle }: NextThoughtCTAProps) {
    return (
        <section className="relative z-20 py-24 flex justify-center items-center bg-[var(--background)] overflow-hidden">
            <motion.button
                onClick={onNext}
                className="group relative px-12 py-8 bg-transparent overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Slanted Background */}
                <div className="absolute inset-0 bg-white/5 -skew-x-12 group-hover:bg-[var(--gold)]/10 transition-colors duration-500 border border-white/10 group-hover:border-[var(--gold)]" />

                <div className="relative flex items-center gap-6 z-10">
                    <div className="text-right">
                        <span className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-1 group-hover:text-[var(--gold)] transition-colors">
                            Next Thought
                        </span>
                        <span className="block text-2xl md:text-4xl font-bold text-white group-hover:text-white transition-colors">
                            {nextTitle}
                        </span>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)] group-hover:text-black transition-all duration-300">
                        <ArrowRight className="w-6 h-6" />
                    </div>
                </div>
            </motion.button>
        </section>
    );
}
