import Skeleton from 'react-loading-skeleton'
import { EventTableHeader } from '../../constants'
import { EventsListType } from '../../interfaces'
import { formatDateTime } from 'src/modules/Share/utils'
import HeaderTable from 'src/modules/Share/components/HeaderTable'

interface Props {
  events: EventsListType
  isLoading: boolean
  onSort: (column: string) => void
}

const EventTable = ({ events, isLoading, onSort }: Props) => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
      <HeaderTable header={EventTableHeader} onSort={onSort} />
      <tbody>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                  key={index}
                >
                  <th className='px-2 py-4 font-medium w-[12%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[22%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-w-[8%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[16%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[11%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[11%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                </tr>
              ))
          : events &&
            events.data.map((event, index) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                key={index}
              >
                <th className='px-2 py-4 font-medium w-[12%]'>{event.name}</th>
                <th className='px-2 py-4 font-medium w-[22%] overflow-hidden'>
                  <span className='line-clamp-1'> {event.address.fullAddress}</span>
                </th>
                <th className='px-2 py-4 font-medium w-[8%]'>{event.capacity}</th>
                <th className='px-2 py-4 font-medium w-[10%]'>{event.registered}</th>
                <th className='px-2 py-4 font-medium w-[16%]'>{event.representativeOrganization.name}</th>
                <th className='px-2 py-4 font-medium w-[11%]'>{formatDateTime(event.startAt)}</th>
                <th className='px-2 py-4 font-medium w-[11%]'>{formatDateTime(event.endAt)}</th>
                <th className='px-2 py-4 font-medium'>{event.status}</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default EventTable
