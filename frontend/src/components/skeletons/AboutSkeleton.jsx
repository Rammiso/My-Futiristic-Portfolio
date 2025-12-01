/**
 * About Section Skeleton
 * Bio card + portrait placeholder
 */

import {
  SkeletonText,
  SkeletonBox,
  SkeletonCard,
  SkeletonFadeWrapper,
} from "./SkeletonBase";

const AboutSkeleton = ({ show = true }) => {
  return (
    <SkeletonFadeWrapper show={show}>
      <section className="section-padding bg-cyber-dark relative overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-green/30" />
              <SkeletonText width="w-32" className="h-4" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green/30" />
            </div>

            <SkeletonBox className="h-12 w-48 mx-auto mb-4" />

            <div className="max-w-2xl mx-auto">
              <SkeletonText width="w-3/4 mx-auto" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Bio Card */}
            <SkeletonCard className="p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-neon-green/30" />
                <div>
                  <SkeletonText width="w-32" className="h-6 mb-2" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green/30 rounded- full animate-pulse" />
                    <SkeletonText width="w-16" className="h-3" />
                  </div>
                </div>
              </div>

              {/* Bio Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <SkeletonText width="w-full" />
                  <SkeletonText width="w-5/6" />
                  <SkeletonText width="w-4/6" />
                </div>
                <div className="space-y-2">
                  <SkeletonText width="w-full" />
                  <SkeletonText width="w-5/6" />
                </div>
                <div className="space-y-2">
                  <SkeletonText width="w-full" />
                  <SkeletonText width="w-3/4" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <SkeletonText width="w-16 mx-auto" className="h-8 mb-1" />
                    <SkeletonText width="w-20 mx-auto" className="h-3" />
                  </div>
                ))}
              </div>
            </SkeletonCard>

            {/* Portrait Placeholder */}
            <SkeletonCard className="h-[400px] lg:h-[500px] p-4">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-radial from-neon-green/10 via-neon-cyan/5 to-transparent blur-2xl" />

                {/* Center placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-64 bg-cyber-card/20 rounded-lg border border-neon-green/10 animate-pulse" />
                </div>

                {/* Corner brackets */}
                <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-neon-green/30" />
                <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/30" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-neon-pink/30" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-neon-green/30" />
              </div>
            </SkeletonCard>
          </div>

          {/* Expertise Highlights */}
          <div>
            <div className="text-center mb-8">
              <SkeletonBox className="h-10 w-48 mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} className="p-6">
                  <SkeletonBox className="w-16 h-16 mb-4" />
                  <SkeletonText width="w-3/4" className="h-5 mb-2" />
                  <div className="space-y-2">
                    <SkeletonText width="w-full" />
                    <SkeletonText width="w-5/6" />
                  </div>
                </SkeletonCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SkeletonFadeWrapper>
  );
};

export default AboutSkeleton;
