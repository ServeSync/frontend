import { useState } from 'react'
import classNames from 'classnames'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface ForgetPasswordForm {
  userNameOrEmail: string
}
interface Props {
  register: UseFormRegister<ForgetPasswordForm>
  errors: FieldErrors<ForgetPasswordForm>
}
const ForgetPasswordForm = ({ register, errors }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <div className='flex flex-col w-full'>
      <div className='flex justify-between items-center gap-6 relative'>
        <input
          id='email'
          placeholder='Nhập Username hoặc Email '
          className='border-[2px] w-full border-[#26C6DA] rounded-lg py-2 pl-4 pr-4 outline-none'
          autoComplete='on'
          {...register('userNameOrEmail')}
        />
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
      <span className='block text-red-700 text-xs mt-1 pl-2 font-normal'>{errors.userNameOrEmail?.message}</span>
    </div>
  )
}

export default ForgetPasswordForm
