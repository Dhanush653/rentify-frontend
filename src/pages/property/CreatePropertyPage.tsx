import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { propertyApi } from '@/api/propertyApi'
import PropertyForm from '@/components/property/PropertyForm'
import { ROUTES } from '@/utils/constants'
import { buildPath } from '@/utils/helpers'
import type { ApiError } from '@/types/api'
import type { CreatePropertyFormValues } from '@/types/property'

const CreatePropertyPage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: CreatePropertyFormValues, files: File[]) => {
    setIsSubmitting(true)

    try {
      const id = await propertyApi.createProperty(values, files)
      toast.success('Property posted successfully')
      navigate(buildPath(ROUTES.PROPERTY_DETAILS, { id }))
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as ApiError | undefined)?.message ??
            'Unable to post the property. Please try again.'
          : 'Something went wrong. Please try again.'

      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Post a property</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the details below to list your property for rent.
        </p>
      </div>

      <PropertyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </section>
  )
}

export default CreatePropertyPage
