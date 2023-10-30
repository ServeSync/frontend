const EventDetailOrganizer = () => {
  return (
    <div className='border-[1px] border-gray-300 p-6 rounded-xl'>
      <h2 className='text-[20px] font-semibold mb-4'>Thông tin ban tổ chức</h2>
      <div className='grid grid-cols-5 gap-6  items-center'>
        <div className='col-span-1'>
          <img
            src='https://s3-alpha-sig.figma.com/img/51be/917f/f5c83179ef33f1b0910793a6bc3e939a?Expires=1699228800&Signature=YIDtrjL-GA4Lm6dadKlHJ~-3tHe9O2U8wQW8lsW70xulzDSa63tp-0NDPEyw9Pr53eDik7TiA5gaIr23YSvcYmbYPIAmFxJCWPweLHVw9A9CEVuOQUTKd-8hTjFiE7kOMXekWaP9iNJ-~LACCyZtvFMmyilIVAJ9y8C8pXnsn-3YeLXvrZBkd6~A9nxo8-1lfMp0NFwcElU-k1M-OMO~1glhSITo2c4iQ4MB7OluGWuEYP5esvBiu3BNNkz9JlB-mStGJGSdLkT5gXzCrGgMtFcXejgUAhvpCaB7srUYcqEph4UPKBig~mAkK2lKJkJwHft0c5FHaze9-7ahEIiZ4w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt=''
            className='rounded-xl h-full object-cover'
          />
        </div>
        <div className='col-span-4'>
          <ul>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Tên tổ chức</span>
                <span>:</span>
              </div>
              <span>Enlab Software</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Email</span>
                <span>:</span>
              </div>
              <span>enlab@software.com</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Phone</span>
                <span>:</span>
              </div>
              <span>0905857760</span>
            </li>
            <li className='flex gap-4 overflow-hidden'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Địa chỉ</span>
                <span>:</span>
              </div>
              <span className='line-clamp-1 flex-1'>27 Chế Viết Tấn</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between font-medium'>
                <span>Vai trò</span>
                <span>:</span>
              </div>
              <span>Nhà tổ chức</span>
            </li>
          </ul>
        </div>
      </div>
      <h3 className='text-[16px] mt-4 mb-2 font-semibold'>Thành viên</h3>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
        <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
          <tr className='text-[14px] text-gray-600'>
            <th className='px-2 py-2 text-center font-semibold'>
              <span>Họ và tên</span>
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
  )
}

export default EventDetailOrganizer
