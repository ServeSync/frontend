import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormEventOrganizationContactType } from '../../utils'
import { Fragment } from 'react'
import InputAvatar from 'src/modules/Share/components/InputAvatar'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { gender } from 'src/modules/StudentManagement/constants'
import Button from 'src/modules/Share/components/Button'

interface Props {
  register: UseFormRegister<FormEventOrganizationContactType>
  errors: FieldErrors<FormEventOrganizationContactType>
  control: Control<FormEventOrganizationContactType>
  onChange: (file?: File) => void
  previewImage: string
  isLoading: boolean
  handleClose: () => void
}

const CreateEventOrganizationContactForm = ({
  register,
  control,
  errors,
  previewImage,
  onChange,
  isLoading,
  handleClose
}: Props) => {
  return (
    <Fragment>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-4 flex flex-col items-center mx-4'>
          <InputAvatar register={register} onChange={onChange} previewImage={previewImage} />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.imageUrl?.message}</span>
        </div>
        <div className='col-span-8 grid grid-cols-2 gap-x-6 gap-y-4 text-[14px] font-semibold text-gray-600 placeholder:text-black'>
          <Controller
            name='name'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='name'
                    label='Họ và tên'
                    placeholder='Nhập họ và tên'
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
            name='birth'
            control={control}
            render={({ field: { onChange, value = null }, fieldState: { error } }) => (
              <div className='mt-[-8px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label='Ngày sinh'
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
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='phone'
                    label='Số điện thoại'
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
            name='gender'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <Autocomplete
                    disablePortal
                    id='gender'
                    options={gender}
                    value={gender.find((option) => option.id === value) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Giới tính' />}
                    onChange={(_, option) => onChange(option ? option.id : '')}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='position'
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='position'
                    label='Chức vụ'
                    placeholder='Nhập chức vụ'
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
            render={({ field: { onChange }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='address'
                    label='Địa địa chỉ cư trú'
                    placeholder='Nhập địa chỉ cư trú'
                    className='w-full bg-white'
                    onChange={onChange}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                </div>
              </LocalizationProvider>
            )}
          />
          <div className='flex justify-end gap-6'>
            <Button
              type='button'
              classNameButton='bg-[#9a9a9a] py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[48px]'
              onClick={handleClose}
            >
              Hủy
            </Button>
            <Button
              isLoading={isLoading}
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px] h-[48px]'
            >
              Lưu
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateEventOrganizationContactForm
