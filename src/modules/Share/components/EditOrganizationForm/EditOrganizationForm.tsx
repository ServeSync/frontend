import { Fragment, useEffect } from 'react'
import { EventOrganizationType } from 'src/modules/EventOrganizationManagement/interfaces'
import InputAvatar from '../InputAvatar'
import { Control, Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FormEventOrganizationType } from 'src/modules/EventOrganizationManagement/utils'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import Button from '../Button'

interface Props {
  register: UseFormRegister<FormEventOrganizationType>
  setValue: UseFormSetValue<FormEventOrganizationType>
  control: Control<FormEventOrganizationType>
  organization: EventOrganizationType
  onChange: (file?: File) => void
  previewImage: string
  isLoadingEdit: boolean
}

const EditOrganizationForm = ({
  organization,
  setValue,
  previewImage,
  control,
  isLoadingEdit,
  onChange,
  register
}: Props) => {
  useEffect(() => {
    if (organization) {
      setValue('name', organization.name)
      setValue('email', organization.email)
      setValue('phoneNumber', organization.phoneNumber)
      setValue('address', organization.address)
      setValue('imageUrl', organization.imageUrl)
      setValue('description', organization.description)
    }
  }, [organization, setValue])

  const handleRefreshClick = () => {
    if (organization) {
      setValue('name', organization.name)
      setValue('email', organization.email)
      setValue('phoneNumber', organization.phoneNumber)
      setValue('address', organization.address)
      setValue('imageUrl', organization.imageUrl)
      setValue('description', organization.description)
    }
  }

  return (
    <Fragment>
      <div>
        <div className='grid grid-cols-4 gap-8 items-center '>
          <div className='col-span-1'>
            <InputAvatar
              previewImage={previewImage}
              onChange={onChange}
              register={register}
              avatar={organization && organization.imageUrl}
            />
          </div>
          <div className='col-span-3 flex flex-col gap-4'>
            <Controller
              name='name'
              control={control}
              defaultValue=''
              render={({ field: { onChange, value = organization && organization.name }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='name'
                      label='Tên nhà tổ chức'
                      value={value}
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
              render={({
                field: { onChange, value = organization && organization.description },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='description'
                      label='Mô tả nhà tổ chức'
                      value={value}
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
              render={({ field: { onChange, value = organization && organization.email }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='email'
                      label='Email nhà tổ chức'
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
              name='phoneNumber'
              control={control}
              defaultValue=''
              render={({
                field: { onChange, value = organization && organization.phoneNumber },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='phoneNumber'
                      label='Số điện thoại nhà tổ chức'
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
              name='address'
              control={control}
              defaultValue=''
              render={({
                field: { onChange, value = organization && organization.address },
                fieldState: { error }
              }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <TextField
                      id='address'
                      label='Địa chỉ nhà tổ chức'
                      value={value}
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
        <div className='flex justify-end gap-6 '>
          <Button
            type='button'
            classNameButton='bg-red-500 py-2 px-4 rounded-lg text-[16px] text-white font-semibold'
            onClick={handleRefreshClick}
          >
            Làm mới
          </Button>
          <Button
            classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
            isLoading={isLoadingEdit}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default EditOrganizationForm
