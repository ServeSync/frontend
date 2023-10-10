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
  GetRoleQuery
} from '../../services'
import { FormRoleSchema, FormRoleType } from '../../utils'
import path from 'src/modules/Share/constants/path'
import { handleError } from 'src/modules/Share/utils'
import RoleForm from '../../components/RoleForm'
import RoleTable from '../../components/RoleTable'
import Permission from '../Permission'
import useQueryRoleConfig from '../../hooks/useQueryRoleConfig'

const Role = () => {
  const [isEditForm, setIsEditForm] = useState<boolean>(false)

  const navigate = useNavigate()

  const queryRoleConfig = useQueryRoleConfig()

  const getAllRolesQuery = new GetAllRolesQuery()
  const roles = getAllRolesQuery.fetch()

  const getRoleQuery = new GetRoleQuery(queryRoleConfig.id as string)
  const role = getRoleQuery.fetch()

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

  const createRoleCommandHandler = new CreateRoleCommandHandler()
  const editRoleCommandHandler = new EditRoleCommandHandler()
  const deleteRoleCommandHandler = new DeleteRoleCommandHandler()

  const onEditRole = (id: string) => {
    setValue('name', role?.name as string)
    navigate({
      search: createSearchParams({
        id: id
      }).toString()
    })
  }

  const onCreateRole = () => {
    reset()
    navigate(path.role)
    setIsEditForm(false)
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
          id: role?.id as string,
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
              onCreateRole={onCreateRole}
              isLoading={createRoleCommandHandler.isLoading() || editRoleCommandHandler.isLoading()}
            />
          </form>
          <RoleTable
            roles={roles}
            onEditRole={onEditRole}
            roleID={role?.id as string}
            isLoading={getAllRolesQuery.isLoading()}
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
