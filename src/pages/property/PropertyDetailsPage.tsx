import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Eye,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  Ruler,
  ShowerHead,
  Sofa,
  User,
  type LucideIcon,
} from 'lucide-react'
import { propertyApi } from '@/api/propertyApi'
import ErrorState from '@/components/common/ErrorState'
import Seo from '@/components/common/Seo'
import PropertyDetailsSkeleton from '@/components/skeletons/PropertyDetailsSkeleton'
import PropertyFeatures from '@/components/property/PropertyFeatures'
import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyMap from '@/components/property/PropertyMap'
import { formatCurrency, formatDate, humanizeEnum, whatsappLink } from '@/utils/helpers'
import type { PropertyDetails } from '@/types/property'

/** A titled white card used for each content section. */
const Card = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
    <h2 className="mb-4 text-lg font-bold text-slate-900">{title}</h2>
    {children}
  </section>
)

/** A single stat in the quick-specs strip. */
const Spec = ({ icon: Icon, value, label }: { icon: LucideIcon; value: ReactNode; label: string }) => (
  <div className="flex items-center gap-3 px-4 py-3">
    <Icon className="h-5 w-5 flex-shrink-0 text-emerald-600" aria-hidden="true" />
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  </div>
)

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [property, setProperty] = useState<PropertyDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProperty = useCallback(async () => {
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      const data = await propertyApi.getPropertyById(id)
      setProperty(data)
    } catch {
      setError('Unable to load this property. It may have been removed.')
      setProperty(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProperty()
  }, [fetchProperty])

  if (loading) return <PropertyDetailsSkeleton />

  if (error || !property) {
    return (
      <div className="flex flex-col gap-4">
        <Seo title="Property not found | Rentify" />
        <ErrorState
          title="Property unavailable"
          message={error ?? 'This property could not be found.'}
          onRetry={fetchProperty}
        />
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowLeft size={16} />}
          sx={{ alignSelf: 'center' }}
        >
          Go back
        </Button>
      </div>
    )
  }

  const { features } = property
  const isHouse = property.propertyType === 'HOUSE'

  // Quick-specs strip differs per property type; missing values fall back to —.
  const specs = isHouse
    ? [
        { icon: BedDouble, value: features.bedrooms ?? '—', label: 'Bedrooms' },
        { icon: Bath, value: features.bathrooms ?? '—', label: 'Bathrooms' },
        {
          icon: Ruler,
          value: features.builtUpArea != null ? `${features.builtUpArea} sq.ft` : '—',
          label: 'Built-up',
        },
        {
          icon: Sofa,
          value: features.furnishingType ? humanizeEnum(features.furnishingType) : '—',
          label: 'Furnishing',
        },
      ]
    : [
        {
          icon: Ruler,
          value: features.builtUpArea != null ? `${features.builtUpArea} sq.ft` : '—',
          label: 'Built-up',
        },
        { icon: Layers, value: features.floorNumber ?? '—', label: 'Floor' },
        {
          icon: ShowerHead,
          value: features.washroomAvailable != null ? (features.washroomAvailable ? 'Yes' : 'No') : '—',
          label: 'Washroom',
        },
        {
          icon: Route,
          value: features.mainRoadFacing != null ? (features.mainRoadFacing ? 'Yes' : 'No') : '—',
          label: 'Main Road',
        },
      ]

  return (
    <div className="flex flex-col gap-6">
      <Seo
        title={`${property.title} | Rentify`}
        description={`${humanizeEnum(property.propertyType)} for rent in ${property.area}, ${property.city} at ${formatCurrency(property.rent)}/month.`}
      />
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to listings
      </button>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <span className="w-fit rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {humanizeEnum(property.propertyType)}
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {property.title}
        </h1>
        <div className="flex items-center gap-1.5 text-slate-500">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm">
            {property.area}, {property.city}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <PropertyGallery images={property.imageUrls ?? []} title={property.title} />

          {/* Quick specs */}
          <div className="grid grid-cols-2 divide-slate-200 rounded-2xl border border-slate-200 bg-white sm:grid-cols-4 sm:divide-x">
            {specs.map((spec) => (
              <Spec key={spec.label} icon={spec.icon} value={spec.value} label={spec.label} />
            ))}
          </div>

          <Card title="Description">
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {property.description || 'No description provided.'}
            </p>
          </Card>

          {/* Grouped feature sections (common / house or shop / parking / amenities) */}
          <PropertyFeatures features={property.features} propertyType={property.propertyType} />

          <Card title="Location">
            <PropertyMap
              latitude={property.latitude}
              longitude={property.longitude}
              title={property.title}
              area={property.area}
              city={property.city}
            />
          </Card>
        </div>

        {/* Right: sticky contact card */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {formatCurrency(property.rent)}
              </span>
              <span className="text-sm text-slate-500">/ month</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Deposit <span className="font-semibold text-slate-700">{formatCurrency(property.deposit)}</span>
            </p>

            <Button
              component="a"
              href={`tel:${property.ownerPhone}`}
              variant="contained"
              size="large"
              fullWidth
              startIcon={<Phone size={18} />}
              sx={{ mt: 3, py: 1.25 }}
            >
              Contact Owner
            </Button>

            {property.whatsAppNumber && (
              <Button
                component="a"
                href={whatsappLink(
                  property.whatsAppNumber,
                  `Hi, I'm interested in "${property.title}" listed on Rentify.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<MessageCircle size={18} />}
                sx={{ mt: 1.5, py: 1.25 }}
              >
                Chat on WhatsApp
              </Button>
            )}

            <div className="my-5 h-px bg-slate-200" />

            {/* Owner */}
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500">
                <User className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{property.ownerName}</p>
                <a href={`tel:${property.ownerPhone}`} className="text-xs text-emerald-600 hover:underline">
                  {property.ownerPhone}
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs">Views</span>
                </div>
                <p className="mt-1 text-lg font-bold text-slate-900">{property.viewCount}</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span className="text-xs">Contacts</span>
                </div>
                <p className="mt-1 text-lg font-bold text-slate-900">{property.contactCount}</p>
              </div>
            </div>

            {property.createdAt && (
              <p className="mt-5 text-center text-xs text-slate-400">
                Listed on {formatDate(property.createdAt)}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default PropertyDetailsPage
