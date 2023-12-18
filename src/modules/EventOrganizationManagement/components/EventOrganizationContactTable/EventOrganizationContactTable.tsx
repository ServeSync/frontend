import { ContactType, EventOrganizationType } from '../../interfaces'
import { formatDateOfBirth } from 'src/modules/Share/utils'
import { gender } from 'src/modules/StudentManagement/constants'
import { EventOrganizationContactTableHeader, StatusOrganizationToMessage } from '../../constants'
import ModalCustom from 'src/modules/Share/components/Modal'
import { useState } from 'react'
import EditEventOrganizationContactPage from '../../pages/EditEventOrganizationContactPage'

interface Props {
  eventOrganization: EventOrganizationType
}

const EventOrganizationContactTable = ({ eventOrganization }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const [selectedItem, setSelectedItem] = useState<ContactType | null>(null)

  const handleOpenModalChange = (item: ContactType) => {
    setIsOpenModal(true)
    setSelectedItem(item)
  }

  const handleCloseModalChange = () => {
    setIsOpenModal(false)
    setSelectedItem(null)
  }

  return (
    <div>
      <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
        <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
          <tr className='text-[14px] text-gray-600'>
            {EventOrganizationContactTableHeader.map((item) => (
              <th className='px-2 py-2 font-semibold' key={item.id}>
                <span>{item.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {eventOrganization.contacts.map((item, id: number) => (
            <tr
              className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
              key={`${id}${item.id}`}
              onClick={() => handleOpenModalChange(item)}
            >
              <th className='px-2 py-4 font-medium flex items-center gap-3'>
                <img src={item.imageUrl} alt='' className='rounded-full object-cover w-[50px] h-[50px]' />
                <div className='flex flex-col'>
                  <span className='font-semibold'>{item.name}</span>
                  <span className='text-gray-400 text-[12px]'>{item.position}</span>
                </div>
              </th>
              <th className='px-2 py-4 font-medium'>{formatDateOfBirth(item.birth)}</th>
              <th className='px-2 py-4 font-medium'>
                {gender.find((option) => option.id === item.gender.toString())?.name}
              </th>
              <th className='px-2 py-4 font-medium'>{item.email}</th>
              <th className='px-2 py-4 font-medium'>{item.phoneNumber}</th>
              <th className='px-2 py-4 font-medium'>{StatusOrganizationToMessage(item.status)}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModalChange}>
        <EditEventOrganizationContactPage
          eventOrganization={eventOrganization}
          organizationContact={selectedItem}
          handleClose={handleCloseModalChange}
        />
      </ModalCustom>
    </div>
  )
}

export default EventOrganizationContactTable
