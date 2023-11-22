import { Controller, Control, FieldErrors } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import { FormEventType } from '../../../utils'
import Button from 'src/modules/Share/components/Button'
import { EventOrganizationType } from 'src/modules/EventOrganizationManagement/interfaces'
import { StatusIsDisable } from 'src/modules/EventManagement/constants'
import { EventDetailType } from 'src/modules/EventManagement/interfaces'

interface Props {
  control: Control<FormEventType>
  representatives: EventOrganizationType[]
  eventOrganizations: EventOrganizationType[]
  handleAddEventOrganization: () => void
  errorsLocal: string
  errors: FieldErrors<FormEventType>
  event?: EventDetailType
}

const CreateEventOrganizationForm = ({
  control,
  representatives,
  eventOrganizations,
  handleAddEventOrganization,
  errorsLocal,
  errors,
  event
}: Props) => {
  return (
    (!(event && StatusIsDisable(event.status)) || event === undefined) && (
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
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errorsLocal}</span>
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                      {errors && errors.organizations?.organizationReps?.message}
                    </span>
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
                classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[48px]'
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
                      representatives && representatives.find((option) => (option?.organizationId as string) === value)
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
      </div>
    )
  )
}

export default CreateEventOrganizationForm
