import { formatDateTime, formatTime } from 'src/modules/Share/utils'
import { AttendanceStudentsListType, EventDetailType, RegisteredStudentsListType } from '../../interfaces'

interface Props {
  event: EventDetailType
  registeredStudents: RegisteredStudentsListType
  attendanceStudents: AttendanceStudentsListType
}
const EventDetailRegister = ({ event, registeredStudents, attendanceStudents }: Props) => {
  return (
    <div className=''>
      {event && (
        <div className='flex flex-col'>
          <div className='flex flex-col gap-5'>
            <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
              VAI TRÒ THAM DỰ
            </h1>
            <div className=''>
              <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
                <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
                  <tr className='text-[14px] text-gray-600'>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Tên vai trò</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Mô tả </span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Số lượng</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Đã đăng ký</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Đã duyệt</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Điểm</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Yêu cầu duyệt</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {event.roles.map((role, index) => (
                    <tr
                      key={index}
                      className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                    >
                      <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                        {role.name}
                      </th>
                      <th className='px-2 py-4 text-center font-medium'>{role.description}</th>
                      <th className='px-2 py-4 text-center font-medium'>{role.quantity}</th>
                      <th className='px-2 py-4 text-center font-medium'>{role.registered}</th>
                      <th className='px-2 py-4 text-center font-medium'>{role.registered}</th>
                      <th className='px-2 py-4 text-center font-medium'>{role.score}</th>
                      <th className='px-2 py-4 text-center font-medium'>
                        <input type='checkbox' checked={role.isNeedApprove} disabled readOnly />
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
              KHUNG GIỜ ĐĂNG KÝ
            </h1>
            <div className=''>
              <table className='w-[50%] bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
                <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
                  <tr className='text-[14px] text-gray-600'>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Ngày bắt đầu</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Ngày kết thúc</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Trạng thái</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {event.registrationInfos.map((registrationInfo, index) => (
                    <tr
                      key={index}
                      className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                    >
                      <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                        {formatTime(registrationInfo.startAt) + ' ' + formatDateTime(registrationInfo.startAt)}
                      </th>
                      <th className='px-2 py-4 text-center font-medium'>
                        {formatTime(registrationInfo.endAt) + ' ' + formatDateTime(registrationInfo.endAt)}
                      </th>
                      <th className='px-2 py-4 text-center font-medium'>
                        {event.isRegistered ? 'Đang diễn ra' : 'Đã kết thúc'}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
              KHUNG GIỜ điểm danh
            </h1>
            <div className=''>
              <table className='w-[50%] bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
                <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
                  <tr className='text-[14px] text-gray-600'>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Ngày bắt đầu</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Ngày kết thúc</span>
                    </th>
                    <th className='px-2 py-2 text-center font-semibold'>
                      <span>Trạng thái</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {event.attendanceInfos.map((attendanceInfo, index) => (
                    <tr
                      key={index}
                      className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                    >
                      <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                        {formatTime(attendanceInfo.startAt) + ' ' + formatDateTime(attendanceInfo.startAt)}
                      </th>
                      <th className='px-2 py-4 text-center font-medium'>
                        {formatTime(attendanceInfo.endAt) + ' ' + formatDateTime(attendanceInfo.endAt)}
                      </th>
                      <th className='px-2 py-4 text-center font-medium'>
                        {event.isAttendance ? 'Đang diễn ra' : 'Đã kết thúc'}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
              danh sách sinh viên đã đăng ký
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
                      <th className='px-2 py-4 text-center font-medium flex flex-col justify-center items-center gap-3'>
                        <img src={student.imageUrl} alt='' className='rounded-full object-cover w-[50px] ' />
                        <span className='font-semibold '>{student.name}</span>
                      </th>
                      <th className='px-2 py-4 text-center font-medium'>{student.email}</th>
                      <th className='px-2 py-4 text-center font-medium w-[20%] '>{student.phone}</th>
                      <th className='px-2 py-4 text-center font-medium w-[15%] '>{student.role}</th>
                      <th className='px-2 py-4 text-center font-medium w-[15%] '>
                        {formatTime(student.registeredAt) + '/' + formatDateTime(student.registeredAt)}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
                        {formatTime(student.attendanceAt) + '/' + formatDateTime(student.attendanceAt)}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventDetailRegister
