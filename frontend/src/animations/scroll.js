/**
 * Optimized Scroll Animations for 60fps Performance
 *
 * Features:
 * - GPU-accelerated transforms (translate3d, scale)
 * - Device-adaptive complexity
 * - Spring easing for natural feel
 * - Once-trigger to prevent re-render loops
 * - Consistent viewport thresholds
 */

// Device performance detection
const detectPerformance = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 2;

  if (isMobile || memory < 4 || cores < 4) {
    return "low";
  } else if (memory < 8 || cores < 8) {
    return "medium";
  }
  return "high";
};

const devicePerformance = detectPerformance();

// Adaptive settings based on device performance
const getAnimationSettings = () => {
  switch (devicePerformance) {
    case "low":
      return {
        distance: 20,
        duration: 0.4,
        staggerDelay: 0.05,
        spring: { type: "tween", ease: "easeOut" },
      };
    case "medium":
      return {
        distance: 40,
        duration: 0.6,
        staggerDelay: 0.08,
        spring: { type: "spring", stiffness: 100, damping: 15 },
      };
    case "high":
    default:
      return {
        distance: 60,
        duration: 0.8,
        staggerDelay: 0.1,
        spring: { type: "spring", stiffness: 80, damping: 12 },
      };
  }
};

const settings = getAnimationSettings();

// Common viewport configuration (triggers once, optimized threshold)
export const viewportConfig = {
  once: true, // Only trigger once - prevents re-render loops
  amount: 0.2, // Trigger when 20% visible
  margin: "-50px", // Start animation slightly before entering viewport
};

// ====================  ANIMATION VARIANTS ====================

/**
 * Fade up from bottom - Most common scroll animation
 * GPU-accelerated using transform: translate3d
 */
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: settings.distance,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
};

/**
 * Fade from left - For side content
 * Uses transform for GPU acceleration
 */
export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -settings.distance,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
};

/**
 * Fade from right - For alternate content
 * Uses transform for GPU acceleration
 */
export const fadeRight = {
  hidden: {
    opacity: 0,
    x: settings.distance,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
};

/**
 * Scale in - For cards and images
 * GPU-accelerated scale transformation
 */
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
};

/**
 * Stagger container - For lists and grids
 * Staggers children animations with adaptive delay
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: settings.staggerDelay,
      delayChildren: 0.1,
    },
  },
};

/**
 * Fade in only - Simplest animation for low-power devices
 * No transforms, just opacity
 */
export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: settings.duration * 0.8,
      ease: "easeOut",
    },
  },
};

/**
 * Slide up (larger distance) - For hero sections
 * GPU-accelerated with larger movement
 */
export const slideUp = {
  hidden: {
    opacity: 0,
    y: settings.distance * 1.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...settings.spring,
      duration: settings.duration * 1.2,
    },
  },
};

/**
 * Zoom in - For images and featured content
 * GPU-accelerated scale with slight movement
 */
export const zoomIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: settings.distance * 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
};

/**
 * Rotate in - For special elements
 * GPU-accelerated rotation (use sparingly)
 */
export const rotateIn = {
  hidden: {
    opacity: 0,
    rotate: devicePerformance === "low" ? 0 : -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      ...settings.spring,
      duration: settings.duration,
    },
  },
};

// ====================  HELPER FUNCTIONS ====================

/**
 * Get optimized animation based on device performance
 * Falls back to simpler animations on low-end devices
 */
export const getOptimizedVariant = (
  preferredVariant,
  fallbackVariant = fadeIn
) => {
  if (devicePerformance === "low") {
    return fallbackVariant;
  }
  return preferredVariant;
};

/**
 * Create custom stagger delay based on device
 */
export const getStaggerDelay = (multiplier = 1) => {
  return settings.staggerDelay * multiplier;
};

/**
 * Get spring config based on device
 */
export const getSpringConfig = (customConfig = {}) => {
  return {
    ...settings.spring,
    ...customConfig,
  };
};

// Export device performance for conditional rendering
export { devicePerformance };

// ====================  PRESETS ====================

/**
 * Common preset combinations for quick use
 */
export const presets = {
  // For section headers
  header: fadeUp,

  // For cards in a grid
  card: scaleIn,

  // For left-side content
  leftContent: fadeLeft,

  // For right-side content
  rightContent: fadeRight,

  // For lists that should stagger
  list: staggerContainer,

  // For images and media
  media: zoomIn,
};

export default {
  fadeUp,
  fadeLeft,
  fadeRight,
  scaleIn,
  staggerContainer,
  fadeIn,
  slideUp,
  zoomIn,
  rotateIn,
  viewportConfig,
  presets,
  devicePerformance,
  getOptimizedVariant,
  getStaggerDelay,
  getSpringConfig,
};
