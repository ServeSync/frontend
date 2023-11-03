import { AttendanceStudentsListType } from 'src/modules/EventManagement/interfaces'
import { formatDateOfBirth, formatTime } from 'src/modules/Share/utils'

interface Props {
  attendanceStudents: AttendanceStudentsListType
}
const EventDetailAttendanceList = ({ attendanceStudents }: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
        danh sách sinh viên đã điểm danh
      </h1>
      <div>
        <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
          <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
            <tr className='text-[14px] text-gray-600'>
              <th className='px-2 py-2 text-center font-semibold'>
                <span>Họ tên</span>
              </th>
              <th className='px-2 py-2 text-center font-semibold'>
                <span>Địa chỉ email</span>
              </th>
              <th className='px-2 py-2 text-center font-semibold'>
                <span>Số điện thoại</span>
              </th>
              <th className='px-2 py-2 text-center font-semibold'>
                <span>Vai trò</span>
              </th>
              <th className='px-2 py-2 text-center font-semibold'>
                <span>Thời gian điểm danh</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceStudents.data.map((student, index) => (
              <tr
                key={index}
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
              >
                <th className='px-2 py-4 text-center font-medium flex flex-col justify-center items-center gap-3'>
                  <img src={student.imageUrl} alt='' className='rounded-full object-cover w-[50px] ' />
                  <span className='font-semibold '>{student.name}</span>
                </th>
                <th className='px-2 py-4 text-center font-medium'>{student.email}</th>
                <th className='px-2 py-4 text-center font-medium w-[20%] '>{student.phone}</th>
                <th className='px-2 py-4 text-center font-medium w-[15%] '>{student.role}</th>
                <th className='px-2 py-4 text-center font-medium w-[15%] '>
                  {formatTime(student.attendanceAt) + ' - ' + formatDateOfBirth(student.attendanceAt)}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EventDetailAttendanceList
