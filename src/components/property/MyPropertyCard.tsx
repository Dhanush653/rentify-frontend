import { Link } from 'react-router-dom'
import { Eye, MapPin, Pencil, Phone, Trash2 } from 'lucide-react'
import { FALLBACK_IMAGE } from '@/components/property/PropertyCard'
import { ROUTES } from '@/utils/constants'
import { buildPath, cn, formatCurrency, humanizeEnum } from '@/utils/helpers'
import type { MyPropertyListItem } from '@/types/property'

export interface MyPropertyCardProps {
  property: MyPropertyListItem
  /** Called when the user clicks Delete; the parent owns the confirmation flow. */
  onDelete: (property: MyPropertyListItem) => void
}

/** Badge colours per listing status; unknown statuses fall back to neutral. */
const STATUS_STYLES: Record<string, string> = {
  ACTIVE: 'bg-emerald-500/95 text-white',
  INACTIVE: 'bg-slate-500/95 text-white',
  EXPIRED: 'bg-red-500/95 text-white',
}

const actionClass =
  'inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors'

/** Owner-dashboard card: listing summary + stats + View / Edit / Delete actions. */
const MyPropertyCard = ({ property, onDelete }: MyPropertyCardProps) => {
  const statusClass =
    (property.status && STATUS_STYLES[property.status]) ?? 'bg-slate-500/95 text-white'

  // The backend may omit these counters; only render the stats it actually sent.
  const hasViews = typeof property.viewCount === 'number'
  const hasContacts = typeof property.contactCount === 'number'

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.thumbnail || FALLBACK_IMAGE}
          alt={property.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE
          }}
          className="h-full w-full object-cover"
        />
        {property.status && (
          <span
            className={cn(
              'absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm',
              statusClass,
            )}
          >
            {humanizeEnum(property.status)}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
          {humanizeEnum(property.propertyType)}
        </span>
        <span className="absolute bottom-3 left-3 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-bold text-white shadow-md">
          {formatCurrency(property.rent)}
          <span className="font-normal text-blue-100"> /mo</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="truncate text-lg font-semibold text-slate-900">{property.title}</h3>
        <div className="mt-1 flex items-center gap-1 text-slate-500">
          <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="truncate text-sm">
            {property.area}, {property.city}
          </span>
        </div>

        {(hasViews || hasContacts) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            {hasViews && (
              <span className="flex items-center gap-1.5" title="Views">
                <Eye className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {property.viewCount} {property.viewCount === 1 ? 'view' : 'views'}
              </span>
            )}
            {hasContacts && (
              <span className="flex items-center gap-1.5" title="Contacts">
                <Phone className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {property.contactCount} {property.contactCount === 1 ? 'contact' : 'contacts'}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <Link
            to={buildPath(ROUTES.PROPERTY_DETAILS, { id: property.id })}
            className={cn(actionClass, 'bg-slate-100 text-slate-700 hover:bg-slate-200')}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            View
          </Link>
          <Link
            to={buildPath(ROUTES.EDIT_PROPERTY, { id: property.id })}
            className={cn(actionClass, 'bg-blue-50 text-blue-700 hover:bg-blue-100')}
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(property)}
            className={cn(actionClass, 'bg-red-50 text-red-600 hover:bg-red-100')}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default MyPropertyCard
