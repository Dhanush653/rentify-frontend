import {
  AirVent,
  ArrowUpDown,
  Bike,
  Camera,
  Car,
  Check,
  PawPrint,
  PlugZap,
  Shield,
  Wifi,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/utils/helpers'
import type { PropertyFeatures } from '@/types/property'

export interface PropertyAmenitiesProps {
  features: PropertyFeatures
}

interface AmenityDef {
  key: keyof PropertyFeatures
  label: string
  icon: LucideIcon
}

const AMENITIES: AmenityDef[] = [
  { key: 'carParking', label: 'Car Parking', icon: Car },
  { key: 'bikeParking', label: 'Bike Parking', icon: Bike },
  { key: 'lift', label: 'Lift', icon: ArrowUpDown },
  { key: 'powerBackup', label: 'Power Backup', icon: PlugZap },
  { key: 'wifi', label: 'WiFi', icon: Wifi },
  { key: 'airConditioner', label: 'Air Conditioner', icon: AirVent },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'cctv', label: 'CCTV', icon: Camera },
  { key: 'petFriendly', label: 'Pet Friendly', icon: PawPrint },
]

/**
 * Amenities shown as availability pills — provided ones highlighted in blue,
 * unavailable ones muted, each with a clear check / cross indicator.
 */
const PropertyAmenities = ({ features }: PropertyAmenitiesProps) => (
  <div className="flex flex-wrap gap-2.5">
    {AMENITIES.map(({ key, label, icon: Icon }) => {
      const available = Boolean(features[key])

      return (
        <span
          key={key}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium',
            available
              ? 'border-blue-200 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-slate-50 text-slate-400',
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
          {available ? (
            <Check className="h-4 w-4 text-blue-600" aria-hidden="true" />
          ) : (
            <X className="h-4 w-4 text-slate-300" aria-hidden="true" />
          )}
        </span>
      )
    })}
  </div>
)

export default PropertyAmenities
