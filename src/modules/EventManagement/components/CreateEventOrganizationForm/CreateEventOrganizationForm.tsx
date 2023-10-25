import { Controller, Control, UseFormGetValues } from 'react-hook-form'
import { FormEventType } from '../../utils'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import Button from 'src/modules/Share/components/Button'
import { EventOrganizationType } from '../../interfaces'
import path from 'src/modules/Share/constants/path'
import { Link } from 'react-router-dom'
import { useState } from 'react'

interface Props {
  control: Control<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  eventOrganizations: EventOrganizationType[]
  handleChangeEventOrganization: (id: string) => void
  handleAddEventOrganization: () => void
  errors: string
}

const CreateEventOrganizationForm = ({
  control,
  getValues,
  eventOrganizations,
  handleChangeEventOrganization,
  handleAddEventOrganization,
  errors
}: Props) => {
  const [representative, setRepresentative] = useState<EventOrganizationType[]>([])

  const onAddEventOrganization = () => {
    const id = getValues('organizations.organizationId')
    setRepresentative([...representative, eventOrganizations.find((item) => item.id === id) as EventOrganizationType])
    handleAddEventOrganization()
  }

  return (
    <div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-2'>
          <h2 className='text-[16px]'>Thêm nhà tổ chức</h2>
        </div>
        <div className='grid grid-cols-10 gap-x-6'>
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
                      handleChangeEventOrganization(option?.id as string)
                    }}
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
              <div className='col-span-4'>
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
          <div className='col-span-2 flex items-center justify-end'>
            <Button
              type='button'
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold '
              onClick={onAddEventOrganization}
            >
              Thêm tổ chức
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-2'>
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
                  options={representative ? representative : []}
                  value={(representative && representative.find((option) => (option?.id as string) === value)) || null}
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
          type='button'
          className='bg-[#a7a7a7] py-2 px-4 rounded-lg text-[14px] text-white font-semibold'
        >
          Trở lại
        </Link>
        <Button type='submit' classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold'>
          Tạo sự kiện
        </Button>
      </div>
    </div>
  )
}

export default CreateEventOrganizationForm
