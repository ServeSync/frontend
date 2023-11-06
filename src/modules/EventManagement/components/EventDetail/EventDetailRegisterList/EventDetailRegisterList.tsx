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
        {registeredStudents.total > 0 ? (
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
        ) : (
          <div className='flex flex-col items-center mt-3 text-[#A0A2A4]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-12'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
              />
            </svg>

            <span className='text-[14px] font-normal'>Hiện chưa có sinh viên nào đăng ký</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetailRegisterList
