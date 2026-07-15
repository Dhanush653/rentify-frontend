import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { Autocomplete, TextField, Typography } from '@mui/material'
import '@/utils/leaflet'
import type { LatLng } from '@/types/property'

/** Centre of India — a sensible default view before a location is picked. */
const DEFAULT_CENTER: [number, number] = [20.5937, 78.9629]
const DEFAULT_ZOOM = 5
const SELECTED_ZOOM = 15

interface NominatimResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
}

export interface LocationPickerProps {
  value: LatLng | null
  onChange: (coords: LatLng) => void
  error?: string
}

/** Recentres the map imperatively whenever `center` changes. */
const RecenterMap = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])

  return null
}

/** Places a marker wherever the user clicks. */
const ClickHandler = ({ onClick }: { onClick: (coords: LatLng) => void }) => {
  useMapEvents({
    click: (event) => onClick({ lat: event.latlng.lat, lng: event.latlng.lng }),
  })

  return null
}

const LocationPicker = ({ value, onChange, error }: LocationPickerProps) => {
  const [center, setCenter] = useState<[number, number]>(
    value ? [value.lat, value.lng] : DEFAULT_CENTER,
  )
  const [zoom, setZoom] = useState(value ? SELECTED_ZOOM : DEFAULT_ZOOM)

  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<NominatimResult[]>([])
  const [loading, setLoading] = useState(false)

  // Debounced Nominatim lookup — no API key required.
  useEffect(() => {
    const term = query.trim()
    const controller = new AbortController()

    const timer = setTimeout(async () => {
      if (term.length < 3) {
        setOptions([])
        return
      }

      setLoading(true)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(term)}`,
          { signal: controller.signal, headers: { Accept: 'application/json' } },
        )
        const data: NominatimResult[] = await res.json()
        setOptions(data)
      } catch {
        // Ignore aborted/failed lookups — the field just shows no options.
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [query])

  const handleSelect = (result: NominatimResult | null) => {
    if (!result) return

    const coords: LatLng = { lat: Number(result.lat), lng: Number(result.lon) }
    setCenter([coords.lat, coords.lng])
    setZoom(SELECTED_ZOOM)
    onChange(coords)
  }

  const handleMapClick = (coords: LatLng) => {
    setCenter([coords.lat, coords.lng])
    onChange(coords)
  }

  const markerPosition = useMemo<[number, number] | null>(
    () => (value ? [value.lat, value.lng] : null),
    [value],
  )

  return (
    <div className="flex flex-col gap-3">
      <Autocomplete
        options={options}
        loading={loading}
        filterOptions={(options) => options}
        getOptionLabel={(option) => option.display_name}
        isOptionEqualToValue={(option, selected) => option.place_id === selected.place_id}
        onInputChange={(_event, newValue) => setQuery(newValue)}
        onChange={(_event, selected) => handleSelect(selected)}
        noOptionsText={query.trim().length < 3 ? 'Type to search a place' : 'No places found'}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a place"
            size="small"
            placeholder="e.g. Anna Nagar, Chennai"
          />
        )}
      />

      <div className="h-72 w-full overflow-hidden rounded-lg border border-gray-300">
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap center={center} zoom={zoom} />
          <ClickHandler onClick={handleMapClick} />
          {markerPosition && <Marker position={markerPosition} />}
        </MapContainer>
      </div>

      <Typography variant="body2" color={error ? 'error' : 'text.secondary'}>
        {value
          ? `Selected: ${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}`
          : error ?? 'Click on the map or search to drop a pin.'}
      </Typography>
    </div>
  )
}

export default LocationPicker
