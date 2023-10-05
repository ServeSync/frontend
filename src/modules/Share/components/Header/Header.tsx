import { useContext, Fragment, useState } from 'react'
import { AppContext } from '../../contexts/app.context'
import Popover from '../Popover'
import { clearTokenFromLocalStorage } from 'src/modules/Authentication/utils/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import path from '../../constants/path'
import { useQuery } from '@tanstack/react-query'
import profileAPI from '../../services/profile.api'
import studentAPI from 'src/modules/StudentManagement/services/student.api'
import useQueryStudentConfig from 'src/modules/StudentManagement/hooks/useQueryStudentConfig'
import useQueryRoleConfig from 'src/modules/RoleManagement/hooks/useQueryRoleConfig'
import roleAPI from 'src/modules/RoleManagement/services/role.api'
import Skeleton from 'react-loading-skeleton'
import Button from '../Button'

export default function Header() {
  const [isOpenPopover, setIsOpenPopover] = useState(false)

  const { setIsAuthenticated } = useContext(AppContext)

  const queryStudentConfig = useQueryStudentConfig()
  const queryRoleConfig = useQueryRoleConfig()

  const navigate = useNavigate()

  const location = useLocation().pathname.split('/').slice(1)

  const ProfileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileAPI.getProfile()
  })
  const profile = ProfileQuery.data?.data

  const RoleQuery = useQuery({
    queryKey: ['role', queryRoleConfig],
    queryFn: () => roleAPI.getRole(queryRoleConfig.id as string),
    enabled: queryRoleConfig.id !== undefined && location[0] === 'roles'
  })
  const role = RoleQuery.data?.data

  const StudentQuery = useQuery({
    queryKey: ['student', queryStudentConfig],
    queryFn: () => studentAPI.getStudent(queryStudentConfig.id as string),
    enabled: queryStudentConfig.id !== undefined && location[0] === 'students'
  })
  const student = StudentQuery.data?.data

  const handleHeader = () => {
    if (role) {
      return role.name
    } else if (student) {
      return student.fullName
    } else return ''
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    clearTokenFromLocalStorage()
    navigate(path.login)
  }

  return (
    <header className='w-full sticky top-0 h-[72px] border-[1px] bg-white shadow-bottom transition-all z-40'>
      <div className='w-full lg:max-w-full md:max-w-[786px] sm:max-w-[640px] flex items-center justify-between h-full px-6 overflow-hidden text-black'>
        <div className='font-semibold text-[18px] capitalize flex'>
          {location[0] !== 'home' && (
            <Fragment>
              <Link to={`/${location[0]}`}>{location[0]}</Link>
              <div className='h-6 mx-4 border-r border-gray-300 -skew-x-12'></div>
              {handleHeader() !== '' ? (
                <span className='text-gray-500'>{handleHeader()}</span>
              ) : (
                <span className='text-gray-500'>List</span>
              )}
            </Fragment>
          )}
        </div>
        <div className='flex items-center flex-shrink-0 gap-x-6'>
          <div className='relative flex items-center gap-3'>
            <Button classNameButton='relative'>
              <div className='rounded-md flex items-center'>
                <svg fill='currentColor' viewBox='0 0 20 20' className='w-5 h-5' aria-hidden='true'>
                  <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
                </svg>
              </div>
              <span className='absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full'></span>
            </Button>
            {ProfileQuery.isLoading ? <Skeleton className='min-w-[120px] h-[20px]' /> : <span>{profile?.email}</span>}
            <Button classNameButton='rounded-full'>
              <Popover
                className='rounded-full flex items-center w-8 h-8 align-middle z-[80]'
                classNamePopover='z-[60]'
                renderPopover={
                  <ul className='flex flex-col gap-2 absolute right-[-16px] w-56 p-2 text-gray-700 bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                    <li>
                      <Link
                        to={'/profile'}
                        className='flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-800'
                      >
                        <svg
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          className='w-4 h-4 mr-3'
                          aria-hidden='true'
                        >
                          <path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                        </svg>
                        <span>Thông tin cá nhân</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={'/settings'}
                        className='flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-800  '
                      >
                        <svg
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          className='w-4 h-4 mr-3'
                          aria-hidden='true'
                        >
                          <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                          <path d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                        </svg>
                        <span>Cài đặt</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className='flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-800  '
                      >
                        <svg
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          className='w-4 h-4 mr-3'
                          aria-hidden='true'
                        >
                          <path d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                        </svg>
                        <span>Đăng xuất</span>
                      </button>
                    </li>
                  </ul>
                }
                isOpenPopover={isOpenPopover}
                setIsOpenPopover={setIsOpenPopover}
              >
                <div className='relative bg-slate-300 rounded-full outline-none w-[40px] pt-[100%]'>
                  <img
                    src={profile?.avatarUrl}
                    alt='avatar'
                    className='rounded-full top-0 h-full w-full object-cover object-top absolute'
                  />
                </div>
              </Popover>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
