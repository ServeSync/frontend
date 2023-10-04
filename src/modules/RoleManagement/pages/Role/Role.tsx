import { yupResolver } from '@hookform/resolvers/yup'
import RoleForm from '../../components/RoleForm'
import RoleTable from '../../components/RoleTable'
import { useForm } from 'react-hook-form'
import { FormRoleSchema, FormRoleType } from '../../utils/rules'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import roleAPI from '../../services/role.api'
import { toast } from 'react-toastify'
import { isAdminRoleAccessDeniedError, isDuplicateRoleNameError } from 'src/modules/Share/utils/utils'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import path from 'src/modules/Share/constants/path'
import { Helmet } from 'react-helmet-async'
import Permission from '../Permission'
import { RoleType } from '../../interfaces/role.type'
import Swal from 'sweetalert2'

const Role = () => {
  const [isEditForm, setIsEditForm] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const queryRoleConfig = useQueryRoleConfig()

  const navigate = useNavigate()

  const RolesListQuery = useQuery({
    queryKey: ['roles'],
    queryFn: () => roleAPI.getListRoles(),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000
  })
  const roles = RolesListQuery.data?.data.data as RoleType[]

  const RoleQuery = useQuery({
    queryKey: ['role', queryRoleConfig],
    queryFn: () => roleAPI.getRole(queryRoleConfig.id as string),
    enabled: queryRoleConfig.id !== undefined
  })
  const role = RoleQuery.data?.data as RoleType

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormRoleType>({
    resolver: yupResolver(FormRoleSchema)
  })

  useEffect(() => {
    if (role) {
      setValue('name', role?.name as string)
      setIsEditForm(true)
    } else {
      reset()
      setIsEditForm(false)
    }
  }, [role, setValue, reset])

  const CreateRoleMutation = useMutation({
    mutationFn: (body: FormRoleType) => roleAPI.createRole(body)
  })

  const EdiRoleMutation = useMutation({
    mutationFn: (body: { id: string; data: FormRoleType }) => roleAPI.editRole(body)
  })

  const onEditRole = (id: string) => {
    setValue('name', role?.name as string)
    navigate({
      search: createSearchParams({
        id: id
      }).toString()
    })
  }

  const onCreateRole = () => {
    navigate(path.role)
    setIsEditForm(false)
    reset()
  }

  const handleSubmitForm = handleSubmit((data) => {
    if (!isEditForm) {
      CreateRoleMutation.mutate(data, {
        onSuccess: () => {
          reset()
          toast.success('Thêm Role thành công !')
          queryClient.invalidateQueries({
            queryKey: ['roles']
          })
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (isDuplicateRoleNameError(error.response?.data.code)) {
            setError('name', {
              message: 'Role đã tồn tại !',
              type: 'Server'
            })
          }
          if (isAdminRoleAccessDeniedError(error.response?.data.code)) {
            setError('name', {
              message: 'Role admin không cho phép thêm mới !',
              type: 'Server'
            })
          }
        }
      })
    } else {
      EdiRoleMutation.mutate(
        {
          id: role?.id as string,
          data: data
        },
        {
          onSuccess: () => {
            navigate(path.role)
            setIsEditForm(false)
            reset()
            toast.success('Chỉnh sửa Role thành công !')
            queryClient.invalidateQueries({
              queryKey: ['roles']
            })
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            if (isAdminRoleAccessDeniedError(error.response?.data.code)) {
              setError('name', {
                message: 'Role admin không cho phép chỉnh sửa !',
                type: 'Server'
              })
            }
          }
        }
      )
    }
  })

  const DeleteRoleMutation = useMutation({
    mutationFn: (id: string) => roleAPI.deleteRole(id)
  })

  const handleDeleteRole = (id: string) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn sẽ không thể hoàn tác khi xác nhận!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteRoleMutation.mutate(id, {
          onSuccess: () => {
            navigate(path.role)
            setIsEditForm(false)
            reset()
            queryClient.invalidateQueries({
              queryKey: ['roles']
            })
            Swal.fire('Đã xóa!', 'Role đã được xóa thành công', 'success')
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            if (isAdminRoleAccessDeniedError(error.response?.data.code)) {
              toast.error('Role admin không cho phép xóa !')
            }
          }
        })
      }
    })
  }

  return (
    <Fragment>
      <Helmet>
        <title>Roles</title>
        <meta name='description' content='This is role management page of the project' />
      </Helmet>
      <div className='grid grid-cols-4 gap-8'>
        <div className='col-span-1 flex flex-col gap-12'>
          <form onSubmit={handleSubmitForm}>
            <RoleForm register={register} errors={errors} isEditForm={isEditForm} onCreateRole={onCreateRole} />
          </form>
          <RoleTable
            roles={roles}
            onEditRole={onEditRole}
            roleID={role?.id as string}
            isLoading={RolesListQuery.isLoading}
          />
        </div>
        <div className='col-span-3'>
          <Permission onDeleteRole={handleDeleteRole} />
        </div>
      </div>
    </Fragment>
  )
}

export default Role
