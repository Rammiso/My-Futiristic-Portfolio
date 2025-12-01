/**
 * Skills Section Skeleton
 * Category headers + skill cards grid
 */

import {
  SkeletonText,
  SkeletonBox,
  SkeletonCard,
  SkeletonFadeWrapper,
} from "./SkeletonBase";

const SkillCardSkeleton = () => {
  return (
    <SkeletonCard className="p-4">
      {/* Icon + Name */}
      <div className="flex items-center gap-3 mb-3">
        <SkeletonBox className="w-10 h-10" />
        <SkeletonText width="w-24" className="h-4" />
      </div>

      {/* Proficiency */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <SkeletonText width="w-12" className="h-3" />
          <SkeletonText width="w-8" className="h-3" />
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-cyber-card/50 rounded-full overflow-hidden">
          <div className="h-full w-4/5 bg-gradient-to-r from-neon-green/30 to-neon-cyan/30 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mt-3">
        <div className="w-1.5 h-1.5 rounded-full bg-neon-green/30 animate-pulse" />
        <SkeletonText width="w-16" className="h-3" />
      </div>
    </SkeletonCard>
  );
};

const SkillsSkeleton = ({ show = true }) => {
  return (
    <SkeletonFadeWrapper show={show}>
      <section className="section-padding bg-cyber-darker relative overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-green/30" />
              <SkeletonText width="w-32" className="h-4" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green/30" />
            </div>

            <SkeletonBox className="h-12 w-64 mx-auto mb-4" />

            <SkeletonText width="w-96 mx-auto" />
          </div>

          {/* Skills by Category */}
          <div className="space-y-16">
            {[1, 2, 3, 4].map((cat) => (
              <div key={cat}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1 h-12 rounded-full bg-neon-green/30 animate-pulse" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <SkeletonBox className="w-8 h-8" />
                      <SkeletonText width="w-48" className="h-6" />
                    </div>
                    <div className="h-px bg-gradient-to-r from-white/20 to-transparent" />
                  </div>
                  <SkeletonBox className="w-8 h-8" />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: cat === 4 ? 2 : 6 }).map((_, i) => (
                    <SkillCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} className="p-6 text-center">
                <SkeletonText width="w-16 mx-auto" className="h-10 mb-2" />
                <SkeletonText width="w-24 mx-auto" className="h-3" />
              </SkeletonCard>
            ))}
          </div>
        </div>
      </section>
    </SkeletonFadeWrapper>
  );
};

export default SkillsSkeleton;
