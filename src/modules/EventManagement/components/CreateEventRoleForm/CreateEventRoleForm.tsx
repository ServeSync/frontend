import { UseFormRegister, FieldErrors, Control } from 'react-hook-form'
import Button from 'src/modules/Share/components/Button'
import { FormEventRoleType } from '../../utils'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

interface Props {
  register: UseFormRegister<FormEventRoleType>
  errors: FieldErrors<FormEventRoleType>
  control: Control<FormEventRoleType>
  handleResetForm: () => void
}

const CreateEventRoleForm = ({ register, errors, handleResetForm }: Props) => {
  return (
    <div className='border-[1px] border-gray-300 p-4'>
      <div className='grid grid-cols-4 grid-rows-3  gap-x-6 gap-y-2'>
        <div className='col-span-2'>
          <TextField id='name' {...register('name')} label='Địa điểm' placeholder='Nhập địa điểm' className='w-full' />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.name?.message}</span>
        </div>
        <div className='row-span-2 col-span-2'>
          <TextField
            id='outlined-textarea'
            {...register('description')}
            label='Mô tả'
            placeholder='Nhập Mô tả'
            multiline
            rows={5}
            className='w-full '
          />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>
            {errors.description?.message}
          </span>
        </div>

        <div className='col-span-2'>
          <TextField
            id='quantity'
            {...register('quantity')}
            label='Số lượng tham gia'
            placeholder='Nhập số lượng'
            className='w-full'
          />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.quantity?.message}</span>
        </div>

        <div className='col-span-1'>
          <TextField id='point' {...register('point')} label='Điểm' placeholder='Nhập điểm' className='w-full ' />
          <span className='block min-h-[16px] text-red-600 text-xs mt-1 font-medium'>{errors.point?.message}</span>
        </div>
        <div className='col-span-1'>
          <FormControl fullWidth>
            <InputLabel id='request'>Yêu cầu duyệt</InputLabel>
            <Select labelId='request' id='selected' label='Request'>
              <MenuItem value={10}>Duyệt</MenuItem>
              <MenuItem value={20}>Không duyệt</MenuItem>
              <MenuItem value={30}>Tạm hoãn</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='col-span-1'>
          <Button
            type='button'
            classNameButton='bg-gray-300 py-2 px-4 rounded-lg text-[14px] text-gray-800 font-semibold w-full h-[52px]'
            onClick={handleResetForm}
          >
            Làm mới
          </Button>
        </div>
        <div className='col-span-1'>
          <Button
            type='submit'
            classNameButton='bg-[#26C6DA] py-2 px-4 rounded-lg text-[14px] text-white font-semibold w-full h-[52px]'
            isLoading={false}
          >
            Thêm vai trò
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateEventRoleForm
