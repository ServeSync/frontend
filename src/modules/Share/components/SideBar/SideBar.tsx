import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import path from '../../constants/path'
import { logo } from '../../assets/image'
import Restricted from '../Restricted'

const SideBar = () => {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside
      className={classNames(
        'h-screen sticky top-0 z-30 flex-shrink-0 bg-[#171717] lg:block transition-all shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]',
        {
          'w-[280px]': expanded
        }
      )}
    >
      <div>
        <div
          className={classNames('h-[72px] flex items-center px-6 text-gray-200 border-b-[1px] border-gray-500', {
            'justify-between': expanded,
            'justify-center': !expanded
          })}
        >
          <Link to={path.home_page} className='text-lg font-bold text-gray-800 flex items-center justify-between'>
            <img
              src={logo}
              alt='logo'
              className={classNames('overflow-hidden transition-all', {
                'w-14 h-14': expanded,
                'h-14 w-0': !expanded
              })}
            />
            <span
              className={classNames('text-[#62d9e8] ml-4 font-semibold text-[20px]', {
                hidden: !expanded
              })}
            >
              ServeSync
            </span>
          </Link>
          <button onClick={() => setExpanded((curr) => !curr)}>
            {expanded ? (
              <svg
                className='h-6 w-6'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M20.25 7.5L16 12L20.25 16.5M3.75 12H12M3.75 17.25H16M3.75 6.75H16'
                  stroke='currentColor'
                  strokeWidth={2}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg
                className='w-6 h-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            )}
          </button>
        </div>
        <div className='p-6'>
          <ul className='flex flex-col gap-2 text-[#9198a5]'>
            <li className='py-2'>
              <NavLink
                to={path.dashboard}
                className={({ isActive }) =>
                  classNames(
                    'flex w-full h-[24px] items-center text-sm font-semibold hover:text-gray-200 overflow-hidden transition-all',
                    {
                      'text-gray-200': isActive
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
                  className='w-6 h-6 text-[#26C6DA]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                  />
                </svg>
                <span
                  className={classNames('overflow-hidden', {
                    'ml-4': expanded,
                    'w-0': !expanded
                  })}
                >
                  Trang chủ
                </span>
              </NavLink>
            </li>
            <Restricted
              to={
                'ServeSync.Permissions.Roles.View' ||
                'ServeSync.Permissions.Roles.Create' ||
                'ServeSync.Permissions.Roles.Edit' ||
                'ServeSync.Permissions.Roles.Delete' ||
                'ServeSync.Permissions.Roles.UpdatePermissions' ||
                'ServeSync.Permissions.Roles.ViewPermissions'
              }
            >
              <li className='py-2'>
                <NavLink
                  to={path.role}
                  className={({ isActive }) =>
                    classNames(
                      'flex w-full h-[24px] items-center text-sm font-semibold hover:text-gray-200 overflow-hidden transition-all',
                      {
                        'text-gray-200': isActive
                      }
                    )
                  }
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-[#26C6DA]' viewBox='0 0 32 32'>
                    <path
                      fill='currentColor'
                      d='M28.07 21L22 15l6.07-6l1.43 1.41L24.86 15l4.64 4.59L28.07 21zM22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zM12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z'
                    />
                  </svg>
                  <span
                    className={classNames('overflow-hidden', {
                      'ml-4': expanded,
                      'w-0': !expanded
                    })}
                  >
                    Quản lý Roles
                  </span>
                </NavLink>
              </li>
            </Restricted>
            <Restricted
              to={
                'ServeSync.Permissions.Students.View' ||
                'ServeSync.Permissions.Students.Create' ||
                'ServeSync.Permissions.Students.Edit' ||
                'ServeSync.Permissions.Students.Delete' ||
                'ServeSync.Permissions.Students.EditProfile' ||
                'ServeSync.Permissions.Students.ViewProfile'
              }
            >
              <li className='py-2'>
                <NavLink
                  to={path.student}
                  className={({ isActive }) =>
                    classNames(
                      'flex w-full h-[24px] items-center text-sm font-semibold hover:text-gray-200 overflow-hidden transition-all',
                      {
                        'text-gray-200': isActive
                      }
                    )
                  }
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6 text-[#26C6DA]' viewBox='0 0 256 256'>
                    <path
                      fill='currentColor'
                      d='m226.53 56.41l-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.89 47.89 0 0 1 176 120Zm-48-32.43L57.3 64L128 40.43L198.7 64Z'
                    />
                  </svg>
                  <span
                    className={classNames('overflow-hidden', {
                      'ml-4': expanded,
                      'w-0': !expanded
                    })}
                  >
                    Quản lý sinh viên
                  </span>
                </NavLink>
              </li>
            </Restricted>
            <Restricted
              to={
                'ServeSync.Permissions.Events.View' ||
                'ServeSync.Permissions.Events.Create' ||
                'ServeSync.Permissions.Events.Edit' ||
                'ServeSync.Permissions.Events.Approve' ||
                'ServeSync.Permissions.Students.Reject' ||
                'ServeSync.Permissions.Students.Cancel' ||
                'ServeSync.Permissions.Events.RejectRegistration' ||
                'ServeSync.Permissions.Events.ApproveRegistration'
              }
            >
              <li className='py-2'>
                <NavLink
                  to={path.event}
                  className={({ isActive }) =>
                    classNames(
                      'flex w-full h-[24px] items-center text-sm font-semibold hover:text-gray-200 overflow-hidden transition-all',
                      {
                        'text-gray-200': isActive
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
                    className='w-6 h-6 text-[#26C6DA]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                    />
                  </svg>
                  <span
                    className={classNames('overflow-hidden', {
                      'ml-4': expanded,
                      'w-0': !expanded
                    })}
                  >
                    Quản lý sự kiện
                  </span>
                </NavLink>
              </li>
            </Restricted>
            <Restricted
              to={
                // 'ServeSync.Permissions.EventCollaborationRequests.Approve' ||
                // 'ServeSync.Permissions.EventCollaborationRequests.Reject' ||
                'ServeSync.Permissions.EventCollaborationRequests.View'
              }
            >
              <li className='py-2'>
                <NavLink
                  to={path.event_pending}
                  className={({ isActive }) =>
                    classNames(
                      'flex w-full h-[24px] items-center text-sm font-semibold hover:text-gray-200 overflow-hidden transition-all',
                      {
                        'text-gray-200': isActive
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
                    className='w-6 h-6 text-[#26C6DA]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z'
                    />
                  </svg>
                  <span
                    className={classNames('overflow-hidden', {
                      'ml-4': expanded,
                      'w-0': !expanded
                    })}
                  >
                    Quản lý đề nghị hợp tác
                  </span>
                </NavLink>
              </li>
            </Restricted>
            <Restricted
              to={'ServeSync.Permissions.EventOrganizations.Update' || ' ServeSync.Permissions.EventOrganizations.View'}
            >
              <li className='py-2'>
                <NavLink
                  to={path.event_organization}
                  className={({ isActive }) =>
                    classNames(
                      'flex w-full h-[24px] items-center text-sm font-semibold hover:text-gray-200 overflow-hidden transition-all',
                      {
                        'text-gray-200': isActive
                      }
                    )
                  }
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6 text-[#26C6DA]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
                    />
                  </svg>
                  <span
                    className={classNames('overflow-hidden', {
                      'ml-4': expanded,
                      'w-0': !expanded
                    })}
                  >
                    Quản lý nhà tổ chức sự kiện
                  </span>
                </NavLink>
              </li>
            </Restricted>
            <li className='py-2'>
              <NavLink
                to={path.proofs}
                className={({ isActive }) =>
                  classNames(
                    'flex w-full h-[24px] items-center text-sm font-semibold hover:text-gray-200 overflow-hidden transition-all',
                    {
                      'text-gray-200': isActive
                    }
                  )
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6 text-[#26C6DA]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
                  />
                </svg>
                <span
                  className={classNames('overflow-hidden', {
                    'ml-4': expanded,
                    'w-0': !expanded
                  })}
                >
                  Quản lý minh chứng
                </span>
              </NavLink>
            </li>
            <li className='py-2'>
              <NavLink
                to={path.complaint}
                className={({ isActive }) =>
                  classNames(
                    'flex w-full h-[24px] items-center text-sm font-semibold hover:text-gray-200 overflow-hidden transition-all',
                    {
                      'text-gray-200': isActive
                    }
                  )
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6 text-[#26C6DA]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z'
                  />
                </svg>
                <span
                  className={classNames('overflow-hidden', {
                    'ml-4': expanded,
                    'w-0': !expanded
                  })}
                >
                  Khiếu nại
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
