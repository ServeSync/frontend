import { Fragment } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { PermissionType } from '../../interfaces'
import Button from 'src/modules/Share/components/Button'

interface Props {
  id: string
  permissions: PermissionType[]
  checkboxValues: { [key: string]: boolean }
  isEditPermissions: boolean
  isLoading: boolean
  isLoadingEdit: boolean
  onCancel: () => void
  onDeleteRole: (id: string) => void
  onChangeCheckbox: (permissionId: string, checked: boolean) => void
}

const PermissionList = ({
  id,
  permissions,
  checkboxValues,
  isEditPermissions,
  isLoading,
  isLoadingEdit,
  onCancel,
  onDeleteRole,
  onChangeCheckbox
}: Props) => {
  return (
    <Fragment>
      {isLoading ? (
        <div className='grid grid-cols-3 gap-8'>
          <SkeletonTheme baseColor='#e7e7e7'>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Skeleton count={7} className='h-[20px] mb-6' key={index} borderRadius={10} />
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
                        id={`checkbox-${permission.id}`}
                        type='checkbox'
                        value={permission.name}
                        checked={checkboxValues[permission.id] || false}
                        onChange={() => onChangeCheckbox(permission.id, !checkboxValues[permission.id])}
                        disabled={!isEditPermissions}
                      />
                      <label htmlFor={`checkbox-${permission.id}`} className='flex items-center cursor-pointer'>
                        <span>{permission.description}</span>
                      </label>
                    </div>
                  </div>
                )
              })}
          </div>
          {isEditPermissions && (
            <div className='flex justify-end gap-4 mt-5'>
              <Button
                type='button'
                classNameButton='bg-gray-400 hover:bg-gray-400/80 rounded-lg px-3 py-2 text-white'
                onClick={onCancel}
              >
                Hủy
              </Button>
              <Button
                type='button'
                classNameButton='bg-red-600 hover:bg-red-600/80 rounded-lg px-3 py-2 text-white'
                onClick={() => onDeleteRole(id)}
              >
                Xóa
              </Button>
              <Button
                type='submit'
                classNameButton='bg-[#33b6c7] hover:bg-[#33b6c7]/80 rounded-lg px-3 py-2 text-white w-[120px]'
                isLoading={isLoadingEdit}
              >
                Cập nhật
              </Button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default PermissionList
