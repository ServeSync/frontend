import { Controller, Control } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { FormEventType } from '../../utils'
import { EventOrganizationType } from '../../interfaces'
import Button from 'src/modules/Share/components/Button'
import path from 'src/modules/Share/constants/path'

interface Props {
  control: Control<FormEventType>
  representatives: EventOrganizationType[]
  eventOrganizations: EventOrganizationType[]
  handleAddEventOrganization: () => void
  errors: string
  isLoading: boolean
}

const CreateEventOrganizationForm = ({
  control,
  representatives,
  eventOrganizations,
  handleAddEventOrganization,
  errors,
  isLoading
}: Props) => {
  return (
    <div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-4'>
          <h2 className='text-[16px]'>Thêm nhà tổ chức</h2>
        </div>
        <div className='grid grid-cols-12 gap-x-6 mb-2'>
          <Controller
            name={'organizations.organizationId'}
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-5'>
                  <Autocomplete
                    disablePortal
                    id='event_organization'
                    options={eventOrganizations ? eventOrganizations : []}
                    value={(eventOrganizations && eventOrganizations.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label='Chọn tổ chức' />}
                    onChange={(_, option) => onChange(option ? option.id : '')}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name={'organizations.role'}
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <div className='col-span-5'>
                <TextField
                  id='role'
                  label='Vai trò'
                  placeholder='Nhập vai trò'
                  className='w-full bg-white'
                  onChange={onChange}
                  value={value}
                />
              </div>
            )}
          />
          <div className='col-span-2 flex justify-end'>
            <Button
              type='button'
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[48px] mt-[4px]'
              onClick={handleAddEventOrganization}
            >
              Thêm tổ chức
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-4'>
          <h2 className='text-[16px]'>Đơn vị đại diện</h2>
        </div>
        <Controller
          name={'representativeOrganizationId'}
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-'>
                <Autocomplete
                  disablePortal
                  id='representative_organization'
                  options={representatives ? representatives : []}
                  value={
                    (representatives && representatives.find((option) => (option?.id as string) === value)) || null
                  }
                  getOptionLabel={(option) => option.name}
                  noOptionsText='Không có lựa chọn'
                  renderInput={(params) => <TextField {...params} label='Chọn tổ chức' />}
                  onChange={(_, option) => {
                    onChange(option ? option.id : '')
                  }}
                  className='bg-white'
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
      </div>
      <div className='flex justify-end gap-x-6 mt-[160px]'>
        <Link
          to={path.event}
          className='flex justify-center items-center bg-[#195E8E] w-[80px] h-[50px] text-white p-2 rounded-full font-semibold hover:bg-[#dd5353] transition-all'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3' />
          </svg>
        </Link>
        <Button
          type='submit'
          isLoading={isLoading}
          classNameButton='bg-[#26C6DA] py-2 px-4 rounded-full text-[14px] text-white font-semibold h-[50px] w-[140px]'
        >
          Tạo sự kiện
        </Button>
      </div>
    </div>
  )
}

export default CreateEventOrganizationForm
