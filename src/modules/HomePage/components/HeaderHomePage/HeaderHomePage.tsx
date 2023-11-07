import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { Fragment, useState } from 'react'
import path from 'src/modules/Share/constants/path'
import { logo } from 'src/modules/Share/assets/image'
import Button from 'src/modules/Share/components/Button'

const LandingPageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Fragment>
      <header className='relative mx-auto w-[80%] h-auto flex justify-between items-center py-8 px-4 top-0 left-0 right-0 bg-transparent z-50'>
        <div className='flex w-56 items-center gap-4 leading-10 font-serif'>
          <img src={logo} alt='logo-img' className='w-20 h-20' />
          <span className='font-semibold text-[28px]'>ServeSync</span>
        </div>
        <ul className='lg:flex gap-8 list-none font-semibold text-[#191825]/50 hidden text-[16px]'>
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
            to={'/!'}
            className={({ isActive }) =>
              classNames('cursor-pointer transition-all duration-300 hover:text-black flex-shrink-0', {
                'text-black': isActive
              })
            }
          >
            Discover
          </NavLink>
          <NavLink
            to={'/!'}
            className={({ isActive }) =>
              classNames('cursor-pointer transition-all duration-300 hover:text-black flex-shrink-0', {
                'text-black': isActive
              })
            }
          >
            Special Deals
          </NavLink>
          <NavLink
            to={'/!'}
            className={({ isActive }) =>
              classNames('cursor-pointer transition-all duration-300 hover:text-black flex-shrink-0', {
                'text-black': isActive
              })
            }
          >
            Contact
          </NavLink>
        </ul>
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
              <span>Home</span>
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
              <span>Discover</span>
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
              <span>Special Deals</span>
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
              <span>Contact</span>
            </NavLink>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

export default LandingPageHeader
