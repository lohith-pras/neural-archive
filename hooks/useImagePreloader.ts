import { useState, useEffect } from 'react';
import { preloadImages, generateFramePaths } from '@/lib/utils';

interface UseImagePreloaderResult {
  images: HTMLImageElement[];
  isLoaded: boolean;
  progress: number;
}

/**
 * Hook to preload animation frame images
 * @param folderPath - Path to the folder containing frames
 * @param frameCount - Total number of frames to load
 * @returns Object containing loaded images, loading state, and progress
 */
export function useImagePreloader(
  folderPath: string,
  frameCount: number
): UseImagePreloaderResult {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadImages = async () => {
      const paths = generateFramePaths(folderPath, frameCount);
      const loadedImages: HTMLImageElement[] = [];

      const promises = paths.map((path, index) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = path;
          img.onload = () => {
            if (!cancelled) {
              loadedImages[index] = img;
              setProgress(((index + 1) / frameCount) * 100);
            }
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${path}`);
            resolve();
          };
        })
      );

      await Promise.all(promises);
      
      if (!cancelled) {
        setImages(loadedImages);
        setIsLoaded(true);
      }
    };

    loadImages();

    return () => {
      cancelled = true;
    };
  }, [folderPath, frameCount]);

  return { images, isLoaded, progress };
}
