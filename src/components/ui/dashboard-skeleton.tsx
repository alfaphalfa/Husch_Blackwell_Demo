import { Skeleton } from "./skeleton"
import { Card } from "./card"

export function KPICardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-4 w-24" />
    </Card>
  )
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-64 w-full rounded-md" />
      </div>
    </Card>
  )
}

export function PieChartSkeleton() {
  return (
    <Card className="p-6">
      <Skeleton className="h-6 w-32 mb-6" />
      <div className="flex items-center justify-center mb-4">
        <Skeleton className="h-40 w-40 rounded-full" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
      </div>
    </Card>
  )
}

export function ActivitySkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <div className="text-right space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Skeleton className="h-8 w-16 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <KPICardSkeleton key={i} />
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <ChartSkeleton className="col-span-2" />
          <PieChartSkeleton />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>

        {/* Recent Activity */}
        <ActivitySkeleton />
      </div>
    </div>
  )
}

export function DocumentAnalysisLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <Card className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      </Card>

      {/* Document Analysis */}
      <Card className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-4">
          <div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div>
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-16 w-full" />
          </div>
          <div>
            <Skeleton className="h-3 w-20 mb-2" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Risk Assessment */}
      <Card className="p-6">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-3 rounded-lg border">
              <div className="flex items-start justify-between mb-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}