import { RegisteredStudentsTableHeader } from 'src/modules/EventManagement/constants'
import { RegisteredStudentsListType } from 'src/modules/EventManagement/interfaces'
import { formatDateTime } from 'src/modules/Share/utils'

interface Props {
  registeredStudents: RegisteredStudentsListType
}

const EventDetailRegisterList = ({ registeredStudents }: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <div>
        <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
          <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
            <tr className='text-[14px] text-gray-600'>
              {RegisteredStudentsTableHeader.map((item) => (
                <th className='px-2 py-2 font-semibold' key={item.id}>
                  <span>{item.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registeredStudents.data.map((student) => (
              <tr
                key={student.id}
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
              >
                <th className='grid grid-cols-3 gap-3 px-2 py-4 font-medium'>
                  <div className='relative rounded-full outline-none w-full pt-[100%] col-span-1'>
                    <img
                      src={student.imageUrl}
                      alt=''
                      className='rounded-full top-0 w-full object-cover object-top absolute'
                    />
                  </div>
                  <div className='flex flex-col col-span-2'>
                    <span className='font-semibold'>{student.name}</span>
                    <span className='text-gray-400 text-[12px]'>{student.code}</span>
                  </div>
                </th>
                <th className='px-2 py-4 font-medium'>{student.email}</th>
                <th className='px-2 py-4 font-medium'>{student.homeRoomName}</th>
                <th className='px-2 py-4 font-medium'>{student.role}</th>
                <th className='px-2 py-4 font-medium'>{student.status}</th>
                <th className='px-2 py-4 font-medium w-[15%]'>{formatDateTime(student.registeredAt)}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventDetailRegisterList
