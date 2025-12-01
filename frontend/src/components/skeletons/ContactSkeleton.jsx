/**
 * Contact Section Skeleton
 * Form fields + globe placeholder
 */

import {
  SkeletonText,
  SkeletonBox,
  SkeletonCard,
  SkeletonFadeWrapper,
} from "./SkeletonBase";

const ContactSkeleton = ({ show = true }) => {
  return (
    <SkeletonFadeWrapper show={show}>
      <section className="section-padding bg-cyber-darker relative overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-neon-green/30" />
              <SkeletonText width="w-36" className="h-4" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-neon-green/30" />
            </div>

            <SkeletonBox className="h-12 w-56 mx-auto mb-4" />

            <div className="max-w-2xl mx-auto space-y-2">
              <SkeletonText width="w-3/4 mx-auto" />
              <SkeletonText width="w-32 mx-auto" className="h-3" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Globe + Contact Info */}
            <div className="space-y-8">
              {/* 3D Globe Placeholder */}
              <SkeletonCard className="p-8 h-80">
                <div className="relative w-full h-full">
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-neon-cyan/20 animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-neon-green/10 animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-neon-pink/10 animate-pulse" />
                </div>
              </SkeletonCard>

              {/* Contact Info */}
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <SkeletonCard key={i} className="p-4">
                    <div className="flex items-center gap-4">
                      <SkeletonBox className="w-12 h-12" />
                      <div className="flex-1 space-y-2">
                        <SkeletonText width="w-16" className="h-3" />
                        <SkeletonText width="w-32" className="h-4" />
                      </div>
                    </div>
                  </SkeletonCard>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <SkeletonCard className="p-8">
              <div className="space-y-6">
                {/* Form Fields */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <SkeletonText width="w-20" className="h-3" />
                    <SkeletonBox className="h-12 w-full" />
                  </div>
                ))}

                {/* Message Field (taller) */}
                <div className="space-y-2">
                  <SkeletonText width="w-24" className="h-3" />
                  <SkeletonBox className="h-32 w-full" />
                </div>

                {/* Submit Button */}
                <SkeletonBox className="h-14 w-full" />

                {/* Status */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan/30 animate-pulse" />
                  <SkeletonText width="w-32" className="h-3" />
                </div>
              </div>

              {/* Corner Brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-green/20" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan/20" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan/20" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-green/20" />
            </SkeletonCard>
          </div>

          {/* Tagline */}
          <div className="text-center mt-16">
            <SkeletonText width="w-96 mx-auto" className="h-8" />
          </div>
        </div>
      </section>
    </SkeletonFadeWrapper>
  );
};

export default ContactSkeleton;
