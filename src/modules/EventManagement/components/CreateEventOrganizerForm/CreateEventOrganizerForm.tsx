import { Controller, FieldErrors, Control, UseFormGetValues } from 'react-hook-form'
import { FormEventType } from '../../utils'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import Button from 'src/modules/Share/components/Button'
import { ContactType, EventOrganization, EventOrganizationType } from '../../interfaces'

interface Props {
  errors: FieldErrors<FormEventType>
  control: Control<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  eventOrganizations: EventOrganizationType[]
  contacts: ContactType[]
  handleChangeOrganization: (id: string) => void
  handleDataEventOrganization: (data: EventOrganization) => void
}

const CreateEventOrganizerForm = ({
  errors,
  control,
  getValues,
  eventOrganizations,
  // contacts,
  handleChangeOrganization // handleDataEventOrganization
}: Props) => {
  const handleAddEventOrganization = () => {
    const data = getValues('organizations')
    // handleDataEventOrganization(data)
    console.log(data)
  }

  return (
    <div>
      <div className='col-span-4 flex justify-between items-center mb-2'>
        <h2 className='text-[16px]'>Thêm nhà tổ chức</h2>
      </div>
      <div className='grid grid-cols-9 gap-x-6'>
        <Controller
          name={'organizations.organizationId'}
          control={control}
          defaultValue=''
          render={({ field: { onChange, value } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-4'>
                <Autocomplete
                  disablePortal
                  id='event_organization'
                  options={eventOrganizations && eventOrganizations}
                  value={(eventOrganizations && eventOrganizations.find((option) => option.id === value)) || null}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} label='Chọn tổ chức' />}
                  onChange={(_, option) => {
                    onChange(option ? option.id : '')
                    handleChangeOrganization(option?.id as string)
                  }}
                  className='bg-white'
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.organizations?.organizationId?.message}
                </span>
              </div>
            </LocalizationProvider>
          )}
        />
        <Controller
          name={'organizations.role'}
          control={control}
          render={({ field: { onChange } }) => (
            <div className='col-span-4'>
              <TextField id='role' label='Vai trò' placeholder='Nhập vai trò' className='w-full' onChange={onChange} />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.organizations?.role?.message}
              </span>
            </div>
          )}
        />
        <Button
          type='button'
          classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[36px] w-[36px] rounded-lg'
          onClick={handleAddEventOrganization}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
          </svg>
        </Button>
      </div>
    </div>
  )
}

export default CreateEventOrganizerForm
