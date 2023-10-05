import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm'
import { useForm } from 'react-hook-form'
import { FormResetPasswordSchema, FormResetPasswordType } from '../../utils/rules'
import useQueryTokenConfig from 'src/modules/Authentication/hooks/useQueryTokenConfig'
import { useMutation } from '@tanstack/react-query'
import authAPI from '../../services/auth.api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import path from 'src/modules/Share/constants/path'

export default function ResetPassword() {
  const TokenQuery = useQueryTokenConfig()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormResetPasswordType>({
    resolver: yupResolver(FormResetPasswordSchema)
  })

  const ResetPasswordMutation = useMutation({
    mutationFn: (body: { token: string; newPassword: string }) => authAPI.resetPassword(body)
  })

  const handleSubmitForm = handleSubmit((data) => {
    ResetPasswordMutation.mutate(
      { token: TokenQuery.token as string, newPassword: data.newPassword },
      {
        onSuccess: () => {
          navigate(path.login), toast.success('Đổi mật khẩu thành công !')
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (error.response?.data.code === 'InvalidToken') {
            toast.error('Đổi mật khẩu thất bại !')
          }
        }
      }
    )
  })

  return (
    <Fragment>
      <Helmet>
        <title>Forget Password</title>
        <meta name='description' content='This is forget password page of the project' />
      </Helmet>
      <div className='flex items-center bg-[#bdeef4] rounded-3xl w-[500px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='max-w-[500px] w-full p-10'>
          <h1 className='text-center text-[40px] font-bold mb-[40px]'>Tạo mới mật khẩu</h1>
          <form onSubmit={handleSubmitForm}>
            <ResetPasswordForm register={register} errors={errors} isLoading={ResetPasswordMutation.isLoading} />
          </form>
        </div>
      </div>
    </Fragment>
  )
}
