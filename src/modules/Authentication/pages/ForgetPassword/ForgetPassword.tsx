/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { FormForgetPasswordSchema, FormForgetPasswordType } from '../../utils'
import { handleError } from 'src/modules/Share/utils'
import { ForgetPasswordCommandHandler } from '../../services'
import ForgetPasswordForm from '../../components/ForgetPasswordForm'
import { global_image, logo } from 'src/modules/Share/assets/image'
import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormForgetPasswordType>({
    resolver: yupResolver(FormForgetPasswordSchema)
  })

  const forgetPasswordCommandHandler = new ForgetPasswordCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    forgetPasswordCommandHandler.handle(
      data,
      () => {
        Swal.fire('Thành công !', 'Vui lòng kiểm tra email để lấy lại mật khẩu !', 'success')
      },
      (error: any) => {
        handleError<FormForgetPasswordType>(error, setError)
      }
    )
  })

  return (
    <Fragment>
      <Helmet>
        <title>Forget Password</title>
        <meta name='description' content='This is forget password page of the project' />
      </Helmet>
      <div className='grid grid-cols-2 bg-white rounded-3xl lg:w-[1000px] md:w-[700px] max-md:w-[320px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='col-span-1 px-10 pt-10 bg-[#bdeef4] rounded-e-full flex items-center justify-center'>
          <img src={global_image} alt='image_login' className='md:w-[300px] max-md:w-[150px]' />
        </div>
        <div className='col-span-1 lg:px-10 lg:py-20 md:px-5 md:py-10 max-md:px-4 max-md:py-6 flex flex-col justify-center'>
          <Link to={path.home_page} className='flex justify-center mb-8'>
            <img
              src={logo}
              alt='logo'
              className='lg:w-[80px] lg:h-[80px] md:w-[60px] md:h-[60px] max-md:w-[40px] max-md:h-[40px]'
            />
          </Link>
          <div className='md:mb-[40px] max-md:mb-[20px] text-center'>
            <h1 className='lg:text-[40px] md:text-[30px] max-md:text-[18px] text-[#195E8E] font-bold mb-[20px]'>
              Quên mật khẩu ?
            </h1>
            <h2 className='text-[#195E8E] lg:text-[16px] md:text-[12px] max-md:text-[8px]'>
              Hệ thống quản lý hoạt động cộng đồng.
            </h2>
          </div>
          <form onSubmit={handleSubmitForm}>
            <ForgetPasswordForm
              register={register}
              errors={errors}
              isLoading={forgetPasswordCommandHandler.isLoading()}
            />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ForgetPassword
