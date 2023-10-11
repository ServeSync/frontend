import { Link, NavLink } from 'react-router-dom'
import path from '../../constants/path'
import classNames from 'classnames'
import { useState } from 'react'

const LandingPageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className=''>
      <header className='relative max-w-screen-xl w-full h-auto flex justify-between items-center py-8 px-4 top-0 left-0 right-0 bg-transparent z-50 mx-auto'>
        <div className='flex w-56 items-center font-normal text-[24px] gap-4 leading-10 font-serif'>
          <img
            src='https://res.cloudinary.com/dboijruhe/image/upload/v1695882589/ServeSync/otodujgypsfzvckrjxbs.png?fbclid=IwAR1kfuOQs4sJ47uIw3RZddFsFkzJYcWvYNdEdHEfwcp6BAFqDTIhdkpw72A'
            alt='logo-img'
            className='w-20 h-20'
          />
          ServeSync
        </div>
        <ul className='lg:flex gap-8 list-none font-medium text-[#191825]/50 hidden text-[14px]'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              classNames('cursor-pointer transition-all duration-300 hover:text-black', {
                'text-black': isActive
              })
            }
          >
            Home
          </NavLink>
          <li className='cursor-pointer transition-all duration-300 hover:text-black'>Discover</li>
          <li className='cursor-pointer transition-all duration-300 hover:text-black'>Special Deals</li>
          <li className='cursor-pointer transition-all duration-300 hover:text-black'>Contact</li>
        </ul>
        <div className='lg:block font-medium items-center text-[14px] hidden '>
          <Link
            className='bg-[#5D50C6] text-white px-10 py-4 rounded-3xl shadow-md transition-all duration-300 hover:shadow-md  no-underline '
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
      {isMenuOpen && (
        <div className='lg:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white w-[50%] max-md:w-[35%]  h-full transform translate-x-full transition-transform duration-300 flex flex-col'>
            <div className=' mt-4 ml-3 flex items-center gap-12'>
              <Link
                to={path.login}
                className='text-white cursor-pointer transition-all duration-300 no-underline px-4 py-4 bg-[#5D50C6] rounded-lg '
              >
                Đăng nhập
              </Link>
              <button
                className='text-[2.8rem] transition-all hover:text-[#26C6DA] lg:hidden space-y-4'
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
              </button>
            </div>

            <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50  text-[#191825]/50'>
              <NavLink
                to='/'
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
                Home
              </NavLink>
              <li className='cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2'>
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
                    d='M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                Discover
              </li>
              <li className='cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2'>
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
                    d='M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                Special Deals
              </li>
              <li className='cursor-pointer transition-all duration-300 hover:text-[#26C6DA] py-4 pl-3 pr-4 flex items-center gap-2'>
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
                    d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
                  />
                </svg>
                Contact
              </li>
            </ul>
            <div className='mt-8 ml-10'></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPageHeader
