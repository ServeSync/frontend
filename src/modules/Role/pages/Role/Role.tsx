import RoleForm from '../../components/RoleForm'
import RoleTable from '../../components/RoleTable'
import Permission from '../Permission'

const Role = () => {
  return (
    <div className='grid grid-cols-4 gap-8'>
      <div className='col-span-1 flex flex-col gap-12'>
        <RoleForm />
        <RoleTable />
      </div>
      <div className='col-span-3'>
        <Permission />
      </div>
    </div>
  )
}

export default Role
