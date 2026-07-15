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
  Switch,
  TextField,
} from '@mui/material'
import {
  FURNISHING_TYPES,
  LISTING_PLANS,
  PREFERRED_TENANTS,
  PROPERTY_TYPES,
  WATER_SUPPLY_TYPES,
} from '@/utils/constants'
import { formatCurrency, humanizeEnum, toLocalDateTimeString } from '@/utils/helpers'
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
  expiresAt: '',
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

/** A numbered card wrapping one logical group of fields. */
const Section = ({
  step,
  title,
  subtitle,
  children,
}: {
  step: number
  title: string
  subtitle?: string
  children: ReactNode
}) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
    <div className="flex items-start gap-3">
      <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
        {step}
      </span>
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
      </div>
    </div>
    <div className="mt-5">{children}</div>
  </section>
)

const GroupLabel = ({ children }: { children: ReactNode }) => (
  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{children}</p>
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
  /** `amount` is the chosen listing plan's price (INR), for payment. */
  onSubmit: (values: CreatePropertyFormValues, files: File[], amount: number) => void | Promise<void>
  isSubmitting?: boolean
}

/** Shared by CreatePropertyPage and EditPropertyPage. */
const PropertyForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: PropertyFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [durationDays, setDurationDays] = useState<number>(LISTING_PLANS[0].days)

  const selectedPlan = LISTING_PLANS.find((plan) => plan.days === durationDays) ?? LISTING_PLANS[0]

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

  const submit = handleSubmit((values) => {
    const expires = new Date()
    expires.setDate(expires.getDate() + durationDays)
    onSubmit({ ...values, expiresAt: toLocalDateTimeString(expires) }, files, selectedPlan.price)
  })

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <Section step={1} title="Basic Information" subtitle="Tell renters what you're offering.">
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

      <Section step={2} title="Pricing" subtitle="Monthly rent and one-time deposit.">
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

      <Section step={3} title="Location" subtitle="Search or click the map to drop a pin.">
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

      <Section step={4} title="Property Features">
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

      <Section step={5} title="Images" subtitle="Upload one or more photos of the property.">
        <ImageUploader files={files} onChange={setFiles} />
      </Section>

      <Section
        step={6}
        title="Listing Plan"
        subtitle="Choose how long your listing stays active. Payment is required to publish."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            select
            label="Duration"
            value={durationDays}
            onChange={(event) => setDurationDays(Number(event.target.value))}
            fullWidth
            size="small"
          >
            {LISTING_PLANS.map((plan) => (
              <MenuItem key={plan.days} value={plan.days}>
                {plan.days} days — {formatCurrency(plan.price)}
              </MenuItem>
            ))}
          </TextField>

          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
            <span className="text-sm text-slate-500">Amount payable</span>
            <span className="text-lg font-bold text-slate-900">
              {formatCurrency(selectedPlan.price)}
            </span>
          </div>
        </div>
      </Section>

      <div className="sticky bottom-4 z-10 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <p className="hidden text-sm text-slate-500 sm:block">
          Pay securely to publish your {durationDays}-day listing.
        </p>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{ px: 4, py: 1.25, width: { xs: '100%', sm: 'auto' } }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `Pay ${formatCurrency(selectedPlan.price)} & Publish`
          )}
        </Button>
      </div>
    </form>
  )
}

export default PropertyForm
