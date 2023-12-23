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
    <div className='flex flex-col lg:gap-10 md:gap-4 w-full lg:py-8 lg:px-4 max-lg:py-4 m-auto md:mt-10 relative'>
      <div className='flex flex-col lg:gap-4'>
        <h2 className='text-[#F85E9F] lg:text-[44px] md:text-[30px] max-md:text-[14px] font-normal uppercase break-words lg:tracking-[4px] md:tracking-[3px] max-md:tracking-[2px]'>
          {heading}
        </h2>
        <h3 className='lg:text-[24px] md:text-[18px] max-md:text-[10px] font-normal leading-9'>{title}</h3>
      </div>
      <div className='overflow-hidden py-10 w-full px-4 hidden lg:block'>
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
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
                  <svg xmlns='http://www.w3.org/2000/svg' id='calendar' className='w-16 h-16'>
                    <path d='M53 5h-8v4H19V5h-8v4H0v50h64V9H53V5zm-6 2h4v6h-4V7zM13 7h4v6h-4V7zM2 57V19h60v38H2zm60-46v6H2v-6h9v4h8v-4h26v4h8v-4h9z'></path>
                  </svg>
                </div>
                <h1 className='mt-5 lg:text-[40px] md:text-[20px] max-md:text-[14px] font-bold text-slate-800 '>
                  Không có sự kiện vào thời điểm này
                </h1>
              </div>
            </div>
          )}
        </Swiper>
      </div>
      <div className='overflow-hidden py-8 w-full px-4 max-md:hidden md:block lg:hidden'>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
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
                  <svg xmlns='http://www.w3.org/2000/svg' id='calendar' className='w-16 h-16'>
                    <path d='M53 5h-8v4H19V5h-8v4H0v50h64V9H53V5zm-6 2h4v6h-4V7zM13 7h4v6h-4V7zM2 57V19h60v38H2zm60-46v6H2v-6h9v4h8v-4h26v4h8v-4h9z'></path>
                  </svg>
                </div>
                <h1 className='mt-5 lg:text-[40px] md:text-[20px] max-md:text-[14px] font-bold text-slate-800 '>
                  Không có sự kiện vào thời điểm này
                </h1>
              </div>
            </div>
          )}
        </Swiper>
      </div>
      <div className='overflow-hidden py-8 max-md:py-6 w-full px-4 max-md:block hidden'>
        <Swiper
          slidesPerView={2}
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
                  <svg xmlns='http://www.w3.org/2000/svg' id='calendar' className='w-16 h-16'>
                    <path d='M53 5h-8v4H19V5h-8v4H0v50h64V9H53V5zm-6 2h4v6h-4V7zM13 7h4v6h-4V7zM2 57V19h60v38H2zm60-46v6H2v-6h9v4h8v-4h26v4h8v-4h9z'></path>
                  </svg>
                </div>
                <h1 className='mt-5 lg:text-[40px] md:text-[20px] max-md:text-[14px] font-bold text-slate-800 '>
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
