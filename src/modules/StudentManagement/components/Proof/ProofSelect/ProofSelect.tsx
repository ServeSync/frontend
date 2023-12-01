import { Autocomplete, TextField } from '@mui/material'
import Button from '../../../../Share/components/Button'
import { useEffect, useState } from 'react'
import ModalCustom from 'src/modules/Share/components/Modal'
import { proofTypes } from 'src/modules/StudentManagement/constants'
import ProofInternalForm from '../ProofInternalForm'
import ProofExternalForm from '../ProofExternalForm'

interface Props {
  handleCloseModalProofSelect: () => void
  studentId: string
}

const ProofSelect = ({ handleCloseModalProofSelect, studentId }: Props) => {
  const [proofType, setProofType] = useState<string>()

  const [isOpenModalProofFormInternal, setIsOpenModalProofFormInternal] = useState<boolean>(false)

  const handleOpenModalProofFormInternal = () => {
    setIsOpenModalProofFormInternal(true)
  }

  const handleCloseModalProofFormInternal = () => {
    setIsOpenModalProofFormInternal(false)
  }

  const [isOpenModalProofFormExternal, setIsOpenModalProofFormExternal] = useState<boolean>(false)

  const handleOpenModalProofFormExternal = () => {
    setIsOpenModalProofFormExternal(true)
  }

  const handleCloseModalProofFormExternal = () => {
    setIsOpenModalProofFormExternal(false)
  }

  useEffect(() => {
    proofType === 'internal' && handleOpenModalProofFormInternal()
    proofType === 'external' && handleOpenModalProofFormExternal()
  }, [proofType])

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
              options={proofTypes}
              value={proofTypes.find((option) => option.id === proofType)}
              getOptionLabel={(option) => option.name}
              noOptionsText='Không có lựa chọn'
              renderInput={(params) => <TextField {...params} />}
              onChange={(_, option) => {
                setProofType(option ? option.id : '')
              }}
            />
          </div>
          <ModalCustom isOpenModal={isOpenModalProofFormInternal} handleClose={handleCloseModalProofFormInternal}>
            <ProofInternalForm
              handleCloseModalProofFormInternal={handleCloseModalProofFormInternal}
              studentId={studentId}
            />
          </ModalCustom>
          <ModalCustom isOpenModal={isOpenModalProofFormExternal} handleClose={handleCloseModalProofFormExternal}>
            <ProofExternalForm handleCloseModalProofFormExternal={handleCloseModalProofFormExternal} />
          </ModalCustom>
        </div>
      </form>
    </div>
  )
}

export default ProofSelect
