import { Fragment } from 'react'
import classNames from 'classnames'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Button from 'src/modules/Share/components/Button'
import { RoleType } from '../../interfaces'

interface Props {
  roles: RoleType[]
  roleID: string
  isLoading: boolean
  onEditRole: (id: string) => void
}

const RoleTable = ({ roles, roleID, isLoading, onEditRole }: Props) => {
  return (
    <Fragment>
      {isLoading ? (
        <SkeletonTheme baseColor='#e7e7e7'>
          <Skeleton count={3} className='h-[40px] mb-3' />
        </SkeletonTheme>
      ) : (
        <div className='flex flex-col gap-4'>
          {roles &&
            roles.map((role: RoleType) => (
              <Button
                type='button'
                classNameButton={classNames(
                  'w-full border-[1px] border-[#26C6DA] px-4 py-2 rounded-md outline-none capitalize font-medium text-left',
                  {
                    'bg-[#d4faff]': role.id !== roleID,
                    'bg-[#26C6DA] text-gray-100  ': role.id === roleID
                  }
                )}
                key={role.id}
                onClick={() => onEditRole(role.id)}
              >
                {role.name}
              </Button>
            ))}
        </div>
      )}
    </Fragment>
  )
}

export default RoleTable
