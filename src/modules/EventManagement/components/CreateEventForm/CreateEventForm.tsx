/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TextField } from '@mui/material'
import Button from 'src/modules/Share/components/Button'
import Select from 'src/modules/Share/components/Select'
import { FormEventType } from '../../utils'

interface Props {
  register: UseFormRegister<FormEventType>
  errors: FieldErrors<FormEventType>
  control: Control<FormEventType>
  handleResetForm: () => void
}

const CreateEventForm = ({ register, errors, control, handleResetForm }: Props) => {
  return (
    <div>
      <div className='flex flex-col gap-y-2 max-w-[800px] mx-auto'>
        <h2 className='text-[17px] col-span-4 mb-2'>Thông tin chi tiết</h2>
        <div className='grid grid-cols-4 gap-x-6 gap-y-2'>
          <Controller
            name='startTime'
            control={control}
            render={({ field: { onChange, value = null } }) => (
              <div className='col-span-2'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      label='Thời gian bắt đầu'
                      className='w-full bg-white'
                      onChange={onChange}
                      ampm={false}
                      value={value}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.startTime?.message as string}
                </span>
              </div>
            )}
          />
          <Controller
            name='startDate'
            control={control}
            render={({ field: { onChange } }) => (
              <div className='col-span-2'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label='Chọn ngày bắt đầu'
                      className='w-full bg-white'
                      onChange={onChange}
                      format='DD/MM/YYYY'
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium '>
                  {errors.startDate?.message as string}
                </span>
              </div>
            )}
          />
          <Controller
            name='endTime'
            control={control}
            render={({ field: { onChange, value = null } }) => (
              <div className='col-span-2'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      label='Thời gian kết thúc'
                      className='w-full bg-white'
                      onChange={onChange}
                      ampm={false}
                      value={value}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.endTime?.message as string}
                </span>
              </div>
            )}
          />
          <Controller
            name='endDate'
            control={control}
            render={({ field: { onChange } }) => (
              <div className='col-span-2'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label='Chọn ngày kết thúc'
                      className='w-full bg-white'
                      onChange={onChange}
                      format='DD/MM/YYYY'
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                  {errors.endDate?.message as string}
                </span>
              </div>
            )}
          />
        </div>
        <div className='grid grid-cols-3 gap-x-6'>
          <Select
            register={register}
            id='type_event'
            name='typeId'
            className='col-span-1 flex flex-col'
            classNameSelect={classNames('border-[1px] border-gray-300 rounded px-4 outline-[#1976d2] h-[48px]', {
              'border-red-600 outline-red-600': errors.typeId?.message !== '' && errors.typeId
            })}
            defaultOptions='Chọn loại sự kiện'
            error={errors.typeId?.message as string}
          />
          <Select
            register={register}
            id='category'
            name='categoryId'
            className='col-span-1 flex flex-col'
            classNameSelect={classNames('border-[1px] border-gray-300 rounded px-4 outline-[#1976d2] h-[48px]', {
              'border-red-600 outline-red-600': errors.categoryId?.message !== '' && errors.categoryId
            })}
            defaultOptions='Chọn danh mục'
            error={errors.categoryId?.message as string}
          />
          <Select
            register={register}
            id='activity'
            name='activityId'
            className='col-span-1 flex flex-col'
            classNameSelect={classNames('border-[1px] border-gray-300 rounded px-4 outline-[#1976d2] h-[48px]', {
              'border-red-600 outline-red-600': errors.activityId?.message !== '' && errors.activityId
            })}
            defaultOptions='Chọn hoạt động'
            error={errors.activityId?.message as string}
          />
        </div>
        <div className='my-2'>
          <TextField
            id='outlined-textarea'
            {...register('position')}
            label='Địa điểm'
            placeholder='Nhập địa điểm'
            className='w-full'
          />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.position?.message}</span>
        </div>
        <div className='mb-2'>
          <TextField
            id='outlined-textarea'
            {...register('description')}
            label='Mô tả chi tiết'
            placeholder='Mô tả chi tiết'
            multiline
            rows={8}
            className='w-full'
          />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.position?.message}</span>
        </div>
        <div className='col-span-4 flex justify-end gap-x-6'>
          <Button
            type='button'
            classNameButton='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold'
            onClick={handleResetForm}
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
    </div>
  )
}

export default CreateEventForm
