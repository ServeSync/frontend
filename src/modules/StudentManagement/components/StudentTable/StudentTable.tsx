import { Link } from 'react-router-dom'
import path from 'src/modules/Share/constants/path'

const StudentTable = () => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 '>
      <thead className='bg-[#f7f8f9] border-[1px] border-gray-200'>
        <tr className='text-[14px] text-gray-600'>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>MSSV</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Họ tên</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Giới tính</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Ngày sinh</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Lớp</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer '>
            <span>Khoa</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer '>
            <span>Hệ đào tạo</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer '>
            <span>Số điện thoại</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer '>
            <span>Điểm</span>
          </th>
          <th className='w-[80px]'></th>
        </tr>
      </thead>
      <tbody>
        <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200'>
          <th className='px-4 py-4 font-medium'>102200180</th>
          <th className='px-4 py-4 font-medium'>Huỳnh Tấn Năng</th>
          <th className='px-4 py-4 font-medium'>Nam</th>
          <th className='px-4 py-4 font-medium'>09/03/2002</th>
          <th className='px-4 py-4 font-medium'>20TCLC_DT4</th>
          <th className='px-4 py-4 font-medium'>Công nghệ thông tin</th>
          <th className='px-4 py-4 font-medium'>Cử nhân</th>
          <th className='px-4 py-4 font-medium'>0776974310</th>
          <th className='px-4 py-4 font-medium'>61</th>
          <th className='px-4 py-4 font-medium'>
            <Link to={path.edit_student} className='w-[80px] flex items-center justify-center text-[#26C6DA]'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4 mr-2'>
                <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z' />
              </svg>
              <span className='hover:underline'>Sửa</span>
            </Link>
          </th>
        </tr>
        <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200'>
          <th className='px-4 py-4 font-medium'>102200190</th>
          <th className='px-4 py-4 font-medium'>Lê Quốc Rôn</th>
          <th className='px-4 py-4 font-medium'>Nam</th>
          <th className='px-4 py-4 font-medium'>16/05/2002</th>
          <th className='px-4 py-4 font-medium'>20TCLC_DT4</th>
          <th className='px-4 py-4 font-medium'>Công nghệ thông tin</th>
          <th className='px-4 py-4 font-medium'>Cử nhân</th>
          <th className='px-4 py-4 font-medium'>0123456789</th>
          <th className='px-4 py-4 font-medium'>61</th>
          <th className='px-4 py-4 font-medium'>
            <Link to={path.edit_student} className='w-[80px] flex items-center justify-center text-[#26C6DA]'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4 mr-2'>
                <path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z' />
              </svg>
              <span className='hover:underline'>Sửa</span>
            </Link>
          </th>
        </tr>
      </tbody>
    </table>
  )
}

export default StudentTable
