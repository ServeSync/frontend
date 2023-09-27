import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import ForgetPasswordForm from '../../components/ForgetPasswordForm'
import { useForm } from 'react-hook-form'
import { FormForgetPasswordSchema, FormForgetPasswordType } from '../../utils/rules'
import { useMutation } from '@tanstack/react-query'
import authAPI from '../../services/auth.api'
import { toast } from 'react-toastify'
import { isAccountLockedOutError, isUserNameNotFoundError } from 'src/modules/Share/utils/utils'
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

  const forgetPasswordMutation = useMutation({
    mutationFn: (body: { userNameOrEmail: string; callBackUrl: string }) => {
      return authAPI.forgetPassword(body)
    }
  })

  const handleSubmitForm = handleSubmit((formData) => {
    forgetPasswordMutation.mutate(
      {
        userNameOrEmail: formData.userNameOrEmail as string,
        callBackUrl: `http://localhost:4000${path.reset_password}`
      },
      {
        onSuccess: () => {
          toast.success('Vui lòng kiểm tra email để lấy lại mật khẩu !')
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (isUserNameNotFoundError(error.response?.data.code)) {
            setError('userNameOrEmail', {
              message: 'Tài khoản không tồn tại',
              type: 'Server'
            })
          }
          if (isAccountLockedOutError(error.response?.data.code)) {
            toast.error('Tài khoản bị khóa !')
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
          <h1 className='text-center text-[40px] font-bold mb-[40px]'>Quên mật khẩu</h1>
          <form onSubmit={handleSubmitForm}>
            <ForgetPasswordForm register={register} errors={errors} />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default ForgetPassword
