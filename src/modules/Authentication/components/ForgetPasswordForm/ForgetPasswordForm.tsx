import { FieldErrors, UseFormRegister } from 'react-hook-form'
import Button from 'src/modules/Share/components/Button'
import Input from 'src/modules/Share/components/Input'
import { FormForgetPasswordType } from '../../utils'
import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

interface Props {
  register: UseFormRegister<FormForgetPasswordType>
  errors: FieldErrors<FormForgetPasswordType>
  isLoading: boolean
}

const ForgetPasswordForm = ({ register, errors, isLoading }: Props) => {
  return (
    <div className='flex flex-col gap-4'>
      <Input
        register={register}
        id='userNameOrEmail'
        name='userNameOrEmail'
        placeholder='Nhập Email hoặc Mã số sinh viên'
        autoComplete='on'
        className='flex-1 relative'
        classNameInput='border-[2px] border-[#26C6DA] rounded-md py-2 pl-10 pr-4 outline-none w-full h-[48px]'
        error={errors.userNameOrEmail?.message}
      >
        <div className='absolute left-[4px] top-[8px] cursor-pointer px-2 py-1 text-[#26C6DA]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
            />
          </svg>
        </div>
      </Input>
      <div className='flex justify-end gap-2'>
        <Link
          to={path.login}
          className='flex justify-center items-center bg-[#195E8E] w-[60px] h-[50px] text-white p-2 rounded-2xl font-semibold hover:w-[70px] hover:bg-[#dd5353] transition-all duration-300'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 m-0'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
            />
          </svg>
        </Link>
        <Button
          type='submit'
          classNameButton='flex justify-center items-center bg-[#195E8E] w-[72px] h-[48px] text-white p-2 rounded-2xl font-semibold transition-all duration-300 mb-5 hover:bg-[#195E8E]/80'
          isLoading={isLoading}
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
              d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}

export default ForgetPasswordForm
