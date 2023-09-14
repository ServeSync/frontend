import { useState } from 'react'
import logo from 'src/accets/img/logo 2.png'

export default function SideBar() {
  const [isActive, setIsActive] = useState('Accounts')
  const [expanded, setExpanded] = useState(true)
  const handleItemClick = (itemName: string) => {
    setIsActive(itemName)
  }
  return (
    <aside
      className={`z-30 flex-shrink-0 overflow-y-auto bg-white lg:block px-6  transition-all overflow-hidden ${
        expanded ? 'w-64' : 'w-30'
      }`}
      style={{
        boxShadow: expanded
          ? '4px 0px 8px rgba(0, 0, 0, 0.2)' // Shadow khi thanh sidebar mở
          : '0px 0px 0px rgba(0, 0, 0, 0.2)', // Shadow khi thanh sidebar đóng
        transition: 'box-shadow 0.3s', // Hiệu ứng chuyển đổi shadow
        overflow: 'hidden'
      }}
    >
      <div className='py-4 text-gray-500'>
        <div className={`flex items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
          <a href='/' className=' text-lg font-bold text-gray-800 flex items-center justify-between'>
            <img src={logo} alt='' className={`overflow-hidden transition-all ${expanded ? 'w-14' : 'w-0'}`} />
          </a>
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
        <ul className='mt-6'>
          <li className='relative px-6 py-3'>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              className={`inline-flex w-full items-center text-sm font-semibold duration-150 hover:text-gray-800  overflow-hidden transition-all ${
                isActive === 'Accounts' ? 'text-gray-800' : ''
              }}`}
              onClick={() => handleItemClick('Accounts')}
              role='button'
              tabIndex={0}
            >
              {isActive === 'Accounts' && (
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-[#26C6DA] rounded-tr-lg rounded-br-lg'
                  aria-hidden='true'
                ></span>
              )}

              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 '
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Accounts</span>
            </div>
          </li>
          <li className='relative px-6 py-3'>
            <div
              className={`inline-flex w-full items-center text-sm font-semibold duration-150 hover:text-gray-800 overflow-hidden transition-all ${
                isActive === 'Dashboard' ? 'text-gray-800' : ''
              }}`}
              onClick={() => handleItemClick('Dashboard')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleItemClick('Dashboard')
                }
              }}
              role='button'
              tabIndex={0}
            >
              {isActive === 'Dashboard' && (
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-[#26C6DA] rounded-tr-lg rounded-br-lg'
                  aria-hidden='true'
                ></span>
              )}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6'
                />
              </svg>

              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Dashboard</span>
            </div>
          </li>
          <li className='relative px-6 py-3'>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              onClick={() => handleItemClick('Roles')}
              role='button'
              tabIndex={0}
              className={`inline-flex w-full items-center text-sm font-semibold duration-150 hover:text-gray-800  overflow-hidden transition-all ${
                isActive === 'Roles' ? 'text-gray-800' : ''
              }}`}
            >
              {isActive === 'Roles' && (
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-[#26C6DA] rounded-tr-lg rounded-br-lg'
                  aria-hidden='true'
                ></span>
              )}
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 32 32'>
                <path
                  fill='currentColor'
                  d='M28.07 21L22 15l6.07-6l1.43 1.41L24.86 15l4.64 4.59L28.07 21zM22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zM12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Roles</span>
            </div>
          </li>
          <li className='relative px-6 py-3'>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              onClick={() => handleItemClick('Events')}
              role='button'
              tabIndex={0}
              className={`inline-flex w-full items-center text-sm font-semibold duration-150 hover:text-gray-800  overflow-hidden transition-all ${
                isActive === 'Events' ? 'text-gray-800' : ''
              }}`}
            >
              {isActive === 'Events' && (
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-[#26C6DA] rounded-tr-lg rounded-br-lg'
                  aria-hidden='true'
                ></span>
              )}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Events</span>
            </div>
          </li>
          <li className='relative px-6 py-3'>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              onClick={() => handleItemClick('Table')}
              role='button'
              tabIndex={0}
              className={`inline-flex w-full items-center text-sm font-semibold duration-150 hover:text-gray-800  overflow-hidden transition-all ${
                isActive === 'Table' ? 'text-gray-800' : ''
              }}`}
            >
              {isActive === 'Table' && (
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-[#26C6DA] rounded-tr-lg rounded-br-lg'
                  aria-hidden='true'
                ></span>
              )}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Table</span>
            </div>
          </li>
          <li className='relative px-6 py-3'>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div
              onClick={() => handleItemClick('Student')}
              role='button'
              tabIndex={0}
              className={`inline-flex w-full items-center text-sm font-semibold duration-150 hover:text-gray-800  overflow-hidden transition-all ${
                isActive === 'Student' ? 'text-gray-800' : ''
              }}`}
            >
              {isActive === 'Student' && (
                <span
                  className='absolute inset-y-0 left-0 w-1 bg-[#26C6DA] rounded-tr-lg rounded-br-lg'
                  aria-hidden='true'
                ></span>
              )}
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' viewBox='0 0 256 256'>
                <path
                  fill='currentColor'
                  d='m226.53 56.41l-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.89 47.89 0 0 1 176 120Zm-48-32.43L57.3 64L128 40.43L198.7 64Z'
                />
              </svg>
              <span className={`overflow-hidden transition-all ${expanded ? 'w-full ml-4' : 'w-0'}`}>Student</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  )
}
