import type { ReactNode } from 'react'
import {
  Bath,
  BedDouble,
  Building2,
  CalendarClock,
  DoorOpen,
  Droplets,
  Layers,
  Ruler,
  Sofa,
  Users,
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

/** Numeric / enum specs for a property (amenities are shown separately). */
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
