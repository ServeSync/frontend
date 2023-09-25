import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import permissionAPI from '../../services/permission.api'
import PermissionList from '../../components/PermissionList'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { isAdminRoleAccessDeniedError } from 'src/modules/Share/utils/utils'
import roleAPI from '../../services/role.api'
import { FormPermissionSchema, FormPermissionType } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { PermissionType } from '../../interfaces/permission.type'

const Permission = () => {
  const [checkboxValues, setCheckboxValues] = useState<{ [id: string]: boolean }>({})
  const [isEditPermissions, setIsEditPermissions] = useState<boolean>(false)

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const queryRoleConfig = useQueryRoleConfig()

  const PermissionListQuery = useQuery({
    queryKey: ['permission'],
    queryFn: () => permissionAPI.getListPermissions()
  })
  const permissions = PermissionListQuery.data?.data as PermissionType[]

  const PermissionsOfRoleQuery = useQuery({
    queryKey: ['permission', queryRoleConfig],
    queryFn: () => roleAPI.getPermissionsOfRole(queryRoleConfig.id as string),
    enabled: queryRoleConfig.id !== undefined
  })
  const permissionsOfRole = PermissionsOfRoleQuery.data?.data as PermissionType[]

  const RoleQuery = useQuery({
    queryKey: ['role', queryRoleConfig],
    queryFn: () => roleAPI.getRole(queryRoleConfig.id as string),
    enabled: queryRoleConfig.id !== undefined
  })
  const role = RoleQuery.data?.data

  const EditPermissionsOfRole = useMutation({
    mutationFn: (body: { id: string; data: string[] }) => {
      return roleAPI.editPermissionsOfRole(body)
    }
  })

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionsOfRole, permissions])

  const { handleSubmit } = useForm<FormPermissionType>({
    resolver: yupResolver(FormPermissionSchema)
  })

  const handleSubmitForm = handleSubmit(() => {
    const checkedPermissionIds: string[] =
      permissions?.filter((permission) => checkboxValues[permission.id]).map((permission) => permission.id) || []

    EditPermissionsOfRole.mutate(
      {
        id: queryRoleConfig.id as string,
        data: checkedPermissionIds
      },
      {
        onSuccess: () => {
          navigate(path.role)
          toast.success(`Cập nhật permission ${role?.name} thành công !`)
          queryClient.invalidateQueries({
            queryKey: ['permission']
          })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (isAdminRoleAccessDeniedError(error.response?.data.code)) {
            toast.error('Role admin không cho phép cập nhật!')
          }
        }
      }
    )
  })

  const onCancel = () => {
    navigate(path.role)
  }

  const handleCheckboxChange = (permissionId: string, checked: boolean) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [permissionId]: checked
    }))
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <PermissionList
        onChangeCheckbox={handleCheckboxChange}
        permissions={permissions}
        isEditPermissions={isEditPermissions}
        checkboxValues={checkboxValues}
        onCancel={onCancel}
      />
    </form>
  )
}
export default Permission
