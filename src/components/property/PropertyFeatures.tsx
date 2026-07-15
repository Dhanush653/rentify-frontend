import type { ReactNode } from 'react'
import {
  AirVent,
  ArrowUpDown,
  Bath,
  BedDouble,
  Bike,
  Building2,
  CalendarClock,
  Camera,
  Car,
  Check,
  DoorOpen,
  Droplets,
  Layers,
  PawPrint,
  PlugZap,
  Ruler,
  Shield,
  Sofa,
  Users,
  Wifi,
  X,
  type LucideIcon,
} from 'lucide-react'
import { humanizeEnum } from '@/utils/helpers'
import FeatureCard from '@/components/property/FeatureCard'
import type { PropertyFeatures as Features } from '@/types/property'

export interface PropertyFeaturesProps {
  features: Features
}

interface FeatureRow {
  icon: LucideIcon
  label: string
  value: ReactNode
}

const boolValue = (value: boolean): ReactNode => (
  <span
    className={`inline-flex items-center gap-1 ${value ? 'text-blue-600' : 'text-slate-400'}`}
  >
    {value ? <Check className="h-4 w-4" aria-hidden="true" /> : <X className="h-4 w-4" aria-hidden="true" />}
    {value ? 'Yes' : 'No'}
  </span>
)

const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
  const rows: FeatureRow[] = [
    { icon: BedDouble, label: 'Bedrooms', value: features.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: features.bathrooms },
    { icon: DoorOpen, label: 'Balconies', value: features.balconies },
    { icon: Ruler, label: 'Built-up Area', value: `${features.builtUpArea} sq.ft` },
    { icon: Layers, label: 'Floor', value: features.floorNumber },
    { icon: Building2, label: 'Total Floors', value: features.totalFloors },
    { icon: CalendarClock, label: 'Property Age', value: `${features.propertyAge} yrs` },
    { icon: Sofa, label: 'Furnishing', value: humanizeEnum(features.furnishingType) },
    { icon: Users, label: 'Preferred Tenant', value: humanizeEnum(features.preferredTenant) },
    { icon: Droplets, label: 'Water Supply', value: humanizeEnum(features.waterSupply) },
    { icon: Car, label: 'Car Parking', value: boolValue(features.carParking) },
    { icon: Bike, label: 'Bike Parking', value: boolValue(features.bikeParking) },
    { icon: ArrowUpDown, label: 'Lift', value: boolValue(features.lift) },
    { icon: PlugZap, label: 'Power Backup', value: boolValue(features.powerBackup) },
    { icon: Wifi, label: 'WiFi', value: boolValue(features.wifi) },
    { icon: AirVent, label: 'Air Conditioner', value: boolValue(features.airConditioner) },
    { icon: Shield, label: 'Security', value: boolValue(features.security) },
    { icon: Camera, label: 'CCTV', value: boolValue(features.cctv) },
    { icon: PawPrint, label: 'Pet Friendly', value: boolValue(features.petFriendly) },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {rows.map((row) => (
        <FeatureCard key={row.label} icon={row.icon} label={row.label} value={row.value} />
      ))}
    </div>
  )
}

export default PropertyFeatures
