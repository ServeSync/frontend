import { useContext, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Popover from '@mui/material/Popover'
import { AppContext } from '../../contexts'
import { GetProfileQuery } from '../../services'
import { clearTokenFromLocalStorage } from 'src/modules/Authentication/utils'
import path from '../../constants/path'
import Button from '../Button'
import { HandleHeading } from '../../constants'
import ModalCustom from '../Modal'
import ChangePassword from '../ChangePassword'

const Header = () => {
  const { setIsAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()

  const location = useLocation().pathname.split('/').slice(2)

  const getProfileQuery = new GetProfileQuery()
  const profile = getProfileQuery.fetch()

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
              <span>{profile?.email}</span>
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
                <Link
                  to={'/profile'}
                  className='flex items-center cursor-pointer text-sm font-medium hover:bg-gray-100 hover:text-gray-800 px-3 py-2'
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
                  <span className='w-[140px]'>Thông tin cá nhân</span>
                </Link>
                <Button
                  onClick={() => {
                    handleOpenModalChangePassword()
                    handleClosePopover()
                  }}
                  classNameButton='flex items-center cursor-pointer w-full  p-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-gray-800'
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
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
