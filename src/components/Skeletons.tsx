import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/50",
        className
      )}
    />
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <article className="group relative overflow-visible rounded-xl backdrop-blur-xl bg-card/40 border-2 shadow-[var(--shadow-elegant)]">
      {/* Status indicator skeleton */}
      <div className="absolute top-4 right-4 z-10">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Graphic area skeleton */}
      <div className="aspect-video bg-gradient-to-br from-muted/20 via-muted/10 to-muted/20 relative overflow-hidden">
        <Skeleton className="absolute inset-0" />
      </div>

      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        {/* Metrics skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center p-2 rounded bg-muted/50">
              <Skeleton className="h-3 w-12 mx-auto mb-1" />
              <Skeleton className="h-4 w-16 mx-auto" />
            </div>
          ))}
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-md" />
          ))}
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </article>
  );
};

export const ExperienceCardSkeleton = () => {
  return (
    <div className="relative pl-8 pb-12">
      {/* Timeline dot */}
      <Skeleton className="absolute left-0 top-2 w-4 h-4 rounded-full" />

      {/* Timeline line */}
      <div className="absolute left-[7px] top-6 w-0.5 h-full bg-muted/30" />

      <div className="bg-card/40 backdrop-blur-xl border-2 rounded-xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Achievements */}
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <Skeleton className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-sm" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkillCategorySkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Category title */}
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-card/40 backdrop-blur-xl border rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded-sm" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectsSectionSkeleton = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="h-12 w-64" />
          </div>
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </div>
    </section>
  );
};

export const ExperienceSectionSkeleton = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="h-12 w-80" />
          </div>
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          <ExperienceCardSkeleton />
          <ExperienceCardSkeleton />
        </div>
      </div>
    </section>
  );
};

export const SkillsSectionSkeleton = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="h-12 w-64" />
          </div>
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Skills categories */}
        <div className="space-y-12">
          <SkillCategorySkeleton />
          <SkillCategorySkeleton />
          <SkillCategorySkeleton />
        </div>
      </div>
    </section>
  );
};
