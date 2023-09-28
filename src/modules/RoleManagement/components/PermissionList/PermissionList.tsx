import { Fragment } from 'react'
import { PermissionType } from '../../interfaces/permission.type'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

interface Props {
  permissions: PermissionType[]
  isEditPermissions: boolean
  onCancel: () => void
  onChangeCheckbox: (permissionId: string, checked: boolean) => void
  checkboxValues: { [key: string]: boolean }
  isLoading: boolean
}

const PermissionList = ({
  permissions,
  isEditPermissions,
  onCancel,
  checkboxValues,
  onChangeCheckbox,
  isLoading
}: Props) => {
  return (
    <Fragment>
      {isLoading ? (
        <div className='grid grid-cols-3 gap-8'>
          <SkeletonTheme baseColor='#e7e7e7'>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Skeleton count={5} className='h-[20px] mb-6' key={index} borderRadius={10} />
              ))}
          </SkeletonTheme>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='grid grid-cols-3 gap-x-2 gap-y-6'>
            {permissions &&
              permissions.map((permission) => {
                return (
                  <div key={permission.id} className='col-span-1'>
                    <div className='flex items-center gap-3'>
                      <input
                        type='checkbox'
                        value={permission.name}
                        id={`checkbox-${permission.id}`}
                        checked={checkboxValues[permission.id] || false}
                        onChange={() => onChangeCheckbox(permission.id, !checkboxValues[permission.id])}
                        disabled={!isEditPermissions}
                      />
                      <label htmlFor={`checkbox-${permission.id}`} className='flex items-center cursor-pointer'>
                        <span className='mr-4'>{permission.description}</span>
                      </label>
                    </div>
                  </div>
                )
              })}
          </div>
          {isEditPermissions && (
            <div className='self-end flex space-x-4  mt-5'>
              <button
                type='button'
                onClick={onCancel}
                className='bg-red-600 hover:bg-red-600/80 rounded-lg px-3 py-2 text-white'
              >
                Hủy
              </button>
              <button type='submit' className='bg-[#33b6c7] hover:bg-[#33b6c7]/80 rounded-lg px-3 py-2 text-white'>
                Cập nhật
              </button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default PermissionList
