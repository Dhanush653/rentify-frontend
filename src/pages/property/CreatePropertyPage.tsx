import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { propertyApi } from '@/api/propertyApi'
import PageContainer from '@/components/common/PageContainer'
import PageHeader from '@/components/common/PageHeader'
import Seo from '@/components/common/Seo'
import PropertyForm from '@/components/property/PropertyForm'
import { ROUTES } from '@/utils/constants'
import { buildPath } from '@/utils/helpers'
import { openRazorpayCheckout, PaymentError } from '@/utils/razorpay'
import type { ApiError } from '@/types/api'
import type { CreatePropertyFormValues } from '@/types/property'

const CreatePropertyPage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (
    values: CreatePropertyFormValues,
    files: File[],
    amount: number,
  ) => {
    setIsSubmitting(true)

    // 1) Collect payment first (Razorpay TEST checkout).
    try {
      await openRazorpayCheckout({
        amount,
        description: `Rentify listing — ${values.title || 'New property'}`,
      })
    } catch (error) {
      const message = error instanceof PaymentError ? error.message : 'Payment failed'
      toast.error(message)
      setIsSubmitting(false)
      return
    }

    // 2) Payment succeeded → create the property.
    try {
      toast.success('Payment successful')
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
    <PageContainer width="narrow" className="flex flex-col gap-6">
      <Seo
        title="Post Your Property | Rentify"
        description="List your house or shop for rent on Rentify in a few simple steps."
      />
      <PageHeader
        title="Post a property"
        subtitle="Fill in the details below to list your property for rent."
      />

      <PropertyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </PageContainer>
  )
}

export default CreatePropertyPage
