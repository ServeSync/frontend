/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { FieldErrors, Controller, Control } from 'react-hook-form'
import { FormRegisterEventType } from '../../utils'

interface Props {
  errors: FieldErrors<FormRegisterEventType>
  control: Control<FormRegisterEventType>
}

const TimeFrame = ({ errors, control }: Props) => {
  return (
    <Fragment>
      <Controller
        name='startTime'
        control={control}
        render={({ field: { onChange, value = null } }) => (
          <div className='col-span-2'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label='Thời gian bắt đầu'
                  className='w-full'
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
        name='startTime'
        control={control}
        render={({ field: { onChange, value = null } }) => (
          <div className='col-span-2'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['TimePicker']}>
                <TimePicker
                  label='Thời gian kết thúc'
                  className='w-full'
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
    </Fragment>
  )
}

export default TimeFrame
