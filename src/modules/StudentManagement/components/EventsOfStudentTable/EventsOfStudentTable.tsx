import Skeleton from 'react-loading-skeleton'
import { StudentAttendedEvent } from 'src/modules/EventManagement/interfaces'
import { formatDateTime } from 'src/modules/Share/utils'
import { EventsOfStudentTableHeader } from '../../constants'

interface Props {
  events: StudentAttendedEvent[]
  isLoading: boolean
}

const EventsOfStudentTable = ({ events, isLoading }: Props) => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2'>
      <thead className='bg-[#f7f8f9] border-[1px] border-gray-200'>
        <tr className='text-[14px] text-gray-600'>
          {EventsOfStudentTableHeader.map((item) => (
            <th className='px-2 py-2 font-medium cursor-pointer' key={item.id}>
              <span>{item.name}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <tr
                  key={index}
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                >
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton />
                  </th>
                  <th className='px-2 py-4 font-medium'>
                    <Skeleton />
                  </th>
                </tr>
              ))
          : events?.map((event, index) => (
              <tr
                key={index}
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
              >
                <th className='px-2 py-4 font-medium'>{index + 1}</th>
                <th className='px-2 py-4 font-medium'>{event.name}</th>
                <th className='px-2 py-4 font-medium'>{event.representativeOrganization.name}</th>
                <th className='px-2 py-4 font-medium'>{formatDateTime(event.startAt)}</th>
                <th className='px-2 py-4 font-medium'>{formatDateTime(event.endAt)}</th>
                <th className='px-2 py-4 font-medium'>{event.role}</th>
                <th className='px-2 py-4 font-medium'>{event.score}</th>
                <th className='px-2 py-4 font-medium'>{formatDateTime(event.attendanceAt)}</th>
              </tr>
            ))}
      </tbody>
    </table>
  )
}

export default EventsOfStudentTable
