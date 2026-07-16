import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import { HousePlus, Plus } from 'lucide-react'
import { propertyApi } from '@/api/propertyApi'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import EmptyState from '@/components/common/EmptyState'
import ErrorState from '@/components/common/ErrorState'
import Seo from '@/components/common/Seo'
import MyPropertyCard from '@/components/property/MyPropertyCard'
import PropertyGridSkeleton from '@/components/skeletons/PropertyGridSkeleton'
import { ROUTES } from '@/utils/constants'
import type { MyPropertyListItem } from '@/types/property'

const MyPropertiesPage = () => {
  const navigate = useNavigate()

  const [properties, setProperties] = useState<MyPropertyListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /** Listing awaiting delete confirmation; null keeps the dialog closed. */
  const [pendingDelete, setPendingDelete] = useState<MyPropertyListItem | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchMyProperties = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await propertyApi.getMyProperties()
      setProperties(data)
    } catch {
      setError('Unable to load your properties. Please try again.')
      setProperties([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyProperties()
  }, [fetchMyProperties])

  const countLabel = useMemo(
    () =>
      `${properties.length} ${properties.length === 1 ? 'property' : 'properties'} listed`,
    [properties.length],
  )

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return

    setDeleting(true)
    try {
      await propertyApi.deleteProperty(pendingDelete.id)
      // Drop the deleted listing locally — no refetch needed.
      setProperties((prev) => prev.filter((property) => property.id !== pendingDelete.id))
      toast.success('Property deleted')
      setPendingDelete(null)
    } catch {
      toast.error('Failed to delete the property. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  const renderContent = () => {
    if (loading) return <PropertyGridSkeleton count={6} />

    if (error) return <ErrorState message={error} onRetry={fetchMyProperties} />

    if (properties.length === 0) {
      return (
        <EmptyState
          icon={<HousePlus className="h-7 w-7" aria-hidden="true" />}
          title="You haven't posted any properties yet."
          description="Publish your first listing and start reaching tenants in minutes."
          action={
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => navigate(ROUTES.CREATE_PROPERTY)}
              sx={{ mt: 1 }}
            >
              Post Your First Property
            </Button>
          }
        />
      )
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <MyPropertyCard key={property.id} property={property} onDelete={setPendingDelete} />
        ))}
      </div>
    )
  }

  return (
    <>
      <Seo
        title="My Properties | Rentify"
        description="Manage the rental properties you have listed on Rentify."
      />

      <section className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">My Properties</h1>
          {!loading && !error && properties.length > 0 && (
            <p className="mt-1 text-sm text-slate-500">{countLabel}</p>
          )}
        </div>

        {renderContent()}
      </section>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this property?"
        message={
          pendingDelete
            ? `"${pendingDelete.title}" will be permanently removed. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setPendingDelete(null)}
      />
    </>
  )
}

export default MyPropertiesPage
