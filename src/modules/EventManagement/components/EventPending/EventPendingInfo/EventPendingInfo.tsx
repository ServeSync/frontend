import { TextField } from '@mui/material'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { TypeToMessage } from 'src/modules/EventManagement/constants'
import { EventPendingType } from 'src/modules/EventManagement/interfaces'
import Button from 'src/modules/Share/components/Button'
import { formatDateTime } from 'src/modules/Share/utils'
import { useEffect, useMemo, useState } from 'react'
import ModalCustom from 'src/modules/Share/components/Modal'

interface Props {
  eventPending: EventPendingType
}
const EventPendingInfo = ({ eventPending }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [mapImageURL, setMapImageURL] = useState<string | null>(null)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const center = useMemo(() => {
    return {
      latitude: eventPending?.address?.latitude,
      longitude: eventPending?.address?.longitude
    }
  }, [eventPending])

  useEffect(() => {
    const googleMapsApiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    const imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${center.latitude},${center.longitude}&markers=color:red%7C%7C${center.latitude},${center.longitude}&zoom=15&size=1200x1200&key=${googleMapsApiKey}`
    setMapImageURL(imageURL)
  }, [center])

  if (!eventPending) return null

  const contentState = convertFromHTML(eventPending.description as string)
  const description = EditorState.createWithContent(
    ContentState.createFromBlockArray(contentState.contentBlocks, contentState.entityMap)
  )

  return (
    <div>
      <div className='flex flex-col gap-y-2'>
        <div className='grid grid-cols-12 gap-x-6 gap-y-4'>
          <div className='col-span-12 w-full text-[#195E8E] font-bold text-[42px] bg-transparent pr-4  outline-none'>
            {eventPending.name}
          </div>
          <div className='col-span-12 flex selection:items-center justify-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>
            <span className='w-full text-black/90 text-[16px] bg-transparent'>{eventPending.introduction}</span>
          </div>
          <div className='col-span-4'>
            <img src={eventPending.imageUrl} alt='' className='object-cover rounded-2xl w-full h-full' />
          </div>
          <div className='col-span-8 grid grid-cols-12 gap-4'>
            <div className='col-span-6'>
              <TextField
                className='w-full'
                label='Thời gian bắt đầu'
                value={formatDateTime(eventPending.startAt)}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-6'>
              <TextField
                className='w-full'
                label='Thời gian kết thúc'
                value={formatDateTime(eventPending.endAt)}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-12'>
              <TextField
                className='w-full'
                label='Địa điểm'
                value={eventPending.address.fullAddress}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-6'>
              <TextField
                className='w-full'
                label='Kinh độ'
                value={eventPending.address.longitude}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-5'>
              <TextField
                className='w-full'
                label='Vĩ độ'
                value={eventPending.address.latitude}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-1 flex justify-end'>
              <Button
                type='button'
                classNameButton='border-[1px] border-[#39a4b2] w-[48px] h-[48px] rounded-lg text-[#39a4b2] flex items-center justify-center'
                onClick={handleOpenModal}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525'
                  />
                </svg>
              </Button>
            </div>
            <ModalCustom isOpenModal={isOpenModal} handleClose={handleCloseModal}>
              {mapImageURL && <img src={mapImageURL} alt='Static Map' className='w-full object-cover rounded-2xl' />}
            </ModalCustom>
            <div className='col-span-6'>
              <TextField
                className='w-full'
                label='Loại sự kiện'
                value={TypeToMessage(eventPending.type)}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-6'>
              <TextField
                className='w-full'
                label='Số lượng tham gia'
                value={eventPending.capacity}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-6'>
              <TextField
                className='w-full'
                label='Danh mục sự kiện'
                value={eventPending.activity.eventCategoryName}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
            <div className='col-span-6'>
              <TextField
                className='w-full'
                label='Hoạt động sự kiện'
                value={eventPending.activity.name}
                InputProps={{
                  readOnly: true
                }}
              />
            </div>
          </div>
          <div className='col-span-12'>
            <div className='border-[1px] border-[#C8C8C8] rounded-lg overflow-hidden'>
              <Editor readOnly editorState={description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPendingInfo
