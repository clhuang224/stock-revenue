'use client'

import { Autocomplete, Skeleton, TextField } from '@mui/material'
import type { StockOption } from '../../interfaces/StockOption'

type StockAutocompleteProps = {
  options: StockOption[]
  value: StockOption | null
  loading?: boolean
  onChange: (stockId: string) => void
}

export default function StockAutocomplete({
  options,
  value,
  loading = false,
  onChange,
}: StockAutocompleteProps) {
  if (loading) {
    return (
      <Skeleton
        variant="rounded"
        height={40}
        sx={{
          width: 390,
          maxWidth: '100%',
          mx: 'auto',
        }}
      />
    )
  }

  return (
    <Autocomplete
      size="small"
      options={options}
      value={value}
      getOptionKey={(option) => option.stockId}
      getOptionLabel={(option) => `${option.stockId} ${option.stockName}`}
      isOptionEqualToValue={(option, selectedOption) =>
        option.stockId === selectedOption.stockId
      }
      onChange={(_, option) => {
        if (option) {
          onChange(option.stockId)
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="輸入台股代號或名稱，查看公司價值"
        />
      )}
      sx={{
        width: 390,
        mx: 'auto',
      }}
    />
  )
}
