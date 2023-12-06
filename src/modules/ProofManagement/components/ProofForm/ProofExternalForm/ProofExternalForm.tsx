/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, TextField } from '@mui/material'
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import InputImage from 'src/modules/Share/components/InputImage'
import { FormProofExternalType } from 'src/modules/ProofManagement/utils'
import { EventActivityType } from 'src/modules/EventManagement/interfaces'
import { ProofDetailType } from 'src/modules/ProofManagement/interfaces'
import { useEffect } from 'react'
import dayjs from 'dayjs'

interface Props {
  control: Control<FormProofExternalType>
  register: UseFormRegister<FormProofExternalType>
  errors: FieldErrors<FormProofExternalType>
  setValue?: UseFormSetValue<FormProofExternalType>
  activities: EventActivityType[]
  previewImage: string
  handleChangeFile: (file?: File) => void
  proof?: ProofDetailType
}

const ProofExternalForm = ({
  control,
  register,
  errors,
  setValue,
  activities,
  previewImage,
  handleChangeFile,
  proof
}: Props) => {
  useEffect(() => {
    if (proof) {
      setValue && setValue('eventName', proof.eventName)
      setValue && setValue('address', proof.address)
      setValue && setValue('organizationName', proof.organizationName)
      setValue && setValue('startAt', proof.startAt)
      setValue && setValue('endAt', proof.endAt)
      setValue && setValue('attendanceAt', proof.attendanceAt)
      setValue && setValue('role', proof.role)
      setValue && setValue('score', proof.score.toString())
      setValue && setValue('activityId', proof.activity.id)
      setValue && setValue('description', proof.description)
      setValue && setValue('imageUrl', proof.imageUrl)
    }
  }, [proof, setValue])

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-2 gap-3'>
        <h2 className='col-span-2'>Thông tin sự kiện</h2>
        <Controller
          name='eventName'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2'>
                <TextField
                  id='eventName'
                  label='Tên sự kiện'
                  placeholder='Nhập tên sự kiên'
                  value={proof && value}
                  onChange={onChange}
                  className='w-full bg-white'
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <Controller
          name='address'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2'>
                <TextField
                  id='address'
                  label='Địa chỉ sự kiện'
                  placeholder='Nhập địa chỉ sự kiện'
                  value={proof && value}
                  onChange={onChange}
                  className='w-full bg-white'
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <Controller
          name='organizationName'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2'>
                <TextField
                  id='organizationName'
                  label='Nhà tổ chức'
                  placeholder='Nhập tên nhà tổ chức'
                  value={proof && value}
                  onChange={onChange}
                  className='w-full bg-white'
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <Controller
          name='startAt'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className='mt-[-8px] col-span-1'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label='Ngày bắt đầu'
                    format='DD/MM/YYYY'
                    value={proof ? dayjs(value) : null}
                    onChange={onChange}
                    className='bg-white w-full'
                  />
                </DemoContainer>
              </LocalizationProvider>
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
            </div>
          )}
        />
        <Controller
          name='endAt'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className='mt-[-8px] col-span-1'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label='Ngày kết thúc'
                    format='DD/MM/YYYY'
                    value={proof ? dayjs(value) : null}
                    onChange={onChange}
                    className='bg-white w-full'
                  />
                </DemoContainer>
              </LocalizationProvider>
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
            </div>
          )}
        />
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <h2 className='col-span-2'>Thông tin tham gia sự kiện</h2>
        <Controller
          name='attendanceAt'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className='mt-[-8px] col-span-2'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label='Ngày điểm danh'
                    format='DD/MM/YYYY'
                    value={proof ? dayjs(value) : null}
                    onChange={onChange}
                    className='bg-white w-full'
                  />
                </DemoContainer>
              </LocalizationProvider>
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
            </div>
          )}
        />
        <Controller
          name='role'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2'>
                <TextField
                  id='role'
                  label='Vai trò'
                  placeholder='Nhập vai trò'
                  value={proof && value}
                  onChange={onChange}
                  className='w-full bg-white'
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <Controller
          name='score'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2'>
                <TextField
                  id='score'
                  label='Điểm'
                  placeholder='Nhập điểm'
                  value={proof && value}
                  onChange={onChange}
                  className='w-full bg-white'
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <Controller
          name='activityId'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2'>
                <Autocomplete
                  disablePortal
                  id='activity'
                  options={activities ? activities : []}
                  value={(activities && activities.find((option) => option.id === value)) || null}
                  getOptionLabel={(option) => option.name}
                  noOptionsText='Không có lựa chọn'
                  renderInput={(params) => <TextField {...params} label='Hoạt động sự kiện' />}
                  onChange={(_, option) => onChange(option ? option.id : '')}
                  className='bg-white'
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2'>
                <TextField
                  id='description'
                  label='Mô tả'
                  placeholder='Nhập mô tả'
                  value={proof && value}
                  onChange={onChange}
                  multiline
                  rows={3}
                  className='w-full bg-white'
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
              avatar={proof ? proof.imageUrl : ''}
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
    </div>
  )
}

export default ProofExternalForm
