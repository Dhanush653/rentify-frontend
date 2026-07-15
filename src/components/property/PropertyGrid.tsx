import PropertyCard from '@/components/property/PropertyCard'
import type { PropertyListItem } from '@/types/property'

export interface PropertyGridProps {
  properties: PropertyListItem[]
}

/** Responsive grid of PropertyCards: 1 col mobile, 2 tablet, 3–4 desktop. */
const PropertyGrid = ({ properties }: PropertyGridProps) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    ))}
  </div>
)

export default PropertyGrid
