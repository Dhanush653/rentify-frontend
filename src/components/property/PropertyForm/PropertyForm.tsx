import type { PropertyFormValues } from '@/types'

export interface PropertyFormProps {
  defaultValues?: Partial<PropertyFormValues>
  onSubmit: (values: PropertyFormValues) => void
  isSubmitting?: boolean
}

/** Shared by CreatePropertyPage and EditPropertyPage. */
const PropertyForm = (_props: PropertyFormProps) => (
  <form className="flex flex-col gap-4">
    {/* TODO: wire up react-hook-form + zodResolver and render the fields. */}
    <p className="text-sm text-gray-500">PropertyForm</p>
  </form>
)

export default PropertyForm
