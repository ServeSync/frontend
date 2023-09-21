import { Permission } from '../../interfaces/permission.type'

interface Props {
  permissions: Permission[] | undefined
  isShowPermissions: boolean
  onCancel: () => void
  onChangeCheckbox: (permissionId: string, checked: boolean) => void
  checkboxValues: { [key: string]: boolean }
}

const PermissionList = ({ permissions, isShowPermissions, onCancel, checkboxValues, onChangeCheckbox }: Props) => {
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-3 gap-6'>
        {permissions &&
          permissions.map((permission) => {
            return (
              <div key={permission.id} className='col-span-1'>
                <div className='flex items-center gap-4'>
                  <input
                    type='checkbox'
                    value={permission.name}
                    id={`checkbox-${permission.id}`}
                    checked={checkboxValues[permission.id] || false}
                    onChange={() => onChangeCheckbox(permission.id, !checkboxValues[permission.id])}
                    disabled={!isShowPermissions}
                  />
                  <label htmlFor={`checkbox-${permission.id}`} className='flex items-center cursor-pointer'>
                    <span className='mr-4'>{permission.description}</span>
                  </label>
                </div>
              </div>
            )
          })}
      </div>
      {isShowPermissions && (
        <div className='self-end flex space-x-4  mt-5'>
          <button onClick={onCancel} className='bg-red-600 hover:bg-red-600/80 rounded-lg px-3 py-2 text-white'>
            Hủy
          </button>
          <button type='submit' className='bg-[#33b6c7] hover:bg-[#33b6c7]/80 rounded-lg px-3 py-2 text-white'>
            Cập nhật
          </button>
        </div>
      )}
    </div>
  )
}

export default PermissionList
