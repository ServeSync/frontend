import { Box, Modal } from '@mui/material'
import { Link } from 'react-router-dom'
import InputCSV from '../InputCSV'
import Button from '../Button'

interface Props {
  isOpenModal: boolean
  handleClose: () => void
  onChangeFile: (file?: File) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitFile: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  previewNameFile: string
}

const ModalCustom = ({ isOpenModal, handleClose, onChangeFile, onSubmitFile, previewNameFile }: Props) => {
  return (
    <Modal
      className='z-50 h-screen flex items-center justify-center'
      open={isOpenModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='bg-white p-6 rounded-lg'>
        <h2 className='w-full text-center mb-3 text-[24px] font-semibold'> Nhập file</h2>
        <form onSubmit={onSubmitFile}>
          <InputCSV onChange={onChangeFile} previewNameFile={previewNameFile} />
          <p className='text-[14px] mt-2'>
            Lưu ý: File có định dạng tương tự như file
            <Link to='/!' className='text-[#26C6DA] hover:underline mx-1'>
              tham khảo
            </Link>
            sau đây
          </p>
          <div className='w-full flex justify-end mt-4'>
            <Button
              type='submit'
              classNameButton='flex items-center gap-1 text-[14px] font-semibold text-white bg-[#26C6DA] px-4 py-2 rounded-lg'
            >
              Hoàn tất
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

export default ModalCustom
