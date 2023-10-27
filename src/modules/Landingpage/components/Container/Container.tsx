/* eslint-disable import/no-unresolved */
import { Link } from 'react-router-dom'
import {} from '@material-tailwind/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import path from 'src/modules/Share/constants/path'
import CardEvent from '../CardEvent'
import { EventsListType } from 'src/modules/EventManagement/interfaces'

interface Props {
  eventsDone: EventsListType
  eventsHappending: EventsListType
  eventsUpcoming: EventsListType
}

SwiperCore.use([Navigation, Pagination])
const Container = ({ eventsDone, eventsHappending, eventsUpcoming }: Props) => {
  return (
    <div className='flex flex-col mb-[200px] '>
      <div className='flex max-lg:flex-col gap-10 justify-between items-center max-w-screen-xl w-full py-8 px-4 m-auto '>
        <div className='flex flex-col gap-11 lg:max-w-[50%] max-lg:items-center '>
          <div className='w-full text-black text-[69px] font-normal leading-[82px] break-words'>
            Tham gia <span className='text-[#26C6DA]'> hoạt động cộng đồng</span> cùng mình nhé!
          </div>
          <div className='text-[#19182580] text-[18px] font-normal leading-7 break-words'>
            Chúng tôi mở đường cho bạn tìm đến các hoạt động phù hợp với bản thân.
          </div>
          <div className='flex flex-col gap-4'>
            <Link
              to={path.login}
              className='px-8 py-4 bg-[#26c6da] justify-center items-start inline-flex gap-2 rounded-[100px] text-[#eeeeee] text-[16px] w-[150px]'
            >
              Bắt đầu
            </Link>
            <Link
              to={path.request_event}
              className='px-4 justify-start items-start inline-flex gap-2 text-black text-[12px] rounded-full w-full hover:underline'
            >
              Tham gia với tư cách nhà tổ chức sự kiện
            </Link>
          </div>
        </div>
        <div className=''>
          <img
            src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1698624000&Signature=ltw6vplHGB7GWLlv-ktkGa6oJe3upmWZYuXjUUlK31dpLTi-16JYluKFEXHI2om0WP8doa0Ufk9yIH9FsutvDMXiueJfKFP02vPiI-7DeJ4~IwOLMugkg4ISB4HCD1kTYY4PtXT8pgK6ICCFdGDy4y3av7nLslTrB2w3zipoX4ALgGLSNkurh9AuMCLNK~RWMkuQRnA9ZSLekjvqGeEAzi~9WwxiDZd53JBWYNbjnJ5jUhPzsCl81JSfuwefOooHf7IfdFEHJFbTcxlZlUDK2~1xZf2SG44FoHRZDbgAirgoZcC0OEeDXPNDgZZ6J2PSxXPYluozhppGqAc4ZlGvww__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt=''
            className='rounded-[30px]'
          />
        </div>
      </div>
      <div className='flex justify-between max-lg:flex-col items-center gap-20 max-w-screen-xl w-full py-8 px-4 m-auto'>
        <div className='lg:max-w-[50%] relative'>
          <img
            src='https://s3-alpha-sig.figma.com/img/009c/540d/95f73101eb52a8e05f8d6932d3340bcb?Expires=1698624000&Signature=A~vZn7wHfk9yqo8d02DT5jGTrK6oo-UyOkdJvMwRcFG8m6QL4mfLtwv0NoJM3sApF4W1A3CbV-VaPdIxdginwo3KTnAvnkuZMW~kRPZ0P6x92IZ1eY1To6NNwCWQ~IsSbzbGrd23hbNIPoyZ8CCZqfrt8hZoJ07qtvGERAemN-ssL63kdZ~DBViih0aROJOc9IMisk~Rkdk1wYB-00HfkmbguyZatnUfHwdUvP77TvoD74M42grrrBrg15ynArUSTOjlilpXB1PEVbTnFhLQCiOYuqIAYrtKIhvT62UXV4idTt~UKeHwA9CDhJJAQK5dloSJ1YDhfdLBW1hLI84DqQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt=''
            className='rounded-[30px] z-20 relative'
          />
          <div className='absolute w-[110%] h-[80%] bg-[#26C6DA] top-[200px] left-[-100px] z-10 rounded-r-full'></div>
        </div>
        <div className='relative flex flex-col gap-5 mt-20'>
          <div className='text-[#F85E9F] text-[23px] font-normal uppercase leading-7 break-words'>Điểm tích lũy</div>
          <div className='text-[44px] font-normal leading-10 '>Chúng tôi giúp bạn tìm đến các hoạt động phù hợp</div>
          <div className='grid grid-cols-1 sm:grid-cols-2 mt-5 gap-10'>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <div className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>500+</div>
              <div className='text-[#191825] text-[18px] font-normal leading-7 '>Sự kiện đã tổ chức</div>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <div className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>100</div>
              <div className='text-[#191825] text-[18px] font-normal leading-7 '>Nhà tổ chức sự kiện</div>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <div className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>700+</div>
              <div className='text-[#191825] text-[18px] font-normal leading-7 '>Sinh viên tham gia</div>
            </div>
            <div className='flex flex-col gap-4 items-center justify-center border rounded-3xl p-8'>
              <div className='text-[#FF5722] text-[35px] font-normal leading-10 break-words'>2k+</div>
              <div className='text-[#191825] text-[18px] font-normal leading-7 '>Đánh giá tích cực</div>
            </div>
          </div>
          <div className='absolute w-[50%] h-[50%] bg-[#26C6DA] shadow-xl blur-[200px] top-[-100px] right-[0px] max-lg:right-0'></div>
        </div>
      </div>
      <div className='flex max-lg:flex-col gap-28 justify-between max-lg:items-center max-w-screen-xl w-full py-8 px-4 m-auto mt-40'>
        <div className='flex flex-col gap-11  max-lg:items-center relative'>
          <div className='flex flex-col'>
            <div className='text-[#F85E9F] text-[44px] font-normal uppercase leading-[52px] break-words tracking-[8px]'>
              Tham gia sự kiện
            </div>
            <div className='text-[30px] font-normal leading-9 mt-4'>Quy trình tham gia sự kiện</div>
            <div className='text-[18px] font-normal leading-7 break-words text-[#19182580] mt-8'>
              Quy trình tham gia sự kiện đơn giản, đảm bảo bạn là yếu tố cần thiết cho sự kiện.
            </div>
          </div>
          <div className='flex flex-col gap-16'>
            <div className='flex items-center gap-8'>
              <div className='bg-[#FF5722] rounded-3xl p-8 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </div>
              <div className='text-[23px] font-normal leading-7 break-words'>Chọn sự kiện phù hợp với bạn</div>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#FACD49] rounded-3xl p-8 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                  />
                </svg>
              </div>
              <div className='text-[23px] font-normal leading-7 break-words'>
                Gửi lời ngỏ ý tham gia của bạn đến ban tổ chức
              </div>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#F85E9F] rounded-3xl p-8 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
                  />
                </svg>
              </div>
              <div className='text-[23px] font-normal leading-7 break-words'>Nhận lời mời tham gia sự kiện </div>
            </div>
            <div className='flex  items-center gap-8'>
              <div className='bg-[#F85E9F] rounded-3xl p-8 text-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z'
                  />
                </svg>
              </div>
              <div className='text-[23px] font-normal leading-7 break-words'>Tham gia và tích lũy điểm</div>
            </div>
          </div>
          <div className='w-[50%] h-[50%] bg-[#26C6DA] shadow-xl blur-[200px] absolute top-[-100px] left-[-250px]'></div>
        </div>
        <div className='max-w-[45%]'>
          <div className='relative'>
            <img
              src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1698624000&Signature=dbrogaOmzyYsShCPMPqGrMqXM~ABWE-myC-1EKKfzmZ3iz1w9ThIft9ej6Ux4hY4Fk1a2cnb4Ewk9kGIMcBkZOSFzdh2bKPcF6DgZBbtM9eMLa7CcLnQZcUy~X5X1ZAbaMCSwcUYzINn9e0JoB1coab~HQX0PVk9vnc-c7RXMwiYVkjiH2RdGOVzaZ4em5aeJ4II8NMIhz1qw9x8L6uj1vA8k3u-Jqz1JVvP1lBtd7hCh-Weqp0M2DyMjWArwgqUSzXoy~4ebmhIPb2nnPTWiQQiIOlb0Lg0nGVVFnta~-fT5P9sVi2mIHBp2zaCpa7xDrEN1Bkn8PLvyUHIYCka8Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
              alt=''
              className='rounded-full '
            />
            <div className='absolute top-[300px] left-60 bg-white rounded-full max-md:top-[150px] max-md:left-20'>
              <img
                src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1698624000&Signature=ltw6vplHGB7GWLlv-ktkGa6oJe3upmWZYuXjUUlK31dpLTi-16JYluKFEXHI2om0WP8doa0Ufk9yIH9FsutvDMXiueJfKFP02vPiI-7DeJ4~IwOLMugkg4ISB4HCD1kTYY4PtXT8pgK6ICCFdGDy4y3av7nLslTrB2w3zipoX4ALgGLSNkurh9AuMCLNK~RWMkuQRnA9ZSLekjvqGeEAzi~9WwxiDZd53JBWYNbjnJ5jUhPzsCl81JSfuwefOooHf7IfdFEHJFbTcxlZlUDK2~1xZf2SG44FoHRZDbgAirgoZcC0OEeDXPNDgZZ6J2PSxXPYluozhppGqAc4ZlGvww__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                alt=''
                className='rounded-full p-4'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-10 justify-between max-lg:items-center max-w-screen-xl w-full py-8 px-4 m-auto mt-10 relative'>
        <div className='flex flex-col gap-4'>
          <div className='text-[#F85E9F] uppercase text-[44px] font-normal tracking-[8px] break-words'>
            Sự kiện sắp diễn ra
          </div>
          <div className='font-normal text-[30px] leading-9 break-words'>Sự kiện sắp tổ chức tới đây</div>
        </div>
        <div className='overflow-hidden py-10 w-full '>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className=' px-6 !overflow-visible flex'
          >
            {eventsUpcoming &&
              eventsUpcoming.data.length > 0 &&
              eventsUpcoming.data.map((event, index) => (
                <SwiperSlide key={index}>
                  <CardEvent event={event} />
                </SwiperSlide>
              ))}
            {eventsUpcoming && eventsUpcoming.data.length === 0 && (
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
        <div className='w-[40%] h-[40%] bg-[#26C6DA]/50 shadow-xl blur-[300px] absolute top-40 left-[-100px]'></div>
      </div>
      <div className='flex flex-col gap-10 justify-between max-lg:items-center max-w-screen-xl w-full py-8 px-4 m-auto mt-10 relative'>
        <div className='flex flex-col gap-4'>
          <div className='text-[#F85E9F] uppercase text-[44px] font-normal tracking-[8px] break-words'>
            Sự kiện đang diễn ra
          </div>
          <div className='font-normal text-[30px] leading-9 break-words'>Sự kiện đang được tổ chức </div>
        </div>
        <div className='overflow-hidden py-10 w-full '>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className=' px-6 !overflow-visible flex'
          >
            {eventsHappending &&
              eventsHappending.data.map((event, index) => (
                <SwiperSlide key={index}>
                  <CardEvent event={event} />
                </SwiperSlide>
              ))}
            {eventsHappending && eventsHappending.data.length === 0 && (
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
        <div className='w-[40%] h-[40%] bg-[#26C6DA]/50 shadow-xl blur-[300px] absolute top-40 left-[-100px]'></div>
      </div>
      <div className='flex flex-col gap-10 justify-between max-lg:items-center max-w-screen-xl w-full py-8 px-4 m-auto mt-10 relative'>
        <div className='flex flex-col gap-4'>
          <div className='text-[#F85E9F] uppercase text-[44px] font-normal tracking-[8px] break-words'>
            Sự kiện đã kết thúc
          </div>
          <div className='font-normal text-[30px] leading-9 break-words'>Sự kiện đã hoàn thành tổ chức </div>
        </div>
        <div className='overflow-hidden py-10 w-full '>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation]}
            className=' px-6 !overflow-visible flex'
          >
            {eventsDone &&
              eventsDone.data.map((event, index) => (
                <SwiperSlide key={index}>
                  <CardEvent event={event} />
                </SwiperSlide>
              ))}
            {eventsDone && eventsDone.data.length === 0 && (
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
        <div className='w-[40%] h-[40%] bg-[#26C6DA]/50 shadow-xl blur-[300px] absolute top-40 left-[-100px]'></div>
      </div>

      <div className='flex flex-col justify-center items-center py-8 px-4 m-auto max-w-screen-xl mt-20'>
        <div className='w-full h-full lg:px-40 py-12 inline-flex justify-center items-center relative'>
          <div className='text-center text-[44px] font-normal leading-[52px] break-words'>
            Tham gia cùng chúng mình để cùng tay tạo nên các khoảnh khắc đáng nhớ nhé!
          </div>
          <div className='w-[50%] h-[50%] bg-[#26C6DA]/80 shadow-xl blur-[150px] absolute top-20'></div>
        </div>
        <div className=' mx-auto px-5 py-2 lg:px-32 lg:pt-24'>
          <div className='-m-1 flex flex-wrap md:-m-2'>
            <div className='flex w-1/2 flex-wrap'>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1699228800&Signature=Irn7kP7enF9PUJTJ-P6shE79PGWHjqOwI29BLnNvPUh6Ju7Jut23Gpi79k~cliPqHI6POeAcnnJGt-Qx1BpqXNRG8KZuy-BYTUN6RMvci2~KhiNlnU0rlziPVqtZZ9pK8uUtDVWuQjQt-uO7XpgU4mHDcAJegY-R31lFKHpfZZtQAIiSdMqlBA4Kf1C3fTs2Om4ziBaNW~KuMGeKgeS9o1O3gKI3b19qkN4cbXDOlemz1r8~7B2r5DD6rpg-474IQUVsfKYiL65yJw0l5xDd0CV8xTRAN41Te1fwTR49ICPnTBBzEnhnvA0yRsBBgDHFZQVPotLjBShuqEFR8JX78A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1699228800&Signature=Irn7kP7enF9PUJTJ-P6shE79PGWHjqOwI29BLnNvPUh6Ju7Jut23Gpi79k~cliPqHI6POeAcnnJGt-Qx1BpqXNRG8KZuy-BYTUN6RMvci2~KhiNlnU0rlziPVqtZZ9pK8uUtDVWuQjQt-uO7XpgU4mHDcAJegY-R31lFKHpfZZtQAIiSdMqlBA4Kf1C3fTs2Om4ziBaNW~KuMGeKgeS9o1O3gKI3b19qkN4cbXDOlemz1r8~7B2r5DD6rpg-474IQUVsfKYiL65yJw0l5xDd0CV8xTRAN41Te1fwTR49ICPnTBBzEnhnvA0yRsBBgDHFZQVPotLjBShuqEFR8JX78A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-full p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/29cb/6860/0ba1ef31dd9cebc579284487687bfbcc?Expires=1699228800&Signature=Irn7kP7enF9PUJTJ-P6shE79PGWHjqOwI29BLnNvPUh6Ju7Jut23Gpi79k~cliPqHI6POeAcnnJGt-Qx1BpqXNRG8KZuy-BYTUN6RMvci2~KhiNlnU0rlziPVqtZZ9pK8uUtDVWuQjQt-uO7XpgU4mHDcAJegY-R31lFKHpfZZtQAIiSdMqlBA4Kf1C3fTs2Om4ziBaNW~KuMGeKgeS9o1O3gKI3b19qkN4cbXDOlemz1r8~7B2r5DD6rpg-474IQUVsfKYiL65yJw0l5xDd0CV8xTRAN41Te1fwTR49ICPnTBBzEnhnvA0yRsBBgDHFZQVPotLjBShuqEFR8JX78A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
            </div>
            <div className='flex w-1/2 flex-wrap'>
              <div className='w-full p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699228800&Signature=lAXe1LY7TIoqQsQFZ449oMxLAax~vH1jgj05umunVrwcG0YuF0vwCRXoGmfVeF1d0UMhatepyE8pAu1KBErhXoV7Qw5qYWOzcR9YQKvVPiTHPfgi6JA-dupbe~HTDmxf8SjA3qsmCI6lBuM6ihdkWzDPP9Hb0Rqw651IhYjyzRyH7hcAvQwwvjlMrb0WWCKjOiOiNsgJNY2VvyxTEdZk5ng0HHmurdMiCwePzmieafI0Sa1IDIhH0IxEiHAX3PNBA5MEQmcAiWNF99mBxjuLrAJeisof37BZT5l7hbmjpGIswyU25Ir463lmmxC4j8BnCuBaDL4ovfN6eS3fs7blVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699228800&Signature=lAXe1LY7TIoqQsQFZ449oMxLAax~vH1jgj05umunVrwcG0YuF0vwCRXoGmfVeF1d0UMhatepyE8pAu1KBErhXoV7Qw5qYWOzcR9YQKvVPiTHPfgi6JA-dupbe~HTDmxf8SjA3qsmCI6lBuM6ihdkWzDPP9Hb0Rqw651IhYjyzRyH7hcAvQwwvjlMrb0WWCKjOiOiNsgJNY2VvyxTEdZk5ng0HHmurdMiCwePzmieafI0Sa1IDIhH0IxEiHAX3PNBA5MEQmcAiWNF99mBxjuLrAJeisof37BZT5l7hbmjpGIswyU25Ir463lmmxC4j8BnCuBaDL4ovfN6eS3fs7blVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
              <div className='w-1/2 p-1 md:p-2'>
                <img
                  alt='gallery'
                  className='block h-full w-full rounded-lg object-cover object-center'
                  src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699228800&Signature=lAXe1LY7TIoqQsQFZ449oMxLAax~vH1jgj05umunVrwcG0YuF0vwCRXoGmfVeF1d0UMhatepyE8pAu1KBErhXoV7Qw5qYWOzcR9YQKvVPiTHPfgi6JA-dupbe~HTDmxf8SjA3qsmCI6lBuM6ihdkWzDPP9Hb0Rqw651IhYjyzRyH7hcAvQwwvjlMrb0WWCKjOiOiNsgJNY2VvyxTEdZk5ng0HHmurdMiCwePzmieafI0Sa1IDIhH0IxEiHAX3PNBA5MEQmcAiWNF99mBxjuLrAJeisof37BZT5l7hbmjpGIswyU25Ir463lmmxC4j8BnCuBaDL4ovfN6eS3fs7blVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container
