import { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import path from '../../constants/path'
import classNames from 'classnames'
export default function SideBar() {
  const [expanded, setExpanded] = useState(true)
  return (
    <aside
      className={`z-30  flex-shrink-0 overflow-y-auto bg-white lg:block px-6  transition-all overflow-hidden ${
        expanded ? 'w-64' : 'w-30'
      }`}
      style={{
        boxShadow: expanded ? '4px 0px 8px rgba(0, 0, 0, 0.2)' : '0px 0px 0px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div className='py-4 text-gray-500 flex-auto justify-center items-center '>
        <div className={`flex items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
          <Link to={path.home} className=' text-lg font-bold text-gray-800 flex items-center justify-between'>
            <img src={logo} alt='' className={`overflow-hidden transition-all ${expanded ? 'w-14' : 'w-0'}`} />
          </Link>
          <button onClick={() => setExpanded((curr) => !curr)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
          </button>
        </div>
        <ul className='mt-7'>
          <li className='relative py-3'>
            <NavLink
              to={path.home}
              className={({ isActive }) =>
                classNames(
                  'inline-flex w-full justify-center items-center text-sm font-semibold duration-150 hover:text-[#26C6DA]  overflow-hidden transition-all',
                  {
                    'text-[#26C6DA]': isActive,
                    'text-gray-500': !isActive
                  }
                )
              }
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

              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Home</span>
            </NavLink>
          </li>
          <li className='relative py-3'>
            <NavLink
              to={`${path.home}/dashboard`}
              className={({ isActive }) =>
                classNames(
                  'inline-flex w-full justify-center items-center text-sm font-semibold duration-150 hover:text-[#26C6DA]  overflow-hidden transition-all',
                  {
                    'text-[#26C6DA]': isActive,
                    'text-gray-500': !isActive
                  }
                )
              }
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
                  d='M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>DashBoard</span>
            </NavLink>
          </li>
          <li className='relative py-3'>
            <NavLink
              to={`${path.home}/roles`}
              className={({ isActive }) =>
                classNames(
                  'inline-flex w-full justify-center items-center text-sm font-semibold duration-150 hover:text-[#26C6DA]  overflow-hidden transition-all',
                  {
                    'text-[#26C6DA]': isActive,
                    'text-gray-500': !isActive
                  }
                )
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' viewBox='0 0 32 32'>
                <path
                  fill='currentColor'
                  d='M28.07 21L22 15l6.07-6l1.43 1.41L24.86 15l4.64 4.59L28.07 21zM22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zM12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Roles</span>
            </NavLink>
          </li>
          <li className='relative py-3'>
            <NavLink
              to={`${path.home}/events`}
              className={({ isActive }) =>
                classNames(
                  'inline-flex w-full justify-center items-center text-sm font-semibold duration-150 hover:text-[#26C6DA] overflow-hidden transition-all',
                  {
                    'text-[#26C6DA]': isActive,
                    'text-gray-500': !isActive
                  }
                )
              }
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
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Events</span>
            </NavLink>
          </li>
          <li className='relative py-3'>
            <NavLink
              to={`${path.home}/events`}
              className={({ isActive }) =>
                classNames(
                  'inline-flex w-full justify-center items-center text-sm font-semibold duration-150 hover:text-[#26C6DA]  overflow-hidden transition-all',
                  {
                    'text-[#26C6DA]': isActive,
                    'text-gray-500': !isActive
                  }
                )
              }
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' viewBox='0 0 256 256'>
                <path
                  fill='currentColor'
                  d='m226.53 56.41l-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.89 47.89 0 0 1 176 120Zm-48-32.43L57.3 64L128 40.43L198.7 64Z'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Students</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  )
}
