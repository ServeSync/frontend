import ModalCustom from 'src/modules/Share/components/Modal'

interface Props {
  mapImageURL: string | null
  isOpenModalMapImage: boolean
  handleCloseModalMapImage: () => void
}

const MapImageModal = ({ mapImageURL, isOpenModalMapImage, handleCloseModalMapImage }: Props) => {
  return (
    <ModalCustom isOpenModal={isOpenModalMapImage} handleClose={handleCloseModalMapImage}>
      <div className='col-span-1 flex justify-center outline-none'>
        {mapImageURL && <img src={mapImageURL} alt='Static Map' className='rounded-lg h-[500px] outline-none' />}
      </div>
    </ModalCustom>
  )
}

export default MapImageModal
