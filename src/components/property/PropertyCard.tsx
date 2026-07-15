import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material'
import { MapPin } from 'lucide-react'
import { ROUTES } from '@/utils/constants'
import { buildPath, formatCurrency, humanizeEnum } from '@/utils/helpers'
import type { PropertyListItem } from '@/types/property'

export interface PropertyCardProps {
  property: PropertyListItem
}

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" font-size="16" text-anchor="middle" dominant-baseline="middle">No image</text></svg>',
  )

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate()

  const goToDetails = () =>
    navigate(buildPath(ROUTES.PROPERTY_DETAILS, { id: property.id }))

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 3,
        border: '1px solid #e5e7eb',
        transition: 'box-shadow 150ms ease, transform 150ms ease',
        '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
      }}
    >
      <CardActionArea
        onClick={goToDetails}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardMedia
          component="img"
          height="180"
          image={property.thumbnail || FALLBACK_IMAGE}
          alt={property.title}
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE
          }}
          sx={{ objectFit: 'cover' }}
        />

        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
          <div className="mb-2 flex items-start justify-between gap-2">
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
              {property.title}
            </Typography>
            <Chip
              label={humanizeEnum(property.propertyType)}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ flexShrink: 0 }}
            />
          </div>

          <div className="mb-2 flex items-center gap-1 text-gray-500">
            <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {property.area}, {property.city}
            </Typography>
          </div>

          <Typography variant="h6" sx={{ fontWeight: 700, color: '#4f46e5' }}>
            {formatCurrency(property.rent)}
            <Typography component="span" variant="body2" color="text.secondary">
              {' '}
              / month
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PropertyCard
