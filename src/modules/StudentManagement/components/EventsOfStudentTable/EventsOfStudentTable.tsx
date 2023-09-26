const EventsOfStudentTable = () => {
  return (
    <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 '>
      <thead className='bg-[#f7f8f9] border-[1px] border-gray-200'>
        <tr className='text-[14px] text-gray-600'>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Tên sự kiện</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Đơn vị tổ chức</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Người đại diện</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Vai trò</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer'>
            <span>Ngày</span>
          </th>
          <th className='px-4 py-2 font-medium cursor-pointer '>
            <span>Trạng thái</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200'>
          <th className='px-4 py-4 font-medium'>Hiến máu</th>
          <th className='px-4 py-4 font-medium'>ĐHBK</th>
          <th className='px-4 py-4 font-medium'>Ninh Khánh Duy</th>
          <th className='px-4 py-4 font-medium'>Quản lý chính</th>
          <th className='px-4 py-4 font-medium'>25/9/2023</th>
          <th className='px-4 py-4 font-medium'>Đang diễn ra</th>
        </tr>
      </tbody>
    </table>
  )
}

export default EventsOfStudentTable
