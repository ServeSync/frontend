import { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from 'src/modules/Share/components/Button'
import Input from 'src/modules/Share/components/Input'
import path from 'src/modules/Share/constants/path'
import { FormResetPasswordType } from '../../utils'

interface Props {
  register: UseFormRegister<FormResetPasswordType>
  errors: FieldErrors<FormResetPasswordType>
  isLoading: boolean
}

const ResetPasswordForm = ({ register, errors, isLoading }: Props) => {
  const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(true)

  return (
    <div className='flex flex-col lg:gap-4 md:gap-2 max-md:gap-1'>
      <div className='flex flex-col lg:gap-4 md:gap-2 max-md:gap-1'>
        <Input
          register={register}
          id='new_password'
          name='newPassword'
          placeholder='Nhập mật khẩu mới'
          type={isHiddenPassword ? 'password' : 'text'}
          autoComplete='on'
          className='flex flex-col relative'
          classNameInput='border-[2px] border-[#26C6DA] rounded-md lg:py-2 md:pl-10 max-md:pl-4 pr-4 outline-none w-full lg:h-[48px] md:h-[36px] max-md:h-[24px] lg:text-[16px] md:text-[12px] max-md:text-[6px]'
          error={errors.newPassword?.message}
        >
          <div className='absolute lg:left-[4px] lg:top-[8px] md:top-[4px] md:left-[5px] max-md:top-[2px] max-md:left-[-4px] cursor-pointer px-2 py-1 text-[#26C6DA]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-3 max-md:h-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
          </div>
          {isHiddenPassword ? (
            <Button
              type='button'
              classNameButton='absolute lg:right-[4px] lg:top-[8px] md:right-[2px] md:top-[4px] max-md:right-[1px] max-md:top-[2.5px] cursor-pointer px-2 py-1 text-[#26C6DA]'
              onClick={() => setIsHiddenPassword(!isHiddenPassword)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-3 max-md:h-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            </Button>
          ) : (
            <Button
              type='button'
              classNameButton='absolute lg:right-[4px] lg:top-[8px] md:right-[2px] md:top-[4px] max-md:right-[1px] max-md:top-[2.5px] cursor-pointer px-2 py-1 text-[#26C6DA]'
              onClick={() => setIsHiddenPassword(!isHiddenPassword)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-3 max-md:h-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </Button>
          )}
        </Input>
        <Input
          register={register}
          id='confirm_password'
          name='confirmPassword'
          placeholder='Xác nhận mật khẩu'
          type={isHiddenPassword ? 'password' : 'text'}
          autoComplete='on'
          className='flex flex-col relative'
          classNameInput='border-[2px] border-[#26C6DA] rounded-md lg:py-2 md:pl-10 max-md:pl-4 pr-4 outline-none w-full lg:h-[48px] md:h-[36px] max-md:h-[24px] lg:text-[16px] md:text-[12px] max-md:text-[6px]'
          error={errors.confirmPassword?.message}
        >
          <div className='absolute lg:left-[4px] lg:top-[8px] md:top-[4px] md:left-[5px] max-md:top-[2px] max-md:left-[-4px] cursor-pointer px-2 py-1 text-[#26C6DA]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-3 max-md:h-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
              />
            </svg>
          </div>
          {isHiddenPassword ? (
            <Button
              type='button'
              classNameButton='absolute lg:right-[4px] lg:top-[8px] md:right-[2px] md:top-[4px] max-md:right-[1px] max-md:top-[2.5px] cursor-pointer px-2 py-1 text-[#26C6DA]'
              onClick={() => setIsHiddenPassword(!isHiddenPassword)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-3 max-md:h-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            </Button>
          ) : (
            <Button
              type='button'
              classNameButton='absolute lg:right-[4px] lg:top-[8px] md:right-[2px] md:top-[4px] max-md:right-[1px] max-md:top-[2.5px] cursor-pointer px-2 py-1 text-[#26C6DA]'
              onClick={() => setIsHiddenPassword(!isHiddenPassword)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-3 max-md:h-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            </Button>
          )}
        </Input>
      </div>
      <div className='flex justify-end gap-2'>
        <Link
          to={path.login}
          className='flex justify-center items-center bg-[#195E8E] md:w-[60px] md:h-[50px] max-md:w-[40px] max-md:h-[30px] text-white lg:p-2 md:rounded-2xl max-md:rounded-xl font-semibold md:hover:w-[70px] max-md:hover:w-[50px] hover:bg-[#dd5353] transition-all duration-300'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-3 max-md:h-3 m-0'
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
          classNameButton='flex justify-center items-center bg-[#195E8E] md:w-[70px] md:h-[50px] max-md:w-[40px] max-md:h-[30px] text-white p-2 md:rounded-2xl max-md:rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/80'
          isLoading={isLoading}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='lg:w-6 lg:h-6 md:w-5 md:h-5 max-md:w-3 max-md:h-3'
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

export default ResetPasswordForm
