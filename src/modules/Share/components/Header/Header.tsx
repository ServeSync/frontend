import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Popover from '../Popover'
import { clearTokenFromLocalStorage } from 'src/modules/Authentication/utils/auth'
import { Link, useNavigate } from 'react-router-dom'
import path from '../../constants/path'
export default function Header() {
  const { setIsAuthenticated } = useContext(AppContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    setIsAuthenticated(false)
    clearTokenFromLocalStorage()
    navigate(path.login)
  }

  return (
    <header className='w-full sticky top-0 h-[72px] border-[1px] bg-white shadow-bottom transition-all'>
      <div className='w-full lg:max-w-full md:max-w-[786px] sm:max-w-[640px] flex items-center justify-between h-full px-6 overflow-hidden text-black'>
        <div className='flex justify-center flex-1 text-gray-500 py-4'>
          <form>
            <div className='relative w-full w-xl'>
              <input
                type='text'
                placeholder='Search'
                className=' block w-[200px] sm:w-[400px] lg:w-full appearance-none bg-white border-[1px] border-gray-500 rounded-md py-2 px-3 text-sm outline-none leading-5 pl-10'
                aria-label='Search'
              />
              <div className='absolute top-2 left-2'>
                <svg aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' className='w-5 h-5'>
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </div>
          </form>
        </div>
        <div className='flex items-center flex-shrink-0 space-x-6'>
          <div className='relative flex gap-3 items-center'>
            <span>Admin</span>
            <button className='rounded-full'>
              <Popover
                className='rounded-full flex items-center w-8 h-8 align-middle z-500 '
                renderPopover={
                  <ul className='flex flex-col gap-2 absolute right-[-16px] w-56 p-2 text-gray-700 bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
                    <li>
                      <Link
                        to={'/!'}
                        className='flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-800 '
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
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={'/!'}
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
                        <span>Setting</span>
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
                        <span>Log out</span>
                      </button>
                    </li>
                  </ul>
                }
              >
                <div className='relative'>
                  <img
                    src='https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'
                    alt='avatar'
                    className='object-cover w-[40px] h-[40px] rounded-full'
                  />
                </div>
              </Popover>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
