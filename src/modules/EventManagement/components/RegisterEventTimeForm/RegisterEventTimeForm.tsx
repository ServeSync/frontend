/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, Controller, Control, UseFieldArrayReturn } from 'react-hook-form'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormEventType } from '../../utils'
import Button from 'src/modules/Share/components/Button'

interface Props {
  errors: FieldErrors<FormEventType>
  control: Control<FormEventType>
  FieldRegistration: UseFieldArrayReturn<FormEventType, 'registrationInfos'>
  FieldAttendance: UseFieldArrayReturn<FormEventType, 'attendanceInfos'>
}

const RegisterEventTimeForm = ({ errors, control, FieldRegistration, FieldAttendance }: Props) => {
  return (
    <div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-2'>
          <h2 className='text-[16px]'>Khung giờ đăng kí</h2>
        </div>
        {FieldRegistration.fields.map((field, index: number) => (
          <div className='grid grid-cols-9 gap-x-6' key={field.id}>
            <Controller
              name={`registrationInfos.${index}.startAt`}
              control={control}
              render={({ field: { onChange } }) => (
                <div className='col-span-4'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label='Chọn ngày bắt đầu' className='w-full' onChange={onChange} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.registrationInfos && errors.registrationInfos[index]?.startAt?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name={`registrationInfos.${index}.endAt`}
              control={control}
              render={({ field: { onChange } }) => (
                <div className='col-span-4'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label='Chọn ngày kết thúc' className='w-full' onChange={onChange} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.registrationInfos && errors.registrationInfos[index]?.endAt?.message}
                  </span>
                </div>
              )}
            />
            <div className='flex items-center justify-center'>
              {index === 0 ? (
                <Button
                  type='button'
                  classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[36px] w-[36px] rounded-lg'
                  onClick={() => FieldRegistration.append({})}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                  </svg>
                </Button>
              ) : (
                <Button
                  type='button'
                  classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[36px] w-[36px] rounded-lg'
                  onClick={() => FieldRegistration.remove(index)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-2'>
          <h2 className='text-[16px]'>Khung giờ tham gia</h2>
        </div>
        {FieldAttendance.fields.map((field, index: number) => (
          <div className='grid grid-cols-9 gap-x-6' key={field.id}>
            <Controller
              name={`attendanceInfos.${index}.startAt`}
              control={control}
              render={({ field: { onChange } }) => (
                <div className='col-span-4'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label='Chọn ngày bắt đầu' className='w-full' onChange={onChange} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.attendanceInfos && errors.attendanceInfos[index]?.startAt?.message}
                  </span>
                </div>
              )}
            />
            <Controller
              name={`attendanceInfos.${index}.endAt`}
              control={control}
              render={({ field: { onChange } }) => (
                <div className='col-span-4'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label='Chọn ngày kết thúc' className='w-full' onChange={onChange} />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.attendanceInfos && errors.attendanceInfos[index]?.endAt?.message}
                  </span>
                </div>
              )}
            />
            <div className='flex items-center justify-center'>
              {index === 0 ? (
                <Button
                  type='button'
                  classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[36px] w-[36px] rounded-lg'
                  onClick={() => FieldAttendance.append({})}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                  </svg>
                </Button>
              ) : (
                <Button
                  type='button'
                  classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[36px] w-[36px] rounded-lg'
                  onClick={() => FieldAttendance.remove(index)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RegisterEventTimeForm
