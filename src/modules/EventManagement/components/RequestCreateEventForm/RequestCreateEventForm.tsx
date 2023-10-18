/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Autocomplete, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormRequestEventType } from '../../utils'
import { EventCategoryType } from '../../interfaces'
import { eventType } from '../../constants'
import { GetAllActivitiesByCategoryIdQuery } from '../../services/EventCategory'
import Button from 'src/modules/Share/components/Button'

interface Props {
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  handleResetForm: () => void
  eventCategories: EventCategoryType[]
}

const RequestCreateEventForm = ({ register, control, errors, handleResetForm, eventCategories }: Props) => {
  const [categoryId, setCategoryId] = useState<string>('')

  const getAllActivitiesByCategoryIdQuery = new GetAllActivitiesByCategoryIdQuery(categoryId)
  const activities = getAllActivitiesByCategoryIdQuery.fetch()

  const handleChangeCategory = (id: string) => {
    setCategoryId(id)
  }

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
            name='type'
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
            name='categoryId'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <Autocomplete
                    disablePortal
                    id='education_program'
                    options={eventCategories ? eventCategories : []}
                    value={(eventCategories && eventCategories.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label='Danh mục sự kiện' />}
                    onChange={(_, option) => {
                      handleChangeCategory(option?.id as string)
                      onChange(option?.id)
                    }}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.categoryId?.message}
                  </span>
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
                    options={activities ? activities.data : []}
                    value={(activities && activities.data.find((option) => option.id === value)) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Hoạt động sự kiện' />}
                    onChange={(_, option) => onChange(option?.id)}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.categoryId?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <div className='col-span-12 grid grid-cols-3 gap-2'>
            <div className='col-span-1'>
              <TextField
                id='address'
                {...register('address')}
                label='Số lượng'
                placeholder='Nhập số lượng tham gia'
                className='w-full bg-white'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.capacity?.message}
              </span>
            </div>
            <div className='col-span-2'>
              <TextField
                id='address'
                {...register('address')}
                label='Địa điểm'
                placeholder='Nhập địa điểm'
                className='w-full bg-white'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.address?.message}
              </span>
            </div>
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
