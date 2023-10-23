/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import { FormRequestEventType } from '../../utils'
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import Button from 'src/modules/Share/components/Button'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
interface Props {
  register: UseFormRegister<FormRequestEventType>
  errors: FieldErrors<FormRequestEventType>
  control: Control<FormRequestEventType>
}

const RequestEventOrganizerForm = ({ register, control, errors }: Props) => {
  return (
    <Fragment>
      <div className='flex flex-col gap-y-2 max-w-[800px] mx-auto'>
        <h2 className='text-[17px] col-span-4 mb-2'>Thông tin ban tổ chức</h2>
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-1 flex flex-col items-center mx-6'>
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'></span>
          </div>
          <div className='col-span-3'>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationInfo.name')}
                label='Tên tổ chức'
                placeholder='Nhập tên tổ chức'
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationInfo?.name?.message}
              </span>
            </div>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationInfo.description')}
                label='Mô tả tổ chức'
                placeholder='Mô tả tổ chức'
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationInfo?.description?.message}
              </span>
            </div>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationInfo.phoneNumber')}
                label='Số điện thoại'
                placeholder='Số điện thoại'
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationInfo?.phoneNumber?.message}
              </span>
            </div>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationInfo.email')}
                label='Địa chỉ email'
                placeholder='Địa chỉ email'
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationInfo?.email?.message}
              </span>
            </div>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationInfo.address')}
                label='Địa chỉ '
                placeholder='Địa chỉ '
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationInfo?.address?.message}
              </span>
            </div>
          </div>
        </div>
        <h2 className='text-[17px] col-span-4 mb-2'>Người đại diện</h2>
        <div className='grid grid-cols-4 gap-4'>
          <div className='col-span-1 flex flex-col items-center mx-6'>
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'></span>
          </div>
          <div className='col-span-3'>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationContactInfo.name')}
                label='Họ và tên'
                placeholder='Họ và tên'
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationContactInfo?.name?.message}
              </span>
            </div>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationContactInfo.phoneNumber')}
                label='Số điện thoại'
                placeholder='Số điện thoại'
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationContactInfo?.phoneNumber?.message}
              </span>
            </div>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationContactInfo.email')}
                label='Địa chỉ email'
                placeholder='Địa chỉ email'
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationContactInfo?.email?.message}
              </span>
            </div>
            <div className='my-2'>
              <TextField
                id='outlined-textarea'
                {...register('eventOrganizationContactInfo.address')}
                label='Địa chỉ '
                placeholder='Địa chỉ '
                className='w-full'
              />
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.eventOrganizationContactInfo?.address?.message}
              </span>
            </div>
            <div className='my-2 flex gap-10'>
              <Controller
                name='eventOrganizationContactInfo.birth'
                control={control}
                render={({ field: { onChange } }) => (
                  <div className='col-span-2'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker label='Chọn ngày sinh' className='w-full' onChange={onChange} />
                      </DemoContainer>
                    </LocalizationProvider>
                    <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                      {errors.eventOrganizationContactInfo?.birth?.message as string}
                    </span>
                  </div>
                )}
              />
              <FormControl fullWidth className='!pt-[8px]'>
                <InputLabel id='request' className='!top-[8px]'>
                  Giới tính
                </InputLabel>
                <Select labelId='request' id='selected' label='Request'>
                  <MenuItem value={10}>Nam</MenuItem>
                  <MenuItem value={20}>Nữ</MenuItem>
                </Select>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'></span>
              </FormControl>
            </div>
            <TextField
              id='outlined-textarea'
              {...register('eventOrganizationContactInfo.position')}
              label='Vị trí nhân sự '
              placeholder='Vị trí nhân sự'
              className='w-full'
            />
            <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
              {errors.eventOrganizationContactInfo?.position?.message}
            </span>
          </div>
        </div>

        <div className='col-span-4 flex justify-end gap-x-6'>
          <Button
            type='button'
            classNameButton='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold'
          >
            Làm mới
          </Button>
          <Button
            type='submit'
            classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-[90px]'
            isLoading={false}
          >
            Tạo
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default RequestEventOrganizerForm
