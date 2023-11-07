/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import { EventsListType } from 'src/modules/EventManagement/interfaces'
import CardEvent from '../CardEvent'

interface Props {
  heading: string
  title: string
  event: EventsListType
}
SwiperCore.use([Navigation, Pagination])

const ContainerEvent = ({ heading, title, event }: Props) => {
  return (
    <div className='flex flex-col gap-10 justify-between max-lg:items-center w-full py-8 px-4 m-auto mt-10 relative'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-[#F85E9F] uppercase text-[44px] font-normal tracking-[4px] break-words'>{heading}</h2>
        <h3 className='font-normal text-[24px] leading-9 break-words'>{title}</h3>
      </div>
      <div className='overflow-hidden py-10 w-full px-4'>
        <Swiper
          slidesPerView={3}
          spaceBetween={40}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Pagination, Navigation]}
          className='px-6 !overflow-visible flex'
        >
          {event &&
            event.data.length > 0 &&
            event.data.map((event, index) => (
              <SwiperSlide key={index}>
                <CardEvent event={event} />
              </SwiperSlide>
            ))}
          {event && event.data.length === 0 && (
            <div className='flex w-full items-center justify-center'>
              <div className='text-center'>
                <div className='inline-flex rounded-full bg-[#c6f8ff] p-4'>
                  <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' id='calendar'>
                    <path d='M53 5h-8v4H19V5h-8v4H0v50h64V9H53V5zm-6 2h4v6h-4V7zM13 7h4v6h-4V7zM2 57V19h60v38H2zm60-46v6H2v-6h9v4h8v-4h26v4h8v-4h9z'></path>
                  </svg>
                </div>
                <h1 className='mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]'>
                  Không có sự kiện vào thời điểm này
                </h1>
              </div>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default ContainerEvent
