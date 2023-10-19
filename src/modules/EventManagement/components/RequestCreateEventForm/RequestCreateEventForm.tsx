/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Autocomplete, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormRequestEventType } from '../../utils'
import { eventType } from '../../constants'
import Button from 'src/modules/Share/components/Button'
import { ActivitiesListType, ActivityType, EventCategoriesListType } from '../../interfaces'
import { GetAllActivitiesByCategoryIdQuery } from '../../services'

interface Props {
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  handleResetForm: () => void
  eventCategories: EventCategoriesListType
}

const RequestCreateEventForm = ({ register, control, errors, eventCategories, handleResetForm }: Props) => {
  const activityEvents: ActivityType[] = []

  eventCategories?.data.map((item) => {
    const getAllActivityEventsQuery = new GetAllActivitiesByCategoryIdQuery(item.id)
    const activityList = getAllActivityEventsQuery.fetch() as ActivitiesListType
    activityList?.data.map((activity) => {
      activityEvents.push(activity)
    })
  })

  return (
    <div>
      <div className='flex flex-col gap-y-2'>
        <h2 className='text-[17px] col-span-4 mb-2'>Thông tin chi tiết</h2>
        <div className='grid grid-cols-12 gap-x-6 gap-y-4'>
          <Controller
            name='startAt'
            control={control}
            render={({ field: { onChange, value = null } }) => (
              <div className='col-span-6 mt-[-8px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimeField']}>
                    <DateTimePicker
                      label='Thời gian bắt đầu'
                      format='DD/MM/YYYY HH:mm'
                      onChange={onChange}
                      value={value}
                      className='bg-white'
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.startAt?.message as string}
                </span>
              </div>
            )}
          />
          <Controller
            name='endAt'
            control={control}
            render={({ field: { onChange, value = null } }) => (
              <div className='col-span-6 mt-[-8px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimeField']}>
                    <DateTimePicker
                      label='Thời gian kết thúc'
                      format='DD/MM/YYYY HH:mm'
                      onChange={onChange}
                      value={value}
                      className='bg-white'
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium '>
                  {errors.endAt?.message as string}
                </span>
              </div>
            )}
          />
          <Controller
            name='eventType'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <Autocomplete
                    disablePortal
                    id='eventType'
                    options={eventType}
                    value={eventType.find((option) => option.name === value) || null}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label='Chọn loại sự kiện' />}
                    onChange={(_, option) => onChange(option?.name)}
                    className='bg-white'
                  />
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='activityId'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <Autocomplete
                    disablePortal
                    id='education_program'
                    options={activityEvents ? activityEvents : []}
                    value={(activityEvents && activityEvents.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Hoạt động sự kiện' />}
                    onChange={(_, option) => onChange(option?.id)}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.activityId?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <div className='col-span-4'>
            <TextField
              id='address'
              {...register('capacity')}
              label='Số lượng'
              placeholder='Nhập số lượng tham gia'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.capacity?.message}</span>
          </div>
          <div className='col-span-12 '>
            <TextField
              id='address'
              {...register('address.fullAddress')}
              label='Địa điểm'
              placeholder='Nhập địa điểm'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.address?.fullAddress?.message}
            </span>
          </div>
          <div className='col-span-6'>
            <TextField
              label='Latitude'
              placeholder='x:'
              id='address_latitude'
              {...register('address.latitude')}
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.address?.latitude?.message}
            </span>
          </div>
          <div className='col-span-6'>
            <TextField
              label='Longtitude'
              placeholder='y:'
              id='address_longitude'
              {...register('address.longitude')}
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.address?.longitude?.message}
            </span>
          </div>

          <div className='col-span-12'>
            <TextField
              id='description'
              {...register('description')}
              label='Mô tả chi tiết'
              placeholder='Nhập mô tả chi tiết cho sự kiện'
              multiline
              rows={8}
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.description?.message}
            </span>
          </div>
          <div className='col-span-12 flex justify-end gap-x-6'>
            <Button
              type='button'
              classNameButton='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold'
              onClick={handleResetForm}
            >
              Làm mới
            </Button>
            <Button
              type='submit'
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
              isLoading={false}
            >
              Tạo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestCreateEventForm
