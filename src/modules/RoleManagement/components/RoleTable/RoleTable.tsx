import { Fragment } from 'react'
import { RoleType } from '../../interfaces/role.type'
import classNames from 'classnames'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Button from 'src/modules/Share/components/Button'

interface Props {
  roles: RoleType[]
  onEditRole: (id: string) => void
  roleID: string
  isLoading: boolean
}

const RoleTable = ({ roles, onEditRole, roleID, isLoading }: Props) => {
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
              <Button
                type='button'
                classNameButton={classNames(
                  'w-full border-[1px] border-[#65cad7] px-4 py-2 rounded-md outline-none capitalize font-medium text-left',
                  {
                    'bg-[#d4faff]': role.id !== roleID,
                    'bg-[#65cad7]': role.id === roleID
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
