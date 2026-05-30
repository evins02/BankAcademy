export default function LapModusLoading() {
  return (
    <div className="flex h-full flex-col">
      <div className="h-16 shrink-0 border-b border-border bg-surface" />
      <div className="flex-1 p-6">
        <div className="mx-auto max-w-lg space-y-4">
          <div className="h-48 animate-pulse rounded-2xl bg-gray-100" />
          <div className="h-20 animate-pulse rounded-xl bg-gray-100" />
          <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
