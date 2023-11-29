import { Autocomplete, TextField } from '@mui/material'
import Button from '../../../Share/components/Button'
import { GetAllEventsQuery } from 'src/modules/EventManagement/services'
import { useState } from 'react'
import ModalCustom from 'src/modules/Share/components/Modal'
import ProofForm from '../ProofForm'

interface Props {
  handleCloseModalProofSelect: () => void
}

const ProofSelect = ({ handleCloseModalProofSelect }: Props) => {
  const [eventId, setEventId] = useState<string>()

  const getAllEventsQuery = new GetAllEventsQuery()
  const eventsList = getAllEventsQuery.fetch()
  const events = eventsList && eventsList.data

  const [isOpenModalProofForm, setIsOpenModalProofForm] = useState<boolean>(false)

  const handleOpenModalProofForm = () => {
    setIsOpenModalProofForm(true)
  }

  const handleCloseModalProofForm = () => {
    setIsOpenModalProofForm(false)
  }

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white p-6 rounded-lg w-[620px]'>
      <div className='flex justify-between items-center w-full'>
        <div>
          <h2 className='text-[20px] font-semibold'>Đơn nộp minh chứng</h2>
          <h4 className='text-[12px]'>Đơn này với mục đích nhà trường sẽ xác nhận bạn đã tham gia sự kiện trước đó.</h4>
        </div>
        <Button classNameButton='p-2 hover:bg-slate-100 rounded-lg' onClick={handleCloseModalProofSelect}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 '
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </Button>
      </div>
      <form className='w-full'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <label htmlFor='event_id'>Sự kiện</label>
            <Autocomplete
              disablePortal
              id='event_id'
              options={events ? events : []}
              value={(events && events.find((option) => option.id === eventId)) || null}
              getOptionLabel={(option) => option.name}
              noOptionsText='Không có lựa chọn'
              renderInput={(params) => <TextField {...params} />}
              onChange={(_, option) => {
                setEventId(option ? option.id : '')
              }}
            />
          </div>
          <div className='flex justify-end items-center'>
            <Button
              onClick={handleOpenModalProofForm}
              type='button'
              classNameButton='flex justify-center items-center bg-[#26c6da] w-[118px] h-[40px] text-white p-2 rounded-xl font-semibold transition-all duration-300 hover:bg-[#195E8E]/90'
            >
              Xác nhận
            </Button>
          </div>
          <ModalCustom isOpenModal={isOpenModalProofForm} handleClose={handleCloseModalProofForm}>
            <ProofForm handleCloseModalProofForm={handleCloseModalProofForm} eventId={eventId} />
          </ModalCustom>
        </div>
      </form>
    </div>
  )
}

export default ProofSelect
