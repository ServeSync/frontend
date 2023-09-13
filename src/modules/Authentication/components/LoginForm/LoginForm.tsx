import { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

interface LoginForm {
  userNameOrEmail: string
  password: string
}

interface Props {
  register: UseFormRegister<LoginForm>
  errors: FieldErrors<LoginForm>
}

const LoginForm = ({ register, errors }: Props) => {
  const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(true)

  const toggleIsHiddenPassword = () => {
    setIsHiddenPassword((prev) => !prev)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col relative'>
        <input
          type='text'
          id='email'
          placeholder='Email hoặc MSSV'
          className='border-[2px] border-[#26C6DA] rounded-lg py-2 pl-10 pr-4 outline-none'
          {...register('userNameOrEmail')}
        />
        <div className='absolute left-[4px] top-[6px] cursor-pointer px-2 py-1 text-[#26C6DA]'>
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
        <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-normal'>
          {errors.userNameOrEmail?.message}
        </span>
      </div>
      <div className='flex flex-col relative'>
        <input
          type={isHiddenPassword ? 'password' : 'text'}
          id='password'
          placeholder='Mật khẩu'
          className='border-[2px] border-[#26C6DA] rounded-lg py-2 pl-10 pr-4 outline-none'
          autoComplete='on'
          {...register('password')}
        />
        <div className='absolute left-[4px] top-[6px] cursor-pointer px-2 py-1 text-[#26C6DA]'>
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
              d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
          </svg>
        </div>
        {isHiddenPassword ? (
          <button
            type='button'
            onClick={toggleIsHiddenPassword}
            className='absolute right-[4px] top-[5px] cursor-pointer px-2 py-1 text-[#26C6DA]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
              />
            </svg>
          </button>
        ) : (
          <button
            type='button'
            onClick={toggleIsHiddenPassword}
            className='absolute right-[4px] top-[5px] cursor-pointer px-2 py-1 text-[#26C6DA]'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
              />
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </button>
        )}
        <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-normal'>{errors.password?.message}</span>
      </div>
      <Link
        to={path.forget_password}
        className='text-[16px] text-right text-[#195E8E] font-semibold mb-4 hover:text-[#195E8E]/70'
      >
        Quên mật khẩu ?
      </Link>
      <button
        type='submit'
        className='w-full bg-[#195E8E] hover:bg-[#195E8E]/90 p-2 rounded-2xl text-[20px] text-white font-semibold'
      >
        Đăng nhập
      </button>
    </div>
  )
}

export default LoginForm
