import { Skeleton } from '@mui/material'

/** Placeholder matching PropertyCard's shape to prevent layout shift. */
const PropertyCardSkeleton = () => (
  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
    <Skeleton variant="rectangular" height={0} sx={{ pt: '75%' }} />
    <div className="p-5">
      <Skeleton variant="text" width="80%" height={26} />
      <Skeleton variant="text" width="55%" height={20} />
      <div className="mt-3 border-t border-slate-100 pt-3">
        <Skeleton variant="text" width="40%" height={20} />
      </div>
    </div>
  </div>
)

export default PropertyCardSkeleton
