import { Fragment } from 'react'
import { RoleType } from '../../interfaces/role.type'
import classNames from 'classnames'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

interface Props {
  roles: RoleType[]
  handleDeleteRole: (id: string) => void
  onEditRole: (id: string) => void
  roleID: string
  isLoading: boolean
}

const RoleTable = ({ roles, handleDeleteRole, onEditRole, roleID, isLoading }: Props) => {
  console.log(isLoading)

  return (
    <Fragment>
      {isLoading ? (
        <SkeletonTheme baseColor='#e7e7e7'>
          <Skeleton count={2} className='h-[40px] mb-3' />
        </SkeletonTheme>
      ) : (
        <div className='flex flex-col gap-4'>
          {roles &&
            roles.map((role: RoleType) => (
              <div className='relative' key={role.id}>
                <div>
                  <div
                    className={classNames(
                      'w-full border-[1px] border-[#65cad7] px-4 py-2 rounded-md outline-none capitalize font-medium',
                      {
                        'bg-[#d4faff]': role.id !== roleID,
                        'bg-[#65cad7]': role.id === roleID
                      }
                    )}
                  >
                    {role.name}
                  </div>
                </div>
                <div className='absolute top-2 right-2 flex items-center'>
                  <button
                    type='button'
                    className='p-1 text-[#02545fb7] rounded-md hover:bg-[#26c5da9f]'
                    onClick={() => onEditRole(role.id)}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
                      <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z' />
                    </svg>
                  </button>
                  <button
                    type='button'
                    className='p-1 text-[#fd2c2ce1] rounded-md hover:bg-[#26c5da9f]'
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
                      <path
                        fillRule='evenodd'
                        d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </Fragment>
  )
}

export default RoleTable
