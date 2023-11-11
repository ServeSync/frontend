/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'
import {
  CreateRoleCommandHandler,
  DeleteRoleCommandHandler,
  EditRoleCommandHandler,
  GetAllRolesQuery,
  GetRoleByIdQuery
} from '../../services'
import { FormRoleSchema, FormRoleType } from '../../utils'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import RoleForm from '../../components/RoleForm'
import RoleTable from '../../components/RoleTable'
import PermissionPage from '../PermissionPage'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'
import Restricted from 'src/modules/Share/components/Restricted'

const RolePage = () => {
  const [isEditForm, setIsEditForm] = useState<boolean>(false)

  const navigate = useNavigate()

  const queryRoleConfig = useQueryRoleConfig()

  const getAllRolesQuery = new GetAllRolesQuery()
  const roles = getAllRolesQuery.fetch()

  const getRoleByIdQuery = new GetRoleByIdQuery(queryRoleConfig.id as string)
  const role = getRoleByIdQuery.fetch()

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
      setValue('name', role?.name)
      setIsEditForm(true)
    } else {
      reset()
      setIsEditForm(false)
    }
  }, [role, setValue, reset])

  const createRoleCommandHandler = new CreateRoleCommandHandler()
  const editRoleCommandHandler = new EditRoleCommandHandler()

  const onEditRole = (id: string) => {
    navigate({
      search: createSearchParams({
        id: id
      }).toString()
    })
    setValue('name', role?.name)
    setError('name', { message: '' })
  }

  const handleSubmitForm = handleSubmit((data) => {
    if (!isEditForm) {
      createRoleCommandHandler.handle(
        data,
        () => {
          reset()
          toast.success('Thêm Role thành công !')
        },
        (error: any) => {
          handleError<FormRoleType>(error, setError)
        }
      )
    } else {
      editRoleCommandHandler.handle(
        {
          id: role?.id,
          data: data
        },
        () => {
          reset()
          setIsEditForm(false)
          navigate(path.role)
          toast.success('Cập nhật thành công !')
        },
        (error: any) => {
          handleError<FormRoleType>(error, setError)
        }
      )
    }
  })

  const deleteRoleCommandHandler = new DeleteRoleCommandHandler()

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
        deleteRoleCommandHandler.handle(
          id,
          () => {
            reset()
            setIsEditForm(false)
            navigate(path.role)
            Swal.fire('Đã xóa!', 'Role đã được xóa thành công', 'success')
          },
          (error: any) => {
            handleError<FormRoleType>(error, setError)
          }
        )
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
            <RoleForm
              register={register}
              errors={errors}
              isEditForm={isEditForm}
              isLoading={createRoleCommandHandler.isLoading() || editRoleCommandHandler.isLoading()}
            />
          </form>
          <RoleTable roles={roles} onEditRole={onEditRole} roleID={role?.id} isLoading={getAllRolesQuery.isLoading()} />
        </div>
        <div className='col-span-3'>
          <Restricted to={'ServeSync.Permissions.Roles.ViewPermissions'}>
            <PermissionPage onDeleteRole={handleDeleteRole} />
          </Restricted>
        </div>
      </div>
    </Fragment>
  )
}

export default RolePage
