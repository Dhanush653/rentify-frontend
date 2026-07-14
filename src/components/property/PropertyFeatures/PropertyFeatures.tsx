import type { Property } from '@/types'

export interface PropertyFeaturesProps {
  property: Property
}

const PropertyFeatures = ({ property }: PropertyFeaturesProps) => (
  <section aria-label="Property features">
    {/* TODO: bedrooms, bathrooms, area, furnishing and amenities. */}
    <p className="text-sm text-gray-500">{property.amenities.length} amenity(ies)</p>
  </section>
)

export default PropertyFeatures
