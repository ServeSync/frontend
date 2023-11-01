/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/modules/Share/contexts'
import { FormLoginSchema, FormLoginType } from '../../utils'
import { LoginCommandHandler } from '../../services'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import LoginForm from '../../components/LoginForm'
import { logo } from 'src/modules/Share/assets/image'

const Login = () => {
  const { setIsAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormLoginType>({
    resolver: yupResolver(FormLoginSchema)
  })

  const loginCommandHandler = new LoginCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    loginCommandHandler.handle(
      data,
      () => {
        setIsAuthenticated(true)
        navigate(path.dashboard)
      },
      (error: any) => {
        handleError<FormLoginType>(error, setError)
      }
    )
  })

  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='This is login page of the project' />
      </Helmet>
      <div className='grid grid-cols-2 bg-[#bdeef4] rounded-3xl w-[1000px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='col-span-1 px-10 pt-10 bg-white'>
          <div className='w-[120px] h-[120px]'>
            <img src={logo} alt='logo' className='w-full h-full' />
          </div>
          <div className='text-3xl font-normal text-[#195E8E] my-14'>
            <p>Chào bạn !</p>
            <p>Tham gia hoạt động cộng đồng cùng mình nhé ?</p>
          </div>
          <div className='mx-auto w-[300px] h-[240px]'>
            <img
              src='https://res.cloudinary.com/dboijruhe/image/upload/v1695882591/ServeSync/awcvffsmydaaiaxiptp2.png?fbclid=IwAR1GTlJhCsXaNCDrTq_fqdNzRNnKgPz5RZllTXgy4twurq3xLiVcBEhwanE'
              alt='image_login'
              className='w-full'
            />
          </div>
        </div>
        <div className='col-span-1 p-10 flex flex-col justify-center'>
          <h1 className='text-center text-[48px] text-[#195E8E] font-bold mb-[80px]'>Đăng nhập</h1>
          <form onSubmit={handleSubmitForm}>
            <LoginForm register={register} errors={errors} isLoading={loginCommandHandler.isLoading()} />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
