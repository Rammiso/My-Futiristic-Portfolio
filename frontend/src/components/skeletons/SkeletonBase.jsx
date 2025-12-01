/**
 * Base Skeleton Component
 *
 * Reusable skeleton element with cyberpunk styling
 */

import { motion } from "framer-motion";

export const SkeletonBox = ({ className = "", animate = true }) => {
  return (
    <div
      className={`bg-cyber-card/30 border border-white/5 rounded ${
        animate ? "animate-pulse" : ""
      } ${className}`}
    />
  );
};

export const SkeletonText = ({ className = "", width = "w-full" }) => {
  return (
    <div
      className={`h-4 bg-cyber-card/40 rounded animate-pulse ${width} ${className}`}
    />
  );
};

export const SkeletonCircle = ({ className = "", size = "w-12 h-12" }) => {
  return (
    <div
      className={`${size} bg-cyber-card/30 rounded-full border border-white/5 animate-pulse ${className}`}
    />
  );
};

export const SkeletonImage = ({
  className = "",
  aspectRatio = "aspect-video",
}) => {
  return (
    <div
      className={`${aspectRatio} bg-cyber-card/20 rounded-lg border border-neon-green/10 animate-pulse relative overflow-hidden ${className}`}
    >
      {/* Scanning line effect */}
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent"
      />

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-neon-green/20" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-neon-cyan/20" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-neon-pink/20" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-neon-green/20" />
    </div>
  );
};

export const SkeletonCard = ({ children, className = "" }) => {
  return (
    <div
      className={`p-6 glass-dark border border-white/5 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

// Fade wrapper for smooth transitions
export const SkeletonFadeWrapper = ({ show, children }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={show ? "block" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default {
  SkeletonBox,
  SkeletonText,
  SkeletonCircle,
  SkeletonImage,
  SkeletonCard,
  SkeletonFadeWrapper,
};
