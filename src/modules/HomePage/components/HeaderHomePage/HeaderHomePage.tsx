import { Link, NavLink, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { Fragment, useContext, useEffect, useState } from 'react'
import path from 'src/modules/Share/constants/path'
import { logo } from 'src/modules/Share/assets/image'
import Button from 'src/modules/Share/components/Button'
import { AppContext } from 'src/modules/Share/contexts'
import { GetProfileStudentQuery } from 'src/modules/Share/services'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import { Popover } from '@mui/material'
import { clearTokenFromLocalStorage } from 'src/modules/Authentication/utils'
import Skeleton from 'react-loading-skeleton'

const LandingPageHeader = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const [hasScrolled, setHasScrolled] = useState<boolean>(false)

  const [scrolled, setScrolled] = useState(true)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const getProfileStudentQuery = new GetProfileStudentQuery(isAuthenticated)
  const profile = getProfileStudentQuery.fetch()

  const handleLogout = () => {
    setIsAuthenticated(false)
    clearTokenFromLocalStorage()
    navigate(path.login)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setHasScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrolled(false)
  }, [scrolled])

  return (
    <Fragment>
      <header
        className={classNames(
          'sticky mx-auto h-auto flex justify-between items-center py-1 top-0 left-0 right-0 bg-transparent  z-50 px-36',
          {
            'shadow-bottom shadow-2xl bg-white': hasScrolled
          }
        )}
      >
        <Link to={path.home_page} className='flex w-56 items-center gap-4 leading-10 font-serif mb-4'>
          <img src={logo} alt='logo-img' className='w-20 h-20' />
          <span className='font-semibold text-[36px] font-Pacifico text-[#26C6DA]'>ServeSync</span>
        </Link>
        <ul className='lg:flex lg:items-center gap-8 list-none font-semibold text-[#191825]/50 hidden text-[18px]'>
          <NavLink
            to={path.home_page}
            className={({ isActive }) =>
              classNames('cursor-pointer transition-all duration-300 hover:text-black flex-shrink-0', {
                'text-black': isActive
              })
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to={path.list_events}
            className={({ isActive }) =>
              classNames('cursor-pointer transition-all duration-300 hover:text-black flex-shrink-0', {
                'text-black': isActive
              })
            }
          >
            Sự kiện
          </NavLink>
          <NavLink
            to={'/!'}
            className={({ isActive }) =>
              classNames('cursor-pointer transition-all duration-300 hover:text-black flex-shrink-0', {
                'text-black': isActive
              })
            }
          >
            Thông tin
          </NavLink>
        </ul>
        {isAuthenticated ? (
          getProfileStudentQuery.isLoading() ? (
            <div className='flex items-center gap-4'>
              <Skeleton className='min-w-[120px] h-[20px]' />
              <div className='rounded-full overflow-hidden'>
                <Skeleton className='min-w-[60px] min-h-[60px] py-1' />
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <span className='text-[18px] font-semibold text-[#195E8E]'>{profile?.fullName}</span>
              <PopupState variant='popover' popupId='profile'>
                {(popupState) => (
                  <div>
                    <Button
                      classNameButton='relative bg-slate-300 rounded-full outline-none w-[60px] pt-[100%]'
                      {...bindTrigger(popupState)}
                    >
                      <img
                        src={profile?.imageUrl}
                        alt='avatar'
                        className='rounded-full top-0 h-full w-full object-cover object-top absolute'
                      />
                    </Button>
                    <Popover
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      {...bindPopover(popupState)}
                      className='mt-2'
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
                )}
              </PopupState>
            </div>
          )
        ) : (
          <div className='font-medium items-center text-[14px] hidden lg:flex gap-4'>
            <Link
              to={path.request_event}
              className='text-black px-4 py-4 rounded-full transition-all duration-300 hover:bg-slate-100  no-underline flex-shrink-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
            >
              Yêu cầu sự kiện
            </Link>
            <Link
              className='bg-[#5D50C6] text-white px-10 py-4 rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all duration-300 hover:bg-[#5D50C6]/80 no-underline flex-shrink-0'
              to={path.login}
            >
              Đăng nhập
            </Link>
          </div>
        )}
        <button className=' text-[2.8rem] transition-all hover:text-[#26C6DA] lg:hidden' onClick={handleMenuToggle}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
          >
            <path d='M4 6l16 0'></path>
            <path d='M4 12l16 0'></path>
            <path d='M4 18l16 0'></path>
          </svg>
        </button>
      </header>
      <div
        className={classNames(
          'transition-all duration-300 fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center',
          {
            'translate-x-0': isMenuOpen,
            'translate-x-full': !isMenuOpen
          }
        )}
      >
        <div className='bg-white w-full max-md:w-[35%] h-full transform transition-transform duration-300 flex flex-col'>
          <div className='p-4 flex items-center gap-12'>
            <Button
              classNameButton='text-[2.8rem] transition-all hover:text-[#26C6DA] lg:hidden space-y-4'
              onClick={handleMenuToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
              >
                <path d='M4 6l16 0'></path>
                <path d='M4 12l16 0'></path>
                <path d='M4 18l16 0'></path>
              </svg>
            </Button>
            <Link
              to={path.request_event}
              className='text-black px-4 py-4 rounded-full transition-all duration-300 hover:bg-slate-100  no-underline flex-shrink-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'
            >
              Yêu cầu sự kiện
            </Link>
            <Link
              className='bg-[#5D50C6] text-white px-10 py-4 rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all duration-300 hover:bg-[#5D50C6]/80 no-underline flex-shrink-0'
              to={path.login}
            >
              Đăng nhập
            </Link>
          </div>
          <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50  text-[#191825]/50'>
            <NavLink
              to={path.home_page}
              className={({ isActive }) =>
                classNames(
                  'cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2',
                  {
                    'text-[#26C6DA] bg-slate-300': isActive
                  }
                )
              }
              onClick={handleMenuToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              <span>Trang chủ</span>
            </NavLink>
            <NavLink
              to={path.list_events}
              className={({ isActive }) =>
                classNames(
                  'cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2',
                  {
                    'text-[#26C6DA] bg-slate-300': isActive
                  }
                )
              }
              onClick={handleMenuToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              <span>Sự kiện</span>
            </NavLink>
            <NavLink
              to={'/!'}
              className={({ isActive }) =>
                classNames(
                  'cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2',
                  {
                    'text-[#26C6DA] bg-slate-300': isActive
                  }
                )
              }
              onClick={handleMenuToggle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                />
              </svg>
              <span>Thông tin</span>
            </NavLink>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default LandingPageHeader
