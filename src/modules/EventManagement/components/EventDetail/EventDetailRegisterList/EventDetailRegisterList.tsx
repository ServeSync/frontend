import { RegisteredStudentsListType } from 'src/modules/EventManagement/interfaces'
import { formatDateOfBirth, formatTime } from 'src/modules/Share/utils'

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
              <th className='px-2 py-2 font-semibold'>
                <span>#</span>
              </th>
              <th className='px-2 py-2 font-semibold'>
                <span>Họ tên</span>
              </th>
              <th className='px-2 py-2 font-semibold'>
                <span>Địa chỉ email</span>
              </th>
              <th className='px-2 py-2 font-semibold'>
                <span>Lớp sinh hoạt</span>
              </th>
              <th className='px-2 py-2 font-semibold'>
                <span>Vai trò</span>
              </th>
              <th className='px-2 py-2 font-semibold'>
                <span>Trạng thái</span>
              </th>
              <th className='px-2 py-2 font-semibold'>
                <span>Thời gian đăng ký</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {registeredStudents.data.map((student, index) => (
              <tr
                key={index}
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
              >
                <th className='px-2 py-4 font-medium'>{index + 1}</th>
                <th className='px-2 py-4 font-medium flex flex-row items-center gap-3'>
                  <img src={student.imageUrl} alt='' className='rounded-full object-cover w-[50px] ' />
                  <div className='flex flex-col'>
                    <span className='font-semibold '>{student.name}</span>
                    <span className='text-gray-400 text-[12px]'>{student.code}</span>
                  </div>
                </th>
                <th className='px-2 py-4 font-medium'>{student.email}</th>
                <th className='px-2 py-4 font-medium'>{student.homeRoomName}</th>
                <th className='px-2 py-4 font-medium'>{student.role}</th>
                <th className='px-2 py-4 font-medium'>{student.status}</th>
                <th className='px-2 py-4 font-medium w-[15%] '>
                  {formatTime(student.registeredAt) + ' ' + formatDateOfBirth(student.registeredAt)}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventDetailRegisterList
