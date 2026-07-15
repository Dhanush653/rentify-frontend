import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

/**
 * Leaflet's default marker points at image paths that don't exist under a
 * bundler, so markers render broken. We drop the auto-detection and expose an
 * explicit icon built from the bundled assets — pass it to every <Marker>.
 */
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl

export const markerIconDefault = new L.Icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})
