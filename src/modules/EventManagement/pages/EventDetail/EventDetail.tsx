import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import EventRating from 'src/modules/Landingpage/components/EventRating/EventRating'
import path from 'src/modules/Share/constants/path'

const EventDetail = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Event Detail</title>
        <meta name='description' content='This is event detail page of the project' />
      </Helmet>
      <div className='relative bg-white w-full h-full py-[100px] px-[220px]'>
        <div className='flex flex-col gap-6 mb-10'>
          <div className='flex flex-col'>
            <h1 className='text-black text-[80px] font-semibold break-words'>DUT Job Fair</h1>
            <h4 className='text-black text-[25px] font-light break-words'>Write a small description for the event</h4>
            <h6 className='text-[#A0A2A4] text-[20px] font-light break-words'>Hoạt động tình nguyện</h6>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-4'>
              <div className='flex '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 max-sm:w-4 max-sm:h-4 flex-shrink-0'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                  />
                </svg>
                <span className='text-[#A0A2A4] text-[15px] font-normal break-words'>Thừa thiên huế</span>
              </div>
              <div className='flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 max-sm:w-4 max-sm:h-4 flex-shrink-0'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <span className='text-[#A0A2A4] text-[15px] font-normal break-words'>22/09/2023 - 23/09/2023</span>
              </div>
              <div className='flex justify-between '>
                <EventRating rating={4} />
                <div className='bg-[#58CCFE] rounded-2xl px-6 flex justify-center items-center py-1'>Đang diễn ra</div>
              </div>
            </div>
            <div className=''>
              <Link
                className='bg-[#0E91EF] text-white px-10 py-4 rounded-3xl shadow-md transition-all duration-300 hover:shadow-md  no-underline flex-shrink-0'
                to={path.login}
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
        <div className='relative mb-[55px]'>
          <img
            src='https://s3-alpha-sig.figma.com/img/7c55/c8f8/b6cd8b0885bfeed6a85d18f5883fe6f6?Expires=1699228800&Signature=lAXe1LY7TIoqQsQFZ449oMxLAax~vH1jgj05umunVrwcG0YuF0vwCRXoGmfVeF1d0UMhatepyE8pAu1KBErhXoV7Qw5qYWOzcR9YQKvVPiTHPfgi6JA-dupbe~HTDmxf8SjA3qsmCI6lBuM6ihdkWzDPP9Hb0Rqw651IhYjyzRyH7hcAvQwwvjlMrb0WWCKjOiOiNsgJNY2VvyxTEdZk5ng0HHmurdMiCwePzmieafI0Sa1IDIhH0IxEiHAX3PNBA5MEQmcAiWNF99mBxjuLrAJeisof37BZT5l7hbmjpGIswyU25Ir463lmmxC4j8BnCuBaDL4ovfN6eS3fs7blVQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
            alt=''
            className='w-full max-h-[500px] rounded-3xl max-w-full object-cover'
          />
        </div>
        <div className='w-full h-full bg-[#F4F4F4]'>a</div>
      </div>
    </Fragment>
  )
}

export default EventDetail
