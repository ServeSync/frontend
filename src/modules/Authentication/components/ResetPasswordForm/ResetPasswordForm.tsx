import classNames from 'classnames'
import { useState } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

interface ResetPasswordForm {
  newPassword: string
  confirmPassword: string
}

interface Props {
  register: UseFormRegister<ResetPasswordForm>
  errors: FieldErrors<ResetPasswordForm>
}

const ResetPasswordForm = ({ register, errors }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <div>
            <input
              id='new_password'
              type='password'
              placeholder='Nhập mật khẩu mới'
              className='border-[2px] w-full border-[#26C6DA] rounded-lg py-2 pl-4 pr-4 outline-none'
              autoComplete='on'
              {...register('newPassword')}
            />
            <span className='block text-red-700 text-xs mt-1 pl-2 font-normal'>{errors.newPassword?.message}</span>
          </div>
          <div>
            <input
              id='confirm_password'
              type='password'
              placeholder='Nhập mật khẩu mới'
              className='border-[2px] w-full border-[#26C6DA] rounded-lg py-2 pl-4 pr-4 outline-none'
              autoComplete='on'
              {...register('confirmPassword')}
            />
            <span className='block text-red-700 text-xs mt-1 pl-2 font-normal'>{errors.confirmPassword?.message}</span>
          </div>
        </div>
        <div className='flex justify-end gap-2'>
          <Link
            to={path.login}
            className='flex justify-center items-center bg-[#195E8E] w-[60px] min-h-[50px] text-white p-2 rounded-2xl font-semibold hover:w-[70px] hover:bg-red-600 transition-all duration-300'
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
          <button
            type='submit'
            className={classNames(
              ' flex justify-center items-center bg-[#195E8E] w-[60px] min-h-[50px] text-white p-2 rounded-2xl font-semibold transition-all duration-300',
              {
                'hover:bg-[#195E8E]/90': isHovered,
                'hover:w-[80px]': isHovered
              }
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
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
            ) : (
              'Gửi'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordForm
