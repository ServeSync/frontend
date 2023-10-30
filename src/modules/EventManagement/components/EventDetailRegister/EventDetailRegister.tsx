const EventDetailRegister = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col gap-5'>
        <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>VAI TRÒ THAM DỰ</h1>
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
              <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'>
                <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                  Người tham dự
                </th>
                <th className='px-2 py-4 text-center font-medium'>Người tham dự sự kiện</th>
                <th className='px-2 py-4 text-center font-medium'>100</th>
                <th className='px-2 py-4 text-center font-medium'>100</th>
                <th className='px-2 py-4 text-center font-medium'>100</th>
                <th className='px-2 py-4 text-center font-medium'>5</th>
                <th className='px-2 py-4 text-center font-medium'>
                  <input type='checkbox' checked={true} disabled readOnly />
                </th>
              </tr>
              <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'>
                <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                  Người tham dự
                </th>
                <th className='px-2 py-4 text-center font-medium'>Người tham dự sự kiện</th>
                <th className='px-2 py-4 text-center font-medium'>100</th>
                <th className='px-2 py-4 text-center font-medium'>100</th>
                <th className='px-2 py-4 text-center font-medium'>100</th>
                <th className='px-2 py-4 text-center font-medium'>5</th>
                <th className='px-2 py-4 text-center font-medium'>
                  <input type='checkbox' checked={false} disabled readOnly />
                </th>
              </tr>
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
              <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'>
                <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                  11:00 10/10/2023
                </th>
                <th className='px-2 py-4 text-center font-medium'>12:00 10/10/2023</th>
                <th className='px-2 py-4 text-center font-medium'>Đang diễn ra </th>
              </tr>
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
              <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'>
                <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                  11:00 10/10/2023
                </th>
                <th className='px-2 py-4 text-center font-medium'>12:00 10/10/2023</th>
                <th className='px-2 py-4 text-center font-medium'>Đang diễn ra </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
          danh sách sinh viên đã đăng ký
        </h1>
        <div className=''>
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
              </tr>
            </thead>
            <tbody>
              <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'>
                <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                  <img
                    src='https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/735.jpg'
                    alt=''
                    className='rounded-full object-cover w-[50px]'
                  />
                  <div className='flex flex-col'>
                    <span className='font-semibold'>Kristopher Luettgen</span>
                    <span className='text-gray-400'>Movies, Kids & Industrial</span>
                  </div>
                </th>
                <th className='px-2 py-4 text-center font-medium'>ronle9519@gmail.com</th>
                <th className='px-2 py-4 text-center font-medium w-[20%] '>(684) 555-0102</th>
                <th className='px-2 py-4 text-center font-medium w-[15%] '>Diễn giả</th>
              </tr>
              <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'>
                <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                  <img
                    src='https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/735.jpg'
                    alt=''
                    className='rounded-full object-cover w-[50px]'
                  />
                  <div className='flex flex-col'>
                    <span className='font-semibold'>Kristopher Luettgen</span>
                    <span className='text-gray-400'>Movies, Kids & Industrial</span>
                  </div>
                </th>
                <th className='px-2 py-4 text-center font-medium'>ronle9519@gmail.com</th>
                <th className='px-2 py-4 text-center font-medium w-[20%] '>(684) 555-0102</th>
                <th className='px-2 py-4 text-center font-medium w-[15%] '>Diễn giả</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <h1 className='uppercase text-[44px] font-normal break-words tracking-[8px] text-[#26C6DA]'>
          danh sách sinh viên đã điểm danh
        </h1>
        <div className=''>
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
                  <span>Thời gian</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'>
                <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                  <img
                    src='https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/735.jpg'
                    alt=''
                    className='rounded-full object-cover w-[50px]'
                  />
                  <div className='flex flex-col'>
                    <span className='font-semibold'>Kristopher Luettgen</span>
                    <span className='text-gray-400'>Movies, Kids & Industrial</span>
                  </div>
                </th>
                <th className='px-2 py-4 text-center font-medium'>ronle9519@gmail.com</th>
                <th className='px-2 py-4 text-center font-medium w-[20%] '>(684) 555-0102</th>
                <th className='px-2 py-4 text-center font-medium w-[15%] '>Diễn giả</th>
              </tr>
              <tr className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'>
                <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                  <img
                    src='https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/735.jpg'
                    alt=''
                    className='rounded-full object-cover w-[50px]'
                  />
                  <div className='flex flex-col'>
                    <span className='font-semibold'>Kristopher Luettgen</span>
                    <span className='text-gray-400'>Movies, Kids & Industrial</span>
                  </div>
                </th>
                <th className='px-2 py-4 text-center font-medium'>ronle9519@gmail.com</th>
                <th className='px-2 py-4 text-center font-medium w-[20%] '>(684) 555-0102</th>
                <th className='px-2 py-4 text-center font-medium w-[15%] '>Diễn giả</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EventDetailRegister
