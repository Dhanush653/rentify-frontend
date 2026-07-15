import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Chip, Divider, Paper, Typography } from '@mui/material'
import { ArrowLeft, Eye, MapPin, MessageCircle, Phone, User } from 'lucide-react'
import { propertyApi } from '@/api/propertyApi'
import Loader from '@/components/common/Loader'
import PropertyFeatures from '@/components/property/PropertyFeatures'
import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyMap from '@/components/property/PropertyMap'
import { formatCurrency, formatDate, humanizeEnum } from '@/utils/helpers'
import type { PropertyDetails } from '@/types/property'

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

  if (loading) {
    return <Loader label="Loading property..." />
  }

  if (error || !property) {
    return (
      <div className="flex flex-col gap-4">
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={fetchProperty}>
              Retry
            </Button>
          }
        >
          {error ?? 'Property not found.'}
        </Alert>
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowLeft size={16} />}
          sx={{ textTransform: 'none', alignSelf: 'flex-start' }}
        >
          Go back
        </Button>
      </div>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowLeft size={16} />}
        sx={{ textTransform: 'none', alignSelf: 'flex-start' }}
      >
        Back
      </Button>

      {/* Gallery + summary: two columns on desktop, single on mobile */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyGallery images={property.imageUrls ?? []} title={property.title} />
        </div>

        <aside className="lg:col-span-1">
          <Paper
            elevation={0}
            sx={{ p: { xs: 2.5, sm: 3 }, borderRadius: 3, border: '1px solid #e5e7eb' }}
          >
            <Chip
              label={humanizeEnum(property.propertyType)}
              size="small"
              color="primary"
              variant="outlined"
            />

            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mt: 1.5 }}>
              {property.title}
            </Typography>

            <div className="mt-1 flex items-center gap-1 text-gray-500">
              <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <Typography variant="body2" color="text.secondary">
                {property.area}, {property.city}
              </Typography>
            </div>

            <div className="mt-4">
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#4f46e5' }}>
                {formatCurrency(property.rent)}
                <Typography component="span" variant="body2" color="text.secondary">
                  {' '}
                  / month
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Deposit: {formatCurrency(property.deposit)}
              </Typography>
            </div>

            <Button
              component="a"
              href={`tel:${property.ownerPhone}`}
              variant="contained"
              size="large"
              fullWidth
              startIcon={<Phone size={18} />}
              sx={{ textTransform: 'none', mt: 3, py: 1.25 }}
            >
              Contact Owner
            </Button>

            <Divider sx={{ my: 2.5 }} />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <Typography variant="body2">{property.ownerName}</Typography>
              </div>
              <a
                href={`tel:${property.ownerPhone}`}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600"
              >
                <Phone className="h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <Typography variant="body2">{property.ownerPhone}</Typography>
              </a>
            </div>

            <Divider sx={{ my: 2.5 }} />

            <div className="flex items-center justify-between text-gray-500">
              <span className="flex items-center gap-1.5 text-sm">
                <Eye className="h-4 w-4" aria-hidden="true" />
                {property.viewCount} views
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {property.contactCount} contacts
              </span>
            </div>

            {property.createdAt && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                Listed on {formatDate(property.createdAt)}
              </Typography>
            )}
          </Paper>
        </aside>
      </div>

      {/* Description */}
      <Paper
        elevation={0}
        sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3, border: '1px solid #e5e7eb' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
          Description
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
          {property.description || 'No description provided.'}
        </Typography>
      </Paper>

      {/* Features */}
      <div>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Features & Amenities
        </Typography>
        <PropertyFeatures features={property.features} />
      </div>

      {/* Location map (below the details) */}
      <div>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Location
        </Typography>
        <PropertyMap
          latitude={property.latitude}
          longitude={property.longitude}
          title={property.title}
          area={property.area}
          city={property.city}
        />
      </div>
    </section>
  )
}

export default PropertyDetailsPage
