import { Fragment, useState } from 'react'
import Button from '../Button'
import { EventOrganizationType } from 'src/modules/EventOrganizationManagement/interfaces'
import EventOrganizationContactTable from 'src/modules/EventOrganizationManagement/components/EventOrganizationContactTable'
import ModalCustom from '../Modal'
import CreateEventOrganizationContactPage from 'src/modules/EventOrganizationManagement/pages/CreateEventOrganizationContactPage'
interface Props {
  organization: EventOrganizationType
}
const EditOrganizationInfo = ({ organization }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleOpenModalChange = () => {
    setIsOpenModal(true)
  }

  const handleCloseModalChange = () => {
    setIsOpenModal(false)
  }
  return (
    <Fragment>
      <div className='mt-4 mb-2 flex justify-end'>
        <Button
          onClick={handleOpenModalChange}
          classNameButton='text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg '
        >
          Mời thành viên gia nhập
        </Button>
      </div>
      <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModalChange}>
        <CreateEventOrganizationContactPage eventOrganization={organization} handleClose={handleCloseModalChange} />
      </ModalCustom>
      {organization.contacts.length == 0 ? (
        <div className='flex flex-col items-center mt-3 text-[#A0A2A4]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-12'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z'
            />
          </svg>
          <span className='text-[14px] font-normal'>Hiện tổ chức chưa có thành viên nào</span>
        </div>
      ) : (
        <EventOrganizationContactTable eventOrganization={organization} />
      )}
    </Fragment>
  )
}

export default EditOrganizationInfo
