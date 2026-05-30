export default function DashboardLoading() {
  return (
    <div className="flex h-full flex-col">
      <div className="h-16 shrink-0 border-b border-border bg-surface" />
      <div className="flex-1 p-6">
        <div className="mb-8 h-32 animate-pulse rounded-2xl bg-gray-100" />
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
