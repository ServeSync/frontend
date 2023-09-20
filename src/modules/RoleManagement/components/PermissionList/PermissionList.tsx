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
            const isChecked = checkboxValues[permission.id] || false
            return (
              <div key={permission.id} className='col-span-1'>
                <div className='flex items-center gap-4'>
                  <input
                    type='checkbox'
                    value={permission.name}
                    id={`checkbox-${permission.id}`}
                    checked={isChecked}
                    onChange={() => onChangeCheckbox(permission.id, !isChecked)}
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
        <div className='self-end flex space-x-4 mr-[160px] mt-5'>
          <button onClick={onCancel} className='bg-red-700 hover:bg-red-700/80 rounded-2xl px-3 py-2 text-white'>
            Cancel
          </button>
          <button type='submit' className='bg-[#33b6c7] hover:bg-[#33b6c7]/80 rounded-2xl px-3 py-2 text-white'>
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default PermissionList
