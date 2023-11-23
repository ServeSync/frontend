import { Autocomplete, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Fragment, useEffect } from 'react'
import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import InputAvatar from 'src/modules/Share/components/InputAvatar'
import { FormEventOrganizationContactType } from '../../utils'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
// import { gender } from 'src/modules/StudentManagement/constants'
import Button from 'src/modules/Share/components/Button'
import { ContactType, EventOrganizationType } from '../../interfaces'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs from 'dayjs'
import { gender } from 'src/modules/StudentManagement/constants'
interface Props {
  eventOrganization: EventOrganizationType
  OrganizationContact: ContactType | null
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
  OrganizationContact,
  errors,
  handleDeleteOrganizationContact,
  onChange,
  previewImage,
  isLoading
}: Props) => {
  useEffect(() => {
    if (OrganizationContact) {
      setValue('name', OrganizationContact.name)
      setValue('email', OrganizationContact.email)
      setValue('birth', OrganizationContact.birth)
      setValue('phoneNumber', OrganizationContact.phoneNumber)
      setValue('gender', OrganizationContact.gender.toString())
      setValue('address', OrganizationContact.address)
      setValue('position', OrganizationContact.position)
      setValue('imageUrl', OrganizationContact.imageUrl)
    }
  }, [OrganizationContact, setValue])
  return (
    <Fragment>
      {OrganizationContact && (
        <div className=''>
          <div className='grid grid-cols-4 gap-4'>
            <div className='col-span-1 flex flex-col items-center mx-6'>
              <InputAvatar
                register={register}
                onChange={onChange}
                previewImage={previewImage}
                avatar={OrganizationContact && OrganizationContact.imageUrl}
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.imageUrl?.message}
              </span>
            </div>
            <div className='col-span-3 grid grid-cols-2 gap-x-6 gap-y-4 text-[14px] font-semibold text-gray-600 placeholder:text-black'>
              <Controller
                name='name'
                control={control}
                render={({
                  field: { onChange, value = OrganizationContact && OrganizationContact.name },
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
                  field: { onChange, value = OrganizationContact && OrganizationContact.email },
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
                          readOnly: true
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
                  field: { onChange, value = OrganizationContact && OrganizationContact.birth },
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
                  field: { onChange, value = OrganizationContact && OrganizationContact.phoneNumber },
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
            </div>
            <div className='col-span-4 grid grid-cols-3 gap-x-6 text-[14px] font-semibold text-gray-600 placeholder:text-black'>
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
                  field: { onChange, value = OrganizationContact && OrganizationContact.position },
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
                  field: { onChange, value = OrganizationContact && OrganizationContact.address },
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
            </div>
          </div>
          <div className='flex justify-end gap-6'>
            <Button
              type='button'
              classNameButton='bg-red-500 py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6 w-[90px]'
              onClick={() => handleDeleteOrganizationContact(eventOrganization.id, OrganizationContact?.id)}
            >
              Xóa
            </Button>
            <Button
              isLoading={isLoading}
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6 w-[90px]'
            >
              Lưu
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  )
}
export default EditEventOrganizationContactForm
