import type { Property } from '@/types/property'

export interface PropertyCardProps {
  property: Property
}

const PropertyCard = ({ property }: PropertyCardProps) => (
  <article className="rounded-lg border border-gray-200 bg-white p-4">
    <h3 className="font-semibold text-gray-900">{property.title}</h3>
    {/* TODO: cover image, rent, location and a link to the details page. */}
  </article>
)

export default PropertyCard
