import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import permissionAPI from '../../services/permission.api'
import PermissionList from '../../components/PermissionList'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'
import { useNavigate } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { isAdminRoleAccessDenied } from 'src/modules/Share/utils/utils'

const Permission = () => {
  const [checkboxValues, setCheckboxValues] = useState<{ [key: string]: boolean }>({})
  const [currentRoleId, setCurrentRoleId] = useState<string>('')
  /*************Lay danh sach permission **********/
  const PermissionListQuery = useQuery({
    queryKey: ['permission'],
    queryFn: () => permissionAPI.getListPermissions()
  })
  const permissions = PermissionListQuery.data?.data
  /********************************************* */

  /*********Lay danh sach permission cua role ***/
  const queryRoleConfig = useQueryRoleConfig()
  // Get permissions tu id role
  const PermissionQuery = useQuery({
    queryKey: ['permission', queryRoleConfig],
    queryFn: () => permissionAPI.getRolePermissions(queryRoleConfig.id as string),
    enabled: queryRoleConfig.id !== undefined
  })
  const rolePermissions = PermissionQuery.data?.data
  /********************************************* */
  const { handleSubmit } = useForm()
  const SavePermissionRole = useMutation({
    mutationFn: (body: { id: string; data: string[] }) => {
      return permissionAPI.editPermission(body)
    }
  })

  // Kiem tra trang thai edit permission
  const isEditPermissions = rolePermissions !== undefined
  useEffect(() => {
    // Neu o trang thai edit va rolePermissions khong rong
    if (isEditPermissions && rolePermissions) {
      const newCheckboxValues: { [key: string]: boolean } = {}
      // Lay id cua role tren query de set cho currentID
      setCurrentRoleId(queryRoleConfig.id as string)
      permissions?.forEach((permission) => {
        const isChecked = rolePermissions.some((rolePermission) => rolePermission.id === permission.id)
        newCheckboxValues[permission.id] = isChecked
      })
      setCheckboxValues(newCheckboxValues)
    } else {
      // neu khong o trang thai edit thi checkbox tro ve false het
      const falseCheckboxValues: { [key: string]: boolean } = {}
      permissions?.forEach((permission) => {
        falseCheckboxValues[permission.id] = false
      })
      setCheckboxValues(falseCheckboxValues)
    }
  }, [isEditPermissions, rolePermissions, queryRoleConfig.id, permissions])
  const navigate = useNavigate()
  const onCancel = () => {
    navigate(path.role)
  }
  const handleCheckboxChange = (permissionId: string, checked: boolean) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [permissionId]: checked
    }))
  }
  // useEffect(() => {
  //   console.log(checkboxValues)
  // }, [checkboxValues])
  const queryClient = useQueryClient()

  const handleSubmitForm = handleSubmit(() => {
    const checkedPermissions = []
    for (const permissionId in checkboxValues) {
      if (checkboxValues[permissionId]) {
        checkedPermissions.push(permissionId)
      }
    }
    const requestData = {
      id: currentRoleId,
      data: checkedPermissions
    }
    SavePermissionRole.mutate(requestData, {
      onSuccess: () => {
        navigate(path.role)
        toast.success('Cập nhật permission thành công !')
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
    })
    console.log(requestData)
  })
  return (
    <Fragment>
      <Helmet>
        <meta name='description' content='This is role management page of the project' />
      </Helmet>
      <form className='flex flex-col' onSubmit={handleSubmitForm}>
        <PermissionList
          onChangeCheckbox={handleCheckboxChange}
          permissions={permissions}
          isShowPermissions={isEditPermissions}
          checkboxValues={checkboxValues}
          onCancel={onCancel}
        />
      </form>
    </Fragment>
  )
}
export default Permission
