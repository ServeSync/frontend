import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import permissionAPI from '../../services/permission.api'
import PermissionList from '../../components/PermissionList'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { isAdminRoleAccessDenied } from 'src/modules/Share/utils/utils'
import roleAPI from '../../services/role.api'
import { PermissionSchema, PermissionType } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'

const Permission = () => {
  const [checkboxValues, setCheckboxValues] = useState<{ [key: string]: boolean }>({})

  const { handleSubmit } = useForm<PermissionType>({
    resolver: yupResolver(PermissionSchema)
  })

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const queryRoleConfig = useQueryRoleConfig()

  const PermissionListQuery = useQuery({
    queryKey: ['permission'],
    queryFn: () => permissionAPI.getListPermissions()
  })
  const permissions = PermissionListQuery.data?.data

  const PermissionsOfRoleQuery = useQuery({
    queryKey: ['permission', queryRoleConfig],
    queryFn: () => roleAPI.getPermissionsOfRole(queryRoleConfig.id as string),
    enabled: queryRoleConfig.id !== undefined
  })
  const permissionsOfRole = PermissionsOfRoleQuery.data?.data

  const SavePermissionsOfRole = useMutation({
    mutationFn: (body: { id: string; data: string[] }) => {
      return roleAPI.editPermissionsOfRole(body)
    }
  })

  const RoleQuery = useQuery({
    queryKey: ['role', queryRoleConfig],
    queryFn: () => roleAPI.getRole(queryRoleConfig.id as string),
    enabled: queryRoleConfig.id !== undefined
  })

  const role = RoleQuery.data?.data

  const isEditPermissions = permissionsOfRole !== undefined

  useEffect(() => {
    if (isEditPermissions && permissionsOfRole) {
      const newCheckboxValues: { [key: string]: boolean } = {}
      permissions?.forEach((permission) => {
        const isChecked = permissionsOfRole.some((permissionOfRole) => permissionOfRole.id === permission.id)
        newCheckboxValues[permission.id] = isChecked
      })
      setCheckboxValues(newCheckboxValues)
    } else {
      const falseCheckboxValues: { [key: string]: boolean } = {}
      permissions?.forEach((permission) => {
        falseCheckboxValues[permission.id] = false
      })
      setCheckboxValues(falseCheckboxValues)
    }
  }, [isEditPermissions, permissionsOfRole, queryRoleConfig.id, permissions])

  const onCancel = () => {
    navigate(path.role)
  }

  const handleCheckboxChange = (permissionId: string, checked: boolean) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [permissionId]: checked
    }))
  }

  const handleSubmitForm = handleSubmit(() => {
    const checkedPermissionIds: string[] =
      permissions?.filter((permission) => checkboxValues[permission.id]).map((permission) => permission.id) || []

    SavePermissionsOfRole.mutate(
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
          if (isAdminRoleAccessDenied(error.response?.data.code)) {
            toast.error('Role admin không cho phép cập nhật!')
          }
        }
      }
    )
  })

  return (
    <form onSubmit={handleSubmitForm}>
      <PermissionList
        onChangeCheckbox={handleCheckboxChange}
        permissions={permissions}
        isShowPermissions={isEditPermissions}
        checkboxValues={checkboxValues}
        onCancel={onCancel}
      />
    </form>
  )
}
export default Permission
