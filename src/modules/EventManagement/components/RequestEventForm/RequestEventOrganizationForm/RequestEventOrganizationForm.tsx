/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import { FormRequestEventType } from '../../../utils'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import InputAvatar from 'src/modules/Share/components/InputAvatar'

interface Props {
  register: UseFormRegister<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  control: Control<FormRequestEventType>
  handleChangeFileOrganizer: (file?: File) => void
  previewImageOrganizer: string
}

const RequestEventOrganizationForm = ({
  register,
  errors,
  control,
  handleChangeFileOrganizer,
  previewImageOrganizer
}: Props) => {
  return (
    <Fragment>
      <h2 className='text-[42px] text-[#195E8E] font-bold col-span-4 mb-10 bg-transparent '>Thông tin ban tổ chức</h2>
      <div className='grid grid-cols-8 gap-4'>
        <Controller
          name='EventOrganizationInfo.imageUrl'
          control={control}
          defaultValue=''
          render={() => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2 flex flex-col items-center mx-6'>
                <InputAvatar
                  register={register}
                  onChange={handleChangeFileOrganizer}
                  previewImage={previewImageOrganizer}
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.EventOrganizationInfo?.imageUrl?.message}
                </span>
              </div>
            </LocalizationProvider>
          )}
        />

        <div className='col-span-6'>
          <Controller
            name='EventOrganizationInfo.name'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationInfo.name')}
                    label='Tên tổ chức'
                    placeholder='Nhập tên tổ chức'
                    className='w-full bg-white '
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationInfo?.name?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationInfo.description'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationInfo.description')}
                    label='Mô tả tổ chức'
                    placeholder='Mô tả tổ chức'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationInfo?.description?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationInfo.phoneNumber'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationInfo.phoneNumber')}
                    label='Số điện thoại'
                    placeholder='Số điện thoại'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationInfo?.phoneNumber?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationInfo.email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationInfo.email')}
                    label='Địa chỉ email'
                    placeholder='Địa chỉ email'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationInfo?.email?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationInfo.address'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationInfo.address')}
                    label='Địa chỉ'
                    placeholder='Địa chỉ'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationInfo?.address?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default RequestEventOrganizationForm
