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
      <div className='grid grid-cols-2 bg-white rounded-3xl w-[1000px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='col-span-1 flex items-center justify-center bg-[#bdeef4] rounded-e-full'>
          <img
            src='https://s3-alpha-sig.figma.com/img/ff86/4153/8d0b3da488e360fcb93103240156f714?Expires=1699833600&Signature=i38i8hNvgRRsvvfupA2MB8XY~65bbqrjsOe5SkkxZ3JKFx1JzMqs-GYHN9kugun-aDaylwLYqb9JqDS-PDvh97CbbSVnrKNc7OdsSp2FjaoLGfNcvGYaNwFZC62Ev-ZRI2wzNIBQudfOCyaFG5JuI5--SrqO9mzqezY~CupGct6-7~aicNQzuRtNn1MgsIPnJhhLUWadXl2ngMY~GaY6CsmGbTFDrlkzFj0BFvhj1flyfkAxxsnTbR~5ZJT~rdXqGUBhBFpQIfXXXKyonK6Q-ycNqdACnqVXpwn0GcIX3673xuzpKr6ZN1XyLZ1karNBKL43sbAX-J1L6Z~vmUo27g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt='image_login'
            className='mx-auto w-[300px]'
          />
        </div>
        <div className='col-span-1 w-full px-10 py-20 flex flex-col justify-center'>
          <Link to={path.home_page} className='flex justify-center mb-4'>
            <img src={logo} alt='logo' className='w-[120px] h-[120px]' />
          </Link>
          <div className='mb-16 text-center'>
            <h1 className='text-[40px] text-[#195E8E] font-bold mb-[24px]'>Quên mật khẩu ?</h1>
            <h2 className='text-[#195E8E]'>Hệ thống quản lý hoạt động cộng đồng.</h2>
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
