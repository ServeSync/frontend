import { Permission } from '../../interfaces/permission.type'

interface Props {
  permissions: Permission[] | undefined
  isShowPermissions: boolean
  onCancel: () => void
  onChangeCheckbox: (permissionId: string, checked: boolean) => void
  checkboxValues: { [key: string]: boolean } // Thêm checkboxValues vào Props
}

const PermissionList = ({ permissions, isShowPermissions, onCancel, checkboxValues, onChangeCheckbox }: Props) => {
  const columnCount = 3
  const columnLength = permissions ? Math.ceil(permissions.length / columnCount) : 0
  const permissionGroups: Permission[][] = []

  if (permissions) {
    for (let i = 0; i < columnCount; i++) {
      permissionGroups.push(permissions.slice(i * columnLength, (i + 1) * columnLength))
    }
  }
  return (
    <div className='flex flex-col'>
      <div className='flex space-x-4 w-full'>
        {permissionGroups.map((columnPermissions, columnIndex) => (
          <div key={columnIndex} className='flex flex-col space-y-20 md:space-y-6 lg:space-y-4'>
            {columnPermissions.map((permission) => {
              const isChecked = checkboxValues[permission.id] || false
              return (
                <div className='flex items-center gap-4' key={permission.id}>
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
              )
            })}
          </div>
        ))}
      </div>
      {isShowPermissions && (
        <div className='self-end flex space-x-4 mr-[160px] mt-5'>
          <button onClick={onCancel} className='bg-red-700 hover.bg-red-700/80 rounded-2xl px-3 py-2 text-white'>
            Cancel
          </button>
          <button type='submit' className='bg-[#33b6c7] hover.bg-[#33b6c7]/80 rounded-2xl px-3 py-2 text-white'>
            Save
          </button>
        </div>
      )}
    </div>
  )
}

export default PermissionList
