import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Button from '../../../../Share/components/Button'
import { useEffect, useState } from 'react'
import ModalCustom from 'src/modules/Share/components/Modal'
import { proofTypes } from 'src/modules/StudentManagement/constants'
import CreateProofInternal from '../CreateProofInternal'
import CreateProofExternal from '../CreateProofExternal'
import CreateProofSpecial from '../CreateProofSpecial'

interface Props {
  handleCloseModalProofSelect: () => void
  studentId: string
}

const CreateProofPage = ({ handleCloseModalProofSelect, studentId }: Props) => {
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

  const [isOpenModalProofFormSpecial, setIsOpenModalProofFormSpecial] = useState<boolean>(false)

  const handleOpenModalProofFormSpecial = () => {
    setIsOpenModalProofFormSpecial(true)
  }

  const handleCloseModalProofFormSpecial = () => {
    setIsOpenModalProofFormSpecial(false)
  }

  useEffect(() => {
    proofType === 'internal' && handleOpenModalProofFormInternal()
    proofType === 'external' && handleOpenModalProofFormExternal()
    proofType === 'special' && handleOpenModalProofFormSpecial()
    setProofType('')
  }, [proofType])

  return (
    <div className='flex flex-col justify-between gap-6 items-center bg-white px-6 rounded-lg w-[620px] pt-8 pb-16'>
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
            <FormControl variant='standard' sx={{ minWidth: 120 }}>
              <InputLabel id='demo-simple-select-standard-label'>Chọn loại minh chứng</InputLabel>
              <Select labelId='proof_type_id' id='proof_type' label='Loại minh chứng' className='pt-2'>
                {proofTypes.map((item) => (
                  <MenuItem
                    value={item.id}
                    key={item.id}
                    onClick={() => {
                      setProofType(item.id)
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <ModalCustom isOpenModal={isOpenModalProofFormInternal} handleClose={handleCloseModalProofFormInternal}>
            <CreateProofInternal
              handleCloseModalProofFormInternal={handleCloseModalProofFormInternal}
              handleCloseModalProofSelect={handleCloseModalProofSelect}
              studentId={studentId}
            />
          </ModalCustom>
          <ModalCustom isOpenModal={isOpenModalProofFormExternal} handleClose={handleCloseModalProofFormExternal}>
            <CreateProofExternal
              handleCloseModalProofFormExternal={handleCloseModalProofFormExternal}
              handleCloseModalProofSelect={handleCloseModalProofSelect}
            />
          </ModalCustom>
          <ModalCustom isOpenModal={isOpenModalProofFormSpecial} handleClose={handleCloseModalProofFormSpecial}>
            <CreateProofSpecial
              handleCloseModalProofFormSpecial={handleCloseModalProofFormSpecial}
              handleCloseModalProofSelect={handleCloseModalProofSelect}
            />
          </ModalCustom>
        </div>
      </form>
    </div>
  )
}

export default CreateProofPage
