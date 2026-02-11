'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ThoughtCategory } from '@/data/thoughts';
import ThoughtInteraction from './ThoughtInteraction';

interface MindBloomScrollProps {
    thought: ThoughtCategory;
}

export default function MindBloomScroll({ thought }: MindBloomScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Map scroll progress (0 to 1) to frame index.
    // We have 48 frames: 001 to 048.
    // To keep it smooth, we might limit the range where it blooms. Like 0 to 0.8.
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 48]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            // We found 48 frames in the directory inspection earlier.
            const frameCount = 48;

            const promises = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve) => {
                    const img = new Image();
                    // Pad component with zeros e.g. 001, 010
                    const paddedIndex = i.toString().padStart(3, '0');
                    img.src = `${thought.folderPath}/ezgif-frame-${paddedIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img; // maintain order
                        resolve();
                    };
                    img.onerror = () => {
                        // If image missing, just skip or resolve
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, [thought.folderPath]);

    // Render Loop
    useMotionValueEvent(frameIndex, "change", (latest) => {
        const canvas = canvasRef.current;
        if (!canvas || !isLoaded || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

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


    // Resize handler (Debounced)
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (canvasRef.current) {
                    canvasRef.current.width = window.innerWidth;
                    canvasRef.current.height = window.innerHeight;
                    // Trigger redraw if needed by slightly nudging the value
                    const current = frameIndex.get();
                    frameIndex.set(current + 0.01);
                    setTimeout(() => frameIndex.set(current), 10);
                }
            }, 100);
        };
        window.addEventListener('resize', handleResize);
        // Initial setup
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[400vh]"> {/* Tuned to 400vh for 48 frames feeling */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                {/* Loading State Overlay */}
                {!isLoaded && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
                            <p className="text-[var(--gold)] text-sm uppercase tracking-widest animate-pulse">
                                Initializing Neural Pathways...
                            </p>
                        </div>
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen transition-opacity duration-700 ${isLoaded ? 'opacity-90' : 'opacity-0'}`}
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
