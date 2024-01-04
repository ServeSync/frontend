import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { GetAllEventsClientQuery } from 'src/modules/EventManagement/services'
import ListEvent from '../../components/ListEvent'
import { homePage_01, homePage_03 } from 'src/modules/Share/assets/image'

const EventsPage = () => {
  const getAllEventQuery = new GetAllEventsClientQuery()
  const events = getAllEventQuery.fetch()

  return (
    <Fragment>
      <Helmet>
        <title>Events</title>
        <meta name='description' content='This is events page of the project' />
      </Helmet>
      <div className='flex flex-col lg:pb-[120px] overflow-hidden '>
        <ListEvent events={events} pageSize={getAllEventQuery.getTotalPages()} />
        <div className='flex flex-col justify-center items-center w-full lg:py-8 lg:px-40 max-lg:py-4 m-auto lg:mt-20'>
          <div className='w-full h-full lg:px-40 lg:py-12 md:py-10 max-md:py-6 inline-flex justify-center items-center relative'>
            <span className='text-center lg:text-[44px] md:text-[30px] max-md:text-[14px] font-normal break-words'>
              Tham gia cùng chúng mình để cùng tay tạo nên các khoảnh khắc đáng nhớ nhé!
            </span>
            <div className='absolute w-[30%] h-[30%] bg-[#26C6DA]/80 shadow-xl blur-[150px] top-60'></div>
          </div>
          <div className='mx-auto px-5 py-2 lg:pt-24'>
            <div className='flex flex-wrap md:-m-2 '>
              <div className='flex w-1/2 flex-wrap'>
                <div className='w-1/2 p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full  rounded-lg object-cover object-center'
                    src={homePage_03}
                  />
                </div>
                <div className='w-1/2 p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_03}
                  />
                </div>
                <div className='w-full p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_03}
                  />
                </div>
              </div>
              <div className='flex w-1/2 flex-wrap'>
                <div className='w-full p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_01}
                  />
                </div>
                <div className='w-1/2 p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_01}
                  />
                </div>
                <div className='w-1/2 p-1 md:p-2'>
                  <img
                    alt='gallery'
                    className='block h-full w-full rounded-lg object-cover object-center'
                    src={homePage_01}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EventsPage
