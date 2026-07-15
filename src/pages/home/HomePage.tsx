import { useCallback, useEffect, useState } from 'react'
import { Alert, Button } from '@mui/material'
import { propertyApi } from '@/api/propertyApi'
import EmptyState from '@/components/common/EmptyState'
import Loader from '@/components/common/Loader'
import PropertyGrid from '@/components/property/PropertyGrid'
import SearchBar from '@/components/property/SearchBar'
import type { PropertyListItem, PropertySearchRequest } from '@/types/property'

const HomePage = () => {
  const [properties, setProperties] = useState<PropertyListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PropertySearchRequest>({})

  const fetchProperties = useCallback(async (search: PropertySearchRequest) => {
    setLoading(true)
    setError(null)

    try {
      const data = await propertyApi.getAllProperties(search)
      setProperties(data)
    } catch {
      setError('Unable to load properties. Please try again.')
      setProperties([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Data-fetching effect: re-runs whenever the search filters change.
  // The synchronous setLoading(true) inside is intentional (show the loader at once).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProperties(filters)
  }, [filters, fetchProperties])

  const renderResults = () => {
    if (loading) {
      return <Loader label="Loading properties..." />
    }

    if (error) {
      return (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => fetchProperties(filters)}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )
    }

    if (properties.length === 0) {
      return (
        <EmptyState
          title="No properties found"
          description="Try adjusting your search filters to see more results."
        />
      )
    }

    return <PropertyGrid properties={properties} />
  }

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Find your next home
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse rental properties across the city.
        </p>
      </div>

      <SearchBar onSearch={setFilters} loading={loading} />

      {renderResults()}
    </section>
  )
}

export default HomePage
