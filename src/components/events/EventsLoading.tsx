export default function EventsLoading() {
  return (
    <div>
      {/* Skeleton for filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 animate-pulse rounded-full"
            ></div>
          ))}
        </div>
      </div>

      {/* Skeleton for results count */}
      <div className="mb-6">
        <div className="h-5 w-48 bg-gray-200 animate-pulse rounded"></div>
      </div>

      {/* Skeleton for event cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => {
          const uniqueKey = `event-skeleton-${idx}-${Math.random()
            .toString(36)
            .substring(2, 11)}`;
          return (
            <div
              key={uniqueKey}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-48 w-full bg-gray-300 animate-pulse"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="h-2.5 w-full bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-10 w-full bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
