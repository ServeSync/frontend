import { Box, Modal } from '@mui/material'
interface Props {
  isOpenModal: boolean
  handleClose: () => void
  children: React.ReactNode
}

const ModalCustom = ({ isOpenModal, handleClose, children }: Props) => {
  return (
    <Modal
      className='!z-50 h-screen flex items-center justify-center'
      open={isOpenModal}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='flex items-center justify-center'>{children}</Box>
    </Modal>
  )
}

export default ModalCustom
