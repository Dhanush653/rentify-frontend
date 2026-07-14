import type { PropertyLocation as Location } from '@/types'

export interface PropertyLocationProps {
  location: Location
}

const PropertyLocation = ({ location }: PropertyLocationProps) => (
  <section aria-label="Property location">
    {/* TODO: render a react-leaflet MapContainer centred on the coordinates. */}
    <p className="text-sm text-gray-500">{location.city}</p>
  </section>
)

export default PropertyLocation
