/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from 'react-hook-form'
import { FormFilterProofType } from '../../utils'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import { proofStatus, proofType } from '../../constants'
import Button from 'src/modules/Share/components/Button'

interface Props {
  control: Control<FormFilterProofType>
  onResetForm: () => void
}

const FilterProof = ({ control, onResetForm }: Props) => {
  return (
    <div className='w-[360px] px-6 py-8 shadow-md text-gray-600'>
      <div className='flex items-center justify-center mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-6 h-6 text-[#26C6DA] mr-2'
        >
          <path
            fillRule='evenodd'
            d='M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z'
            clipRule='evenodd'
          />
        </svg>
        <span className='text-[18px] font-semibold'>Bộ lọc</span>
      </div>
      <div className='flex flex-col gap-y-6'>
        <Controller
          name='status'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value = null } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Autocomplete
                disablePortal
                id='eventStatus'
                options={proofStatus}
                getOptionLabel={(option) => option.name}
                noOptionsText='Không có lựa chọn'
                value={proofStatus.find((option) => option.id === value) || null}
                renderInput={(params) => <TextField {...params} label='Chọn trạng thái minh chứng' />}
                onChange={(_, option) => onChange(option ? option.id : '')}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name='type'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value = null } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Autocomplete
                disablePortal
                id='eventType'
                options={proofType}
                value={proofType.find((option) => option.id === value) || null}
                getOptionLabel={(option) => option.name}
                noOptionsText='Không có lựa chọn'
                renderInput={(params) => <TextField {...params} label='Chọn loại sự kiện' />}
                onChange={(_, option) => onChange(option ? option.id : '')}
              />
            </LocalizationProvider>
          )}
        />
      </div>
      <div className='flex justify-between mt-6'>
        <Button
          type='button'
          classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#da2626] px-4 py-3 rounded-lg'
          onClick={onResetForm}
        >
          Làm mới
        </Button>
        <Button
          type='submit'
          classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-3 rounded-lg'
        >
          Lưu
        </Button>
      </div>
    </div>
  )
}

export default FilterProof
