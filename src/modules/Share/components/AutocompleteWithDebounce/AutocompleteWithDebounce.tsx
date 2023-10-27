/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material'
import { debounce } from 'lodash'

interface OptionType {
  id: string
  name: string
}

interface Props<T> {
  id: string
  label: string
  options: T[]
  value: string
  setTextSearch: React.Dispatch<React.SetStateAction<string>>
  onChange: (...event: any[]) => void
  onChangeId?: (id: string) => void
}

function AutocompleteWithDebounce<T extends OptionType>({
  id,
  options,
  value,
  setTextSearch,
  onChange,
  label,
  onChangeId
}: Props<T>) {
  const handleDebouncedSearch = debounce((value: string) => {
    setTextSearch(value)
  }, 1000)

  const handleInputChange = (_: any, newValue: string) => {
    handleDebouncedSearch(newValue)
  }

  return (
    <Autocomplete
      disablePortal
      id={id}
      options={options ? options : []}
      value={(options && options.find((option) => option.id === value)) || null}
      getOptionLabel={(option) => option.name}
      noOptionsText='Không có lựa chọn'
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_, option) => {
        onChange(option ? option.id : '')
        onChangeId && onChangeId(option?.id as string)
      }}
      onInputChange={handleInputChange}
      className='bg-white'
    />
  )
}

export default AutocompleteWithDebounce
