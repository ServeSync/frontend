/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'
import {
  EditPermissionsByRoleIdCommandHandler,
  GetAllPermissionsByRoleIdQuery,
  GetAllPermissionsQuery,
  GetRoleQuery
} from '../../services'
import { FormPermissionSchema, FormPermissionType, FormRoleType } from '../../utils'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import PermissionList from '../../components/PermissionList'

interface Props {
  onDeleteRole: (id: string) => void
}

const Permission = ({ onDeleteRole }: Props) => {
  const [checkboxValues, setCheckboxValues] = useState<{ [id: string]: boolean }>({})
  const [isEditPermissions, setIsEditPermissions] = useState<boolean>(false)

  const navigate = useNavigate()

  const queryRoleConfig = useQueryRoleConfig()

  const getAllPermissionsQuery = new GetAllPermissionsQuery()
  const permissions = getAllPermissionsQuery.fetch()

  const getAllPermissionsByRoleIdQuery = new GetAllPermissionsByRoleIdQuery(queryRoleConfig.id as string)
  const permissionsOfRole = getAllPermissionsByRoleIdQuery.fetch()

  const getRoleQuery = new GetRoleQuery(queryRoleConfig.id as string)
  const role = getRoleQuery.fetch()

  useEffect(() => {
    const updatedCheckboxValues = { ...checkboxValues }
    if (permissionsOfRole) {
      setIsEditPermissions(true)
      permissions?.forEach((permission) => {
        updatedCheckboxValues[permission.id] = permissionsOfRole.some(
          (permissionOfRole) => permissionOfRole.id === permission.id
        )
      })
    } else {
      setIsEditPermissions(false)
      permissions?.forEach((permission) => {
        updatedCheckboxValues[permission.id] = false
      })
    }
    setCheckboxValues(updatedCheckboxValues)
  }, [permissionsOfRole, permissions])

  const { handleSubmit } = useForm<FormPermissionType>({
    resolver: yupResolver(FormPermissionSchema)
  })

  const editPermissionsByRoleIdCommandHandler = new EditPermissionsByRoleIdCommandHandler()

  const handleSubmitForm = handleSubmit(() => {
    const checkedPermissionIds: string[] =
      permissions?.filter((permission) => checkboxValues[permission.id]).map((permission) => permission.id) || []

    editPermissionsByRoleIdCommandHandler.handle(
      {
        id: queryRoleConfig.id as string,
        data: checkedPermissionIds
      },
      () => {
        navigate(path.role)
        toast.success(`Cập nhật quyền cho ${role?.name} thành công !`)
      },
      (error: any) => {
        handleError<FormRoleType>(error)
      }
    )
  })

  const handleCheckboxChange = (permissionId: string, checked: boolean) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [permissionId]: checked
    }))
  }

  const handleCancel = () => {
    navigate(path.role)
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <PermissionList
        id={queryRoleConfig.id as string}
        checkboxValues={checkboxValues}
        permissions={permissions}
        isEditPermissions={isEditPermissions}
        isLoading={getAllPermissionsQuery.isLoading()}
        isLoadingEdit={editPermissionsByRoleIdCommandHandler.isLoading()}
        onChangeCheckbox={handleCheckboxChange}
        onCancel={handleCancel}
        onDeleteRole={onDeleteRole}
      />
    </form>
  )
}
export default Permission
