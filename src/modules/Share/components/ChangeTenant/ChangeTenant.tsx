/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from '@mui/material'
import { Profile } from '../../interfaces'
import classNames from 'classnames'
import { ChangeTenantCommandHandler } from '../../services'
import { useNavigate } from 'react-router-dom'
import path from '../../constants/path'

interface Props {
  profile: Profile
}

const ChangeTenant = ({ profile }: Props) => {
  const navigate = useNavigate()
  const exchaceTenantCommandHandler = new ChangeTenantCommandHandler()
  const handleExchangeTenant = (tenantId: string) => {
    exchaceTenantCommandHandler.handle(
      { tenantId },
      () => {
        navigate(path.dashboard)
        window.location.reload()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  return (
    <div className='px-1 py-1'>
      {profile.tenants.map((tenant, index) => (
        <button
          key={index}
          className={classNames('flex gap-x-1 px-2 py-2 items-center hover:bg-gray-100 hover:text-gray-800 w-full', {
            'bg-gray-100 text-gray-800 ': tenant.id === profile.tenantId,
            'hover:cursor-pointer': tenant.id !== profile.tenantId
          })}
          onClick={() => handleExchangeTenant(tenant.id)}
        >
          <Avatar alt='Remy Sharp' src={tenant.avatarUrl} sx={{ width: 16, height: 16 }} className='mr-3' />
          <span>{tenant.name}</span>
        </button>
      ))}
    </div>
  )
}

export default ChangeTenant
