import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { markerIconDefault } from '@/utils/leaflet'

export interface PropertyMapProps {
  latitude: number
  longitude: number
  title: string
  area: string
  city: string
}

const PropertyMap = ({ latitude, longitude, title, area, city }: PropertyMapProps) => {
  const position: [number, number] = [latitude, longitude]

  return (
    <div className="h-72 w-full overflow-hidden rounded-xl border border-gray-200 sm:h-96">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIconDefault}>
          <Popup>
            <span className="font-semibold">{title}</span>
            <br />
            {area}, {city}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default PropertyMap
