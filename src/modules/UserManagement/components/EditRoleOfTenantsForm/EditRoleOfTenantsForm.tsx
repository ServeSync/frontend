/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from 'react'
import { EditRoleOfTenantCommandHandler, GetListRolesOfTenantQuery } from '../../services/User'
import { GetAllRolesQuery } from 'src/modules/RoleManagement/services'
import Button from 'src/modules/Share/components/Button'
import { useForm } from 'react-hook-form'
import { FormRoleOfTenantSchema, FormRoleOfTenantType } from '../../utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { handleError } from 'src/modules/Share/utils'
interface Props {
  userId: string
  tenantId: string
  handleClose: () => void
}
const EditRoleOfTenantsForm = ({ userId, tenantId, handleClose }: Props) => {
  const getListRolesOfTenant = new GetListRolesOfTenantQuery(userId, tenantId)
  const listRolesOfTenant = getListRolesOfTenant.fetch()

  const getAllRolesQuery = new GetAllRolesQuery()
  const allRoles = getAllRolesQuery.fetch()
  const roles = allRoles?.filter((role) => !role.isDefault)

  const [checkboxValues, setCheckboxValues] = useState<{ [id: string]: boolean }>({})

  useEffect(() => {
    const updatedCheckboxValues = { ...checkboxValues }
    if (listRolesOfTenant) {
      roles?.forEach((role) => {
        updatedCheckboxValues[role.id] = listRolesOfTenant.some((RoleOfTenant) => RoleOfTenant.id === role.id)
      })
    } else {
      roles?.forEach((role) => {
        updatedCheckboxValues[role.id] = false
      })
    }
    setCheckboxValues(updatedCheckboxValues)
  }, [listRolesOfTenant, allRoles])

  const handleCheckboxChange = (roleId: string, checked: boolean) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [roleId]: checked
    }))
  }

  const { handleSubmit } = useForm<FormRoleOfTenantType>({
    resolver: yupResolver(FormRoleOfTenantSchema)
  })

  const editRoleOfTenantCommandHandler = new EditRoleOfTenantCommandHandler()

  const handleSubmitForm = handleSubmit(() => {
    const checkedRoleId: string[] = roles?.filter((role) => checkboxValues[role.id])?.map((role) => role.id) || []

    editRoleOfTenantCommandHandler.handle(
      {
        id: userId,
        tenantId: tenantId,
        data: checkedRoleId
      },
      () => {
        handleClose()
        toast.success('Cập nhật thành công')
      },
      (error: any) => {
        handleError<FormRoleOfTenantType>(error)
      }
    )
  })

  return (
    <Fragment>
      <div className='flex flex-col'>
        <div className='grid grid-cols-1 gap-y-2'>
          {listRolesOfTenant &&
            listRolesOfTenant
              .filter((role) => role.isDefault)
              .map((role) => {
                return (
                  <div key={role.id} className='flex items-center gap-3'>
                    <input type='checkbox' checked disabled value={role.name} />
                    <label htmlFor={role.id} className='flex items-center'>
                      <span>{role.name}</span>
                    </label>
                  </div>
                )
              })}
          {roles &&
            roles.map((role) => {
              return (
                <div key={role.id} className='col-span-1'>
                  <div className='flex items-center gap-3'>
                    <input
                      id={role.id}
                      type='checkbox'
                      value={role.name}
                      checked={checkboxValues[role.id] || false}
                      onChange={() => handleCheckboxChange(role.id, !checkboxValues[role.id])}
                    />
                    <label htmlFor={role.id} className='flex items-center cursor-pointer'>
                      <span>{role.name}</span>
                    </label>
                  </div>
                </div>
              )
            })}
        </div>
        <div className='flex justify-end gap-4 mt-5'>
          <Button
            type='button'
            classNameButton='bg-gray-400 hover:bg-gray-400/80 rounded-lg px-3 py-2 text-white'
            onClick={handleClose}
          >
            Hủy
          </Button>
          <Button
            type='submit'
            classNameButton='bg-[#33b6c7] hover:bg-[#33b6c7]/80 rounded-lg px-3 py-2 text-white w-[120px]'
            onClick={handleSubmitForm}
            isLoading={editRoleOfTenantCommandHandler.isLoading()}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default EditRoleOfTenantsForm
