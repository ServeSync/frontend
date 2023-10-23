/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UseFormRegister,
  FieldErrors,
  Controller,
  Control,
  useForm,
  UseFormSetValue,
  UseFormReset
} from 'react-hook-form'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { Autocomplete, TextField } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormRequestEventType, FormSearchMapSchema, FormSearchMapType } from '../../utils'
import { eventType } from '../../constants'
import Button from 'src/modules/Share/components/Button'
import { EventCategoriesListType, LocationType, MarkerType } from '../../interfaces'
import ModalCustom from 'src/modules/Share/components/Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import Map from '../Map'
import { useState } from 'react'

interface Props {
  register: UseFormRegister<FormRequestEventType>
  control: Control<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  eventCategories: EventCategoriesListType
  setValue: UseFormSetValue<FormRequestEventType>
  reset: UseFormReset<FormRequestEventType>
}

const RequestCreateEventForm = ({ register, control, errors, reset, setValue }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [center, setCenter] = useState<LocationType>({
    latitude: 16.074160300547344,
    longitude: 108.15078258893459
  })
  const [markers, setMarkers] = useState<MarkerType[]>([])

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleClear = () => {
    reset()
  }
  const FormSearchMap = useForm<FormSearchMapType>({
    resolver: yupResolver(FormSearchMapSchema)
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
          {/* <Controller
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
          /> */}
          <div className='col-span-4'>
            <TextField
              id='capacity'
              {...register('capacity')}
              label='Số lượng'
              placeholder='Nhập số lượng tham gia'
              className='w-full bg-white'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.capacity?.message}</span>
          </div>
          <Controller
            name='address.fullAddress'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-12'>
                  <TextField
                    id='address'
                    {...register('address.fullAddress')}
                    label='Địa điểm'
                    placeholder='Nhập địa điểm'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.address?.fullAddress?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <div className='col-span-5'>
            <TextField {...register('address.longitude')} className='w-full bg-white' />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.address?.longitude?.message}
            </span>
          </div>
          <div className='col-span-5'>
            <TextField {...register('address.latitude')} className='w-full bg-white' />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.address?.latitude?.message}
            </span>
          </div>
          <div className='col-span-2  flex items-center justify-end'>
            <Button
              type='button'
              classNameButton='border-[1px] border-[#39a4b2] p-2 rounded-lg text-[#39a4b2]'
              onClick={handleOpenModal}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525'
                />
              </svg>
            </Button>
            <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModal}>
              <Map
                register={FormSearchMap.register}
                handleSubmit={FormSearchMap.handleSubmit}
                setValue={setValue}
                reset={FormSearchMap.reset}
                center={center}
                setCenter={setCenter}
                markers={markers}
                setMarkers={setMarkers}
              />
            </ModalCustom>
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
              onClick={handleClear}
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
