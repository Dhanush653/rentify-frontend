import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import { ROUTES } from '@/utils/constants'
import { buildPath, formatCurrency, humanizeEnum } from '@/utils/helpers'
import type { PropertyListItem } from '@/types/property'

export interface PropertyCardProps {
  property: PropertyListItem
}

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#f1f5f9"/><text x="50%" y="50%" fill="#94a3b8" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">No image</text></svg>',
  )

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
      <span className="absolute bottom-3 left-3 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow-md">
        {formatCurrency(property.rent)}
        <span className="font-normal text-blue-100"> /mo</span>
      </span>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <h3 className="truncate text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
        {property.title}
      </h3>
      <div className="mt-1 flex items-center gap-1 text-slate-500">
        <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span className="truncate text-sm">
          {property.area}, {property.city}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <span className="text-sm font-medium text-slate-500">View details</span>
        <ArrowRight
          className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </div>
  </Link>
)

export default PropertyCard
