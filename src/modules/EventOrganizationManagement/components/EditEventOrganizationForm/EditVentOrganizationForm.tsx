import { Fragment, useEffect } from 'react'
import { Control, Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { FormEventOrganizationType } from '../../utils'
import { EventOrganizationType } from 'src/modules/EventManagement/interfaces'
import InputAvatar from 'src/modules/Share/components/InputAvatar'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextField } from '@mui/material'
import { EditEventOrganizationTableHeader } from 'src/modules/EventManagement/constants'
import { gender } from 'src/modules/StudentManagement/constants'
import Button from 'src/modules/Share/components/Button'
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
  console.log(eventOrganization)

  return (
    <Fragment>
      {eventOrganization && (
        <div className='border-[1px] border-gray-300 p-6 rounded-xl'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-[20px] font-semibold'>Thông tin ban tổ chức</h2>
          </div>
          <div className='grid grid-cols-4 gap-6 items-center '>
            <div className='col-span-1'>
              <InputAvatar
                previewImage={previewImage}
                onChange={onChange}
                register={register}
                avatar={eventOrganization && eventOrganization.imageUrl}
              />
            </div>
            <div className='col-span-3'>
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
                        label='Tên tổ chức'
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
                        label='Mô tả nhà tổ chức sự kiện'
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
                        label='Email'
                        value={value}
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
          <h3 className='text-[16px] mt-4 mb-2 font-semibold'>Đại diện</h3>
          <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
            <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
              <tr className='text-[14px] text-gray-600'>
                {EditEventOrganizationTableHeader.map((item) => (
                  <th className='px-2 py-2 font-semibold' key={item.id}>
                    <span>{item.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventOrganization.contacts &&
                eventOrganization.contacts.length !== 0 &&
                eventOrganization.contacts.map((item, id: number) => (
                  <tr
                    className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                    key={`${id}${item.id}`}
                  >
                    <th className='px-2 py-4 font-medium flex items-center gap-3'>
                      <img src={item.imageUrl} alt='' className='rounded-full object-cover w-[50px] h-[50px]' />
                      <div className='flex flex-col'>
                        <span className='font-semibold'>{item.name}</span>
                        <span className='text-gray-400 text-[12px]'>{item.position}</span>
                      </div>
                    </th>
                    <th className='px-2 py-4 font-medium'>{item.birth}</th>
                    <th className='px-2 py-4 font-medium'>
                      {gender.find((option) => option.id === item.gender.toString())?.name}
                    </th>
                    <th className='px-2 py-4 font-medium'>{item.email}</th>
                    <th className='px-2 py-4 font-medium'>{item.phoneNumber}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  )
}

export default EditEventOrganizationForm
