import { EventDetailType } from '../../../interfaces'

interface Props {
  event: EventDetailType
}
const EventDetailOrganization = ({ event }: Props) => {
  console.log(event)

  return (
    <div className='flex flex-col gap-10'>
      {event.organizations.map((organization, index) => (
        <div key={index} className='border-[1px] border-gray-300 p-6 rounded-xl overflow-hidden'>
          <h2 className='text-[20px] font-semibold mb-4'>Thông tin ban tổ chức</h2>
          <div className='grid grid-cols-5 gap-6  items-center'>
            <div className='col-span-1'>
              <img src={organization.imageUrl} alt='' className='rounded-xl h-full object-cover' />
            </div>
            <div className='col-span-3'>
              <ul>
                <li className='flex gap-4'>
                  <div className='w-[100px] flex justify-between font-medium'>
                    <span>Tên tổ chức</span>
                    <span>:</span>
                  </div>
                  <span>{organization.name}</span>
                </li>
                <li className='flex gap-4'>
                  <div className='w-[100px] flex justify-between font-medium'>
                    <span>Email</span>
                    <span>:</span>
                  </div>
                  <span>{organization.email}</span>
                </li>
                <li className='flex gap-4'>
                  <div className='w-[100px] flex justify-between font-medium'>
                    <span>Phone</span>
                    <span>:</span>
                  </div>
                  <span>{organization.phoneNumber}</span>
                </li>
                <li className='flex gap-4 overflow-hidden'>
                  <div className='w-[100px] flex justify-between font-medium'>
                    <span>Địa chỉ</span>
                    <span>:</span>
                  </div>
                  <span className='line-clamp-1 flex-1'>{organization.address}</span>
                </li>
                <li className='flex gap-4'>
                  <div className='w-[100px] flex justify-between font-medium'>
                    <span>Vai trò</span>
                    <span>:</span>
                  </div>
                  <span>{organization.role}</span>
                </li>
              </ul>
            </div>
            {organization.organizationId === event.representativeOrganization.organizationId && (
              <div className='col-span-1'>
                <div className='w-full flex '>
                  <div className='p-4 bg-red-200 rounded-lg flex justify-center items-center'>
                    <div className='text-center text-red-600 text-sm font-nunito font-light leading-20'>
                      Tổ chức đại diện
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              {organization.representatives.map((representative, index) => (
                <tr
                  key={index}
                  className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
                >
                  <th className='px-2 py-4 text-center font-medium flex justify-center items-center gap-3'>
                    <img src={representative.imageUrl} alt='' className='rounded-full object-cover w-[50px]' />
                    <div className='flex flex-col'>
                      <span className='font-semibold'>{representative.name}</span>
                      <span className='text-gray-400'>{representative.position}</span>
                    </div>
                  </th>
                  <th className='px-2 py-4 text-center font-medium'>{representative.email}</th>
                  <th className='px-2 py-4 text-center font-medium w-[20%] '>{representative.phoneNumber}</th>
                  <th className='px-2 py-4 text-center font-medium w-[15%] '>{representative.role}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default EventDetailOrganization
