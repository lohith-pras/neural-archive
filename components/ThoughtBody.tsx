import { ThoughtCategory } from '@/data/thoughts';
import { motion } from 'framer-motion';

export default function ThoughtBody({ thought }: { thought: ThoughtCategory }) {
    return (
        <section className="relative z-20 bg-[var(--background)] px-6 py-24 md:py-40 max-w-4xl mx-auto">
            <div className="space-y-24">
                {thought.contentSections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: idx * 0.2 }}
                        className="group"
                    >
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-8 group-hover:text-[var(--gold)] transition-colors duration-500">
                            {section.title}
                        </h3>
                        <p className="text-lg md:text-2xl text-justify text-white/70 leading-relaxed font-light font-serif">
                            {section.body}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
