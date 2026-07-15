import { useState, type ReactNode } from 'react'
import {
  Controller,
  useForm,
  useWatch,
  type Control,
  type FieldPath,
} from 'react-hook-form'
import {
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import {
  FURNISHING_TYPES,
  PREFERRED_TENANTS,
  PROPERTY_TYPES,
  WATER_SUPPLY_TYPES,
} from '@/utils/constants'
import { humanizeEnum } from '@/utils/helpers'
import ImageUploader from '@/components/property/ImageUploader'
import LocationPicker from '@/components/property/LocationPicker'
import type { CreatePropertyFormValues, PropertyFeatures } from '@/types/property'

type FormValues = CreatePropertyFormValues

const DEFAULTS: FormValues = {
  title: '',
  description: '',
  rent: 0,
  deposit: 0,
  city: '',
  area: '',
  propertyType: '',
  latitude: 0,
  longitude: 0,
  features: {
    bedrooms: 1,
    bathrooms: 1,
    balconies: 0,
    builtUpArea: 0,
    floorNumber: 0,
    totalFloors: 0,
    carParking: false,
    bikeParking: false,
    furnishingType: 'UNFURNISHED',
    preferredTenant: 'ANY',
    waterSupply: 'CORPORATION',
    propertyAge: 0,
    lift: false,
    powerBackup: false,
    wifi: false,
    airConditioner: false,
    security: false,
    cctv: false,
    petFriendly: false,
  },
}

const BASIC_NUMBER_FIELDS = [
  { name: 'features.bedrooms', label: 'Bedrooms' },
  { name: 'features.bathrooms', label: 'Bathrooms' },
  { name: 'features.balconies', label: 'Balconies' },
  { name: 'features.builtUpArea', label: 'Built Up Area (sq.ft)' },
  { name: 'features.propertyAge', label: 'Property Age (years)' },
] as const

const BUILDING_NUMBER_FIELDS = [
  { name: 'features.floorNumber', label: 'Floor Number' },
  { name: 'features.totalFloors', label: 'Total Floors' },
] as const

const AMENITY_SWITCHES = [
  { name: 'features.lift', label: 'Lift' },
  { name: 'features.powerBackup', label: 'Power Backup' },
  { name: 'features.wifi', label: 'WiFi' },
  { name: 'features.airConditioner', label: 'Air Conditioner' },
  { name: 'features.security', label: 'Security' },
  { name: 'features.cctv', label: 'CCTV' },
  { name: 'features.petFriendly', label: 'Pet Friendly' },
] as const

/** A titled card wrapping one logical group of fields. */
const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) => (
  <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3, border: '1px solid #e5e7eb' }}>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {subtitle}
      </Typography>
    )}
    <div className={subtitle ? '' : 'mt-4'}>{children}</div>
  </Paper>
)

const GroupLabel = ({ children }: { children: ReactNode }) => (
  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1.5 }}>
    {children}
  </Typography>
)

/** Controller-backed MUI dropdown; options map to backend enum values. */
const EnumSelect = ({
  control,
  name,
  label,
  options,
  error,
  placeholder,
}: {
  control: Control<FormValues>
  name: FieldPath<FormValues>
  label: string
  options: readonly string[]
  error?: string
  placeholder?: string
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <TextField
        select
        label={label}
        fullWidth
        size="small"
        name={field.name}
        value={(field.value ?? '') as string}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
        error={Boolean(error)}
        helperText={error}
      >
        {placeholder !== undefined && <MenuItem value="">{placeholder}</MenuItem>}
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {humanizeEnum(option)}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
)

/** Controller-backed MUI switch for boolean feature flags. */
const SwitchField = ({
  control,
  name,
  label,
}: {
  control: Control<FormValues>
  name: FieldPath<FormValues>
  label: string
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormControlLabel
        control={
          <Switch
            checked={Boolean(field.value)}
            onChange={(event) => field.onChange(event.target.checked)}
          />
        }
        label={label}
      />
    )}
  />
)

export interface PropertyFormProps {
  defaultValues?: Partial<CreatePropertyFormValues>
  onSubmit: (values: CreatePropertyFormValues, files: File[]) => void | Promise<void>
  isSubmitting?: boolean
  submitLabel?: string
}

/** Shared by CreatePropertyPage and EditPropertyPage. */
const PropertyForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Post Property',
}: PropertyFormProps) => {
  const [files, setFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { ...DEFAULTS, ...defaultValues },
  })

  const latitude = useWatch({ control, name: 'latitude' })
  const longitude = useWatch({ control, name: 'longitude' })
  const coords = latitude && longitude ? { lat: latitude, lng: longitude } : null

  const featureError = (name: string): string | undefined => {
    const key = name.split('.')[1] as keyof PropertyFeatures
    return errors.features?.[key]?.message
  }

  const submit = handleSubmit((values) => onSubmit(values, files))

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <Section title="Basic Information" subtitle="Tell renters what you're offering.">
        <div className="flex flex-col gap-4">
          <TextField
            {...register('title')}
            label="Title"
            fullWidth
            size="small"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
          <TextField
            {...register('description')}
            label="Description"
            fullWidth
            multiline
            minRows={4}
            size="small"
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
          <EnumSelect
            control={control}
            name="propertyType"
            label="Property Type"
            options={PROPERTY_TYPES}
            placeholder="Select type"
            error={errors.propertyType?.message}
          />
        </div>
      </Section>

      <Section title="Pricing" subtitle="Monthly rent and one-time deposit.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            {...register('rent', { valueAsNumber: true })}
            label="Rent (₹ / month)"
            type="number"
            fullWidth
            size="small"
            error={Boolean(errors.rent)}
            helperText={errors.rent?.message}
          />
          <TextField
            {...register('deposit', { valueAsNumber: true })}
            label="Deposit (₹)"
            type="number"
            fullWidth
            size="small"
            error={Boolean(errors.deposit)}
            helperText={errors.deposit?.message}
          />
        </div>
      </Section>

      <Section title="Location" subtitle="Search or click the map to drop a pin.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            {...register('city')}
            label="City"
            fullWidth
            size="small"
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
          />
          <TextField
            {...register('area')}
            label="Area"
            fullWidth
            size="small"
            error={Boolean(errors.area)}
            helperText={errors.area?.message}
          />
        </div>
        <div className="mt-4">
          <LocationPicker
            value={coords}
            onChange={({ lat, lng }) => {
              setValue('latitude', lat, { shouldValidate: true })
              setValue('longitude', lng, { shouldValidate: true })
            }}
            error={(errors.latitude?.message ?? errors.longitude?.message) as string | undefined}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            label="Latitude"
            value={latitude || ''}
            fullWidth
            size="small"
            slotProps={{ input: { readOnly: true } }}
            error={Boolean(errors.latitude)}
            helperText={errors.latitude?.message}
          />
          <TextField
            label="Longitude"
            value={longitude || ''}
            fullWidth
            size="small"
            slotProps={{ input: { readOnly: true } }}
            error={Boolean(errors.longitude)}
            helperText={errors.longitude?.message}
          />
        </div>
      </Section>

      <Section title="Property Features">
        <div className="flex flex-col gap-6">
          <div>
            <GroupLabel>Basic</GroupLabel>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BASIC_NUMBER_FIELDS.map((field) => (
                <TextField
                  key={field.name}
                  {...register(field.name, { valueAsNumber: true })}
                  label={field.label}
                  type="number"
                  fullWidth
                  size="small"
                  error={Boolean(featureError(field.name))}
                  helperText={featureError(field.name)}
                />
              ))}
            </div>
          </div>

          <div>
            <GroupLabel>Building</GroupLabel>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {BUILDING_NUMBER_FIELDS.map((field) => (
                <TextField
                  key={field.name}
                  {...register(field.name, { valueAsNumber: true })}
                  label={field.label}
                  type="number"
                  fullWidth
                  size="small"
                  error={Boolean(featureError(field.name))}
                  helperText={featureError(field.name)}
                />
              ))}
            </div>
          </div>

          <div>
            <GroupLabel>Parking</GroupLabel>
            <div className="flex flex-wrap gap-x-8">
              <SwitchField control={control} name="features.carParking" label="Car Parking" />
              <SwitchField control={control} name="features.bikeParking" label="Bike Parking" />
            </div>
          </div>

          <div>
            <GroupLabel>Configuration</GroupLabel>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <EnumSelect
                control={control}
                name="features.furnishingType"
                label="Furnishing Type"
                options={FURNISHING_TYPES}
                error={featureError('features.furnishingType')}
              />
              <EnumSelect
                control={control}
                name="features.preferredTenant"
                label="Preferred Tenant"
                options={PREFERRED_TENANTS}
                error={featureError('features.preferredTenant')}
              />
              <EnumSelect
                control={control}
                name="features.waterSupply"
                label="Water Supply"
                options={WATER_SUPPLY_TYPES}
                error={featureError('features.waterSupply')}
              />
            </div>
          </div>

          <div>
            <GroupLabel>Amenities</GroupLabel>
            <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-4">
              {AMENITY_SWITCHES.map((amenity) => (
                <SwitchField
                  key={amenity.name}
                  control={control}
                  name={amenity.name}
                  label={amenity.label}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Images" subtitle="Upload one or more photos of the property.">
        <ImageUploader files={files} onChange={setFiles} />
      </Section>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{ textTransform: 'none', px: 4, py: 1.25 }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default PropertyForm
