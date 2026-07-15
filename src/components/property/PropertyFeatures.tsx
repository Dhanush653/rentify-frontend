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
  type LucideIcon,
} from 'lucide-react'
import { humanizeEnum } from '@/utils/helpers'
import type { PropertyFeatures as Features } from '@/types/property'

export interface PropertyFeaturesProps {
  features: Features
}

interface FeatureRow {
  icon: LucideIcon
  label: string
  value: ReactNode
}

const boolText = (value: boolean) => (value ? '✅ Yes' : '❌ No')

const FeatureItem = ({ icon: Icon, label, value }: FeatureRow) => (
  <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="truncate text-sm font-medium text-gray-900">{value}</p>
    </div>
  </div>
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
    { icon: Car, label: 'Car Parking', value: boolText(features.carParking) },
    { icon: Bike, label: 'Bike Parking', value: boolText(features.bikeParking) },
    { icon: ArrowUpDown, label: 'Lift', value: boolText(features.lift) },
    { icon: PlugZap, label: 'Power Backup', value: boolText(features.powerBackup) },
    { icon: Wifi, label: 'WiFi', value: boolText(features.wifi) },
    { icon: AirVent, label: 'Air Conditioner', value: boolText(features.airConditioner) },
    { icon: Shield, label: 'Security', value: boolText(features.security) },
    { icon: Camera, label: 'CCTV', value: boolText(features.cctv) },
    { icon: PawPrint, label: 'Pet Friendly', value: boolText(features.petFriendly) },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {rows.map((row) => (
        <FeatureItem key={row.label} icon={row.icon} label={row.label} value={row.value} />
      ))}
    </div>
  )
}

export default PropertyFeatures
