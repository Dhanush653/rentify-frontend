import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Car,
  Check,
  MapPin,
  Route,
  ShowerHead,
  Sofa,
  Store,
  X,
} from 'lucide-react'
import { ROUTES } from '@/utils/constants'
import { buildPath, formatCurrency, humanizeEnum } from '@/utils/helpers'
import type { PropertyListItem } from '@/types/property'

export interface PropertyCardProps {
  property: PropertyListItem
}

/** Inline SVG placeholder shown when a listing has no thumbnail. */
export const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#f1f5f9"/><text x="50%" y="50%" fill="#94a3b8" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">No image</text></svg>',
  )

/** Compact ✅ / ❌ indicator appended to a chip label. */
const YesNo = ({ value }: { value: boolean }) =>
  value ? (
    <Check className="h-3.5 w-3.5 text-emerald-600" aria-label="Yes" />
  ) : (
    <X className="h-3.5 w-3.5 text-red-500" aria-label="No" />
  )

/** One summary chip in the card's feature row. */
const Chip = ({
  icon: Icon,
  children,
}: {
  icon: typeof BedDouble
  children: ReactNode
}) => (
  <span className="flex items-center gap-1.5">
    <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
    {children}
  </span>
)

/**
 * Type-aware summary: houses show beds/baths/furnishing, shops show
 * washroom/main-road/corner-shop. Fields the list API doesn't send yet are
 * skipped, with a parking fallback so the row is never empty.
 */
const SummaryChips = ({ property }: { property: PropertyListItem }) => {
  const chips: ReactNode[] = []

  if (property.propertyType === 'HOUSE') {
    if (typeof property.bedRooms === 'number')
      chips.push(
        <Chip key="beds" icon={BedDouble}>
          {property.bedRooms} {property.bedRooms === 1 ? 'Bed' : 'Beds'}
        </Chip>,
      )
    if (typeof property.bathRooms === 'number')
      chips.push(
        <Chip key="baths" icon={Bath}>
          {property.bathRooms} {property.bathRooms === 1 ? 'Bath' : 'Baths'}
        </Chip>,
      )
    if (property.furnishingType)
      chips.push(
        <Chip key="furnishing" icon={Sofa}>
          {humanizeEnum(property.furnishingType)}
        </Chip>,
      )
  } else {
    // Shops show Washroom and Main Road as explicit yes/no indicators.
    if (property.washroomAvailable != null)
      chips.push(
        <Chip key="washroom" icon={ShowerHead}>
          Washroom
          <YesNo value={property.washroomAvailable} />
        </Chip>,
      )
    if (property.mainRoadFacing != null)
      chips.push(
        <Chip key="mainroad" icon={Route}>
          Main Road
          <YesNo value={property.mainRoadFacing} />
        </Chip>,
      )
    if (property.cornerShop)
      chips.push(
        <Chip key="corner" icon={Store}>
          Corner Shop
        </Chip>,
      )
  }

  // Fallback so a card never renders an empty feature row.
  if (chips.length === 0 && property.isParkingAvailable)
    chips.push(
      <Chip key="parking" icon={Car}>
        Parking
      </Chip>,
    )

  if (chips.length === 0) return null

  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
      {chips}
    </div>
  )
}

const PropertyCard = ({ property }: PropertyCardProps) => (
  <Link
    to={buildPath(ROUTES.PROPERTY_DETAILS, { id: property.id })}
    className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
      <img
        src={property.thumbnail || FALLBACK_IMAGE}
        alt={property.title}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src = FALLBACK_IMAGE
        }}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
        {humanizeEnum(property.propertyType)}
      </span>
      <span className="absolute bottom-3 left-3 rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-bold text-white shadow-md">
        {formatCurrency(property.rent)}
        <span className="font-normal text-emerald-100"> /mo</span>
      </span>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <h3 className="truncate text-lg font-semibold text-slate-900 transition-colors group-hover:text-emerald-600">
        {property.title}
      </h3>
      <div className="mt-1 flex items-center gap-1 text-slate-500">
        <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="truncate text-sm">
          {property.area}, {property.city}
        </span>
      </div>

      <SummaryChips property={property} />

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-sm font-medium text-slate-500">View details</span>
        <ArrowRight
          className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </div>
  </Link>
)

export default PropertyCard
