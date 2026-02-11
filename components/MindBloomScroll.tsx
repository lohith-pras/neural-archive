'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ThoughtCategory } from '@/data/thoughts';
import ThoughtOverlays from './ThoughtOverlays';

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
            frameIndex.set(1);
        }
    }, [isLoaded, images, frameIndex]);


    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Trigger redraw if needed
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Init
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[400vh]"> {/* Tuned to 400vh for 48 frames feeling */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen"
                />
                {/* Gradient Overlay for aesthetic */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: thought.gradient, opacity: 0.2, mixBlendMode: 'overlay' }}
                />

                <ThoughtOverlays thought={thought} scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}
