import { FieldErrors, Control } from 'react-hook-form'
import { FormEventType } from '../../utils'
import { OrganizerTableHeader } from '../../constants'
import Skeleton from 'react-loading-skeleton'
import { EventOrganizationType } from '../../interfaces'

interface Props {
  errors: FieldErrors<FormEventType>
  control: Control<FormEventType>
  eventOrganization: EventOrganizationType
}

const EventOrganizerForm = ({ eventOrganization }: Props) => {
  return (
    <div className='border-[1px] border-gray-300 p-6 rounded-xl'>
      <h2 className='text-[20px] mb-4'>Thông tin ban tổ chức 1</h2>
      <div className='grid grid-cols-5 gap-6'>
        <div className='col-span-1'>
          <img src={eventOrganization.imageUrl} alt='avatar_organizer' className='' />
        </div>
        <div className='col-span-4'>
          <ul>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Tên tổ chức</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.name}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Email</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.email}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Phone</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.phoneNumber}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Địa chỉ</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.address}</span>
            </li>
            <li className='flex gap-4'>
              <div className='w-[100px] flex justify-between'>
                <span>Vai trò</span>
                <span>:</span>
              </div>
              <span>{eventOrganization.role}</span>
            </li>
          </ul>
        </div>
      </div>
      <h3 className='text-[16px] mb-4'>Thành viên</h3>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
        <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
          <tr className='text-[14px] text-gray-600'>
            {OrganizerTableHeader.map((item) => (
              <th className='px-2 py-2 font-medium text-center' key={item.id}>
                <span>{item.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <tr
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50'
                key={index}
              >
                <th className='px-2 py-4 font-medium'>
                  <Skeleton className='h-[16px]' borderRadius={20} />
                </th>
                <th className='px-2 py-4 font-medium'>
                  <Skeleton className='h-[16px]' borderRadius={20} />
                </th>
                <th className='px-2 py-4 font-medium'>
                  <Skeleton className='h-[16px]' borderRadius={20} />
                </th>
                <th className='px-2 py-4 font-medium'>
                  <Skeleton className='h-[16px]' borderRadius={20} />
                </th>
                <th className='px-2 py-4 font-medium'>
                  <Skeleton className='h-[16px]' borderRadius={20} />
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventOrganizerForm
