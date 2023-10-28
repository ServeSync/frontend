/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import { FormRequestEventType } from '../../utils'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import { TextField } from '@mui/material'
// import Button from 'src/modules/Share/components/Button'
// import { CreateOrganizationInfoCommandHandler } from '../../services/RequestEvent'
// import { handleError } from 'src/modules/Share/utils'
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

const RequestEventOrganizerForm = ({
  register,
  errors,
  control,
  handleChangeFileOrganizer,
  previewImageOrganizer
}: Props) => {
  return (
    <Fragment>
      <h2 className='text-[17px] col-span-4 mb-2'>Thông tin ban tổ chức</h2>
      <div className='grid grid-cols-6 gap-4'>
        <Controller
          name='eventOrganizationInfo.imageUrl'
          control={control}
          defaultValue=''
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='col-span-2 flex flex-col items-center mx-6'>
                <InputAvatar
                  register={register}
                  onChange={handleChangeFileOrganizer}
                  previewImage={previewImageOrganizer}
                />
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.eventOrganizationInfo?.imageUrl?.message}
                </span>
              </div>
            </LocalizationProvider>
          )}
        />

        <div className='col-span-4'>
          <Controller
            name='eventOrganizationInfo.name'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('eventOrganizationInfo.name')}
                    label='Tên tổ chức'
                    placeholder='Nhập tên tổ chức'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.eventOrganizationInfo?.name?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='eventOrganizationInfo.description'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('eventOrganizationInfo.description')}
                    label='Mô tả tổ chức'
                    placeholder='Mô tả tổ chức'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.eventOrganizationInfo?.description?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='eventOrganizationInfo.phoneNumber'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('eventOrganizationInfo.phoneNumber')}
                    label='Số điện thoại'
                    placeholder='Số điện thoại'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.eventOrganizationInfo?.phoneNumber?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='eventOrganizationInfo.email'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('eventOrganizationInfo.email')}
                    label='Địa chỉ email'
                    placeholder='Địa chỉ email'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.eventOrganizationInfo?.email?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
          <Controller
            name='eventOrganizationInfo.address'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='my-2'>
                  <TextField
                    id='address'
                    {...register('eventOrganizationInfo.address')}
                    label='Địa chỉ'
                    placeholder='Địa chỉ'
                    className='w-full bg-white'
                    onChange={onChange}
                    value={value}
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.eventOrganizationInfo?.address?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
        </div>
      </div>
      {/* <div className='flex justify-end col-span-2 gap-4 items-center'>
        <Button
          type='button'
          classNameButton='bg-gray-300   py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[40px]'
        >
          Làm mới
        </Button>
        <Button
          type='button'
          classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[40px]'
          onClick={handleAddEventOrganizer}
        >
          Thêm nhà tổ chức
        </Button>
      </div> */}
    </Fragment>
  )
}

export default RequestEventOrganizerForm
