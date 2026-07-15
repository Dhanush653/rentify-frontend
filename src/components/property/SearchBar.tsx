import { useState } from 'react'
import { Button, MenuItem, Slider, TextField } from '@mui/material'
import { Search, X } from 'lucide-react'
import { PROPERTY_TYPES, RENT_RANGE } from '@/utils/constants'
import { formatCurrency, humanizeEnum } from '@/utils/helpers'
import type { PropertySearchRequest, PropertyType } from '@/types/property'

export interface SearchBarProps {
  onSearch: (filters: PropertySearchRequest) => void
  loading?: boolean
  /** Seed the visible filters (e.g. restored when navigating back). */
  initialFilters?: PropertySearchRequest
}

interface SearchFormState {
  city: string
  area: string
  propertyType: PropertyType | ''
}

const EMPTY_FORM: SearchFormState = { city: '', area: '', propertyType: '' }
const DEFAULT_RENT: [number, number] = [RENT_RANGE.MIN, RENT_RANGE.MAX]

const SearchBar = ({ onSearch, loading = false, initialFilters }: SearchBarProps) => {
  const [form, setForm] = useState<SearchFormState>(() => ({
    city: initialFilters?.city ?? '',
    area: initialFilters?.area ?? '',
    propertyType: initialFilters?.propertyType ?? '',
  }))
  const [rent, setRent] = useState<[number, number]>(() => [
    initialFilters?.minRent ?? RENT_RANGE.MIN,
    initialFilters?.maxRent ?? RENT_RANGE.MAX,
  ])

  const handleChange =
    (field: keyof SearchFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const buildFilters = (
    state: SearchFormState,
    [minRent, maxRent]: [number, number],
  ): PropertySearchRequest => ({
    city: state.city.trim(),
    area: state.area.trim(),
    propertyType: state.propertyType,
    minRent: minRent > RENT_RANGE.MIN ? minRent : undefined,
    maxRent: maxRent < RENT_RANGE.MAX ? maxRent : undefined,
  })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSearch(buildFilters(form, rent))
  }

  const handleClear = () => {
    setForm(EMPTY_FORM)
    setRent(DEFAULT_RENT)
    onSearch({})
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextField
          label="City"
          value={form.city}
          onChange={handleChange('city')}
          size="small"
          fullWidth
        />
        <TextField
          label="Area"
          value={form.area}
          onChange={handleChange('area')}
          size="small"
          fullWidth
        />
        <TextField
          label="Property Type"
          value={form.propertyType}
          onChange={handleChange('propertyType')}
          select
          size="small"
          fullWidth
        >
          <MenuItem value="">
            <em>Any type</em>
          </MenuItem>
          {PROPERTY_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {humanizeEnum(type)}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="mt-5 flex flex-col gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Monthly rent</span>
            <span className="text-slate-900">
              {formatCurrency(rent[0])} – {formatCurrency(rent[1])}
            </span>
          </div>
          <Slider
            value={rent}
            onChange={(_event, value) => setRent(value as [number, number])}
            min={RENT_RANGE.MIN}
            max={RENT_RANGE.MAX}
            step={RENT_RANGE.STEP}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatCurrency(value)}
            disableSwap
            size="small"
          />
        </div>

        <div className="flex shrink-0 gap-3">
          <Button type="button" onClick={handleClear} disabled={loading} startIcon={<X size={16} />}>
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<Search size={16} />}
            sx={{ px: 3 }}
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
