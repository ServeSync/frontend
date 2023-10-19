import { UseFormRegister, FieldErrors, Control, Controller, UseFormGetValues, UseFormResetField } from 'react-hook-form'
import { FormEventType } from '../../utils'
import { Autocomplete, TextField } from '@mui/material'
import Button from 'src/modules/Share/components/Button'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { isNeedApprove } from '../../constants'
import { EventRole } from '../../interfaces'

interface Props {
  register: UseFormRegister<FormEventType>
  errors: FieldErrors<FormEventType>
  control: Control<FormEventType>
  getValues: UseFormGetValues<FormEventType>
  resetField: UseFormResetField<FormEventType>
  dataEventRole: EventRole[]
  setDataEventRole: React.Dispatch<React.SetStateAction<EventRole[]>>
}

const RegisterEventRoleForm = ({
  register,
  errors,
  control,
  getValues,
  resetField,
  dataEventRole,
  setDataEventRole
}: Props) => {
  const handleAddEventRole = () => {
    const data = { ...getValues('roles') }
    setDataEventRole([...dataEventRole, data])
    resetField('roles.name')
    resetField('roles.description')
    resetField('roles.quantity')
    resetField('roles.score')
    resetField('roles.isNeedApprove')
  }

  const handleResetForm = () => {
    resetField('roles.name')
    resetField('roles.description')
    resetField('roles.quantity')
    resetField('roles.score')
    resetField('roles.isNeedApprove')
  }

  return (
    <div className='border-[1px] border-gray-300 p-4'>
      <div className='grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-2'>
        <div className='col-span-2'>
          <TextField
            id='name'
            {...register('roles.name')}
            label='Vai trò'
            placeholder='Nhập vai trò'
            className='w-full'
          />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
            {errors.roles?.name?.message}
          </span>
        </div>
        <div className='col-span-2 row-span-2'>
          <TextField
            id='outlined-textarea'
            {...register('roles.description')}
            label='Mô tả'
            placeholder='Nhập Mô tả'
            multiline
            rows={4.7}
            className='w-full'
          />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
            {errors.roles?.description?.message}
          </span>
        </div>
        <div className='col-span-2'>
          <TextField
            id='quantity'
            {...register('roles.quantity')}
            label='Số lượng tham gia'
            placeholder='Nhập số lượng'
            className='w-full'
          />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
            {errors.roles?.quantity?.message}
          </span>
        </div>
        <div className='col-span-1'>
          <TextField id='score' {...register('roles.score')} label='Điểm' placeholder='Nhập điểm' className='w-full ' />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
            {errors.roles?.score?.message}
          </span>
        </div>
        <div className='col-span-1'>
          <Controller
            name={'roles.isNeedApprove'}
            control={control}
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className='col-span-4'>
                  <Autocomplete
                    disablePortal
                    id='isNeedApprove'
                    options={isNeedApprove}
                    value={isNeedApprove.find((option) => option.id === value) || null}
                    getOptionLabel={(option) => option.name}
                    noOptionsText='Không có lựa chọn'
                    renderInput={(params) => <TextField {...params} label='Yêu cầu duyệt' />}
                    onChange={(_, option) => onChange(option ? option.id : '')}
                    className='bg-white'
                  />
                  <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
                    {errors.roles?.isNeedApprove?.message}
                  </span>
                </div>
              </LocalizationProvider>
            )}
          />
        </div>
        <div className='flex justify-end col-span-2 gap-4 items-center'>
          <Button
            type='button'
            classNameButton='bg-gray-300   py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[40px]'
            onClick={handleResetForm}
          >
            Làm mới
          </Button>
          <Button
            type='button'
            classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold h-[40px]'
            onClick={handleAddEventRole}
          >
            Thêm vai trò
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterEventRoleForm
