import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate array of image paths for animation frames
 * @param folderPath - Path to the folder containing frames
 * @param frameCount - Total number of frames
 * @returns Array of image paths
 */
export function generateFramePaths(folderPath: string, frameCount: number): string[] {
  return Array.from({ length: frameCount }, (_, i) => {
    const paddedIndex = (i + 1).toString().padStart(3, '0');
    return `${folderPath}/ezgif-frame-${paddedIndex}.webp`;
  });
}

/**
 * Preload images for smooth animations
 * @param paths - Array of image paths to preload
 * @returns Promise resolving to array of loaded images
 */
export async function preloadImages(paths: string[]): Promise<HTMLImageElement[]> {
  const loadedImages: HTMLImageElement[] = [];
  
  const promises = paths.map((path, index) => 
    new Promise<void>((resolve) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedImages[index] = img;
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${path}`);
        resolve();
      };
    })
  );

  await Promise.all(promises);
  return loadedImages;
}

/**
 * Debounce function for performance optimization
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if user prefers reduced motion
 * @returns boolean indicating reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
