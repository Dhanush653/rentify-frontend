import { useCallback, useEffect, useState } from 'react'
import { propertyApi } from '@/api/propertyApi'
import EmptyState from '@/components/common/EmptyState'
import ErrorState from '@/components/common/ErrorState'
import Seo from '@/components/common/Seo'
import PropertyGrid from '@/components/property/PropertyGrid'
import PropertyGridSkeleton from '@/components/skeletons/PropertyGridSkeleton'
import SearchBar from '@/components/property/SearchBar'
import type { PropertyListItem, PropertySearchRequest } from '@/types/property'

const FILTERS_KEY = 'rentify.search'

/** Persist the applied filters so they survive back-navigation. */
const loadFilters = (): PropertySearchRequest => {
  try {
    return JSON.parse(sessionStorage.getItem(FILTERS_KEY) ?? '{}') as PropertySearchRequest
  } catch {
    return {}
  }
}

const HomePage = () => {
  const [properties, setProperties] = useState<PropertyListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<PropertySearchRequest>(loadFilters)

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProperties(filters)
  }, [filters, fetchProperties])

  const handleSearch = useCallback((next: PropertySearchRequest) => {
    sessionStorage.setItem(FILTERS_KEY, JSON.stringify(next))
    setFilters(next)
  }, [])

  const renderResults = () => {
    if (loading) return <PropertyGridSkeleton />

    if (error) return <ErrorState message={error} onRetry={() => fetchProperties(filters)} />

    if (properties.length === 0) {
      return (
        <EmptyState
          title="No properties found"
          description="Try adjusting your filters to see more results."
        />
      )
    }

    return <PropertyGrid properties={properties} />
  }

  return (
    <>
      <Seo
        title="Rentify | Find Rental Houses and Shops"
        description="Browse verified rental homes and shops across the city. Search by location, type and budget on Rentify."
      />

      <div className="flex flex-col gap-6">
        <SearchBar onSearch={handleSearch} loading={loading} initialFilters={filters} />

        {!loading && !error && properties.length > 0 && (
          <p className="text-sm text-slate-500">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
          </p>
        )}

        {renderResults()}
      </div>
    </>
  )
}

export default HomePage
