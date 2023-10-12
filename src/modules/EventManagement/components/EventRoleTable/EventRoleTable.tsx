import Skeleton from 'react-loading-skeleton'
import { RoleTableHeader } from '../../constants'

const EventRoleTable = () => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
      <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
        <tr className='text-[14px] text-gray-600'>
          {RoleTableHeader.map((item) => (
            <th className='px-2 py-2 font-medium text-center' key={item.id}>
              <span>{item.name}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(2)
          .fill(0)
          .map((_, index) => (
            <tr
              className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
              key={index}
            >
              <th className='px-2 py-4 font-medium'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
              <th className='px-2 py-4 font-medium'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
              <th className='px-2 py-4 font-medium'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
              <th className='px-2 py-4 font-medium'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
              <th className='px-2 py-4 font-medium'>
                <Skeleton className='h-[16px]' borderRadius={20} />
              </th>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default EventRoleTable
