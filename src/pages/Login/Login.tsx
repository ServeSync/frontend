import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { LoginSchema, LoginSchemaType } from 'src/utils/rules'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(LoginSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='Đây là trang đăng nhập của dự án Shopee Clone' />
      </Helmet>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='mb-2'>
              Email address
            </label>
            <input
              type='text'
              id='email'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#22c55e]'
              {...register('email')}
            />
            <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-light'>{errors.email?.message}</span>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='password' className='mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='border-[1px] border-gray-200 rounded-md py-2 px-4 outline-[#16a34a]'
              autoComplete='on'
              {...register('password')}
            />
            <span className='block min-h-[16px] text-red-700 text-xs mt-1 font-light'>{errors.password?.message}</span>
          </div>
          <button type='submit' className='w-full bg-[#22c55e] p-2 rounded-md text-[14px] text-white font-semibold'>
            Sign in
          </button>
        </div>
      </form>
    </Fragment>
  )
}

export default Login
