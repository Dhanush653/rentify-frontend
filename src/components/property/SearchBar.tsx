import { useState } from 'react'
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Slider,
  TextField,
  Typography,
} from '@mui/material'
import { Search, X } from 'lucide-react'
import { PROPERTY_TYPES, RENT_RANGE } from '@/utils/constants'
import { formatCurrency, humanizeEnum } from '@/utils/helpers'
import type { PropertySearchRequest, PropertyType } from '@/types/property'

export interface SearchBarProps {
  onSearch: (filters: PropertySearchRequest) => void
  loading?: boolean
}

interface SearchFormState {
  city: string
  area: string
  propertyType: PropertyType | ''
}

const EMPTY_FORM: SearchFormState = { city: '', area: '', propertyType: '' }
const DEFAULT_RENT: [number, number] = [RENT_RANGE.MIN, RENT_RANGE.MAX]

const SearchBar = ({ onSearch, loading = false }: SearchBarProps) => {
  const [form, setForm] = useState<SearchFormState>(EMPTY_FORM)
  const [rent, setRent] = useState<[number, number]>(DEFAULT_RENT)

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
    // Only send bounds that differ from the defaults.
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
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, border: '1px solid #e5e7eb' }}
    >
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          alignItems: 'center',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        }}
      >
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
            <em>Any</em>
          </MenuItem>
          {PROPERTY_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {humanizeEnum(type)}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ px: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Rent: {formatCurrency(rent[0])} – {formatCurrency(rent[1])}
          </Typography>
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
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1 }}>
        <Button
          type="button"
          onClick={handleClear}
          disabled={loading}
          startIcon={<X size={16} />}
          sx={{ textTransform: 'none' }}
        >
          Clear
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={<Search size={16} />}
          sx={{ textTransform: 'none' }}
        >
          Search
        </Button>
      </Box>
    </Paper>
  )
}

export default SearchBar
