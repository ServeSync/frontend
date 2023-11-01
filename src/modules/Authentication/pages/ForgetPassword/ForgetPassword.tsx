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
import { logo } from 'src/modules/Share/assets/image'

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
        <div className='col-span-1 w-full p-10 flex flex-col justify-center'>
          <h1 className='text-center text-[48px] text-[#195E8E] font-bold mb-[60px]'>Quên mật khẩu ?</h1>
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
