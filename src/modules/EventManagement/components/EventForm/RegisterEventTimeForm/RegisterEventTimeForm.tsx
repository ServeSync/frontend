/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, UseFieldArrayReturn, FieldErrors } from 'react-hook-form'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers'
import { FormEventType } from '../../../utils'
import Button from 'src/modules/Share/components/Button'
import { EventDetailType } from 'src/modules/EventManagement/interfaces'
import dayjs from 'dayjs'

interface Props {
  control: Control<FormEventType>
  errors: FieldErrors<FormEventType>
  FieldRegistration: UseFieldArrayReturn<FormEventType, 'registrationInfos'>
  FieldAttendance: UseFieldArrayReturn<FormEventType, 'attendanceInfos'>
  event?: EventDetailType
}

const RegisterEventTimeForm = ({ control, errors, FieldRegistration, FieldAttendance, event }: Props) => {
  return (
    <div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-2'>
          <h2 className='text-[16px]'>Khung giờ đăng kí</h2>
        </div>
        {event
          ? event.registrationInfos.map((item, index: number) => (
              <div className='grid grid-cols-11 gap-x-6 mb-2' key={item.id}>
                <Controller
                  name={`registrationInfos.${index}.startAt`}
                  control={control}
                  render={({ field: { onChange, value = dayjs(item.startAt) }, fieldState: { error } }) => (
                    <div className='col-span-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeField']}>
                          <DateTimePicker
                            label='Thời gian bắt đầu'
                            format='DD/MM/YYYY HH:mm'
                            onChange={onChange}
                            value={value}
                            className='bg-white'
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                        {error && error.message}
                        {errors.registrationInfos?.message}
                      </span>
                    </div>
                  )}
                />
                <Controller
                  name={`registrationInfos.${index}.endAt`}
                  control={control}
                  render={({ field: { onChange, value = dayjs(item.endAt) }, fieldState: { error } }) => (
                    <div className='col-span-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeField']}>
                          <DateTimePicker
                            label='Thời gian kết thúc'
                            format='DD/MM/YYYY HH:mm'
                            onChange={onChange}
                            value={value}
                            className='bg-white'
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                        {error && error.message}
                      </span>
                    </div>
                  )}
                />
                <div className='flex items-center justify-end'>
                  {index === 0 ? (
                    <Button
                      type='button'
                      classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[56px] w-[56px] rounded-lg'
                      onClick={() => FieldRegistration.append({ startAt: '', endAt: '' })}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-7 h-7'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                      </svg>
                    </Button>
                  ) : (
                    <Button
                      type='button'
                      classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[56px] w-[56px] rounded-lg'
                      onClick={() => FieldRegistration.remove(index)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </Button>
                  )}
                </div>
              </div>
            ))
          : FieldRegistration.fields.map((field, index: number) => (
              <div key={field.id}>
                <div className='grid grid-cols-11 gap-x-6 mb-2'>
                  <Controller
                    name={`registrationInfos.${index}.startAt`}
                    control={control}
                    render={({ field: { onChange, value = null }, fieldState: { error } }) => (
                      <div className='col-span-5'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimeField']}>
                            <DateTimePicker
                              label='Thời gian bắt đầu'
                              format='DD/MM/YYYY HH:mm'
                              onChange={onChange}
                              value={value}
                              className='bg-white'
                            />
                          </DemoContainer>
                        </LocalizationProvider>

                        <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                          {error && error.message}
                          {errors.registrationInfos?.message}
                        </span>
                      </div>
                    )}
                  />
                  <Controller
                    name={`registrationInfos.${index}.endAt`}
                    control={control}
                    render={({ field: { onChange, value = null }, fieldState: { error } }) => (
                      <div className='col-span-5'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimeField']}>
                            <DateTimePicker
                              label='Thời gian kết thúc'
                              format='DD/MM/YYYY HH:mm'
                              onChange={onChange}
                              value={value}
                              className='bg-white'
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                          {error && error.message}
                        </span>
                      </div>
                    )}
                  />
                  <div className='flex items-center justify-end'>
                    {index === 0 ? (
                      <Button
                        type='button'
                        classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[56px] w-[56px] rounded-lg'
                        onClick={() => FieldRegistration.append({ startAt: '', endAt: '' })}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-7 h-7'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                        </svg>
                      </Button>
                    ) : (
                      <Button
                        type='button'
                        classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[56px] w-[56px] rounded-lg'
                        onClick={() => FieldRegistration.remove(index)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-2'>
          <h2 className='text-[16px]'>Khung giờ điểm danh</h2>
        </div>
        {event
          ? event.attendanceInfos.map((item, index: number) => (
              <div className='grid grid-cols-11 gap-x-6 mb-2' key={item.id}>
                <Controller
                  name={`attendanceInfos.${index}.startAt`}
                  control={control}
                  render={({ field: { onChange, value = dayjs(item.startAt) }, fieldState: { error } }) => (
                    <div className='col-span-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeField']}>
                          <DateTimePicker
                            label='Thời gian bắt đầu'
                            format='DD/MM/YYYY HH:mm'
                            onChange={onChange}
                            value={value}
                            className='bg-white'
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                        {error && error.message}
                        {errors.attendanceInfos?.message}
                      </span>
                    </div>
                  )}
                />
                <Controller
                  name={`attendanceInfos.${index}.endAt`}
                  control={control}
                  render={({ field: { onChange, value = dayjs(item.endAt) }, fieldState: { error } }) => (
                    <div className='col-span-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeField']}>
                          <DateTimePicker
                            label='Thời gian kết thúc'
                            format='DD/MM/YYYY HH:mm'
                            onChange={onChange}
                            value={value}
                            className='bg-white'
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                        {error && error.message}
                      </span>
                    </div>
                  )}
                />
                <div className='flex items-center justify-end'>
                  {index === 0 ? (
                    <Button
                      type='button'
                      classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[56px] w-[56px] rounded-lg'
                      onClick={() => FieldAttendance.append({ startAt: '', endAt: '' })}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-7 h-7'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                      </svg>
                    </Button>
                  ) : (
                    <Button
                      type='button'
                      classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[56px] w-[56px] rounded-lg'
                      onClick={() => FieldAttendance.remove(index)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                      </svg>
                    </Button>
                  )}
                </div>
              </div>
            ))
          : FieldAttendance.fields.map((field, index: number) => (
              <div key={field.id}>
                <div className='grid grid-cols-11 gap-x-6 mb-2'>
                  <Controller
                    name={`attendanceInfos.${index}.startAt`}
                    control={control}
                    render={({ field: { onChange, value = null }, fieldState: { error } }) => (
                      <div className='col-span-5'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimeField']}>
                            <DateTimePicker
                              label='Thời gian bắt đầu'
                              format='DD/MM/YYYY HH:mm'
                              onChange={onChange}
                              value={value}
                              className='bg-white'
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                          {error && error.message}
                          {errors.attendanceInfos?.message}
                        </span>
                      </div>
                    )}
                  />
                  <Controller
                    name={`attendanceInfos.${index}.endAt`}
                    control={control}
                    render={({ field: { onChange, value = null }, fieldState: { error } }) => (
                      <div className='col-span-5'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={['DateTimeField']}>
                            <DateTimePicker
                              label='Thời gian kết thúc'
                              format='DD/MM/YYYY HH:mm'
                              onChange={onChange}
                              value={value}
                              className='bg-white'
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                          {error && error.message}
                        </span>
                      </div>
                    )}
                  />
                  <div className='flex items-center justify-end'>
                    {index === 0 ? (
                      <Button
                        type='button'
                        classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[56px] w-[56px] rounded-lg'
                        onClick={() => FieldAttendance.append({ startAt: '', endAt: '' })}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-7 h-7'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
                        </svg>
                      </Button>
                    ) : (
                      <Button
                        type='button'
                        classNameButton='flex items-center justify-center mb-4 border-[1px] border-gray-300 hover:bg-slate-200 h-[56px] w-[56px] rounded-lg'
                        onClick={() => FieldAttendance.remove(index)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default RegisterEventTimeForm
