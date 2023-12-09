import { useContext, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Popover from '@mui/material/Popover'
import { AppContext } from '../../contexts'
import { GetProfileQuery } from '../../services'
import { clearTokenFromLocalStorage, getAccessTokenFromLocalStorage } from 'src/modules/Authentication/utils'
import path from '../../constants/path'
import Button from '../Button'
import { HandleHeading } from '../../constants'
import ModalCustom from '../Modal'
import ChangePassword from '../ChangePassword'
import ChangeTenant from '../ChangeTenant'
import { Avatar } from '@mui/material'
import EditOrganization from '../EditOrganization'
import { JWT } from '../../interfaces'

const Header = () => {
  const { setIsAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()

  const location = useLocation().pathname.split('/').slice(2)

  const getProfileQuery = new GetProfileQuery()
  const profile = getProfileQuery.fetch()

  const token = getAccessTokenFromLocalStorage()
  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    return JSON.parse(jsonPayload) as JWT
  }
  const JWTInfo = parseJwt(token)

  const handleLogout = () => {
    setIsAuthenticated(false)
    clearTokenFromLocalStorage()
    navigate(path.home_page)
  }
  const [isOpenModalChangePassword, setIsOpenModalChangePassword] = useState<boolean>(false)

  const handleOpenModalChangePassword = () => {
    setIsOpenModalChangePassword(true)
  }

  const handleCloseModalChangePassword = () => {
    setIsOpenModalChangePassword(false)
  }

  const [isOpenModalOrganization, setIsOpenModalOrganization] = useState<boolean>(false)

  const handleOpenModalOrganization = () => {
    setIsOpenModalOrganization(true)
  }

  const handleCloseModalOrganization = () => {
    setIsOpenModalOrganization(false)
  }

  const [nestedAnchorEl, setNestedAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpenNestedPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNestedAnchorEl(event.currentTarget)
  }

  const handleCloseNestedPopover = () => {
    setNestedAnchorEl(null)
  }

  const nestedIsOpen = Boolean(nestedAnchorEl)
  const nestedId = nestedIsOpen ? 'nested-popover' : undefined
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const isOpen = Boolean(anchorEl)
  const id = isOpen ? 'popover' : undefined

  return (
    <header className='w-full sticky top-0 h-[72px] border-[1px] bg-white shadow-bottom transition-all z-40'>
      <div className='w-full lg:max-w-full md:max-w-[786px] sm:max-w-[640px] flex items-center justify-between h-full px-6 overflow-hidden text-black'>
        <div className='font-semibold text-[18px] flex'>{HandleHeading(location[0])}</div>
        <div className='flex items-center flex-shrink-0 gap-x-6'>
          <div className='relative flex items-center gap-3'>
            <Button type='button' classNameButton='relative'>
              <div className='rounded-md flex items-center'>
                <svg fill='currentColor' viewBox='0 0 20 20' className='w-5 h-5' aria-hidden='true'>
                  <path d='M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' />
                </svg>
              </div>
              <span className='absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full'></span>
            </Button>
            {getProfileQuery.isLoading() ? (
              <Skeleton className='min-w-[120px] h-[20px]' />
            ) : (
              <span>{profile.fullName}</span>
            )}
            <div>
              <Button
                onClick={handleOpenPopover}
                classNameButton='relative bg-slate-300 rounded-full outline-none w-[40px] pt-[100%]'
              >
                <img
                  src={profile?.avatarUrl}
                  alt='avatar'
                  className='rounded-full top-0 h-full w-full object-cover object-top absolute'
                />
              </Button>
              <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                {profile.isTenantOwner && (
                  <Button
                    classNameButton='flex items-center cursor-pointer w-full  p-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-800'
                    onClick={() => {
                      handleOpenModalOrganization()
                      handleClosePopover()
                    }}
                  >
                    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 mr-3'>
                      <g id='SVGRepo_bgCarrier' strokeWidth={0} />
                      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
                      <g id='SVGRepo_iconCarrier'>
                        <path
                          d='M7.5 11H4.6C4.03995 11 3.75992 11 3.54601 11.109C3.35785 11.2049 3.20487 11.3578 3.10899 11.546C3 11.7599 3 12.0399 3 12.6V21M16.5 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V21M16.5 21V6.2C16.5 5.0799 16.5 4.51984 16.282 4.09202C16.0903 3.71569 15.7843 3.40973 15.408 3.21799C14.9802 3 14.4201 3 13.3 3H10.7C9.57989 3 9.01984 3 8.59202 3.21799C8.21569 3.40973 7.90973 3.71569 7.71799 4.09202C7.5 4.51984 7.5 5.0799 7.5 6.2V21M22 21H2M11 7H13M11 11H13M11 15H13'
                          stroke='#000000'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </g>
                    </svg>
                    <span>Quản lí tổ chức</span>
                  </Button>
                )}
                <Button
                  onClick={handleOpenNestedPopover}
                  classNameButton='flex items-center cursor-pointer w-full p-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-800'
                >
                  <Avatar alt='Remy Sharp' src={profile.avatarUrl} sx={{ width: 16, height: 16 }} className='mr-3' />
                  {profile.tenants
                    .filter((tenant) => tenant.id === profile.tenantId)
                    .map((filteredTenant) => (
                      <div key={filteredTenant.id} className='w-[120px] flex'>
                        <span className='truncate'>{filteredTenant.name}</span>
                      </div>
                    ))}
                </Button>
                <Popover
                  id={nestedId}
                  open={nestedIsOpen}
                  anchorEl={nestedAnchorEl}
                  onClose={() => {
                    handleCloseNestedPopover()
                    handleClosePopover()
                  }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <ChangeTenant profile={profile} />
                </Popover>
                <Button
                  onClick={() => {
                    handleOpenModalChangePassword()
                    handleClosePopover()
                  }}
                  classNameButton='flex items-center cursor-pointer w-full p-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-800'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-4 h-4 mr-3'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
                    />
                  </svg>
                  <span>Đổi mật khẩu</span>
                </Button>
                <Link
                  to={'/settings'}
                  className='flex items-center cursor-pointer w-full text-sm font-medium hover:bg-gray-100 hover:text-gray-800 p-3 py-2'
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
                <Button
                  onClick={handleLogout}
                  classNameButton='flex items-center cursor-pointer w-full  p-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-800'
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
                </Button>
              </Popover>
            </div>
            <ModalCustom isOpenModal={isOpenModalChangePassword} handleClose={handleCloseModalChangePassword}>
              <ChangePassword handleCloseModal={handleCloseModalChangePassword} />
            </ModalCustom>
            <ModalCustom isOpenModal={isOpenModalOrganization} handleClose={handleCloseModalOrganization}>
              <EditOrganization organizationId={JWTInfo.ReferenceId} handleCloseModal={handleCloseModalOrganization} />
            </ModalCustom>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
