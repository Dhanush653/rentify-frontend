import PropertyCardSkeleton from '@/components/skeletons/PropertyCardSkeleton'

export interface PropertyGridSkeletonProps {
  count?: number
}

/** A grid of card skeletons matching PropertyGrid's responsive columns. */
const PropertyGridSkeleton = ({ count = 8 }: PropertyGridSkeletonProps) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <PropertyCardSkeleton key={index} />
    ))}
  </div>
)

export default PropertyGridSkeleton
