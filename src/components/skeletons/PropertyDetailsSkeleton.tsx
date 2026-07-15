import { Skeleton } from '@mui/material'

/** Placeholder matching the property details layout to prevent layout shift. */
const PropertyDetailsSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Skeleton variant="text" width={140} height={20} />

    <div className="flex flex-col gap-2">
      <Skeleton variant="rounded" width={70} height={22} />
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="text" width="35%" height={20} />
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6 lg:col-span-2">
        <Skeleton variant="rounded" height={0} sx={{ pt: '56%' }} />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={72} />
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton variant="text" width={160} height={28} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="95%" />
          <Skeleton variant="text" width="70%" />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton variant="text" width={200} height={28} />
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={64} />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Skeleton variant="text" width="50%" height={40} />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rounded" height={44} sx={{ mt: 2 }} />
          <div className="my-5 h-px bg-slate-200" />
          <Skeleton variant="text" width="70%" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Skeleton variant="rounded" height={64} />
            <Skeleton variant="rounded" height={64} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default PropertyDetailsSkeleton
