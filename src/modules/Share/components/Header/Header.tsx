import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Popover from '../Popover'
import { clearTokenFromLocalStorage } from 'src/modules/Authentication/utils/auth'
export default function Header() {
  const { setIsAuthenticated } = useContext(AppContext)
  const handleLogout = () => {
    setIsAuthenticated(false)
    clearTokenFromLocalStorage()
  }
  return (
    <header className='z-40 relative py-4 bg-white shadow-bottom  transition-all overflow-hidden shadow-[rgba(0,0,0,0.2)_4px_2px_4px_0px]'>
      <div className='container flex items-center justify-between h-full px-6  text-black  '>
        <div className='flex justify-center flex-1 text-[#26C6DA] '>
          <div className='relative w-full max-w-xl  '>
            <div className='absolute inset-y-0 flex items-center pl-1  '>
              <svg aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' className='w-6 h-6'>
                <path
                  fillRule='evenodd'
                  d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              className=' block w-full form-input text-sm focus:outline-none leading-5 focus:border-[#26C6DA] focus:rounded-lg !pl-8 text-gray-700'
              type='text'
              placeholder='Search'
              aria-label='Search'
            />
          </div>
        </div>
        <ul className='flex items-center flex-shrink-0 space-x-6'>
          <li className='flex'>
            <button className='rounded-md focus:outline-none'>
              <svg fill='currentColor' viewBox='0 0 20 20' className='w-5 h-5' aria-hidden='true'>
                <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
              </svg>
            </button>
          </li>
          <li className='relative flex gap-3 items-center'>
            John Doe
            <button className='rounded-full'>
              <Popover
                className='rounded-full flex items-center w-8 h-8 align-middle z-500 '
                renderPopover={
                  <ul className='absolute w-56 p-2 mt-2 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content right-[-40px]'>
                    <li className='mb-2 last:mb-0'>
                      <a
                        href='/'
                        className='inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 '
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

                        <span>Profile</span>
                      </a>
                    </li>
                    <li className='mb-2 last:mb-0'>
                      <a
                        href='/'
                        className='inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800  '
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

                        <span>Setting</span>
                      </a>
                    </li>
                    <li className='mb-2 last:mb-0'>
                      <a
                        href='/'
                        className='inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800  '
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

                        <button onClick={handleLogout}>Log out</button>
                      </a>
                    </li>
                  </ul>
                }
              >
                <div className='relative flex'>
                  <img
                    src='https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/371834596_2059257214421535_7657570002202189161_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=7AHr74nRDjgAX9WhIG1&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfAKdOgy7BgDlF2a3AOQtdlY_HFVKpD_SSxfJ0FownNwrw&oe=65037C5F'
                    alt='avatar'
                    className='object-cover w-full h-full rounded-full'
                  />
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' viewBox='0 0 15 15'>
                    <path fill='currentColor' d='M7.5 12L0 4h15l-7.5 8Z' />
                  </svg>
                </div>
              </Popover>
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
