/**
 * Projects Section Skeleton
 * Card grid with image placeholders and text bars
 */

import {
  SkeletonText,
  SkeletonBox,
  SkeletonImage,
  SkeletonCard,
  SkeletonFadeWrapper,
} from "./SkeletonBase";

const ProjectCardSkeleton = () => {
  return (
    <SkeletonCard className="h-full">
      {/* Image */}
      <SkeletonImage aspectRatio="aspect-[16/9]" className="mb-4" />

      {/* Content */}
      <div className="space-y-3">
        {/* Category */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green/30 animate-pulse" />
          <SkeletonText width="w-16" className="h-3" />
        </div>

        {/* Title */}
        <SkeletonText width="w-3/4" className="h-6" />

        {/* Subtitle */}
        <SkeletonText width="w-1/2" className="h-4" />

        {/* Description */}
        <div className="space-y-2 pt-2">
          <SkeletonText width="w-full" />
          <SkeletonText width="w-5/6" />
          <SkeletonText width="w-4/6" />
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBox key={i} className="h-6 w-16" />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-3">
          <SkeletonBox className="h-9 flex-1" />
          <SkeletonBox className="h-9 flex-1" />
        </div>
      </div>
    </SkeletonCard>
  );
};

const ProjectsSkeleton = ({ show = true, count = 6 }) => {
  return (
    <SkeletonFadeWrapper show={show}>
      <section className="section-padding bg-cyber-dark relative overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-cyan/30" />
              <SkeletonText width="w-32" className="h-4" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-cyan/30" />
            </div>

            <SkeletonBox className="h-12 w-64 mx-auto mb-4" />

            <div className="max-w-2xl mx-auto space-y-2">
              <SkeletonText width="w-3/4 mx-auto" />
              <SkeletonText width="w-2/3 mx-auto" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonBox key={i} className="h-10 w-24" />
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </SkeletonFadeWrapper>
  );
};

export default ProjectsSkeleton;
