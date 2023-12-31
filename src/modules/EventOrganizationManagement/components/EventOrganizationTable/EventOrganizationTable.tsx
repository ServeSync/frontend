import HeaderTable from 'src/modules/Share/components/HeaderTable'
import Skeleton from 'react-loading-skeleton'
import { formatDateOfBirth } from 'src/modules/Share/utils'
import { EventOrganizationsListType } from '../../interfaces'
import { EventOrganizationTableHeader, StatusOrganizationToMessage } from '../../constants'

interface Props {
  organizers: EventOrganizationsListType
  onEditOrganization: (id: string) => void
  onSort: (column: string) => void
  isLoading: boolean
}

const EventOrganizationTable = ({ organizers, isLoading, onEditOrganization, onSort }: Props) => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
      <HeaderTable header={EventOrganizationTableHeader} onSort={onSort} />
      <tbody>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                  key={index}
                >
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[16%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[16%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[16%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[16%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                </tr>
              ))
          : organizers &&
            organizers.data.map((organizer) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50  '
                key={organizer.id}
                onClick={() => onEditOrganization(organizer.id)}
              >
                <th className='px-2 py-4 font-medium overflow-hidden'>
                  <span className='line-clamp-1'> {organizer.name}</span>
                </th>
                <th className='px-2 py-4 font-medium w-[12%]'>{organizer.phoneNumber}</th>
                <th className='px-2 py-4 font-medium'>{organizer.email}</th>
                <th className='px-2 py-4 font-medium overflow-hidden'>
                  <span className='line-clamp-1'>{organizer.address}</span>
                </th>
                <th className='px-2 py-4 font-medium text-center w-[8%]'>{organizer.hostedEvents}</th>

                <th className='px-2 py-4 font-medium w-[12%]'>{formatDateOfBirth(organizer.created as string)}</th>

                <th className='px-2 py-4 font-medium w-[15%]'>{StatusOrganizationToMessage(organizer.status)}</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default EventOrganizationTable
