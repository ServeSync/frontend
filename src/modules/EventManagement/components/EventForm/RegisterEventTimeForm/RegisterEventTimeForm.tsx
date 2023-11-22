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
import ModalCustom from 'src/modules/Share/components/Modal'
import { useState } from 'react'
import { StatusIsDisable } from 'src/modules/EventManagement/constants'

interface Props {
  control: Control<FormEventType>
  errors: FieldErrors<FormEventType>
  FieldRegistration: UseFieldArrayReturn<FormEventType, 'registrationInfos'>
  FieldAttendance: UseFieldArrayReturn<FormEventType, 'attendanceInfos'>
  event?: EventDetailType
}

const RegisterEventTimeForm = ({ control, errors, FieldRegistration, FieldAttendance, event }: Props) => {
  const [isOpenQRImage, setIsOpenQRImage] = useState<boolean>(false)

  const handleCloseQRImage = () => {
    setIsOpenQRImage(false)
  }

  const handleOpenQRImage = () => {
    setIsOpenQRImage(true)
  }

  return (
    <div>
      <div>
        <div className='col-span-4 flex justify-between items-center mb-2'>
          <h2 className='text-[16px]'>Khung giờ đăng kí</h2>
        </div>
        {event
          ? event.registrationInfos.map((item, index: number) => (
              <div className='grid grid-cols-12 gap-x-6 mb-2' key={item.id}>
                <Controller
                  name={`registrationInfos.${index}.startAt`}
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <div className='col-span-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeField']}>
                          <DateTimePicker
                            label='Thời gian bắt đầu'
                            format='DD/MM/YYYY HH:mm'
                            onChange={onChange}
                            value={dayjs(item.startAt)}
                            className='bg-white'
                            readOnly={StatusIsDisable(event.status) || event.hasOrganizedRegistration}
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
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <div className='col-span-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeField']}>
                          <DateTimePicker
                            label='Thời gian kết thúc'
                            format='DD/MM/YYYY HH:mm'
                            onChange={onChange}
                            value={dayjs(item.endAt)}
                            className='bg-white'
                            readOnly={StatusIsDisable(event.status) || event.hasOrganizedRegistration}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                        {error && error.message}
                      </span>
                    </div>
                  )}
                />
                <div className='flex items-center justify-end col-span-2'>
                  {index === 0 ? (
                    <Button
                      type='button'
                      classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
                      onClick={() => FieldRegistration.append({ startAt: '', endAt: '' })}
                      disabled={StatusIsDisable(event.status)}
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
                      classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
                      onClick={() => FieldRegistration.remove(index)}
                      disabled={StatusIsDisable(event.status)}
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
                        classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
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
                        classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
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
              <div className='grid grid-cols-12 gap-x-6 mb-2' key={item.id}>
                <Controller
                  name={`attendanceInfos.${index}.startAt`}
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <div className='col-span-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeField']}>
                          <DateTimePicker
                            label='Thời gian bắt đầu'
                            format='DD/MM/YYYY HH:mm'
                            onChange={onChange}
                            value={dayjs(item.startAt)}
                            className='bg-white'
                            readOnly={StatusIsDisable(event.status)}
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
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <div className='col-span-5'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateTimeField']}>
                          <DateTimePicker
                            label='Thời gian kết thúc'
                            format='DD/MM/YYYY HH:mm'
                            onChange={onChange}
                            value={dayjs(item.endAt)}
                            className='bg-white'
                            readOnly={StatusIsDisable(event.status)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                      <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                        {error && error.message}
                      </span>
                    </div>
                  )}
                />
                <div className='flex items-center justify-end col-span-2 gap-4'>
                  <Button
                    type='button'
                    classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
                    onClick={handleOpenQRImage}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z'
                      />
                    </svg>
                  </Button>
                  <ModalCustom isOpenModal={isOpenQRImage} handleClose={handleCloseQRImage}>
                    <div className='col-span-1 flex justify-center outline-none'>
                      <img src={item.qrCodeUrl} alt='Static Map' className='rounded-lg h-[500px] outline-none' />
                    </div>
                  </ModalCustom>
                  {index === 0 ? (
                    <Button
                      type='button'
                      classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
                      onClick={() => FieldAttendance.append({ startAt: '', endAt: '' })}
                      disabled={StatusIsDisable(event.status)}
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
                      classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
                      onClick={() => FieldAttendance.remove(index)}
                      disabled={StatusIsDisable(event.status)}
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
                        classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
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
                        classNameButton='flex items-center justify-center mb-3 border-[1px] border-gray-300 hover:bg-slate-200 h-[48px] w-[48px] rounded-lg'
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
