/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useQueryTokenConfig from '../../hooks/useQueryTokenConfig'
import { FormResetPasswordSchema, FormResetPasswordType } from '../../utils'
import { ResetPasswordCommandHandler } from '../../services'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import ResetPasswordForm from '../../components/ResetPasswordForm'

export default function ResetPassword() {
  const queryTokenConfig = useQueryTokenConfig()

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
      { token: queryTokenConfig.token as string, newPassword: data.newPassword },
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
      <div className='flex items-center bg-[#bdeef4] rounded-3xl w-[500px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='max-w-[500px] w-full p-10'>
          <h1 className='text-center text-[40px] font-bold mb-[40px]'>Tạo mới mật khẩu</h1>
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
