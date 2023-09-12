import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { LoginSchema, LoginType } from '../../utils/rules'
import LoginInput from '../../components/LoginForm'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: yupResolver(LoginSchema)
  })

  const handleOnSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='This is login page of the project' />
      </Helmet>
      <div className='flex items-center bg-[#bdeef4] rounded-3xl w-[1000px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='max-w-[500] w-[50%] px-10 pt-10 bg-white'>
          <img src='src/modules/Share/assets/images/logo.png' alt='logo' className='w-[120px] h-[120px]' />
          <div className='text-3xl font-normal text-[#195E8E] my-14'>
            <p>Chào bạn !</p>
            <p>Tham gia hoạt động cộng đồng cùng mình nhé ?</p>
          </div>
          <img src='src/modules/Share/assets/images/login_image.png' alt='image_login' className='mx-auto' />
        </div>
        <div className='max-w-[500px] w-[50%] p-10'>
          <h1 className='text-center text-[48px] font-bold mb-[80px]'>Đăng nhập</h1>
          <form onSubmit={handleOnSubmit}>
            <LoginInput register={register} errors={errors} />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
