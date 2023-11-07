/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormResetPasswordSchema, FormResetPasswordType } from '../../utils'
import { ResetPasswordCommandHandler } from '../../services'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import ResetPasswordForm from '../../components/ResetPasswordForm'
import { global_image, logo } from 'src/modules/Share/assets/image'

const ResetPassword = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormResetPasswordType>({
    resolver: yupResolver(FormResetPasswordSchema)
  })

  const resetPasswordCommandHandler = new ResetPasswordCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    resetPasswordCommandHandler.handle(
      data.newPassword,
      () => {
        toast.success('Đổi mật khẩu thành công !'), navigate(path.login)
      },
      (error: any) => {
        handleError<FormResetPasswordType>(error)
      }
    )
  })

  return (
    <Fragment>
      <Helmet>
        <title>Reset Password</title>
        <meta name='description' content='This is reset password page of the project' />
      </Helmet>
      <div className='grid grid-cols-2 bg-[#bdeef4] rounded-3xl w-[1000px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='col-span-1 flex items-center justify-center bg-white rounded-e-full'>
          <img src={global_image} alt='image_login' className='mx-auto w-[300px]' />
        </div>
        <div className='col-span-1 p-10 flex flex-col justify-center'>
          <Link to={path.home_page} className='flex justify-center mb-4'>
            <img src={logo} alt='logo' className='w-[120px] h-[120px]' />
          </Link>
          <div className='mb-16 text-center'>
            <h1 className='text-[40px] text-[#195E8E] font-bold mb-[24px]'>Tạo mới mật khẩu</h1>
            <h2 className='text-[#195E8E]'>Hệ thống quản lý hoạt động cộng đồng.</h2>
          </div>
          <form onSubmit={handleSubmitForm}>
            <ResetPasswordForm
              register={register}
              errors={errors}
              isLoading={resetPasswordCommandHandler.isLoading()}
            />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ResetPassword
