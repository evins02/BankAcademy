import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-gray-200", className)} />;
}

export function SkeletonStatCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="mt-3 h-8 w-14" />
      <Skeleton className="mt-1.5 h-4 w-24" />
    </div>
  );
}

export function SkeletonModuleCard() {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <Skeleton className="mt-4 h-2 w-full rounded-full" />
    </div>
  );
}
