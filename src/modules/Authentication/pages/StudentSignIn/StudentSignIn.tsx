/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/modules/Share/contexts'
import { FormSignInSchema, FormSignInType } from '../../utils'
import { StudentSignInCommandHandler } from '../../services'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import { global_image, logo } from 'src/modules/Share/assets/image'
import StudentSignInForm from '../../components/StudentSignInForm'

const StudentSignIn = () => {
  const { setIsAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormSignInType>({
    resolver: yupResolver(FormSignInSchema)
  })

  const studentSignInCommandHandler = new StudentSignInCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    studentSignInCommandHandler.handle(
      data,
      () => {
        setIsAuthenticated(true)
        navigate(path.home_page)
      },
      (error: any) => {
        handleError<FormSignInType>(error, setError)
      }
    )
  })

  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='This is login page of the project' />
      </Helmet>
      <div className='grid grid-cols-2 bg-[#bdeef4] rounded-3xl lg:w-[1000px] md:w-[700px] max-md:w-[320px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='col-span-1 px-10 lg:pt-10 md:pt-5 max-md:pt-3 bg-white rounded-e-full flex items-center justify-center'>
          <img src={global_image} alt='image_login' className='md:w-[300px] max-md:w-[150px]' />
        </div>
        <div className='col-span-1 lg:px-10 lg:py-20 md:px-5 md:py-10 max-md:px-4 max-md:py-6 flex flex-col justify-center'>
          <Link to={path.home_page} className=' flex justify-center mb-4'>
            <img
              src={logo}
              alt='logo'
              className='lg:w-[80px] lg:h-[80px] md:w-[60px] md:h-[60px] max-md:w-[40px] max-md:h-[40px]'
            />
          </Link>
          <div className='md:mb-[20px] max-md:mb-[10px] text-center'>
            <h1 className='lg:text-[40px] md:text-[30px] max-md:text-[18px] text-[#195E8E] font-bold mb-[10px]'>
              Đăng nhập
            </h1>
            <h2 className='text-[#195E8E] lg:text-[16px] max-md:text-[12px] '>Tham gia hoạt động cộng đồng.</h2>
          </div>
          <form onSubmit={handleSubmitForm}>
            <StudentSignInForm
              register={register}
              errors={errors}
              isLoading={studentSignInCommandHandler.isLoading()}
            />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default StudentSignIn
