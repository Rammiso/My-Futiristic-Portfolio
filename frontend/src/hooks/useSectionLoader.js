/**
 * useSectionLoader Hook
 *
 * Controls skeleton loading state with smooth transitions
 * Prevents flash of loading state and handles delays
 */

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for managing section loading states
 * @param {number} initialDelay - Delay before showing content (ms)
 * @returns {Object} Loading state and control functions
 */
export const useSectionLoader = (initialDelay = 300) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    // If already loaded once, don't show skeleton again
    if (hasLoadedRef.current) {
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    // Initial delay before showing content
    const timer = setTimeout(() => {
      setIsLoading(false);
      hasLoadedRef.current = true;

      // Small delay for fade transition
      setTimeout(() => {
        setShowContent(true);
      }, 200);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  const startLoading = () => {
    if (!hasLoadedRef.current) {
      setIsLoading(true);
      setShowContent(false);
    }
  };

  const stopLoading = () => {
    setIsLoading(false);
    hasLoadedRef.current = true;

    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

  return {
    isLoading,
    showContent,
    startLoading,
    stopLoading,
    hasLoaded: hasLoadedRef.current,
  };
};

/**
 * Hook for image loading detection
 * @param {string} src - Image source URL
 * @returns {boolean} Loading state
 */
export const useImageLoader = (src) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setTimeout(() => setIsLoading(false), 200);
    };

    img.onerror = () => {
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return isLoading;
};

/**
 * Hook for Canvas/3D scene loading
 * @param {number} loadTime - Expected load time (ms)
 * @returns {boolean} Loading state
 */
export const useCanvasLoader = (loadTime = 800) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadTime);

    return () => clearTimeout(timer);
  }, [loadTime]);

  return isLoading;
};

export default useSectionLoader;
