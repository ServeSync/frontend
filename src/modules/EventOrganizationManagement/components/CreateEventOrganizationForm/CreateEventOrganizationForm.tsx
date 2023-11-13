import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Fragment } from 'react'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import Button from 'src/modules/Share/components/Button'
import InputAvatar from 'src/modules/Share/components/InputAvatar'
import { FormEventOrganizationType } from '../../utils'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
interface Props {
  register: UseFormRegister<FormEventOrganizationType>
  errors: FieldErrors<FormEventOrganizationType>
  control: Control<FormEventOrganizationType>
  onChange: (file?: File) => void
  previewImage: string
  onCancel: () => void
  isLoading: boolean
}
const CreateEventOrganizationForm = ({
  register,
  control,
  previewImage,
  onChange,
  onCancel,
  isLoading,
  errors
}: Props) => {
  return (
    <Fragment>
      <div className='grid grid-cols-4 gap-6 items-center '>
        <div className='col-span-1'>
          <InputAvatar previewImage={previewImage} onChange={onChange} register={register} />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.imageUrl?.message}</span>
        </div>
        <div className='col-span-3'>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='name'
                    label='Tên tổ chức'
                    placeholder='Nhập vào tên tổ chức'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='description'
            control={control}
            defaultValue=''
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='description'
                    label='Mô tả nhà tổ chức sự kiện'
                    placeholder='Nhập mô tả'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='email'
                    label='Email'
                    placeholder='Nhập Email'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='phoneNumber'
            control={control}
            defaultValue=''
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='phoneNumber'
                    label='Số điện thoại nhà tổ chức'
                    placeholder='Nhập số điện thoại'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='address'
            control={control}
            defaultValue=''
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='address'
                    label='Địa chỉ nhà tổ chức'
                    placeholder='Nhập địa chỉ'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
        </div>
      </div>
      <div className='flex justify-end gap-6 border-b-2 pb-5'>
        <Button
          type='button'
          classNameButton='bg-[#9a9a9a] py-2 px-4 rounded-lg text-[16px] text-white font-semibold'
          onClick={onCancel}
        >
          Hủy
        </Button>
        <Button
          classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
          isLoading={isLoading}
        >
          Lưu
        </Button>
      </div>
    </Fragment>
  )
}

export default CreateEventOrganizationForm
