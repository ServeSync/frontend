import Skeleton from 'react-loading-skeleton'
import HeaderTable from 'src/modules/Share/components/HeaderTable'
import { EventTableHeader, StatusEventToMessage, TypeEventToMessage } from '../../constants'
import { formatDateTimeVN } from 'src/modules/Share/utils'
import { EventsListType } from '../../interfaces'

interface Props {
  events: EventsListType
  isLoading: boolean
  onSort: (column: string) => void
  onEditEvent: (id: string) => void
}

const EventTable = ({ events, isLoading, onSort, onEditEvent }: Props) => {
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
                  <th className='px-2 py-4 font-medium w-[14%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[8%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[8%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[12%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[12%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[10%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[12%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                </tr>
              ))
          : events &&
            events.data.map((event, index) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                key={index}
                onClick={() => onEditEvent(event.id)}
              >
                <th className='px-2 py-4 font-medium w-[14%]'>
                  <span className='line-clamp-1'>{event.name}</span>
                </th>
                <th className='px-2 py-4 font-medium overflow-hidden'>
                  <span className='line-clamp-1'>{event.representativeOrganization.name}</span>
                </th>
                <th className='px-2 py-4 font-medium w-[8%]'>{event.capacity}</th>
                <th className='px-2 py-4 font-medium w-[8%]'>{event.registered}</th>
                <th className='px-2 py-4 font-medium w-[12%]'>{formatDateTimeVN(event.startAt)}</th>
                <th className='px-2 py-4 font-medium w-[12%]'>{formatDateTimeVN(event.endAt)}</th>
                <th className='px-2 py-4 font-medium w-[10%]'>{TypeEventToMessage(event.type)}</th>
                <th className='px-2 py-4 font-medium w-[12%]'>{StatusEventToMessage(event.status)}</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default EventTable
