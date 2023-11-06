/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import { FormRequestEventType } from '../../../utils'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Autocomplete, TextField } from '@mui/material'
import { gender } from 'src/modules/StudentManagement/constants'
import InputAvatar from 'src/modules/Share/components/InputAvatar'

interface Props {
  register: UseFormRegister<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  control: Control<FormRequestEventType>
  handleChangeFileOrganizerContact: (file?: File) => void
  previewImageOrganizerContact: string
}

const RequestEventOrganizationContactForm = ({
  register,
  control,
  handleChangeFileOrganizerContact,
  previewImageOrganizerContact
}: Props) => {
  return (
    <Fragment>
      <h2 className='text-[24px] text-black font-bold col-span-4 mb-10 bg-transparent'>Thông tin người đại diện</h2>
      <div className='grid grid-cols-8 gap-4'>
        <Controller
          name='EventOrganizationContactInfo.imageUrl'
          control={control}
          render={({ fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2 flex flex-col items-center mx-6'>
                <InputAvatar
                  register={register}
                  onChange={handleChangeFileOrganizerContact}
                  previewImage={previewImageOrganizerContact}
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            </LocalizationProvider>
          )}
        />
        <div className='col-span-6 grid grid-cols-2 gap-4'>
          <Controller
            name='EventOrganizationContactInfo.name'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-2'>
                  <TextField
                    id='userName'
                    label='Họ và tên'
                    placeholder='Họ và tên'
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
            name='EventOrganizationContactInfo.phoneNumber'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-2'>
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
            name='EventOrganizationContactInfo.email'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-2'>
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
            name='EventOrganizationContactInfo.address'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-2'>
                  <TextField
                    id='address'
                    label='Địa chỉ '
                    placeholder='Địa chỉ '
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
            name='EventOrganizationContactInfo.birth'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className='col-span-1 mt-[-8px]'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      format='DD/MM/YYYY'
                      label='Chọn ngày sinh'
                      className='w-full'
                      onChange={onChange}
                      value={value}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
              </div>
            )}
          />
          <Controller
            name='EventOrganizationContactInfo.gender'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-1'>
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
            name='EventOrganizationContactInfo.position'
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-2'>
                  <TextField
                    id='position'
                    label='Vị trí nhân sự'
                    placeholder='Vị trí nhân sự'
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

export default RequestEventOrganizationContactForm
