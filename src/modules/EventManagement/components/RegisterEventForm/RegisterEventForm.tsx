/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister, FieldErrors, Controller, Control } from 'react-hook-form'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Button from 'src/modules/Share/components/Button'
import TimeFrame from '../TimeFrame'
import { useId, useState } from 'react'
import { FormRegisterEventType } from '../../utils'

interface Props {
  register: UseFormRegister<FormRegisterEventType>
  errors: FieldErrors<FormRegisterEventType>
  control: Control<FormRegisterEventType>
  handleResetForm: () => void
}

const RegisterEventForm = ({ errors, control, handleResetForm }: Props) => {
  const id = useId()
  const [timeFrame, setTimeFrame] = useState([<TimeFrame key={id} errors={errors} control={control} />])

  const createTimeFrame = () => {
    const newChild = <TimeFrame key={id} errors={errors} control={control} />
    setTimeFrame([...timeFrame, newChild])
  }

  return (
    <div>
      <div className='grid grid-cols-4 gap-x-6'>
        <h2 className='text-[16px] col-span-4 mb-2'>Khung giờ đăng kí</h2>
        <Controller
          name='startTime'
          control={control}
          render={({ field: { onChange } }) => (
            <div className='col-span-2'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label='Chọn ngày bắt đầu' className='w-full' onChange={onChange} />
                </DemoContainer>
              </LocalizationProvider>
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.startDate?.message as string}
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
                  <DatePicker label='Chọn ngày kết thúc' className='w-full' onChange={onChange} />
                </DemoContainer>
              </LocalizationProvider>
              <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                {errors.endDate?.message as string}
              </span>
            </div>
          )}
        />
      </div>
      <div className='grid grid-cols-4 gap-x-6'>
        <div className='col-span-4 flex justify-between items-end'>
          <h2 className='text-[16px] col-span-4 mb-2'>Khung giờ điểm danh</h2>
          <Button
            type='button'
            classNameButton='bg-gray-300 py-2 px-2 rounded-lg text-[14px] text-gray-800 font-semibold'
            onClick={createTimeFrame}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
            </svg>
          </Button>
        </div>
        {timeFrame}
        <div className='col-span-4 flex justify-end gap-6'>
          <Button
            type='button'
            classNameButton='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold mt-6'
            onClick={handleResetForm}
          >
            Làm mới
          </Button>
          <Button
            type='submit'
            classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold mt-6 w-[90px]'
            isLoading={false}
          >
            Tạo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterEventForm
