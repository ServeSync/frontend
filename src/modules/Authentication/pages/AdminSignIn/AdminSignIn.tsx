/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/modules/Share/contexts'
import { FormAdminSignInSchema, FormAdminSignInType } from '../../utils'
import { AdminSignInCommandHandler } from '../../services'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import AdminSignInForm from '../../components/AdminSignInForm'
import { logo } from 'src/modules/Share/assets/image'

const AdminSignIn = () => {
  const { setIsAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormAdminSignInType>({
    resolver: yupResolver(FormAdminSignInSchema)
  })

  const adminSignInCommandHandler = new AdminSignInCommandHandler()

  const handleSubmitForm = handleSubmit((data) => {
    adminSignInCommandHandler.handle(
      data,
      () => {
        setIsAuthenticated(true)
        navigate(path.dashboard)
      },
      (error: any) => {
        handleError<FormAdminSignInType>(error, setError)
      }
    )
  })

  return (
    <Fragment>
      <Helmet>
        <title>Login</title>
        <meta name='description' content='This is login page of the project' />
      </Helmet>
      <div className='grid grid-cols-2 bg-white rounded-3xl w-[1000px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='col-span-1 flex items-center justify-center bg-[#bdeef4] rounded-e-full'>
          <img
            src='https://s3-alpha-sig.figma.com/img/ff86/4153/8d0b3da488e360fcb93103240156f714?Expires=1699833600&Signature=i38i8hNvgRRsvvfupA2MB8XY~65bbqrjsOe5SkkxZ3JKFx1JzMqs-GYHN9kugun-aDaylwLYqb9JqDS-PDvh97CbbSVnrKNc7OdsSp2FjaoLGfNcvGYaNwFZC62Ev-ZRI2wzNIBQudfOCyaFG5JuI5--SrqO9mzqezY~CupGct6-7~aicNQzuRtNn1MgsIPnJhhLUWadXl2ngMY~GaY6CsmGbTFDrlkzFj0BFvhj1flyfkAxxsnTbR~5ZJT~rdXqGUBhBFpQIfXXXKyonK6Q-ycNqdACnqVXpwn0GcIX3673xuzpKr6ZN1XyLZ1karNBKL43sbAX-J1L6Z~vmUo27g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt='image_login'
            className='mx-auto w-[300px]'
          />
        </div>
        <div className='col-span-1 p-12 flex flex-col justify-center'>
          <Link to={path.home_page} className='flex justify-center mb-4'>
            <img src={logo} alt='logo' className='w-[80px] h-[80px]' />
          </Link>
          <div className='mb-[20px] text-center'>
            <h1 className='text-[40px] text-[#195E8E] font-bold mb-[10px]'>Đăng nhập</h1>
            <h2 className='text-[#195E8E]'>Hệ thống quản lý hoạt động cộng đồng.</h2>
          </div>
          <form onSubmit={handleSubmitForm}>
            <AdminSignInForm register={register} errors={errors} isLoading={adminSignInCommandHandler.isLoading()} />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default AdminSignIn
