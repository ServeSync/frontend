import { FieldErrors, UseFormRegister } from 'react-hook-form'
import Button from 'src/modules/Share/components/Button'
import Input from 'src/modules/Share/components/Input'
import { FormRoleType } from '../../utils'

interface Props {
  register: UseFormRegister<FormRoleType>
  errors: FieldErrors<FormRoleType>
  isEditForm: boolean
  isLoading: boolean
}

const RoleForm = ({ register, errors, isEditForm, isLoading }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <Input
        register={register}
        id='name'
        name='name'
        placeholder='Nhập tên Role'
        className='relative'
        classNameInput='w-full border-[2px] border-[#26C6DA] rounded-md py-2 pl-10 pr-4 outline-none h-[48px]'
        error={errors.name?.message}
      >
        <div className='absolute left-[4px] top-[10px] cursor-pointer px-2 py-1 text-[#26C6DA]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
            />
          </svg>
        </div>
      </Input>
      <Button
        classNameButton='w-full py-2 bg-[#33b6c7] hover:bg-[#33b6c7]/80 rounded-md text-white'
        isLoading={isLoading}
      >
        {isEditForm ? 'Cập nhật role' : 'Tạo Role'}
      </Button>
    </div>
  )
}

export default RoleForm
