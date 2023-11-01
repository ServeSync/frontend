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
  errors,
  control,
  handleChangeFileOrganizerContact,
  previewImageOrganizerContact
}: Props) => {
  return (
    <Fragment>
      <h2 className='text-[42px] text-[#195E8E] font-bold col-span-4 mb-10 bg-transparent '>
        Thông tin người đại diện
      </h2>
      <div className='grid grid-cols-8 gap-4'>
        <Controller
          name='EventOrganizationContactInfo.imageUrl'
          control={control}
          defaultValue=''
          render={() => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2 flex flex-col items-center mx-6'>
                <InputAvatar
                  register={register}
                  onChange={handleChangeFileOrganizerContact}
                  previewImage={previewImageOrganizerContact}
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.EventOrganizationContactInfo?.imageUrl?.message}
                </span>
              </div>
            </LocalizationProvider>
          )}
        />
        <div className='col-span-6'>
          <Controller
            name='EventOrganizationContactInfo.name'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationContactInfo.name')}
                    label='Họ và tên'
                    placeholder='Họ và tên'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationContactInfo?.name?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationContactInfo.phoneNumber'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationContactInfo.phoneNumber')}
                    label='Số điện thoại'
                    placeholder='Số điện thoại'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationContactInfo?.phoneNumber?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationContactInfo.email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationContactInfo.email')}
                    label='Địa chỉ email'
                    placeholder='Địa chỉ email'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationContactInfo?.email?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='EventOrganizationContactInfo.address'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('EventOrganizationContactInfo.address')}
                    label='Địa chỉ '
                    placeholder='Địa chỉ '
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationContactInfo?.address?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <div className='my-2 flex gap-10'>
            <Controller
              name='EventOrganizationContactInfo.birth'
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        {...register('EventOrganizationContactInfo.birth')}
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
                  <div className=' !pt-[8px] w-full'>
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
          </div>
          <Controller
            name='EventOrganizationContactInfo.position'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                  <TextField
                    id='address'
                    {...register('EventOrganizationContactInfo.position')}
                    label='Vị trí nhân sự '
                    placeholder='Vị trí nhân sự '
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.EventOrganizationContactInfo?.position?.message}
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

export default RequestEventOrganizationContactForm