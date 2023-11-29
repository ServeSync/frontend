import { Fragment, useEffect } from 'react'
import { Control, Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FormEventOrganizationType } from '../../utils'
import InputAvatar from 'src/modules/Share/components/InputAvatar'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import Button from 'src/modules/Share/components/Button'
import { EventOrganizationType } from '../../interfaces'
import { StatusOrganizationToMessage } from '../../constants'
import classNames from 'classnames'

interface Props {
  register: UseFormRegister<FormEventOrganizationType>
  setValue: UseFormSetValue<FormEventOrganizationType>
  control: Control<FormEventOrganizationType>
  eventOrganization: EventOrganizationType
  onChange: (file?: File) => void
  previewImage: string
  isLoadingEdit: boolean
  onCancel: () => void
  handleDeleteEventOrganization: (id: string) => void
}

const EditEventOrganizationForm = ({
  register,
  setValue,
  control,
  eventOrganization,
  onChange,
  previewImage,
  onCancel,
  isLoadingEdit,
  handleDeleteEventOrganization
}: Props) => {
  useEffect(() => {
    if (eventOrganization) {
      setValue('name', eventOrganization.name)
      setValue('email', eventOrganization.email)
      setValue('phoneNumber', eventOrganization.phoneNumber)
      setValue('address', eventOrganization.address)
      setValue('imageUrl', eventOrganization.imageUrl)
      setValue('description', eventOrganization.description)
    }
  }, [eventOrganization, setValue])

  return (
    <Fragment>
      {eventOrganization && (
        <div>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-[20px] font-semibold'>Thông tin nhà tổ chức sự kiện</h2>
            <div
              className={classNames('px-4 py-2 rounded-full h-[40px] text-white', {
                'bg-[#195E8E]': eventOrganization.status === 'Pending',
                'bg-[#26dc9c]': eventOrganization.status === 'Active',
                'bg-[#ff4d4f]': eventOrganization.status === 'Rejected'
              })}
            >
              {StatusOrganizationToMessage(eventOrganization.status)}
            </div>
          </div>
          <div className='grid grid-cols-4 gap-8 items-center '>
            <div className='col-span-1'>
              <InputAvatar
                previewImage={previewImage}
                onChange={onChange}
                register={register}
                avatar={eventOrganization && eventOrganization.imageUrl}
              />
            </div>
            <div className='col-span-3 flex flex-col gap-4'>
              <Controller
                name='name'
                control={control}
                defaultValue=''
                render={({
                  field: { onChange, value = eventOrganization && eventOrganization.name },
                  fieldState: { error }
                }) => (
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
                  field: { onChange, value = eventOrganization && eventOrganization.description },
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
                render={({
                  field: { onChange, value = eventOrganization && eventOrganization.email },
                  fieldState: { error }
                }) => (
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
                          readOnly: true
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
                  field: { onChange, value = eventOrganization && eventOrganization.phoneNumber },
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
                  field: { onChange, value = eventOrganization && eventOrganization.address },
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
          <div className='flex justify-end gap-6 border-b-2 pb-5'>
            <Button
              type='button'
              classNameButton='bg-[#9a9a9a] py-2 px-4 rounded-lg text-[16px] text-white font-semibold'
              onClick={onCancel}
            >
              Hủy
            </Button>
            <Button
              type='button'
              classNameButton='bg-red-500 py-2 px-4 rounded-lg text-[16px] text-white font-semibold'
              onClick={() => handleDeleteEventOrganization(eventOrganization.id)}
            >
              Xóa
            </Button>
            <Button
              classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
              isLoading={isLoadingEdit}
            >
              Lưu
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default EditEventOrganizationForm
