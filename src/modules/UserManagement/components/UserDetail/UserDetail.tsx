import { useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import Button from 'src/modules/Share/components/Button'
import { GetUserDetailQuery } from '../../services/User'
import EditRoleOfTenantsForm from '../EditRoleOfTenantsForm'

interface Props {
  userId: string
  handleClose: () => void
}

const UserDetail = ({ userId, handleClose }: Props) => {
  const getUserDetail = new GetUserDetailQuery(userId)
  const userDetail = getUserDetail.fetch()

  const [tenantId, setTenantId] = useState<string>(userDetail?.tenants[0].id)

  const handleChangeTenant = (id: string) => {
    setTenantId(id)
  }

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[500px]'>
      {userDetail && (
        <div className='w-full flex-col'>
          <div className='flex justify-between items-center w-full'>
            <h2 className='text-[20px] font-semibold'>Thông tin người dùng</h2>
            <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleClose}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </Button>
          </div>
          <div className='flex flex-col gap-5 py-5 border-b'>
            <TextField disabled id='outlined-disabled' label='Tên đăng nhập' value={userDetail.userName} />
            <TextField disabled id='outlined-disabled' label='Email' value={userDetail.email} />
          </div>
          <div className='flex flex-col py-2 gap-5'>
            <h3 className='font-medium text-[16px]'>Phân quyền</h3>
            <Autocomplete
              disablePortal
              id='tenants'
              options={userDetail.tenants || []}
              getOptionLabel={(option) => option.name}
              defaultValue={userDetail.tenants[0] || tenantId}
              noOptionsText='Không có lựa chọn'
              renderInput={(params) => <TextField {...params} label='Tenants' />}
              onChange={(_, option) => {
                handleChangeTenant && handleChangeTenant(option?.id as string)
              }}
              className='bg-white w-full'
            />
            <form>
              <EditRoleOfTenantsForm
                userId={userId}
                tenantId={tenantId ? tenantId : userDetail?.tenants[0].id}
                handleClose={handleClose}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetail
