/**
 * Hero Section Skeleton
 * Simple placeholders for hero content
 */

import { SkeletonText, SkeletonBox, SkeletonFadeWrapper } from "./SkeletonBase";

const HeroSkeleton = ({ show = true }) => {
  return (
    <SkeletonFadeWrapper show={show}>
      <section className="relative min-h-[90vh] pt-28 flex items-center justify-center overflow-hidden bg-cyber-darker">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content Skeleton */}
            <div className="space-y-8">
              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-neon-green/30 rounded-full animate-pulse" />
                <SkeletonText width="w-24" />
              </div>

              {/* Name */}
              <div className="space-y-4">
                <SkeletonBox className="h-20 md:h-28 w-3/4" />
                <div className="h-1 w-32 bg-gradient-to-r from-neon-green/30 via-neon-cyan/30 to-transparent" />
              </div>

              {/* Subtitle */}
              <SkeletonText className="h-8" width="w-full max-w-xl" />

              {/* Description */}
              <div className="space-y-2 max-w-xl">
                <SkeletonText width="w-full" />
                <SkeletonText width="w-5/6" />
                <SkeletonText width="w-4/6" />
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <SkeletonBox className="h-12 w-40" />
                <SkeletonBox className="h-12 w-36" />
                <SkeletonBox className="h-12 w-36" />
              </div>

              {/* Tech Stack */}
              <div className="flex gap-4 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonBox key={i} className="h-10 w-20" />
                ))}
              </div>
            </div>

            {/* Right 3D Scene Skeleton */}
            <div className="relative h-[400px] lg:h-[500px] hidden md:block">
              <SkeletonBox className="w-full h-full rounded-lg relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-neon-green/10 via-neon-cyan/5 to-transparent blur-3xl" />

                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-neon-cyan/20 animate-pulse" />

                {/* HUD Overlay */}
                <div className="absolute top-4 right-4 p-3 glass-dark border border-neon-cyan/10 rounded">
                  <div className="space-y-1">
                    <SkeletonText width="w-24" className="h-2" />
                    <SkeletonText width="w-20" className="h-2" />
                    <SkeletonText width="w-28" className="h-2" />
                  </div>
                </div>
              </SkeletonBox>
            </div>
          </div>
        </div>
      </section>
    </SkeletonFadeWrapper>
  );
};

export default HeroSkeleton;
