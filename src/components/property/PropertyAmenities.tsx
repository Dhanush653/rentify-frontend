import {
  AirVent,
  ArrowUpDown,
  Camera,
  Check,
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

/** Common amenities only — parking and pet-friendly are shown in their own sections. */
const AMENITIES: AmenityDef[] = [
  { key: 'lift', label: 'Lift', icon: ArrowUpDown },
  { key: 'powerBackup', label: 'Power Backup', icon: PlugZap },
  { key: 'wifi', label: 'WiFi', icon: Wifi },
  { key: 'airConditioner', label: 'Air Conditioner', icon: AirVent },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'cctv', label: 'CCTV', icon: Camera },
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
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 bg-slate-50 text-slate-400',
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
          {available ? (
            <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          ) : (
            <X className="h-4 w-4 text-slate-300" aria-hidden="true" />
          )}
        </span>
      )
    })}
  </div>
)

export default PropertyAmenities
