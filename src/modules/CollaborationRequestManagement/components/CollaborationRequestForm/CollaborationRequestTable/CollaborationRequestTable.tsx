import HeaderTable from 'src/modules/Share/components/HeaderTable'
import Skeleton from 'react-loading-skeleton'
import { formatDateTime } from 'src/modules/Share/utils'
import { CollaborationRequestsListType } from 'src/modules/CollaborationRequestManagement/interfaces'
import { CollaborationRequestTableHeader } from 'src/modules/CollaborationRequestManagement/constants'
import { StatusToMessage, TypeToMessage } from 'src/modules/Share/constants'

interface Props {
  collaborationRequests: CollaborationRequestsListType
  isLoading: boolean
  onEditEventPending: (id: string) => void
  onSort: (column: string) => void
}

const CollaborationRequestTable = ({ collaborationRequests, isLoading, onSort, onEditEventPending }: Props) => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
      <HeaderTable header={CollaborationRequestTableHeader} onSort={onSort} />
      <tbody>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <tr
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                  key={index}
                >
                  <th className='px-2 py-4 font-medium w-[20%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[15%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[15%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[15%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[15%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                  <th className='px-2 py-4 font-medium w-[15%]'>
                    <Skeleton className='h-[16px]' borderRadius={20} />
                  </th>
                </tr>
              ))
          : collaborationRequests &&
            collaborationRequests.data.map((event) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                key={event.id}
                onClick={() => onEditEventPending(event.id)}
              >
                <th className='px-2 py-4 font-medium w-[20%] overflow-hidden'>
                  <span className='line-clamp-1'>{event.name}</span>
                </th>
                <th className='px-2 py-4 font-medium overflow-hidden'>
                  <span className='line-clamp-1'>{event.organization.name}</span>
                </th>
                <th className='px-2 py-4 font-medium w-[8%]'>{event.capacity}</th>
                <th className='px-2 py-4 font-medium w-[15%]'>{formatDateTime(event.startAt)}</th>
                <th className='px-2 py-4 font-medium w-[15%]'>{formatDateTime(event.endAt)}</th>
                <th className='px-2 py-4 font-medium w-[10%]'>{TypeToMessage(event.type)}</th>
                <th className='px-2 py-4 font-medium w-[12%]'>{StatusToMessage(event.status)}</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default CollaborationRequestTable
