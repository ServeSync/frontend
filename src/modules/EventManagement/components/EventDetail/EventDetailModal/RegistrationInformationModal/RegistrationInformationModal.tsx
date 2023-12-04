import { StatusEventToMessage, TimeInfoTableHeader } from 'src/modules/EventManagement/constants'
import { EventDetailType } from 'src/modules/EventManagement/interfaces'
import Button from 'src/modules/Share/components/Button'
import ModalCustom from 'src/modules/Share/components/Modal'
import { formatDateTime } from 'src/modules/Share/utils'

interface Props {
  event: EventDetailType
  isOpenModalRegistrationInfos: boolean
  handleCloseModalRegistrationInfos: () => void
}

const RegistrationInformationModal = ({
  event,
  isOpenModalRegistrationInfos,
  handleCloseModalRegistrationInfos
}: Props) => {
  return (
    <ModalCustom isOpenModal={isOpenModalRegistrationInfos} handleClose={handleCloseModalRegistrationInfos}>
      <div className='bg-white p-10 rounded-xl w-[800px]'>
        <div className='flex justify-between items-center'>
          <h2 className='text-[24px] font-semibold'>Khung giờ đăng ký</h2>
          <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalRegistrationInfos}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </Button>
        </div>
        <table className='w-full bg-white text-left border-[1px] border-gray-200 p-2 my-6'>
          <thead className='bg-[#edeeef] border-[1px] border-gray-200'>
            <tr className='text-[14px] text-gray-600'>
              {TimeInfoTableHeader.map((item) => (
                <th key={item.id} className='px-2 py-2 font-semibold'>
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {event.registrationInfos.map((registrationInfo) => (
              <tr
                key={registrationInfo.id}
                className='text-[14px] text-gray-600 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-100'
              >
                <th className='px-2 py-4 font-medium'>{formatDateTime(registrationInfo.startAt)}</th>
                <th className='px-2 py-4 font-medium'>{formatDateTime(registrationInfo.endAt)}</th>
                <th className='px-2 py-4 font-medium'>{StatusEventToMessage(registrationInfo.status)}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModalCustom>
  )
}

export default RegistrationInformationModal
