import { EventOrganizationsListType } from 'src/modules/EventManagement/interfaces'
import HeaderTable from 'src/modules/Share/components/HeaderTable'
import { OrganizerTableHeader } from '../../constants'
import Skeleton from 'react-loading-skeleton'

interface Props {
  organizers: EventOrganizationsListType
  onSort: (column: string) => void
  isLoading: boolean
}
const OrganizerTable = ({ organizers, isLoading, onSort }: Props) => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
      <HeaderTable header={OrganizerTableHeader} onSort={onSort} />
      <tbody>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                  key={index}
                >
                  <th className='px-2 py-4 font-medium w-[25%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[25%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[25%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[25%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                </tr>
              ))
          : organizers &&
            organizers.data.map((organizer) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                key={organizer.id}
              >
                <th className='px-2 py-4 font-medium w-[25%]'>{organizer.name}</th>
                <th className='px-2 py-4 font-medium w-[25%]'>{organizer.email}</th>
                <th className='px-2 py-4 font-medium w-[25%]'>{organizer.phoneNumber}</th>
                <th className='px-2 py-4 font-medium w-[25%]'>{organizer.address}</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default OrganizerTable
