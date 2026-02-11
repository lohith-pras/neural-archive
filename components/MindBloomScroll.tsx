'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ThoughtCategory } from '@/types/thoughts';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import ThoughtInteraction from './ThoughtInteraction';

interface MindBloomScrollProps {
    thought: ThoughtCategory;
}

export default function MindBloomScroll({ thought }: MindBloomScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { images, isLoaded, progress } = useImagePreloader(thought.folderPath, thought.frameCount);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress (0 to 1) to frame index based on actual frame count
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, thought.frameCount]);

    // Image preloading is now handled by useImagePreloader hook

    // Render Loop
    useMotionValueEvent(frameIndex, "change", (latest) => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Enable image smoothing for better quality when scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const index = Math.min(Math.max(Math.floor(latest) - 1, 0), images.length - 1);
        const img = images[index];

        if (img) {
            // Draw image to cover canvas, maintaining aspect ratio
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvas.height;
                drawWidth = img.width * (canvas.height / img.height);
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = img.height * (canvas.width / img.width);
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    });

    // Initial draw
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            // Trigger a manual update to draw first frame
            // We set it to 1.1 to force a change if it starts at 1
            frameIndex.set(1.1);
            setTimeout(() => frameIndex.set(1), 50);
        }
    }, [isLoaded, images, frameIndex]);


    // Resize handler (Debounced) with high-DPI support
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (canvasRef.current) {
                    const dpr = window.devicePixelRatio || 1;
                    const displayWidth = window.innerWidth;
                    const displayHeight = window.innerHeight;
                    
                    // Set canvas resolution for high-DPI displays
                    canvasRef.current.width = displayWidth * dpr;
                    canvasRef.current.height = displayHeight * dpr;
                    
                    // Scale canvas back to display size
                    canvasRef.current.style.width = `${displayWidth}px`;
                    canvasRef.current.style.height = `${displayHeight}px`;
                    
                    // Scale context to match device pixel ratio
                    const ctx = canvasRef.current.getContext('2d');
                    if (ctx) {
                        ctx.scale(dpr, dpr);
                    }
                    
                    // Trigger redraw if needed by slightly nudging the value
                    const current = frameIndex.get();
                    frameIndex.set(current + 0.01);
                    setTimeout(() => frameIndex.set(current), 10);
                }
            }, 100);
        };
        window.addEventListener('resize', handleResize);
        // Initial setup
        handleResize();
        
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[300vh]"> {/* Tuned to 300vh for 90 frames = 30 frames per viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                {/* Loading State Overlay */}
                {!isLoaded && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black" role="status" aria-live="polite">
                        <div className="flex flex-col items-center gap-4">
                            <div 
                                className="w-12 h-12 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" 
                                aria-hidden="true"
                            />
                            <p className="text-[var(--gold)] text-sm uppercase tracking-widest animate-pulse">
                                Initializing Neural Pathways... {Math.round(progress)}%
                            </p>
                            <span className="sr-only">Loading animation frames: {Math.round(progress)}% complete</span>
                        </div>
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen transition-opacity duration-700 ${isLoaded ? 'opacity-90' : 'opacity-0'}`}
                    role="img"
                    aria-label={`${thought.title}: ${thought.description}. Animated neural bloom visualization.`}
                />

                {/* Gradient Overlay for aesthetic */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: thought.gradient, opacity: 0.2, mixBlendMode: 'overlay' }}
                />


                {/* Interaction Overlay */}
                <ThoughtInteraction scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
