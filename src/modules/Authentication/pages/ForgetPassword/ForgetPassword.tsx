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
      <div className='flex items-center bg-[#bdeef4] rounded-3xl w-[500px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='max-w-[500px] w-full p-10'>
          <h1 className='text-center text-[40px] font-bold mb-[40px]'>Quên mật khẩu</h1>
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
