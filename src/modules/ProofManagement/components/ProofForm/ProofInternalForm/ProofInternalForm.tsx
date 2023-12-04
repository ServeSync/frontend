/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import { EventDetailType, StudentRegisteredEvent } from 'src/modules/EventManagement/interfaces'
import { FormProofInternalType } from 'src/modules/ProofManagement/utils'
import Button from 'src/modules/Share/components/Button'
import InputImage from 'src/modules/Share/components/InputImage'

interface Props {
  control: Control<FormProofInternalType>
  register: UseFormRegister<FormProofInternalType>
  errors: FieldErrors<FormProofInternalType>
  events: StudentRegisteredEvent[]
  event: EventDetailType
  eventId: string | undefined
  setEventId: React.Dispatch<React.SetStateAction<string | undefined>>
  previewImage: string
  handleChangeFile: (file?: File) => void
  isLoading: boolean
}

const ProofInternalForm = ({
  control,
  register,
  errors,
  events,
  event,
  eventId,
  setEventId,
  previewImage,
  handleChangeFile,
  isLoading
}: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-2 gap-3'>
        <h2 className='col-span-2'>Thông tin sự kiện</h2>
        <Controller
          name='eventId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='flex flex-col bg-white col-span-2'>
                <Autocomplete
                  disablePortal
                  id='event_id'
                  options={events ? events : []}
                  value={(events && events.find((option) => option.id === value)) || null}
                  getOptionLabel={(option) => option.name}
                  noOptionsText='Không có lựa chọn'
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(_, option) => {
                    onChange(option ? option.id : '')
                    setEventId(option ? option.id : '')
                  }}
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <div className='col-span-2 mb-[18px]'>
          <TextField
            id='address'
            label='Địa chỉ sự kiện'
            value={event ? event.address.fullAddress : ''}
            className='w-full bg-white'
            InputProps={{
              disabled: true
            }}
          />
        </div>
        <div className='col-span-2 mb-[18px]'>
          <TextField
            id='organization'
            label='Nhà tổ chức'
            value={event ? event.name : ''}
            className='w-full bg-white col-span-2'
            InputProps={{
              disabled: true
            }}
          />
        </div>
        <div className='col-span-1 mt-[-8px] mb-[18px]'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimeField']}>
              <DatePicker
                label='Ngày bắt đầu'
                format='DD/MM/YYYY'
                value={event ? dayjs(event.startAt) : null}
                className='bg-white'
                disabled
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className='col-span-1 mt-[-8px] mb-[18px]'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimeField']}>
              <DatePicker
                label='Ngày kết thúc'
                format='DD/MM/YYYY'
                value={event ? dayjs(event.endAt) : null}
                className='bg-white'
                disabled
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className='col-span-2'>
          <TextField
            id='introduce'
            value={event ? event.introduction : ''}
            className='w-full bg-white'
            label='Giới thiệu'
            InputProps={{
              disabled: true
            }}
          />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <h2 className='col-span-2'>Thông tin tham gia sự kiện</h2>
        <Controller
          name='attendanceAt'
          control={control}
          render={({ field: { onChange, value = null }, fieldState: { error } }) => (
            <div className='mt-[-8px] col-span-2'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label='Ngày điểm danh'
                    format='DD/MM/YYYY'
                    onChange={onChange}
                    value={value}
                    className='bg-white w-full'
                  />
                </DemoContainer>
              </LocalizationProvider>
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
            </div>
          )}
        />
        <div className='col-span-1 mb-[18px]'>
          <TextField
            id='role'
            label='Vai trò'
            className='w-full bg-white'
            value={(events && events.find((option) => option.id === eventId)?.role) || ''}
            InputProps={{
              disabled: true
            }}
          />
        </div>
        <div className='col-span-1 mb-[18px]'>
          <TextField
            defaultValue=''
            id='score'
            label='Điểm'
            className='w-full bg-white'
            value={(events && events.find((option) => option.id === eventId)?.score) || ''}
            InputProps={{
              disabled: true
            }}
          />
        </div>
        <Controller
          name='description'
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2'>
                <TextField
                  id='description'
                  label='Mô tả'
                  placeholder='Nhập mô tả'
                  className='w-full bg-white '
                  onChange={onChange}
                  multiline
                  rows={3}
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <div className='col-span-2'>
          <div className='w-full h-[240px] rounded-lg'>
            <InputImage
              register={register}
              onChange={handleChangeFile}
              previewImage={previewImage}
              classNameButton='absolute bg-slate-200 outline-none w-full h-full top-0 left-0'
              isHiddenButton={true}
            >
              <div className='flex flex-col justify-center items-center h-full border-[2px] border-dashed border-[#26c6da] rounded-xl'>
                <img
                  className='w-[100px] mb-4'
                  src='http://res.cloudinary.com/dboijruhe/image/upload/v1701487948/Assets/bda934d3-0b4c-4167-9522-2181193105c1-upload.png'
                  alt=''
                />
                <span>Tải ảnh minh chứng tham gia sự kiện</span>
              </div>
            </InputImage>
          </div>
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.imageUrl?.message}</span>
        </div>
      </div>
      <div className='flex justify-end items-center'>
        <Button
          type='submit'
          classNameButton='flex justify-center items-center bg-[#26c6da] w-[118px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90'
          isLoading={isLoading}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  )
}

export default ProofInternalForm
