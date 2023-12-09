import { Autocomplete, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Fragment, useEffect } from 'react'
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputAvatar from 'src/modules/Share/components/InputAvatar'
import { FormEventOrganizationContactType } from '../../utils'
import Button from 'src/modules/Share/components/Button'
import { ContactType, EventOrganizationType } from '../../interfaces'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { gender } from 'src/modules/StudentManagement/constants'
import Restricted from 'src/modules/Share/components/Restricted'

interface Props {
  eventOrganization: EventOrganizationType
  organizationContact: ContactType | null
  register: UseFormRegister<FormEventOrganizationContactType>
  setValue: UseFormSetValue<FormEventOrganizationContactType>
  control: Control<FormEventOrganizationContactType>
  errors: FieldErrors<FormEventOrganizationContactType>
  onChange: (file?: File) => void
  previewImage: string
  isLoading: boolean
  handleDeleteOrganizationContact: (id: string, idContact: string) => void
}

const EditEventOrganizationContactForm = ({
  eventOrganization,
  register,
  setValue,
  control,
  organizationContact,
  errors,
  handleDeleteOrganizationContact,
  onChange,
  previewImage,
  isLoading
}: Props) => {
  useEffect(() => {
    if (organizationContact) {
      setValue('name', organizationContact.name)
      setValue('email', organizationContact.email)
      setValue('birth', organizationContact.birth)
      setValue('phoneNumber', organizationContact.phoneNumber)
      setValue('gender', organizationContact.gender.toString())
      setValue('address', organizationContact.address)
      setValue('position', organizationContact.position)
      setValue('imageUrl', organizationContact.imageUrl)
    }
  }, [organizationContact, setValue])

  return (
    <Fragment>
      {organizationContact && (
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-4 flex flex-col items-center mx-6'>
            <InputAvatar
              register={register}
              onChange={onChange}
              previewImage={previewImage}
              avatar={organizationContact && organizationContact.imageUrl}
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.imageUrl?.message}</span>
          </div>
          <div className='col-span-8 grid grid-cols-2 gap-x-6 gap-y-4 text-[14px] font-semibold text-gray-600 placeholder:text-black'>
            <Controller
              name='name'
              control={control}
              render={({
                field: { onChange, value = organizationContact && organizationContact.name },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='name'
                      label='Họ và tên'
                      value={value}
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
              render={({
                field: { onChange, value = organizationContact && organizationContact.email },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='email'
                      label='Email'
                      value={value}
                      placeholder='Nhập Email'
                      className='w-full bg-white'
                      onChange={onChange}
                      InputProps={{
                        disabled: true
                      }}
                    />
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{error?.message}</span>
                  </div>
                </LocalizationProvider>
              )}
            />
            <Controller
              name='birth'
              control={control}
              render={({
                field: { onChange, value = organizationContact && organizationContact.birth },
                fieldState: { error }
              }) => (
                <div className='mt-[-8px]'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label='Ngày sinh'
                        format='DD/MM/YYYY'
                        onChange={onChange}
                        value={dayjs(value)}
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
              defaultValue=''
              render={({
                field: { onChange, value = organizationContact && organizationContact.phoneNumber },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='phone'
                      label='Số điện thoại'
                      value={value}
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
              defaultValue=''
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
              defaultValue=''
              render={({
                field: { onChange, value = organizationContact && organizationContact.position },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='position'
                      label='Chức vụ'
                      value={value}
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
              defaultValue=''
              render={({
                field: { onChange, value = organizationContact && organizationContact.address },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='address'
                      label='Địa chỉ cư trú'
                      value={value}
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
              <Restricted to='ServeSync.Permissions.EventOrganizations.RemoveContact'>
                <Button
                  type='button'
                  classNameButton='bg-red-500 py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[48px]'
                  onClick={() => handleDeleteOrganizationContact(eventOrganization.id, organizationContact?.id)}
                >
                  Xóa
                </Button>
              </Restricted>
              <Restricted to='ServeSync.Permissions.EventOrganizations.UpdateContact'>
                <Button
                  isLoading={isLoading}
                  classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px] h-[48px]'
                >
                  Lưu
                </Button>
              </Restricted>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}
export default EditEventOrganizationContactForm
