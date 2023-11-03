/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from 'src/modules/Share/contexts'
import { FormSignInSchema, FormSignInType } from '../../utils'
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
  } = useForm<FormSignInType>({
    resolver: yupResolver(FormSignInSchema)
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
      <div className='grid grid-cols-1 bg-[#bdeef4] rounded-3xl w-[500px] overflow-hidden shadow-[rgba(25,_94,_142,_0.36)_2px_9px_20px]'>
        <div className='col-span-1 p-12 flex flex-col justify-center'>
          <Link to={path.home_page} className='col-span-1 flex justify-center mb-4'>
            <div className='w-[120px] h-[120px]'>
              <img src={logo} alt='logo' className='w-full h-full' />
            </div>
          </Link>
          <h1 className='text-center text-[48px] text-[#195E8E] font-bold mb-[40px]'>Đăng nhập</h1>
          <form onSubmit={handleSubmitForm}>
            <AdminSignInForm register={register} errors={errors} isLoading={adminSignInCommandHandler.isLoading()} />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default AdminSignIn
