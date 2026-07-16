import type { ReactNode } from 'react'
import { Card, CardContent } from '@mui/material'
import {
  Bath,
  BedDouble,
  Bike,
  Building2,
  CalendarClock,
  Check,
  Car,
  DoorOpen,
  Droplets,
  Home,
  Layers,
  LayoutGrid,
  PawPrint,
  Route,
  Ruler,
  ShowerHead,
  Sofa,
  Sparkles,
  Store,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { humanizeEnum } from '@/utils/helpers'
import FeatureCard from '@/components/property/FeatureCard'
import PropertyAmenities from '@/components/property/PropertyAmenities'
import type { PropertyFeatures as Features, PropertyType } from '@/types/property'

export interface PropertyFeaturesProps {
  features: Features
  propertyType: PropertyType
}

interface FeatureRow {
  icon: LucideIcon
  label: string
  value: ReactNode
}

/** ✅ Yes / ❌ No indicator for boolean features. */
const BoolValue = ({ value }: { value: boolean }) =>
  value ? (
    <span className="inline-flex items-center gap-1 text-emerald-600">
      <Check className="h-4 w-4" aria-hidden="true" />
      Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-red-500">
      <X className="h-4 w-4" aria-hidden="true" />
      No
    </span>
  )

/** True when the backend actually sent a value (shop fields are null on houses, etc.). */
const present = <T,>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined

/** Titled MUI card wrapping one group of features. */
const FeatureSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon
  title: string
  children: ReactNode
}) => (
  <Card elevation={0} sx={{ borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
    <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } } }}>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
        <Icon className="h-5 w-5 text-emerald-600" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </CardContent>
  </Card>
)

const RowGrid = ({ rows }: { rows: FeatureRow[] }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
    {rows.map((row) => (
      <FeatureCard key={row.label} icon={row.icon} label={row.label} value={row.value} />
    ))}
  </div>
)

/**
 * All feature sections for the details page, grouped into MUI cards:
 * Common Features, House/Shop Details (per property type), Parking and
 * Amenities. Rows whose value the backend didn't send are skipped.
 */
const PropertyFeatures = ({ features, propertyType }: PropertyFeaturesProps) => {
  const commonRows: FeatureRow[] = [
    present(features.builtUpArea) && {
      icon: Ruler,
      label: 'Built-up Area',
      value: `${features.builtUpArea} sq.ft`,
    },
    present(features.floorNumber) && {
      icon: Layers,
      label: 'Floor',
      value: features.floorNumber,
    },
    present(features.totalFloors) && {
      icon: Building2,
      label: 'Total Floors',
      value: features.totalFloors,
    },
    present(features.propertyAge) && {
      icon: CalendarClock,
      label: 'Property Age',
      value: `${features.propertyAge} yrs`,
    },
    present(features.waterSupply) && {
      icon: Droplets,
      label: 'Water Supply',
      value: humanizeEnum(features.waterSupply),
    },
  ].filter(Boolean) as FeatureRow[]

  const houseRows: FeatureRow[] = [
    present(features.bedrooms) && {
      icon: BedDouble,
      label: 'Bedrooms',
      value: features.bedrooms,
    },
    present(features.bathrooms) && {
      icon: Bath,
      label: 'Bathrooms',
      value: features.bathrooms,
    },
    present(features.balconies) && {
      icon: DoorOpen,
      label: 'Balconies',
      value: features.balconies,
    },
    present(features.furnishingType) && {
      icon: Sofa,
      label: 'Furnishing',
      value: humanizeEnum(features.furnishingType),
    },
    present(features.preferredTenant) && {
      icon: Users,
      label: 'Preferred Tenant',
      value: humanizeEnum(features.preferredTenant),
    },
    present(features.petFriendly) && {
      icon: PawPrint,
      label: 'Pet Friendly',
      value: <BoolValue value={features.petFriendly} />,
    },
  ].filter(Boolean) as FeatureRow[]

  const shopRows: FeatureRow[] = [
    present(features.washroomAvailable) && {
      icon: ShowerHead,
      label: 'Washroom Available',
      value: <BoolValue value={features.washroomAvailable} />,
    },
    present(features.mainRoadFacing) && {
      icon: Route,
      label: 'Main Road Facing',
      value: <BoolValue value={features.mainRoadFacing} />,
    },
    present(features.cornerShop) && {
      icon: Store,
      label: 'Corner Shop',
      value: <BoolValue value={features.cornerShop} />,
    },
  ].filter(Boolean) as FeatureRow[]

  const parkingRows: FeatureRow[] = [
    present(features.carParking) && {
      icon: Car,
      label: 'Car Parking',
      value: <BoolValue value={features.carParking} />,
    },
    present(features.bikeParking) && {
      icon: Bike,
      label: 'Bike Parking',
      value: <BoolValue value={features.bikeParking} />,
    },
  ].filter(Boolean) as FeatureRow[]

  return (
    <div className="flex flex-col gap-6">
      {commonRows.length > 0 && (
        <FeatureSection icon={LayoutGrid} title="Common Features">
          <RowGrid rows={commonRows} />
        </FeatureSection>
      )}

      {propertyType === 'HOUSE' && houseRows.length > 0 && (
        <FeatureSection icon={Home} title="House Details">
          <RowGrid rows={houseRows} />
        </FeatureSection>
      )}

      {propertyType === 'SHOP' && shopRows.length > 0 && (
        <FeatureSection icon={Store} title="Shop Details">
          <RowGrid rows={shopRows} />
        </FeatureSection>
      )}

      {parkingRows.length > 0 && (
        <FeatureSection icon={Car} title="Parking">
          <RowGrid rows={parkingRows} />
        </FeatureSection>
      )}

      <FeatureSection icon={Sparkles} title="Amenities">
        <PropertyAmenities features={features} />
      </FeatureSection>
    </div>
  )
}

export default PropertyFeatures
