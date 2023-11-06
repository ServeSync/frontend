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
  control,
  handleChangeFileOrganizer,
  previewImageOrganizer
}: Props) => {
  return (
    <Fragment>
      <h2 className='text-[24px] text-black font-bold col-span-4 mb-10 bg-transparent'>Thông tin ban tổ chức</h2>
      <div className='grid grid-cols-8 gap-4'>
        <Controller
          name='EventOrganizationInfo.imageUrl'
          control={control}
          defaultValue=''
          render={({ fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2 flex flex-col items-center mx-6'>
                <InputAvatar
                  register={register}
                  onChange={handleChangeFileOrganizer}
                  previewImage={previewImageOrganizer}
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <div className='col-span-6 grid grid-cols-1 gap-4'>
          <Controller
            name='EventOrganizationInfo.name'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-1'>
                  <TextField
                    id='name'
                    label='Tên tổ chức'
                    placeholder='Nhập tên tổ chức'
                    className='w-full bg-white '
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationInfo.description'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-1'>
                  <TextField
                    id='description'
                    label='Mô tả tổ chức'
                    placeholder='Mô tả tổ chức'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationInfo.phoneNumber'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-1'>
                  <TextField
                    id='phoneNumber'
                    label='Số điện thoại'
                    placeholder='Số điện thoại'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationInfo.email'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-1'>
                  <TextField
                    id='email'
                    label='Địa chỉ email'
                    placeholder='Địa chỉ email'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationInfo.address'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-1'>
                  <TextField
                    id='address'
                    label='Địa chỉ'
                    placeholder='Địa chỉ'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
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
