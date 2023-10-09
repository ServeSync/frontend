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
        navigate(path.home)
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
      <div className='flex items-center bg-[#bdeef4] rounded-3xl w-[1000px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='max-w-[500] w-[50%] px-10 pt-10 bg-white'>
          <img
            src='https://res.cloudinary.com/dboijruhe/image/upload/v1695882589/ServeSync/otodujgypsfzvckrjxbs.png?fbclid=IwAR1kfuOQs4sJ47uIw3RZddFsFkzJYcWvYNdEdHEfwcp6BAFqDTIhdkpw72A'
            alt='logo'
            className='w-[120px] h-[120px]'
          />
          <div className='text-3xl font-normal text-[#195E8E] my-14'>
            <p>Chào bạn !</p>
            <p>Tham gia hoạt động cộng đồng cùng mình nhé ?</p>
          </div>
          <img
            src='https://res.cloudinary.com/dboijruhe/image/upload/v1695882591/ServeSync/awcvffsmydaaiaxiptp2.png?fbclid=IwAR1GTlJhCsXaNCDrTq_fqdNzRNnKgPz5RZllTXgy4twurq3xLiVcBEhwanE'
            alt='image_login'
            className='mx-auto'
          />
        </div>
        <div className='max-w-[500px] w-[50%] p-10'>
          <h1 className='text-center text-[48px] font-bold mb-[80px]'>Đăng nhập</h1>
          <form onSubmit={handleSubmitForm}>
            <LoginForm register={register} errors={errors} isLoading={loginCommandHandler.isLoading()} />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Login
